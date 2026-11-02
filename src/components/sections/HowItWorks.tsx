import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

const steps = [
  {
    n: "01",
    title: "Understand your business",
    body: "A 30-minute call. How you talk to customers, what you’ll offer when something goes wrong, who approves what. We write it down so every reply sounds like you.",
  },
  {
    n: "02",
    title: "Monitor and respond",
    body: "Every working day a person reads your new reviews on Google, hipages and Facebook, drafts replies in your voice and sends them to you to approve by text.",
  },
  {
    n: "03",
    title: "Escalate and recover",
    body: "Negative reviews reach you the same working day with our read on the problem and a suggested fix. If a call could win the customer back, we brief you before you ring.",
  },
  {
    n: "04",
    title: "Report and improve",
    body: "One page a month. What came in, how it was handled, how you compare with three local competitors and what customers keep saying.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="raised" labelledBy="how-heading">
      <SectionHeading
        id="how-heading"
        title="We handle the reviews. You run the business."
        lede="Four steps, done by people, with your approval at every point that matters."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-md border rule bg-line md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 80} className="bg-ground-raised p-6 md:p-7">
            <span className="text-small tabular text-accent">{s.n}</span>
            <h3 className="mt-6 text-heading text-ink">{s.title}</h3>
            <p className="mt-3 text-small text-ink-soft">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
