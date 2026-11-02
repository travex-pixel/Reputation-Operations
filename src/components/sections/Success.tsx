import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

/**
 * How success is measured: the four reporting categories, the Reputrail Score,
 * and an illustrative monthly report for a fictional business. Every figure is
 * invented and labelled as such.
 */

const categories = [
  {
    name: "Reputation",
    what: "New genuine reviews, average rating and trend, how many reviews and negative reviews got a reply, median response time.",
  },
  {
    name: "Customer recovery",
    what: "Issues identified, escalated to you, customers contacted, issues resolved, recurring complaint themes, follow-ups still open.",
  },
  {
    name: "Business performance",
    what: "Calls and website clicks from your Google profile, enquiries, quotes and jobs won, as you report them to us. Always labelled as supplied, never claimed as caused by us.",
  },
  {
    name: "Owner time saved",
    what: "The hours you used to spend on reviews and complaints, the hours now handled by Reputrail, and the difference. Capped at what you told us you spent.",
  },
];

const score = [
  { label: "Review management", weight: 25, points: 23 },
  { label: "Customer recovery", weight: 30, points: 27 },
  { label: "Reputation growth", weight: 25, points: 19 },
  { label: "Business insight and reporting", weight: 20, points: 20 },
];

const kpis = [
  { label: "New genuine reviews", now: "7", prev: "3", good: true },
  { label: "Reviews answered", now: "100%", prev: "40%", good: true },
  { label: "Negative reviews answered", now: "2 of 2", prev: "0 of 1", good: true },
  { label: "Median response time", now: "19h", prev: "6 days", good: true },
  { label: "Issues escalated · resolved", now: "2 · 2", prev: "—", good: true },
  { label: "Profile calls (owner-supplied)", now: "41", prev: "33", good: true },
  { label: "Owner hours saved (est.)", now: "5h", prev: "—", good: true },
];

export function Success() {
  const total = score.reduce((a, s) => a + s.points, 0);
  return (
    <section id="success" className="bg-ground-raised" aria-labelledby="success-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="success-heading" className="text-title text-ink">
              How we measure whether it’s working
            </h2>
            <p className="mt-5 max-w-[30rem] text-lede text-ink-soft">
              We make sure no complaint, piece of feedback or reputation opportunity falls through
              the cracks, and we show you exactly what we did about it. Every month, one page, four
              categories, and a score for how well your reputation is being managed.
            </p>
            <dl className="mt-8 grid gap-4 border-t rule pt-6">
              {categories.map((c) => (
                <div key={c.name} className="grid gap-1">
                  <dt className="text-heading text-ink">{c.name}</dt>
                  <dd className="text-small text-ink-soft">{c.what}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-[30rem] text-small text-ink-soft">
              <span className="font-semibold text-ink">The Reputrail Score</span> (out of 100) measures
              management quality, not whether every review is glowing. A legitimate two-star review
              that was answered within a day, escalated and resolved earns full marks. Weights:
              review management 25, customer recovery 30, reputation growth 25, insight and
              reporting 20.
            </p>
            <div className="mt-8">
              <ButtonLink href="/audit" variant="primary-light">
                Get your free reputation audit
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="min-w-0 self-start rounded-md border rule bg-ground shadow-lift">
            <div className="flex flex-col gap-1 border-b rule px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between md:px-8">
              <div>
                <p className="text-heading text-ink">Monthly report</p>
                <p className="mt-0.5 text-small text-ink-soft">Harbourline Air Conditioning · October</p>
              </div>
              <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-faint">Illustrative example</p>
            </div>

            <div className="grid gap-5 px-5 py-6 md:px-8 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="rounded-sm bg-field px-5 py-4 text-ink-on-field sm:min-w-[11rem]">
                <div className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-on-field-soft">Reputrail Score</div>
                <div className="mt-1 text-[3rem] font-semibold leading-none tracking-[-0.04em] tabular opsz-display">{total}</div>
                <div className="mt-1 text-small text-stamp">In good hands</div>
              </div>
              <ul className="grid gap-2">
                {score.map((s) => (
                  <li key={s.label} className="grid grid-cols-[9.5rem_1fr_3rem] items-center gap-3 text-[0.8125rem]">
                    <span className="text-ink-soft">{s.label}</span>
                    <span className="relative h-2 overflow-hidden rounded-full bg-ground-sunken" aria-hidden="true">
                      <span className="absolute inset-y-0 left-0 rounded-full bg-green-bright" style={{ width: `${(s.points / s.weight) * 100}%` }} />
                    </span>
                    <span className="text-right tabular text-ink">
                      {s.points}/{s.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 pb-6 md:px-8">
              <h3 className="text-small font-semibold text-ink">Against last month</h3>
              <div className="mt-2 overflow-x-auto" tabIndex={0} role="region" aria-label="Illustrative key measures compared with the previous month">
                <table className="w-full min-w-[22rem] border-collapse text-small">
                  <thead>
                    <tr className="border-b rule text-left font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                      <th scope="col" className="py-2 pr-4 font-medium">Measure</th>
                      <th scope="col" className="py-2 pr-4 text-right font-medium">October</th>
                      <th scope="col" className="py-2 text-right font-medium">September</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpis.map((k) => (
                      <tr key={k.label} className="border-b rule">
                        <td className="py-2 pr-4 text-ink-soft">{k.label}</td>
                        <td className="py-2 pr-4 text-right font-mono tabular font-semibold text-ink">{k.now}</td>
                        <td className="py-2 text-right font-mono tabular text-ink-faint">{k.prev}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-small text-ink-soft">
                <span className="font-semibold text-ink">What we’d do next month: </span>
                confirm bookings by text the day before; timeliness was the theme in both negative reviews.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-t rule px-5 py-4 font-mono text-mono text-ink-faint md:px-8">
              <span>Fictional business and figures</span>
              <span>Page 1 of 1</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
