import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

const services = [
  {
    name: "Review monitoring",
    what: "Google, hipages and Facebook checked every working day by a person, with a written log of every review and what was done.",
  },
  {
    name: "Response management",
    what: "A reply drafted the way you’d say it, for every review, good or bad. Published only after your approval, under your name."
  },
  {
    name: "Negative-feedback escalation",
    what: "Bad reviews reach your phone the same working day with a plain read on what happened and what to do. Policy-breaching reviews are flagged to Google with your approval.",
  },
  {
    name: "Customer recovery",
    what: "When a call can win the customer back, we brief you before you dial, suggest what to offer, and log the outcome. You make the call; it has to be you.",
  },
  {
    name: "Genuine review requests",
    what: "A short, honest request to every customer you nominate after a completed job, with a working unsubscribe. Never incentives, never selective.",
  },
  {
    name: "Competitor monitoring",
    what: "Ratings, review volume and reply rates for the local competitors you care about, so you know where you stand before the customer does.",
  },
  {
    name: "Sentiment analysis",
    what: "What customers keep praising and complaining about, in their words, grouped so you can fix the cause."
  },
  {
    name: "Monthly reporting",
    what: "A one-page report every month: what came in, what we did, how you compare, and what we recommend next.",
  },
];

function Tick({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3 8.5l3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Services() {
  const { plans, pilot } = site.pricing;
  return (
    <section id="services" className="bg-ground" aria-labelledby="services-heading">
      <div className="container-x py-20 md:py-28">
        <Reveal className="max-w-[44rem]">
          <h2 id="services-heading" className="text-title text-ink">
            What you get
          </h2>
          <p className="mt-5 text-lede text-ink-soft">
            Everything below is done for you by a named person. Software helps with the
            repetitive drafting; it never talks to your customers.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-0 border-t rule md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              delay={Math.min((i % 2) * 70, 140)}
              className="grid grid-cols-[1.25rem_1fr] gap-x-3 border-b rule py-6 md:py-7"
            >
              <Tick className="mt-1.5 h-4 w-4 text-green-mid" />
              <div className="min-w-0">
                <h3 className="text-heading text-ink">{s.name}</h3>
                <p className="mt-2 text-body text-ink-soft">{s.what}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Plans */}
        <div id="pricing" className="on-field mt-16 rounded-md bg-field text-ink-on-field md:mt-20">
          <div className="grid gap-8 border-b rule-on-field px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <Reveal>
              <h3 className="text-title text-ink-on-field">Plain pricing, month to month.</h3>
              <p className="mt-4 max-w-[30rem] text-body text-ink-on-field-soft">
                Prices in Australian dollars. No set-up fee, no 12-month lock-in. Cancel any
                time; your plan simply ends at the end of the month you’ve paid for. We’ll tell
                you honestly if a cheaper plan would do.
              </p>
            </Reveal>

            <Reveal delay={80} className="self-start border-t rule-on-field pt-5">
              <h4 className="text-heading text-ink-on-field">
                {pilot.label}: <span className="tabular">A${pilot.price}</span> {pilot.period}
              </h4>
              <p className="mt-2 text-small text-ink-on-field-soft">
                The full Managed service for one month at the Essential price, for the first
                three Sydney businesses to come on board. Nothing renews automatically: around
                day 25 we ask whether you want to keep going, change plan, or stop. The audit and
                the month’s record are yours either way.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px bg-line-on-field md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 80}
                className={`flex flex-col px-6 py-8 md:px-8 md:py-10 ${
                  "featured" in p && p.featured ? "bg-field-raised" : "bg-field"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-heading text-ink-on-field">{p.name}</h4>
                  {"featured" in p && p.featured ? (
                    <span className="whitespace-nowrap text-small font-semibold text-ink-on-field-soft">
                      Our recommendation
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-ink-on-field tabular opsz-display">
                  A${p.price}
                  <span className="ml-1 text-small font-normal tracking-normal text-ink-on-field-soft opsz-text">
                    /month
                  </span>
                </p>
                <p className="mt-3 text-body text-ink-on-field">{p.summary}</p>
                <ul className="mb-6 mt-6 grid gap-3 border-t rule-on-field pt-6 text-small text-ink-on-field-soft">
                  {p.includes.map((line) => (
                    <li key={line} className="grid grid-cols-[1rem_1fr] gap-x-2.5">
                      <Tick className="mt-1 h-3.5 w-3.5 text-green-bright" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t rule-on-field pt-5 text-small leading-relaxed text-ink-on-field-soft">
                  <span className="font-semibold text-ink-on-field">Best for: </span>
                  {p.fit}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t rule-on-field px-6 py-6 text-small text-ink-on-field-soft sm:flex-row sm:items-center sm:justify-between md:px-10">
            <p>Not sure which plan? The audit tells us. Start there.</p>
            <ButtonLink href="/audit" size="md" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
