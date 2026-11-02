import type { Audit } from "@/lib/domain/types";
import { TagMark } from "@/components/Wordmark";
import { VerifyChip, fmtDate } from "./ui";

/**
 * The audit as a one-to-two-page document. Pure render; also used for print.
 * Supplied observations and analysis are visibly separated.
 */
export function AuditDocument({ audit }: { audit: Audit }) {
  const { inputs: i, analysis: a } = audit;
  return (
    <article className="ws-doc ws-print-page mx-auto max-w-[52rem] p-7 text-ink md:p-10">
      <header className="flex flex-col gap-4 border-b rule pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            <TagMark className="h-5 w-5 text-field" /> Reputation audit
          </div>
          <h1 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.025em] opsz-display">{i.businessName || "Business name"}</h1>
          <p className="mt-1 text-small text-ink-soft">
            {i.trade}
            {i.suburb ? ` · ${i.suburb}` : ""}
            {i.website ? ` · ${i.website.replace(/^https?:\/\//, "")}` : ""}
          </p>
        </div>
        <div className="text-[0.8125rem] text-ink-faint sm:text-right">
          <div>Prepared {fmtDate(i.preparedOn)}</div>
          <div>{i.preparedBy ? `by ${i.preparedBy}, Reputrail` : "by Reputrail"}</div>
          <div className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em]">Based on {i.reviewsInspected} review{i.reviewsInspected === 1 ? "" : "s"} read</div>
        </div>
      </header>

      <section className="mt-7">
        <h2 className="text-[1.0625rem] font-semibold">Where you stand</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {a.snapshot.map((s) => (
            <div key={s.label} className="rounded-sm border rule bg-white/60 p-3">
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">{s.label}</dt>
              <dd className="mt-0.5 text-[1.375rem] font-semibold tabular opsz-display">{s.value}</dd>
              <dd className="mt-0.5 flex items-center justify-between gap-2 text-[0.75rem] text-ink-faint">
                <span>{s.note}</span>
                <VerifyChip v={s.verification} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[1.0625rem] font-semibold">What customers praise</h2>
          <ul className="mt-2 grid gap-1.5 text-small text-ink-soft">
            {a.positiveThemes.map((t, k) => (
              <li key={k} className="grid grid-cols-[0.75rem_1fr] gap-2">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-green-bright" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[1.0625rem] font-semibold">Improvement opportunities</h2>
          <ul className="mt-2 grid gap-1.5 text-small text-ink-soft">
            {a.improvementOpportunities.map((t, k) => (
              <li key={k} className="grid grid-cols-[0.75rem_1fr] gap-2">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-stamp" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[1.0625rem] font-semibold">Response coverage</h2>
          <p className="mt-2 text-small text-ink-soft">{a.responseCoverage}</p>
        </div>
        <div>
          <h2 className="text-[1.0625rem] font-semibold">Negative-review handling</h2>
          <p className="mt-2 text-small text-ink-soft">{a.negativeHandling}</p>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-[1.0625rem] font-semibold">Competitor comparison</h2>
        {i.competitors.some((c) => c.name.trim()) ? (
          <table className="mt-3 w-full border-collapse text-small">
            <thead>
              <tr className="border-b rule text-left font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                <th className="py-1.5 pr-3 font-medium">Business</th>
                <th className="py-1.5 pr-3 text-right font-medium">Rating</th>
                <th className="py-1.5 pr-3 text-right font-medium">Reviews</th>
                <th className="py-1.5 text-right font-medium">Replied</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b rule font-semibold">
                <td className="py-2 pr-3">{i.businessName} (you)</td>
                <td className="py-2 pr-3 text-right tabular">{i.googleRating === null ? "—" : i.googleRating.toFixed(1)}</td>
                <td className="py-2 pr-3 text-right tabular">{i.reviewCount ?? "—"}</td>
                <td className="py-2 text-right tabular">{i.ownerResponsePct === null ? "—" : `${Math.round(i.ownerResponsePct)}%`}</td>
              </tr>
              {i.competitors
                .filter((c) => c.name.trim())
                .map((c) => (
                  <tr key={c.name} className="border-b rule text-ink-soft">
                    <td className="py-2 pr-3">{c.name}</td>
                    <td className="py-2 pr-3 text-right tabular">{c.rating === null ? "—" : c.rating.toFixed(1)}</td>
                    <td className="py-2 pr-3 text-right tabular">{c.reviews ?? "—"}</td>
                    <td className="py-2 text-right tabular">{c.responsePct === null ? "—" : `${Math.round(c.responsePct)}%`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
        <p className="mt-2 text-small text-ink-soft">{a.competitorComparison}</p>
      </section>

      <section className="mt-7">
        <h2 className="text-[1.0625rem] font-semibold">Recommended actions</h2>
        <ol className="mt-2 grid gap-1.5 text-small text-ink-soft">
          {a.recommendedActions.map((t, k) => (
            <li key={k} className="grid grid-cols-[1.5rem_1fr] gap-1">
              <span className="tabular font-semibold text-ink">{k + 1}.</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-7 rounded-sm bg-field p-5 text-ink-on-field">
        <h2 className="text-[1.0625rem] font-semibold">Suggested pilot</h2>
        <p className="mt-2 text-small text-ink-on-field-soft">{a.pilotScope}</p>
      </section>

      <footer className="mt-7 border-t rule pt-4 text-[0.75rem] leading-relaxed text-ink-faint">
        <p>
          <strong className="text-ink">How to read this.</strong> Figures marked <em>Observed</em> were recorded by a person from public listings on the date shown. <em>Unverified</em> means not supplied or not accessible; it is never a zero. Themes and opportunities are our analysis of the supplied observations{a.narrativeSource === "ai" ? ", with wording assisted by Claude and checked by a person" : ""}. No review history was scraped and no account was accessed. Reputrail never promises ratings, rankings or review removal; Google decides removals.
        </p>
        <p className="mt-2">
          Supplied observations ({a.provenance.observed.length}): {a.provenance.observed.join(" · ") || "none recorded"}.
        </p>
      </footer>
    </article>
  );
}
