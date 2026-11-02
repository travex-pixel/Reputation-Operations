# 06 — Commercial model

All figures in Australian dollars excluding GST unless stated. Exchange rate assumption for USD prices: A$1.50 per US$1 (ASSUMPTION; update at the time of reading).

## 1. Is A$299 / A$499 / A$799 realistic?

**Yes, with the Managed tier as the centre of gravity.** Evidence:

- Comparable monthly spend already exists in the segment: hipages plans run A$139–649+ per month and the CEO has cited average spend around A$120/month; a plumber buying twenty leads a month at A$40 spends about A$800 (VERIFIED snippets, file 01 §4.1 and §7).
- US platforms selling in Australia publish Birdeye at US$299–449 and Podium at US$399–599 per month, on 6–12-month contracts, self-serve (VERIFIED snippets, file 03 §4). Reputrail's A$299 equals Birdeye's entry price for a service that includes the labour Birdeye leaves to the customer.
- Australian local SEO agencies quote A$750–2,500 per month; Google Business Profile-only management from A$750+GST (VERIFIED snippets, file 03 §4). Reputrail's A$799 sits at the floor of that band with a narrower, deeper promise.
- Affordability: at A$499/month (A$5,988/year) the fee is 1.2% of revenue for a A$500k business and 0.4% at A$1.5m. For a A$120k sole trader it is 5%, which is why the launch segment is employing businesses turning over ≥A$200k (VERIFIED ABS turnover bands; ESTIMATE on affordability threshold).
- Payback logic the buyer will run: one extra ducted installation (A$6,000–12,000) or one saved repeat plumbing customer per quarter covers the Managed fee for a year (ESTIMATE).

**Recommended ladder (RECOMMENDATION):**

| Plan | Price | Who buys it | Founder hours/month (ESTIMATE) |
|---|---|---|---|
| Essential | A$299 | 1–4 staff; wants reviews handled, little escalation | 2.5 |
| Managed | A$499 | 5–19 staff; steady review flow; wants recovery help | 4.0 |
| Premium | A$799 | Multi-crew or multi-location; tender/referral-driven; wants a monthly call | 6.0 |
| Founding pilot | A$299 for 30 days of Managed | First three Sydney customers | 5.0 (set-up heavy) |

Hours assume: a 20-minute daily check across clients (shared), 10–15 minutes per review for drafting and approval chasing, 30–45 minutes per escalation including the owner briefing, 45 minutes per monthly report, and the pilot's 90-minute onboarding.

## 2. Pilot evaluation: A$299 for 30 days

- **Keep it.** The pilot's job is to remove risk from the first "yes", not to make money. A$299 is high enough to filter out tyre-kickers and low enough to be a no-brainer against hipages spend.
- Make it the full Managed service, not a cut-down one, so the conversion to A$499 is a continuation rather than an upsell.
- Limit to three, in writing, and name the limit on the site. Scarcity that is true is persuasive; scarcity that is fake destroys the trust position.
- Convert by default: the agreement states the pilot rolls to Managed at A$499 unless the client chooses otherwise before day 25, with the audit and the month's log theirs to keep either way. Call on day 20 to discuss.

## 3. Cost base

### 3.1 Fixed monthly costs (before any customer)

| Item | A$/month | Evidence |
|---|---|---|
| Google Workspace Business Starter (1 user) | 11.80 flexible (9.90 annual) | VERIFIED snippet, Google AU page (file `raw-openai-pricing.md` §3) |
| Vercel Pro (required for commercial use) | ~30 (US$20) | VERIFIED third-party snippets; Hobby plan is "personal, non-commercial" |
| Domain (.com.au) | ~2–3 (A$20–35/yr) | ESTIMATE from registrar ranges (`raw-name-clearance.md` §4.4) |
| SMS for approvals and review requests | 10–40 | ASSUMPTION A$0.08–0.12/SMS, 100–400 messages; prices NOT RETRIEVED this session |
| Anthropic API | 2–15 | ESTIMATE, file 07 |
| Accounting software | 0–35 | Xero starter pricing NOT RETRIEVED; spreadsheet acceptable to 5 clients |
| Professional indemnity + public liability | 60–130 | Broker estimates, snippet-only (file 08 §7) |
| ASIC business name, amortised | 4 | VERIFIED snippet: A$47/yr or A$108/3yrs |
| **Total fixed** | **~A$120–270** | |

Not included: the founder's Claude Code or Claude.ai subscription, which is a personal productivity tool and not a cost of serving clients; a business phone number (VoIP, ~A$10–20/month, ASSUMPTION); a trade mark application (one-off ~A$250–400 per class, VERIFIED snippet); legal review of the service agreement (one-off A$1,000–3,000, ASSUMPTION).

### 3.2 Variable costs per customer per month

| Item | Essential | Managed | Premium |
|---|---|---|---|
| API tokens (file 07, at 20/50/100 reviews) | A$0.50 | A$1.20 | A$2.30 |
| SMS (approvals + review requests) | A$3 | A$10 | A$20 |
| Founder hours | 2.5 | 4.0 | 6.0 |
| Cash cost excl. labour | ~A$4 | ~A$11 | ~A$22 |
| Gross margin on cash costs | 99% | 98% | 97% |
| Labour at A$100/hour (shadow cost) | A$250 | A$400 | A$600 |
| Margin after shadow labour | 15% | 18% | 22% |

The business is a labour business. The cash margin is irrelevant; the hours per customer are the whole model. Every process improvement that cuts 30 minutes per customer per month is worth more than any pricing change.

## 4. Scenario model

Assumptions: plan mix 30% Essential, 55% Managed, 15% Premium (blended A$484/customer, ESTIMATE); fixed costs A$200/month; variable cash cost A$12/customer; founder hours per the table above (blended 4.0); founder capacity 5–8 hours/week = 22–35 hours/month.

| Customers | MRR | ARR | Cash costs/month | Contribution/month | Founder hours/month | Feasible on 5–8 h/week? |
|---:|---:|---:|---:|---:|---:|---|
| 3 | A$1,452 | A$17,424 | A$236 | A$1,216 | 12 + 4 sales | Yes |
| 5 | A$2,420 | A$29,040 | A$260 | A$2,160 | 20 + 4 sales | Yes |
| 10 | A$4,840 | A$58,080 | A$320 | A$4,520 | 40 + 4 sales | No: 10 h/week, or hire a VA for monitoring (~A$600–900/month) |
| 15 | A$7,260 | A$87,120 | A$380 | A$6,880 | 60 + 4 sales | Needs VA (15 h/week) plus founder 6–8 h/week |
| 20 | A$9,680 | A$116,160 | A$440 | A$9,240 | 80 + 4 sales | Needs a part-time account manager; founder becomes supervisor |

With a virtual assistant at A$30/hour taking 60% of delivery hours from customer 8 onward, contribution at 20 customers falls to roughly A$7,800/month but founder time stays at 8–10 hours/week. That is the realistic "alongside full-time employment" ceiling: about A$90–100k a year of contribution at 20 customers with one contractor.

## 4a. Onboarding time, review volume and acquisition assumptions (phase 2)

**Onboarding** (SOP 1 in `business/manual-operating-procedures.md`, checklist in `business/onboarding-checklist.md`): about 5 founder hours in a client's first month (agreement and authorisation 0.5h, set-up call 0.5h plus notes 0.5h, access and folder set-up 0.5h, logging and classifying existing reviews 1–1.5h, catch-up replies and first request batch 1.5–2h). Schedule pilots at least a week apart; three pilots starting in one month would consume most of a 5–8-hour week on their own.

**Review volume sensitivity** (hours per client per month, Managed tier, with templates and standing approval on five-star reviews):

| Reviews/client/month | Monitoring share | Drafting and approvals (10 min each) | Escalations (20% × 40 min) | Requests, report, calls | Total h | API cost (file 07) |
|---:|---:|---:|---:|---:|---:|---:|
| 20 | 1.0 | 3.3 | 2.7 | 1.5 | ~8.5 → ~4.0 after month 2* | A$0.30 |
| 50 | 1.0 | 8.3 | 6.7 | 1.5 | ~17.5 → ~9 after month 2* | A$0.70 |
| 100 | 1.0 | 16.7 | 13.3 | 1.5 | ~32 → ~17 after month 2* | A$1.35 |

\*After month two, standing approval on positive reviews and settled templates cut drafting time by about half and escalations by a third; the right-hand figures are the steady-state ESTIMATE. A 100-review-per-month client is a Premium client with a dedicated assistant, not a founder-only account. Tokens are irrelevant at every volume; hours are everything.

**Customer acquisition assumptions** (ESTIMATE): 20 verified prospects → 10 owner conversations → 6 free audits → 2–3 pilots; about 4 founder hours per won customer; zero cash cost beyond travel. Warm introductions convert at roughly double the rate of cold contact (HYPOTHESIS to measure).

**Maximum manageable load alongside full-time employment**: 6–8 Managed clients at 40 reviews a month on 5–8 hours a week; 10 with a part-time assistant for monitoring and logging; beyond 12 the founder is running an agency.

## 5. Churn sensitivity

Monthly churn assumptions for a month-to-month trades service: 3% (good), 6% (base), 10% (poor). Starting from 10 customers with 1.5 new customers added per month:

| Monthly churn | Customers after 12 months | Lifetime at that churn | Lifetime value at A$484 |
|---|---:|---:|---:|
| 3% | ~24 | 33 months | A$16,000 |
| 6% | ~19 | 17 months | A$8,100 |
| 10% | ~15 | 10 months | A$4,800 |

Implications: at 6% churn the business still grows on 1.5 sales a month; at 10% it stalls near 15. Seasonal trades (painting, roofing) will pause in winter; price a "pause" option (A$99 monitoring-only for up to two months) rather than losing the client. Customer acquisition cost is mostly founder hours (about 4 hours per won customer at a 1-in-3 audit-to-pilot conversion, ESTIMATE), so even the poor-churn case has acceptable payback.

## 6. Break-even

- Cash break-even is one Essential customer (A$299 against ~A$220 fixed).
- Break-even on the founder's time at a A$100/hour shadow rate is about 7 customers (A$3,400 MRR against ~A$3,000 of labour plus fixed costs).
- The business "earns its keep" as a side venture, by the founder's own likely standard of A$2,000+ a month contribution for 6–8 hours a week, at 5 customers.

## 7. Recommendations

1. Publish the ladder as is; sell Managed; use Essential as the down-sell and Premium for multi-location operators.
2. Charge GST-exclusive prices and register for GST at A$75,000 turnover (VERIFIED, file 08 §7), which arrives at about 13 customers.
3. Take payment by direct debit or card on invoice via your accounting tool; do not build payments into the site.
4. Add a 30-day notice, month-to-month agreement; never a 12-month lock-in. Make the cancellation path one email.
5. Track three numbers weekly: founder hours per customer, audits delivered, and pilots converted. Everything else is noise until customer ten.
