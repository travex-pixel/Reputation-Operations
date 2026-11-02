import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { trades } from "@/lib/site";

export function WhoWeHelp() {
  return (
    <Section id="who" labelledBy="who-heading">
      <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading
          id="who-heading"
          title="Built for businesses where trust wins work."
          lede="Sydney trades and home services. Work that customers can’t judge until it’s done, so they judge you first."
          className="lg:sticky lg:top-24 lg:self-start"
        />
        <ul className="grid border-t rule sm:grid-cols-2 sm:gap-x-10">
          {trades.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 50} className="border-b rule py-5">
              <h3 className="text-heading text-ink">{t.name}</h3>
              <p className="mt-1.5 text-small text-ink-soft">{t.why}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
