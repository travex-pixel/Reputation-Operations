import type { AuditAnalysis, AuditInputs, Verification } from "@/lib/domain/types";

/**
 * Deterministic audit analysis from supplied observations. No model is
 * needed to produce a useful, honest audit; every line is traceable to an
 * input the founder typed, and lines that are analysis say so.
 */

const v = (x: unknown): Verification => (x === null || x === undefined || x === "" ? "unverified" : "observed");

function pctText(n: number | null) {
  return n === null ? "not observed" : `${Math.round(n)}%`;
}

export function generateAuditAnalysis(inp: AuditInputs): AuditAnalysis {
  const observed: string[] = [];
  const analysis: string[] = [];

  // Snapshot
  const snapshot: AuditAnalysis["snapshot"] = [
    { label: "Google rating", value: inp.googleRating === null ? "—" : inp.googleRating.toFixed(1), note: inp.googleRating === null ? "Not supplied" : "As displayed on the profile", verification: v(inp.googleRating) },
    { label: "Total reviews", value: inp.reviewCount === null ? "—" : String(inp.reviewCount), note: `${inp.reviewsInspected} review${inp.reviewsInspected === 1 ? "" : "s"} read in full`, verification: v(inp.reviewCount) },
    { label: "Most recent review", value: inp.lastReviewDaysAgo === null ? "—" : `${inp.lastReviewDaysAgo} days ago`, note: inp.lastReviewDaysAgo === null ? "Not supplied" : inp.lastReviewDaysAgo > 60 ? "Recency is weighing on visibility" : "Recent activity present", verification: v(inp.lastReviewDaysAgo) },
    { label: "Owner reply rate", value: pctText(inp.ownerResponsePct), note: "Share of inspected reviews with an owner reply", verification: v(inp.ownerResponsePct) },
    { label: "Negative reviews answered", value: pctText(inp.negativeResponsePct), note: "Share of 1–3 star reviews with a reply", verification: v(inp.negativeResponsePct) },
    { label: "Negative reviews, last 12 months", value: inp.negativeCount12m === null ? "—" : String(inp.negativeCount12m), note: inp.negativeCount12m === null ? "Not supplied" : "1–3 star reviews", verification: v(inp.negativeCount12m) },
  ];
  snapshot.forEach((s) => s.verification === "observed" && observed.push(`${s.label}: ${s.value}`));

  // Positive themes: from supplied observations only
  const positiveThemes = splitList(inp.recentObservations).filter((s) => /good|great|tidy|clean|on time|punctual|friendly|professional|recommend|quality|prompt|helpful|thorough|neat|reliable|fair/i.test(s));
  if (positiveThemes.length) observed.push(...positiveThemes.map((t) => `Positive theme: ${t}`));

  // Opportunities (analysis)
  const improvementOpportunities: string[] = [];
  if (inp.ownerResponsePct !== null && inp.ownerResponsePct < 60) {
    improvementOpportunities.push(`Only ${Math.round(inp.ownerResponsePct)}% of reviews have a reply. Every unanswered review is a missed public conversation with the next customer; a two-week catch-up, oldest first, is the fastest visible change.`);
  }
  if (inp.negativeResponsePct !== null && inp.negativeResponsePct < 100 && (inp.negativeCount12m ?? 1) > 0) {
    improvementOpportunities.push(`${100 - Math.round(inp.negativeResponsePct)}% of negative reviews are unanswered. An unanswered complaint reads as "didn't care"; a calm reply reads as "handled".`);
  }
  if (inp.lastReviewDaysAgo !== null && inp.lastReviewDaysAgo > 45) {
    improvementOpportunities.push(`The newest review is ${inp.lastReviewDaysAgo} days old. Google favours recent activity; a consistent, honest request after every completed job is the lever.`);
  }
  const strongerCompetitors = inp.competitors.filter((c) => (c.reviews ?? 0) > (inp.reviewCount ?? 0) * 1.5);
  if (strongerCompetitors.length) {
    improvementOpportunities.push(`${strongerCompetitors.map((c) => c.name).join(" and ")} ${strongerCompetitors.length > 1 ? "have" : "has"} more than one-and-a-half times your review count. Volume, not rating, is the gap a searcher sees first.`);
  }
  const negObs = splitList(inp.negativeObservations);
  if (negObs.length) {
    improvementOpportunities.push(`Negative feedback supplied clusters around: ${negObs.slice(0, 3).join("; ")}. The fix is operational first, reputational second.`);
  }
  if (!improvementOpportunities.length) {
    improvementOpportunities.push("No clear gaps in the supplied observations. The opportunity is consistency: keep the reply rate and request cadence steady so the profile stays current.");
  }
  analysis.push(...improvementOpportunities);

  // Coverage and handling narratives
  const responseCoverage =
    inp.ownerResponsePct === null
      ? "Owner reply coverage was not observed. Before any conversation, open the profile, sort by newest, and count replies in the last twenty reviews."
      : `${Math.round(inp.ownerResponsePct)}% of inspected reviews carry an owner reply${inp.ownerResponseObservations ? `. Observed: ${inp.ownerResponseObservations}` : "."}`;
  const negativeHandling =
    inp.negativeCount12m === 0
      ? "No negative reviews were observed in the last 12 months. That is good news and also a risk: a first bad review with no reply lands harder on a spotless profile."
      : inp.negativeCount12m === null
        ? "Negative-review history was not fully accessible. Record what was inspected, not what was assumed."
        : `${inp.negativeCount12m} negative review${inp.negativeCount12m === 1 ? "" : "s"} in 12 months; ${pctText(inp.negativeResponsePct)} answered.${negObs.length ? ` Themes: ${negObs.slice(0, 3).join("; ")}.` : ""} Recommended handling: a specific, non-defensive reply within one working day, a phone call where it could win the customer back, and a policy flag only where Google's rules are clearly breached.`;
  analysis.push(responseCoverage, negativeHandling);

  // Competitor comparison
  const compRows = inp.competitors.filter((c) => c.name.trim());
  const competitorComparison = compRows.length
    ? compRows
        .map((c) => `${c.name}: ${c.rating === null ? "rating n/a" : `${c.rating.toFixed(1)}★`}, ${c.reviews === null ? "count n/a" : `${c.reviews} reviews`}, ${c.responsePct === null ? "reply rate n/a" : `${Math.round(c.responsePct)}% replied`}`)
        .join(" · ") + (inp.competitorObservations ? ` Observed: ${inp.competitorObservations}` : "")
    : "No competitor figures supplied. Add the three nearest competitors from Google Maps for the same search.";

  // Recommended actions
  const recommendedActions: string[] = [];
  if (inp.ownerResponsePct === null || inp.ownerResponsePct < 100) recommendedActions.push("Reply to every unanswered review over two weeks, oldest first, in the owner's voice, each approved before posting.");
  recommendedActions.push("Start a genuine review-request routine for every completed job, with an unsubscribe and no gating, and log consent.");
  if ((inp.negativeCount12m ?? 0) > 0) recommendedActions.push("Agree a same-working-day escalation path for negative reviews, and a short call-back script for the owner.");
  if (negObs.length) recommendedActions.push(`Pick one operational fix for the leading complaint theme (${negObs[0]}) and measure whether it recurs next month.`);
  if (positiveThemes.length) recommendedActions.push(`Put the praise where customers look: "${positiveThemes[0]}" belongs in the profile description and the quote template.`);
  recommendedActions.push("Benchmark against the three competitors monthly so the owner sees the gap closing, not just the rating.");
  analysis.push(...recommendedActions);

  // Pilot scope
  const pilotScope = `Founding pilot: 30 days of the Managed service at A$299. Scope for ${inp.businessName}: catch-up replies${inp.reviewCount ? ` across the ${inp.reviewCount} existing reviews` : ""}, daily monitoring of Google${compRows.length ? "" : ""}, hipages and Facebook, same-day escalation of negatives with an owner call-back brief, a review-request routine for completed jobs, and a one-page report at day 30. Nothing renews automatically; around day 25 we ask what you want to do.`;

  return {
    snapshot,
    positiveThemes: positiveThemes.length ? positiveThemes : ["No positive themes supplied; read the latest ten 5-star reviews and note what customers praise."],
    improvementOpportunities,
    responseCoverage,
    negativeHandling,
    competitorComparison,
    recommendedActions,
    pilotScope,
    provenance: { observed, analysis },
    narrativeSource: "rules",
  };
}

export function splitList(s: string): string[] {
  return s
    .split(/\n|;|•|•|\. (?=[A-Z])/)
    .map((x) => x.trim().replace(/^[-–*]\s*/, ""))
    .filter((x) => x.length > 3);
}

export function emptyAuditInputs(): AuditInputs {
  return {
    businessName: "",
    trade: "HVAC",
    suburb: "",
    website: "",
    googleRating: null,
    reviewCount: null,
    reviewsInspected: 0,
    lastReviewDaysAgo: null,
    ownerResponsePct: null,
    negativeResponsePct: null,
    negativeCount12m: null,
    recentObservations: "",
    negativeObservations: "",
    ownerResponseObservations: "",
    competitors: [
      { name: "", rating: null, reviews: null, responsePct: null },
      { name: "", rating: null, reviews: null, responsePct: null },
      { name: "", rating: null, reviews: null, responsePct: null },
    ],
    competitorObservations: "",
    preparedBy: "",
    preparedOn: new Date().toISOString().slice(0, 10),
  };
}
