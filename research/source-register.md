# Source register

All research in this pack was conducted on 2 November 2026 from a network with restricted outbound access. Evidence quality is recorded per claim inside each file using these labels:

- **VERIFIED (full read)** — the page or data file was fetched and read in full (e.g. ABS 8165.0 data cubes, Anthropic pricing, commercial terms and data-processing addendum pages).
- **VERIFIED (snippet)** — the claim appears in a search-result snippet from the cited URL; the page itself could not be opened. Confirm before quoting externally.
- **ESTIMATE / ASSUMPTION / HYPOTHESIS / RECOMMENDATION** — not sourced; the derivation or premise is stated.
- **NOT RETRIEVED / Not found in available sources** — the search budget or network policy prevented retrieval; a follow-up URL is given.

Each research file ends with its own `## Sources` section listing every URL used with title and access date. This register indexes the primary sources by topic and records the blocked hosts so the gaps are explicit.

## Primary sources by topic

### Market size and structure
- Australian Bureau of Statistics, *Counts of Australian Businesses, including Entries and Exits* (8165.0), June 2021 to June 2025 release and data cubes 2, 3 and 8 (industry class × state × employment size; × turnover size; SA2 counts), https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits — **full read** (file 01 §2–3).
- ABS, headline release for the year to June 2026 (3.1% increase in business counts) — snippet (file 01 §2.1).
- IBISWorld industry pages for plumbing, electrical, painting, HVAC, roofing, landscaping, pest control, cleaning, house construction (revenue and business-count estimates) — snippets, commercial estimates (file 01 §3).
- Housing Industry Association skills-shortage commentary (c. 83,000 workers) — snippet (file 01 §2.3).

### Channels, reviews and consumer behaviour
- hipages Group investor and media statements (subscription tradie counts ~33–35k, average spend, plan prices A$139–649+) — snippets (file 01 §4.1; file 03 §3.23).
- Oneflare help centre: marketplace retirement 30 June 2026 — snippet (file 03 §3.24).
- hipages Tradie Trust Index (46% trust online testimonials; >70% less trusting on jobs over A$2,500) — snippet, undated (file 01 §5.2).
- BrightLocal Local Consumer Review Survey (US sample; 93–97% read reviews; 80% more likely to use a business that responds) — secondary sources, snippets (file 01 §5.1).
- Bazaarvoice Australian shopper survey on fake reviews (78%) — snippet (file 01 §5.2).
- St.George Tradie Economy Report 2019 (pain points: sourcing customers 44%, hiring 44%, slow payers 43%, cashflow 36%) — snippet (file 01 §6).
- ACCC 2023 online reviews sweep (37% of 137 businesses with concerning conduct; home improvement highest risk) — snippet (file 01 §5.3; file 08 §1).

### Competitors and pricing
- Birdeye, Podium, NiceJob, BrightLocal, GatherUp, Grade.us, ReviewTrackers, Reputation.com, Trustpilot Business, Reviews.io, Yotpo, Local Falcon, Localo, Cloutly, Removify, Rize Reviews, Reputation Station, Thryv Australia, AskNicely, ServiceM8, Tradify, Fergus, simPRO, AroFlo, Jobber, Housecall Pro, tradie marketing agencies — vendor pricing pages and third-party review sites (G2, Capterra, Trustpilot, ProductReview.com.au, BBB) — all snippets; USD converted at an assumed A$1.50 (file 03 §3–4).
- Google Business Profile Help: review link, replying to reviews, manager roles, AI reply testing — snippets (file 03 §3.25; file 08 §4).

### Compliance and regulation
- ACCC guidance on managing online reviews and enforcement examples (Euro Solar, Electrodry, Service Seeking); ACL penalty changes 2026; unfair trading practices prohibition from 1 July 2027 — snippets (file 08 §1).
- Privacy Act 1988, small-business exemption, Privacy and Other Legislation Amendment Act 2024, statutory tort from 10 June 2025, OAIC guidance — snippets (file 08 §2).
- Spam Act 2003 and ACMA guidance and enforcement (Telstra, Betfair, CBA, Latitude, Oneflare, Service Seeking) — snippets (file 08 §3).
- Google Maps user-generated content policy; Business Profile API access process — snippets (file 08 §4).
- ProductReview.com.au and Meta Community Feedback policies — snippets (file 08 §5).
- Anthropic Commercial Terms (17 June 2025), Data Processing Addendum (24 February 2025), data retention and residency documentation — **full reads** (file 08 §6).
- Australia's Voluntary AI Safety Standard and National AI Plan (December 2025) — snippets (file 08 §6.4).
- ASIC business-name fees, IP Australia trade mark fees and process, auDA eligibility and policy consultation, insurance broker estimates, GST threshold — snippets (file 08 §7; `raw-name-clearance.md`).

### API and tooling prices
- Anthropic pricing page (Haiku 5.5, Sonnet 5.5, Opus 5.5 and others; cache and batch modifiers) — **full read** (`raw-openai-pricing.md` §2; file 07).
- OpenAI pricing via third-party trackers only (official page blocked) — UNVERIFIED (`raw-openai-pricing.md` §1).
- Google Workspace Business Starter AU pricing — snippet of Google's AU page; Vercel Pro and Hobby terms — third-party snippets (`raw-openai-pricing.md` §3).
- Twilio, ClickSend, Zapier, Make, Calendly, Xero, Tally, Typeform, Resend, Postmark — NOT RETRIEVED.

### Prospects
- Public search results for Sydney painters, plumbers, electricians, air-conditioning, renovators and roofers; directory snippets from hipages, Oneflare, ProductReview, Yellow Pages, True Local, Word of Mouth, Houzz, Trustpilot, Birdeye-hosted pages — snippets only; no website fetched; no platform scraped (`prospect-list.csv`, `raw-prospect-notes.md`).

### Design and engineering references
- Vercel Web Interface Guidelines, read from the vercel-labs/web-interface-guidelines repository (`command.md`) — full read (used in `DESIGN.md` and QA).
- Impeccable design skill (pbakaus/impeccable, Apache 2.0): README, SKILL.md, `reference/new-work.md`, `mode-persuade.md`, `craft-floor.md`, `critique.md`, `polish.md`, `animate.md`, `typeset.md`; detector engine built from source — full read (used throughout the build and QA).
- Next.js 16 documentation via the installed framework's own error guidance (prerender-time Date access; `use server` export rules).
- Google Fonts repository: Bricolage Grotesque and JetBrains Mono (OFL) — full read; licences stored in `src/fonts/`.

## Hosts blocked during research (for the follow-up pass)

accc.gov.au, oaic.gov.au, acma.gov.au, legislation.gov.au, asic.gov.au, abr.business.gov.au, ipaustralia.gov.au, auda.org.au, business.gov.au, jobsandskills.gov.au, data.nsw.gov.au, support.google.com, developers.google.com, vercel.com, nextjs.org, birdeye.com, podium.com, brightlocal.com, nicejob.com, capterra.com, g2.com, productreview.com.au, hipages.com.au, servicem8.com, tradify.com, ibisworld.com, choice.com.au, twilio.com, clicksend.com, openai.com, impeccable.style, and all prospect business websites. abs.gov.au, anthropic.com, platform.claude.com and raw.githubusercontent.com were reachable.

## Follow-up research list

See file 01 §12 (market data gaps: JSA headcounts, hipages FY26 metrics, per-trade Google review averages, association membership counts), file 03 §6 (simPRO pricing, Australian agency pricing, ACCC fake-review case detail, missed-call service pricing) and `raw-openai-pricing.md` §3 (tool prices not retrieved).
