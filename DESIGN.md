# Reputrail design system

Direction: **a quiet, premium service page in the manner of Apple, Linear and Stripe, for a human-led service.** Warm off-white ground, near-black ink, one deep forest green used sparingly, one typeface, generous whitespace, hairlines instead of boxes. Everything below was documented from the built site (`src/app/globals.css`, `src/components/**`). Tokens live in `globals.css` under `:root` and are exposed to Tailwind v4 through `@theme inline`.

## Colours (colour tokens)

Strategy: *Restrained.* The ground and white carry the whole public site; the accent appears only on the primary action, the hero label, step numerals, ticks, the recommended plan border and focus rings. The dark surfaces survive only in the workspace top bar and the report score block.

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--ground` | `#FAF9F6` | `bg-ground` | Page background, alternating sections |
| `--ground-raised` | `#FFFFFF` | `bg-ground-raised` | Alternate sections, cards, inputs, the activity feed and audit preview |
| `--ground-sunken` | `#F2F0EB` | `bg-ground-sunken` | Pilot panel, feed footer, ghost hover |
| `--ink` | `#171717` | `text-ink` | Headings and primary text |
| `--ink-soft` | `#5F5F5F` | `text-ink-soft` | Body and secondary text (6.1:1 on ground) |
| `--ink-faint` | `#6B6B6B` | `text-ink-faint` | Labels, hints, timestamps, metadata (5.1:1 on ground) |
| `--line` / `--line-strong` | `#E9E7E2` / `#D6D3CC` | `rule`, `border-line-strong` | Hairlines; input borders |
| `--accent` | `#315B49` | `bg-accent`, `text-accent` | Primary action, label, numerals, ticks, focus ring (7.3:1 on ground; white on accent 7.7:1) |
| `--accent-deep` | `#27493B` | `bg-accent-deep` | Primary hover |
| `--accent-soft` | `#EAF0EC` | `bg-accent-soft` | Reserved for tints; unused on the public site |
| `--signal` / `--signal-ink` | `#B5483A` / `#9A3B2E` | `text-signal-ink` | Negative-review title in the feed; invalid borders and error text only |
| `--field`, `--field-deep`, `--field-raised` | `#315B49`, `#27493B`, `#3C6B57` | `bg-field` | Workspace top bar, report score block, "Won" chips |
| `--ink-on-field`, `--ink-on-field-soft` | `#F7F7F4`, `#C9D8D0` | | Text on dark surfaces |
| `--stamp` | `#BFE0CF` | `text-stamp` | Mint highlight on dark surfaces only (score band label) |
| `--stamp-ink` | `#7A5A1E` | `text-stamp-ink` | Warm warning text in workspace chips and banners |
| `--green-mid`, `--green-bright` | `#315B49`, `#4F8C72` | | Workspace positive tone and meters |

Rules: the accent is never body text; no gradients on the public site; shadows are soft and low (`--shadow-lift`, `--shadow-float`) and appear only on the primary button and the two document figures; secondary text is grey, not tinted.

## Typography

- **Instrument Sans** (OFL, variable `wght` 400–700 plus italic): display, body and labels. Self-hosted at `src/fonts/InstrumentSans-var.woff2` (40 KB) and `InstrumentSans-Italic-var.woff2`, loaded through `next/font/local` as `--font-instrument`. A static semibold TTF (`InstrumentSans-SemiBold-og.ttf`) feeds the Open Graph image.
- **JetBrains Mono** (OFL, variable): workspace data only. `--font-jetbrains`. Not used on the public site.

| Role | Utility | Size | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| Display | `text-display` | clamp(2.75rem, 1.7rem + 4.6vw, 4.5rem) | 1.02 | -0.035em | 600 |
| Title | `text-title` | clamp(1.875rem, 1.35rem + 2.3vw, 3rem) | 1.08 | -0.028em | 600 |
| Heading | `text-heading` | clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem) | 1.3 | -0.012em | 600 |
| Lede | `text-lede` | clamp(1.125rem, 1.06rem + 0.3vw, 1.3125rem) | 1.5 | -0.006em | 400 |
| Body | `text-body` | 1.0625rem | 1.6 | 0 | 400 |
| Small | `text-small` | 0.9375rem | 1.5 | 0 | 400 |
| Label | `label` | 0.75rem | 1.4 | 0.12em, uppercase | 500 |

Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`. Numerals in data use `tabular`. Measures: ledes 34rem, body columns 22–40rem, FAQ answers 40rem.

## Spacing and grid

- Container: `container-x` = max 72rem, gutters 1.25rem (mobile), 2.5rem (≥48rem), 3rem (≥80rem).
- Section rhythm: `py-20 md:py-28 lg:py-32` via `Section`. Heading block (`SectionHeading`) then `mt-14` to content; content blocks open with a hairline (`border-t rule pt-10`).
- Alternation: ground, white, ground, white through the twelve sections; the closing call to action is white with a top hairline.
- Two-column sections at `lg:` use asymmetric fractions (`0.7fr/1.3fr`, `0.8fr/1.2fr`, `0.9fr/1.1fr`) with the copy column `lg:sticky lg:top-24 lg:self-start`.
- Lists are hairline-separated rows or plain columns, not cards. Cards (white, hairline, `rounded-md`) are reserved for documents and plans: the activity feed, the audit preview, the three plans, the form.
- Radius: `--radius` 6px (`rounded-sm`), `--radius-lg` 12px (`rounded-md`). Never pills.

## The mark

`TagMark` in `Wordmark.tsx`: a tag with a pointed top, a punched hole and a tick, drawn in the accent on light. The favicon and Open Graph image use the same drawing.

## Components

| Component | File | Notes |
|---|---|---|
| `Button`, `ButtonLink`, `TextLink`, `Arrow` | `src/components/Button.tsx` | One primary (accent fill, white text, `shadow-lift`, 1px lift on hover), `secondary` outlined, `ghost`. Sizes sm 40px, md 48px, lg 56px. Text links have a 44px hit area and an arrow that nudges on hover. |
| `Header` | `Header.tsx` | Wordmark, three anchors (≥md), one compact primary. |
| `Footer` | `Footer.tsx` | Three columns, legal line, trade-mark attribution. |
| `Section`, `SectionHeading` | `Section.tsx` | Shared rhythm and heading block for the twelve sections. |
| `ActivityFeed` + `RecordMotion` | `ActivityFeed.tsx`, `RecordMotion.tsx` | The hero visual: six dated entries from a review landing to the owner approving, on a white sheet, labelled illustrative. Entries fade in once (520ms expo-out, 340ms stagger) when 25% in view; reduced motion and no-JS show the finished feed. |
| `Reveal` | `Reveal.tsx` | Quiet once-only reveal (10px, 640ms) applied only below the first viewport; content is visible without JS. |
| `MobileCta` | `MobileCta.tsx` | Bottom action bar below `lg`, shown after the hero heading leaves the viewport and hidden near the closing call to action; safe-area aware. |
| Sections | `src/components/sections/*.tsx` | Hero, Problem, Experience, HowItWorks, WhoWeHelp, WhatWeHandle, Pricing, FreeAudit, Differentiation, Founder, Faq, FinalCta, in that order. |
| Form | `src/app/audit/AuditForm.tsx`, `actions.ts`, `fields.ts` | Four fields (business, name, email or mobile, optional link). Server action with validation, honeypot, inline errors (`aria-invalid`, `aria-describedby`), first-error focus, pending spinner, success state, honest fallback when no webhook is configured. |

## Interaction states

- Hover: colour shift plus 1px lift on buttons; underline on links (offset 6px); FAQ questions shift to the accent.
- Focus: `:focus-visible` 2px accent outline, 3px offset, everywhere (red on invalid fields).
- Active: lift removed. Disabled: 60% opacity, no pointer events.
- Loading: button text "Sending" with a spinner. Error: `role="alert"` summary plus inline field errors. Success: `role="status"` card. Empty: not applicable.
- Browser surfaces are themed: selection and caret (accent tint), scrollbar (line colour), `touch-action: manipulation`, tap highlight, `theme-color` matches the ground.

## Motion grammar

One authored moment (the activity feed). Supporting motion only for feedback and quiet reveals. Easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for arrivals, `(0.25, 1, 0.5, 1)` for routine. Durations 200ms (buttons), 300ms (bar, chevron), 320ms (FAQ height via `::details-content`), 520ms (feed entry), 640ms (reveal). Every animation has a `prefers-reduced-motion` path; nothing hides content when scripts fail.

## Accessibility floor

WCAG 2.2 AA. Verified with axe-core (0 violations on `/`, `/audit`, `/privacy` at 390 and 1440) and the Impeccable detector. Skip link, landmark `main`, one `h1` per page, labelled controls, keyboard-operable FAQ (`details/summary`), 44px targets on mobile, no horizontal overflow at 390.

Detector exception: the hero carries the tracked uppercase label pinned by the redesign brief ("Sydney-based · Human-led reputation management"). The detector's `hero-eyebrow-chip` rule flags it at desktop width. It is kept deliberately as plain text, not a pill, and is the only such label on the site.

## Workspace (Operate mode)

`/workspace` reuses the tokens with an Operate-mode register: white raised surfaces (`.ws-card`, `.ws-card-raised`) with a 1px top highlight and layered soft shadows, a glossy accent-green primary (`.ws-btn-primary`), a green top bar (`.ws-topbar`), document surfaces with a faint paper reflection (`.ws-doc`) for audits and reports, compact fields (`.ws-field`), status chips, meters, and a `@media print` block that strips chrome for PDF export. Tables from `md` up; stacked cards below. Styles live in `src/app/workspace/workspace.css`; primitives in `src/components/workspace/ui.tsx`.

## Content rules

Australian English. Second person. Short sentences. One tracked label on the site (the hero), none elsewhere. Every illustrative figure labelled as such. No statistics without a source in `/research`. Curly apostrophes and quotes. Preserved phrases: "Your reputation. In good hands.", "Someone looking after your reviews who picks up the phone.", "You stay on the tools.", "A person, not another platform.", "Good work deserves a good reputation."
