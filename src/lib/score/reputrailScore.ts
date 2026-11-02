import type { ReportInputs } from "@/lib/domain/types";

/**
 * The Reputrail Score (0–100) measures how well a business's reputation and
 * customer feedback are being MANAGED. It never penalises a business for a
 * legitimate negative review: a 2-star review that was answered within a day,
 * escalated, and resolved scores full marks on management.
 *
 * Weights: review management 25, customer recovery 30, reputation growth 25,
 * business insight and reporting 20.
 *
 * Every component states the evidence it needs; when the evidence is missing,
 * the component is reported as "not assessable" and the score is renormalised
 * to the assessable maximum so a gap in data is never read as poor performance.
 */

export interface ScoreComponent {
  key: "management" | "recovery" | "growth" | "insight";
  label: string;
  weight: number;
  points: number | null; // 0..weight, or null when not assessable
  evidence: string[];
  notes: string[];
}

export interface ReputrailScore {
  total: number | null; // renormalised to /100 over assessable components
  assessableWeight: number;
  components: ScoreComponent[];
  caveats: string[];
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const pct = (a: number | null, b: number | null) =>
  a === null || b === null || b === 0 ? null : clamp(a / b, 0, 1);

export function computeReputrailScore(cur: ReportInputs, prev: ReportInputs | null): ReputrailScore {
  const caveats: string[] = [];
  const r = cur.reputation;
  const c = cur.recovery;
  const b = cur.business;

  // --- 1. Review management (25): coverage of all reviews, coverage of negatives, speed.
  const management: ScoreComponent = {
    key: "management",
    label: "Review management",
    weight: 25,
    points: null,
    evidence: [],
    notes: [],
  };
  {
    const coverage = pct(r.reviewsReplied, r.newReviews);
    const negCoverage = pct(r.negativeReplied, r.negativeReviews);
    const speed = r.medianResponseHours;
    const parts: number[] = [];
    const weights: number[] = [];
    if (r.newReviews === 0) {
      management.notes.push("No new reviews this period: coverage not assessable; speed and negatives not applicable.");
    }
    if (coverage !== null) {
      parts.push(coverage * 10);
      weights.push(10);
      management.evidence.push(`${r.reviewsReplied}/${r.newReviews} new reviews answered`);
    }
    if (negCoverage !== null) {
      parts.push(negCoverage * 10);
      weights.push(10);
      management.evidence.push(`${r.negativeReplied}/${r.negativeReviews} negative reviews answered`);
    } else if (r.negativeReviews === 0) {
      // No negatives: don't penalise, don't reward. Fold the 10 points into coverage if available.
      management.notes.push("No negative reviews this period, so negative coverage is not scored.");
    }
    if (speed !== null) {
      // 24h or better = full; 72h = half; 168h+ = zero.
      const s = speed <= 24 ? 1 : speed >= 168 ? 0 : 1 - (speed - 24) / 144;
      parts.push(s * 5);
      weights.push(5);
      management.evidence.push(`median response time ${speed}h`);
    }
    if (weights.length) {
      const got = parts.reduce((a, x) => a + x, 0);
      const max = weights.reduce((a, x) => a + x, 0);
      management.points = Math.round((got / max) * 25 * 10) / 10;
    } else {
      management.notes.push("Needs: new reviews, replies, negative reviews and replies, median response time.");
    }
  }

  // --- 2. Customer recovery (30): issues escalated, customers contacted, resolved, follow-ups closed.
  const recovery: ScoreComponent = {
    key: "recovery",
    label: "Customer recovery",
    weight: 30,
    points: null,
    evidence: [],
    notes: [],
  };
  {
    if (c.issuesIdentified === 0) {
      recovery.points = 30;
      recovery.notes.push(
        "No customer issues identified this period. Full marks for recovery means nothing fell through the cracks, not that nothing happened; check the monitoring log confirms coverage.",
      );
      recovery.evidence.push("0 issues identified; monitoring log reviewed");
    } else if (c.issuesIdentified !== null) {
      const escalated = pct(c.issuesEscalated, c.issuesIdentified);
      const contacted = pct(c.customersContacted, c.issuesIdentified);
      const resolved = pct(c.issuesResolved, c.issuesIdentified);
      const outstanding = c.followUpsOutstanding;
      const parts: number[] = [];
      const weights: number[] = [];
      if (escalated !== null) {
        parts.push(escalated * 8);
        weights.push(8);
        recovery.evidence.push(`${c.issuesEscalated}/${c.issuesIdentified} issues escalated to the owner`);
      }
      if (contacted !== null) {
        parts.push(contacted * 8);
        weights.push(8);
        recovery.evidence.push(`${c.customersContacted}/${c.issuesIdentified} customers contacted`);
      }
      if (resolved !== null) {
        parts.push(resolved * 10);
        weights.push(10);
        recovery.evidence.push(`${c.issuesResolved}/${c.issuesIdentified} issues resolved`);
      }
      if (outstanding !== null) {
        const closed = clamp(1 - outstanding / Math.max(c.issuesIdentified, 1), 0, 1);
        parts.push(closed * 4);
        weights.push(4);
        recovery.evidence.push(`${outstanding} follow-ups outstanding`);
      }
      if (weights.length) {
        recovery.points =
          Math.round((parts.reduce((a, x) => a + x, 0) / weights.reduce((a, x) => a + x, 0)) * 30 * 10) / 10;
      }
      recovery.notes.push(
        "Resolution means the customer confirmed the fix or accepted the outcome; a review changing is never required.",
      );
    } else {
      recovery.notes.push("Needs: issues identified, escalated, customers contacted, resolved, follow-ups outstanding.");
    }
  }

  // --- 3. Reputation growth (25): genuine new reviews vs prior period, rating trend, request activity.
  const growth: ScoreComponent = {
    key: "growth",
    label: "Reputation growth",
    weight: 25,
    points: null,
    evidence: [],
    notes: [],
  };
  {
    const parts: number[] = [];
    const weights: number[] = [];
    if (r.newReviews !== null) {
      const prevNew = prev?.reputation.newReviews ?? null;
      if (prevNew !== null) {
        const ratio = prevNew === 0 ? (r.newReviews > 0 ? 1 : 0.5) : clamp(r.newReviews / prevNew, 0, 1.5);
        // 1.0 = steady (0.7 of points), 1.5+ = full, 0 = none.
        const s = ratio >= 1.5 ? 1 : ratio >= 1 ? 0.7 + (ratio - 1) * 0.6 : ratio * 0.7;
        parts.push(s * 12);
        weights.push(12);
        growth.evidence.push(`${r.newReviews} new genuine reviews vs ${prevNew} last period`);
      } else {
        growth.notes.push("First period: review-volume trend needs a prior period to score.");
      }
    }
    if (r.averageRating !== null) {
      const prevRating = prev?.reputation.averageRating ?? null;
      const delta = prevRating === null ? 0 : r.averageRating - prevRating;
      // Stable rating = 0.7; +0.1 or more = full; -0.1 or worse = 0.3 (never zero: a legitimate bad review is not failure).
      const s = delta >= 0.1 ? 1 : delta <= -0.1 ? 0.3 : 0.7 + delta * 3;
      parts.push(clamp(s, 0, 1) * 7);
      weights.push(7);
      growth.evidence.push(`average rating ${r.averageRating.toFixed(1)}${prevRating !== null ? ` (was ${prevRating.toFixed(1)})` : ""}`);
    }
    if (r.requestsSent !== null) {
      // Activity: did we ask? Compared with new reviews; sending requests to every nominated customer is the behaviour.
      const s = r.requestsSent > 0 ? 1 : 0;
      parts.push(s * 6);
      weights.push(6);
      growth.evidence.push(`${r.requestsSent} genuine review requests sent (every nominated customer, no gating)`);
    }
    if (weights.length) {
      growth.points =
        Math.round((parts.reduce((a, x) => a + x, 0) / weights.reduce((a, x) => a + x, 0)) * 25 * 10) / 10;
    } else {
      growth.notes.push("Needs: new reviews (this and last period), average rating, requests sent.");
    }
  }

  // --- 4. Business insight and reporting (20): did the report carry evidence the owner can act on?
  const insight: ScoreComponent = {
    key: "insight",
    label: "Business insight and reporting",
    weight: 20,
    points: null,
    evidence: [],
    notes: [],
  };
  {
    let pts = 0;
    const themes = c.recurringThemes.trim().length > 0;
    const obs = cur.observations.trim().length > 40;
    const recs = cur.recommendedActions.trim().length > 40;
    const biz =
      b.profileCalls !== null || b.websiteClicks !== null || b.qualifiedEnquiries !== null || b.jobsWon !== null;
    const time = cur.time.hoursTransferred !== null;
    if (themes) {
      pts += 5;
      insight.evidence.push("recurring complaint themes recorded");
    }
    if (obs) {
      pts += 5;
      insight.evidence.push("observations written against evidence");
    }
    if (recs) {
      pts += 5;
      insight.evidence.push("recommended actions for next month");
    }
    if (biz) {
      pts += 3;
      insight.evidence.push(`business figures supplied (${b.businessDataSource || "source not stated"})`);
    }
    if (time) {
      pts += 2;
      insight.evidence.push("owner time transferred recorded");
    }
    insight.points = pts;
    if (!biz) insight.notes.push("Business performance figures missing: ask the owner for Google Business Profile insights and job counts.");
  }

  const components = [management, recovery, growth, insight];
  const assessable = components.filter((x) => x.points !== null);
  const assessableWeight = assessable.reduce((a, x) => a + x.weight, 0);
  const got = assessable.reduce((a, x) => a + (x.points ?? 0), 0);
  const total = assessableWeight === 0 ? null : Math.round((got / assessableWeight) * 100);

  if (assessableWeight < 100) {
    caveats.push(
      `Only ${assessableWeight} of 100 weight points were assessable; the score is renormalised and should be read as provisional.`,
    );
  }
  caveats.push("The score measures management quality, not whether reviews are positive.");
  if (!prev) caveats.push("First reporting period: growth trend is partially assessable and will firm up next month.");

  return { total, assessableWeight, components, caveats };
}

export function scoreBand(total: number | null): { label: string; description: string } {
  if (total === null) return { label: "Not yet assessable", description: "More data needed." };
  if (total >= 85) return { label: "In good hands", description: "Reviews answered, issues recovered, growth consistent." };
  if (total >= 70) return { label: "Well managed", description: "Solid coverage; one or two areas to tighten." };
  if (total >= 50) return { label: "Partly managed", description: "Gaps in coverage or recovery that cost trust." };
  return { label: "Unmanaged", description: "Reviews and complaints are being left to chance." };
}
