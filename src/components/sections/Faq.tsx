import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export const faqs = [
  {
    q: "Is this AI?",
    a: "Not the part that matters. Software, including AI, helps us spot new reviews, sort them and produce a first draft. A person reads every review, rewrites the draft so it sounds like you, decides what needs escalating and briefs you before any customer call. Nothing is published without your approval, and no customer’s details are sent to any AI tool.",
  },
  {
    q: "Can you remove negative reviews?",
    a: "Only when a review breaks Google’s own rules, for example it’s about a different business or the person was never a customer. We prepare the report and submit it with your approval; Google decides. Genuine negative reviews can’t be removed, and anyone who promises otherwise is misleading you. What we can do is make sure every one gets a calm reply and, where possible, a private fix. We never ask a customer to change a review.",
  },
  {
    q: "Do you need my password?",
    a: "No, and we’ll never ask for one. You add Reputrail as a manager on your Google Business Profile from your own account. It takes two minutes, you keep ownership, and you can remove us in one click.",
  },
  {
    q: "How much of my time does it take?",
    a: "A 30-minute set-up call, then usually a minute or two a day approving replies by text. When a customer needs a phone call, that’s your time, but we’ve done the preparation so the call is short.",
  },
  {
    q: "What happens when a complaint arrives?",
    a: "The same working day, a person reads it and works out what kind of problem it is. You get a text with the review, our read on it and a draft reply in your voice. If a call could win the customer back, we brief you first and log what was agreed.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time. Plans are month to month with no set-up fee, and your plan ends with the month you’ve paid for. The founding pilot is a single month and nothing renews automatically.",
  },
  {
    q: "What about my customers’ information?",
    a: "We collect the minimum: a first name and one contact detail to send a review request you’ve asked for, and the public text of reviews. We never sell or share it, we strip it before any software sees it, and we delete it when you leave. Every request includes a working unsubscribe.",
  },
];

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <SectionHeading
          id="faq-heading"
          title="Questions, answered plainly."
          lede="If yours isn’t here, ask us on the call."
          className="lg:sticky lg:top-24 lg:self-start"
        />
        <div className="border-t rule">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 40, 200)}>
              <details className="faq group border-b rule">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-ink transition-colors duration-200 hover:text-accent md:py-6">
                  <h3 className="text-heading">{f.q}</h3>
                  <svg
                    className="mt-1.5 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ease-out-expo group-open:rotate-45"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="max-w-[40rem] pb-6 pt-1 text-body text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
