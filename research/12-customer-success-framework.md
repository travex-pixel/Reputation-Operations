# 12 — Customer success framework and the Reputrail Score

Purpose: a monthly reporting system a trade owner can read in two minutes, that never claims more than the evidence supports, and a single score that measures how well reputation and feedback are being *managed*. Implemented in code at `src/lib/report/kpis.ts` and `src/lib/score/reputrailScore.ts`; rendered by the workspace report generator and, as an illustrative example, on the public site.

## 1. The four reporting categories

| Category | Measures | Source | Basis label |
|---|---|---|---|
| **A. Reputation** | New genuine reviews; average rating and trend; review response coverage; negative-review response coverage; median response time; review-request volume | Reputrail's review log and the public profile at period end | Actual |
| **B. Customer recovery** | Issues identified; issues escalated; customers contacted; issues resolved; recurring complaint themes; follow-ups outstanding | Reputrail's log (escalations, owner-call outcomes) | Actual |
| **C. Business performance** | Google Business Profile calls and website clicks; qualified enquiries; quote requests; jobs won; attributable revenue; gross profit where supplied | Owner-supplied (Google Business Profile performance, job sheets) | Actual for profile metrics when the owner supplies them; **estimate** for attributable revenue and profit; **unverified** when not supplied |
| **D. Owner time saved** | Owner hours previously spent on reputation admin; hours transferred to Reputrail; estimated time saved | Owner's baseline estimate from onboarding; Reputrail's logged hours | Estimate (capped at the owner's own baseline) |

Rules: a blank is shown as a dash and never as zero. Every figure carries a basis label (actual, estimate, unverified) and a one-line derivation on the report. Figures compare against the previous period automatically once a prior report exists.

## 2. Attribution methodology

Reputation work and business results are correlated; season, advertising, word of mouth and the economy also move the numbers. The report therefore:

1. **Reports, does not claim.** Business performance figures are presented as "supplied by [owner], from [source], on [date]". The report never states that Reputrail generated an enquiry.
2. **Counts attributable revenue only on evidence.** A job counts as attributable only when the customer told the owner that reviews or a recovery call influenced them (the owner records this). It is labelled an estimate, always.
3. **Uses the owner's baseline for time saved** and caps the claim at that baseline, so time saved can never exceed what the owner said they spent.
4. **Separates leading from lagging indicators.** Coverage, response time and recovery outcomes are things Reputrail controls (leading). Enquiries and jobs are lagging and multi-causal.
5. **Shows the counterfactual honestly.** Where possible the report notes seasonal context (e.g. "October is peak air-conditioning season") beside any rise in enquiries.
6. **Keeps the evidence attached.** Observations cite which reviews, which calls, which dates.

What we will never write: "Reputrail generated A$X of revenue", "our work increased your enquiries by Y%", or any figure the owner did not supply presented as fact.

## 3. The Reputrail Score (0–100)

The score measures **management quality**: did every review get read, answered and, where needed, acted on; were unhappy customers contacted and issues resolved; is the profile growing with genuine reviews; and did the owner receive insight they can act on. It does not measure how positive the reviews are. A legitimate two-star review answered within a day, escalated, and resolved earns full marks.

| Component | Weight | What earns points | Evidence required |
|---|---:|---|---|
| Review management | 25 | Share of new reviews answered (10); share of negative reviews answered (10); median response time, full marks at ≤24h, nil at ≥168h (5) | Review log with publish timestamps |
| Customer recovery | 30 | Share of identified issues escalated (8), customers contacted (8), resolved (10), follow-ups closed (4). Zero issues identified scores full marks with a note to confirm monitoring coverage | Escalation and recovery log with outcomes |
| Reputation growth | 25 | New genuine reviews vs prior period (12; steady = 70% of points, +50% = full); rating trend (7; stable = 70%, +0.1 = full, −0.1 = 30%, never zero); honest review requests sent to every nominated customer (6) | Prior period report, profile rating, request log with consent |
| Business insight and reporting | 20 | Recurring themes recorded (5); observations written against evidence (5); recommended actions (5); business figures supplied (3); owner time recorded (2) | The report itself |

**Renormalisation.** When a component cannot be assessed (for example, no negative reviews this month, or a first period with no prior comparison), its weight is removed from the denominator and the score is shown as provisional. A gap in data is never read as poor performance.

**Bands:** 85–100 "In good hands"; 70–84 "Well managed"; 50–69 "Partly managed"; below 50 "Unmanaged".

**Limitations stated on every report:** the score depends on the completeness of the log; it is not comparable between businesses with very different review volumes; it says nothing about workmanship; a rating fall caused by legitimate feedback reduces only the growth component, by design.

## 4. Monthly report structure

1. Header: client, period, prepared by and when.
2. Reputrail Score with component bars and caveats.
3. Executive summary (auto-drafted from the figures, edited by a person).
4. Category tables A–D with this period, previous period, change, and basis label per row.
5. Recurring complaint themes and the attribution note.
6. Key observations (evidence-referenced).
7. Recommended actions for next month.
8. Basis footnote.

Template for manual use: `business/monthly-report-template.md`. Generator: `/workspace/reports`.

## 5. Service-level targets (what "good" looks like)

| Measure | Pilot target | Managed target |
|---|---|---|
| Review response coverage | 100% of new reviews | 100% |
| Negative-review response coverage | 100% | 100% |
| Median response time | ≤ 1 working day | ≤ 1 working day |
| Escalation of negative reviews to owner | same working day | same working day |
| Recovery contact where recommended | within 2 working days | within 2 working days |
| Review requests | every nominated completed job within 3 working days | same |
| Report delivery | by the 3rd working day of the month | same |

## 6. Operational data capture (so the report writes itself)

The workspace review log captures: platform, stars, date observed, classification (with source and any human correction), drafts with approval records (who, when, channel, what was finally published), escalation history, recovery contact date and outcome. The report generator can prefill category A and B from this log for the chosen period; category C and D are typed in from the owner's figures with their source recorded.
