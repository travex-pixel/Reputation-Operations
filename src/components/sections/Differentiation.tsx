import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

const points = [
  {
    title: "Someone you can call",
    body: "Someone looking after your reviews who picks up the phone. Not a ticket queue, not a chatbot.",
  },
  {
    title: "Replies in your voice",
    body: "We learn how you talk to customers and write the way you would, so nobody can tell you didn’t.",
  },
  {
    title: "Problems handled, not notifications sent",
    body: "Apps tell you a review arrived and leave the rest to you. We read it, work out what went wrong and bring you a plan.",
  },
];

export function Differentiation() {
  return (
    <Section id="why" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        title="A person, not another platform."
        lede="Software helps us keep up. People do the work."
        align="center"
      />
      <ul className="mt-14 grid gap-10 border-t rule pt-10 md:grid-cols-3 md:gap-8">
        {points.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 80}>
            <h3 className="text-heading text-ink">{p.title}</h3>
            <p className="mt-3 max-w-[22rem] text-body text-ink-soft">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
