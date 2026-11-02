import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

const points = [
  {
    title: "Reviews go unanswered",
    body: "A two-star review with no reply is the first thing the next customer reads. Silence looks like you don’t care, even when you do.",
  },
  {
    title: "Complaints get ignored or handled badly",
    body: "A rushed reply at the end of a long day makes it worse. A calm one, the same evening, usually fixes it.",
  },
  {
    title: "Happy customers never get asked",
    body: "Most customers would leave a review if someone asked them properly. Most never are, so the unhappy few set the tone.",
  },
];

export function Problem() {
  return (
    <Section id="problem" tone="raised" labelledBy="problem-heading">
      <SectionHeading
        id="problem-heading"
        title="A bad review shouldn’t cost you the next job."
        lede="You do good work. The problem is what happens online while you’re busy doing it."
      />
      <ol className="mt-14 grid gap-10 border-t rule pt-10 md:grid-cols-3 md:gap-8">
        {points.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 80}>
            <span className="text-small tabular text-ink-faint">0{i + 1}</span>
            <h3 className="mt-3 text-heading text-ink">{p.title}</h3>
            <p className="mt-3 max-w-[22rem] text-body text-ink-soft">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
