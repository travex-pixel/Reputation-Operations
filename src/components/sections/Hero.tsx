import { ButtonLink, TextLink } from "@/components/Button";
import { Record } from "@/components/Record";

const facts = [
  { title: "From A$299 a month", body: "No lock-in contract" },
  { title: "Sydney-based", body: "A real person you can ring" },
  { title: "Your approval", body: "Nothing published without it" },
];

export function Hero() {
  return (
    <section className="on-field bg-field text-ink-on-field" aria-labelledby="hero-heading">
      <div className="container-x grid gap-9 pb-20 pt-8 md:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:pb-28 lg:pt-20">
        <div className="max-w-[36rem] lg:col-start-1 lg:row-start-1">
          <h1 id="hero-heading" className="text-display text-ink-on-field">
            Someone looking after your reviews who picks up the phone.
          </h1>
          <p className="mt-5 max-w-[32rem] text-lede text-ink-on-field-soft">
            Managed Google reviews for Sydney trade businesses. We watch every review, draft the
            replies, escalate the bad ones the same day and help you win the customer back. You
            stay on the tools.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
            <TextLink href="/#founder" onField>
              Talk to us
            </TextLink>
          </div>
        </div>

        <Record className="w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-2" />

        <ul className="grid max-w-[36rem] gap-3 border-t rule-on-field pt-6 text-small text-ink-on-field-soft sm:grid-cols-3 sm:gap-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          {facts.map((f) => (
            <li key={f.title}>
              <span className="block font-semibold text-ink-on-field tabular">{f.title}</span>
              {f.body}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
