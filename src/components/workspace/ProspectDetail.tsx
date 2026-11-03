"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROSPECT_STAGES, TRADES, type Prospect, type ProspectStage, type ResearchStatus, type ResponseQuality, type Trade } from "@/lib/domain/types";
import { log, today, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { Card, CardTitle, Chip, Empty, Field, Input, Meter, NumberInput, PageHeader, Select, StageChip, TextArea, WsButton, WsLink, fmtDate, fmtDateTime } from "./ui";
import { PitchPanel } from "./PitchPanel";

const QUALITIES: ResponseQuality[] = ["personalised", "generic", "defensive", "helpful", "absent", "unknown"];
const STATUSES: ResearchStatus[] = ["unverified", "partial", "verified"];

export function ProspectDetail({ id }: { id: string }) {
  const data = useWorkspace();
  const hydrated = useHydrated();
  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;
  const prospect = data.prospects.find((p) => p.id === id);
  if (!prospect) {
    return <Empty title="Prospect not found" action={<WsLink href="/workspace/prospects">Back to prospects</WsLink>} />;
  }
  return <ProspectEditor key={prospect.id} prospect={prospect} />;
}

function ProspectEditor({ prospect }: { prospect: Prospect }) {
  const data = useWorkspace();
  const router = useRouter();
  const [draft, setDraft] = useState<Prospect>(prospect);
  const [saved, setSaved] = useState(false);
  const [contactNote, setContactNote] = useState("");

  const set = <K extends keyof Prospect>(k: K, v: Prospect[K]) => setDraft({ ...draft, [k]: v });
  const dirty = JSON.stringify(draft) !== JSON.stringify(prospect);

  const save = () => {
    ws.upsertProspect({ ...draft, history: [log("Details edited"), ...draft.history] });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const setStage = (s: ProspectStage) => {
    const patch: Partial<Prospect> = { stage: s };
    if (s === "Contacted" && !prospect.lastContacted) patch.lastContacted = today();
    ws.updateProspect(prospect.id, patch, log(`Stage → ${s}`));
    setDraft({ ...draft, ...patch });
  };

  const logContact = () => {
    const note = contactNote.trim();
    ws.updateProspect(prospect.id, { lastContacted: today(), stage: prospect.stage === "Researching" || prospect.stage === "Qualified" || prospect.stage === "Audit prepared" ? "Contacted" : prospect.stage }, log("Contact logged", note || undefined));
    setContactNote("");
  };

  const audits = data.audits.filter((a) => a.prospectId === prospect.id);
  const neg = (prospect.oneStar ?? 0) + (prospect.twoStar ?? 0) + (prospect.threeStar ?? 0);
  const hasStarData = prospect.oneStar !== null || prospect.twoStar !== null || prospect.threeStar !== null;

  return (
    <>
      <PageHeader
        title={prospect.name}
        lede={`${prospect.trade} · ${prospect.suburb || "suburb not recorded"}${prospect.serviceArea && prospect.serviceArea !== prospect.suburb ? ` · serves ${prospect.serviceArea}` : ""}`}
        actions={
          <>
            <WsLink href="/workspace/prospects" variant="ghost">
              ← Prospects
            </WsLink>
            <WsLink href={`/workspace/audit?prospect=${prospect.id}`} variant="primary">
              Prepare audit
            </WsLink>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-6">
          {/* Reputation snapshot */}
          <Card className="p-5">
            <CardTitle aside={<Chip tone={prospect.researchStatus === "verified" ? "good" : prospect.researchStatus === "partial" ? "warn" : "neutral"}>{prospect.researchStatus}</Chip>}>Reputation snapshot</CardTitle>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-small sm:grid-cols-4">
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">Rating</dt>
                <dd className="text-[1.375rem] font-semibold tabular">{prospect.googleRating === null ? "—" : prospect.googleRating.toFixed(1)}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">Reviews</dt>
                <dd className="text-[1.375rem] font-semibold tabular">{prospect.reviewCount ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">Negative (1–3★)</dt>
                <dd className="text-[1.375rem] font-semibold tabular">{hasStarData ? neg : "—"}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">Owner replies</dt>
                <dd className="text-[1.375rem] font-semibold tabular">{prospect.ownerResponsePct === null ? "—" : `${prospect.ownerResponsePct}%`}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[0.8125rem] text-ink-faint">
              {prospect.ratingSource ? `Source: ${prospect.ratingSource}${prospect.observedOn ? `, observed ${fmtDate(prospect.observedOn)}` : ""}.` : "No public rating observed yet."} {prospect.reviewsInspected} review text{prospect.reviewsInspected === 1 ? "" : "s"} actually read.
              {prospect.ratingSourceUrl ? (
                <>
                  {" "}
                  <a href={prospect.ratingSourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    Open source
                  </a>
                </>
              ) : null}
            </p>
            {prospect.verificationNotes ? <p className="mt-2 rounded-sm bg-[#fdf1dc] px-3 py-2 text-[0.8125rem] text-stamp-ink">{prospect.verificationNotes}</p> : null}
          </Card>

          {/* Editable research */}
          <Card className="p-5">
            <CardTitle aside={saved ? <Chip tone="good">Saved</Chip> : dirty ? <Chip tone="warn">Unsaved changes</Chip> : null}>Research record</CardTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" htmlFor="name">
                <Input id="name" value={draft.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Trade" htmlFor="trade">
                <Select id="trade" value={draft.trade} onChange={(e) => set("trade", e.target.value as Trade)}>
                  {TRADES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Suburb" htmlFor="suburb">
                <Input id="suburb" value={draft.suburb} onChange={(e) => set("suburb", e.target.value)} />
              </Field>
              <Field label="Service area" htmlFor="area">
                <Input id="area" value={draft.serviceArea} onChange={(e) => set("serviceArea", e.target.value)} />
              </Field>
              <Field label="Website" htmlFor="website">
                <Input id="website" type="url" value={draft.website} onChange={(e) => set("website", e.target.value)} />
              </Field>
              <Field label="Public contact method" htmlFor="contact" hint="Business line or contact page only; never personal numbers.">
                <Input id="contact" value={draft.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} />
              </Field>
              <Field label="Size and team clues" htmlFor="size" className="sm:col-span-2">
                <Input id="size" value={draft.sizeClues} onChange={(e) => set("sizeClues", e.target.value)} placeholder="e.g. 4 vans on the website, 'family team of 6', since 1998" />
              </Field>

              <Field label="Google rating" htmlFor="rating">
                <NumberInput id="rating" step={0.1} min={1} max={5} value={draft.googleRating} onChange={(v) => set("googleRating", v)} />
              </Field>
              <Field label="Total review count" htmlFor="count">
                <NumberInput id="count" min={0} value={draft.reviewCount} onChange={(v) => set("reviewCount", v)} />
              </Field>
              <Field label="Rating source" htmlFor="rsrc">
                <Input id="rsrc" value={draft.ratingSource} onChange={(e) => set("ratingSource", e.target.value)} placeholder="Google Maps / Trustpilot / self-reported on website" />
              </Field>
              <Field label="Source URL" htmlFor="rurl">
                <Input id="rurl" type="url" value={draft.ratingSourceUrl} onChange={(e) => set("ratingSourceUrl", e.target.value)} />
              </Field>
              <Field label="Observed on" htmlFor="obs">
                <Input id="obs" type="date" value={draft.observedOn} onChange={(e) => set("observedOn", e.target.value)} />
              </Field>
              <Field label="Reviews actually read" htmlFor="insp" hint="Count of individual review texts you opened.">
                <NumberInput id="insp" min={0} value={draft.reviewsInspected} onChange={(v) => set("reviewsInspected", v ?? 0)} />
              </Field>
              <Field label="1-star" htmlFor="s1">
                <NumberInput id="s1" min={0} value={draft.oneStar} onChange={(v) => set("oneStar", v)} />
              </Field>
              <Field label="2-star" htmlFor="s2">
                <NumberInput id="s2" min={0} value={draft.twoStar} onChange={(v) => set("twoStar", v)} />
              </Field>
              <Field label="3-star" htmlFor="s3">
                <NumberInput id="s3" min={0} value={draft.threeStar} onChange={(v) => set("threeStar", v)} />
              </Field>
              <Field label="Negative in last 12 months" htmlFor="neg12">
                <NumberInput id="neg12" min={0} value={draft.negativeLast12m} onChange={(v) => set("negativeLast12m", v)} />
              </Field>
              <Field label="Owner responses in last 20" htmlFor="or20">
                <NumberInput id="or20" min={0} max={20} value={draft.ownerResponsesLast20} onChange={(v) => set("ownerResponsesLast20", v)} />
              </Field>
              <Field label="Owner response %" htmlFor="orp">
                <NumberInput id="orp" min={0} max={100} value={draft.ownerResponsePct} onChange={(v) => set("ownerResponsePct", v)} />
              </Field>
              <Field label="Negative-review response %" htmlFor="nrp">
                <NumberInput id="nrp" min={0} max={100} value={draft.negativeResponsePct} onChange={(v) => set("negativeResponsePct", v)} />
              </Field>
              <Field label="Response quality" htmlFor="rq">
                <Select id="rq" value={draft.responseQuality} onChange={(e) => set("responseQuality", e.target.value as ResponseQuality)}>
                  {QUALITIES.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Response-time estimate" htmlFor="rt">
                <Input id="rt" value={draft.responseTimeEstimate} onChange={(e) => set("responseTimeEstimate", e.target.value)} placeholder="e.g. replies within 2 days / weeks later / not observed" />
              </Field>
              <Field label="Recurring complaints" htmlFor="rc" className="sm:col-span-2">
                <TextArea id="rc" value={draft.recurringComplaints} onChange={(e) => set("recurringComplaints", e.target.value)} />
              </Field>
              <Field label="Positive experience themes" htmlFor="pt" className="sm:col-span-2">
                <TextArea id="pt" value={draft.positiveThemes} onChange={(e) => set("positiveThemes", e.target.value)} />
              </Field>
              <Field label="Competitor reputation comparison" htmlFor="cc" className="sm:col-span-2">
                <TextArea id="cc" value={draft.competitorComparison} onChange={(e) => set("competitorComparison", e.target.value)} />
              </Field>
              <Field label="Likely customer-experience weaknesses" htmlFor="cx" className="sm:col-span-2">
                <TextArea id="cx" value={draft.cxWeaknesses} onChange={(e) => set("cxWeaknesses", e.target.value)} />
              </Field>
              <Field label={`Commercial fit score: ${draft.fitScore}`} htmlFor="fit" hint="0–100: ability to pay, reputation opportunity, accessibility, urgency, service fit.">
                <input id="fit" type="range" min={0} max={100} step={1} value={draft.fitScore} onChange={(e) => set("fitScore", Number(e.target.value))} className="mt-2 w-full accent-field" />
                <Meter value={draft.fitScore} />
              </Field>
              <Field label="Research status" htmlFor="rs">
                <Select id="rs" value={draft.researchStatus} onChange={(e) => set("researchStatus", e.target.value as ResearchStatus)}>
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Verification notes" htmlFor="vn" className="sm:col-span-2">
                <TextArea id="vn" value={draft.verificationNotes} onChange={(e) => set("verificationNotes", e.target.value)} />
              </Field>
              <Field label="Sources" htmlFor="src" className="sm:col-span-2">
                <TextArea id="src" value={draft.sources} onChange={(e) => set("sources", e.target.value)} />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <WsButton variant="primary" onClick={save} disabled={!dirty}>
                Save changes
              </WsButton>
              <WsButton variant="ghost" onClick={() => setDraft(prospect)} disabled={!dirty}>
                Discard
              </WsButton>
              <WsButton
                variant="danger"
                className="ml-auto"
                onClick={() => {
                  if (window.confirm(`Delete ${prospect.name}? This cannot be undone.`)) {
                    ws.deleteProspect(prospect.id);
                    router.push("/workspace/prospects");
                  }
                }}
              >
                Delete prospect
              </WsButton>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <PitchPanel prospect={prospect} onApplied={(patch) => setDraft((d) => ({ ...d, ...patch }))} />

          <Card raised className="p-5">
            <CardTitle>Pipeline</CardTitle>
            <div className="mb-3">
              <StageChip stage={prospect.stage} />
            </div>
            <label className="ws-label" htmlFor="stage">
              Move to stage
            </label>
            <Select id="stage" value={prospect.stage} onChange={(e) => setStage(e.target.value as ProspectStage)}>
              {PROSPECT_STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <div className="mt-4 grid gap-3">
              <Field label="Next action" htmlFor="na">
                <Input id="na" value={draft.nextAction} onChange={(e) => set("nextAction", e.target.value)} />
              </Field>
              <Field label="Due" htmlFor="nad">
                <Input id="nad" type="date" value={draft.nextActionDue ?? ""} onChange={(e) => set("nextActionDue", e.target.value || null)} />
              </Field>
              <Field label="Notes" htmlFor="notes">
                <TextArea id="notes" value={draft.notes} onChange={(e) => set("notes", e.target.value)} />
              </Field>
              <WsButton variant="secondary" onClick={save} disabled={!dirty}>
                Save pipeline notes
              </WsButton>
            </div>
            <div className="mt-5 border-t rule pt-4">
              <Field label="Log a contact" htmlFor="cn" hint={`Last contacted: ${fmtDate(prospect.lastContacted)}`}>
                <Input id="cn" value={contactNote} onChange={(e) => setContactNote(e.target.value)} placeholder="Called office, owner on site; call back Thu 7:45am" />
              </Field>
              <WsButton className="mt-2" variant="field" onClick={logContact}>
                Log contact today
              </WsButton>
            </div>
          </Card>

          <Card className="p-5">
            <CardTitle>Opening angle</CardTitle>
            <TextArea value={draft.openingAngle} onChange={(e) => set("openingAngle", e.target.value)} rows={6} />
            <p className="ws-hint">Reference only what you have actually seen on the listing. Save with the record above.</p>
          </Card>

          <Card className="p-5">
            <CardTitle>Audits</CardTitle>
            {audits.length === 0 ? (
              <p className="text-small text-ink-soft">
                None yet.{" "}
                <Link href={`/workspace/audit?prospect=${prospect.id}`} className="font-semibold text-green-mid underline-offset-4 hover:underline">
                  Prepare one
                </Link>
                .
              </p>
            ) : (
              <ul className="grid gap-2 text-small">
                {audits.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-2">
                    <span>{fmtDate(a.createdAt)}</span>
                    <WsLink href={`/workspace/audit/${a.id}`} size="sm">
                      Open
                    </WsLink>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <CardTitle>History</CardTitle>
            <ul className="grid gap-2 text-[0.8125rem]">
              {prospect.history.slice(0, 12).map((h, i) => (
                <li key={i} className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <span className="text-ink-faint tabular">{fmtDateTime(h.at)}</span>
                  <span className="text-ink-soft">
                    <span className="font-medium text-ink">{h.action}</span>
                    {h.details ? ` · ${h.details}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
