# Raw facts — LLM API pricing and tooling prices

**Access date for everything below: 2026-11-02.** Prices in USD unless stated. "Full read" = page fetched and read in this session; "snippet-only" = figure taken from a search-engine result snippet of the cited page; "third-party tracker" = not the vendor's own page.

**Session constraints:** openai.com and platform.openai.com could not be resolved under the session's network policy, so **no OpenAI figure below is from an official page** — all are third-party trackers and conflict in places. The following vendor hosts were also blocked: workspace.google.com, vercel.com, twilio.com, clicksend.com, zapier.com, make.com, calendly.com, xero.com, tally.so, typeform.com, resend.com, postmarkapp.com. The WebSearch budget for the turn was exhausted before the Twilio/ClickSend/Zapier/Make/Calendly/Xero/Tally/Typeform/Resend/Postmark searches ran, so those items are recorded as **NOT RETRIEVED** rather than guessed. Anthropic pricing was read in full from official pages.

---

## 1. OpenAI API pricing (ALL third-party, UNVERIFIED against openai.com)

| Model | Input $/1M | Cached input $/1M | Output $/1M | Source (snippet-only) | Notes |
|---|---|---|---|---|---|
| GPT-5 | ~1.25 | — | ~10.00 | https://modelcompare.dev/pricing/openai-api-pricing (May 2026 note) | Several trackers say GPT-5 / GPT-5 mini / GPT-5 nano / GPT-4o are **no longer listed on OpenAI's official pricing page**, superseded by GPT-5.4 / 5.5 family (https://morphllm.com/openai-api-pricing ; https://deploybase.ai/articles/openai-api-pricing-2026) |
| GPT-5 mini | 0.25 | — | 2.00 | https://anotherwrapper.com/llm-pricing/gpt-5-mini-2025-08-07 (page dated 2 Sept 2026) | |
| GPT-5 nano | 0.05 | — | 0.40 | https://pricepertoken.com/pricing-page/model/openai-gpt-5-nano (updated 3 Jul 2026) | Conflict: https://computeprices.com/providers/openai/models/gpt-5-nano lists 0.025 / 0.20 (Aug 2026) — unresolved |
| GPT-4.1 nano | 0.10 | — | 0.40 | https://fungies.io/?p=38878 (comparison table) | Only GPT-4.1 nano surfaced; GPT-4.1 / GPT-4.1 mini NOT RETRIEVED |
| GPT-5.4 nano | — | 0.020 | — | https://pricepertoken.com/pricing-page/model/openai-gpt-5.4-nano | cached-input figure only |
| GPT-5.5 (reported current flagship) | 5.00 | 0.50 | 30.00 | https://morphllm.com/openai-api-pricing | third-party |
| "GPT-5.6 Sol / Terra / Luna" | 5 / 2.50 / 1 | — | 30 / 15 / 6 | one July 2026 page (https://gptprompts.ai/openai-api-pricing) | **uncorroborated**; treat as unreliable |

- **Cached input**: one provider summary says cached input bills at **10% of the standard input rate** (https://www.costbench.com/software/llm-api-providers/openai-api/) — snippet-only, third-party.
- **Batch API**: "50% discount on all models" (https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits) — snippet-only, third-party.
- **Flex processing** pricing: NOT RETRIEVED.
- **Action:** confirm every OpenAI figure at https://openai.com/api/pricing/ or https://platform.openai.com/docs/pricing before using it in a model.

---

## 2. Anthropic Claude API pricing — OFFICIAL, full page reads

Sources: https://claude.com/pricing (full read; redirect target of anthropic.com/pricing) and https://platform.claude.com/docs/en/about-claude/pricing (full read). "All prices are in USD."

### 2.1 Per-million-token prices (platform.claude.com pricing table)

| Model | Base input | 5-min cache write | 1-hour cache write | Cache read | Output |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $10 | $12.50 | $20 | $0.25 | $50 |
| Claude Fable 5 | $10 | $12.50 | $20 | $1.00 | $50 |
| Claude Opus 5.5 | $4 | $5 | $8 | $0.20 | $20 |
| Claude Opus 5 | $5 | $6.25 | $10 | $0.50 | $25 |
| Claude Opus 4.8 / 4.7 / 4.6 / 4.5 | $5 | $6.25 | $10 | $0.50 | $25 |
| Claude Sonnet 5.5 | $2 | $2.50 | $4 | $0.10 | $10 |
| Claude Sonnet 5 | $2 | $2.50 | $4 | $0.20 | $10 |
| Claude Sonnet 4.6 / 4.5 | $3 | $3.75 | $6 | $0.30 | $15 |
| Claude Haiku 5.5 (prompt ≤100K tokens) | $0.10 | $0.125 | $0.20 | $0.01 | $0.50 |
| Claude Haiku 5.5 (prompt >100K tokens) | $0.50 | $0.625 | $1.00 | $0.05 | $2.50 |
| Claude Haiku 4.5 | $1 | $1.25 | $2 | $0.10 | $5 |
| Claude Haiku 3.5 (retired on first-party API) | $0.80 | $1.00 | $1.60 | $0.08 | $4 |
| Claude Opus 4.1 / 4 (retired on first-party API) | $15 | $18.75 | $30 | $1.50 | $75 |

VERIFIED (full read).

### 2.2 Batch API — **50% off input and output** (VERIFIED, full read)

"The Batch API allows asynchronous processing of large volumes of requests with a 50 percent discount on both input and output tokens." Examples: Opus 5.5 $2 / $10; Sonnet 5.5 $1 / $5; Haiku 5.5 (≤100K) $0.05 / $0.25; Haiku 4.5 $0.50 / $2.50. Most batches finish in under 1 hour; batch storage retention 29 days; Batch is **not ZDR-eligible** (https://platform.claude.com/docs/en/build-with-claude/batch-processing, full read).

### 2.3 Other modifiers (VERIFIED, full read)
- **Prompt caching**: 5-min cache write = 1.25× base input; 1-hour write = 2× base input; cache read = 0.1× base input (0.05× on Opus 5.5/Sonnet 5.5; 0.025× on Fable 5.1). Prices on claude.com/pricing assume the 5-minute TTL.
- **US-only inference** (`inference_geo: "us"`): **1.1×** on all token categories (Claude 4.6+ models). Multipliers stack with the Batch discount.
- **Fast mode**: Opus 5.5 $8 / $40; Opus 5 and 4.8 $10 / $50 (2× standard); not available with Batch.
- **Long context**: Claude 4.6+ models (except Haiku 5.5) include the 1M-token context window at standard pricing.

### 2.4 Cost sanity check for Reputrail's workload (ESTIMATE)
Classifying one review (~300 input tokens incl. prompt, ~50 output) on Haiku 5.5: ≈ $0.00003 + $0.000025 ≈ **$0.00006 per review**; drafting a response on Sonnet 5.5 (~800 in / ~200 out): ≈ $0.0016 + $0.002 ≈ **$0.0036 per draft**. At 10,000 reviews and 2,000 drafts per month: ≈ $0.60 + $7.20 ≈ **under US$10/month** before caching or batch. ESTIMATE from the verified unit prices above.

### 2.5 Third-party Anthropic figures seen (for cross-check only; snippet-only)
Haiku 4.5 $1/$5, Sonnet 4.6 $3/$15, Opus 4.6 $5/$25, Fable 5 $10/$50 — consistent with the official table (https://finout.io/blog/anthropic-api-pricing ; https://www.morphllm.com/anthropic-claude-api-pricing). Some blogs list "Sonnet 5 $2/$10" and a "cancelled September 2026 price increase" — the official table confirms the $2/$10 figure; the price-increase claim is UNVERIFIED.

---

## 3. Tooling prices

| Tool | Figure found | Status / source |
|---|---|---|
| **Google Workspace Business Starter (AU)** | **A$9.90 per user/month** (annual commitment, billed monthly); **A$11.80** flexible monthly; 30 GB/user. Resellers: Digital Pacific "from A$9.90"/A$10.90; VentraIP A$10.90 annual / A$12.80 flexible | Snippet-only of Google's own AU page https://workspace.google.com/intl/en_au/business/ (snippet garbled — pairing of prices inferred; GST inclusion not confirmed); https://www.whtop.com/plans/ventraip.com.au/149223 ; https://billing-stg.digitalpacific.com.au/index.php/store/email-hosting — VERIFIED (snippet) |
| **Vercel Pro** | **US$20 per seat/month**; includes one deploying seat and US$20 infrastructure credit; additional deploying Owner/Member seats US$20 each; Viewer seats free; usage billed on top | Third-party, snippet-only: https://makerkit.dev/blog/saas/vercel-cost ; https://dev.to/nayankyada/vercel-pricing-2026-what-you-actually-pay-for-a-real-nextjs-project-33md ; https://costbench.com/software/developer-tools/vercel/ — VERIFIED (snippet, third-party); official vercel.com/pricing blocked |
| **Vercel Hobby — commercial use** | "Our Hobby plan is for personal, non-commercial use." Hobby limits reported ~100 GB transfer, 1M edge requests, 1M function invocations, 4h active CPU, 1 member | Quote from archived pricing page https://ZEIT.co/pricing and 2026 guides attributing same wording to current FAQ (https://livemy.app/blog/vercel-pricing) — VERIFIED (snippet, third-party). **Implication:** Reputrail's client-facing app must be on Pro (≥US$20/month). |
| **Twilio SMS Australia** | NOT RETRIEVED (search budget exhausted; twilio.com blocked) | Check https://www.twilio.com/en-us/sms/pricing/au |
| **ClickSend SMS Australia** | NOT RETRIEVED (clicksend.com blocked). Only ClickSend's Spam Act help article was seen (https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2), no prices | Check https://www.clicksend.com/au/pricing/ |
| **Zapier** | NOT RETRIEVED | Check https://zapier.com/pricing |
| **Make.com** | NOT RETRIEVED | Check https://www.make.com/en/pricing |
| **Calendly** | NOT RETRIEVED | Check https://calendly.com/pricing |
| **Xero (AU)** | NOT RETRIEVED | Check https://www.xero.com/au/pricing-plans/ |
| **Tally** | NOT RETRIEVED | Check https://tally.so/pricing |
| **Typeform** | NOT RETRIEVED | Check https://www.typeform.com/pricing/ |
| **Resend** | NOT RETRIEVED | Check https://resend.com/pricing |
| **Postmark** | NOT RETRIEVED | Check https://postmarkapp.com/pricing |

No figures have been invented for the NOT RETRIEVED rows. A follow-up session with the vendor hosts allowed (or a fresh search budget) can fill them in.

---

## 4. Related Australian setup costs captured during research (snippet-only; see 08-compliance-and-risk.md §7)
- ASIC business name: A$47 (1 yr) / A$108 (3 yrs) from 1 July 2026 (https://ausbusinessregister.com.au/asic-fees-australia/).
- IP Australia trade mark: ~A$250/class picklist standard; TM Headstart ~A$200/class + ~A$130 Part 2 (third-party; conflicting) (https://sprintlaw.com.au/articles/ip-australia-trade-mark-fees-explained/).
- PI insurance for consultants ~A$40–100/month; PL ~A$300–900/yr for very-low-risk sole traders (broker estimates, https://www.upcover.com/blog/professional-indemnity-insurance-cost).
- GST registration threshold A$75,000 (https://www.ato.gov.au/businesses-and-organisations/GST-excise-and-indirect-taxes/GST/registering-for-GST).

---

## Sources
- https://claude.com/pricing (full read)
- https://platform.claude.com/docs/en/about-claude/pricing (full read)
- https://platform.claude.com/docs/en/build-with-claude/batch-processing (full read)
- https://platform.claude.com/docs/en/manage-claude/data-residency (full read)
- https://modelcompare.dev/pricing/openai-api-pricing
- https://morphllm.com/openai-api-pricing
- https://deploybase.ai/articles/openai-api-pricing-2026
- https://anotherwrapper.com/llm-pricing/gpt-5-mini-2025-08-07
- https://pricepertoken.com/pricing-page/model/openai-gpt-5-nano
- https://pricepertoken.com/pricing-page/model/openai-gpt-5.4-nano
- https://computeprices.com/providers/openai/models/gpt-5-nano
- https://fungies.io/?p=38878
- https://gptprompts.ai/openai-api-pricing
- https://www.costbench.com/software/llm-api-providers/openai-api/
- https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits
- https://finout.io/blog/anthropic-api-pricing
- https://www.morphllm.com/anthropic-claude-api-pricing
- https://workspace.google.com/intl/en_au/business/
- https://www.whtop.com/plans/ventraip.com.au/149223
- https://billing-stg.digitalpacific.com.au/index.php/store/email-hosting
- https://makerkit.dev/blog/saas/vercel-cost
- https://dev.to/nayankyada/vercel-pricing-2026-what-you-actually-pay-for-a-real-nextjs-project-33md
- https://costbench.com/software/developer-tools/vercel/
- https://ZEIT.co/pricing
- https://livemy.app/blog/vercel-pricing
- https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2
- https://ausbusinessregister.com.au/asic-fees-australia/
- https://sprintlaw.com.au/articles/ip-australia-trade-mark-fees-explained/
- https://www.upcover.com/blog/professional-indemnity-insurance-cost
- https://www.ato.gov.au/businesses-and-organisations/GST-excise-and-indirect-taxes/GST/registering-for-GST
