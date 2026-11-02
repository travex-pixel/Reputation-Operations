# Reputrail

Managed online-reputation and customer-feedback service for Sydney trade businesses. This repository holds the marketing website (Next.js) and the founder's research and operating documents.

**Tagline:** Your reputation. In good hands.

## What is here

| Path | What |
|---|---|
| `src/` | The website (Next.js 16 App Router, TypeScript, Tailwind CSS v4, self-hosted fonts, one server action for the audit form) **and the internal founder workspace at `/workspace`**: prospect database, audit generator, monthly report generator, operations board with a human approval chain, clients, backup/restore. No database, payments or integrations by design; workspace data lives in the founder's browser with JSON export. |
| `src/lib/domain`, `src/lib/ai`, `src/lib/score`, `src/lib/report`, `src/lib/storage` | Domain model, AI boundary (Claude or labelled rules fallback), Reputrail Score, KPI derivation, storage adapter. See `REPUTRAIL_AGENT_ROADMAP.md`. |
| `REPUTRAIL_AGENT_ROADMAP.md` | How an agent could eventually use the same records and tools, and why not yet. |
| `FOUNDER_HANDOVER.md` | Phase-2 handover: what works, what is incomplete, how to run and deploy, next 48 hours. |
| `research/` | Market, segmentation, vertical scoring, competitor, customer-validation, prospect, commercial, API-cost, compliance, operating-model, launch, customer-success and AI-architecture research, with a source register, a 50-row enriched prospect CSV (`prospect-list-v2.csv`) and 15 deep audits (`prospect-audits/`). Start at `research/00-executive-summary.md`. |
| `business/` | Pilot offer, conversation scripts, SOPs, objection handling, brand positioning, onboarding checklist, authorisation and approval process, monthly report template, compliant cold-contact approach. |
| `PRODUCT.md` | Product truth used for design decisions (Impeccable format). |
| `DESIGN.md` | Design tokens, type scale, components, motion and accessibility rules. |
| `design/home-surface-brief.md` | The homepage direction contract and the candidate visual worlds considered. |
| `.impeccable/review/` | Screenshots and reports from the QA passes (not needed to run the site). |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Node 20+ is required. No environment variables are needed for local development: the audit form shows an honest "not connected, email us instead" message until a webhook is configured, and the workspace at http://localhost:3000/workspace opens without a passcode (with a warning banner) and runs its labelled rules fallback until `ANTHROPIC_API_KEY` is set. Copy `.env.example` to `.env.local` to set any of these.

### The workspace

`/workspace` is the founder's operating tool, not a customer product. It is seeded with the 50 researched prospects (rebuild the seed after editing the CSV with `node scripts/build-seed.mjs`). Data persists in the browser's local storage; download a backup from Settings after each session and keep it in Drive. Flows: Prospects (filter, sort, stage, edit, log contact) → Audit generator (prefill from a prospect, generate, save, print to PDF) → Clients (voice guide, approval rules) → Operations (log reviews, classify, draft, send for approval, record approval, record publication, track recovery, tasks, insights) → Monthly reports (prefill from the log, generate with KPIs, attribution labels and the Reputrail Score, print). Everything a model produces is a suggestion; nothing publishes or sends.

## Deploy to Vercel

1. Import the repository in Vercel. Framework preset: Next.js. No build settings need changing.
2. Add environment variables:
   - `AUDIT_WEBHOOK_URL`: where audit requests are POSTed as JSON (`business, name, contact, contactType, listing, source, receivedAt`). A Make/Zapier webhook feeding a Google Sheet, a Formspree endpoint, or any HTTPS URL that returns 2xx. Without it the form degrades honestly.
   - `NEXT_PUBLIC_SITE_URL`: the canonical URL (defaults to `https://reputrail.com.au`), used for metadata, Open Graph, sitemap and robots.
   - `WORKSPACE_PASSCODE`: required before deploying; gates `/workspace`.
   - `ANTHROPIC_API_KEY` (optional): enables Claude-assisted classification, drafting and insights in the workspace. Usage is a few cents per client per month; see `research/13-ai-architecture-and-boundaries.md`.
3. Preview deployments on the Hobby plan are fine while private. Vercel's Hobby plan is for personal, non-commercial use, so move the project to **Vercel Pro** before promoting the site to customers (see `research/10-launch-plan.md`).
4. Point `reputrail.com.au` (and `reputrail.au`) at the project once the business name and domain are registered.

## Before going public: a checklist

- [ ] Run the ASIC, ABN Lookup, IP Australia and auDA checks on the name (`research/raw-name-clearance.md`).
- [ ] Add the founder’s name and phone number in `src/lib/site.ts`. The site says "someone who picks up the phone", so do not send prospects to it until the number is live (the footer and closing section show it automatically once set).
- [ ] Add the ABN to `src/lib/site.ts` once registered.
- [ ] Have a lawyer review `/privacy` and the service agreement outline (`research/08-compliance-and-risk.md` §10).
- [ ] Set `AUDIT_WEBHOOK_URL` and test a submission end to end.
- [ ] Move to Vercel Pro.
- [ ] Set `WORKSPACE_PASSCODE`; optionally `ANTHROPIC_API_KEY`.
- [ ] Download a workspace backup after every working session.

## Design and QA process

The site was built with the [Impeccable](https://github.com/pbakaus/impeccable) design method (direction contract, craft floor, finish review) and checked against Vercel's Web Interface Guidelines. QA evidence in `.impeccable/review/`: screenshots at 390, 820 and 1440 wide for every route and state; Impeccable detector 0 anti-patterns; axe-core 0 violations; keyboard, reduced-motion, no-JS and form-state tests via Playwright. Workspace evidence in `.impeccable/review/workspace/`: a 39-check Playwright run covering the passcode gate, prospect filtering, sorting, stage changes and persistence, detail edits, audit generation and print view, client creation, review logging, rules classification, drafting, the approval chain, recovery tracking, insights, report prefill and generation, backup export, and mobile overflow.

### Skills committed in `.claude/`

As in the NewApp repository, the Impeccable skill (4.8.0) and its four helper agents are committed under `.claude/skills/impeccable` and `.claude/agents/`, alongside Vercel's `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns` and `deploy-to-vercel` skills. Every Claude Code session on this repo can run `/impeccable critique`, `/impeccable audit`, `/impeccable polish` and the rest. The engine binary is gitignored; the launcher downloads it on first run (`impeccable.style`), or build it from source with `cargo build --release -p impeccable` in a clone of pbakaus/impeccable and place it at `.claude/skills/impeccable/scripts/bin/linux-x64/impeccable` (or `darwin-arm64` on a Mac). No design hook is configured in `.claude/settings.json`; run `npx impeccable install` locally if you want the automatic post-edit checks.

To scan the running site: `.claude/skills/impeccable/scripts/impeccable detect http://localhost:3000` and `... detect --viewport 390x844 http://localhost:3000`.

## Fonts and licences

Instrument Sans and JetBrains Mono are used under the SIL Open Font License; copies of the licences are in `src/fonts/`. The fonts are subset and self-hosted; no third-party font requests are made.

## Non-goals for this release

Customer login, dashboards, payments, Google Business Profile API integration, review scraping, automated publishing, background agents. The service is operated manually (see `business/manual-operating-procedures.md`); the website's job is to start conversations.
