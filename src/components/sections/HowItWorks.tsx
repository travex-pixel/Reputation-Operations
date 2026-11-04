import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

const steps = [
  {
    n: "01",
    title: "Understand your business",
    body: "A 30-minute call: how you talk to customers, what you’ll offer when something goes wrong, who approves what.",
  },
  {
    n: "02",
    title: "Monitor and respond",
    body: "Every working day a person reads your new reviews, drafts the replies in your voice and sends them to you to approve by text.",
  },
  {
    n: "03",
    title: "Escalate and recover",
    body: "Negative reviews reach you the same day with our read on the problem and a suggested fix. If a call could win the customer back, we brief you first.",
  },
  {
    n: "04",
    title: "Report and improve",
    body: "One page a month: what came in, how it was handled, and what customers keep saying.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="raised" labelledBy="how-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHeading
          id="how-heading"
          title="We handle the reviews. You run the business."
          lede="Four steps, done by people."
          className="lg:sticky lg:top-24 lg:self-start"
        />
        <ol className="border-t rule">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 60} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b rule py-7 md:grid-cols-[5rem_1fr] md:py-8">
              <span className="pt-1 text-[1.25rem] font-semibold leading-none tracking-[-0.02em] tabular text-ink-faint md:text-[1.5rem]">{s.n}</span>
              <div>
                <h3 className="text-heading text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[34rem] text-body text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
