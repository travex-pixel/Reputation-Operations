import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { serviceGroups } from "@/lib/site";

export function WhatWeHandle() {
  return (
    <Section id="services" tone="raised" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        title="Everything taken care of."
        lede="The whole job, not a dashboard that leaves it to you."
      />
      <div className="mt-14 grid gap-10 border-t rule pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {serviceGroups.map((g, i) => (
          <Reveal key={g.name} delay={i * 80}>
            <h3 className="text-heading text-ink">{g.name}</h3>
            <ul className="mt-4 grid gap-3">
              {g.items.map((item) => (
                <li key={item} className="flex gap-3 text-small text-ink-soft">
                  <svg className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                    <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
