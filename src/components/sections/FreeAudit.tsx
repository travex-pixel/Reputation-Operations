import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";

const points = [
  { title: "Where you stand", body: "Your rating, reply rate and newest review next to three competitors near you." },
  { title: "What customers are saying", body: "The themes in your reviews, good and bad." },
  { title: "What we’d fix first", body: "Three things, in order, with or without us." },
];

/** A fictional audit, typeset like the one-page document a customer receives. */
function ReportPreview() {
  return (
    <figure
      aria-label="Illustrative example of the one-page reputation audit, using a fictional business"
      className="rounded-md border rule bg-ground-raised p-6 shadow-float md:p-8"
    >
      <figcaption className="flex items-center justify-between gap-4 text-[0.8125rem] text-ink-faint">
        <span>Reputation audit</span>
        <span>Illustrative example</span>
      </figcaption>
      <h3 className="mt-4 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">Example Plumbing Co.</h3>
      <p className="text-small text-ink-faint">Inner West, Sydney · one page</p>

      <table className="mt-6 w-full text-small">
        <caption className="sr-only">Rating, reviews and reply rate compared with three nearby competitors</caption>
        <thead>
          <tr className="text-left text-[0.6875rem] uppercase tracking-[0.06em] text-ink-faint">
            <th scope="col" className="pb-2 font-medium">Business</th>
            <th scope="col" className="pb-2 pl-3 text-right font-medium">Rating</th>
            <th scope="col" className="pb-2 pl-3 text-right font-medium">Reviews</th>
            <th scope="col" className="pb-2 pl-3 text-right font-medium">Replied</th>
          </tr>
        </thead>
        <tbody className="tabular">
          {[
            ["Example Plumbing Co.", "4.3", "41", "12%", true],
            ["Competitor A", "4.8", "212", "94%", false],
            ["Competitor B", "4.6", "97", "61%", false],
            ["Competitor C", "4.1", "28", "0%", false],
          ].map(([name, r, n, rep, you]) => (
            <tr key={String(name)} className={`border-t rule ${you ? "font-semibold text-ink" : "text-ink-soft"}`}>
              <td className="py-2.5 pr-3">{name}</td>
              <td className="py-2.5 pl-3 text-right">{r}</td>
              <td className="py-2.5 pl-3 text-right">{n}</td>
              <td className="py-2.5 pl-3 text-right">{rep}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 border-t rule pt-5">
        <p className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-faint">What we’d fix first</p>
        <ol className="mt-3 grid gap-2.5 text-small text-ink-soft">
          <li className="grid grid-cols-[1.25rem_1fr] gap-2"><span className="tabular text-ink">1.</span>Reply to the four unanswered reviews, starting with the two-star from March.</li>
          <li className="grid grid-cols-[1.25rem_1fr] gap-2"><span className="tabular text-ink">2.</span>Ask the last 20 jobs for a review. Your newest is 14 months old.</li>
          <li className="grid grid-cols-[1.25rem_1fr] gap-2"><span className="tabular text-ink">3.</span>Add after-hours contact details; three reviews mention not reaching you.</li>
        </ol>
      </div>
    </figure>
  );
}

export function FreeAudit() {
  return (
    <Section id="audit" tone="raised" labelledBy="audit-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
        <div>
          <SectionHeading
            id="audit-heading"
            title="See where your reputation stands."
            lede="Send us your business name. Two working days later, one page shows you three things."
          />
          <ol className="mt-8 grid gap-6 border-t rule pt-8 md:mt-10">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="grid grid-cols-[2rem_1fr] gap-x-4">
                <span className="pt-0.5 text-small tabular text-ink-faint">{i + 1}.</span>
                <div>
                  <h3 className="text-heading text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-small text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={240} className="mt-10">
            <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
            <p className="mt-4 text-small text-ink-faint">No logins needed. We only use what’s public.</p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <ReportPreview />
        </Reveal>
      </div>
    </Section>
  );
}
