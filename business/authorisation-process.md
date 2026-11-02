# Customer approval and authorisation process

Two different things, both written down: **authorisation** (the client allows Reputrail to act on specified platforms within limits) and **approval** (the client signs off each public reply before it is published). Neither ever involves passwords.

## 1. Authorisation (once per client, per platform)

The signed authorisation form records:

1. The client business, ABN and the owner's name.
2. The platforms in scope (Google Business Profile, Facebook Page, hipages, ProductReview, other).
3. The Reputrail account to be granted access on each platform, and the role (Google: Manager; Facebook: Editor).
4. What Reputrail may publish: replies to reviews, only after approval under §2; nothing else (no posts, no profile edits, no offers) unless separately agreed in writing.
5. Approval rules: individual approval by default; whether standing approval applies to five-star thank-yous (and only those).
6. What Reputrail will never do: buy, write or incentivise reviews; selectively solicit; guarantee ratings, rankings or removals; publish without approval; contact the client's customers except for agreed review requests; ask for passwords.
7. Review requests: that the client will nominate every customer with a completed job (no sentiment filtering), confirms those customers were told they may receive a follow-up message, and that every message identifies the client business and includes a working unsubscribe.
8. Policy flags: that Reputrail may prepare a report to Google for a review that appears to breach Google's policies, and will submit it only with the owner's written approval; that Google decides.
9. Data: what Reputrail stores (first names, public review text, approvals, outcomes), where (access-controlled Workspace), for how long (customer contact details 90 days after the last request; client records for the engagement plus seven years where tax law requires), and how to request correction or deletion.
10. Revocation: the client can remove access at any time from their own account; Reputrail removes itself within 24 hours of notice.

Access is granted by invitation from the client's own account. If a client offers a password, decline and walk them through the invitation. Screenshot the access list and store it with the date.

## 2. Approval (every public reply)

States, as implemented in the workspace:

| State | Meaning | Recorded |
|---|---|---|
| AI recommendation | Classification and recommended action produced by rules or a model | Source, model, time; corrected-by if a person changed it |
| Draft prepared | One or more drafts exist (AI or human) | Author (ai/human), model, time |
| Awaiting human approval | Draft sent to the owner | Channel (SMS, email, call, in person), time |
| Approved / Amended | Owner said yes, or yes with edits | Approver, time, channel, amended text |
| Rejected | Owner said no | Reason if given |
| Action completed | A person published the approved text on the platform | Publisher (founder), time, exact text published |

Rules:

- Nothing is published until a draft is in Approved or Amended, and then only the approved text, verbatim.
- Standing approval applies only to five-star reviews and only where the agreement records it. Every standing-approval reply is still re-read by a person before posting.
- Sensitive complaints (safety, injury, defects, legal threats, money owed, discrimination, harassment) are escalated and never drafted automatically; any public reply uses the owner's own words.
- No response after two working days: one reminder; after four, leave unanswered and note it in the monthly report.
- Approvals by SMS are kept as screenshots in the client folder for the first three clients; the workspace records the state transitions.

## 3. Recovery calls

The owner, not Reputrail, calls the customer. Reputrail prepares the brief (what happened, type, suggested opening, suggested resolution, what not to say) and records the outcome. Reputrail contacts a client's customer about a complaint only when the client has explicitly asked and the customer has agreed to a third-party contact.

## 4. Review requests

Consent record per customer: name, one contact detail, job date, date nominated by the client. One message within three working days of job completion, identifying the client business, with an honest ask and a working unsubscribe; at most one reminder after seven days; opt-outs processed within five working days and recorded; details deleted 90 days after the last message. Never incentives, never filtering by sentiment, never "contact us first if unhappy" gating.

## 5. Records and audit trail

Every action is logged with who (founder, system, AI, client), when and what. The monthly report draws on these records. The client may request their record at any time and receives it at offboarding.
