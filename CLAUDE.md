# Reputrail

A managed online-reputation and customer-experience service for Sydney trade businesses. This repo holds the public marketing site, the founder's internal workspace (`/workspace`), and the research and operating documents. Next.js 16 App Router (Cache Components on), TypeScript strict, Tailwind CSS 4, deployed on Vercel. No database, no accounts, no payments; AI only behind the `AiProvider` boundary and only as suggestions a person approves.

Read `PRODUCT.md` (what it is and isn't), `DESIGN.md` (the service-record system) and `REPUTRAIL_AGENT_ROADMAP.md` (what AI may and may not do) before changing anything user-facing. `FOUNDER_HANDOVER.md` is the current state of play; `research/00-executive-summary.md` is the evidence.

## Working rules

- This Next.js is newer than training data. Read `node_modules/next/dist/docs/` for the API in question before using it. Cache Components means runtime APIs (`params`, `searchParams`, `cookies`, `Date.now()` in server components, `usePathname`/`useSearchParams`/`useParams` in client components) must sit under `<Suspense>`.
- Server Components by default. `"use client"` only for state, effects and browser APIs. The workspace is client-heavy by design (browser-stored data); keep the AI calls in server actions.
- Secrets stay server-side: `ANTHROPIC_API_KEY`, `WORKSPACE_PASSCODE`, `AUDIT_WEBHOOK_URL`. Only `NEXT_PUBLIC_*` reaches the browser. `"use server"` files export async functions only.
- No fake proof: no invented testimonials, logos, customers, results or statistics. Illustrative material is labelled as fictional. Cite `research/` or cut the number.
- Compliance posture is product: never buy, gate or incentivise reviews; never promise ratings, rankings or removals; nothing publishes or sends without a recorded human approval; never ask for passwords; strip personal data before any model call (`src/lib/ai/anthropic.ts` → `minimise`).
- Blank means not observed, never zero: workspace fields and research CSVs keep `null`/blank for anything unverified.
- Copy is Australian English, second person, plain; curly apostrophes; no kickers or eyebrow labels above headings; no "unlock", "revolutionise", "next level".
- Before pushing: `npx tsc --noEmit && npm run lint && npm run build`, then the Playwright checks in `.impeccable/review/` (site: `shoot.js`-style capture at 390 and 1440; workspace: the 39-check suite) and `npx impeccable detect` on the running server at 1280 and 390.
- Rebuild the prospect seed after editing the research CSV: `node scripts/build-seed.mjs research/prospect-list-v2.csv`.

## Skills in this repo

- `/impeccable` for UI work (`critique`, `audit`, `polish`, `adapt`, `animate`, `typeset`). `PRODUCT.md` and `DESIGN.md` are its inputs; the homepage direction contract is `design/home-surface-brief.md`. The engine binary is gitignored (`.claude/skills/impeccable/scripts/bin/`); the launcher downloads it on first run, or build it from the pbakaus/impeccable repo with `cargo build --release -p impeccable` where downloads are blocked.
- `vercel-react-best-practices`, `vercel-composition-patterns` for React/Next.js code.
- `web-design-guidelines` for accessibility and UX review against Vercel's Web Interface Guidelines.
- `deploy-to-vercel` for preview deployments.

## Reference docs

- Next.js: `node_modules/next/dist/docs/01-app/` (version-exact), https://nextjs.org/docs
- React: https://react.dev/reference/react
- Vercel: https://vercel.com/docs · Web Interface Guidelines: https://vercel.com/design/guidelines
- Tailwind CSS v4: https://tailwindcss.com/docs
- Anthropic API: https://platform.claude.com/docs (pricing read 2026-11-02 is in `research/raw-openai-pricing.md`)
- Google Business Profile policies and API: see `research/08-compliance-and-risk.md` §4
