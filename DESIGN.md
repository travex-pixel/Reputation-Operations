# Reputrail design system

World: **the dated, signed-off service record.** The page is the record a person keeps of your reputation. Everything below was documented from the built site (`src/app/globals.css`, `src/components/**`). Tokens live in `globals.css` under `:root` and are exposed to Tailwind v4 through `@theme inline`.

## Colour

Strategy: *Committed.* The deep green field carries roughly a third of the page (hero, pricing, "Why", close); chalk carries the reading sections; one amber is reserved for the primary action and sign-off marks.

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--field` | `#0F2C25` | `bg-field` | Dark field: hero, pricing block, Why, final CTA |
| `--field-deep` | `#0A1F1A` | `bg-field-deep` | Record and commitments panels on the field |
| `--field-raised` | `#163B32` | `bg-field-raised` | Featured plan column, hover on field buttons |
| `--ground` | `#EEF1EC` | `bg-ground` | Page ground, alternating reading sections |
| `--ground-raised` | `#F7F8F5` | `bg-ground-raised` | Alternate sections, cards, inputs |
| `--ground-sunken` | `#E3E8E2` | `bg-ground-sunken` | Selected radio card, ghost hover |
| `--ink` | `#0B1C17` | `text-ink` | Headings and primary text on light |
| `--ink-soft` | `#3F524B` | `text-ink-soft` | Body text on light (7.3:1) |
| `--ink-faint` | `#56675F` | `text-ink-faint` | Labels, hints, metadata on light (5.3:1 on ground) |
| `--ink-on-field` | `#EAF2EC` | `text-ink-on-field` | Primary text on the field |
| `--ink-on-field-soft` | `#A3BFB2` | `text-ink-on-field-soft` | Secondary text on the field, tinted from the hue (7.6:1) |
| `--line` / `--line-strong` | `#C9D3CC` / `#9FB0A6` | `rule`, `border-line-strong` | Hairlines on light; input borders |
| `--line-on-field` / `-strong` | `rgb(234 242 236 / .14)` / `.28` | `rule-on-field` | Hairlines on the field |
| `--stamp` | `#E9A23B` | `bg-stamp`, `text-stamp` | Primary action fill (everywhere), APPROVED/RESOLVED stamps, focus ring |
| `--stamp-deep` | `#C9851F` | | Caret colour |
| `--stamp-ink` | `#4A2E03` | `text-stamp-ink` | Amber-derived text on light (11.7:1); rarely needed |
| `--green-mid` | `#1F5A48` | `text-green-mid` | Links and step labels on light (7:1) |
| `--green-bright` | `#3F8F74` | `text-green-bright` | Ticks on the field |
| `--signal` / `--signal-on-field` | `#C8553D` / `#EF8A70` | | Negative-review marker and invalid borders only |
| `--signal-ink` | `#A8412A` | `text-signal-ink` | Error text on light (5.3:1) |

Rules: amber is never body text on light; grey is never used on the field (secondary text is tinted green); no gradients; no glow shadows.

## Typography

- **Bricolage Grotesque** (OFL, variable `opsz` 12–96 and `wght` 200–800, width pinned to 100 at build): display and body. Self-hosted at `src/fonts/BricolageGrotesque-var.woff2` (98 KB), loaded through `next/font/local` as `--font-bricolage`. Headings set `font-variation-settings: "opsz" 96`; body `"opsz" 14`; features `ss01`, `cv11`.
- **JetBrains Mono** (OFL, variable): record data only: timestamps, counts, statuses, table numerals, document header labels. `--font-jetbrains`, 43 KB. Never for headings or body.

| Role | Utility | Size | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| Display | `text-display` | clamp(2.5rem, 1.6rem + 3.6vw, 4rem) | 1.02 | -0.035em | 600 |
| Title | `text-title` | clamp(1.875rem, 1.3rem + 2.3vw, 3rem) | 1.08 | -0.028em | 600 |
| Heading | `text-heading` | clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem) | 1.25 | -0.015em | 600 |
| Lede | `text-lede` | clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem) | 1.5 | -0.008em | 400 |
| Body | `text-body` | 1.0625rem | 1.6 | 0 | 400 |
| Small | `text-small` | 0.9375rem | 1.5 | 0 | 400 |
| Mono | `text-mono` (+ `font-mono`) | 0.8125rem | 1.4 | 0.01em | 400 |

Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`. Numerals in data use `tabular`. Body measure is capped at 36–44rem (`max-w-[36rem]`, `max-w-[44rem]`).

## Spacing and grid

- Container: `container-x` = max 76rem, gutters 1.25rem (mobile), 2rem (≥48rem), 2.5rem (≥80rem).
- Section rhythm: `py-20 md:py-28`. Headings carry more space above than below (section head `mt-5` lede, `mt-12`/`mt-14` to content).
- Two-column sections at `lg:` use asymmetric fractions (`0.8fr/1.2fr`, `0.85fr/1.15fr`, `1.05fr/0.95fr`) with the copy column `lg:sticky lg:top-24 lg:self-start`.
- Lists are hairline-separated rows (`border-t rule` + `border-b rule` per row), not cards. Cards are used only for documents (audit figure, contact card, form).
- Radius: `--radius` 6px (`rounded-sm`), `--radius-lg` 10px (`rounded-md`). Never pills.

## The tag

`tag-shape` utility: a `rounded-md` panel with a punched hole (a 10px chalk circle with an inset shadow) centred near the top. Used on the hero record, the commitments panel and the form success state. The mark (`TagMark` in `Wordmark.tsx`) is the same object: a tag with a pointed top, a hole, and an amber tick.

## Components

| Component | File | Notes |
|---|---|---|
| `Button`, `ButtonLink`, `TextLink`, `Arrow` | `src/components/Button.tsx` | One primary (amber, `shadow-lift`, 1px lift on hover, `shadow-float`), `secondary` outlined, `ghost`. Sizes sm 40px, md 48px, lg 56px. Text links have a 44px hit area. |
| `Header` | `Header.tsx` | Wordmark, four anchors (≥lg), "Talk to us", compact primary. `onField` variant for the dark hero. |
| `Footer` | `Footer.tsx` | Three columns, legal line, trade-mark attribution. |
| `Record` + `RecordMotion` | `Record.tsx`, `RecordMotion.tsx` | The signature object. Entries stamp in (420ms expo-out, 380ms stagger) once the panel is 25% in view; rules draw; APPROVED and RESOLVED stamps rotate in. Reduced motion and no-JS show the finished record. |
| `Reveal` | `Reveal.tsx` | Quiet once-only reveal (12px, 700ms) applied only to content below the first viewport; content is visible without JS. |
| `MobileCta` | `MobileCta.tsx` | Bottom action bar below `lg`, shown after the hero leaves the viewport and hidden near the closing CTA; safe-area aware. |
| Sections | `src/components/sections/*.tsx` | Hero, Problem, HowItWorks, Industries, Services (+ pricing), ExampleAudit, Why, Founder, Faq, FinalCta. |
| Form | `src/app/audit/AuditForm.tsx`, `actions.ts`, `fields.ts` | Server action with validation, honeypot, inline errors (`aria-invalid`, `aria-describedby`), first-error focus, pending spinner, success state, honest fallback when no webhook is configured. Optional fields collapsed in a `details`. |

## Interaction states

- Hover: colour shift plus 1px lift on buttons; underline on links (offset 5–6px).
- Focus: `:focus-visible` 2px amber outline, 3px offset, everywhere (red on invalid fields).
- Active: lift removed. Disabled: 60% opacity, no pointer events.
- Loading: button text "Sending…" with a spinner. Error: `role="alert"` summary plus inline field errors. Success: `role="status"` tag panel. Empty: not applicable (static content).
- Browser surfaces are themed: selection (amber tint), caret (amber), scrollbar (line colour), `touch-action: manipulation`, tap highlight.

## Motion grammar

One authored moment (the record). Supporting motion only for feedback and quiet reveals. Easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for arrivals, `(0.25, 1, 0.5, 1)` for routine. Durations 200ms (buttons), 300ms (bar, details chevron), 420ms (stamp), 700ms (reveal). Every animation has a `prefers-reduced-motion` path; nothing hides content when scripts fail.

## Accessibility floor

WCAG 2.2 AA. Verified with axe-core (0 violations on `/`, `/audit`, `/privacy` at 390 and 1440) and the Impeccable detector (0 anti-patterns at 390 and 1280). Skip link, landmark `main`, one `h1` per page, labelled controls, keyboard-operable FAQ (`details/summary`), focusable scroll region for the comparison table, 44px targets on mobile.

## Content rules

Australian English. Second person. No kickers or eyebrow labels above headings. Mono uppercase labels only as document headers or data field names. Every illustrative figure labelled as such. No statistics without a source in `/research`. Curly apostrophes and quotes.
