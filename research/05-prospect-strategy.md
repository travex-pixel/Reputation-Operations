# 05 — Prospect strategy

Goal: ten genuine conversations with Sydney trade owners, not fifty generic emails. The CSV at `prospect-list.csv` holds 50 scored prospects; `raw-prospect-notes.md` holds the research agent's method notes and per-prospect rationale. This file turns them into a plan.

## How the list was built, and what it is not

- Fifty real businesses were identified from public search results across six trades: 10 painters, 10 plumbers, 9 electricians, 8 HVAC, 7 renovators/builders, 6 roofers, all in Greater Sydney, mostly 2–30 staff, no national franchises.
- Ratings and review counts were recorded only where a public search snippet showed them (24 of 50 rows have a rating; 11 more have a review count only). Where the snippet came from the business's own website (self-reported Google rating) the source column says so.
- No business website could be fetched directly (network policy), so every row is marked "partial". Nothing was scraped, no platform was logged into, and no personal mobile numbers or personal emails were recorded; the contact column points to the business's public contact page or advertised business line.
- Scores (1–5 each) are the researcher's judgement on business fit, reputation opportunity, ability to pay, accessibility and likely urgency, from public signals only. Treat the ranking as a starting order, not a verdict.
- Several rows record internally inconsistent self-reported review counts (e.g. two different totals on the same website). Those are noted as a reputation-hygiene opening, not resolved.

## The top 10 (from the CSV; verify before contact)

| Rank | Business | Trade | Area | Public signal seen | Why it is interesting | Score /25 |
|---|---|---|---|---|---|---|
| 1 | Pipe Perfection Plumbers | Plumber | Inner West & Eastern Suburbs | Trustpilot 3.8 from 10 reviews; claims 4,700+ homes serviced | A big customer base represented by a tiny, low review sample: the textbook case for review requests and escalation | 21 |
| 2 | Ready Electrical & Air Conditioning | HVAC | Northern Beaches / Sutherland Shire | Negative reviews visible on its own pages | HVAC (our first niche), multi-trade, review problem already public | 21 |
| 3 | D'Amore Home Renovations | Renovator | Northern Beaches & North Shore | 5.0 from 19 reviews over ~15 years | Founder-led, excellent work, almost no review volume: a "genuine request" workflow story (note: renovators are not our launch niche; treat as a referral-rich conversation) | 21 |
| 4 | Priority Plus Plumbing | Plumber | Kirrawee / Sutherland Shire | 12+ staff, 25 years, PR spend; no rating surfaced | Pays for marketing already; rating footprint unclear | 21 |
| 5 | Eastern Beaches Painting | Painter | Randwick / Eastern Suburbs | Dulux-accredited since 2009; only 7 Facebook reviews found | Quality operator with a thin public record; good design partner for a later painters tier | 20 |
| 6 | Sanders Roofing | Roofer | Sutherland Shire | 4.7 from 46 | Lowest rating among Shire roofers seen; competitors ahead | 20 |
| 7 | DJ Daisley & Sons | Roofer | Inner West | 100+-year family firm; no rating surfaced | Heritage brand, reputation is the whole sale, little online footprint | 20 |
| 8 | McElroy Plumbing | Plumber | Randwick / Eastern Suburbs | 4.8 from 84 | Since 1930; trails local rivals on volume | 20 |
| 9 | Shire Air Conditioning | HVAC | Sutherland Shire | Website testimonials ~4.5 years old | HVAC, stale proof, likely owner-run | 19 |
| 10 | Sutherland Shire Electrical | Electrician | Sutherland Shire | 5.0 from 32 on a 3-year-old page; rivals at 250+ | Great rating, tiny volume vs competitors | 19 |

Geographic note: five of the top twelve are in the Sutherland Shire, and four are in the Eastern Suburbs/Inner West. Pick one cluster per fortnight for in-person coffee meetings; it halves travel and lets you reference local competitors by name.

Niche note: the research in file 02 says lead with HVAC and plumbing. Of the top 10, six are HVAC or plumbing. Start with those six; use the painter, roofers and renovator as learning conversations and referral sources.

## Five manual checks before contacting anyone

1. Open the business's Google Business Profile in Maps. Record: rating, review count, date of newest review, how many of the last ten reviews have an owner reply, and the tone of any reply to a negative review.
2. Read the three most recent negative (1–3 star) reviews in full. Classify each: scheduling, communication, pricing, workmanship, or not-a-customer. Note whether the owner replied.
3. Check hipages and Facebook for a second review footprint and whether the business is paying for hipages leads (a "hipages" badge or profile implies A$139–649+/month of demand spend).
4. Search "[business name] reviews" and the owner's name to catch ProductReview, Word of Mouth, Houzz or news items, and to confirm the business is still trading and the owner's name.
5. Pick the three nearest competitors in the same trade from the Maps results and record their rating, count and reply rate. This becomes the audit's comparison table and your opener.

Do not contact a business whose profile you have not opened. The opener must reference something you have actually seen.

## Contact sequence (per prospect)

1. **Warm path first.** Ask your network: "Do you know anyone at [business]?" An introduction beats everything below.
2. **Call the business line** between 7:30–8:30am or 3:30–5:00pm, when owners answer phones and are not on a roof. Ask for the owner by name. Use the phone script in `business/customer-interview-script.md`. Goal: a 15-minute conversation, not a sale.
3. **If no owner reached**, send one email to the public business address with the personalised opener from the CSV, adjusted for what you saw in the manual checks, and the offer of the free audit. No attachments, no deck.
4. **One follow-up** five working days later with the audit itself (do the audit anyway for the top 10; it costs 30 minutes and is the best demonstration). Then stop; add to a quarterly check-in list.
5. **Log every touch** in the CRM sheet (`business/manual-operating-procedures.md` SOP 0) with the owner's exact words.

## Weekly cadence for a 5–8 hour founder week

- 2 hours: verification and outreach (5 new prospects verified, 3–5 calls, 2 emails).
- 1 hour: audits for the warmest prospects.
- 1 hour: conversations (two 20-minute discovery calls plus notes).
- Remaining hours: delivery for pilots once they start.

## Measures for the first 30 days

| Measure | Target |
|---|---|
| Prospects manually verified | 20 |
| Owner conversations held | 10 |
| Free audits delivered | 6 |
| Pilots agreed | 2–3 |
| Referrals received | 3 |

## After the first ten

Refill the list from: the Sutherland Shire and Eastern Suburbs Maps results for "air conditioning installer", "plumber", "hot water"; Master Plumbers NSW and ARC-licensed installer directories; the alternates listed in `raw-prospect-notes.md` (Theiss Electrical, Ol' Painting, Donnelly Roofing, Brennan Air Conditioning, David Frith Plumbing, Fine Touch Group, Rossmark); and every conversation's answer to "who else should I talk to?".
