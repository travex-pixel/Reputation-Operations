# Raw prospect research notes – Reputrail (NSW trade businesses)

Research date: 2 November 2026
Deliverable: `research/prospect-list.csv` (50 data rows + header)
Researcher: AI research agent, desk research only (no calls, no logins, no scraping)

---

## 1. Method

**Goal.** Identify 50 real, established, owner-operated trade businesses in Greater Sydney / NSW that (a) already have some web and review presence and (b) look able to pay A$299–799/month for a managed reputation service.

**Target mix (achieved).** 10 painters, 10 plumbers, 9 electricians, 8 HVAC / air-conditioning, 7 renovators / builders, 6 roofers.

**Search approach.**
- Roughly 60 web searches were run (the per-turn search budget was exhausted at that point – see Limitations). Queries combined trade + region (Inner West, Eastern Suburbs, Northern Beaches, Lower/Upper North Shore, Hills District, Sutherland Shire, St George, Parramatta/Ryde, Penrith/Blacktown) with modifiers such as "family owned", "Google reviews", "since", "years experience".
- Directory and review platforms were queried directly to surface explicit third-party ratings: ProductReview.com.au, Houzz, Word of Mouth, TrueLocal, Trustpilot, Birdeye, Oneflare, Airtasker, Top4, australianroofers.com, Home Done, localbusinessguide. Aggregator-only pages (Airtasker/Oneflare category pages) were used for competitor context, not as prospects.
- Candidate businesses were selected when the snippet showed a real business name, an identifiable suburb/region, and at least one of: own website, directory listing, review listing. National franchises and obviously large multi-office operators (e.g. ASL Painting, Mr Splash Plumbing, The Local Electrician, CB Climate Control) were **excluded** as prospects but kept as competitor benchmarks.

**Verification attempted.** WebFetch was attempted against 15 business websites (northsydneypainting.com, empirepaintingco.com.au, easycutpainting.com.au, easternbeachespainting.com.au, brushworks.com.au, aonekoreanpainting.com.au, premierpainting.com.au, hardieandcoplumbing.com.au, readysetplumb.com.au, mcelroyplumbing.com.au, platinumplumbers.net.au, goodneighbourplumbing.com.au, antonsplumbingandgas.com.au, jamesandcoplumbing.com.au, pipeperfection.com.au). **All 15 failed with DNS resolution errors** because these hosts are outside the session's allowed network domains. Per the brief, no further fetches were attempted and the list relies on search snippets.

**Scoring.** Five 1–5 sub-scores, summed (max 25):
- *business_fit* – owner-operated trade business, roughly 2–30 staff, established.
- *reputation_opportunity* – visible gaps: no rating found, small/stale footprint, inconsistent counts across pages, visible negative reviews, rating below local rivals.
- *ability_to_pay* – years trading, team size signals, job values, premium service areas, visible marketing spend.
- *accessibility* – owner/founder named publicly, clear website contact path, single decision-maker likely.
- *urgency* – a visible, current problem (negative review, sub-4.8 rating, stale page, invisible in search).
Ties were broken by reputation_opportunity, then urgency, then business_fit.

---

## 2. What could and could not be verified

**Verified from an explicit public snippet (24 rows have a `public_rating`):**
- Third-party platform ratings (strongest evidence): Pipe Perfection Plumbers (Trustpilot 3.8/10), True Local Electricians (Birdeye 5.0/250), Origin Bathrooms (Houzz 4.8/23), iPaint & Co (Word of Mouth 5.0/61), Sydney Painting & Maintenance (ProductReview 4.8/6), Excel Roof Restoration (5.0/77 via australianroofers.com directory).
- Self-reported Google ratings shown on the business's own website and visible in the snippet (weaker – the business controls the widget): Brushworks 4.9/67, A One Korean Painting 5.0/65, McElroy 4.8/84, Ready Set Plumb 4.9/267, Good Neighbour 4.9/107, Electrix All Blew 5.0/186, Innogy 5.0/45, Sirrom 5.0/55, ACG 4.9/490, PenAir 4.8/338, Sanders Roofing 4.7/46, Action Roofing 5.0/52, and others. `rating_source` labels these as "self-reported on business website" so the founder can treat them accordingly.
- A further 11 rows have a `review_count` but no rating (the snippet showed "based on N reviews" or "N five-star reviews" without a star figure). These are marked "partial – rating not verified".

**Not verified (26 rows marked "partial – rating not verified"):** no rating or count appeared in any snippet. This does **not** mean the business has no Google reviews – only that none surfaced in search. These rows are scored as higher *reputation_opportunity* on the hypothesis that an invisible footprint is itself the problem, but the founder must open each Google Business Profile before relying on that.

**Not verified for any row:**
- No business website was read directly (network policy), so **zero rows carry "verified – website read"**.
- Staff counts: inferred from signals only (e.g. Priority Plus "team of more than 12" in a Leader feature). PenAir is flagged as possibly larger than 30 staff.
- Owner reply behaviour: `response_consistency` is "not observed" for every row because no review thread was opened.
- `recent_review_themes` is filled only where the snippet quoted or paraphrased actual review content (e.g. PenAir's Daikin warranty complaint, Ready Electrical's $350 call-out complaint, Sydney Painting & Maintenance's blistering complaint, McElroy's "customer for nearly 20 years").
- Contact details: `public_contact_method` points to the business website or the directory listing where it was found. Only one phone number is recorded (Priority Plus, from a Cylex directory listing). No personal mobiles or personal emails were recorded.
- Business names are as they appeared in snippets; a few (e.g. "P & K Kelly & Son Plumbing", "Sutherland Shire Electrical") are generic enough that the founder should confirm the exact trading name and ABN.

---

## 3. Top 10 prospects – rationale

**1. Pipe Perfection Plumbers – Plumber, Inner West & Eastern Suburbs (score 21).**
The only prospect with a verified sub-4 third-party score: a 3.8 TrustScore from just 10 Trustpilot reviews, while the business itself claims 4,700+ homes serviced. That combination – large customer base, tiny and negative-skewed review sample – is the cleanest possible pitch for negative-review escalation plus a review-request workflow. Inner West rivals (SPS 4.8+/400+, Mr Splash 4.9/1,200+) make the gap obvious to any homeowner comparing. Likely A$499–799 tier.

**2. Ready Electrical & Air Conditioning – HVAC/electrical, Northern Beaches & Sutherland Shire (score 21).**
Family-owned, multi-region, and claims "hundreds of five-star Google reviews" – yet the search snippets for its own regional pages surfaced two negative reviews (a $350 call-out for a five-minute inspection with a rude follow-up call; a technician who had no record of the booking). Negative content appearing on the business's own pages indicates nobody is curating or responding. High urgency, clear ability to pay.

**3. D'Amore Home Renovations – Renovator, Northern Beaches & North Shore (score 21).**
Founder-named (Matt D'Amore), licensed builder, roughly 15 years of bathroom work, 19 reviews averaging five stars with customers praising communication. High-ticket, low-volume trade where each review matters and the owner is clearly the decision-maker. Opportunity is volume (19 reviews in 15 years) and protecting a perfect score. Very accessible pitch.

**4. Priority Plus Plumbing – Plumber, Kirrawee / Sutherland Shire (score 21).**
Team of 12+, 25+ years, Australian Small Business Champion award, 24/7 emergency work, and visibly spending on PR (sponsored Leader feature, May 2026 press releases). Despite that spend, no Google rating surfaced in any snippet. A business that already pays for reputation marketing but has no review-management layer is a natural A$799 prospect. Founder Peter Honey is publicly named.

**5. Eastern Beaches Painting – Painter, Randwick (score 20).**
Family-owned since 2009, Dulux accredited, award-winning, 5-year warranty – but the only review footprint found was 7 Facebook reviews, and its Mosman landing page is roughly 2.5 years old. Credentials wildly exceed online proof, in a premium market where Brushworks (4.9/67) and ASL (5.0/147) are visible. Textbook review-request pilot.

**6. Sanders Roofing – Roofer, Sutherland Shire (score 20).**
Operating since 2009 with a 4.7 from 46 Google reviews (directory shows 42) – the lowest rating among Shire roofers surfaced, next to Excel Roof Restoration's 5.0/77. A 4.7 on a small base is exactly where a couple of well-handled reviews move the needle. Roofing also generates post-storm complaints, so monitoring has ongoing value.

**7. DJ Daisley & Sons – Roofer, Inner West (score 20).**
Claims 100+ years of family roofing in the Inner West (metal, slate, tile). No rating or count surfaced anywhere. A century-old brand that is invisible in Google-led search while Roofer Near Me (4.9/200+) and Ian's Roofing (4.8/112) dominate is a strong story for the founder to tell, and the business has obvious staying power to pay.

**8. McElroy Plumbing – Plumber, Randwick (score 20).**
Family in the trade since 1930; 4.8 from 84 Google reviews, with a visible review from a near-20-year customer. The 4.8 trails Eastern Suburbs rivals at 4.9–5.0 with far higher counts (Mr Splash 1,248, Mint 539). Loyal customer base plus low review capture is the ideal review-request workflow case, and the heritage makes the owner-approved response angle easy.

**9. Shire Air Conditioning – HVAC, Sutherland Shire (score 19).**
Australian family-owned HVAC and electrical business whose website testimonials are roughly 4.5 years old. No rating surfaced. Shire rivals Skyco (279+ reviews) and Alpha & Omega (Daikin dealer since 1989) are far more visible. Stale proof is a soft, non-confrontational opener and a quick pilot win.

**10. Sutherland Shire Electrical – Electrician, Sutherland Shire (score 19).**
Shows 5.0 from 32 reviews on a page that is over three years old, with customers praising fast emergency response. True Local Electricians (250–318 reviews) and Skyco (279+) have since taken over local search. A 24/7 electrician with a stale, small footprint is high-urgency and the fix (fresh review flow plus monitoring) is straightforward.

*Near misses at 19 points:* Collaroy Kitchen Centre (78 reviews, newest testimonial ~3.5 years old), Peninsula Air Conditioning (4.8/338 with a visible Daikin-warranty complaint; may exceed 30 staff), North Sydney Painting & Decorating, Saunders Electrical Group, Alpha & Omega Air Conditioning, Ample Air, Brickwood Building.

---

## 4. Five manual verification steps for the top 10 (before any contact)

1. **Open the Google Business Profile for each business** (search the exact trading name + suburb in Google Maps). Confirm it exists, is claimed, and note the live rating and review count. Compare against the CSV figure – where the CSV says "self-reported on business website", expect the live number to differ. Also confirm the business is still trading and the address/suburb matches.
2. **Read the last 10 reviews on Google (sorted by newest)** and note: date of the most recent review (is the footprint active or stale?), any 1–3-star reviews and what they complain about, and whether the complaints match the "potential_reputation_problems" column. Update `recent_review_themes` with what is actually there.
3. **Check owner replies.** On the same 10 reviews, count how many have an owner response, how quickly, and in what tone. Record this in `response_consistency` ("replies to all", "replies to negatives only", "no replies", etc.). A business with zero replies and a recent negative review is the strongest pilot candidate.
4. **Open the hipages, Oneflare, ProductReview and Facebook profiles** (whichever exist) and record ratings and counts. Fragmentation across platforms (e.g. Origin Bathrooms on Houzz + Oneflare + Google; Ian's Roofing 4.8/112 on site vs 4 Facebook reviews) is itself a pitch point, but confirm it first.
5. **Confirm the owner and the contact path.** Open the business website's About and Contact pages: confirm the owner/founder name where the opener uses one (Matt D'Amore, Peter Honey, Oliver Saunders, Ken at Kmelectric, Dan at Roof Ranger), confirm the business phone/email, and check the NSW Fair Trading licence number if shown. Soften or remove any opener line that the live page does not support, and never use a personal mobile that is not the advertised business line.

---

## 5. Limitations

- **No websites were read.** All 15 fetch attempts failed on network policy (DNS not resolved). Every row is therefore "partial". Figures labelled "self-reported on business website" were seen only in search snippets of those sites.
- **Search budget exhausted** at roughly 60 queries (the per-turn limit is shared across agents). Planned follow-ups that did not run: website lookups for Theiss Electrical (TrueLocal 5.0/28, Penrith), Ol' Painting (Neutral Bay, 24 yrs, family-owned), Donnelly Roofing (Mt Colah, 60-yr family business, 0 directory reviews), Brennan Air Conditioning (Castle Hill, est. 1989), David Frith Quality Plumbing (Kirrawee, est. 1994), Fine Touch Group (Strathfield, 210+ reviews), Rossmark (Sutherland Shire, est. 1975). These are good alternates if any of the 50 drop out.
- **Self-reported counts are inconsistent** for several businesses (Saunders 243 vs 287; Sirrom; Orbit 102 vs 120; Ian's Roofing; True Local Electricians 250 vs 300+ vs 318). This was recorded as a reputation problem rather than resolved.
- **Staff size and revenue are inferred**, not confirmed. PenAir and ACG may be at or above the upper end of the 2–30 staff target.
- **Two businesses have no website recorded** (iPaint & Co; P & K Kelly & Son Plumbing) and two more are directory-only (Sydney Painting & Maintenance; Priority Plus's phone came from Cylex). They were kept because the directory/ad footprint shows they exist and spend on visibility, but accessibility is scored lower.
- **Franchise labelling.** No franchise operators were included. Good Neighbour Plumbing explicitly markets itself as "not a franchise".
- **Australian English** is used throughout; opener lines are drafts and should be re-read against the live Google profile before use.

---

## 6. Sources (key pages seen in snippets)

Review/directory platforms:
- https://ca.trustpilot.com/review/pipeperfection.com.au
- https://reviews.birdeye.com/true-local-electricians-sutherland-shire-160740219220899
- https://www.houzz.com.au/professionals/bathroom-designers-and-renovators/sutherland-shire-02-au-probr0-bo~t_11951~r_7839774
- https://www.wordofmouth.com.au/nsw/coogee/painters
- https://www.productreview.com.au/listings/sydney-painting-maintenance
- https://www.productreview.com.au/c/painters/l/new-south-wales_au
- https://www.productreview.com.au/c/plumbers/l/new-south-wales_au
- https://www.productreview.com.au/c/electricians/l/new-south-wales_au
- https://www.productreview.com.au/c/air-conditioning-heating-services/l/new-south-wales_au
- https://www.australianroofers.com/sydney/
- https://www.oneflare.com.au/b/origin-bathrooms
- https://www.top4.com.au/business/priority-plus-plumbing-71577
- https://www.cylex-australia.com/kirrawee/plumbing-heating-air-conditioning-contractors/?ho=1&hw=1
- https://www.theleader.com.au/story/9354021/priority-plus-plumbing-celebrates-over-25-years-serving-the-shire/
- https://www.theleader.com.au/local-business/directory/latest/ads/kogarah-nsw/p-and-k-kelly-son-plumbing-61418410850/
- https://www.facebook.com/easternbeachespainting/
- https://www.facebook.com/p/Ians-Roofing-100094360911334/

Business websites (seen via search snippets only; not fetched):
- Painters: brushworks.com.au; empirepaintingco.com.au; premierpainting.com.au; easycutpainting.com.au; easternbeachespainting.com.au; northsydneypainting.com; aonekoreanpainting.com.au; orbitpaint.com.au
- Plumbers: priorityplusplumbing.com.au; mcelroyplumbing.com.au; hardieandcoplumbing.com.au; readysetplumb.com.au; jamesandcoplumbing.com.au; platinumplumbers.net.au; goodneighbourplumbing.com.au; pipeperfection.com.au; antonsplumbingandgas.com.au
- Electricians: electrixallblew.com.au; chriswoodelectrical.com.au; truelocalelectricians.com.au; sutherlandshireelectrical.com.au; kmelectric.com.au; innogyelectrical.com.au; saunderselectricalgroup.com.au; sirromelectrical.com.au; sotagroupelectrical.com.au
- HVAC: alphaomegaair.com.au; airconditioningguys.com.au; ampleair.com.au; damellair.com.au; balmainairconditioning.com.au; penair.com.au; readyelectrical.com.au; shireair.com.au
- Renovators: damorehomerenovations.com.au; originbathrooms.com.au; collaroykitchen.com.au; sydneybestcarpentryandrenovations.com.au; hxdbuilt.com.au; brickwoodbuilding.com.au; duragroup.com.au
- Roofers: sandersroofing.com.au; excelroofrestoration.com.au; iansroofing.com.au; djdaisley.com.au; actionroofing.com.au; roofranger.com.au

Competitor benchmarks referenced (excluded as prospects): ASL Painting, Mr Splash Plumbing, SPS Plumbers, The Clean Plumber, The Local Electrician, AB Electrical, CB Climate Control, Skyco Trades, Kangaroof, Roofer Near Me, Fine Touch Group.
