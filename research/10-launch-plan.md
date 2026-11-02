# 10 — Launch plan

Objective: three paying founding customers within 90 days, alongside full-time employment, spending no more than A$1,500 in cash before the first invoice.

## Next 24 hours

1. **Name checks you must run yourself** (30 minutes): ASIC Connect business-name availability for "Reputrail"; ABN Lookup; IP Australia TM Checker in class 35 (and 42); auDA WHOIS or a registrar for reputrail.com.au, reputrail.au and reputrail.com. Record the results in `research/raw-name-clearance.md` §7. If any check is contested, stop and decide before spending on the brand. Note the sound-alikes already found (RepuTrack, RepTrak) and ask a trade mark attorney for a 30-minute opinion before filing.
2. **Verify the top 10 prospects** (60 minutes): open each Google Business Profile and complete the five checks in `research/05-prospect-strategy.md`. Update the CSV.
3. **Three referral asks** (20 minutes): text three people who know a Sydney plumber or air-conditioning business using the warm referral script in `business/customer-interview-script.md`.
4. **Deploy a preview** (30 minutes): push this repository, import it to Vercel, add `AUDIT_WEBHOOK_URL` (a Make/Zapier webhook to a Google Sheet, or a Formspree endpoint) and `NEXT_PUBLIC_SITE_URL`. Hobby is fine for a private preview; move to Pro before publishing commercially (see §Hosting).
5. **Book two conversations** for this week.

## Days 2–30: validate and prepare

- Hold ten discovery conversations (file 04). Deliver six free audits using the one-page template (the website's example audit shows the format).
- Register the ABN (free) and the business name (A$47/yr or A$108/3yrs, VERIFIED snippet). Decide sole trader vs company with your accountant; a company adds annual ASIC fees but limits liability, which matters for a service that publishes words under a client's name.
- Get quotes for professional indemnity and public liability insurance that include media/defamation cover (file 08 §7; broker estimates A$60–130/month).
- Have a lawyer review the service agreement outline (file 08 §10b) and the privacy policy (site `/privacy`). Budget A$1,000–3,000.
- Set up Google Workspace on the domain, a VoIP business number, and the client folder structure (SOP 0 in `business/manual-operating-procedures.md`).
- Write the first two client voice guides from the discovery calls, even for prospects who have not signed; it sharpens the drafting prompts.
- Add the founder's name, photo and phone to `src/lib/site.ts` and republish.

## Days 31–60: sell the pilot

- Offer the founding pilot (A$299 for 30 days of Managed) to the six audited prospects. Target three signatures.
- Onboard each pilot within five working days of signature: 30-minute call, authorisation form, Google Business Profile manager invite, voice guide, first batch of overdue replies.
- Run the daily monitoring window every working day without exception; log hours.
- Send the first review-request batch for each pilot within 14 days, with consent records.

## Days 61–90: deliver, convert, decide

- Deliver three monthly reports. Hold the day-20 conversion call for each pilot.
- Convert two of three pilots to Managed at A$499 (target). Ask each for one referral.
- Review the kill criteria below honestly, with the hour log in front of you.
- If continuing: register for GST planning, open the next prospect cluster, and decide whether to recruit a virtual assistant at client eight.

## Kill criteria at day 90 (set now, in writing)

- Fewer than 3 of 20 owner conversations accept a free audit.
- Fewer than 1 of 10 audits converts to a paid pilot.
- Two pilots churn within 60 days citing "I can do this myself".
- The daily monitoring window was skipped more than 20% of working days.
- Founder hours per Managed client exceed 6 after month two despite templates and standing approvals.

Any two of these means stop or pivot (file 03 Q6 lists the adjacent "customer-experience desk" opportunity).

## Hosting and deployment

- **Development previews:** Vercel Hobby is acceptable for private previews while the business is pre-revenue. Vercel's terms describe Hobby as for personal, non-commercial use (VERIFIED third-party snippets quoting the pricing FAQ; confirm on vercel.com/pricing).
- **Public commercial operation:** move to **Vercel Pro** (about US$20 per seat per month, usage billed on top; VERIFIED third-party snippets) before the site is promoted to customers. The site is static apart from one server action, so usage costs should be negligible.
- Environment variables: `AUDIT_WEBHOOK_URL` (where audit requests are posted as JSON), `NEXT_PUBLIC_SITE_URL` (canonical URL for metadata and sitemap). Without the webhook the form shows an honest "not connected, email us" fallback rather than pretending to send.
- Domain: register reputrail.com.au (requires ABN/ACN and a connection to the name, so register the business name first) and reputrail.au; point both at Vercel; set the canonical to reputrail.com.au.
- Analytics: none installed. If wanted, add Vercel Web Analytics (privacy-friendly, no cookie banner needed under current Australian law; confirm with the privacy policy) rather than Google Analytics.

## Budget to first invoice (ESTIMATE)

| Item | A$ |
|---|---:|
| ASIC business name (1 year) | 47 |
| Domains (.com.au + .au, 1 year) | 50–70 |
| Google Workspace (3 months) | 36 |
| Vercel Pro (first paid month) | 30 |
| Insurance (first quarter) | 180–390 |
| Legal review of agreement and policy | 1,000–3,000 (can be deferred to first signature) |
| Trade mark (1 class, optional at this stage) | 250–400 |
| SMS and API | <30 |
| **Total excluding legal** | **~A$600–1,000** |

## Separation from the founder's employer

Own laptop, own phone number, own Google Workspace, own Claude account. No work during employer hours, no use of employer templates, contacts or data, no overlap with the employer's clients. Check the employment contract for outside-business and IP clauses and, if required, notify the employer in writing. This protects both the business and the job.
