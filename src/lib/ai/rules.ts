import type { Classification, FeedbackCategory, RecommendedAction, RiskLevel, Sentiment, Urgency } from "@/lib/domain/types";
import type { AiProvider, AiStatus, DraftContext, DraftSuggestion, Insight, InsightInput, ReviewContext } from "./provider";

/**
 * Rule-based provider. This is simple automation, not AI: deterministic
 * keyword and star-rating heuristics. It exists so the workspace works with
 * no API key, and so that an honest baseline exists to compare a model against.
 * Its output is labelled `source: "rules"` and must always be checked by a person.
 */

const CATEGORY_TERMS: Record<FeedbackCategory, string[]> = {
  Communication: ["didn't call", "no call", "never called", "no one rang", "nobody rang", "didn't hear", "no response", "unresponsive", "communication", "kept me informed", "called ahead", "let me know", "texted"],
  Workmanship: ["leak", "leaking", "broke", "broken", "faulty", "not working", "stopped working", "crack", "uneven", "drips", "paint peeling", "shoddy", "quality", "workmanship", "finish", "neat work", "tidy work", "professional job"],
  Timeliness: ["late", "no show", "didn't show", "never showed", "didn't turn up", "nobody came", "no one came", "no-one came", "didn't come", "never came", "didn't arrive", "never arrived", "didn't turn up", "waited", "waiting", "on time", "punctual", "same day", "next day", "quick", "prompt", "took weeks", "delayed"],
  Pricing: ["price", "pricing", "expensive", "overcharged", "quote", "quoted", "invoice", "cost", "cheap", "value", "rip off", "ripped off", "hidden fee", "call-out fee", "call out fee", "fair price", "reasonable"],
  Professionalism: ["rude", "arrogant", "unprofessional", "professional", "polite", "courteous", "respectful", "attitude", "swearing", "friendly"],
  Cleanliness: ["mess", "messy", "clean", "cleaned up", "tidied", "dust", "rubbish", "left a mess", "boots"],
  "Customer service": ["service", "helpful", "went above", "above and beyond", "customer service", "office", "receptionist", "refund", "warranty"],
  "Expectations management": ["wasn't told", "not told", "didn't explain", "explained", "surprise", "unexpected", "expected", "promised", "misleading"],
  "Follow-up": ["follow up", "follow-up", "followed up", "come back", "came back", "never came back", "haven't heard", "still waiting", "chasing", "chased"],
  Other: [],
};

const SENSITIVE_TERMS = [
  "injur", "hurt", "hospital", "fire", "flood", "electrocut", "gas leak", "asbestos", "unsafe", "dangerous", "danger",
  "lawyer", "solicitor", "legal", "court", "tribunal", "ncat", "fair trading", "police", "sue", "lawsuit",
  "refund", "owe", "owed", "money back", "chargeback", "scam", "fraud", "stole", "theft",
  "racist", "sexist", "harass", "assault", "threat", "abuse",
  "defect", "structural", "collapse", "damage to", "damaged my",
];

const NOT_CUSTOMER_TERMS = ["never used", "didn't use", "not a customer", "wrong business", "never hired", "quote only", "only got a quote", "driving", "ute", "cut me off", "tailgat"];

function includesAny(hay: string, terms: string[]): string[] {
  return terms.filter((t) => hay.includes(t));
}

export function classifyByRules(review: ReviewContext): Classification {
  const text = review.text.toLowerCase();
  const sentiment: Sentiment = review.stars >= 4 ? "positive" : review.stars === 3 ? "neutral" : "negative";

  const categories: FeedbackCategory[] = [];
  const hits: Record<string, string[]> = {};
  (Object.keys(CATEGORY_TERMS) as FeedbackCategory[]).forEach((cat) => {
    const found = includesAny(text, CATEGORY_TERMS[cat]);
    if (found.length) {
      categories.push(cat);
      hits[cat] = found;
    }
  });
  if (!categories.length) categories.push("Other");

  const sensitiveHits = includesAny(text, SENSITIVE_TERMS);
  const notCustomerHits = includesAny(text, NOT_CUSTOMER_TERMS);
  const sensitive = sensitiveHits.length > 0;

  let urgency: Urgency = "low";
  let risk: RiskLevel = "low";
  if (sentiment === "negative") {
    urgency = review.stars === 1 ? "high" : "medium";
    risk = review.stars === 1 ? "high" : "medium";
  } else if (sentiment === "neutral") {
    urgency = "medium";
    risk = "medium";
  }
  if (sensitive) {
    urgency = "high";
    risk = "sensitive";
  }

  let recommendedAction: RecommendedAction = "thank";
  if (sentiment === "positive") recommendedAction = "thank";
  else if (notCustomerHits.length) recommendedAction = "check_records";
  else if (sensitive) recommendedAction = "escalate_to_owner";
  else if (sentiment === "negative") recommendedAction = "reply_and_call";
  else recommendedAction = "reply";

  const primary = categories[0];
  const issue =
    sentiment === "positive"
      ? `Praise${primary !== "Other" ? ` for ${primary.toLowerCase()}` : ""}.`
      : notCustomerHits.length
        ? "Reviewer may not have been a customer; verify against job records before replying."
        : sensitive
          ? `Possible ${sensitiveHits[0]}-related complaint; sensitive, needs the owner's own words.`
          : `${primary} complaint${hits[primary] ? ` (mentions: ${hits[primary].slice(0, 3).join(", ")})` : ""}.`;

  const rationaleParts = [
    `Rule-based: ${review.stars} stars → ${sentiment}.`,
    categories.length && primary !== "Other" ? `Matched terms for ${categories.join(", ")}.` : "No category terms matched; marked Other.",
  ];
  if (sensitive) rationaleParts.push(`Sensitive terms found: ${sensitiveHits.slice(0, 3).join(", ")}. Escalate; do not draft a public reply without the owner's words.`);
  if (notCustomerHits.length) rationaleParts.push(`Terms suggesting not-a-customer: ${notCustomerHits.slice(0, 2).join(", ")}.`);
  rationaleParts.push("This is simple automation, not AI; a person must confirm or correct it.");

  return {
    sentiment,
    categories,
    issue,
    urgency,
    risk,
    sensitive,
    recommendedAction,
    rationale: rationaleParts.join(" "),
    source: "rules",
    classifiedAt: new Date().toISOString(),
  };
}

/** Template drafts for the no-AI case: honest scaffolds the founder edits. */
export function draftByRules(ctx: DraftContext): DraftSuggestion[] {
  const name = ctx.authorFirstName?.trim();
  const greet = name ? `${name}, ` : "";
  const owner = ctx.ownerFirstName || "the team";
  const sentiment = ctx.classification?.sentiment ?? (ctx.stars >= 4 ? "positive" : ctx.stars === 3 ? "neutral" : "negative");
  if (ctx.classification?.sensitive) {
    return [
      {
        tone: "Hold: sensitive",
        text: `[Do not publish. Sensitive complaint. Escalate to ${owner} and draft only with the owner's own words. Template if the owner agrees: "${greet}thank you for raising this. We take it seriously and ${owner} will call you today to understand what happened and put it right."]`,
      },
    ];
  }
  if (sentiment === "positive") {
    return [
      { tone: "Warm, specific", text: `${greet}thanks so much for taking the time. [Mention the specific job.] It means a lot to the crew. If anything comes up down the track, you know where we are. ${owner}` },
      { tone: "Short", text: `${greet}really appreciate it. Glad [the job] went smoothly. Thanks for having us out. ${owner}` },
    ];
  }
  if (sentiment === "neutral") {
    return [
      { tone: "Open, curious", text: `${greet}thanks for the honest feedback. We'd like to know what would have made it a five-star job for you; ${owner} will give you a call. ${owner}` },
    ];
  }
  return [
    { tone: "Own it, take it offline", text: `${greet}that's not the experience we want anyone to have, and I'm sorry. I'd like to understand what happened and sort it out properly. ${owner} will ring you today, or please call us on [number]. ${owner}` },
    { tone: "Calm, factual", text: `${greet}thank you for letting us know. [One sentence acknowledging the specific issue, no blame.] We'd like to put it right. ${owner} will be in touch today to arrange a time. ${owner}` },
  ];
}

/** Theme counting for insights when no model is available. */
export function insightsByRules(input: InsightInput): Insight[] {
  const negatives = input.reviews.filter((r) => r.stars <= 3);
  const positives = input.reviews.filter((r) => r.stars >= 4);
  const count = (list: typeof input.reviews) => {
    const m = new Map<FeedbackCategory, { n: number; quotes: string[] }>();
    for (const r of list) {
      const cats = r.categories?.length ? r.categories : classifyByRules({ businessName: input.businessName, trade: input.trade, stars: r.stars, text: r.text }).categories;
      for (const c of cats) {
        const e = m.get(c) ?? { n: 0, quotes: [] };
        e.n += 1;
        if (e.quotes.length < 3) e.quotes.push(`${r.date}: “${r.text.slice(0, 120)}${r.text.length > 120 ? "…" : ""}”`);
        m.set(c, e);
      }
    }
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n);
  };
  const out: Insight[] = [];
  for (const [cat, e] of count(negatives)) {
    if (e.n >= 2 && cat !== "Other") {
      out.push({
        theme: `${cat} appears in ${e.n} of ${negatives.length} negative reviews`,
        kind: "recurring_complaint",
        evidence: e.quotes,
        recommendation: `Treat ${cat.toLowerCase()} as an operational cause, not a review problem: agree one process change with the owner and watch whether the theme recurs next month.`,
        confidence: e.n >= 3 ? "medium" : "low",
      });
    }
  }
  for (const [cat, e] of count(positives).slice(0, 2)) {
    if (cat !== "Other") {
      out.push({
        theme: `${cat} praised in ${e.n} of ${positives.length} positive reviews`,
        kind: "positive_driver",
        evidence: e.quotes,
        recommendation: `Say it where customers look: profile description, quotes and the review request message.`,
        confidence: e.n >= 3 ? "medium" : "low",
      });
    }
  }
  if (!out.length) {
    out.push({
      theme: "Not enough reviews for a pattern",
      kind: "trend",
      evidence: [`${input.reviews.length} reviews in scope`],
      recommendation: "Keep logging; patterns need at least five classified reviews.",
      confidence: "low",
    });
  }
  return out;
}

export class RulesProvider implements AiProvider {
  name = "rules" as const;
  status(): AiStatus {
    return {
      available: false,
      provider: "rules",
      models: { classify: "rules", draft: "templates", insight: "theme-count" },
      reason: "ANTHROPIC_API_KEY is not set. Running deterministic rules and templates; outputs are labelled accordingly.",
    };
  }
  async classify(review: ReviewContext) {
    return classifyByRules(review);
  }
  async draft(ctx: DraftContext) {
    return draftByRules(ctx);
  }
  async insights(input: InsightInput) {
    return insightsByRules(input);
  }
}
