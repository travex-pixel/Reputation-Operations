import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";
import { site } from "@/lib/site";

const fmt = (n: number) => `A$${n.toLocaleString("en-AU")}`;

export function Pricing() {
  const { plans, pilot } = site.pricing;
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        title="Straightforward pricing. No lock-in."
        lede="Month to month. No set-up fee. Cancel any time and your plan ends with the month you’ve paid for. Prices exclude GST."
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {plans.map((p, i) => {
          const featured = "featured" in p && p.featured;
          return (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 80}
              className={`flex flex-col rounded-md border bg-ground-raised p-6 md:p-8 ${featured ? "border-accent shadow-lift" : "rule"}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-heading text-ink">{p.name}</h3>
                {featured ? <span className="label text-accent">Recommended</span> : null}
              </div>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-[2.25rem] font-semibold leading-none tracking-[-0.03em] tabular text-ink">{fmt(p.price)}</span>
                <span className="text-small text-ink-faint">a month</span>
              </p>
              <p className="mt-4 text-body text-ink-soft">{p.summary}</p>
              <ul className="mt-6 grid gap-2.5 border-t rule pt-6 text-small text-ink-soft">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <svg className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.8125rem] text-ink-faint">{p.fit}</p>
              <ButtonLink href="/audit" variant={featured ? "primary" : "secondary"} className="mt-8 w-full">
                Get your free reputation audit
              </ButtonLink>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-10 grid gap-6 rounded-md border rule bg-ground-sunken/70 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <h3 className="text-heading text-ink">{pilot.label}</h3>
          <p className="mt-2 max-w-[42rem] text-body text-ink-soft">
            For our first three Sydney customers: the Managed plan at {fmt(pilot.price)} {pilot.period}. Nothing renews
            automatically. Around day 25 we ask what you’d like to do next, and either way the audit and report are yours to keep.
          </p>
        </div>
        <p className="text-small text-ink-faint md:text-right">
          Three places.
          <br />
          Audit first, no obligation.
        </p>
      </Reveal>
    </Section>
  );
}
