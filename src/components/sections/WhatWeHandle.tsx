import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { serviceGroups } from "@/lib/site";

export function WhatWeHandle() {
  return (
    <Section id="services" tone="raised" labelledBy="services-heading">
      <SectionHeading id="services-heading" title="Everything taken care of." lede="The whole job, not a dashboard that leaves it to you." />
      <div className="mt-10 grid gap-10 border-t rule pt-8 sm:grid-cols-2 md:mt-14 md:pt-10 lg:grid-cols-4 lg:gap-8">
        {serviceGroups.map((g, i) => (
          <Reveal key={g.name} delay={i * 80}>
            <h3 className="text-heading text-ink">{g.name}</h3>
            <ul className="mt-4">
              {g.items.map((item) => (
                <li key={item} className="border-t rule py-3 text-small text-ink-soft first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
