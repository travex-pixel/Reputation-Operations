# Manual operating procedures (SOPs)

Designed for a founder with 5–8 hours a week, no Google API access, Google Workspace, Google Sheets, Google Docs, email, SMS and the Claude API. Every SOP names its trigger, steps, time budget and record. Compliance notes refer to `research/08-compliance-and-risk.md`.

## SOP 0 — Set-up (once)

1. Google Workspace on the business domain; two-factor authentication on every account.
2. Shared Drive "Reputrail Clients" with a folder per client: `Agreement`, `Authorisation`, `Voice guide`, `Record (Sheet)`, `Reports`, `Requests (consent log)`.
3. Master Sheet "Reputrail CRM": tabs `Prospects`, `Conversations`, `Pipeline`, `Hours`.
4. Templates in Docs: Audit, Voice guide, Escalation brief, Monthly report, Authorisation form, Service agreement (lawyer-reviewed).
5. SMS: a business number (VoIP) used for approvals and review requests; sender identification set to the client's business name in the message body (Spam Act §3).
6. Claude API key stored in a password manager; a simple script (or Claude.ai project per client) with the classification and drafting prompts below. Never paste customer contact details into prompts.
7. Daily calendar block: 20–30 minutes, same time every working day, named "Monitoring window".

## SOP 1 — Onboarding (per client; 90 minutes over week one)

Trigger: signed pilot or plan.

1. Send the agreement (file 08 §10b outline) and the authorisation form for e-signature. Record date signed.
2. 30-minute call. Capture into the Voice guide: how they address customers (first names? "mate"?), typical sign-off, what they will never say publicly, approval preferences (individual vs standing approval for five-star reviews), escalation contact and hours, three nominated competitors, which platforms matter, who supplies the completed-jobs list and how often.
3. Create the client folder, Record sheet (columns: date seen, platform, review date, stars, reviewer first name, review text, type, severity, recovery?, draft sent, approved (who/when/how), published, outcome, notes) and the consent log.
4. Ask the owner to add Reputrail's Google account as **Manager** (Business Profile → People and access). Confirm access. Repeat for Facebook Page (Editor) if in scope. hipages: monitor only until the client confirms how replies work on their plan.
5. Catch-up plan: list every unanswered review; schedule replies, oldest first, maximum five per day to avoid looking automated.
6. Set up Google Alerts for the business name and any trading names.
7. Send the welcome email: what happens daily, how approvals work, the escalation promise ("same working day"), how to send completed jobs for review requests, how to stop.

## SOP 2 — Authorisation (per client, per platform)

Trigger: onboarding or new platform.

1. Written authorisation names: platforms, the Reputrail account granted access, what we may publish (replies only), approval rules, what we may never do, how access is revoked.
2. Access is always by role (Manager/Editor), never by password. If a client offers a password, decline and walk them through the invite.
3. Record the date, the role granted and a screenshot of the access list in `Authorisation`.
4. Review access quarterly; remove on offboarding within 24 hours and confirm in writing.

## SOP 3 — Daily monitoring (all clients; 20–30 minutes)

Trigger: the daily window.

1. For each client, open Google Maps reviews sorted by newest; then hipages, Facebook, ProductReview (if in scope); check the forwarded notification inbox and Google Alerts.
2. Log every new review in the Record sheet with the public text and reviewer first name only.
3. Classify (SOP 4). Anything negative (1–3 stars) or any review alleging safety, defect, injury, legal action or money owed goes straight to SOP 6 before drafting.
4. For positive reviews: draft (SOP 5) and send for approval, or publish under standing approval.
5. Update the `Hours` tab.

## SOP 4 — Classification

Trigger: a new review logged.

1. Run the classification prompt (Haiku-class model) with the review text only:
   > Classify this customer review of a [trade] business. Return JSON: type (scheduling | communication | pricing | workmanship | staff_conduct | not_a_customer | praise), severity (1–5), recovery_recommended (true/false and why in one sentence), policy_flag_candidate (true/false and which Google policy, if any), praise_themes (list), complaint_themes (list).
2. A person reads the review and corrects the classification where needed. The person's judgement overrides the model.
3. Record the type, severity and themes in the sheet. Themes feed the monthly report.

## SOP 5 — Response drafting

Trigger: a classified review ready for reply.

1. Run the drafting prompt (Sonnet-class model) with the client's Voice guide and the review (contact details stripped):
   > You draft public replies to Google reviews for [business], a [trade] business in Sydney. Write two replies of 40–90 words in the owner's voice described below. Rules: thank by first name if given; be specific about the job; never admit fault for workmanship or safety; never argue facts publicly; never offer money or discounts publicly; for negative reviews, acknowledge the experience, say what will happen next, and take it offline with a phone call offer; no emojis; Australian English; sign off as [owner first name].
2. Edit the better draft by hand until it sounds like the owner. Reinsert names.
3. Send for approval by SMS or email: "New [stars]-star review from [first name] about [job]. Draft reply: '…'. Reply YES to post, EDIT with changes, or NO." Target: within one working day of the review appearing.
4. Record the draft, the time sent and the approval response (verbatim) in the sheet.

## SOP 6 — Approval and publishing

Trigger: owner's reply.

1. YES: publish within the hour under the business's profile via the Manager role; record the published time; re-read the live reply once.
2. EDIT: apply the owner's words exactly; resend only if the change is material; otherwise publish and note "published with owner edits".
3. NO: record and do nothing publicly; ask if they want a different approach.
4. No response after 2 working days: one reminder; after 4 working days, leave unanswered and note it in the monthly report. Never publish a reply to a 1–4-star review without explicit approval.
5. Standing approval applies only to 5-star reviews and only where the agreement records it. Even then, re-read every reply before posting.

## SOP 7 — Complaint escalation and customer recovery

Trigger: a 1–3-star review, or any review alleging safety, defect, injury, legal action, or money owed.

1. Same working day, text or call the owner: "Heads up: [stars]-star review from [first name] about [job]. [One-sentence read of what happened]. Recommend: [reply only / call them / check records]. I'll send a draft reply within the hour. Want me to brief you for the call?"
2. Prepare the escalation brief (Doc template): the review, the type, what the customer seems to want, suggested opening line for the call, suggested resolution (reschedule, revisit, partial refund, waived fee), what not to say, and how to close ("Would you be happy for me to follow up on how the fix went?").
3. The owner makes the call. Reputrail never calls a client's customer about a complaint unless the client has explicitly asked and the customer has agreed to be contacted by a third party.
4. Log the outcome in the sheet (resolved / pending / declined, what was agreed, date of any revisit).
5. Reviews alleging defects, injury, legal threats or money owed: draft nothing public without the owner's own words; recommend the owner consult their insurer or lawyer where appropriate; record that the recommendation was given.
6. Policy-flag candidates: identify the specific Google policy (e.g. conflict of interest, off-topic, not a customer, harassment), prepare the flag text, obtain the owner's written approval, submit via the Manager role, record the date. Tell the owner the realistic chance is low and Google decides. Never promise removal.

## SOP 8 — Customer follow-up and review requests

Trigger: the client's completed-jobs list (weekly or fortnightly).

1. The client sends first name, one contact detail and job date for every completed job they are happy to have contacted, not a selection by sentiment. Record each with the date received as the consent record; the client confirms in the agreement that customers were told they may receive a follow-up message.
2. Within 3 working days of job completion, send one message by SMS or email identifying the client business, thanking the customer, asking honestly for feedback and including the Google review link and a working unsubscribe (reply STOP or a link). Template:
   > Hi [first name], it's [owner] from [business]. Thanks for having us out on [date]. If you've got a minute, an honest review helps other locals find us: [link]. Reply STOP to opt out.
3. No incentives, no sentiment filtering, no "contact us first if unhappy" gating. One reminder after 7 days at most; none if they opted out.
4. Process unsubscribes within 5 working days (aim for same day) and record them; never message that contact again for that client.
5. Delete customer contact details 90 days after the last message.
6. If a request produces a negative review, it is handled under SOP 7 like any other.

## SOP 9 — Monthly reporting (45 minutes per client)

Trigger: the first working day of the month.

1. From the Record sheet: reviews received by platform and stars; replies published and median time to publish; escalations and outcomes; requests sent, opt-outs; praise and complaint themes.
2. Competitor snapshot: rating, count, reply rate for the three nominated competitors (manual read).
3. Draft the narrative with the report prompt (Sonnet-class model, batch where possible), then edit by hand. Keep to one page: "What came in", "What we did", "How you compare", "What we recommend next month".
4. Export to PDF, email it, and for Premium clients book the 30-minute call.
5. Note the three recommendations in the sheet so next month's report can say whether they happened.

## SOP 10 — Offboarding

Trigger: notice from the client, or end of pilot without continuation.

1. Confirm the end date in writing (end of the paid month).
2. Export the Record sheet and send it to the client with the final report.
3. Remove Reputrail's access on every platform within 24 hours; send a screenshot confirming.
4. Delete customer contact data within 30 days; retain the agreement and invoices for seven years.
5. Ask for feedback and, if appropriate, a referral.

## Weekly founder rhythm (target 5–8 hours)

| Day | Block | Minutes |
|---|---|---|
| Mon–Fri | Monitoring window | 20–30 each |
| Mon | Review requests batch for all clients | 45 |
| Wed | Prospecting and audits | 90 |
| Fri | Record hygiene, hours log, pipeline update | 30 |
| Month start | Reports | 45 per client |

Record hours per client every day. If any client exceeds 6 hours in a month, review the voice guide and standing approvals before accepting the next client.
