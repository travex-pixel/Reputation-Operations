import type { MonthlyReport } from "@/lib/domain/types";
import { deriveKpis, formatDelta, formatKpiValue, periodLabel, type Kpi } from "@/lib/report/kpis";
import { computeReputrailScore, scoreBand } from "@/lib/score/reputrailScore";
import { TagMark } from "@/components/Wordmark";
import { Chip, fmtDate } from "./ui";

const CATEGORIES: Kpi["category"][] = ["Reputation", "Customer recovery", "Business performance", "Owner time saved"];

export function ReportDocument({ report, clientName }: { report: MonthlyReport; clientName: string }) {
  const { inputs: i, previous } = report;
  const kpis = deriveKpis(i, previous);
  const score = computeReputrailScore(i, previous);
  const band = scoreBand(score.total);

  const headline = buildExecutiveSummary(kpis, score.total, clientName, !!previous);

  return (
    <article className="ws-doc ws-print-page mx-auto max-w-[52rem] p-7 text-ink md:p-10">
      <header className="flex flex-col gap-4 border-b rule pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            <TagMark className="h-5 w-5 text-field" /> Monthly report
          </div>
          <h1 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.025em] opsz-display">{clientName}</h1>
          <p className="mt-1 text-small text-ink-soft">{periodLabel(i.periodStart, i.periodEnd)}</p>
        </div>
        <div className="text-[0.8125rem] text-ink-faint sm:text-right">
          <div>Prepared {fmtDate(report.createdAt)}</div>
          <div>{i.preparedBy ? `by ${i.preparedBy}, Reputrail` : "by Reputrail"}</div>
        </div>
      </header>

      {/* Score */}
      <section className="mt-7 grid gap-5 rounded-md bg-field p-5 text-ink-on-field sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="text-center sm:pr-6 sm:text-left">
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-on-field-soft">Reputrail Score</div>
          <div className="mt-1 text-[3.25rem] font-semibold leading-none tracking-[-0.04em] tabular opsz-display">{score.total === null ? "—" : score.total}</div>
          <div className="mt-1 text-small text-stamp">{band.label}</div>
        </div>
        <div className="grid gap-2.5">
          {score.components.map((c) => (
            <div key={c.key} className="grid grid-cols-[9.5rem_1fr_3rem] items-center gap-3 text-[0.8125rem]">
              <span className="text-ink-on-field-soft">{c.label}</span>
              <div className="ws-meter" data-tone={c.points === null ? "warn" : (c.points / c.weight) >= 0.7 ? "good" : (c.points / c.weight) >= 0.45 ? "warn" : "bad"}>
                <span style={{ width: `${c.points === null ? 0 : (c.points / c.weight) * 100}%` }} />
              </div>
              <span className="text-right tabular text-ink-on-field">{c.points === null ? "n/a" : `${c.points}/${c.weight}`}</span>
            </div>
          ))}
          <p className="text-[0.75rem] leading-relaxed text-ink-on-field-soft">{band.description} {score.caveats[0]}</p>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-[1.0625rem] font-semibold">Executive summary</h2>
        <p className="mt-2 text-small text-ink-soft">{headline}</p>
      </section>

      {CATEGORIES.map((cat) => {
        const rows = kpis.filter((k) => k.category === cat);
        return (
          <section key={cat} className="mt-7">
            <h2 className="text-[1.0625rem] font-semibold">{cat}</h2>
            <table className="mt-2 w-full border-collapse text-small">
              <thead>
                <tr className="border-b rule text-left font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                  <th className="py-1.5 pr-3 font-medium">Measure</th>
                  <th className="py-1.5 pr-3 text-right font-medium">This period</th>
                  <th className="py-1.5 pr-3 text-right font-medium">Previous</th>
                  <th className="py-1.5 pr-3 text-right font-medium">Change</th>
                  <th className="py-1.5 text-right font-medium">Basis</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((k) => {
                  const d = formatDelta(k);
                  return (
                    <tr key={k.key} className="border-b rule align-top">
                      <td className="py-2 pr-3">
                        <div className="text-ink">{k.label}</div>
                        <div className="text-[0.75rem] text-ink-faint">{k.derivation}</div>
                      </td>
                      <td className="py-2 pr-3 text-right font-semibold tabular">{formatKpiValue(k)}</td>
                      <td className="py-2 pr-3 text-right tabular text-ink-soft">{k.previous === null ? "—" : formatKpiValue({ ...k, value: k.previous })}</td>
                      <td className={`py-2 pr-3 text-right tabular ${d.tone === "good" ? "text-green-mid" : d.tone === "bad" ? "text-signal-ink" : "text-ink-faint"}`}>{d.text}</td>
                      <td className="py-2 text-right">
                        <Chip tone={k.attribution === "actual" ? "good" : k.attribution === "estimate" ? "warn" : "neutral"}>{k.attribution}</Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {cat === "Customer recovery" && i.recovery.recurringThemes ? (
              <p className="mt-2 text-small text-ink-soft">
                <span className="font-semibold text-ink">Recurring themes: </span>
                {i.recovery.recurringThemes}
              </p>
            ) : null}
            {cat === "Business performance" ? (
              <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-faint">
                Attribution: business figures are {i.business.businessDataSource ? `supplied by ${i.business.businessDataSource}` : "not yet supplied"}. Reputation work correlates with enquiries; it is one input among season, advertising and word of mouth. Revenue is only counted as attributable where the customer said reviews or a recovery call influenced them, and it is always an estimate.
              </p>
            ) : null}
          </section>
        );
      })}

      <section className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[1.0625rem] font-semibold">Key observations</h2>
          <p className="mt-2 whitespace-pre-line text-small text-ink-soft">{i.observations || "No observations recorded for this period."}</p>
        </div>
        <div>
          <h2 className="text-[1.0625rem] font-semibold">Recommended actions for next month</h2>
          <p className="mt-2 whitespace-pre-line text-small text-ink-soft">{i.recommendedActions || "No recommendations recorded."}</p>
        </div>
      </section>

      <footer className="mt-7 border-t rule pt-4 text-[0.75rem] leading-relaxed text-ink-faint">
        <p>
          <strong className="text-ink">Basis.</strong> <em>Actual</em> figures come from Reputrail’s log or the public profile. <em>Estimate</em> figures are derived or owner-supplied approximations. <em>Unverified</em> means not supplied this period; a dash is never a zero. The Reputrail Score measures management quality, not whether reviews are positive; a legitimate negative review that was answered, escalated and resolved earns full marks. {score.caveats.slice(1).join(" ")}
        </p>
      </footer>
    </article>
  );
}

export function buildExecutiveSummary(kpis: Kpi[], score: number | null, clientName: string, hasPrevious: boolean): string {
  const get = (key: string) => kpis.find((k) => k.key === key);
  const parts: string[] = [];
  const nr = get("newReviews");
  const cov = get("coverage");
  const neg = get("negCoverage");
  const res = get("resolved");
  const issues = get("issues");
  const saved = get("saved");
  if (nr?.value !== null && nr?.value !== undefined) {
    parts.push(`${clientName} received ${nr.value} new genuine review${nr.value === 1 ? "" : "s"}${hasPrevious && nr.previous !== null ? ` (${nr.previous} last period)` : ""}.`);
  }
  if (cov?.value !== null && cov?.value !== undefined) parts.push(`${cov.value}% of new reviews were answered${neg?.value !== null && neg?.value !== undefined ? `, including ${neg.value}% of negative reviews` : ""}.`);
  if (issues?.value !== null && issues?.value !== undefined) {
    parts.push(
      issues.value === 0
        ? "No customer issues were identified."
        : `${issues.value} customer issue${issues.value === 1 ? " was" : "s were"} identified${res?.value !== null && res?.value !== undefined ? ` and ${res.value} resolved` : ""}.`,
    );
  }
  if (saved?.value !== null && saved?.value !== undefined) parts.push(`An estimated ${saved.value} hour${saved.value === 1 ? "" : "s"} of owner time was saved.`);
  if (score !== null) parts.push(`Reputrail Score ${score}/100.`);
  return parts.join(" ") || "Insufficient data was supplied for a summary this period.";
}
