# 09 — Service operating model

Reputrail is a managed service first. Nothing below requires software beyond Google Workspace, a spreadsheet, email, SMS and the Claude API. Detailed step-by-step procedures are in `business/manual-operating-procedures.md`; this file explains the design and the capacity logic.

## 1. The service, as sold

| # | Service | What the client receives | Essential | Managed | Premium |
|---|---|---|---|---|---|
| 1 | Initial reputation audit | One page: rating, count, recency and reply rate against three local competitors; praise and complaint themes; three recommended fixes | Free for all prospects | | |
| 2 | Review monitoring | Google, hipages, Facebook and ProductReview checked every working day by a person; every review logged | ✓ | ✓ | ✓ |
| 3 | Sentiment classification | Each review tagged by type (scheduling, communication, pricing, workmanship, not-a-customer, praise theme) and severity | ✓ | ✓ | ✓ |
| 4 | Personalised response drafts | Two drafts in the owner's voice within one working day of the review; approval by text or email | ✓ | ✓ | ✓ |
| 5 | Negative-review escalation | Same working day text to the owner with a plain read and a recommendation; policy-breach flags prepared for approval | ✓ | ✓ | ✓ (priority) |
| 6 | Customer-recovery recommendations | A written brief before the owner's call (what happened, what to offer, what not to say); outcome logged | | ✓ | ✓ (plus follow-up coordination) |
| 7 | Neutral review-request workflow | Honest request to every nominated customer after a completed job, with unsubscribe; consent and send log kept | | ✓ | ✓ |
| 8 | Competitor monitoring | Rating, volume and reply rate of three nominated competitors | | quarterly | monthly, with sentiment themes |
| 9 | Monthly reporting | One page: what came in, what we did, how you compare, what we recommend | ✓ | ✓ | ✓ plus a 30-minute call |

## 2. Negative review handling (the promise we can keep)

- We do not sell review deletion and never guarantee removal, rankings or star ratings.
- When a review plausibly breaches Google's content policy (off-topic, not a customer, harassment, conflict of interest), we identify the specific policy, prepare the flag text and submit it only with the owner's approval. Google decides. We tell the client the realistic odds (low) in advance.
- Legitimate negative reviews get a calm, specific public reply and, where it could help, a private recovery call by the owner. The reply is published only after approval.
- We never ask a customer to change or remove a review as a condition of anything. If a recovered customer chooses to update their review, that is their decision.

## 3. Things we never do (binding on every client)

Buy reviews; write or post fake reviews; offer incentives for reviews; suppress or gate negative feedback; selectively ask only happy customers; make false claims; guarantee rankings or ratings; publish anything without authorisation; ask for passwords. These are written into the service agreement (file 08 §10b) and onto the website.

## 4. Manual operating model without Google API access

| Function | Tool | How |
|---|---|---|
| Monitoring | Google Maps (manager access), hipages, Facebook, ProductReview, plus Google Alerts for the business name | A fixed 20-minute daily window, one client at a time, checking "newest" sort; the client's Google Business Profile email notifications are also forwarded to Reputrail where the client agrees |
| Review log | Google Sheet, one tab per client | Date, platform, stars, text, type, severity, draft sent, approved, published, recovery outcome |
| Classification and drafting | Claude API via a small script, or Claude.ai with the client's voice guide pasted | Personal data stripped before sending; output edited by a person |
| Approval | SMS or email to the owner with the draft; reply "Yes", "Edit: …" or "No" | Standing approval allowed for 5-star thank-yous only, recorded in the agreement |
| Publishing | Google Business Profile as a Manager under Reputrail's own Google account; hipages and Facebook via the client's authorised access | Never passwords; the client can remove access in one click |
| Escalation | Phone call or SMS to the owner the same working day | Template brief: what happened, type, suggested approach, suggested offer, what not to say |
| Review requests | Email or SMS from a Reputrail sender identifying the client, with a working unsubscribe link, from a consent-logged customer list the client supplies after each completed job | Spam Act obligations per file 08 §3 |
| Reporting | Google Docs template exported to PDF monthly | 45 minutes per client |
| Authorisation records | Signed agreement plus a dated authorisation form per platform | Kept in the client folder |

A Google Business Profile API application (file 08 §4.4) becomes worthwhile at roughly 15 clients, when daily manual checking exceeds an hour.

## 5. Capacity model for a 5–8 hour founder week

| Activity | Minutes | Frequency | Monthly hours at 5 clients | at 10 clients |
|---|---:|---|---:|---:|
| Daily monitoring window (all clients) | 20–30 | 22 working days | 7.3–11 | 9–11 (batching helps) |
| Draft, send, chase approval, publish | 12 per review | ~35 reviews/month per 5 clients (ESTIMATE) | 7 | 14 |
| Escalation and owner brief | 40 | ~20% of reviews | 4.7 | 9.3 |
| Review requests (batch send and log) | 30 | weekly per client | 10 | 20 |
| Monthly report | 45 | monthly per client | 3.75 | 7.5 |
| Client calls and admin | 30 | monthly per client | 2.5 | 5 |
| **Total delivery** | | | **~35–39 h** | **~65–67 h** |

Five Managed clients already consume about 8–9 hours a week. The table is deliberately conservative; three levers bring it down to the 4 hours/client/month used in file 06: standing approval on positive reviews (removes half the approval chasing), batching review requests fortnightly, and a client-supplied job list that imports straight into the request log. Even so, the honest ceiling for a solo founder on 5–8 hours a week is **6–8 Managed clients**. Customer nine needs either 10–12 founder hours a week or a part-time assistant for monitoring and logging.

## 6. Delivery risks and controls

| Risk | Control |
|---|---|
| A reply goes out that the owner did not approve | Approval is a logged message; no standing approval below 5 stars; two-person rule not possible, so the founder re-reads every reply before posting |
| A reply is factually wrong or admits liability | Voice guide includes "never admit fault for workmanship or safety in writing; acknowledge the experience, take it offline"; anything involving injury, defect, legal threat or money owed goes to the owner with a template and is not drafted publicly without the owner's words |
| Review-request message breaches the Spam Act | Consent log per customer, sender identification of the client business, functional unsubscribe honoured within 5 working days, no sends to anyone who has not had a completed job |
| Customer data leaks | Minimum data (first name, one contact detail, job date), deleted 90 days after the request; stripped before any AI call; access-controlled Workspace |
| Founder unavailable (illness, holiday) | Written SOPs; a nominated backup who can at least monitor and acknowledge; clients told the escalation promise is "same working day" not "same hour" |
| Client leaves | Remove Reputrail as manager, export their log, delete their customers' data within 30 days, confirm in writing |

## 7. What changes at 10, 20 and 40 clients

- **10:** hire a virtual assistant for monitoring and logging (6–10 hours/week); founder keeps drafting, escalation and client calls.
- **20:** apply for Google Business Profile API access; build the Sheets-plus-script workflow into a small internal tool; move reports to a semi-automated template.
- **40:** a full-time account manager; the founder's role becomes sales, quality and recovery coaching. This is also where the "customer-experience desk" adjacency (missed-call response, follow-up, warranty coordination; file 03 Q6) becomes the growth product.
