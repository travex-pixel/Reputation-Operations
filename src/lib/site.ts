/**
 * Single source of truth for business facts shown on the site.
 * Update here, not in components.
 */
export const site = {
  name: "Reputrail",
  tagline: "Your reputation. In good hands.",
  description:
    "Human-led reputation management for Sydney trade businesses. We look after your reviews, respond to customers and help resolve complaints before they cost you the next job.",
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
    pilot: { label: "Founding customer pilot", price: 299, period: "for the first 30 days" },
    plans: [
      {
        id: "essential",
        name: "Essential",
        price: 299,
        summary: "Your reviews watched and answered.",
        includes: [
          "Google, hipages and Facebook checked every working day",
          "Replies drafted in your voice, published with your approval",
          "Negative reviews escalated to you the same working day",
          "One-page monthly report",
        ],
        fit: "Owner-operators and small crews.",
      },
      {
        id: "managed",
        name: "Managed",
        price: 499,
        summary: "Everything in Essential, plus winning customers back.",
        includes: [
          "Everything in Essential",
          "Customer recovery: we prepare the call, you make it",
          "Genuine review requests after completed jobs",
          "Quarterly competitor check",
        ],
        fit: "Businesses with 3 to 15 staff and a steady flow of jobs.",
        featured: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: 799,
        summary: "For operators who win work on reputation.",
        includes: [
          "Everything in Managed",
          "Monthly competitor and customer-feedback insights",
          "Complaint and warranty follow-up coordination",
          "Monthly 30-minute review call",
        ],
        fit: "Multi-crew or multi-location businesses.",
      },
    ],
  },
} as const;

export const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const trades = [
  { name: "Plumbers", why: "Emergency callers choose on rating and recency within minutes." },
  { name: "Electricians", why: "Safety and licensing make trust the whole sale." },
  { name: "Air conditioning", why: "Big installs, seasonal rushes and warranty callbacks." },
  { name: "Builders and renovators", why: "Long jobs, big deposits, nervous clients." },
  { name: "Landscapers", why: "Finish is judged in photos; referrals are the pipeline." },
  { name: "Roofers and other home services", why: "Urgent, high-value work from people who check first." },
] as const;

export const serviceGroups = [
  {
    name: "Review management",
    items: ["Every review read by a person, every working day", "Replies drafted in your voice", "Nothing published without your approval"],
  },
  {
    name: "Customer recovery",
    items: ["Negative reviews escalated the same working day", "A short brief before you ring the customer", "Outcomes recorded and followed up"],
  },
  {
    name: "Reputation growth",
    items: ["Honest review requests after completed jobs", "Every nominated customer asked, not just the happy ones", "Working unsubscribe on every message"],
  },
  {
    name: "Reporting and insights",
    items: ["One-page report each month", "How you compare with three local competitors", "What customers keep praising and complaining about"],
  },
] as const;
