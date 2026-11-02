# Surface brief — Homepage (`/`) and audit request (`/audit`)

Development-only. Never copy into shipped source.

> **Superseded on 2 November 2026.** The "dated service record" direction below (bottle-green field, amber, Bricolage Grotesque) is kept as the record of what was considered and built first. The current contract is the **Redesign addendum** at the end of this file; where the two disagree, the addendum wins.

**Scope and mode:** Persuade. Marketing homepage plus the audit-request page it feeds.

**Audience, job, action:** Sydney trade business owners (painters, plumbers, electricians, HVAC, renovators, roofers) reading on a phone between jobs or at night. Job: decide whether to hand the reviews/reputation job to someone they can trust. Action: request the free reputation audit (primary) or talk to us (secondary). Proof available: the mechanism itself (what happens when a bad review lands), the commitments (what we never do), transparent pricing, a clearly labelled illustrative audit. No customers, logos, testimonials or results exist and none may be implied.

**Constraints:** mobile-first 390×844; WCAG AA; minimal client JS; no fake proof; Australian English; no kicker/eyebrow labels; no icon-card grids as page structure; no purple gradients, blobs, robots, stock photos.

## Candidate worlds considered (ordered by resonance)

1. The dated service record / test-and-tag tag — what tradies issue to prove something is looked after and when it is due again. Carries continuity, protection, responsibility. **Chosen.**
2. The certificate of compliance / trade licence card — official, serial-numbered, trusted. Donates: tabular numerals, restraint, authority.
3. The signwritten ute — bold condensed type, phone number, licence number. Donates: confidence and plain declarative copy. Risk: tradie-agency cliché.
4. Surf-lifesaving flags ("patrolled") — a uniquely Australian trust signal. Declined: too literal and loud for a premium specialist; kept the idea of "patrolled, on a roster".
5. The worksite sign-in / SWMS board — rows, times, initials. Near-duplicate of 1.
6. The carbon duplicate invoice book — the category rut (cream paper + serif). Declined.
7. The Google Maps listing itself — the tool the audience operates; counts toward the rut. Declined, but the review card appears as content inside the record.

## Direction contract

**THESIS:** Reputrail is a person keeping a dated, signed-off record of your reputation and acting on every entry. The page is that record. It refuses the category default (hero headline + three benefit cards + logo strip + testimonial slider) and the "AI tool" look (gradients, dashboards, chat bubbles).

**OWN-WORLD:** Committed colour strategy: a deep bottle-green field (`#0F2C25`) carries the hero, the plans and the close (roughly 40% of the page); a cool chalk ground (`#EEF1EC`) carries the reading sections; green-black ink; one stamp amber (`#E9A23B`) reserved for the primary action and sign-off marks; one muted signal red for the negative-review marker only. Hairline rules tinted from the green, not grey. Small 6px corners, never pills. The tag silhouette with a punched hole is the mark and the recurring container for "entries". Type: Bricolage Grotesque (optical-size axis) for display and body, confident 600 display weight with tight tracking; JetBrains Mono only for record data (dates, times, counts, statuses). Browser surfaces themed: selection, caret, focus ring, scrollbar, tabular numerals.

**STORY:** The visitor understands in five seconds that a real person watches and answers their reviews and phones the unhappy customer back; believes it because they watch it happen in the record and because the commitments are blunt; acts by requesting the free audit.

**FIRST VIEWPORT (390 wide):** header (tag mark + wordmark, "Talk to us" text link, compact amber CTA). H1 at ~40px/1.02, 600 weight: "Someone looking after your reviews who picks up the phone." Two-line sub in soft tinted text. Amber primary button "Get your free reputation audit", secondary text link "Talk to us →". Below, the record: a tag-shaped dark panel listing a review landing at 7:42pm, escalation, draft, approval, callback, resolution, each entry stamping in with a mono timestamp and the final entry carrying an amber sign-off initial. On desktop (≥1024) the record sits right of the copy at 45% width, top-aligned, with the copy column max 36rem.

**FORM:** Dated service record (position 1 of 7). `seed: none (unavailable)` — the concept-seed engine's catalog fetch is blocked on this network; directions were derived manually per new-work.md §3.

**SIGNATURE INTERACTION:** the record stamps in entry by entry on first view (CSS keyframes, 320ms, expo-out, staggered, interruptible by scroll), the approval entry rotates its stamp in; reduced motion shows the completed record. One authored moment; the rest of the page reveals quietly (opacity/translate 12px once) and buttons acknowledge with a 1px lift.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Open decisions

- Founder name, photo, phone: not supplied; placeholders in `src/lib/site.ts`.
- Domain / email: provisional `hello@reputrail.com.au`.
- Form destination: server action posts to `AUDIT_WEBHOOK_URL` if set; otherwise the page shows a direct-email fallback.

## Finish review record (2 November 2026)

- Build path: code-led. Direction round run manually (catalog fetch blocked); seed unavailable.
- Independent finish review (fresh-context agent, Impeccable finish-reviewer contract): `disposition: fix`, eight material fixes. Applied: first-viewport copy and header link; one amber primary action everywhere and amber removed from ticks, marks and pilot border; pilot eyebrow folded into its heading; unsourced statistics rewritten as observations; sign-off stamp on the final record entry and a true tag mark; plan "Best for" rows bottom-aligned; sticky copy columns; pull-quote border removed; record header case unified; stagger reduced to 380ms.
- Independent five-persona critique (trade owner, sceptic, CRO, creative director, mobile user): applied the honesty fixes ("Most chosen", FAQ heading, "not learning on your account", ACL assurance, GST wording, explicit day-31 and cancellation terms), price and category in the hero, Industries before pricing and Founder after Why, shorter audit form with extras collapsed and trust microcopy, plain-language copy, sticky mobile CTA bar, editorial list for industries, consistent CTA label. Declined: a kicker above the H1 (craft-floor ban; category moved into the lede) and shortening the record (both reviewers named it the thing to keep). Deferred to the founder: name, photo, phone, ABN.
- Mechanical evidence after fixes: Impeccable detector 0 anti-patterns at 1280 and 390 on `/`, `/audit`, `/privacy`; axe-core 0 violations; no console errors; no horizontal overflow; keyboard order, FAQ keyboard operation, reduced-motion, no-JS and all form states verified with Playwright (`.impeccable/review/`).
- FINISH discharged: review, verdict and DESIGN.md complete. No shipping rasters exist (all imagery is SVG or type), so no provenance embedding was required.

## Redesign addendum (2 November 2026)

The founder's redesign brief superseded the "dated service record" direction above with a pinned direction: a minimalist, premium, human-led service site in the manner of Apple, Linear and Stripe. The contract now reads:

- **Palette (pinned):** ground `#FAF9F6`, ink `#171717`, secondary `#737373` family (built as `#5F5F5F` body and `#6B6B6B` metadata so both clear 4.5:1 on the ground), hairlines `#E9E7E2`, accent `#315B49` used sparingly, white `#FFFFFF`. The dark green field and amber are gone from the public site.
- **Type:** Instrument Sans only. No serif.
- **First viewport (390):** header (mark, compact primary). Label "Human-led reputation management · Australia-wide" (the brief pinned "Sydney-based"; the founder widened it to Australia-wide on 2 November so the site works for Darwin and for property managers; the detector's eyebrow rule is knowingly overridden for this one element). H1 "Your reputation. / In good hands." Two short supporting paragraphs. Primary "Get your free reputation audit", text link "See how it works". Trust line "A real person. Your voice. Your approval." Below, the activity feed: six entries from a two-star review landing to the owner approving the reply, on a white sheet, labelled illustrative. On desktop the feed sits right of the copy.
- **Twelve sections in order:** Hero; Problem; Experience (Tuesday evening, Wednesday, Friday); How it works (01–04); Who we help; What we handle; Pricing with the founding pilot; Free audit with a fictional typeset report; Differentiation; Founder; FAQ (seven questions); Final call to action.
- **Conversion:** one call to action label everywhere; the form asks for business name, your name, email or mobile, and an optional link.
- **Signature interaction:** the feed fades in entry by entry on first view; the FAQ animates height; everything else reveals quietly. Reduced motion shows the finished state.
- **Review record:** three independent passes (creative director, conversion, engineering) were run on the built site; their material findings and the fixes applied are recorded in `FOUNDER_HANDOVER.md`.
