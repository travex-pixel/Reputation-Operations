import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

const steps = [
  {
    when: "Day 0",
    title: "Free reputation audit",
    body: "You send us your business name. Within two working days you get a one-page audit: your rating and review count against three local competitors, how many reviews are unanswered, what customers keep praising and complaining about, and the three things we’d fix first. No obligation, no sales pitch on the call.",
  },
  {
    when: "Week 1",
    title: "Set-up and authorisation",
    body: "A 30-minute call to learn how you talk to customers, what you will and won’t say publicly, and who to ring when something’s urgent. You add Reputrail as a manager on your Google Business Profile. We never ask for passwords.",
  },
  {
    when: "Daily",
    title: "Monitoring and replies",
    body: "Every working day we check Google, hipages and Facebook. New reviews are read by a person, sorted, and answered with a draft the way you’d say it. You approve each reply by text or email with one word, or tell us to post five-star thank-yous without asking."
  },
  {
    when: "Same day",
    title: "Escalation and recovery",
    body: "A negative review reaches your phone within the working day it appears, with what we think happened and what we recommend. If a call could win the customer back, we prepare the two-minute call only you can make, then log what was agreed. Where a review clearly breaches Google’s policy, we prepare the flag for your approval. Google decides; we never promise removals."
  },
  {
    when: "Ongoing",
    title: "Genuine review requests",
    body: "After completed jobs, we send a short, honest request on your behalf to every customer you nominate, never just the happy ones, with a working unsubscribe. Consistent asking is what lifts a rating. Never incentives, never fake reviews.",
  },
  {
    when: "Monthly",
    title: "One-page report",
    body: "What came in, what we answered, what we escalated, how you compare with your competitors, and what we recommend next month. Two minutes to read in the ute."
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ground-raised" aria-labelledby="how-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="how-heading" className="text-title text-ink">
              How Reputrail works
            </h2>
            <p className="mt-5 max-w-[30rem] text-lede text-ink-soft">
              A dated record of your reputation, kept by a person, with your approval on
              everything that goes public.
            </p>
            <div className="mt-8 hidden lg:block">
              <ButtonLink href="/audit" variant="primary-light">
                Get your free reputation audit
              </ButtonLink>
            </div>
          </Reveal>

          <ol className="relative">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={Math.min(i * 60, 240)}
                className="grid grid-cols-[4.5rem_1fr] gap-x-5 border-t rule py-7 first:border-t-0 first:pt-0 md:grid-cols-[6rem_1fr] md:gap-x-8"
              >
                <div className="pt-1 font-mono text-mono uppercase tracking-[0.06em] text-green-mid">
                  {s.when}
                </div>
                <div className="min-w-0">
                  <h3 className="text-heading text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-body text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="lg:hidden">
            <ButtonLink href="/audit" variant="primary-light" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
