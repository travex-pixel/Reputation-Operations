"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TRADES, type Audit, type AuditInputs, type Prospect, type Trade } from "@/lib/domain/types";
import { emptyAuditInputs, generateAuditAnalysis } from "@/lib/audit/generate";
import { log, nowIso, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { AuditDocument } from "./AuditDocument";
import { Card, CardTitle, Empty, Field, Input, NumberInput, PageHeader, Select, TextArea, WsButton, WsLink, fmtDate } from "./ui";

function prefillFrom(p: Prospect | undefined, preparedBy: string): AuditInputs {
  const base = emptyAuditInputs();
  base.preparedBy = preparedBy;
  if (!p) return base;
  return {
    ...base,
    businessName: p.name,
    trade: p.trade,
    suburb: p.suburb,
    website: p.website,
    googleRating: p.googleRating,
    reviewCount: p.reviewCount,
    reviewsInspected: p.reviewsInspected,
    ownerResponsePct: p.ownerResponsePct,
    negativeResponsePct: p.negativeResponsePct,
    negativeCount12m: p.negativeLast12m,
    recentObservations: p.positiveThemes && p.positiveThemes !== "not observed" ? p.positiveThemes : "",
    negativeObservations: p.recurringComplaints && p.recurringComplaints !== "not observed" ? p.recurringComplaints : "",
    competitorObservations: p.competitorComparison,
  };
}

export function AuditGenerator() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const params = useSearchParams();
  const prospectId = params.get("prospect") ?? "";
  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;
  const prospect = data.prospects.find((x) => x.id === prospectId);
  return <AuditGeneratorInner key={prospectId} prospect={prospect} />;
}

function AuditGeneratorInner({ prospect }: { prospect: Prospect | undefined }) {
  const data = useWorkspace();
  const router = useRouter();
  const linked = prospect?.id ?? "";
  const [inputs, setInputs] = useState<AuditInputs>(() => prefillFrom(prospect, data.settings.founderName));
  const [preview, setPreview] = useState<Audit | null>(null);

  const set = <K extends keyof AuditInputs>(k: K, v: AuditInputs[K]) => setInputs({ ...inputs, [k]: v });
  const setComp = (idx: number, patch: Partial<AuditInputs["competitors"][number]>) =>
    setInputs({ ...inputs, competitors: inputs.competitors.map((c, i) => (i === idx ? { ...c, ...patch } : c)) });

  const canGenerate = inputs.businessName.trim().length > 1;

  const generate = () => {
    const analysis = generateAuditAnalysis(inputs);
    setPreview({ id: preview?.id ?? uid("audit"), prospectId: linked || undefined, inputs, analysis, createdAt: nowIso() });
  };

  const save = () => {
    if (!preview) return;
    ws.saveAudit(preview);
    if (preview.prospectId) {
      const p = data.prospects.find((x) => x.id === preview.prospectId);
      if (p && (p.stage === "Researching" || p.stage === "Qualified")) {
        ws.updateProspect(p.id, { stage: "Audit prepared" }, log("Audit prepared", preview.id));
      } else if (p) {
        ws.updateProspect(p.id, {}, log("Audit prepared", preview.id));
      }
    }
    router.push(`/workspace/audit/${preview.id}`);
  };

  const recent = useMemo(() => data.audits.slice(0, 6), [data.audits]);

  return (
    <>
      <PageHeader
        title="Audit generator"
        lede="Type what you actually observed on the public listings; the generator turns it into a one-page audit and keeps observations separate from analysis. Blank means not observed."
        actions={
          <Field label="Prefill from prospect" htmlFor="pf" className="min-w-[16rem]">
            <Select
              id="pf"
              value={linked}
              onChange={(e) => {
                const id = e.target.value;
                router.replace(id ? `/workspace/audit?prospect=${id}` : "/workspace/audit");
              }}
            >
              <option value="">Start blank</option>
              {data.prospects
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </Select>
          </Field>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid content-start gap-6">
          <Card className="p-5">
            <CardTitle>Business</CardTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" htmlFor="a-name" className="sm:col-span-2">
                <Input id="a-name" value={inputs.businessName} onChange={(e) => set("businessName", e.target.value)} />
              </Field>
              <Field label="Trade" htmlFor="a-trade">
                <Select id="a-trade" value={inputs.trade} onChange={(e) => set("trade", e.target.value as Trade)}>
                  {TRADES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Suburb" htmlFor="a-suburb">
                <Input id="a-suburb" value={inputs.suburb} onChange={(e) => set("suburb", e.target.value)} />
              </Field>
              <Field label="Website" htmlFor="a-web" className="sm:col-span-2">
                <Input id="a-web" type="url" value={inputs.website} onChange={(e) => set("website", e.target.value)} />
              </Field>
            </div>
          </Card>

          <Card className="p-5">
            <CardTitle>Observed on the Google listing</CardTitle>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Rating" htmlFor="a-rating">
                <NumberInput id="a-rating" step={0.1} min={1} max={5} value={inputs.googleRating} onChange={(v) => set("googleRating", v)} />
              </Field>
              <Field label="Total reviews" htmlFor="a-count">
                <NumberInput id="a-count" min={0} value={inputs.reviewCount} onChange={(v) => set("reviewCount", v)} />
              </Field>
              <Field label="Reviews you read" htmlFor="a-insp">
                <NumberInput id="a-insp" min={0} value={inputs.reviewsInspected} onChange={(v) => set("reviewsInspected", v ?? 0)} />
              </Field>
              <Field label="Newest review (days ago)" htmlFor="a-last">
                <NumberInput id="a-last" min={0} value={inputs.lastReviewDaysAgo} onChange={(v) => set("lastReviewDaysAgo", v)} />
              </Field>
              <Field label="Owner reply rate %" htmlFor="a-orp" hint="Of the reviews you read.">
                <NumberInput id="a-orp" min={0} max={100} value={inputs.ownerResponsePct} onChange={(v) => set("ownerResponsePct", v)} />
              </Field>
              <Field label="Negative reviews answered %" htmlFor="a-nrp">
                <NumberInput id="a-nrp" min={0} max={100} value={inputs.negativeResponsePct} onChange={(v) => set("negativeResponsePct", v)} />
              </Field>
              <Field label="Negative reviews, last 12 months" htmlFor="a-neg">
                <NumberInput id="a-neg" min={0} value={inputs.negativeCount12m} onChange={(v) => set("negativeCount12m", v)} />
              </Field>
            </div>
            <div className="mt-4 grid gap-4">
              <Field label="Recent review observations" htmlFor="a-recent" hint="What customers praise, in their words. One per line.">
                <TextArea id="a-recent" value={inputs.recentObservations} onChange={(e) => set("recentObservations", e.target.value)} placeholder={"Tidy install, left the place clean\nOn time, phoned ahead"} />
              </Field>
              <Field label="Negative review observations" htmlFor="a-negobs" hint="Themes from 1–3 star reviews. One per line.">
                <TextArea id="a-negobs" value={inputs.negativeObservations} onChange={(e) => set("negativeObservations", e.target.value)} placeholder={"Callbacks after a fault slow\nQuoted price changed on the day"} />
              </Field>
              <Field label="Owner response observations" htmlFor="a-orobs" hint="Tone and timing of existing replies.">
                <TextArea id="a-orobs" value={inputs.ownerResponseObservations} onChange={(e) => set("ownerResponseObservations", e.target.value)} placeholder="Replies to 5-star reviews only; one defensive reply to a 2-star in March" />
              </Field>
            </div>
          </Card>

          <Card className="p-5">
            <CardTitle>Three nearest competitors</CardTitle>
            <div className="grid gap-3">
              {inputs.competitors.map((c, idx) => (
                <div key={idx} className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr] gap-2">
                  <div>
                    <label className="sr-only" htmlFor={`c-name-${idx}`}>
                      Competitor {idx + 1} name
                    </label>
                    <Input id={`c-name-${idx}`} placeholder={`Competitor ${idx + 1}`} value={c.name} onChange={(e) => setComp(idx, { name: e.target.value })} />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor={`c-rating-${idx}`}>
                      Rating
                    </label>
                    <NumberInput id={`c-rating-${idx}`} placeholder="★" step={0.1} min={1} max={5} value={c.rating} onChange={(v) => setComp(idx, { rating: v })} />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor={`c-rev-${idx}`}>
                      Reviews
                    </label>
                    <NumberInput id={`c-rev-${idx}`} placeholder="Reviews" min={0} value={c.reviews} onChange={(v) => setComp(idx, { reviews: v })} />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor={`c-resp-${idx}`}>
                      Replied %
                    </label>
                    <NumberInput id={`c-resp-${idx}`} placeholder="Replied %" min={0} max={100} value={c.responsePct} onChange={(v) => setComp(idx, { responsePct: v })} />
                  </div>
                </div>
              ))}
              <Field label="Competitor observations" htmlFor="a-cobs">
                <TextArea id="a-cobs" value={inputs.competitorObservations} onChange={(e) => set("competitorObservations", e.target.value)} />
              </Field>
            </div>
          </Card>

          <Card className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Prepared by" htmlFor="a-by">
                <Input id="a-by" value={inputs.preparedBy} onChange={(e) => set("preparedBy", e.target.value)} placeholder="Your first name" />
              </Field>
              <Field label="Prepared on" htmlFor="a-on">
                <Input id="a-on" type="date" value={inputs.preparedOn} onChange={(e) => set("preparedOn", e.target.value)} />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <WsButton variant="primary" onClick={generate} disabled={!canGenerate}>
                {preview ? "Regenerate preview" : "Generate audit"}
              </WsButton>
              <WsButton variant="field" onClick={save} disabled={!preview}>
                Save and open print view
              </WsButton>
            </div>
          </Card>

          {recent.length ? (
            <Card className="p-5">
              <CardTitle>Recent audits</CardTitle>
              <ul className="grid gap-2 text-small">
                {recent.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-2">
                    <span>
                      <span className="font-medium text-ink">{a.inputs.businessName}</span> <span className="text-ink-faint">· {fmtDate(a.createdAt)}</span>
                    </span>
                    <WsLink href={`/workspace/audit/${a.id}`} size="sm">
                      Open
                    </WsLink>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>

        <div className="min-w-0">
          {preview ? (
            <div className="xl:sticky xl:top-20">
              <AuditDocument audit={preview} />
            </div>
          ) : (
            <Empty title="Preview appears here" body="Fill in what you observed and generate. You can regenerate as many times as you like before saving." />
          )}
        </div>
      </div>
    </>
  );
}
