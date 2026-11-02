import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

/**
 * An illustrative one-page audit for a fictional painting business.
 * Every figure here is invented for illustration and labelled as such.
 */
const snapshot = [
  { name: "Harbourline Air (example)", rating: "4.3", reviews: 41, replied: "34%", you: true },
  { name: "Competitor A", rating: "4.8", reviews: 128, replied: "91%" },
  { name: "Competitor B", rating: "4.6", reviews: 77, replied: "62%" },
  { name: "Competitor C", rating: "4.1", reviews: 23, replied: "9%" },
];

const findings = [
  {
    label: "Unanswered",
    value: "27 of 41",
    note: "reviews have no reply, including all four 1–2 star reviews from the last 18 months.",
  },
  {
    label: "Last review",
    value: "63 days",
    note: "ago. Competitor A averages a new review every six days. Google favours recent reviews when it ranks local businesses."
  },
  {
    label: "Praise",
    value: "Tidy install, on time",
    note: "appear in 29 of 35 positive reviews. Nobody is saying it in your Google Business Profile description.",
  },
  {
    label: "Complaints",
    value: "Callbacks",
    note: "after a fault are the theme in every negative review. The install is never the problem; the follow-up when something stops working is.",
  },
];

const plan = [
  "Reply to all 27 unanswered reviews over two weeks, oldest first, in your voice, each approved by you.",
  "Set up the review-request workflow for completed jobs. At your current volume that’s roughly 15 requests a month.",
  "Add a one-line ‘faults reported before noon get a call back the same day’ promise to invoices and the profile, then watch the complaint theme.",
];

export function ExampleAudit() {
  return (
    <section id="example-audit" className="bg-ground" aria-labelledby="audit-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2 id="audit-heading" className="text-title text-ink">
              What the free audit looks like
            </h2>
            <p className="mt-5 max-w-[30rem] text-lede text-ink-soft">
              One page. Your numbers next to three local competitors, what customers keep saying,
              and the three things we’d fix first. You keep it whether or not you hire us.
            </p>
            <p className="mt-5 max-w-[30rem] text-small text-ink-soft">
              The example on the right is for a fictional business. Every figure in it is
              invented to show the format. We have no customer results to show yet and won’t
              pretend otherwise.
            </p>
            <div className="mt-8">
              <ButtonLink href="/audit" variant="primary-light">
                Get your free reputation audit
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="min-w-0 rounded-md border rule bg-ground-raised shadow-lift">
            <div className="flex flex-col gap-1 border-b rule px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between md:px-8">
              <div>
                <p className="text-heading text-ink">Reputation audit</p>
                <p className="mt-0.5 text-small text-ink-soft">
                  Harbourline Air Conditioning · Sutherland Shire, Sydney
                </p>
              </div>
              <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-faint">
                Illustrative example
              </p>
            </div>

            <div className="px-5 py-6 md:px-8">
              <h3 className="text-small font-semibold text-ink">Where you stand</h3>
              <div
                className="mt-3 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stamp"
                tabIndex={0}
                role="region"
                aria-label="Rating, review count and reply rate compared with three competitors"
              >
                <table className="w-full min-w-[22rem] border-collapse text-small">
                  <thead>
                    <tr className="border-b rule text-left font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                      <th scope="col" className="py-2 pr-4 font-medium">
                        Business
                      </th>
                      <th scope="col" className="py-2 pr-4 text-right font-medium">
                        Rating
                      </th>
                      <th scope="col" className="py-2 pr-4 text-right font-medium">
                        Reviews
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Replied
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshot.map((r) => (
                      <tr
                        key={r.name}
                        className={`border-b rule ${r.you ? "font-semibold text-ink" : "text-ink-soft"}`}
                      >
                        <td className="py-2.5 pr-4">{r.name}</td>
                        <td className="py-2.5 pr-4 text-right font-mono tabular">{r.rating}</td>
                        <td className="py-2.5 pr-4 text-right font-mono tabular">{r.reviews}</td>
                        <td className="py-2.5 text-right font-mono tabular">{r.replied}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-8 text-small font-semibold text-ink">What we found</h3>
              <dl className="mt-3 grid border-t rule sm:grid-cols-2 sm:gap-x-8">
                {findings.map((f) => (
                  <div key={f.label} className="border-b rule py-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-small text-ink-soft">
                      <span className="font-semibold text-ink">{f.value}</span> {f.note}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-8 text-small font-semibold text-ink">First 30 days</h3>
              <ol className="mt-3 grid gap-2.5">
                {plan.map((p, i) => (
                  <li key={p} className="grid grid-cols-[1.5rem_1fr] gap-x-2 text-small text-ink-soft">
                    <span className="font-mono tabular text-ink-faint">{i + 1}.</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center justify-between gap-4 border-t rule px-5 py-4 font-mono text-mono text-ink-faint md:px-8">
              <span>Prepared by Reputrail · fictional data</span>
              <span>Page 1 of 1</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
