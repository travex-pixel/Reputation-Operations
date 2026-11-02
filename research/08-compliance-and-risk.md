# 08 — Compliance and Risk (Australia) for Reputrail

**Prepared:** 2026-11-02 (all URLs accessed 2026-11-02 unless stated)
**Scope:** Reputrail — Sydney-based managed online-reputation and customer-feedback service for Australian trade businesses (review monitoring on Google / hipages / Facebook / ProductReview; drafting review responses for owner approval; escalation of negative reviews; customer recovery coordination; review-request SMS/email sent on the client's behalf; Claude API used for classification/drafting). Founder is a sole trader initially.

**Status of this document:** research and operational analysis only. It is **not legal advice**. Items marked "LAWYER" need a qualified Australian lawyer (consumer/privacy/telecommunications) before launch.

**Evidence labels used throughout**
- **VERIFIED** — read on the cited page (full page) or in a search-engine snippet of the cited page ("snippet-only" noted where applicable).
- **ESTIMATE** — derived number or range.
- **ASSUMPTION** — operating assumption Reputrail should adopt pending confirmation.
- **HYPOTHESIS** — belief to test.
- **RECOMMENDATION** — what Reputrail should do.
- **UNVERIFIED** — could not be reached in this session (host blocked or search budget exhausted); check before relying on it.

**Research constraints in this session (important):** the following hosts failed DNS resolution under the session's network policy and could not be read directly: accc.gov.au, oaic.gov.au, acma.gov.au, legislation.gov.au, donotcall.gov.au, industry.gov.au, asic.gov.au, business.gov.au, ipaustralia.gov.au, support.google.com, developers.google.com, developers.google.cn, productreview.com.au and support.productreview.com.au, hipages.com.au, transparency.meta.com, privacy.anthropic.com, privacy.claude.com, trust.anthropic.com. Where a regulator page is cited below, the content comes from the **search-result snippet** of that page (labelled "snippet-only"), not a full read. The WebSearch budget for the turn was exhausted before every planned query ran (roughly 30 of 40+ searches completed), so some sub-topics are thinner than intended and are flagged UNVERIFIED. Pages that were read in full: anthropic.com commercial terms and DPA, claude.com/pricing, platform.claude.com pricing / data-residency / data-retention docs.

---

## 1. Australian Consumer Law (ACL) — reviews, testimonials, misleading conduct

### 1.1 What the law and the ACCC say

- **Fake or commissioned reviews are unlawful.** ACCC (snippet-only, https://www.accc.gov.au/media-release/accc-releases-guidance-about-online-product-reviews): "Fake online reviews are in breach of the Australian Consumer Law and businesses are advised not to write or commission reviews about their own business or a competitor's business which are misleading." — **VERIFIED (snippet)**.
- **The ACCC's business guide** is "A guide to online reviews for business and review platforms" (https://www.accc.gov.au/about-us/publications/a-guide-to-online-reviews-for-business-and-review-platforms) — **VERIFIED (snippet)**; the ACCC's current business page is https://www.accc.gov.au/business/advertising-and-promotions/online-reviews-for-product-and-services — **VERIFIED (snippet)**. Full text could not be read (host blocked). The older title "Managing online reviews" appears in 2013–2015 ACCC material (snippet-only, Mondaq summary https://www.mondaq.com/australia/product-liability-safety/280430/accc-releases-guidelines-on-online-user-reviews).
- **Incentivised reviews.** ACCC guidance (snippet-only, same ACCC business page and https://accc.gov.au/media-release/true-value-solar-discontinues-incentives-for-positive-online-reviews): any incentive "should be provided regardless of whether the review is positive or negative" and "incentivised reviews should be clearly disclosed". Businesses that "artificially inflate their review results by offering consumers generous incentives in exchange for reviews" risk breaching the ACL — **VERIFIED (snippet)**.
- **Selective publication / suppression** of negative reviews, and editing reviews, are treated as misleading (ACCC: "businesses and review platforms that do not remove reviews they know to be fake risk breaching the Australian Consumer Law" — snippet-only, https://accc.gov.au/business/selling-products-and-services/small-business-education-program/misleading-conduct-and-advertising/online-reviews-must-be-genuine) — **VERIFIED (snippet)**.
- **2023 ACCC sweep:** 37% of 137 businesses reviewed showed concerning review/testimonial conduct; ACCC said it "may take enforcement action" where non-compliance continues (snippet-only, https://www.accc.gov.au/media-release/scrutiny-of-influencers-and-businesses-for-misleading-advertising-and-online-reviews-continues) — **VERIFIED (snippet)**.

### 1.2 Enforcement examples (all snippet-only, pre-2020 unless noted)

| Matter | Outcome | Source |
|---|---|---|
| Euro Solar / Australian Solar Panel (2014) | Combined penalties A$125,000 for fake testimonials + false origin claims; director personally A$20,000 | https://www.accc.gov.au/media-release/145000-penalty-for-fake-testimonials-and-false-solar-energy-country-of-origin-representations — VERIFIED (snippet) |
| Electrodry (franchisor) | A$215,000 penalties for fake testimonials; court noted cooperation discount | https://realestatebusiness.com.au/industry/10006-business-penalised-215k-for-fake-testimonials — VERIFIED (snippet) |
| A Whistle & Co (2015) | Penalties for fake testimonials (18 Dec 2015) | https://hwlebsworth.com.au/penalties-for-fake-testimonials-and-false-refund-promises/ — VERIFIED (snippet) |
| Service Seeking (platform) | A$600,000 penalties for false/misleading representations about reviews on the platform; injunctions, corrective notices, compliance program | https://www.accc.gov.au/media-release/service-seeking-to-pay-penalty-for-misleading-online-customer-reviews — VERIFIED (snippet) |
| True Value Solar (2015) | Discontinued A$199 free-service incentive for ProductReview.com.au reviews after ACCC investigation | https://accc.gov.au/media-release/true-value-solar-discontinues-incentives-for-positive-online-reviews — VERIFIED (snippet) |
| Meriton (TripAdvisor review suppression, 2017–18) | **UNVERIFIED** in this session (search budget exhausted before query ran). Analyst recollection: Federal Court found Meriton's masking of guest emails to TripAdvisor misleading; penalty ~A$3m. Confirm at accc.gov.au before citing. |

Search returned **no 2024–2026 ACCC fake-review court outcomes**; treat the above as historical and check ACCC media releases for current matters — **VERIFIED (absence in search results only)**.

### 1.3 Penalty environment (2026)

- Parliament passed legislation in **March 2026 doubling maximum ACL/CCA civil and criminal penalties from A$50m to A$100m per contravention**, applying to conduct on/after 28 March 2026 (snippet-only, https://www.klgates.com/Significant-Changes-for-Australian-Competition-and-Consumer-Laws-Doubling-of-Penalties-to-AU100-Million-Per-Offence-and-Unfair-Trading-Practices-to-Be-Prohibited-4-13-2026 ; https://mk.com.au/accc-penalties-double-to-100-million/) — **VERIFIED (snippet)**. Exact bill name/dates differ slightly between sources; check the Act.
- **Unfair trading practices prohibition** (Competition and Consumer Amendment (Unfair Trading Practices) Bill 2026) has passed and **commences 1 July 2027**; includes a general prohibition plus subscription-trap and drip-pricing rules (snippet-only, https://mccullough.com.au/2026/07/03/unfair-trading-practices-laws-australia-2027/ ; https://hwlebsworth.com.au/parliament-passes-unfair-trading-practices-reforms-preparing-for-the-new-regime) — **VERIFIED (snippet)**. Relevance: Reputrail's own subscription terms (auto-renewal, cancellation) must be clean by mid-2027; ACCC 2026 priorities include "unfair practices in digital markets" (snippet-only, https://jws.com.au/what-we-think/accc-priorities-for-2026-unfair-practices-in-digital-markets-consumer-safety-and-the-cost-of-living/).

### 1.4 Consumer guarantees — Reputrail as a service provider

- **UNVERIFIED** in this session (query did not run). Analyst recollection for checking: ACL consumer guarantees for services (due care and skill; fit for a disclosed purpose; reasonable time) apply to services acquired for ≤A$100,000 (threshold raised from A$40,000 on 1 July 2021), including by businesses. If confirmed, Reputrail's client agreement **cannot exclude** these guarantees; it can only limit remedies to re-supply or cost of re-supply where the service is not of a kind ordinarily acquired for personal/household use. **LAWYER**.
- **Unfair contract terms (UCT)** regime for small-business standard-form contracts — **UNVERIFIED** this session; analyst recollection: UCTs became subject to penalties from 9 Nov 2023. Reputrail's subscription agreement will be a standard-form small-business contract → avoid one-sided termination, automatic renewal without notice, unilateral variation clauses. **LAWYER**.

### 1.5 How this binds Reputrail's product design

| Practice | ACL position | Reputrail rule (RECOMMENDATION) |
|---|---|---|
| Writing or "seeding" reviews for clients | Unlawful | Never. No employee/contractor/friend/AI-generated reviews. |
| Review gating (ask only happy customers to post publicly) | Misleading by omission; also breaches Google policy (s.4) | Prohibited. Every customer gets the same ask; internal "how did we go?" feedback step must still show the public review link to everyone. |
| Incentives for reviews | Permitted only if offered regardless of sentiment and disclosed | Default: no incentives. If a client insists, same offer to every customer, disclosure on the review, and check platform rules (Google prohibits incentives outright — s.4). |
| Asking customers to remove/alter negative reviews for a benefit | Google prohibits; ACCC treats as misleading | Prohibited. Customer recovery is allowed; "we fixed it, would you reconsider your review?" without inducement is a grey area → script carefully, **LAWYER**. |
| Suppressing/filtering negative reviews on client-owned surfaces (website widgets) | Misleading if presented as representative | Widgets show all or clearly disclose selection criteria. |
| Drafting responses that make claims about the customer | Defamation/misleading risk | Factual, non-accusatory templates; owner approval mandatory. |

---

## 2. Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs)

### 2.1 Does the Privacy Act bind Reputrail?

- **Small business exemption:** an organisation with annual turnover of **A$3,000,000 or less** is generally a "small business operator" outside the Act unless an exception applies (OAIC APP Guidelines Chapter B, snippet-only, https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-b-key-concepts) — **VERIFIED (snippet)**.
- **Exceptions that could capture Reputrail** (snippet-only, https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/opting-in-to-the-privacy-act ; https://sprintlaw.com.au/?p=7521 ; https://tpb.gov.au/privacy-and-securing-personal-information): health service providers; businesses that **"trade in personal information for benefit, service or advantage"** (buy/sell/disclose personal information for consideration); contracted service providers under a Commonwealth contract; related bodies of covered entities; businesses that opt in — **VERIFIED (snippet)**.
  - **HYPOTHESIS to test with a lawyer:** Reputrail receives customer names/phones/emails from clients *as a processor* to send messages on the client's behalf. That is generally **not** "trading" in personal information (no consideration flows for the information itself) — but the carve-out is fact-sensitive. **LAWYER**.
- **Statutory tort of serious invasion of privacy** commenced **10 June 2025** (Privacy Act Schedule 2) and applies to anyone — "businesses not otherwise bound by the Privacy Act may still be liable" (snippet-only, https://www.minterellison.com/articles/privacy-and-other-legislation-amendment-act-2024-now-in-effect ; https://tglaw.com.au/insights/six-month-countdown-to-new-statutory-tort-of-serious-invasions-of-privacy) — **VERIFIED (snippet)**. So the exemption does **not** shield Reputrail from this tort (misuse of information; intrusion on seclusion; must be "serious", intentional/reckless, reasonable expectation of privacy).
- **Is the exemption being removed?** As at 13 Oct 2026 the A$3m exemption "is not being abolished on 10 December under the legislation currently in force"; removal was recommended in the Privacy Act Review and is slated for a **second tranche** that has not been introduced (snippet-only, https://solway.au/blog/privacy-act-december-2026-small-business-exemption/ ; https://www.epicit.com.au/?p=15345). Some accountant/IT blogs wrongly claim it is already gone — disregard. Separately, from **1 July 2026 small businesses that become AML/CTF reporting entities lose the exemption** (snippet-only, https://www.minterellison.com/articles/aml-ctf-reforms-dont-forget-the-privacy-policy ; https://allitservices.com.au/100000-small-businesses-about-to-fall-under-the-privacy-act/) — not relevant to Reputrail unless it becomes an AML reporting entity — **VERIFIED (snippet)**.

**ASSUMPTION / RECOMMENDATION:** Design Reputrail **as if the APPs apply** (opt-in-equivalent behaviour): (a) clients (trade businesses) will increasingly be APP entities or will ask for APP-grade handling; (b) tranche-two removal is government policy; (c) the statutory tort applies now; (d) marketing to clients is easier with a real privacy policy. Consider **formally opting in** under s 6EA once revenue justifies the compliance load (OAIC "Opting in to the Privacy Act", snippet-only, link above). **LAWYER** on timing.

### 2.2 Privacy and Other Legislation Amendment Act 2024 — what changed

(Snippet-only; sources: https://www.minterellison.com/articles/privacy-and-other-legislation-amendment-act-2024-now-in-effect ; https://ccp.com.au/news/privacy-act-reform-2024-notifiable-breach-teeth/ ; https://leglobal.law/2025/05/22/australia-a-new-statutory-tort-for-privacy-invasion-and-disclosure-of-automated-decision-making-incoming-privacy-law-reforms-in-australia/) — **VERIFIED (snippet)** unless noted.
- Royal Assent 10 Dec 2024; most provisions commenced 11 Dec 2024.
- APP 11 "reasonable steps" to secure personal information now expressly include **"technical and organisational measures"**.
- Statutory tort (above) from 10 June 2025.
- **Automated decision-making transparency**: privacy policies must disclose use of personal information in computer programs that make, or substantially assist, decisions significantly affecting individuals — **24-month lead time, i.e. ~Dec 2026** (snippet-only, L&E Global link). Relevance: Reputrail's AI sentiment classification that triggers escalation is arguably "substantially assisting" a decision about a customer; low stakes, but **disclose it** in the privacy policy anyway — **RECOMMENDATION**.
- New **tiered civil penalties** (low/mid tier, infringement notices for OAIC) — **UNVERIFIED** detail this session (query did not run); confirm amounts at oaic.gov.au.
- OAIC "Privacy Act gets its teeth" commentary on NDB enforcement — snippet-only (ccp.com.au link).

### 2.3 Notifiable Data Breaches (NDB) scheme

- Applies to APP entities (so to Reputrail only if covered/opted in — but clients who are APP entities will push obligations down by contract). An **eligible data breach** = unauthorised access/disclosure/loss of personal information **likely to result in serious harm** to any individual, where remedial action cannot prevent that harm (snippet-only, https://www.oaic.gov.au/privacy/notifiable-data-breaches/preventing-preparing-for-and-responding-to-data-breaches/data-breach-preparation-and-response/part-4-notifiable-data-breach-ndb-scheme ; https://lawpath.com.au/blog/notifiable-data-breach-scheme) — **VERIFIED (snippet)**.
- 30-day "reasonable and expeditious" assessment window — **UNVERIFIED** this session (not in retrieved snippets; analyst recollection of s 26WH). Confirm.
- **RECOMMENDATION:** adopt an NDB-style incident plan regardless of coverage (assess within 30 days; notify affected clients within 48 hours under contract; OAIC form if covered). Anthropic's DPA commits Anthropic to notify a Security Breach "without undue delay, but in any event within 48 hours" (full page read, https://www.anthropic.com/legal/data-processing-addendum, effective 24 Feb 2025) — **VERIFIED**.

### 2.4 Handling the client's customers' names, phones and emails

Data flow: Client (trade business) → Reputrail (job completed list: name, mobile, email, job type, date) → SMS/email provider → customer. Reputrail is functionally a **processor/agent** for the client, but Australian law has no formal controller/processor split — each entity that "holds" the information is responsible for it. **RECOMMENDATIONS** (see also s.9d Data Handling Policy):
1. Collect the **minimum**: first name, one contact channel, job date, job category. No addresses, no invoice amounts, no notes.
2. **Purpose limitation** in the client agreement: use only for review requests, recovery follow-up and reporting to that client. Never for Reputrail marketing, never cross-client.
3. **Retention**: delete raw contact data within a short fixed window after the request sequence ends (proposal: 90 days), keep only aggregate stats and an opt-out suppression hash.
4. **Cross-border disclosure (APP 8)**: Claude API inference may occur outside Australia; Anthropic's DPA does not state processing location and the subprocessor list was unreachable (https://trust.anthropic.com/subprocessors blocked). Anthropic's `inference_geo: "us"` can pin inference to US infrastructure at 1.1× price; **no Australian region is offered** — workspace geo "us" is "the only available workspace geo" (full page read, https://platform.claude.com/docs/en/manage-claude/data-residency) — **VERIFIED**. APP 8 "reasonable steps"/accountability analysis **UNVERIFIED** this session (query did not run). Mitigation: **do not send personal identifiers to the LLM** — strip names/phones/emails before classification/drafting (s.6, s.9d). **LAWYER** for the privacy policy wording on overseas disclosure.

---

## 3. Spam Act 2003 (Cth) — review-request SMS and email

### 3.1 Core rules (ACMA "Avoid sending spam", https://www.acma.gov.au/avoid-sending-spam — snippet-only)

A **commercial electronic message** (CEM) may only be sent with (1) **consent**, (2) accurate **sender identification**, and (3) a **functional unsubscribe**. Key points — **VERIFIED (snippet)** unless noted:
- **Burden of proof is on the sender**: "Under the Spam Act, it's up to you to prove that you have a person's consent." Keep records of "who gave the consent, when and how".
- **Express vs inferred**: "Inferred consent is not as reliable as getting someone's express consent"; inferred consent exists only from an existing business relationship **and** where the message is directly related to it (ACMA bank example: can promote another savings account; cannot cross-sell insurance). Commentary: inferred consent unlikely to cover "add-ons" or "cross-sells" (snippet-only, https://www.corrs.com.au/insights/acma-spam-act-enforcement-and-the-implications-for-business ; https://privacymatters.dlapiper.com/2024/08/australias-e-marketing-expectations-when-customers-dont-give-a-spam/). ACMA's 2024 Statement of Expectations says rely on inferred consent only where there is a "clear, current or ongoing relationship" and a **one-off purchase should not be treated as grounds for inferring consent** (snippet-only, https://acma.gov.au/sites/default/files/2024-06/ACMA%20-%20Statement%20of%20Expectations%20-%20Use%20of%20consent%20in%20telemarketing%20~%20marketing%20FINAL_0.DOCX ; https://www.claytonutz.com/insights/2024/july/spam-and-telemarketing-the-acmas-expectations-and-priorities-for-2024-25).
- **A message asking for consent is itself a marketing message** (secondary sources attribute this to ACMA: https://blog.mobilemessage.com.au/2026/02/Is%20SMS%20Marketing%20Legal%20in%20Australia.html ; https://cloutly.com/blog/review-request-sms-rules/) — **VERIFIED (snippet, secondary)**; check against ACMA text.
- **Unsubscribe**: must be functional, free (no fee), clear, actioned within **5 working days**, and remain working for **at least 30 days** after sending (secondary sources; snippet-only, https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2 ; https://www.claytonutz.com/insights/2025/april/acma-enforcement-action-do-your-marketing-communications-comply-with-the-spam-acts-unsubscribe-rules). Telstra was fined for an unsubscribe that required login/extra personal details (s.3.3).
- **Alphanumeric sender IDs** generally cannot receive replies, so "reply STOP" does not work; another unsubscribe method is needed (snippet-only, mobilemessage.com.au link) — **VERIFIED (snippet, secondary)**.
- **Scope**: email, SMS, MMS, instant messaging. **Do Not Call Register does not cover SMS**; it covers voice calls and faxes (snippet-only, mobilemessage.com.au ; https://www.donotcall.gov.au/industry/industry-overview/using-the-register) — **VERIFIED (snippet)**. Numbers used mainly for business cannot be listed on the Register (snippet-only, Statement of Expectations). Relevance: the **owner's recovery phone call** to an unhappy customer is a call to an existing customer about their own job — generally not telemarketing — but if the call pitches new work it can be, and the customer may be on the DNCR. **RECOMMENDATION:** recovery calls are service calls only; no upsell script.

### 3.2 Is a review request a "commercial electronic message"?

- The definition is purpose-based and broad: a message that "offers, advertises or promotes goods or services, or advertises or promotes a provider of goods or services". ACMA has found a message "informing customers about certain features of their service was a commercial electronic message as it promoted that service" (snippet-only, https://www.claytonutz.com/insights/2023/november/the-acma-cranks-up-enforcement-do-your-factual-customer-emails-pass-the-spam-act-test/ ; Ticketek A$515,040 infringement notice after arguing its emails were "factual") — **VERIFIED (snippet)**.
- The **"designated commercial electronic message"** exemption (Schedule 1 cl 2) covers messages of "no more than factual information" (plus directly related comment and sender details); ACMA has found messages outside it when they "consisted of more than mere factual information and were commercial in nature" (snippet-only, https://hwlebsworth.com.au/?p=29709 ; ACMA CBA investigation report https://acma.gov.au/sites/default/files/2024-10/Commonwealth%20Bank%20of%20Australia%20-%20Spam%20Investigation%20-%20Final%20Investigation%20Report%20-%2014%20August%202024%20%281%29_Redacted.pdf) — **VERIFIED (snippet)**.
- **No ACMA ruling on review-request SMS was found** — **VERIFIED (absence in results)**.
- **ASSUMPTION (conservative):** treat every review request as a CEM. A request that links to the business's Google profile "advertises or promotes a provider of goods or services" at least arguably. **LAWYER** to confirm whether a plain, factual "thanks for choosing us, you can leave feedback here" could be a designated CEM — do not rely on it.

### 3.3 Sending on behalf of a client — who is liable?

- The Act applies to anyone who "sends, or causes to be sent" a CEM; **compliance cannot be delegated** — "businesses will remain liable for all CEMs sent to customers, including by third party providers" (snippet-only, https://www.nortonrosefulbright.com/fr-ca/centre-du-savoir/publications/5615dd36/dont-filter-this-out-are-you-spam-act-compliant ; https://sprintlaw.com.au/articles/spam-act-compliance-your-australian-business-guide-to-avoiding-penalties/) — **VERIFIED (snippet)**.
- ACMA has acted against **agencies and aggregators**, not just brands: Upside.Digital "sent, and caused to be sent" emails lacking the **name and contact details of the clients who authorised** them; Coca-Cola matter included enforceable undertakings from a media agency and a content aggregator; ValueAd Marketing formal warning for 24,738 SMS (snippet-only, ACMA formal warnings https://www.acma.gov.au/sites/default/files/2019-10/Value%20Ad%20Marketing%20Formal%20Warning%2015%20Sept%202017%20docx.docx ; https://www.brightlaw.com.au/spam-act-action-by-acma-vodafone-and-3-others/) — **VERIFIED (snippet)**.
- **Sender identification** must identify the **authorising party** — "typically this is the business whose product or service is being advertised" (snippet-only, ADMA/Mondaq) — i.e. the **trade business**, not Reputrail. Both can appear.

### 3.4 Penalties and recent enforcement (snippet-only — **VERIFIED (snippet)**)

| Entity | Year | Outcome | Source |
|---|---|---|---|
| Telstra | Mar 2025 | A$626,000 infringement notice — SMS unsubscribe required login/extra details; "maximum the ACMA could apply by infringement notice" | https://www.acma.gov.au/articles/2025-03/telstra-penalised-spam-breaches |
| Betfair | Jun 2025 | A$871,660 infringement notice — no functional unsubscribe | https://www.acma.gov.au/sites/default/files/2025-07/Betfair%20-%20Spam%20Infringement%20Notice_Redacted.pdf |
| Tabcorp | Sept 2025 report | Reported A$4,003,270 (one source; conflicts with others — verify) | https://www.acma.gov.au/sites/default/files/2026-07/Tabcorp%20Holdings%20Limited%20-%20Investigation%20Report%20-%20Spam%20Act%202003%20-%2011%20Sept%202025_Redacted.pdf |
| Commonwealth Bank | 2024 | A$7,502,610 infringement notice + enforceable undertaking (consent/unsubscribe) | ACMA CBA report (link in 3.2) |
| Latitude Finance | Jan 2026 notice | Penalty built from per-day blocks of A$165,000 (messages Jan–Feb 2025) | https://www.acma.gov.au/sites/default/files/2026-04/Latitude%20-%20Spam%20Infringement%20Notice%20-Redacted.pdf |
| Ticketek | 2023 | A$515,040 for ~98,000 messages | https://www.hsfkramer.com/insights/2023-10/unsubscribe-means-unsubscribe-ticketek-pays-over-500000-for-breaching-spam-act |
| Oneflare (trade-lead platform) | 2019 | A$75,600 | https://itwire.com/business-it-news/security/oneflare-cops-$75,000-fine-over-spam-rule-breaches |
| Service Seeking (trade-lead platform) | 2016 | Spam Act fine (amount not in snippet) | https://technologydecisions.com.au/content/it-management/news/service-seeking-fined-for-spam-act-breach-1464535104 |

Statutory maximum court penalties (penalty-unit based, per day) — **UNVERIFIED** this session (query did not run); confirm current penalty-unit value and multipliers at acma.gov.au / legislation.gov.au.

**Observation:** two of the enforcement targets (Oneflare, Service Seeking) are exactly Reputrail's adjacent market — ACMA and ACCC both watch trade-lead/review platforms.

### 3.5 Reputrail's Spam Act operating model (RECOMMENDATION)

1. **Consent captured by the client at the job**, in writing, before any message is sent: a tick-box or signature line on the quote/invoice/job-completion form — "You agree that [Trade Business] (and its service provider Reputrail) may contact you by SMS/email to ask for feedback and a review about this job." Record **who/when/how** per contact and store it with the send log (ACMA record-keeping expectation).
2. Where a client cannot evidence express consent, **do not infer it from a one-off job** (ACMA Statement of Expectations). Offer the client a consent-capture template instead of relying on inferred consent. **LAWYER** to review the consent wording.
3. Each message: identifies the **trade business** by name and contact details (ABN optional), may add "sent via Reputrail", and contains a **free, working unsubscribe**: for alphanumeric sender IDs use a link-based opt-out plus a monitored reply path; for numeric senders "Reply STOP". Honour within 5 working days (target: immediate, automated) and keep working ≥30 days.
4. One message per channel per job, maximum one reminder; a **global suppression list** keyed by hashed phone/email across all clients.
5. **No review-request before consent**; no "can we text you?" consent-request messages (itself a CEM).
6. Log every send (timestamp, recipient hash, consent reference, content version, unsubscribe status) for **at least 2 years**; this is Reputrail's evidence if ACMA asks.

---

## 4. Google — Business Profile API, review policies, roles

### 4.1 Review content policy (Maps user-generated content policy)

Sources (snippet-only, host blocked): https://support.google.com/contributionpolicy/answer/7400114 ; https://support.google.com/local-guides/answer/2622994 ; https://support.google.com/business/answer/3474122 — **VERIFIED (snippet)**:
- Merchants must not **"Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers"** (this is the "review gating" prohibition, in Google's own words).
- "Offering incentives, like free or discounted goods or services, in exchange for customers to post reviews, change reviews, or remove negative reviews is considered fake engagement and is strictly prohibited."
- Conflict-of-interest reviews (owner, employees, competitors) prohibited.
- **April 2026 update** (reported by ppc.land, snippet-only, https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/): new restrictions on how merchants direct staff to solicit reviews, including bans on requiring staff to solicit a set number of reviews or reviews with specific content — **VERIFIED (snippet, secondary)**; confirm against the live policy.
- Google Maps now asks reviewers whether a business paid for the review (ppc.land, snippet-only) — enforcement signal.

**Implication:** Reputrail's feedback flow must present the public review link to **all** customers regardless of internal rating; any "private feedback first" step must not be the only path for unhappy customers. Enforcement is reported to be increasing in 2026 (secondary).

### 4.2 Review removal / flagging

(Snippet-only; mostly vendor/forum sources — treat as rough.) Flagging requires a specific **policy violation** reason (off-topic, conflict of interest, harassment, spam, etc.); "not helpful"/"unfair" is not grounds. Initial review typically 3–14 days (longer waits common; forum reports of >27 days); **one-time appeal** via the Reviews Management Tool ("Appeal eligible reviews"); Google has said it cannot give a timeframe on backlogged appeals (https://seroundtable.com/google-business-profiles-review-appeals-delays-42331.html). Vendor-reported removal rates ~38–41% (self-reported, unverified) — https://reviewshake.com/blog/google-review-removal-a-step-by-step-guide-for-businesses ; https://get.nicejob.com/resources/how-to-remove-a-google-review-complete-guide-for-business-owners-and-reviewers — **VERIFIED (snippet, secondary)**.
**RECOMMENDATION:** never promise removal; sell "flag + appeal + public response", report outcomes honestly (ACL misleading-conduct risk in over-promising "we get bad reviews removed").

### 4.3 Who can respond, and how an agency gets access without passwords

Google "Manage your Business Profile owners & managers" (snippet-only, https://support.google.com/business/answer/3403100) — **VERIFIED (snippet)**:
- Roles: **Owner** (incl. Primary owner) and **Manager**. Both can **respond to reviews**; only owners can add/remove users and change roles.
- Add a user: Business Profile → More → **Business Profile settings → People and access → Add → enter email → choose Owner or Manager → Invite**.
- "Each user needs their own Google Account" — **no password sharing**.
- If a manager is removed, "their replies to reviews, posts, comments, and other actions stay on the Business Profile".
- Agencies managing many clients can use an **organisation/agency account and location groups** — **UNVERIFIED** this session (query did not run); check https://support.google.com/business/answer/6335800.

### 4.4 Google Business Profile APIs

(Snippet-only, https://developers.google.com/my-business/content/faq ; https://developers.google.com/my-business/content/overview ; https://developers.google.com/my-business/content/limits) — **VERIFIED (snippet)**:
- APIs "aren't open to the public"; you must **request access** via the API contact form; requires a valid Google account, "a legitimate business purpose", a Google Cloud project and a business website URL. Requests "are reviewed within 14 days" (official FAQ).
- Access is granted at the **Google Cloud project** level; you can only query profiles your account has been granted access to (i.e. the client must add Reputrail's Google account as Manager — ties to 4.3).
- Default quota ~**300 QPM** for the main APIs; quota increases via the same form based on past usage. Third-party reports that new projects start at **zero quota until approved** (https://slashpost.ai/blogs/google-business-profile/google-business-profile-api-documentation-2026) — secondary.
- Must comply with **Business Profile policies, API policies and terms**; fake/test listings prohibited in production. The **prohibited-uses list** on the API policies page could not be read (host blocked) — **UNVERIFIED**; analyst recollection: policies forbid review gating via API, bulk data scraping/resale, and require deleting data when access is revoked. Confirm at https://developers.google.com/my-business/content/policies.
- Sources disagree on the number of GBP APIs (7–9); check the console.
**RECOMMENDATION:** apply for API access immediately (14-day lead); until approved, operate via Manager access in the GBP UI plus manual/notification-based monitoring; design for 300 QPM.

---

## 5. Other platforms

### 5.1 hipages
- hipages' own review guidelines/terms **could not be retrieved** (site unreachable; searches surfaced only third-party commentary) — **UNVERIFIED**.
- Public complaints allege hipages does not publish negative reviews (ProductReview/Trustpilot user claims; anecdotal, https://www.productreview.com.au/listings/home-improvement-pages?page=5). hipages states accounts can be closed for breaching its Terms of Service and that paid subscriptions do not protect against suspension for repeated negative feedback (snippet-only, hipages reply on Trustpilot, https://au.trustpilot.com/review/hipages.com.au) — **VERIFIED (snippet)**.
- **ASSUMPTION:** hipages reviews are tied to jobs won through hipages and are solicited by hipages itself; Reputrail should monitor and help respond, not solicit. Confirm with hipages' tradie terms. **Note** hipages contract terms (6-month initial, auto-renewing 12 months per kingtradie.com snippet) — relevant to client advice only.

### 5.2 ProductReview.com.au
- Incentivised reviews are **permitted with disclosure** and only if offered equally regardless of sentiment; listings have an "incentivised" filter; the moderation team "reports filtered or unequal incentivised campaigns to the ACCC, with all associated reviews immediately removed" (snippet-only, https://support.productreview.com.au/hc/en-us/articles/333757051615-What-is-your-policy-on-incentivised-reviews ; https://support.productreview.com.au/hc/en-us/articles/218825457-Incentivised-Reviews ; https://www.productreview.com.au/i/posting-guidelines) — **VERIFIED (snippet)**.
- Guidelines' stated aim: "publish genuine consumer reviews"; applied as principles, not rigid rules.

### 5.3 Facebook / Meta Recommendations
- Meta **Community Feedback Policy** (launched June 2022) prohibits "manipulation of reviews, incentivization, irrelevance, graphic content and spam"; incentivised reviews not allowed "unless it's part of a bigger brand deal" (snippet-only, https://www.socialmediatoday.com/news/meta-implements-new-policies-to-protect-consumers-and-businesses-from-fraud/625740 ; https://techcrunch.com/2022/06/21/meta-cracking-down-fake-irrelevant-reviews-facebook) — **VERIFIED (snippet)**. Meta does not pre-screen negative feedback; users report suspicious reviews.
- Pages can turn Recommendations off, which removes ratings and reviews entirely (Help Centre via third-party quote) — **VERIFIED (snippet, secondary)**.
- Current policy text at transparency.meta.com could not be read — **UNVERIFIED** for 2026 wording.

---

## 6. AI processing — Anthropic (Claude API) data terms and Australian AI policy

### 6.1 Anthropic Commercial Terms (full page read, https://www.anthropic.com/legal/commercial-terms, effective 17 June 2025) — **VERIFIED**
- Inputs and Outputs are "Customer Content"; Customer owns Outputs; "Anthropic disclaims any rights it receives to the Customer Content".
- **"Anthropic may not train models on Customer Content from Services."** (Section B)
- Data processed per the **Data Processing Addendum**; Customer Content is Customer's Confidential Information; destroyed on request subject to legal/backup exceptions.
- Contracting entity for Australia: Anthropic, PBC (US) (Anthropic Ireland only for EEA/Switzerland/UK).

### 6.2 Anthropic DPA (full page read, https://www.anthropic.com/legal/data-processing-addendum, effective 24 Feb 2025) — **VERIFIED**
- Does **not** state processing location; relies on SCCs for international transfers; subprocessor list at anthropic.com/subprocessors (redirects to trust.anthropic.com — **blocked**, UNVERIFIED).
- Deletion of all Customer Data within 30 days of termination (exceptions: law, disputes, combating harmful use).
- Security: AES-256 at rest, TLS 1.2+ in transit, MFA/SSO, least privilege, annual pen test and independent audit; **breach notice within 48 hours**.

### 6.3 Retention and residency (platform.claude.com, full page reads) — **VERIFIED**
- "Retained data is never used for model training without your express permission." "Conversation content (your prompts and Claude's outputs) is not retained by default; the exception is Covered Models, which require 30-day retention." Covered Models = Claude Fable 5.1 / Mythos 5.1 / Fable 5 / Mythos 5 (https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
- **Zero data retention (ZDR)** available by arrangement via Anthropic sales, enabled per organisation; even under ZDR, content flagged by trust-and-safety systems may be retained **up to 2 years**.
- Batch API is **not ZDR-eligible** ("29-day retention; async storage required") (https://platform.claude.com/docs/en/build-with-claude/batch-processing).
- `inference_geo: "us"` pins inference to US at **1.1×** price; "global" is default; **only "us" workspace geo exists** — no Australian residency (https://platform.claude.com/docs/en/manage-claude/data-residency).
- Third-party summaries of the consumer-facing privacy centre differ on 7 vs 30-day default API log retention (snippet-only, https://www.developersdigest.tech/models/data-retention/anthropic) — rely on the platform docs above, not blogs.

### 6.4 Australia's AI policy status (snippet-only) — **VERIFIED (snippet)**
- **Voluntary AI Safety Standard** (Sept 2024): 10 voluntary guardrails for all organisations across the AI lifecycle; creates no legal obligation (https://www.minterellison.com/articles/responsible-use-of-ai-new-australian-guardrails-released).
- Proposed **mandatory guardrails for high-risk AI** (Sept 2024 proposals paper) were **paused** by the **National AI Plan (Dec 2025)**, which favours technology-neutral regulation; as of mid-2026 no mandatory equivalent has been legislated (https://www.govinfosecurity.com/blogs/australia-abandons-proposed-mandatory-ai-rules-in-new-plan-p-3986 ; https://www.adnews.com.au/news/australia-pauses-ai-guardrails-and-goes-with-a-national-plan ; https://www.brightlaw.com.au/ai-regulation-in-australia/). Primary DISR page unreachable — **UNVERIFIED** for Nov 2026 status.
- **RECOMMENDATION:** adopt the voluntary guardrails that are cheap and relevant: human-in-the-loop (owner approves every public reply), transparency (disclose AI assistance to clients; consider "drafted with AI assistance" internal flag), testing/monitoring of classifier accuracy, records of AI use, and the ACL still applies to any AI-generated statement.

### 6.5 Reputrail's AI data rules (RECOMMENDATION)
1. **De-identify before inference**: send review text and job category only; strip reviewer names, phone numbers, emails, addresses, invoice numbers with a deterministic redaction step; re-insert first names client-side if needed for a reply draft.
2. Use the **Messages API, not Batch**, where ZDR matters; request ZDR once volume justifies it; avoid Covered Models for production classification (30-day retention required and ZDR-incompatible).
3. Record the model, prompt version and timestamp for each generated draft (auditability for ACL/defamation disputes).
4. Human approval gate for every public response; no auto-posting.
5. Disclose in the privacy policy that automated tools assist in classifying feedback and drafting responses (APP 1 automated-decision disclosure due ~Dec 2026).

---

## 7. Business setup (Australia)

| Item | Finding | Label / source |
|---|---|---|
| ABN | Free to register via ABR; required for invoicing and GST | Snippet-only, https://ausbusinessregister.com.au/business-registration-costs-australia-2026/ — VERIFIED (snippet) |
| Business name (ASIC) | **A$47 for 1 year / A$108 for 3 years from 1 July 2026** (was A$45/A$104 in 2025–26); fee is per name; same for renewals | Snippet-only, https://ausbusinessregister.com.au/asic-fees-australia/ ; https://help.nowinfinity.com.au/hc/en-au/articles/16454948779919-ASIC-Fee-Indexation-effective-1-July-2026 — VERIFIED (snippet); asic.gov.au blocked |
| Sole trader vs company | Sole trader: simplest, personal unlimited liability, taxed at personal rates; company: separate legal entity, limited liability, ASIC registration + annual review fee (A$342 annual review fee referenced for 2026) | Snippet-only, https://ausbusinessregister.com.au/asic-annual-review-guide-2026/ — VERIFIED (snippet) for the A$342 figure; company registration fee 2026-27 UNVERIFIED (query did not run). **RECOMMENDATION:** start as sole trader with PI/PL insurance; move to Pty Ltd before taking on clients whose contracts carry indemnities, or at ~A$75k revenue — **ASSUMPTION**; get accountant advice. |
| Trade mark (IP Australia) | Standard application via picklist ~**A$250 per class**; non-picklist ~A$330–400 per class; **TM Headstart** ~A$200 per class + ~A$130 Part 2 conversion (figures from third parties; conflicting; official calculator unreachable) | Snippet-only, https://sprintlaw.com.au/articles/ip-australia-trade-mark-fees-explained/ ; https://legalvision.com.au/cost-of-trade-mark-registration ; https://bonamark.com/how-to-register-a-trademark-in-australia.md — VERIFIED (snippet) but **check IP Australia fee calculator**. Process: search Australian Trade Mark Search for "Reputrail" and similar in classes 35 (advertising/business services) and 42 (SaaS) → Headstart pre-assessment (~5 business days, analyst recollection, UNVERIFIED) → file → examination → acceptance → 2-month opposition → registration (10 years). |
| PI / PL insurance | Professional indemnity for consultants ~A$40–100/month (sole trader, low end); public liability ~A$300–900/yr for very-low-risk sole traders; combined **ESTIMATE A$900–2,400/yr** | Snippet-only, https://www.upcover.com/blog/professional-indemnity-insurance-cost ; https://www.upcover.com/blog/public-liability-insurance-cost-australia — broker estimates, VERIFIED (snippet) as estimates only. PI should cover **media/defamation liability** given public review responses — confirm the wording includes "media liability"/"defamation" — RECOMMENDATION. |
| GST | Register when GST turnover (current or projected 12 months) reaches **A$75,000**; within **21 days**; optional below | Snippet-only, https://www.ato.gov.au/businesses-and-organisations/GST-excise-and-indirect-taxes/GST/registering-for-GST — VERIFIED (snippet) |

---

## 8. Risk register

Likelihood (L) / Impact (I): Low / Med / High. Owner = founder unless noted.

| # | Risk | L | I | Mitigation | Label |
|---|---|---|---|---|---|
| R1 | Spam Act breach — review request sent without provable consent (client says "they're my customer") | **High** | High (ACMA infringement notices A$75k–A$7.5m precedent; agencies named) | Consent captured at job in writing; no inferred consent from one-off jobs; send log with consent reference; refuse to send without consent record | VERIFIED basis (s.3) |
| R2 | Unsubscribe fails (alphanumeric sender, broken link, >5 days) | Med | High (Telstra A$626k) | Link + reply path; automated suppression; monthly test send | VERIFIED basis |
| R3 | Review gating / selective solicitation built into product (private feedback first) | Med | High (Google profile penalties; ACL misleading) | Public link shown to all; gating-free flow; documented policy | VERIFIED basis (s.1, s.4) |
| R4 | Client offers incentives for reviews using Reputrail's tooling | Med | High (Google: fake engagement; ACCC) | Contract clause banning incentives; template copy locked; terminate on breach | VERIFIED basis |
| R5 | Fake/AI-written reviews requested by client | Low–Med | Very high (ACL; up to A$100m statutory max) | Absolute refusal in contract; staff training; audit of unusual review spikes | VERIFIED basis |
| R6 | Defamatory or misleading public response drafted by AI and posted | Med | High (defamation; ACL) | Owner approval gate; factual templates; no claims about the reviewer; PI with media liability | UNVERIFIED (defamation research not run); RECOMMENDATION |
| R7 | Data breach of customer contact lists | Med | Med–High (statutory tort; client contracts; NDB) | Minimal data; 90-day deletion; encryption; MFA; vendor DPAs; incident plan | VERIFIED basis (s.2) |
| R8 | Personal information sent to overseas LLM without disclosure | Med | Med (APP 8 if covered; client trust) | De-identify before inference; disclose in privacy policy; `inference_geo` if required | VERIFIED (Anthropic docs) |
| R9 | Privacy Act small-business exemption removed (tranche 2) with short lead time | Med (timing unknown) | Med | Build APP-compliant from day one; opt in voluntarily when sensible | VERIFIED (snippet) |
| R10 | Google API access refused or quota insufficient | Med | Med (manual ops cost) | Apply early; UI Manager access fallback; cache; 300 QPM design | VERIFIED (snippet) |
| R11 | Loss of client GBP access / client shares passwords | Med | Med | Manager invitations only; written policy against password sharing | VERIFIED (snippet) |
| R12 | Over-promising review removal | Med | High (ACL misleading; refund disputes) | Never guarantee; report flag/appeal outcomes; plain-English marketing | RECOMMENDATION |
| R13 | Platform ToS breach (hipages/Facebook) via solicitation | Low–Med | Med | Monitor and respond only on hipages/Facebook unless terms confirmed | UNVERIFIED (hipages terms) |
| R14 | Unfair contract terms in Reputrail subscription; unfair trading rules from 1 Jul 2027 | Med | Med | Lawyer-drafted agreement; no auto-renew without notice; easy cancel | VERIFIED (snippet) |
| R15 | Sole-trader unlimited personal liability | Med | High | PI/PL insurance; incorporate before scale | ESTIMATE |
| R16 | Trade mark conflict on "Reputrail" | Low–Med | Med | Search + Headstart before spending on brand | RECOMMENDATION |

---

## 9. Matters requiring professional legal advice (LAWYER)

1. Whether a review-request SMS/email is a CEM or can be structured as a "designated commercial electronic message"; approved message templates; consent wording for the client's job form; whether Reputrail or the client is the "authorised sender" on each message.
2. Whether Reputrail's handling of client customer data is "trading in personal information" (loses the small-business exemption); whether and when to opt in to the Privacy Act; APP 8 overseas disclosure wording for US-based LLM inference.
3. Privacy policy and collection notices (including automated-decision disclosure) and the data processing clauses to offer APP-entity clients.
4. Client service agreement: consumer guarantees (cannot be excluded), UCT compliance, liability cap/indemnity for client-caused breaches (e.g. client supplied non-consented contacts), IP in drafted responses, authority to publish.
5. Defamation exposure for published responses and "customer recovery" scripts (asking a customer to reconsider a review after remediation without inducement).
6. Statutory tort of serious invasion of privacy — risk assessment of recovery calls and data handling.
7. Trade mark clearance and filing strategy for "Reputrail".
8. Insurance: PI with media/defamation liability; cyber cover.
9. Structure: sole trader vs Pty Ltd timing (with accountant).

---

## 10. Minimum viable outlines

### 10a. Privacy Policy (minimum viable) — RECOMMENDATION

1. **Who we are** — Reputrail, ABN, Sydney, contact email for privacy queries.
2. **Whether the Privacy Act applies** — state plainly that Reputrail may be a small business operator but **complies with the APPs voluntarily** (or has opted in).
3. **What we collect and from whom** — (a) client business contacts and account data; (b) **client's customers' contact details supplied by the client** (first name, mobile/email, job date/category); (c) public review content; (d) website analytics.
4. **Why** — send review/feedback requests **on the client's instructions**; monitor and draft responses; escalation/recovery coordination; reporting to the client.
5. **Automated tools** — automated text classification and AI-assisted drafting are used; no public response is posted without human approval (APP 1 automated-decision disclosure).
6. **Disclosure** — to the client; to SMS/email providers; to AI/cloud providers (named), some located overseas (US); contractual protections; no sale of personal information.
7. **Retention** — customer contact data deleted within [90] days of the end of the request sequence; opt-out hashes retained to honour unsubscribes; send logs retained [2] years for compliance evidence.
8. **Security** — encryption, MFA, least privilege, vendor DPAs, breach response.
9. **Access, correction, complaints** — how to request; response time; OAIC escalation path.
10. **Marketing and unsubscribe** — Spam Act statement: every message identifies the business and carries a free unsubscribe honoured within 5 working days.
11. **Changes** — version and date.

### 10b. Client Service Agreement (minimum viable) — RECOMMENDATION

1. Parties, ABNs, term, commencement.
2. **Services** — monitoring, drafting (for approval), escalation, recovery coordination, review requests, reporting; **exclusions**: no guarantee of ratings, review removal or volume.
3. **Client obligations** — (a) grant GBP **Manager** access (never passwords); (b) supply only customers who have given **express written consent** to feedback/review contact, and warrant this; (c) approve or reject drafts within [48h]; (d) no incentives, no fake reviews, no gating requests; (e) keep business details accurate.
4. **Authority to act** — client appoints Reputrail as agent to monitor, flag reviews, and **publish approved responses** in the client's name; approval mechanism defined (click-approve in portal / email). Reputrail may decline to publish content it reasonably considers unlawful or defamatory.
5. **Data handling** — Reputrail processes customer personal information only for the Services, applies the Data Handling Policy (10d), deletes per schedule, notifies the client of a suspected breach within [48h], and does not use the data for its own purposes.
6. **Compliance allocation** — client is the "authorised sender" under the Spam Act; Reputrail will not send without consent records; each party complies with ACL/Privacy/Spam; **indemnity by client** for losses from client-supplied non-consented contacts or client instructions to breach policy; Reputrail indemnity for its own negligence (capped).
7. **Fees, GST, payment terms**; price changes with 30 days' notice; **no automatic renewal without reminder**; cancel any time with [30 days] notice (UCT/unfair-trading-ready).
8. **Consumer guarantees** — acknowledge non-excludable guarantees; limit remedies as permitted (re-supply).
9. **Liability cap** — fees paid in prior 12 months; exclude consequential loss to the extent permitted.
10. **IP** — client owns approved published responses; Reputrail owns templates, prompts, tooling.
11. **Confidentiality**, **termination** (incl. immediate termination for fake-review/incentive breaches), **offboarding** (remove Manager access, delete data, export report), **dispute resolution**, **governing law NSW**.

### 10c. Customer Authorisation Process (step-by-step) — RECOMMENDATION

**Stage 1 — Client onboarding (trade business)**
1. Signed service agreement (10b) including the **Authority to Act** clause and the **Consent Warranty**.
2. **Authorised Representative form**: legal name, ABN, trading name, owner name/role, approval contacts, escalation phone, preferred response tone, "never say" list, and signature.
3. **Google Business Profile access without passwords**: client signs in to their own Google account → Business Profile → **More → Business Profile settings → People and access → Add → enter Reputrail's dedicated Google account email → choose "Manager" → Invite**; Reputrail accepts the invitation. Reputrail never asks for or stores client Google passwords. (Google help, snippet-only, https://support.google.com/business/answer/3403100.) Record the date access was granted.
4. Facebook: client adds Reputrail's Business Manager/Meta Business Suite user with "moderate/respond" permissions (role names to confirm). hipages/ProductReview: client forwards notification emails or adds Reputrail as a user if the platform allows; otherwise monitoring only.
5. Capture the client's **review-request consent mechanism** (job sheet/invoice wording). Provide Reputrail's template wording. Do not activate sending until a consent-capture method exists.
6. Set approval mode: **every public response requires explicit owner approval** (portal click or email reply "APPROVED"); define response SLAs.

**Stage 2 — Customer (end-customer) consent and contact**
7. Client marks jobs complete and uploads/forwards only: first name, one contact channel, job date, job category, **consent flag + method + date**.
8. Reputrail validates: consent present; not on suppression list; not contacted for this job before; ≤ one job per customer per 30 days.
9. Send sequence: message 1 within 24–72h of completion; optional one reminder after 5–7 days; identifies the trade business; free unsubscribe; same public review link for everyone.
10. Opt-out: immediate suppression (hash) across all clients; confirmation to the customer.

**Stage 3 — Negative review escalation and recovery**
11. Classifier flags ≤3★ or negative sentiment → human check → alert owner within [1h business hours].
12. Draft public response for approval (acknowledge, no blame, invite offline contact).
13. Owner makes the **recovery call** (service call only; no upsell); outcome logged. Any later request that the customer "update" the review must contain **no inducement**; template wording lawyer-approved.
14. Flag review to Google only where a specific policy violation exists; log reason; one appeal; report outcome without guarantees.

**Stage 4 — Offboarding**
15. Client removes Reputrail as Manager (or Reputrail removes itself); delete customer data within 30 days; retain send/consent logs (compliance evidence) for 2 years; hand over report.

### 10d. Data Handling Policy (minimising personal information) — RECOMMENDATION

1. **Data minimisation schedule** — collect only: first name; one of mobile/email; job date; job category; consent record (method/date/by whom). **Never**: full address, DOB, payment data, photos, free-text job notes, invoice amounts.
2. **No PII to the LLM** — redaction layer strips names, phone numbers, emails, addresses, URLs, invoice/reference numbers before any Claude API call; use job category + review text + tone settings only; drafts re-personalised locally. Prefer `inference_geo` controls if a client requires US-only processing; no Australian residency is available (document this).
3. **Retention** — raw customer contact data: delete 90 days after sequence end. Review content: keep while client is active (public anyway). Send/consent logs: 2 years, minimal fields. Suppression list: hashed identifiers, indefinite.
4. **Access** — founder + named contractors only; MFA on all tools; role-based client partitioning; no exports to personal devices; no spreadsheets of customer lists emailed around.
5. **Vendors** — maintain a register (SMS/email provider, hosting, LLM, analytics) with DPA/terms links, data location, retention; review annually. Anthropic: training prohibited on API data; ZDR available on request; Batch API not ZDR-eligible; Covered Models require 30-day retention.
6. **Security baseline** — encryption in transit/at rest; secrets in a vault; least-privilege API keys per client; audit log of who viewed what.
7. **Incident response** — detect → contain → assess seriousness within 30 days (target 72h) → notify affected clients within 48h → OAIC/individuals if an eligible data breach and Reputrail is covered → post-incident review.
8. **Individual requests** — process to find, export, correct or delete a customer's data within 30 days; route requests from customers to the client where the client is the primary holder.
9. **Training and review** — annual review of this policy and of message templates against ACMA/ACCC/Google policy updates (Google changed review policy April 2026; ACL penalties changed March 2026).

---

## 11. Quick compliance checklist before first paid client

- [ ] Lawyer review of: consent wording, message templates, client agreement, privacy policy (items in s.9).
- [ ] ABN; business name registered (A$47/1yr or A$108/3yrs); GST decision; PI/PL (with media liability) bound.
- [ ] Trade mark search done; Headstart lodged if clear.
- [ ] Google API access requested (14-day review); dedicated Google account for Manager invitations.
- [ ] Redaction layer in front of Claude API tested; model/prompt versioning logged.
- [ ] Unsubscribe path tested on alphanumeric and numeric senders; suppression list live.
- [ ] Consent record field mandatory in job upload; sending blocked without it.
- [ ] Gating-free feedback flow verified (public link visible to all respondents).
- [ ] Incident response plan written; vendor register complete.

---

## Sources

Regulator / official (snippet-only unless marked full read):
- ACCC — online reviews for business: https://www.accc.gov.au/business/advertising-and-promotions/online-reviews-for-product-and-services
- ACCC — A guide to online reviews for business and review platforms: https://www.accc.gov.au/about-us/publications/a-guide-to-online-reviews-for-business-and-review-platforms
- ACCC — guidance release: https://www.accc.gov.au/media-release/accc-releases-guidance-about-online-product-reviews
- ACCC — online reviews must be genuine: https://accc.gov.au/business/selling-products-and-services/small-business-education-program/misleading-conduct-and-advertising/online-reviews-must-be-genuine
- ACCC — influencer/review scrutiny 2023: https://www.accc.gov.au/media-release/scrutiny-of-influencers-and-businesses-for-misleading-advertising-and-online-reviews-continues
- ACCC — Euro Solar penalty: https://www.accc.gov.au/media-release/145000-penalty-for-fake-testimonials-and-false-solar-energy-country-of-origin-representations
- ACCC — Service Seeking penalty: https://www.accc.gov.au/media-release/service-seeking-to-pay-penalty-for-misleading-online-customer-reviews
- ACCC — True Value Solar incentives: https://accc.gov.au/media-release/true-value-solar-discontinues-incentives-for-positive-online-reviews
- OAIC — APP Guidelines Chapter B: https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-b-key-concepts
- OAIC — Opting in to the Privacy Act: https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/opting-in-to-the-privacy-act
- OAIC — NDB scheme Part 4: https://www.oaic.gov.au/privacy/notifiable-data-breaches/preventing-preparing-for-and-responding-to-data-breaches/data-breach-preparation-and-response/part-4-notifiable-data-breach-ndb-scheme
- ACMA — Avoid sending spam: https://www.acma.gov.au/avoid-sending-spam
- ACMA — Telstra spam penalty 2025: https://www.acma.gov.au/articles/2025-03/telstra-penalised-spam-breaches
- ACMA — Betfair infringement notice: https://www.acma.gov.au/sites/default/files/2025-07/Betfair%20-%20Spam%20Infringement%20Notice_Redacted.pdf
- ACMA — Latitude infringement notice: https://www.acma.gov.au/sites/default/files/2026-04/Latitude%20-%20Spam%20Infringement%20Notice%20-Redacted.pdf
- ACMA — Tabcorp investigation report: https://www.acma.gov.au/sites/default/files/2026-07/Tabcorp%20Holdings%20Limited%20-%20Investigation%20Report%20-%20Spam%20Act%202003%20-%2011%20Sept%202025_Redacted.pdf
- ACMA — CBA investigation report: https://acma.gov.au/sites/default/files/2024-10/Commonwealth%20Bank%20of%20Australia%20-%20Spam%20Investigation%20-%20Final%20Investigation%20Report%20-%2014%20August%202024%20%281%29_Redacted.pdf
- ACMA — Statement of Expectations on consent (2024): https://acma.gov.au/sites/default/files/2024-06/ACMA%20-%20Statement%20of%20Expectations%20-%20Use%20of%20consent%20in%20telemarketing%20~%20marketing%20FINAL_0.DOCX
- ACMA — ValueAd Marketing formal warning: https://www.acma.gov.au/sites/default/files/2019-10/Value%20Ad%20Marketing%20Formal%20Warning%2015%20Sept%202017%20docx.docx
- Do Not Call Register — using the register: https://www.donotcall.gov.au/industry/industry-overview/using-the-register
- ATO — Registering for GST: https://www.ato.gov.au/businesses-and-organisations/GST-excise-and-indirect-taxes/GST/registering-for-GST
- Google — Manage owners & managers: https://support.google.com/business/answer/3403100
- Google — Maps user-generated content policy: https://support.google.com/contributionpolicy/answer/7400114 ; https://support.google.com/local-guides/answer/2622994
- Google — Business Profile reviews help: https://support.google.com/business/answer/3474122
- Google — GBP API FAQ / overview / limits: https://developers.google.com/my-business/content/faq ; https://developers.google.com/my-business/content/overview ; https://developers.google.com/my-business/content/limits
- ProductReview.com.au — incentivised reviews policy: https://support.productreview.com.au/hc/en-us/articles/333757051615-What-is-your-policy-on-incentivised-reviews ; https://support.productreview.com.au/hc/en-us/articles/218825457-Incentivised-Reviews ; https://www.productreview.com.au/i/posting-guidelines
- Anthropic — Commercial Terms (full read): https://www.anthropic.com/legal/commercial-terms
- Anthropic — Data Processing Addendum (full read): https://www.anthropic.com/legal/data-processing-addendum
- Anthropic — API and data retention (full read): https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- Anthropic — Data residency (full read): https://platform.claude.com/docs/en/manage-claude/data-residency
- Anthropic — Batch processing (full read): https://platform.claude.com/docs/en/build-with-claude/batch-processing

Law-firm / industry commentary (snippet-only):
- https://www.minterellison.com/articles/privacy-and-other-legislation-amendment-act-2024-now-in-effect
- https://tglaw.com.au/insights/six-month-countdown-to-new-statutory-tort-of-serious-invasions-of-privacy
- https://leglobal.law/2025/05/22/australia-a-new-statutory-tort-for-privacy-invasion-and-disclosure-of-automated-decision-making-incoming-privacy-law-reforms-in-australia/
- https://ccp.com.au/news/privacy-act-reform-2024-notifiable-breach-teeth/
- https://solway.au/blog/privacy-act-december-2026-small-business-exemption/
- https://www.epicit.com.au/?p=15345
- https://www.minterellison.com/articles/aml-ctf-reforms-dont-forget-the-privacy-policy
- https://allitservices.com.au/100000-small-businesses-about-to-fall-under-the-privacy-act/
- https://sprintlaw.com.au/?p=7521 ; https://tpb.gov.au/privacy-and-securing-personal-information
- https://lawpath.com.au/blog/notifiable-data-breach-scheme
- https://www.corrs.com.au/insights/acma-spam-act-enforcement-and-the-implications-for-business
- https://privacymatters.dlapiper.com/2024/08/australias-e-marketing-expectations-when-customers-dont-give-a-spam/
- https://www.claytonutz.com/insights/2024/july/spam-and-telemarketing-the-acmas-expectations-and-priorities-for-2024-25
- https://www.claytonutz.com/insights/2025/april/acma-enforcement-action-do-your-marketing-communications-comply-with-the-spam-acts-unsubscribe-rules
- https://www.claytonutz.com/insights/2023/november/the-acma-cranks-up-enforcement-do-your-factual-customer-emails-pass-the-spam-act-test
- https://hwlebsworth.com.au/?p=29709 ; https://hwlebsworth.com.au/penalties-for-fake-testimonials-and-false-refund-promises/
- https://www.nortonrosefulbright.com/fr-ca/centre-du-savoir/publications/5615dd36/dont-filter-this-out-are-you-spam-act-compliant
- https://sprintlaw.com.au/articles/spam-act-compliance-your-australian-business-guide-to-avoiding-penalties/
- https://www.brightlaw.com.au/spam-act-action-by-acma-vodafone-and-3-others/
- https://www.hsfkramer.com/insights/2023-10/unsubscribe-means-unsubscribe-ticketek-pays-over-500000-for-breaching-spam-act
- https://itwire.com/business-it-news/security/oneflare-cops-$75,000-fine-over-spam-rule-breaches
- https://technologydecisions.com.au/content/it-management/news/service-seeking-fined-for-spam-act-breach-1464535104
- https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2
- https://blog.mobilemessage.com.au/2026/02/Is%20SMS%20Marketing%20Legal%20in%20Australia.html
- https://cloutly.com/blog/review-request-sms-rules/
- https://www.klgates.com/Significant-Changes-for-Australian-Competition-and-Consumer-Laws-Doubling-of-Penalties-to-AU100-Million-Per-Offence-and-Unfair-Trading-Practices-to-Be-Prohibited-4-13-2026
- https://mk.com.au/accc-penalties-double-to-100-million/
- https://mccullough.com.au/2026/07/03/unfair-trading-practices-laws-australia-2027/
- https://hwlebsworth.com.au/parliament-passes-unfair-trading-practices-reforms-preparing-for-the-new-regime
- https://jws.com.au/what-we-think/accc-priorities-for-2026-unfair-practices-in-digital-markets-consumer-safety-and-the-cost-of-living/
- https://www.mondaq.com/australia/product-liability-safety/280430/accc-releases-guidelines-on-online-user-reviews
- https://realestatebusiness.com.au/industry/10006-business-penalised-215k-for-fake-testimonials
- https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/
- https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/
- https://searchengineland.com/google-prohibits-incentivizing-customers-to-remove-or-modify-negative-reviews-387874
- https://seroundtable.com/google-business-profiles-review-appeals-delays-42331.html
- https://reviewshake.com/blog/google-review-removal-a-step-by-step-guide-for-businesses
- https://get.nicejob.com/resources/how-to-remove-a-google-review-complete-guide-for-business-owners-and-reviewers
- https://slashpost.ai/blogs/google-business-profile/google-business-profile-api-documentation-2026
- https://www.socialmediatoday.com/news/meta-implements-new-policies-to-protect-consumers-and-businesses-from-fraud/625740
- https://techcrunch.com/2022/06/21/meta-cracking-down-fake-irrelevant-reviews-facebook
- https://au.trustpilot.com/review/hipages.com.au ; https://www.productreview.com.au/listings/home-improvement-pages?page=5 ; https://kingtradie.com/hipages-review/
- https://www.developersdigest.tech/models/data-retention/anthropic
- https://www.minterellison.com/articles/responsible-use-of-ai-new-australian-guardrails-released
- https://www.govinfosecurity.com/blogs/australia-abandons-proposed-mandatory-ai-rules-in-new-plan-p-3986
- https://www.adnews.com.au/news/australia-pauses-ai-guardrails-and-goes-with-a-national-plan
- https://www.brightlaw.com.au/ai-regulation-in-australia/
- https://ausbusinessregister.com.au/asic-fees-australia/ ; https://ausbusinessregister.com.au/business-registration-costs-australia-2026/ ; https://ausbusinessregister.com.au/asic-annual-review-guide-2026/
- https://help.nowinfinity.com.au/hc/en-au/articles/16454948779919-ASIC-Fee-Indexation-effective-1-July-2026
- https://sprintlaw.com.au/articles/ip-australia-trade-mark-fees-explained/ ; https://legalvision.com.au/cost-of-trade-mark-registration ; https://bonamark.com/how-to-register-a-trademark-in-australia.md
- https://www.upcover.com/blog/professional-indemnity-insurance-cost ; https://www.upcover.com/blog/public-liability-insurance-cost-australia
