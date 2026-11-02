import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { Classification, FeedbackCategory } from "@/lib/domain/types";
import { FEEDBACK_CATEGORIES } from "@/lib/domain/types";
import type { AiProvider, AiStatus, DraftContext, DraftSuggestion, Insight, InsightInput, ReviewContext, UsageRecord } from "./provider";
import { classifyByRules } from "./rules";

/**
 * Anthropic provider. Server-only: the API key never reaches the browser.
 *
 * Model policy (overridable by environment):
 *  - classification: Claude Haiku 5.5 (cheap, routine)
 *  - drafting and insights: Claude Sonnet 5.5 (client-facing words)
 * Prices below are the published USD per-million-token rates read on
 * 2026-11-02; update them when Anthropic's pricing page changes.
 */

const MODELS = {
  classify: process.env.REPUTRAIL_MODEL_CLASSIFY ?? "claude-haiku-5-5",
  draft: process.env.REPUTRAIL_MODEL_DRAFT ?? "claude-sonnet-5-5",
  insight: process.env.REPUTRAIL_MODEL_INSIGHT ?? "claude-sonnet-5-5",
};

const PRICES_USD_PER_MTOK: Record<string, { input: number; output: number }> = {
  "claude-haiku-5-5": { input: 0.1, output: 0.5 },
  "claude-sonnet-5-5": { input: 2, output: 10 },
  "claude-opus-5-5": { input: 4, output: 20 },
};

export const usageLog: UsageRecord[] = [];

function recordUsage(task: UsageRecord["task"], model: string, input: number, output: number) {
  const p = PRICES_USD_PER_MTOK[model] ?? { input: 0, output: 0 };
  usageLog.push({
    at: new Date().toISOString(),
    task,
    model,
    inputTokens: input,
    outputTokens: output,
    estimatedCostUsd: (input * p.input + output * p.output) / 1_000_000,
  });
  if (usageLog.length > 500) usageLog.shift();
}

/** Strip obvious personal data before text leaves our boundary. */
export function minimise(text: string): string {
  return text
    .replace(/\b(\+?61|0)[2-478](?:[ -]?\d){8}\b/g, "[phone]")
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email]")
    .replace(/\b\d{1,4}\s+[A-Z][a-z]+\s+(Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Place|Pl|Court|Ct|Lane|Ln|Parade|Pde|Crescent|Cres)\b/g, "[address]");
}

function extractJson<T>(text: string): T {
  const start = text.indexOf("{");
  const startArr = text.indexOf("[");
  const s = start === -1 ? startArr : startArr === -1 ? start : Math.min(start, startArr);
  const end = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
  if (s === -1 || end === -1) throw new Error("No JSON in model output");
  return JSON.parse(text.slice(s, end + 1)) as T;
}

function textOf(msg: Anthropic.Message): string {
  return msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

export class AnthropicProvider implements AiProvider {
  name = "anthropic" as const;
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  status(): AiStatus {
    return { available: true, provider: "anthropic", models: MODELS };
  }

  async classify(review: ReviewContext): Promise<Classification> {
    const rules = classifyByRules(review); // safety net and a second opinion
    const system = `You classify public customer reviews of Australian trade businesses for a human reviewer. Return ONLY JSON with keys: sentiment ("positive"|"neutral"|"negative"), categories (array from: ${FEEDBACK_CATEGORIES.join(", ")}), issue (one sentence: the underlying customer problem or what is praised), urgency ("low"|"medium"|"high"), risk ("low"|"medium"|"high"|"sensitive"), sensitive (boolean: true if safety, injury, defects, legal threats, money owed, discrimination or harassment are involved), recommendedAction ("thank"|"reply"|"reply_and_call"|"escalate_to_owner"|"check_records"|"prepare_policy_flag"|"no_action"), rationale (two sentences explaining the choice, citing words from the review). Sentiment is a judgement, not a fact. Never invent details.`;
    const msg = await this.client.messages.create({
      model: MODELS.classify,
      max_tokens: 400,
      system,
      messages: [
        {
          role: "user",
          content: `Business: ${review.businessName} (${review.trade}). Stars: ${review.stars}/5.\nReview:\n"""${minimise(review.text)}"""`,
        },
      ],
    });
    recordUsage("classify", MODELS.classify, msg.usage.input_tokens, msg.usage.output_tokens);
    const raw = extractJson<Partial<Classification>>(textOf(msg));
    const categories = (Array.isArray(raw.categories) ? raw.categories : []).filter((c): c is FeedbackCategory =>
      (FEEDBACK_CATEGORIES as readonly string[]).includes(c as string),
    );
    return {
      sentiment: raw.sentiment ?? rules.sentiment,
      categories: categories.length ? categories : rules.categories,
      issue: raw.issue ?? rules.issue,
      urgency: raw.urgency ?? rules.urgency,
      risk: raw.risk ?? rules.risk,
      // Sensitivity is OR'd with the rules so a model miss can't downgrade a sensitive complaint.
      sensitive: Boolean(raw.sensitive) || rules.sensitive,
      recommendedAction: rules.sensitive ? "escalate_to_owner" : (raw.recommendedAction ?? rules.recommendedAction),
      rationale: `${raw.rationale ?? ""}${rules.sensitive && !raw.sensitive ? " Rules flagged sensitive terms, so escalation is enforced." : ""}`.trim(),
      source: "ai",
      model: MODELS.classify,
      classifiedAt: new Date().toISOString(),
    };
  }

  async draft(ctx: DraftContext): Promise<DraftSuggestion[]> {
    if (ctx.classification?.sensitive) {
      // Policy: sensitive complaints are escalated, never auto-drafted.
      return [
        {
          tone: "Hold: sensitive",
          text: "[Not drafted. The classification marked this complaint sensitive (safety, defect, legal, money or conduct). Escalate to the owner and write the reply only with the owner's own words.]",
        },
      ];
    }
    const system = `You draft public replies to customer reviews for ${ctx.businessName}, an Australian ${ctx.trade} business, in the owner's voice. Rules you must follow: write two replies of 40–90 words; thank by first name if given; be specific about the job as described in the review, never invent facts; never admit fault for workmanship or safety; never argue facts publicly; never offer money, discounts or compensation; for negative reviews acknowledge the experience, say what will happen next and take it offline with a phone call offer; no emojis; Australian English; sign off as ${ctx.ownerFirstName || "the owner"}. Return ONLY a JSON array of objects with keys "tone" and "text".\n\nOwner's voice guide:\n${ctx.voiceGuide || "(none supplied: plain, warm, direct)"}\n\nPreviously approved replies (match this register):\n${ctx.approvedExamples.slice(0, 3).map((e, i) => `${i + 1}. ${minimise(e)}`).join("\n") || "(none yet)"}`;
    const msg = await this.client.messages.create({
      model: MODELS.draft,
      max_tokens: 700,
      system,
      messages: [
        {
          role: "user",
          content: `Stars: ${ctx.stars}/5. Reviewer first name: ${ctx.authorFirstName || "(not given)"}.\nClassification: ${ctx.classification ? `${ctx.classification.sentiment}; ${ctx.classification.categories.join(", ")}; ${ctx.classification.issue}` : "(none)"}\nReview:\n"""${minimise(ctx.text)}"""`,
        },
      ],
    });
    recordUsage("draft", MODELS.draft, msg.usage.input_tokens, msg.usage.output_tokens);
    const arr = extractJson<DraftSuggestion[]>(textOf(msg));
    return arr.filter((d) => typeof d.text === "string").map((d) => ({ tone: String(d.tone ?? "Draft"), text: d.text }));
  }

  async insights(input: InsightInput): Promise<Insight[]> {
    const system = `You analyse a set of customer reviews for an Australian ${input.trade} business and return practical, evidence-backed observations for the owner. Return ONLY a JSON array of objects with keys: theme (short), kind (one of recurring_complaint, service_failure, positive_driver, improvement, emerging_risk, trend), evidence (array of 1–3 short quotes with their dates, taken verbatim from the reviews supplied), recommendation (one concrete operational action the owner can take), confidence ("low"|"medium"|"high" based on how many reviews support it). No generic advice; every item must cite evidence. Maximum 6 items.`;
    const body = input.reviews
      .map((r) => `- ${r.date} · ${r.stars}★${r.categories?.length ? ` · ${r.categories.join("/")}` : ""}: ${minimise(r.text)}`)
      .join("\n");
    const msg = await this.client.messages.create({
      model: MODELS.insight,
      max_tokens: 1200,
      system,
      messages: [{ role: "user", content: `Business: ${input.businessName}.\nReviews (${input.reviews.length}):\n${body}` }],
    });
    recordUsage("insight", MODELS.insight, msg.usage.input_tokens, msg.usage.output_tokens);
    const arr = extractJson<Insight[]>(textOf(msg));
    return arr.filter((i) => i && typeof i.theme === "string");
  }
}
