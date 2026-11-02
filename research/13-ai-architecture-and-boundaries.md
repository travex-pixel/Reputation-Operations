# 13 — AI architecture, boundaries and cost discipline

Companion to `REPUTRAIL_AGENT_ROADMAP.md` (what could be built later) and `07-api-cost-model.md` (token economics). This file records what is AI-assisted today, what is plain automation, and the rules that bind both.

## 1. What is AI-assisted now

| Capability | Where | Model (when `ANTHROPIC_API_KEY` is set) | Without a key | Human control |
|---|---|---|---|---|
| Review intelligence: sentiment, categories, underlying issue, urgency, risk, sensitive flag, recommended action, rationale | `/workspace/ops` → Classify | Claude Haiku 5.5 via `AnthropicProvider.classify` | Deterministic rules (`classifyByRules`): star rating + keyword lists | Founder confirms or corrects every classification; corrections are recorded as `source: human` |
| Response assistant: two drafts in the owner's voice | `/workspace/ops` → Draft replies | Claude Sonnet 5.5 via `AnthropicProvider.draft`, using the client's voice guide and previously approved replies | Templates with placeholders (`draftByRules`) | Mandatory owner approval before publishing; sensitive complaints are never drafted automatically |
| Customer-experience intelligence: recurring complaints, service failures, positive drivers, emerging risks, with quoted evidence | `/workspace/ops` → Customer insights | Claude Sonnet 5.5 via `AnthropicProvider.insights` | Theme counting over classified categories (`insightsByRules`) | Presented as prompts for the owner conversation, never as conclusions |
| Audit narrative and report narrative | `/workspace/audit`, `/workspace/reports` | Not yet: both are deterministic from supplied inputs (an AI narrative hook exists in the audit type) | Same | Founder edits before sending |

Everything else in the workspace is simple automation or manual: task creation from classification outcomes, reporting deadlines, KPI derivation, the Reputrail Score, prospect scoring (seeded from research), backups.

## 2. Honesty about the fallback

The rules provider is labelled as rules in every output ("This is simple automation, not AI; a person must confirm or correct it"). It exists so the workspace works without a key and so there is a baseline to judge a model against. The sensitive-term check from the rules always overrides a model's judgement: a model can escalate a review the rules missed, but it can never un-escalate one the rules flagged.

## 3. Boundaries (binding)

- **No publishing, sending or account changes by any model or script.** The only "external actions" in the system are recorded as performed by a person.
- **Approval states are explicit**: AI recommendation → draft prepared → awaiting human approval → approved/amended/rejected → action completed, each with actor, time and content.
- **Personal data is minimised before any model call**: phone numbers, emails and street addresses are replaced with placeholders; reviewer first names only.
- **No training on client data**: Anthropic's commercial terms (read in full, 2 November 2026) state customer content is not used to train models; the data processing addendum covers breach notice (48 hours) and deletion (30 days after termination). Re-check if the provider changes.
- **Keys server-side only**: the Anthropic client lives in a `server-only` module; the browser calls server actions.
- **Per-client separation**: every record carries a `clientId`; a hosted database would partition on it.
- **Correct and delete**: classifications can be corrected, drafts amended or rejected, reviews and clients deleted; backups are explicit JSON files the founder controls.
- **Workspace access**: passcode gate; proper authentication before a second user.
- **Public site isolation**: the marketing site never reads workspace data.

## 4. Does the task need an LLM?

| Task | Needs an LLM? | Why |
|---|---|---|
| Detect new reviews | No | API or notification parsing |
| Classify sentiment and category | Helpful | Rules miss nuance (sarcasm, mixed reviews); Haiku is cheap enough |
| Decide escalation | No | Rules over the classification (negative, sensitive, not-a-customer) |
| Create tasks and reminders | No | Events and schedules |
| Draft replies in the owner's voice | Yes | The value is personalisation and tone |
| Request approval | No | Message plus reply parsing |
| Track recovery | No | Forms and dates |
| Derive KPIs and the score | No | Arithmetic |
| Draft the report narrative | Optional | Saves minutes; must cite evidence |
| Find patterns across reviews | Helpful | Theme counting works at small volumes; a model adds nuance at larger ones |

## 5. Model policy and cost

- Routine classification: Haiku 5.5 (US$0.10/$0.50 per MTok). Client-facing words: Sonnet 5.5 (US$2/$10). Opus 5.5 only for sensitive analysis a person will review; not wired by default.
- Cost per review processed (classify + two drafts, no caching): about US$0.006. Per client per month at 40 reviews: about US$0.25–0.50 (A$0.40–0.75). With prompt caching on the voice guide and batch reports: roughly half.
- At 10 / 25 / 50 / 100 clients: roughly US$3–5 / 8–12 / 16–25 / 32–50 per month before caching. See the roadmap §7.
- The founder's Claude Code or Claude.ai subscription is a development tool and is not a cost of delivering the service; production usage is the API key's spend, visible in the Anthropic console and in the provider's in-memory usage log (tokens and estimated USD per call).
- No paid service is introduced without approval: the Anthropic API is optional (the key is unset by default); SMS, hosted database and Google API integrations are roadmap items with their costs listed in `REPUTRAIL_AGENT_ROADMAP.md`.

## 6. Which tasks should always require human approval

Publishing any public reply; contacting any customer; submitting a policy flag to Google; sending a review request batch (the list comes from the client; the send is a person's action until the Spam Act process is audited); promising anything (refunds, discounts, revisits) on the client's behalf; any change to a client's profile or account; and any monthly report before it is sent.

## 7. The first useful "agent"

Not an agent. A scheduled job that: reads new reviews from an approved source, classifies them, creates escalation tasks, drafts replies for non-sensitive reviews, and texts the owner for approval, while a person watches the log. It becomes worth building when monitoring and drafting exceed about six founder hours a week (roughly eight clients), and it would cost under A$1 per client per month in model usage plus modest infrastructure. Everything in the current codebase is arranged so that this job can call the same `AiProvider`, write the same records and respect the same approval states.
