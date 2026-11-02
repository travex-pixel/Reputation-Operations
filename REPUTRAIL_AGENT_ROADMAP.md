# Reputrail agent roadmap

Technical design for how Reputrail could eventually support an AI agent, and why it should not yet. Written 2 November 2026. Companion to `src/lib/ai/*` (the AI boundary that exists today) and `research/07-api-cost-model.md`.

## 0. Position

The business is a managed service sold on human judgement. The immediate job is three paying pilots and a repeatable manual process. Automation follows the process; it does not precede it. The architecture below is built so that an agent can later use the same records and the same tools as the founder, under the same approval rules, without a rewrite. Nothing in this document authorises building an autonomous agent now.

## 1. What exists today (phase 0, shipped)

| Layer | Implementation | Agent-ready because |
|---|---|---|
| Domain model | `src/lib/domain/types.ts`: Prospect, Client, ReviewRecord, Classification, Draft (with approval states), Task, Audit, MonthlyReport, ActionLog | Structured records with explicit verification and approval states; no free-text-only fields where a decision lives |
| Storage | `src/lib/storage/store.ts`: a `StorageAdapter` interface with a browser localStorage implementation, JSON export/import | Swappable for a hosted database with the same interface |
| AI boundary | `src/lib/ai/provider.ts` (interface), `rules.ts` (deterministic fallback), `anthropic.ts` (Claude, server-only), `index.ts` (resolver) | Model provider is replaceable; outputs are structured; rules provide a baseline and a safety net |
| Capabilities | Review intelligence (classify), response assistant (draft), customer-experience intelligence (insights) | Each is a pure function from records to structured suggestions; none can publish or send |
| Approval system | Draft states: draft → awaiting_approval → approved / amended / rejected → published, with approver, time, channel and final text recorded | External actions are only ever recorded as done by a person |
| Tasks | Tasks created from classification outcomes (escalation), manually, and as monthly reporting deadlines | A scheduler could create the same tasks |
| Audit trail | `ActionLog` on prospects, reviews and tasks (actor: founder / system / ai / client) | Every automated step is attributable |
| Usage tracking | `usageLog` in the Anthropic provider records tokens and estimated USD per call | Cost per review and per client measurable from day one |
| Access | Passcode gate on `/workspace`; API key server-only; personal data minimised before any model call | Boundaries exist before an agent does |

What is deliberately *not* built: automatic review detection, automatic publishing, automatic customer messaging, browser agents, multi-agent orchestration, background jobs.

## 2. Capability roadmap

Each capability lists the data and tools it needs, what triggers it, what it produces, the human approval required, failure modes, privacy considerations, complexity (S/M/L) and whether simple automation suffices. "Agent" means an LLM deciding which tool to call; "automation" means a scheduled or event-driven script with no model in the loop.

### 2.1 Detect new reviews through an approved data source
- **Data:** client's authorised Google Business Profile (Manager role), hipages/Facebook where authorised.
- **Tools:** Google Business Profile API (application and approval required; project-level quota), or notification-email parsing from the client's forwarded alerts as an interim.
- **Trigger:** schedule (every 2–4 hours in working hours).
- **Output:** new `ReviewRecord` rows with `status: new`.
- **Approval:** none to *read*; the client's written authorisation and Manager invite are the consent.
- **Failures:** API quota or access revoked; duplicate detection; platform policy changes.
- **Privacy:** store reviewer first name and public text only; never scrape beyond the approved API.
- **Complexity:** M (API application is the long pole). **Simple automation suffices.** No LLM needed.

### 2.2 Classify reviews
- **Data:** review text, stars, client trade.
- **Tools:** `AiProvider.classify` (Haiku-class model) with the rules classifier as cross-check.
- **Trigger:** on new review.
- **Output:** `Classification` with sentiment, categories, issue, urgency, risk, sensitive flag, recommended action, rationale, source and model.
- **Approval:** none to classify; a person confirms or corrects before any external action depends on it. Sensitive flag from rules always wins (cannot be downgraded by the model).
- **Failures:** misclassification; sarcasm; mixed reviews; model outage (fallback to rules).
- **Privacy:** PII stripped before the call; no training on content (Anthropic commercial terms).
- **Complexity:** S. **LLM justified** (rules alone miss nuance); cost ~US$0.0001 per review.

### 2.3 Identify issues requiring attention
- **Data:** classifications, client escalation preferences.
- **Tools:** rules over the classification (negative, sensitive, not-a-customer, policy-flag candidate).
- **Trigger:** on classification.
- **Output:** review status `escalated`; escalation `Task` due today.
- **Approval:** none to create a task; the owner is informed, not acted for.
- **Failures:** alert fatigue if thresholds are wrong; missed sensitive terms.
- **Privacy:** internal.
- **Complexity:** S. **Simple automation suffices.**

### 2.4 Create internal tasks
- **Data:** classification outcomes, review-request schedule, reporting calendar, prospect next-action dates.
- **Tools:** task store.
- **Trigger:** events (2.3), schedule (monthly report due on the 3rd working day; weekly review-request batch).
- **Output:** `Task` rows with type, due date, assigned action.
- **Approval:** none.
- **Failures:** duplicate tasks (idempotency keys by type+client+period).
- **Complexity:** S. **Simple automation suffices.**

### 2.5 Draft appropriate responses
- **Data:** review, classification, client voice guide, previously approved replies.
- **Tools:** `AiProvider.draft` (Sonnet-class model).
- **Trigger:** on classification when not sensitive.
- **Output:** two `Draft` rows, `status: draft`, `source: ai`.
- **Approval:** **mandatory** before publication; sensitive complaints are never drafted automatically.
- **Failures:** invented facts, admissions of liability, promises of compensation. Mitigations: prompt rules, human edit, no auto-publish ever.
- **Privacy:** PII stripped; drafts stored with provenance.
- **Complexity:** S. **LLM justified**; cost ~US$0.006 per review.

### 2.6 Request client approval
- **Data:** draft text, client approval channel, standing approval flag (5-star only).
- **Tools:** SMS/email sending (Twilio/ClickSend or Workspace mail) with one-tap reply parsing ("YES", "EDIT …", "NO"), or an approval link to a tiny authenticated page.
- **Trigger:** draft ready.
- **Output:** draft `awaiting_approval` → `approved`/`amended`/`rejected`, with approver, channel, time recorded.
- **Approval:** this *is* the approval step; the system only asks.
- **Failures:** misread replies; approval from the wrong person; replay. Mitigations: signed approval links, per-client sender verification, idempotent state transitions.
- **Privacy:** the owner's contact details only; messages contain the draft, not customer details beyond first name.
- **Complexity:** M (sending and parsing, Spam Act compliance for the client as recipient is not an issue since it is a service message to a contracted client, but identification and opt-out are still good practice). **Automation suffices.**

### 2.7 Track customer recovery actions
- **Data:** escalations, owner call outcomes.
- **Tools:** task store; owner reply parsing ("called, rebooked Friday").
- **Trigger:** escalation task created; follow-up due dates.
- **Output:** `recovery` block on the review (contacted on, outcome, agreed, follow-up due).
- **Approval:** the owner performs the recovery; the system records. **No agent ever contacts a client's customer.**
- **Failures:** stale tasks; outcomes never recorded. Mitigation: reminder cadence.
- **Complexity:** S. **Automation suffices.**

### 2.8 Follow up on outstanding tasks
- **Data:** open tasks, due dates.
- **Tools:** scheduled reminders to the founder (and to the owner for approvals pending >2 working days).
- **Trigger:** schedule, daily.
- **Output:** reminder messages; task history entries.
- **Approval:** none (internal reminders).
- **Failures:** nagging; reminders during unsociable hours (respect client's escalation hours).
- **Complexity:** S. **Automation suffices.**

### 2.9 Update performance records
- **Data:** published replies (timestamps), recovery outcomes, requests sent, profile metrics from the Google Business Profile API where permitted.
- **Tools:** store; API read.
- **Trigger:** on each event; monthly roll-up.
- **Output:** period aggregates ready for the report generator.
- **Approval:** none.
- **Complexity:** S–M. **Automation suffices.**

### 2.10 Prepare monthly reports
- **Data:** period aggregates, previous report, owner-supplied business figures.
- **Tools:** report generator (deterministic KPIs and score) plus an LLM to draft the executive summary and observations from evidence.
- **Trigger:** monthly schedule.
- **Output:** draft `MonthlyReport` for the founder to review and send.
- **Approval:** founder reviews before sending; business figures must be owner-supplied, never inferred.
- **Failures:** over-claiming; hallucinated observations. Mitigation: narrative must cite log entries; attribution labels are computed, not generated.
- **Complexity:** S. **LLM optional** (summary only); cost ~US$0.03 per report.

## 3. Which of these need an agent?

None of 2.1–2.10 requires an agent in the sense of a model choosing tools. They are a pipeline: detect → classify → route → draft → ask → record → remind → report. The LLM is a component inside three steps (classify, draft, summarise). This is the recommended end state for the first 25 clients: **a scheduled pipeline with human approval gates**, not an agent.

An agent becomes worth considering only for open-ended tasks: investigating a dispute across several reviews and job records, deciding whether a policy flag is warranted and drafting the flag text, or preparing an owner briefing that needs reading several sources. Even then, one agent with a small tool set (read reviews, read job notes, draft text, create task) under approval is enough.

## 4. Future architecture (when justified)

```
                 ┌──────────────────────────┐
  schedules ───▶ │  Orchestrator (jobs)     │ ◀─── events (new review, approval reply)
                 └───────────┬──────────────┘
                             │ calls
        ┌────────────────────┼─────────────────────┐
        ▼                    ▼                     ▼
  Tools (typed)        Reasoning layer         Storage (Postgres)
  - reviews.read       (AiProvider: classify,  - clients, reviews, drafts,
  - drafts.create       draft, summarise;        tasks, reports, approvals,
  - tasks.create        later: one agent with    action log, usage log
  - approvals.request   these tools under
  - reports.compute     approval policy)
  - metrics.read
        │
        ▼
  Approval queue ──▶ founder / owner (SMS, email, signed link) ──▶ external action performed by a person
                                                                    (or by a tool only after approval, logged)
```

Principles: one reliable agent at most; tools are typed and allow-listed; every external action requires an approval record; the model provider is behind `AiProvider`; structured outputs over prose; idempotent jobs with retries and dead-letter logging; per-client data partitioning; usage and cost tracked per call.

Technology when the time comes: Postgres (Neon or Vercel Postgres) behind the `StorageAdapter`; Vercel Cron or a small worker for schedules; Anthropic Messages API (Haiku for routine, Sonnet for client-facing words, Opus only for sensitive analysis); Twilio or ClickSend for approvals by SMS; Google Business Profile API once approved. No agent framework is required; a tool runner with an approval hook is sufficient.

## 5. Storage: when to move off the browser

Today's localStorage store is right for one founder on one laptop with JSON backups. Move to a hosted database when any of these is true: two devices or two people need the data; reviews exceed a few thousand; scheduled jobs need to run without a browser open (2.1, 2.8). Options and implications:

| Option | Cost | Security/setup | Notes |
|---|---|---|---|
| Neon Postgres (free tier) | A$0 to start; paid from ~US$19/month | Connection string in Vercel env; row-level client partitioning by `clientId`; backups included | Standard SQL, easy export |
| Vercel Postgres / Marketplace | Usage-based | Same project; simplest wiring | Vendor-tied |
| Turso (SQLite edge) | Free tier generous | Token in env | Lightweight; fine for this data volume |

Any of these requires: an environment variable, a migration from the JSON export (the `WorkspaceData` shape maps directly to tables), and the passcode gate replaced by proper authentication once a second user exists. Do not introduce before the first paying clients; the JSON export is the migration path.

## 6. Security and operational boundaries (binding)

- Minimise personal information: reviewer first names only; customer contact details for review requests live in the client's consent log, not in the workspace or any prompt.
- Strip phones, emails and addresses before any model call (`minimise()` in `anthropic.ts`).
- No training on client data: Anthropic commercial terms; revisit if the provider changes.
- Keys and credentials server-side only; never in the browser bundle.
- Each client's records carry `clientId`; any hosted database partitions on it.
- Every AI output and every external action is logged with actor, time and content.
- Access restricted to the founder (passcode now; proper auth before a second user).
- Records can be corrected (classification correction, draft amendment) and deleted (client removal, review deletion, backup then reset).
- The public website never reads workspace data.
- No agent gets unrestricted access to email, browsers or client accounts; integrations use approved APIs under the client's written authorisation.

## 7. Cost discipline

| Scale | Reviews/month (est. 40 per client) | LLM cost/month (classify + draft + report, Sonnet/Haiku, no caching) | With caching and batch | Infra (Postgres + cron + SMS) |
|---|---:|---:|---:|---:|
| 10 clients | 400 | ~US$3–5 | ~US$2 | A$0–40 |
| 25 clients | 1,000 | ~US$8–12 | ~US$5 | A$30–80 |
| 50 clients | 2,000 | ~US$16–25 | ~US$10 | A$60–150 |
| 100 clients | 4,000 | ~US$32–50 | ~US$20 | A$120–300 |

Per client per month the model cost is under A$1. The founder's Claude Code subscription is a development cost and is kept separate from production API usage. Decision rule: use rules where rules work (routing, task creation, reminders); use Haiku for classification; use Sonnet for anything a client reads; use Opus only for sensitive analysis a person will review; never add infrastructure before the process it automates has run manually for at least two months.

## 8. Recommendation

1. **Now (0–3 clients):** operate manually with the workspace; log everything; measure minutes per review and per client; use Claude-assisted classification and drafting only when the key is set and always under approval.
2. **At 5–8 clients:** add SMS approval requests (2.6) and reminders (2.8); move storage to Postgres; apply for Google Business Profile API access (2.1).
3. **At 10–15 clients:** schedule detection, classification, routing and drafting as a pipeline with approval gates (2.1–2.5, 2.7, 2.9); auto-prefill reports (2.10).
4. **Only after that, if open-ended cases are frequent:** one agent with a small tool set for dispute investigation and policy-flag preparation, still under approval.

The first useful "agent" is not an agent. It is a cron job that reads new reviews, classifies them, drafts replies, and texts the owner for approval, with the founder watching the log. It becomes worth building when the founder's monitoring and drafting time exceeds about six hours a week (roughly eight clients), and it costs under A$1 per client per month to run.
