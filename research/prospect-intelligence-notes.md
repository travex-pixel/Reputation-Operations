# Prospect intelligence notes — Reputrail Sydney prospect database v2

Research date: 2 November 2026. Researcher: AI sales-intelligence agent, desk research from public search-result snippets only. Companion files: `prospect-list-v2.csv` (50 rows), `prospect-audits/` (15 audits plus README). This file explains how the data was gathered, how to read it, and what the founder must do before contacting anyone.

---

## 1 Method

1. Read the original `prospect-list.csv` (50 rows, 24 columns), `raw-prospect-notes.md` and `05-prospect-strategy.md`.
2. Ran about 100 web searches (budget 120) in two passes: a deep pass on the 15 highest-potential prospects (business name plus reviews / google reviews / trustpilot / productreview / facebook / hipages / birdeye / owner name / domain), then one or two searches for each remaining row, plus competitor queries by trade and suburb and checks on the alternates named in the original notes (Brennan Air, David Frith Quality Plumbing, Theiss Electrical, Donnelly Roofing, Ol' Painting, Master House Painters).
3. Recorded only what a snippet actually showed, with the URL it came from. Google Maps was not scraped, no platform was logged into, no business website was fetched (network policy blocks them; snippets of those sites were used and labelled as self-reported).
4. Rebuilt the database with 32 columns (see note on column count below), re-scored every row with a 0-100 fit score, re-ranked the top 15 and wrote one audit per prospect.
5. Replaced two weak rows (within the five allowed): Sutherland Shire Electrical (likely lead-generation network site; its testimonials appear verbatim on a second domain) replaced by David Frith Quality Plumbing (Kirrawee, plumber, est. 1994, 18 Oneflare reviews with owner replies); Balmain Air Conditioning (not findable on any platform) replaced by Brennan Air Conditioning (Castle Hill, HVAC, est. 1989, directory-listed, 0 reviews). The resulting trade mix is 11 plumbers, 10 painters, 8 HVAC, 8 electricians, 7 renovators/builders, 6 roofers.
6. Validated the CSV with Python's csv module: 50 data rows, every row has the same number of fields as the header, ids p01-p50, enumerations checked.

Note on column count: the brief lists 32 column names and asks for validation of 33 fields per row. The CSV follows the exact column list (32 columns); every row has 32 fields. No extra column was invented.

Dates: `observed_on` is 2026-11-02 for every row. Where a figure came only from the original research pass (same date) and was not re-surfaced today, the `verification_notes` say so.

---

## 2 Fit-score rubric (0-100)

| Component | Max | What earns points |
|---|---|---|
| Ability to pay | 25 | Years trading, staff signals (job ads, named roles, multiple crews), job value (installs, strata, renovations), visible marketing/PR spend, premium service areas. |
| Reputation opportunity | 25 | A verified third-party rating below local peers; fragmented or inconsistent counts across platforms; no visible rating despite an established business; stale proof; visible unanswered negatives. Opportunity is scored on what was observed, not assumed. |
| Accessibility | 20 | Owner or director publicly named; clear business contact path; single decision-maker likely; not a franchise, network or lead-generation site; no reliance on a personal mobile. |
| Urgency | 15 | A current, visible problem: sub-4.8 third-party score, defensive public reply, 0-review directory pages next to paid ads, review ask pointing to the wrong platform, duplicate listings. |
| Service fit | 15 | Priority trades (HVAC, plumbing, electrical) score higher per the research in file 02; 2-30 staff; owner-operated; not already served by a review platform with reply drafting; Sydney metro. |

Scores are judgement calls on public signals. 80+ means "contact this fortnight"; 60-79 "contact after the top tier"; 40-59 "verify before investing time"; below 40 "hold". Ties were broken by the strength of observed (rather than self-reported) evidence.

---

## 3 What could and could not be observed

Counts over the 50 rows in `prospect-list-v2.csv`:

| Measure | Rows |
|---|---|
| `google_rating` populated (a star figure seen in a snippet; includes self-reported website widgets, labelled in `rating_source`) | 28 |
| of which from an independent third-party platform page seen today (Trustpilot, Birdeye, Trustindex, ProductReview, Oneflare, Google Business snippet) | 14 (p01, p02, p03, p05, p07, p13, p39, p45, p47, p48, p49 directly; p27 Houzz and p12/p50 directory from original pass) |
| `review_count` populated but no star figure | 10 |
| Neither rating nor count observed | 12 |
| Rows where at least one individual review text was read on a third-party platform (`reviews_inspected` > 0) | 13 rows, 32 texts in total |
| Rows with any numeric owner-response data | 1 (PenAir: Trustpilot "replied to 100% of negative reviews") |
| Rows with qualitative owner-reply observations (replies seen but not counted) | 4 (PenAir, Orbit Painting, Kmelectric, David Frith Quality Plumbing) |
| Star-level breakdown (one/two/three-star counts) observed | 0 |
| Negatives in the last 12 months counted | 0 (dates were not visible; blank in every row) |
| `research_status` verified / partial / unverified | 11 / 27 / 12 |

Definitions used: verified = an independent third-party platform figure for this business was seen today with its URL; partial = some public data confirmed today (directory existence, self-reported widget, platform listing without a score); unverified = nothing beyond the original website snippet could be found today. No row is "verified" in the sense of the Google Maps profile having been opened; that remains the founder's job.

Important corrections to the original list:
- Ready Electrical & Air Conditioning is a high-volume, highly rated business (4.9/~520 via aggregators, hiring office staff), not an unrated one. The fit is response consistency at volume.
- Pipe Perfection's Google rating is quoted at 4.9/312 by aggregators; the 3.8 is Trustpilot only. The pitch is fragmentation, not a bad Google score.
- Alpha & Omega Air Conditioning has a verified Birdeye 4.7/130 — the clearest "rating below peers" case in the set, and it moved to rank 1.
- Premier Painting Company is based in Matraville, not Drummoyne. Orbit Painting is based in Padstow (Google shows 5.0/24, not 100+). iPaint & Co is based in Merrylands. ACG's head office is Canterbury with a Canberra branch.
- Sutherland Shire Electrical's testimonials are duplicated on another domain; treated as a network site and replaced.

---

## 4 Platform-by-platform access notes

- Google (Maps / Business Profile): not scraped. Ratings surfaced only indirectly: business.google.com snippets for three businesses (True Local Electricians 5.0/306, Orbit Painting 5.0/24, Mr Splash 4.9/1,207), aggregator pages that claim Google sourcing (Swiftscope, d7leadfinder, eehotwater, starworks, Wheree), and Trustindex widget pages. Treat all as approximations until the profile is opened.
- Trustpilot: indexed well; country mirrors (ca., es., jp., etc.) show the same data. Useful pages found for Pipe Perfection (3.8/10), PenAir (4.9/410, reply coverage flag), Kmelectric (4.1/5, company replies), True Local Electricians (3.5-3.7, "has not invited customers recently"). `site:au.trustpilot.com` queries return mirrors rather than the au page.
- Birdeye (reviews.birdeye.com / getbirdeye.com.au): indexed and informative where a business uses it: Alpha & Omega 4.7/130, Da-Mell 4.8/214, Ready Electrical 5/518, Kelly's Plumbing 5.0/28, Amped Up 4.9/87. Note Birdeye use by a prospect also signals an existing review tool (partial overlap with Reputrail).
- Trustindex: widget pages indexed for PenAir, Premier Painting, Orbit, Sanders Roofing; shows owner replies where present.
- ProductReview.com.au: indexed; useful for Sydney Painting & Maintenance (4.8/6, 16% negative), Premier Painting (4.5/7), Collaroy Kitchen Centre (5 reviews). Category pages do not expose per-business scores.
- Oneflare: indexed widely; shows review counts, jobs completed, addresses and ABNs, and sometimes owner replies (David Frith). Many profiles are stale (2011-2020 reviews). Suburb pages give only category averages.
- hipages: effectively not indexed; `site:hipages.com.au` returned nothing. Check manually from the hipages app or site.
- Facebook: pages indexed with "Not yet rated / N reviews" text (Hardie & Co 0; Ian's Roofing 4, original pass; Eastern Beaches 7, original pass) but no review text.
- Word of Mouth (wordofmouth.com.au): category pages indexed with per-business scores (iPaint & Co 5.0/61, original pass); not re-surfaced today.
- Houzz: profile pages indexed with scores (Pipe Perfection 3.9/7; Origin Bathrooms 4.8/23 from the original pass).
- Yellow Pages: listings indexed with ratings and occasionally old review text (Da-Mell 5.0/114 and 4.7/14; Electrix All Blew reviews dated around 2015).
- Top4, Cylex, Whitepages, Localsearch, Poyst, Pure Local, In the Suburbs: existence, address and "0 reviews" signals only. The Leader / Illawarra Mercury / Blue Mountains Gazette directories and sponsored features: existence, ad spend, owner names, founding dates (sponsored content labelled as such).
- Yelp: one listing (Pipe Perfection) with an owner photo; negligible review data.
- Airtasker: category averages only; never a per-business score.
- Low-credibility sources deliberately not relied on: TrustBurn, auto-generated onrender.com blogs, allblogthings listicles, Wheree summary text (used only for its "No Reviews yet" flag).

---

## 5 Exact public pages drawn on

Third-party review and aggregator pages seen today:
- https://au.trustpilot.com/review/pipeperfection.com.au ; https://ca.trustpilot.com/review/pipeperfection.com.au
- https://www.houzz.com.au/professionals/plumbers/pipe-perfection-plumbers-pfvwau-pf~881847985
- https://www.oneflare.com.au/b/pipe-perfection-plumbing-drainage-gas-fitting ; https://www.top4.com.au/business/pipe-perfection-plumbers-104357 ; https://www.yelp.com/biz/pipe-perfection-plumbers-marrickville-2
- https://eehotwater.com.au/marrickville/ ; https://www.starworks.com.au/best/plumbers/marrickville
- https://swiftscope.com.au/directory/ready-electrical-and-air-conditioning-oxford-falls-55abd5 ; https://reviews.birdeye.com/ready-electrical-and-air-conditioning-167004767429809 ; https://www.cylex-australia.com/company/ready-electrical-and-air-conditioning-23795105.html ; https://employmenthero.com/jobs/organisations/ready-electrical-air-conditioning/
- https://au.trustpilot.com/review/penair.com.au ; https://ca.trustpilot.com/review/penair.com.au ; https://www.trustindex.io/reviews/www.penair.com.au-1 ; https://d7leadfinder.com/app/prospector/443817/6d4df4dea8de6677223f76a3b0e8a63c/
- https://getbirdeye.com.au/alpha-omega-air-conditioning-sutherland-shire-171618501260976 ; https://installs.alphaomegaair.com.au/ ; https://www.localsearch.com.au/profile/alpha-and-omega-air-conditioning-sutherland-shire/clsya36ra008s09iecl6v2t9x
- https://www.theleader.com.au/story/9354021/priority-plus-plumbing-celebrates-over-25-years-serving-the-shire/ ; https://www.theleader.com.au/story/6464586/core-values-drive-success/ ; https://www.mydailyrecord.com/online_features/press_releases/25-years-of-24-7-emergency-plumbing-in-sutherland-shire/article_9aee5a35-9c22-5a61-8465-4e24cce1fd42.html ; https://www.top4.com.au/business/priority-plus-plumbing-71577 ; https://www.inthesuburbs.com.au/directory/kirrawee-nsw-2232/plumbers.html ; https://au.indeed.com/cmp/Priority-Plus-Plumbing/reviews ; https://priority-plus-plumbing-sutherland-shire.wheree.com/
- https://www.purelocal.com.au/new-south-wales/randwick/plumbing-1/mcelroy-plumbing
- https://reviews.birdeye.com/da-mell-air-conditioning-heating-166843004959860 ; https://www.yellowpages.com.au/nsw/emu-heights/da-mell-air-conditioning-heating-pty-ltd-13343262-listing.html ; https://www.bluemountainsgazette.com.au/story/6288904/keeping-it-in-the-family-has-paid-off/ ; https://da-mell-air-conditioning-heating.wheree.com/
- https://business.google.com/v/saunders-electrical/014294771504865746129/016a/_
- https://www.facebook.com/p/Hardie-Co-Plumbing-100077260987844/
- https://www.top4.com.au/business/shire-air-conditioning-621384
- https://www.top4.com.au/business/ample-air-pty-ltd-81141 ; https://sites.google.com/view/ampleair ; https://architectureanddesign.com.au/suppliers/ample-air/air-conditioning-solutions-from-ample-air
- https://www.trustindex.io/reviews/sandersroofing.com.au ; Leader directory ads for Sanders Roofing (Illawong, June-July 2026), e.g. https://www.theleader.com.au/local-business/directory/latest/ads/illawong-nsw/sanders-roofing-61426637043/2026-06-09-13001466-sanders-roofing-for-all-your-roofing-needs-roof-repair-specialist-no-job-too-small-tile-metal-and-slate-roof-leaks-fixed-re-roofing-re-pointing-valleys-gutters-leaf-guards-restorations-roof-painting-whirlybirds-lic-219053c-fully-insured
- https://www.trustindex.io/reviews/premierpainting.com.au ; https://www.productreview.com.au/listings/premier-painting-company ; https://www.oneflare.com.au/b/premier-painting ; https://www.top4.com.au/business/premier-painting-company-125854
- https://oneflare.com.au/b/damore-property
- https://www.top4.com.au/business/dj-daisley-sons-79637 ; https://djdaisley.yellow.com.au ; https://www.whitepages.com.au/d-j-daisley-sons-pty-ltd-10289093/marrickville-nsw-10289098B
- https://www.oneflare.com.au/b/eastern-beaches-painting
- https://www.productreview.com.au/listings/collaroy-kitchen-centre ; https://archipro.com.au/professional/collaroy-kitchen-centre/info ; https://www.top4.com.au/business/collaroy-kitchen-centre-104506
- https://www.oneflare.com.au/b/easy-cut-painting-services
- https://www2.newsfilecorp.com/release/232406/Innogy-Electrical-Services-Extends-247-Emergency-Services-Across-Bondi-NSW ; https://www.glassdoor.co.nz/Reviews/innogy-Reviews-E3594918.htm
- https://www.oneflare.com.au/b/sirrom-electrical
- https://business.dptribune.com/dptribune/news/read/41598636/brushworks_painting_&_maintenance_p/l_uses_non
- https://www.oneflare.com.au/b/origin-bathrooms
- https://www.poyst.com/business/antons-plumbing-and-gas ; https://www.barchart.com/story/news/37177825/antons-plumbing-gas-expands-247-emergency-plumbing-and-gas-support-across-sydney-metro
- https://www.top4.com.au/business/brennan-air-81194 ; https://www.whitepages.com.au/brennan-air-conditioning-10196467/castle-hill-nsw-10196465B
- https://www.oneflare.com.au/b/empire-painting-co
- https://www.cylex-australia.com/hurstville/engineering-services/
- https://assets.oneflare.com.au/b/frith-david-quality-plumbing-services ; https://www.theleader.com.au/local-business/trades/gymea-nsw/david-frith-quality-plumbing-61295218197
- https://oneflare.com.au/b/platinum-plumbers
- https://www.yellowpages.com.au/bilgola-plateau-nsw/bpp/electrix-all-blew-pty-ltd-580733721 ; https://www.cylex-australia.com/company/electrix-all-blew-25187361.html
- https://trustburn.com/reviews/ready-set-plumb ; https://jobsconnect.prosple.com/graduate-employers/ready-set-plumb
- https://www.productreview.com.au/listings/sydney-painting-maintenance
- https://www.illawarramercury.com.au/local-business/trades/menai-nsw/dura-group-miranda-61424665793
- https://www.top4.com.au/business/action-roofing-114421 ; https://www.oneflare.com.au/b/action-roofing
- https://business.google.com/v/orbit-painting-decorating/010594956836555300889/9734/_ ; https://www.trustindex.io/reviews/www.orbitpaint.com.au ; https://reviews.birdeye.com/orbit-painting-decorating-170863099267066 ; https://www.oneflare.com.au/b/orbit-painting-decorating
- https://australianmanufacturing.com.au/?p=45176 ; https://region.com.au/?p=869735 (ACG)
- https://au.trustpilot.com/review/kmelectric.com.au ; https://www.oneflare.com.au/b/kmelectric
- https://business.google.com/v/true-local-electricians-sutherland-shire/07940326296145780251/9a99/_ ; https://www.trustpilot.com/review/truelocalelectricians.com.au ; https://www.seek.com.au/companies/true-local-electricians-177293935591661
- https://www.oneflare.com.au/b/i-paint-n-co ; https://assets.oneflare.com.au/b/i-paint-n-co
- Competitor/benchmark pages: https://business.google.com/v/mr-splash-plumbing/03202697430058693141/e0e4/_ ; https://reviews.birdeye.com/kellys-plumbing-drainage-166857070737731 ; https://reviews.birdeye.com/amped-up-air-conditioning-166901779691925 ; https://reviews.birdeye.com/dms-air-conditioning-pty-ltd-166815002882914 ; https://d7leadfinder.com/app/prospector/18322018/8fc72c8a7d8dfb38f826cbb26c31185c/ (JRS Air) ; https://d7leadfinder.com/app/prospector/443801/53c1ce5bfcfcdb547e6a8df923bc8df0/ (Northern Beaches Air Conditioning) ; https://uk.trustpilot.com/review/eze-flowplumbing.com.au ; https://www.oneflare.com.au/b/skyco-corp ; https://www.top4.com.au/business/donnelly-roofing-79602 ; https://www.plumbwellplumbers.com.au/your-comprehensive-plumbing-guide-for-marrickville-residents/
- Alternates checked and not adopted: Theiss Electrical (no listing found), Donnelly Roofing (Top4 0 reviews, Mt Colah — outside the Sydney clusters used), Ol' Painting (no listing found), Master House Painters (no listing found).

Business websites seen only as search snippets (not fetched): alphaomegaair.com.au, pipeperfection.com.au, readyelectrical.com.au, priorityplusplumbing.com.au, penair.com.au, mcelroyplumbing.com.au, damellair.com.au, saunderselectricalgroup.com.au, hardieandcoplumbing.com.au, shireair.com.au, ampleair.com.au, sandersroofing.com.au, premierpainting.com.au, damorehomerenovations.com.au, djdaisley.com.au, sutherlandshireelectrical.com.au (dropped), and the remaining sites listed in the `sources` column.

---

## 6 Follow-up checklist for the founder (before any contact)

1. Open the Google Business Profile for each of the 15 audited prospects (search the exact name plus suburb in Google Maps). Record the live rating, count, newest review date and whether the profile is claimed. Compare with `google_rating` and `rating_source`; expect self-reported figures to differ.
2. For each, read the last 10 reviews sorted by newest and the three most recent 1-3 star reviews. Fill `one_star`, `two_star`, `three_star`, `negative_last_12m`, `reviews_inspected`, `owner_responses_last_20`, `owner_response_pct`, `negative_response_pct`, `response_quality` and `response_time_estimate` in the CSV from what you see. These are blank or "not observed" today by design.
3. Check for duplicate or legacy Google listings where flagged: Saunders Electrical Group ("Saunders Electrical" 5.0/21), Pipe Perfection ("Pipe Perfection Plumbers & Electricians"), D'Amore ("D'Amore Property Developments"), DJ Daisley (Ashfield vs Marrickville), Da-Mell (Penrith vs Emu Heights).
4. Open hipages manually for the top 15 (not indexable by search) and note whether the business pays for leads; a hipages badge implies A$139-649+/month of existing demand spend.
5. Confirm owner names before using them in an email: Peter Honey and Con Papadimitriou (Priority Plus), Oliver Saunders (Saunders), Matt D'Amore, Daniel Daisley, John Mellors (Da-Mell), "Darren C." (Pipe Perfection, unconfirmed). Remove any name the live About page does not support.
6. Confirm size for PenAir and Ready Electrical (both may exceed 30 staff) and ACG (multi-branch); adjust the pilot tier or drop if they are outside the target.
7. Verify licences on the NSW Fair Trading register where numbers were seen: McElroy 494711C, Saunders 344815C, Sanders 219053C, Ian's Roofing 351337c.
8. Re-check the three "verified third-party" low scores immediately before sending, since they anchor the opener: Alpha & Omega Birdeye 4.7/130, Pipe Perfection Trustpilot 3.8/10, Premier Painting ProductReview 4.5/7.
9. Use the website contact page or advertised landline only. Several listings expose mobile numbers (Hardie & Co, Sanders Roofing, Electrix All Blew, Alpha & Omega on Cylex); do not use them for cold outreach.
10. After each conversation, update `fit_score`, `research_status` and `verification_notes`, and log the owner's exact words in the CRM sheet per `business/manual-operating-procedures.md`.

---

## 7 Main limitations

- No website was fetched and Google Maps was not opened; every Google figure is either self-reported, an aggregator's claim or a business.google.com snippet.
- Star-level breakdowns and 12-month negative counts were not visible anywhere; those columns are blank for all 50 rows.
- Only 32 individual review texts were read across 13 businesses; themes for the other 37 are "not observed", not "none".
- Owner-reply behaviour was observed for four businesses and quantified for one (PenAir).
- Twelve rows remain "unverified" today: the business exists on its own website but no platform or directory listing surfaced in one or two searches. They may still have healthy Google profiles.
- Search engines surface aggregator and directory pages with inconsistent snapshots (e.g. Ready Electrical 523/518/492/443); where counts conflict the CSV records the most independent figure and lists the others in `verification_notes`.
- Competitor figures marked "original pass" were seen in snippets of competitors' own websites on the same date and were not re-verified.
