import type { ReportInputs } from "@/lib/domain/types";

/**
 * KPI derivation for the monthly report. Pure functions; no AI.
 * Each KPI says what it is, how it was derived, and how far to trust it.
 */

export type Attribution = "actual" | "estimate" | "unverified";

export interface Kpi {
  key: string;
  category: "Reputation" | "Customer recovery" | "Business performance" | "Owner time saved";
  label: string;
  value: number | null;
  unit: "" | "%" | "h" | "A$" | "★";
  previous: number | null;
  delta: number | null;
  /** Direction that counts as good. */
  goodWhen: "up" | "down" | "none";
  attribution: Attribution;
  derivation: string;
}

const pctOf = (a: number | null, b: number | null) =>
  a === null || b === null ? null : b === 0 ? null : Math.round((a / b) * 100);

function kpi(
  key: string,
  category: Kpi["category"],
  label: string,
  value: number | null,
  previous: number | null,
  unit: Kpi["unit"],
  goodWhen: Kpi["goodWhen"],
  attribution: Attribution,
  derivation: string,
): Kpi {
  const delta = value === null || previous === null ? null : Math.round((value - previous) * 10) / 10;
  return { key, category, label, value, unit, previous, delta, goodWhen, attribution, derivation };
}

export function deriveKpis(cur: ReportInputs, prev: ReportInputs | null): Kpi[] {
  const r = cur.reputation;
  const pr = prev?.reputation;
  const c = cur.recovery;
  const pc = prev?.recovery;
  const b = cur.business;
  const pb = prev?.business;
  const t = cur.time;
  const pt = prev?.time;

  const businessAttribution: Attribution = b.businessDataSource.trim() ? "actual" : "unverified";

  const saved =
    t.baselineOwnerHours !== null && t.hoursTransferred !== null
      ? Math.min(t.baselineOwnerHours, t.hoursTransferred)
      : null;
  const prevSaved =
    pt && pt.baselineOwnerHours !== null && pt.hoursTransferred !== null
      ? Math.min(pt.baselineOwnerHours, pt.hoursTransferred)
      : null;

  return [
    kpi("newReviews", "Reputation", "New genuine reviews", r.newReviews, pr?.newReviews ?? null, "", "up", "actual", "Counted from the review log; requests were sent to every nominated customer with no gating."),
    kpi("averageRating", "Reputation", "Average rating", r.averageRating, pr?.averageRating ?? null, "★", "up", "actual", "Public profile average at period end."),
    kpi("totalReviews", "Reputation", "Total reviews", r.totalReviews, pr?.totalReviews ?? null, "", "up", "actual", "Public profile count at period end."),
    kpi("coverage", "Reputation", "Review response coverage", pctOf(r.reviewsReplied, r.newReviews), pr ? pctOf(pr.reviewsReplied, pr.newReviews) : null, "%", "up", "actual", "Replies published ÷ new reviews in the period."),
    kpi("negCoverage", "Reputation", "Negative-review response coverage", pctOf(r.negativeReplied, r.negativeReviews), pr ? pctOf(pr.negativeReplied, pr.negativeReviews) : null, "%", "up", "actual", "Replies to 1–3 star reviews ÷ 1–3 star reviews received."),
    kpi("responseTime", "Reputation", "Median response time", r.medianResponseHours, pr?.medianResponseHours ?? null, "h", "down", "actual", "Hours from review appearing to reply published, median."),
    kpi("requests", "Reputation", "Review requests sent", r.requestsSent, pr?.requestsSent ?? null, "", "none", "actual", "Honest requests sent to every nominated customer, each with an unsubscribe."),

    kpi("issues", "Customer recovery", "Issues identified", c.issuesIdentified, pc?.issuesIdentified ?? null, "", "none", "actual", "Negative reviews and feedback flagged for recovery."),
    kpi("escalated", "Customer recovery", "Issues escalated", c.issuesEscalated, pc?.issuesEscalated ?? null, "", "none", "actual", "Issues sent to the owner the same working day."),
    kpi("contacted", "Customer recovery", "Customers contacted", c.customersContacted, pc?.customersContacted ?? null, "", "up", "actual", "Owner calls or messages logged."),
    kpi("resolved", "Customer recovery", "Issues resolved", c.issuesResolved, pc?.issuesResolved ?? null, "", "up", "actual", "Customer confirmed the fix or accepted the outcome."),
    kpi("followUps", "Customer recovery", "Follow-ups outstanding", c.followUpsOutstanding, pc?.followUpsOutstanding ?? null, "", "down", "actual", "Open recovery tasks at period end."),

    kpi("calls", "Business performance", "Google profile calls", b.profileCalls, pb?.profileCalls ?? null, "", "up", businessAttribution, "From Google Business Profile performance, supplied by the owner. Correlates with reputation; not caused by it alone."),
    kpi("clicks", "Business performance", "Website clicks from profile", b.websiteClicks, pb?.websiteClicks ?? null, "", "up", businessAttribution, "From Google Business Profile performance, supplied by the owner."),
    kpi("enquiries", "Business performance", "Qualified enquiries", b.qualifiedEnquiries, pb?.qualifiedEnquiries ?? null, "", "up", businessAttribution, "Owner's count. Seasonal and advertising effects apply."),
    kpi("quotes", "Business performance", "Quote requests", b.quoteRequests, pb?.quoteRequests ?? null, "", "up", businessAttribution, "Owner's count."),
    kpi("jobs", "Business performance", "Jobs won", b.jobsWon, pb?.jobsWon ?? null, "", "up", businessAttribution, "Owner's count."),
    kpi("revenue", "Business performance", "Attributable revenue", b.attributableRevenue, pb?.attributableRevenue ?? null, "A$", "up", b.attributableRevenue === null ? "unverified" : "estimate", "Only jobs where the customer said reviews or a recovery call influenced them. Always an estimate."),
    kpi("grossProfit", "Business performance", "Gross profit on those jobs", b.grossProfit, pb?.grossProfit ?? null, "A$", "up", b.grossProfit === null ? "unverified" : "estimate", "Owner-supplied margin on attributable jobs."),

    kpi("baseline", "Owner time saved", "Owner time previously spent", t.baselineOwnerHours, pt?.baselineOwnerHours ?? null, "h", "none", "estimate", "Owner's own estimate from onboarding, per month."),
    kpi("transferred", "Owner time saved", "Time transferred to Reputrail", t.hoursTransferred, pt?.hoursTransferred ?? null, "h", "up", "actual", "Reputrail hours logged on this client."),
    kpi("saved", "Owner time saved", "Estimated owner time saved", saved, prevSaved, "h", "up", "estimate", "Lesser of baseline and transferred hours, so we never claim more than the owner previously spent."),
  ];
}

export function formatKpiValue(k: Kpi): string {
  if (k.value === null) return "—";
  switch (k.unit) {
    case "%":
      return `${k.value}%`;
    case "h":
      return `${k.value}h`;
    case "A$":
      return `A$${k.value.toLocaleString("en-AU")}`;
    case "★":
      return `${k.value.toFixed(1)}★`;
    default:
      return `${k.value}`;
  }
}

export function formatDelta(k: Kpi): { text: string; tone: "good" | "bad" | "neutral" } {
  if (k.delta === null) return { text: "—", tone: "neutral" };
  if (k.delta === 0) return { text: "no change", tone: "neutral" };
  const sign = k.delta > 0 ? "+" : "−";
  const mag = Math.abs(k.delta);
  const text = `${sign}${k.unit === "A$" ? `A$${mag.toLocaleString("en-AU")}` : k.unit === "★" ? mag.toFixed(1) : mag}${k.unit === "%" || k.unit === "h" ? k.unit : ""}`;
  if (k.goodWhen === "none") return { text, tone: "neutral" };
  const good = k.goodWhen === "up" ? k.delta > 0 : k.delta < 0;
  return { text, tone: good ? "good" : "bad" };
}

export function periodLabel(start: string, end: string): string {
  const f = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" });
  const s = start ? f.format(new Date(start)) : "—";
  const e = end ? f.format(new Date(end)) : "—";
  return `${s} – ${e}`;
}
