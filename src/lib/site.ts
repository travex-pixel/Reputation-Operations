/**
 * Single source of truth for business facts shown on the site.
 * Update here, not in components.
 */
export const site = {
  name: "Reputrail",
  tagline: "Your reputation. In good hands.",
  description:
    "Reputrail is a managed online-reputation service for Sydney trade businesses. A real person watches your reviews, drafts replies for your approval, escalates the bad ones the same day and helps you win the customer back.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reputrail.com.au",
  locale: "en-AU",
  region: "Sydney, NSW",
  email: "hello@reputrail.com.au",
  /** Leave empty until a business line exists; the UI hides it when blank. */
  phone: "" as string,
  /** Founder details are intentionally blank until supplied. */
  founder: {
    name: "" as string,
    role: "Founder, Reputrail",
  },
  /** Business identifiers shown in the footer once registered. */
  abn: "" as string,
  pricing: {
    pilot: { label: "Founding customer pilot", price: 299, period: "for 30 days" },
    plans: [
      {
        id: "essential",
        name: "Essential",
        price: 299,
        summary: "Reviews watched and answered, every working day.",
        includes: [
          "Initial reputation audit",
          "Google, hipages and Facebook checked every working day",
          "Reply drafts in your words, published only with your approval",
          "Same-day escalation of negative reviews",
          "Monthly one-page report",
        ],
        fit: "Owner-operators and small crews who mainly need the reviews handled.",
      },
      {
        id: "managed",
        name: "Managed",
        price: 499,
        summary: "Everything in Essential, plus winning customers back.",
        includes: [
          "Everything in Essential",
          "Customer-recovery coordination: we help you plan the call and follow up",
          "Genuine review-request workflow for completed jobs",
          "Quarterly competitor reputation check",
          "Priority phone escalation",
        ],
        fit: "Businesses with 3–15 staff and a steady flow of jobs and reviews.",
        featured: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: 799,
        summary: "For multi-crew operators who win work on reputation.",
        includes: [
          "Everything in Managed",
          "Monthly competitor monitoring and sentiment analysis",
          "Complaint and warranty follow-up coordination",
          "Multi-location or multi-brand profiles",
          "Monthly 30-minute review call with the founder",
        ],
        fit: "Multi-crew and multi-location operators where reputation drives tender and referral work.",
      },
    ],
  },
} as const;

export const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#services", label: "Services" },
  { href: "/#example-audit", label: "Example audit" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#founder", label: "Talk to us" },
] as const;

export const trades = [
  {
    name: "Air conditioning",
    why: "Big-ticket installs, seasonal rushes and warranty callbacks generate the most emotional reviews of any trade.",
  },
  {
    name: "Plumbers",
    why: "Emergency callers choose on rating and recency within minutes. Response speed and tone decide who they ring next time.",
  },
  {
    name: "Electricians",
    why: "Safety and licensing make trust the whole sale. Unanswered complaints read as evasion.",
  },
  {
    name: "Painters",
    why: "Finish quality is judged in photos, and a single bad review about mess or missed dates follows you into every quote.",
  },
  {
    name: "Renovators & builders",
    why: "Long jobs, big deposits and nervous clients. Reputation is the difference between a tender shortlist and a cold call.",
  },
  {
    name: "Roofers",
    why: "Storm-season work is urgent and high-value; homeowners check reviews before they let anyone on the roof.",
  },
] as const;
