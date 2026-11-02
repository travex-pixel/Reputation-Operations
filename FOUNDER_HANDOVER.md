# Founder handover — phase 2 (2 November 2026)

## 1. What was built

- **Public website** (`/`, `/audit`, `/privacy`): the phase-1 site plus a new "How we measure whether it's working" section with the four reporting categories, the Reputrail Score and an illustrative monthly report (fictional, labelled), a repositioned supporting proposition, a FAQ entry on the score, and header navigation to it.
- **Internal workspace** (`/workspace`, passcode-gated):
  - **Prospects**: 50 researched Sydney businesses with 32 research fields each, fit score, verification status, filters (search, trade, suburb, stage, minimum fit), sortable columns (fit, rating, reviews, negative %, owner replies %, name), inline stage changes through Researching → Qualified → Audit prepared → Contacted → Meeting booked → Pilot proposed → Won / Lost, a detail editor for every field, next action and due date, contact logging and a history trail. Blank cells mean "not observed", never zero.
  - **Audit generator**: type what you observed (or prefill from a prospect), generate a one-page audit that separates supplied observations from analysis, save it, and print to PDF. Saving moves the prospect to "Audit prepared".
  - **Clients**: owner name, plan, voice guide, escalation contact, baseline owner hours, standing approval flag (five-star only), competitors.
  - **Operations**: log reviews; classify (sentiment, categories, issue, urgency, risk, sensitive flag, recommended action, rationale) with one-click correction; draft two replies in the owner's voice; an explicit approval chain (draft → awaiting approval → approved/amended/rejected → published) recording who approved, when, via which channel and what was actually published; sensitive complaints are escalated and never drafted automatically; customer-recovery tracking; tasks (escalations are created automatically; reporting deadlines on demand); customer-experience insights with quoted evidence.
  - **Monthly reports**: prefill from the review log, enter owner-supplied figures with their source, generate KPIs with previous-period comparison and actual/estimate/unverified labels, the Reputrail Score with renormalisation when data is missing, executive summary, observations and recommendations; save and print to PDF.
  - **Settings & data**: founder name, AI status, JSON backup and restore, refresh prospects from research keeping progress, load a fictional sample client, reset.
- **AI boundary**: `AiProvider` interface with a server-only Claude implementation (Haiku 5.5 for classification, Sonnet 5.5 for drafting and insights, overridable) and a deterministic rules fallback that labels itself. Personal data is stripped before any model call. Nothing publishes or sends.
- **Research and documents**: vertical scoring of 12 trades (file 11); enriched prospect database and 15 deep audits; customer-success framework and the Reputrail Score (file 12); AI architecture and boundaries (file 13); agent roadmap; onboarding checklist; authorisation and approval process; monthly report template; compliant cold-contact approach; economics update (onboarding time, review-volume sensitivity, acquisition assumptions).

## 2. What works, and what is incomplete

**Verified working** (39 automated checks plus visual review): passcode gate; prospect seeding, filtering, sorting, stage persistence across reloads, detail edits; audit prefill, generation, save and print view; client creation; review logging; rules classification and automatic escalation tasks; drafting; the full approval and publish chain; recovery tracking; insights; report prefill, generation, save and print; backup export; no horizontal overflow on mobile; no console errors. Public site: Impeccable detector 0 anti-patterns at 1280 and 390, axe-core 0 violations, no overflow, no console errors.

**Incomplete or deliberately not built**
- Claude-assisted mode was built against the SDK but could not be exercised end to end here because no `ANTHROPIC_API_KEY` is available in this environment; the rules fallback was tested instead. Set the key in Vercel and try a classification; the status card on the Overview confirms the connection.
- Workspace data lives in one browser. There is no sync between devices and no second-user access. The JSON backup is the safety net and the migration path to a hosted database (roadmap §5).
- No Google Business Profile integration, no automatic review detection, no SMS/email sending, no automatic publishing: all by design at this stage.
- The audit and report narratives are deterministic; an AI narrative hook exists but is not wired, so wording is template-based until you edit it.
- Founder name, phone, photo and ABN remain placeholders on the public site.
- Prospect data is snippet-level; star breakdowns and 12-month negative counts are blank for every row because they were not publicly visible. Each top-15 audit lists the three Google Maps checks to do before contact.

## 3. The winning vertical and the evidence

Plumbing (71.0/100) and HVAC (69.5) are a statistical tie on the briefed weights; roofing (65.0) is third; painting is ninth (56.0). Evidence: ABS 8165.0 turnover bands (57% of plumbers and 64% of HVAC firms turn over A$200k+, versus 38% of painters); employing-business shares; exit rates; recurring servicing (HVAC) and continuous review volume (plumbing); competitor and marketplace pricing. Theory, not yet evidence: willingness to pay A$299–499 in each vertical and the reachability of owners. The recommended test: three parallel 30-day cohorts (plumbing, HVAC, roofing), 10 owner conversations and 5 audits each, three fixed discriminating questions, and the first vertical to sign two paid pilots at A$299+ wins. Full detail: `research/11-vertical-scoring.md`.

## 4. The top 15 prospects and why

See `research/prospect-audits/README.md` for the ranked table and one audit per business. Ranked by likelihood of paying (owner reachable, employing business, visible reputation gap, HVAC/plumbing/electrical weighting), not by negativity. Leaders: Alpha & Omega Air Conditioning (Kirrawee; verified third-party rating below Shire peers; 36-year Daikin dealer), Pipe Perfection Plumbers (Marrickville; low Trustpilot/Houzz pages against a high Google count; fragmentation), Ready Electrical & Air Conditioning (Oxford Falls; ~520 Google reviews at 4.9, hiring office staff, two unanswered negatives; a response-at-volume sale), Priority Plus Plumbing (Kirrawee; 12+ staff, PR spend, no rating surfaced), Peninsula Air Conditioning (Warriewood; the only prospect with observed reply behaviour, one defensive reply).

## 5. The three strongest acquisition opportunities

1. **The Sutherland Shire HVAC and plumbing cluster** (Alpha & Omega, Priority Plus, Shire Air, David Frith, Sanders Roofing nearby): five prospects within a short drive; work it in person, one fortnight, referencing each other's listings as the local benchmark.
2. **Warm introductions through suppliers and bookkeepers**: Reece and Tradelink trade counters, air-conditioning wholesalers, and accountants who serve tradies. One introduction converts at roughly double the rate of a cold call (hypothesis to measure) and costs nothing.
3. **The free audit as the opener for high-volume businesses with unanswered negatives** (Ready Electrical, Peninsula Air, Da-Mell): they already value reviews, pay for marketing, and have a visible, specific gap you can name in one line.

## 6. The proposed paid pilot

A$299 for 30 days of the Managed service, limited to three Sydney businesses, nothing renews automatically. Scope: catch-up replies on every unanswered review, daily monitoring of Google, hipages and Facebook, same-day escalation with an owner call-back brief, genuine review requests to every nominated customer, and a one-page report at day 30. Around day 25 you ask whether they continue (Managed A$499 is the expected plan), change or stop. Details: `business/pilot-offer.md`, `business/onboarding-checklist.md`.

## 7. Expected service economics

Blended A$484 per customer per month (30% Essential, 55% Managed, 15% Premium). Fixed costs A$120–270 a month; variable cash cost about A$4–22 per client; model usage under A$1.50 per client per month at 100 reviews. Labour is the cost: 2.5–6 founder hours per client per month at steady state, about 5 hours of onboarding in month one. Contribution: ~A$1,200 at 3 clients, ~A$2,200 at 5, ~A$4,500 at 10 (but 10 hours a week or an assistant), ~A$6,900 at 15 with a VA, ~A$9,200 at 20 with a part-time account manager. Ceiling alongside full-time work: 6–8 Managed clients solo, 10 with an assistant. Churn at 6% monthly still grows on 1.5 sales a month; 10% stalls near 15 clients. Details: `research/06-commercial-model.md`, `07-api-cost-model.md`.

## 8. Compliance and technical risks

- **Spam Act** exposure on review-request SMS/email and cold outreach: consent records, sender identification, functional unsubscribe honoured within five working days; no SMS cold outreach. See `business/cold-contact-approach.md`, `research/08` §3.
- **ACL**: never fake, gated or incentivised reviews; never guarantee ratings or removals; soft language on compliance (the site says the commitments are "written to stay inside" the law, not that they keep you safe).
- **Privacy**: minimise personal data; reviewer first names only; strip PII before AI calls; 90-day retention for request contacts; a lawyer should review the privacy policy and agreement before the first paid client.
- **Defamation / liability for published replies**: approval before publication, no admissions on workmanship or safety, sensitive complaints handled with the owner's own words, professional indemnity cover with media/defamation extension.
- **Name**: RepuTrack/RepTrak sound-alikes; run ASIC, IP Australia and auDA checks and get a trade-mark attorney's view.
- **Technical**: workspace data is single-browser (back it up); the passcode gate is not real authentication (fine for one founder, replace before a second user); Vercel Hobby is non-commercial (move to Pro before public use); the Anthropic key, if set, must stay server-side (it does).

## 9. Exact instructions to run and deploy

```bash
# run locally
npm install
cp .env.example .env.local      # optional; fill WORKSPACE_PASSCODE and ANTHROPIC_API_KEY if you have them
npm run dev                     # http://localhost:3000 and http://localhost:3000/workspace
npm run lint && npx tsc --noEmit && npm run build   # checks

# rebuild the prospect seed after editing the research CSV
node scripts/build-seed.mjs research/prospect-list-v2.csv
```

Deploy: import the GitHub repository into Vercel (framework preset Next.js, no changes). Environment variables: `AUDIT_WEBHOOK_URL` (where audit requests POST as JSON; a Make/Zapier/Formspree webhook), `NEXT_PUBLIC_SITE_URL` (`https://reputrail.com.au`), `WORKSPACE_PASSCODE` (choose a long passphrase), and optionally `ANTHROPIC_API_KEY`. Preview on Hobby while private; move to Pro before promoting the site. In the workspace, go to Settings and download a backup after each working session; restore on a new device with "Restore from file".

## 10. Five highest-value actions for the next 48 hours

1. **Run the name checks** on ASIC Connect, ABN Lookup, IP Australia TM Checker (class 35) and a .com.au registrar, and book 30 minutes with a trade-mark attorney about RepuTrack/RepTrak. Nothing else should go public under the name until this is done.
2. **Open the Google Business Profiles for the top five audits** (Alpha & Omega, Pipe Perfection, Ready Electrical, Priority Plus, Peninsula Air), do the three checks listed in each audit, and enter what you see into the workspace prospect records so the figures are observed, not inferred.
3. **Ask three people for one warm introduction each** to a Sydney plumber or air-conditioning owner, using the referral text in `business/customer-interview-script.md`, and book two conversations for this week.
4. **Deploy to Vercel** with `WORKSPACE_PASSCODE` and `AUDIT_WEBHOOK_URL` set, submit a test audit request end to end, add your name and phone to `src/lib/site.ts`, and send yourself the first backup from the workspace.
5. **Prepare two real audits** in the workspace for the two most reachable prospects and send the first-contact email from each audit's section 9, adjusted to what you actually saw. The audit is the demo; the conversation is the goal.
