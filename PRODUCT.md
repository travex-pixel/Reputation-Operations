# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript, Server Components), Tailwind CSS v4, deployed on Vercel. Delegated: the brief specified this stack; no backend, auth, dashboards or payments in the first release.

## Users

Primary: owners of small Australian trade and home-service businesses (painters, plumbers, electricians, air-conditioning installers, renovators, roofers), mostly in Greater Sydney, typically 2–30 staff, owner still on the tools or running jobs. They read on a phone between jobs, in the ute, or at the kitchen table after 7pm. They are time-poor, sceptical of marketing agencies, proud of their work, and personally stung by unfair reviews.

Secondary: office managers / partners who run the admin for the business; and referrers (accountants, suppliers, other tradies) who pass the site on.

## Product Purpose

Reputrail is a managed online-reputation and customer-feedback service. A real person (the founder) takes responsibility for watching a trade business's public reviews, drafting owner-approved responses, escalating negative feedback fast, coordinating customer recovery, running genuine review-request workflows, watching competitors, and sending a short monthly report. AI handles the repetitive drafting and classification quietly in the background; the human owns judgement, relationships and recovery.

Success: the visitor understands within five seconds that Reputrail takes the reputation job off their plate, trusts it enough to request a free reputation audit, and that request turns into a real conversation and a paid pilot.

## Positioning

"We look after your reputation, so you can look after your business." A founder-led managed outcome, not a software subscription. The neighbouring products are self-service review tools (the customer still does the work) and generalist SEO/marketing agencies (reputation is a side-line). Reputrail is the specialist who answers the phone when a one-star review lands.

Tagline (confirmed): "Your reputation. In good hands."

## Operating Context

Manual first: Google Business Profile, hipages, Facebook and ProductReview listings are monitored by the founder with the help of Claude-drafted classifications and response drafts; approvals happen by email or SMS; publishing is done through authorised Google Business Profile manager access (never passwords); customer recovery is usually a phone call by the owner, coached by Reputrail; reporting is a monthly one-page PDF. No customer dashboard exists. The founder has 5–8 hours a week.

## Capabilities and Constraints

- Services: initial reputation audit, review monitoring, sentiment classification, personalised response drafts, negative-review escalation, customer-recovery recommendations, neutral review-request workflows, competitor monitoring, monthly reporting.
- Primary CTA: "Get your free reputation audit". Secondary: "Talk to us". No software free trial, no self-serve signup.
- Pricing shown on site (provisional, owner-confirmed): Essential A$299/mo, Managed A$499/mo, Premium A$799/mo; founding-customer pilot A$299 for 30 days.
- Compliance commitments that the copy must reflect: no fake, bought or incentivised reviews; no review gating or selective asking; no promised removals, rankings or star ratings; responses only published with the owner's authorisation; Google decides removals.
- Technical limits: marketing site plus an internal founder workspace (`/workspace`, passcode-gated, browser-stored data); no customer dashboards, payments, Google API integrations, scraping, hosted databases or background agents yet.
- Terminology: "reputation audit", "review response", "escalation", "customer recovery", "review request", "monthly report", "Google Business Profile" (not "Google My Business"), "tradie" acceptable in copy but not in headings.

## Brand Commitments

- Name: Reputrail (provisional pending ASIC, IP Australia and domain clearance). Do not change without a compelling reason.
- Attributes: trustworthy, human, commercial, premium, confident, calm, modern, precise, approachable. Not an "AI agency". Not a SaaS template.
- Voice: plain Australian English, second person, specific, no hype ("unlock", "revolutionise", "next level" are banned). Spelling: Australian (organise, colour, programme).
- The founder is the relationship layer; the technology works quietly.
- Avoid: purple AI gradients, robot illustrations, excessive rounded cards, floating blobs, stock photography, unnecessary animation, fake dashboards, fake testimonials, fabricated results, fake logos.

## Capabilities added in phase 2

Internal workspace: prospect database (50 researched Sydney businesses, verification-labelled), audit generator with print view, monthly report generator with KPIs, attribution labels and the Reputrail Score, operations board with review intelligence, response drafting and a mandatory human approval chain, clients, backup/restore. AI runs behind a replaceable provider: Claude when `ANTHROPIC_API_KEY` is set, labelled deterministic rules otherwise. See `REPUTRAIL_AGENT_ROADMAP.md`.

## Evidence on Hand

- No paying customers yet, so no testimonials, logos, case studies or results. Nothing on the site may imply otherwise.
- An illustrative sample reputation audit may be shown if explicitly labelled as an illustrative example with fictional business data.
- Founder's name, photo and phone number not yet supplied: `src/lib/site.ts` holds the placeholders; the founder section signs off as "Founder, Reputrail" until supplied.
- Contact email provisional: hello@reputrail.com.au (domain unregistered as of 2026-11-02).
- Market and competitor evidence lives in `/research`; cite only verified figures in site copy, and prefer explaining the mechanism over quoting statistics.

## Product Principles

1. Take responsibility, visibly: every section answers "what will you actually do for me, and who does it".
2. Prove the mechanism, don't claim the outcome: show what happens when a bad review lands; never promise ratings.
3. One action: the free reputation audit is the only door; everything else leads there.
4. Respect the reader's time: scannable on a 390px phone, specific nouns, no filler.
5. Ethical by design: the compliance commitments are selling points, stated plainly.

## Accessibility & Inclusion

WCAG 2.2 AA as the floor: 4.5:1 body contrast, visible focus, keyboard-navigable, semantic headings, reduced-motion path for every animation, labelled form fields with inline errors, 44px touch targets on mobile.
