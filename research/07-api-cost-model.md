# 07 — API cost model

Scope: the production use of large-language-model APIs inside the Reputrail service (classification, drafting, complaint analysis, monthly reports). Not in scope: the founder's Claude Code or Claude.ai subscription, which is a personal productivity tool and should be treated as overhead, not cost of goods.

## 1. Published prices used

Anthropic prices were read in full from the official pricing page on 2 November 2026 (see `raw-openai-pricing.md` §2 for the full table and URLs). USD per million tokens:

| Model | Input | Output | Cache read | Batch (50% off) input/output | Intended Reputrail use |
|---|---:|---:|---:|---:|---|
| Claude Haiku 5.5 (prompts ≤100K) | $0.10 | $0.50 | $0.01 | $0.05 / $0.25 | Classification, sentiment tagging, review-request personalisation |
| Claude Sonnet 5.5 | $2.00 | $10.00 | $0.10 | $1.00 / $5.00 | Response drafting, monthly report, routine complaint analysis |
| Claude Opus 5.5 | $4.00 | $20.00 | $0.20 | $2.00 / $10.00 | Escalated complaint analysis only (legal threat, defect dispute, policy-flag assessment) |

Other verified modifiers (file `raw-openai-pricing.md` §2.3): prompt-cache writes cost 1.25× (5-minute) or 2× (1-hour) input; cache reads cost roughly a tenth of input; the Batch API halves both input and output and suits non-urgent work such as monthly reports.

OpenAI prices could only be found through third-party trackers (official page blocked) and conflict with each other; they are recorded as UNVERIFIED in `raw-openai-pricing.md` §1. Indicative only: GPT-5 mini around $0.25/$2.00 and GPT-5 nano around $0.05/$0.40 per million tokens would land in the same cost band as Haiku 5.5. The model choice does not change the conclusion below.

## 2. Token budget per task (ESTIMATE)

Token counts are estimates from the prompt designs in `business/manual-operating-procedures.md`; measure real usage in month one with the API's usage fields and replace these.

| Task | Model | Input tokens | Output tokens | USD per call | Notes |
|---|---|---:|---:|---:|---|
| Classify one review (type, severity, recovery needed, policy-flag candidate) | Haiku 5.5 | 700 (300 system + 250 review + 150 context) | 80 | $0.00011 | Cached system prompt lowers input further |
| Draft reply, two variants, in owner's voice | Sonnet 5.5 | 1,600 (900 voice guide + review + 3 examples) | 250 | $0.0057 | Voice guide cached: input falls to ~$0.0007 |
| Complaint analysis and owner briefing (negative reviews only) | Sonnet 5.5 | 2,500 | 500 | $0.010 | ~20% of reviews |
| Escalated analysis (legal/defect/policy flag) | Opus 5.5 | 3,000 | 700 | $0.026 | ~3% of reviews |
| Review-request message personalisation | Haiku 5.5 | 400 | 60 | $0.00007 | Or use plain templates: $0 |
| Monthly report draft | Sonnet 5.5 | 9,000 | 1,500 | $0.033 | One per customer; batch-eligible (halve it) |
| Competitor snapshot summary (quarterly/monthly) | Sonnet 5.5 | 3,000 | 400 | $0.010 | Premium only, monthly |

## 3. Monthly cost per customer at three volumes (ESTIMATE)

Assumes 20% of reviews are negative and get complaint analysis, 3% escalate to Opus, one monthly report, review requests equal to 1.5× review volume, no caching or batch discounts (worst case).

| Reviews/month | Classification | Drafting | Complaint analysis | Escalated analysis | Review requests | Report | Total USD | Total AUD (×1.5) |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 20 | $0.002 | $0.114 | $0.040 | $0.016 | $0.002 | $0.033 | **$0.21** | **A$0.31** |
| 50 | $0.006 | $0.285 | $0.100 | $0.039 | $0.005 | $0.033 | **$0.47** | **A$0.70** |
| 100 | $0.011 | $0.570 | $0.200 | $0.078 | $0.011 | $0.033 | **$0.90** | **A$1.35** |

Add a 2× safety factor for retries, longer prompts and experimentation, and the planning figure is **A$0.50–3.00 per customer per month**. At 20 customers that is under A$60 a month in the worst case. With prompt caching on the voice guide and batch processing of reports, actual spend should be about half of the table.

Conclusion: **tokens are not a cost driver.** Do not design the service around token savings; design it around founder minutes. Use Sonnet 5.5 for anything a client will read and Haiku 5.5 for anything only the founder will read.

## 4. Model policy (RECOMMENDATION)

- Routine: Haiku 5.5 for classification and tagging; Sonnet 5.5 for drafts, briefings and reports.
- Complex: Opus 5.5 only when a review involves a legal threat, a safety or defect allegation, a possible policy breach to flag, or a multi-review pattern. These are rare and the owner is always in the loop.
- Never auto-publish. Every draft is edited by a person and approved by the owner (file 08 §1.5 and §4).
- Strip personal data (customer names, phone numbers, emails) before sending text to the API; reinsert in the final draft by hand. Under Anthropic's commercial terms customer content is not used for training, and default retention is limited, but minimisation is still the right default (VERIFIED, file 08 §6).
- Re-check prices quarterly; model prices moved materially during 2025–26.

## 5. True operating costs beyond tokens

| Cost | Monthly A$ (ESTIMATE unless noted) | Note |
|---|---:|---|
| Founder time on API-assisted tasks | the dominant cost | ~10 min per review end-to-end, ~45 min per report |
| SMS (approvals, review requests) | 10–40 at launch; ~A$0.08–0.12 per message ASSUMPTION | Twilio/ClickSend Australian prices NOT RETRIEVED this session |
| Google Workspace | 9.90–11.80 | VERIFIED snippet |
| Vercel Pro hosting | ~30 (US$20) | VERIFIED third-party snippet; required because Hobby is non-commercial |
| Spreadsheet/CRM | 0 (Google Sheets) | |
| Monitoring labour | included in founder time | Manual checks until a Google Business Profile API application is justified (file 08 §4.4) |
| Prompt and template maintenance | 1–2 founder hours/month | Voice guides drift as the client's business changes |
| Compliance overhead | 1 founder hour/month | Consent log, unsubscribe handling, authorisation records |
| Quality incidents | rare but expensive | A wrong public reply costs trust, not tokens; this is why approval is mandatory |

## 6. What to measure in month one

1. Actual input/output tokens per task from the API usage fields, to replace §2.
2. Cache hit rate on the voice guide (target >80%).
3. Minutes per review from notification to published reply, split into founder time and waiting-for-approval time.
4. Share of reviews that needed a human rewrite of the draft (target <30% after the first fortnight per client).
