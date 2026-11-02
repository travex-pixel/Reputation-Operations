import { Reveal } from "@/components/Reveal";

const reasons = [
  {
    title: "A person owns it, and you can ring them.",
    body: "Software sends you a notification and leaves the hard part to you. Agencies bury reviews under SEO and ads. At Reputrail one named person reads every review about your business, and that person answers the phone.",
  },
  {
    title: "Replies in your voice, with your approval.",
    body: "We learn how you talk to customers in the first call. Every draft sounds like you, not a customer-service script, and nothing is published until you’ve said yes.",
  },
  {
    title: "We help you win the customer back, not just the argument.",
    body: "A good public reply is the minimum. The real win is the phone call that turns a two-star customer into a rebooked job and, often, an updated review. We brief you before you dial.",
  },
  {
    title: "Specialists in trades, in Sydney.",
    body: "We only work with trades. We know the difference between a missed booking and a workmanship complaint, what hipages does with your reviews, and why a recent review matters more than an old one in Google Maps."
  },
];

const commitments = [
  "We never buy, write or incentivise reviews.",
  "We never ask only your happy customers. Everyone you nominate gets the same honest request.",
  "We never guarantee a star rating, a ranking, or that a review will be removed. Google decides removals.",
  "We never publish a reply without your authorisation.",
  "We never ask for your passwords. You add us as a manager; you can remove us in a click.",
  "We never hold you to a 12-month contract.",
];

export function Why() {
  return (
    <section id="why" className="on-field bg-field text-ink-on-field" aria-labelledby="why-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <Reveal>
              <h2 id="why-heading" className="text-title text-ink-on-field">
                Why a managed service beats another app
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-9">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={Math.min(i * 70, 210)} className="border-t rule-on-field pt-7">
                  <h3 className="text-heading text-ink-on-field">{r.title}</h3>
                  <p className="mt-3 max-w-[36rem] text-body text-ink-on-field-soft">{r.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="tag-shape self-start bg-field-deep p-6 pt-10 ring-1 ring-line-on-field md:p-8 md:pt-11 lg:sticky lg:top-24">
            <h3 className="text-heading text-ink-on-field">What we will never do</h3>
            <p className="mt-2 text-small text-ink-on-field-soft">
              These are commitments, in writing, in every service agreement, written to stay
              inside Australian Consumer Law and Google’s review policies.
            </p>
            <ul className="mt-6 grid gap-4">
              {commitments.map((c) => (
                <li key={c} className="grid grid-cols-[1.25rem_1fr] gap-x-3 text-small text-ink-on-field">
                  <svg
                    className="mt-1 h-4 w-4 text-ink-on-field-soft"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t rule-on-field pt-5 font-mono text-mono text-ink-on-field-soft">
              Signed into every agreement. Ask us for a copy.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
