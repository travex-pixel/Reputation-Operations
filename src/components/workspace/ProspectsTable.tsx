"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PROSPECT_STAGES, TRADES, type Prospect, type ProspectStage, type Trade } from "@/lib/domain/types";
import { log, nowIso, today, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { Card, Chip, Empty, Field, Input, Meter, PageHeader, Select, StageChip, WsButton, fmtDate } from "./ui";

type SortKey = "fitScore" | "reviewCount" | "negativePct" | "ownerResponsePct" | "name" | "updatedAt" | "googleRating";

function negativePct(p: Prospect): number | null {
  const neg = (p.oneStar ?? 0) + (p.twoStar ?? 0) + (p.threeStar ?? 0);
  if (p.oneStar === null && p.twoStar === null && p.threeStar === null) return null;
  if (!p.reviewCount) return null;
  return Math.round((neg / p.reviewCount) * 100);
}

export function ProspectsTable() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [trade, setTrade] = useState<"" | Trade>("");
  const [suburb, setSuburb] = useState("");
  const [stage, setStage] = useState<"" | ProspectStage>("");
  const [minFit, setMinFit] = useState(0);
  const [sort, setSort] = useState<SortKey>("fitScore");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [adding, setAdding] = useState(false);

  const suburbs = useMemo(() => [...new Set(data.prospects.map((p) => p.suburb).filter(Boolean))].sort(), [data.prospects]);

  const rows = useMemo(() => {
    const f = data.prospects.filter((p) => {
      if (trade && p.trade !== trade) return false;
      if (stage && p.stage !== stage) return false;
      if (suburb && p.suburb !== suburb) return false;
      if (p.fitScore < minFit) return false;
      if (q) {
        const s = `${p.name} ${p.suburb} ${p.serviceArea} ${p.notes} ${p.cxWeaknesses}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    const val = (p: Prospect): number | string | null => {
      switch (sort) {
        case "name":
          return p.name.toLowerCase();
        case "negativePct":
          return negativePct(p);
        case "updatedAt":
          return p.updatedAt;
        default:
          return p[sort];
      }
    };
    return f.sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      if (va === null && vb === null) return 0;
      if (va === null) return 1;
      if (vb === null) return -1;
      const c = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return dir === "asc" ? c : -c;
    });
  }, [data.prospects, trade, stage, suburb, minFit, q, sort, dir]);

  const toggleSort = (k: SortKey) => {
    if (sort === k) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSort(k);
      setDir(k === "name" ? "asc" : "desc");
    }
  };

  const changeStage = (p: Prospect, next: ProspectStage) => {
    ws.updateProspect(p.id, { stage: next, ...(next === "Contacted" && !p.lastContacted ? { lastContacted: today() } : {}) }, log(`Stage → ${next}`));
  };

  const header = (label: string, k?: SortKey, numeric = false) => (
    <th scope="col" className={numeric ? "ws-num" : ""} aria-sort={k && sort === k ? (dir === "asc" ? "ascending" : "descending") : undefined}>
      {k ? (
        <button type="button" onClick={() => toggleSort(k)}>
          {label}
          <span aria-hidden="true" className="text-ink-faint">
            {sort === k ? (dir === "asc" ? "↑" : "↓") : ""}
          </span>
        </button>
      ) : (
        label
      )}
    </th>
  );

  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;

  return (
    <>
      <PageHeader
        title="Prospects"
        lede="Fifty Sydney trade businesses from the research, scored for commercial fit. Blank cells mean not observed, never zero. Verify a listing before you contact anyone."
        actions={
          <>
            <WsButton variant="primary" onClick={() => setAdding(true)}>
              Add prospect
            </WsButton>
          </>
        }
      />

      {adding ? <AddProspect onClose={() => setAdding(false)} /> : null}

      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-6">
          <Field label="Search" htmlFor="q" className="md:col-span-2">
            <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, suburb, notes…" />
          </Field>
          <Field label="Trade" htmlFor="f-trade">
            <Select id="f-trade" value={trade} onChange={(e) => setTrade(e.target.value as Trade | "")}>
              <option value="">All trades</option>
              {TRADES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Suburb" htmlFor="f-suburb">
            <Select id="f-suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)}>
              <option value="">All suburbs</option>
              {suburbs.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Stage" htmlFor="f-stage">
            <Select id="f-stage" value={stage} onChange={(e) => setStage(e.target.value as ProspectStage | "")}>
              <option value="">All stages</option>
              {PROSPECT_STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label={`Min fit score: ${minFit}`} htmlFor="f-fit">
            <input id="f-fit" type="range" min={0} max={100} step={5} value={minFit} onChange={(e) => setMinFit(Number(e.target.value))} className="mt-3 w-full accent-field" />
          </Field>
        </div>
        <p className="mt-3 text-[0.8125rem] text-ink-faint">
          {rows.length} of {data.prospects.length} prospects. Sort by clicking a column heading.
        </p>
      </Card>

      {rows.length === 0 ? (
        <Empty title="No prospects match" body="Loosen the filters, or add a prospect." />
      ) : (
        <>
        <ul className="grid gap-3 md:hidden" aria-label="Prospects">
          {rows.map((p) => {
            const neg = negativePct(p);
            return (
              <li key={p.id} className="ws-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/workspace/prospects/${p.id}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                      {p.name}
                    </Link>
                    <div className="text-[0.8125rem] text-ink-faint">
                      {p.trade} · {p.suburb || "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[1.25rem] font-semibold tabular opsz-display">{p.fitScore}</div>
                    <div className="text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">fit</div>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-4 gap-2 text-center text-[0.8125rem]">
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.06em] text-ink-faint">Rating</dt>
                    <dd className="tabular font-semibold">{p.googleRating === null ? "—" : p.googleRating.toFixed(1)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.06em] text-ink-faint">Reviews</dt>
                    <dd className="tabular font-semibold">{p.reviewCount ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.06em] text-ink-faint">Neg %</dt>
                    <dd className="tabular font-semibold">{neg === null ? "—" : `${neg}%`}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.06em] text-ink-faint">Replies</dt>
                    <dd className="tabular font-semibold">{p.ownerResponsePct === null ? "—" : `${p.ownerResponsePct}%`}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Chip tone={p.researchStatus === "verified" ? "good" : p.researchStatus === "partial" ? "warn" : "neutral"}>{p.researchStatus}</Chip>
                  <div>
                    <label className="sr-only" htmlFor={`m-stage-${p.id}`}>
                      Stage for {p.name}
                    </label>
                    <select id={`m-stage-${p.id}`} value={p.stage} onChange={(e) => changeStage(p, e.target.value as ProspectStage)} className="ws-field h-9 min-h-0 w-auto py-1 text-[0.8125rem]">
                      {PROSPECT_STAGES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {p.nextAction ? <p className="mt-2 line-clamp-2 text-[0.8125rem] text-ink-soft">{p.nextAction}</p> : null}
              </li>
            );
          })}
        </ul>
        <Card className="hidden overflow-hidden md:block">
          <div className="overflow-x-auto">
            <table className="ws-table min-w-[64rem]">
              <thead>
                <tr>
                  {header("Business", "name")}
                  <th scope="col">Trade · suburb</th>
                  {header("Fit", "fitScore", true)}
                  {header("Rating", "googleRating", true)}
                  {header("Reviews", "reviewCount", true)}
                  {header("Negative %", "negativePct", true)}
                  {header("Owner replies %", "ownerResponsePct", true)}
                  <th scope="col">Research</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Next action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const neg = negativePct(p);
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link href={`/workspace/prospects/${p.id}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                          {p.name}
                        </Link>
                        {p.website ? (
                          <div className="mt-0.5 max-w-[14rem] truncate text-[0.75rem] text-ink-faint">{p.website.replace(/^https?:\/\//, "")}</div>
                        ) : null}
                      </td>
                      <td>
                        <div className="text-ink">{p.trade}</div>
                        <div className="text-[0.8125rem] text-ink-faint">{p.suburb || "—"}</div>
                      </td>
                      <td className="ws-num">
                        <div className="font-semibold">{p.fitScore}</div>
                        <div className="mt-1 w-16">
                          <Meter value={p.fitScore} />
                        </div>
                      </td>
                      <td className="ws-num">{p.googleRating === null ? <span className="text-ink-faint">—</span> : p.googleRating.toFixed(1)}</td>
                      <td className="ws-num">{p.reviewCount === null ? <span className="text-ink-faint">—</span> : p.reviewCount}</td>
                      <td className="ws-num">{neg === null ? <span className="text-ink-faint">—</span> : `${neg}%`}</td>
                      <td className="ws-num">{p.ownerResponsePct === null ? <span className="text-ink-faint">—</span> : `${p.ownerResponsePct}%`}</td>
                      <td>
                        <Chip tone={p.researchStatus === "verified" ? "good" : p.researchStatus === "partial" ? "warn" : "neutral"}>{p.researchStatus}</Chip>
                        {p.reviewsInspected > 0 ? <div className="mt-1 text-[0.75rem] text-ink-faint">{p.reviewsInspected} reviews read</div> : <div className="mt-1 text-[0.75rem] text-ink-faint">0 reviews read</div>}
                      </td>
                      <td>
                        <label className="sr-only" htmlFor={`stage-${p.id}`}>
                          Stage for {p.name}
                        </label>
                        <select
                          id={`stage-${p.id}`}
                          value={p.stage}
                          onChange={(e) => changeStage(p, e.target.value as ProspectStage)}
                          className="ws-field h-8 min-h-0 py-0.5 text-[0.8125rem]"
                        >
                          {PROSPECT_STAGES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <div className="mt-1">
                          <StageChip stage={p.stage} />
                        </div>
                      </td>
                      <td className="max-w-[16rem]">
                        <div className="line-clamp-2 text-[0.8125rem] text-ink-soft">{p.nextAction || "—"}</div>
                        <div className="mt-0.5 text-[0.75rem] text-ink-faint">
                          {p.nextActionDue ? `Due ${fmtDate(p.nextActionDue)}` : p.lastContacted ? `Last contact ${fmtDate(p.lastContacted)}` : "Not yet contacted"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
        </>
      )}
    </>
  );
}

function AddProspect({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [trade, setTrade] = useState<Trade>("HVAC");
  const [suburb, setSuburb] = useState("");
  const [website, setWebsite] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if (name.trim().length < 2) {
      setErr("Add the business name.");
      return;
    }
    const now = nowIso();
    ws.upsertProspect({
      id: uid("p"),
      name: name.trim(),
      trade,
      suburb: suburb.trim(),
      serviceArea: suburb.trim(),
      website: website.trim(),
      contactMethod: "",
      sizeClues: "",
      googleRating: null,
      reviewCount: null,
      ratingSource: "",
      ratingSourceUrl: "",
      observedOn: "",
      oneStar: null,
      twoStar: null,
      threeStar: null,
      negativeLast12m: null,
      reviewsInspected: 0,
      ownerResponsesLast20: null,
      ownerResponsePct: null,
      negativeResponsePct: null,
      responseQuality: "unknown",
      responseTimeEstimate: "",
      recurringComplaints: "",
      positiveThemes: "",
      competitorComparison: "",
      cxWeaknesses: "",
      fitScore: 50,
      openingAngle: "",
      researchStatus: "unverified",
      verificationNotes: "Added manually; nothing verified yet.",
      sources: "",
      stage: "Researching",
      lastContacted: null,
      nextAction: "Open the Google listing and record rating, count, last 10 reviews and owner replies",
      nextActionDue: null,
      notes: "",
      history: [log("Prospect added")],
      createdAt: now,
      updatedAt: now,
    });
    onClose();
  };
  return (
    <Card raised className="mb-4 p-4">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1.4fr_auto] md:items-end">
        <Field label="Business name" htmlFor="np-name">
          <Input id="np-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!err} />
          {err ? <p className="mt-1 text-[0.8125rem] text-signal-ink">{err}</p> : null}
        </Field>
        <Field label="Trade" htmlFor="np-trade">
          <Select id="np-trade" value={trade} onChange={(e) => setTrade(e.target.value as Trade)}>
            {TRADES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Suburb" htmlFor="np-suburb">
          <Input id="np-suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)} />
        </Field>
        <Field label="Website" htmlFor="np-web">
          <Input id="np-web" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
        </Field>
        <div className="flex gap-2">
          <WsButton variant="primary" onClick={submit}>
            Save
          </WsButton>
          <WsButton variant="ghost" onClick={onClose}>
            Cancel
          </WsButton>
        </div>
      </div>
    </Card>
  );
}
