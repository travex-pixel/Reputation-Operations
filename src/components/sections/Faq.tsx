import { Reveal } from "@/components/Reveal";

export const faqs = [
  {
    q: "What actually happens when a negative review appears?",
    a: "The same working day, a person at Reputrail reads it and works out what kind of problem it is: a scheduling miss, a pricing dispute, a workmanship complaint, or something that isn’t about you at all. You get a text with the review, our read on it, and a recommendation. We draft a calm public reply in your voice for you to approve. If a phone call could win the customer back, we brief you before you ring, and we log what was agreed. If the review clearly breaches Google’s policies (it’s about a different business, it’s abusive, it’s from someone who was never a customer), we prepare the flag for your approval. Google makes the final decision; we never promise a removal.",
  },
  {
    q: "Can you get bad reviews removed?",
    a: "Sometimes, when a review genuinely breaks Google’s content policies. We identify those, prepare the report and submit it with your approval. Legitimate negative reviews from real customers can’t be removed, and anyone who promises otherwise is either misleading you or breaking the rules. What we can do is make sure every one of them gets a measured public reply and, where possible, a private resolution.",
  },
  {
    q: "Do I need to give you any access for the free audit?",
    a: "No. The audit uses only what is already public: your Google, hipages and Facebook listings and those of three competitors near you. You don’t log in to anything or install anything. Access only comes up if you decide to work with us, and even then it is a manager invitation you control.",
  },
  {
    q: "What if the reviewer was never a customer, or is lying?",
    a: "It happens, and it is one of the few cases where Google may remove a review. We help you check your records, write a calm public reply that states the facts without naming anyone, and prepare the policy flag for your approval with the specific reason Google asks for. Google decides. Whatever the outcome, the reply is what the next customer reads, so we make sure it is there.",
  },
  {
    q: "Do you need my Google password?",
    a: "No, and we’ll never ask for it. You add Reputrail as a manager on your Google Business Profile from your own account. It takes two minutes, you keep ownership, and you can remove us in one click at any time.",
  },
  {
    q: "Is this just AI writing my replies?",
    a: "No. AI helps us with the repetitive parts: spotting new reviews, sorting them, and producing a first draft. A person reads every review, edits every draft so it sounds like you, decides what needs escalating, and briefs you before any customer call. Nothing is published without your approval.",
  },
  {
    q: "Which platforms do you cover?",
    a: "Google Business Profile first, because that’s where customers look. We also monitor hipages, Facebook and ProductReview.com.au. If your trade lives somewhere else, tell us and we’ll include it.",
  },
  {
    q: "How is this different from hipages or a review app?",
    a: "Apps and marketplaces send you a notification and leave the work to you. Many trade owners have one; few keep up with it. We do the work: reading, drafting, escalating, following up, reporting. We’re also independent, so we’ll tell you plainly when a platform’s review rules aren’t working in your favour.",
  },
  {
    q: "How much of my time does it take?",
    a: "A 30-minute set-up call, then usually a minute or two a day approving replies by text. When something needs a phone call to a customer, that’s your time, but we’ve done the preparation so the call is short.",
  },
  {
    q: "Is there a contract?",
    a: "No. Plans are month to month with no set-up fee; cancel any time and your plan ends at the end of the month you’ve paid for. The founding pilot is a single month at A$299 and nothing renews automatically: around day 25 we ask what you’d like to do. If we’re not earning our keep, you should leave, and we’ll make that easy."
  },
  {
    q: "What is the Reputrail Score?",
    a: "A number out of 100 on your monthly report that measures how well your reputation and customer feedback are being managed: review management (25), customer recovery (30), reputation growth (25), and the quality of insight and reporting (20). It never marks you down for a legitimate negative review. A two-star review that was answered within a day, escalated and resolved earns full marks. Where we don’t have the data to assess a component, we say so instead of guessing.",
  },
  {
    q: "How do you handle my customers’ information?",
    a: "We collect the minimum: a name and contact detail to send a review request you’ve asked for, and the public text of reviews. We never sell or share it, we delete it when you leave, and our privacy policy sets out the details. Requests always include an unsubscribe, as the Spam Act requires.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-ground" aria-labelledby="faq-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="faq-heading" className="text-title text-ink">
              Questions you’ll probably have
            </h2>
            <p className="mt-5 max-w-[26rem] text-lede text-ink-soft">
              Straight answers. If yours isn’t here, ask on the call.
            </p>
          </Reveal>

          <div className="border-t rule">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i * 40, 200)}>
                <details className="group border-b rule">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-heading text-ink transition-colors hover:text-green-mid md:py-6">
                    <span>{f.q}</span>
                    <svg
                      className="mt-1.5 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ease-out-expo group-open:rotate-45"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="max-w-[44rem] pb-6 text-body text-ink-soft">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
