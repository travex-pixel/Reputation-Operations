# Reputrail

Managed online-reputation and customer-feedback service for Sydney trade businesses. This repository holds the marketing website (Next.js) and the founder's research and operating documents.

**Tagline:** Your reputation. In good hands.

## What is here

| Path | What |
|---|---|
| `src/` | The website: Next.js 16 App Router, TypeScript, Tailwind CSS v4, self-hosted fonts, one server action (audit request form). No database, auth, payments or integrations by design. |
| `research/` | Market, segmentation, competitor, customer-validation, prospect, commercial, API-cost, compliance, operating-model and launch research, with a source register and a 50-row prospect CSV. Start at `research/00-executive-summary.md`. |
| `business/` | Pilot offer, conversation scripts, standard operating procedures, objection handling, brand positioning. |
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

Node 20+ is required. No environment variables are needed for local development; the audit form will show an "not connected, email us instead" message until a webhook is configured.

## Deploy to Vercel

1. Import the repository in Vercel. Framework preset: Next.js. No build settings need changing.
2. Add environment variables:
   - `AUDIT_WEBHOOK_URL`: where audit requests are POSTed as JSON (`name, business, trade, suburb, listing, email, phone, contact, notes, source, receivedAt`). A Make/Zapier webhook feeding a Google Sheet, a Formspree endpoint, or any HTTPS URL that returns 2xx. Without it the form degrades honestly.
   - `NEXT_PUBLIC_SITE_URL`: the canonical URL (defaults to `https://reputrail.com.au`), used for metadata, Open Graph, sitemap and robots.
3. Preview deployments on the Hobby plan are fine while private. Vercel's Hobby plan is for personal, non-commercial use, so move the project to **Vercel Pro** before promoting the site to customers (see `research/10-launch-plan.md`).
4. Point `reputrail.com.au` (and `reputrail.au`) at the project once the business name and domain are registered.

## Before going public: a checklist

- [ ] Run the ASIC, ABN Lookup, IP Australia and auDA checks on the name (`research/raw-name-clearance.md`).
- [ ] Add the founder's name, phone and (optionally) photo in `src/lib/site.ts` and the Founder section.
- [ ] Add the ABN to `src/lib/site.ts` once registered.
- [ ] Have a lawyer review `/privacy` and the service agreement outline (`research/08-compliance-and-risk.md` §10).
- [ ] Set `AUDIT_WEBHOOK_URL` and test a submission end to end.
- [ ] Move to Vercel Pro.

## Design and QA process

The site was built with the [Impeccable](https://github.com/pbakaus/impeccable) design method (direction contract, craft floor, finish review) and checked against Vercel's Web Interface Guidelines. QA evidence in `.impeccable/review/`: screenshots at 390, 820 and 1440 wide for every route and state; Impeccable detector 0 anti-patterns; axe-core 0 violations; keyboard, reduced-motion, no-JS and form-state tests via Playwright.

To rerun the detector locally after installing Impeccable (`npx impeccable install`): `npx impeccable detect http://localhost:3000` and `npx impeccable detect --viewport 390x844 http://localhost:3000`.

## Fonts and licences

Bricolage Grotesque and JetBrains Mono are used under the SIL Open Font License; copies of the licences are in `src/fonts/`. The fonts are subset and self-hosted; no third-party font requests are made.

## Non-goals for this release

Customer login, dashboards, payments, Google Business Profile API integration, review scraping, automated publishing, background agents. The service is operated manually (see `business/manual-operating-procedures.md`); the website's job is to start conversations.
