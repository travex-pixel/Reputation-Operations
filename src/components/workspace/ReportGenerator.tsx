"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Client, MonthlyReport, ReportInputs } from "@/lib/domain/types";
import { nowIso, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { periodLabel } from "@/lib/report/kpis";
import { ReportDocument } from "./ReportDocument";
import { Card, CardTitle, Empty, Field, Input, NumberInput, PageHeader, Select, TextArea, WsButton, WsLink, fmtDate } from "./ui";

function emptyInputs(clientId: string, preparedBy: string): ReportInputs {
  const end = new Date();
  end.setDate(0); // last day of previous month
  const start = new Date(end.getFullYear(), end.getMonth(), 1);
  return {
    clientId,
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10),
    reputation: { newReviews: null, averageRating: null, totalReviews: null, reviewsReplied: null, negativeReviews: null, negativeReplied: null, medianResponseHours: null, requestsSent: null },
    recovery: { issuesIdentified: null, issuesEscalated: null, customersContacted: null, issuesResolved: null, recurringThemes: "", followUpsOutstanding: null },
    business: { profileCalls: null, websiteClicks: null, qualifiedEnquiries: null, quoteRequests: null, jobsWon: null, attributableRevenue: null, grossProfit: null, businessDataSource: "" },
    time: { baselineOwnerHours: null, hoursTransferred: null },
    observations: "",
    recommendedActions: "",
    preparedBy,
  };
}

export function ReportGenerator() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [clientId, setClientId] = useState("");
  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;
  if (!data.clients.length) {
    return (
      <>
        <PageHeader title="Monthly reports" lede="A report needs a client. Add one first." />
        <Empty title="No clients yet" body="Create a client record with the owner’s name and voice guide, then come back here." action={<WsLink href="/workspace/clients" variant="primary">Add a client</WsLink>} />
      </>
    );
  }
  const effectiveClientId = clientId || data.clients[0].id;
  const client = data.clients.find((c) => c.id === effectiveClientId) ?? data.clients[0];
  return <ReportForm key={client.id} client={client} clientId={effectiveClientId} setClientId={setClientId} />;
}

function ReportForm({ client, clientId, setClientId }: { client: Client; clientId: string; setClientId: (id: string) => void }) {
  const data = useWorkspace();
  const router = useRouter();
  const [inputs, setInputs] = useState<ReportInputs>(() => ({
    ...emptyInputs(client.id, data.settings.founderName),
    time: { baselineOwnerHours: client.baselineOwnerHoursPerMonth, hoursTransferred: null },
  }));
  const [preview, setPreview] = useState<MonthlyReport | null>(null);
  const previousReports = useMemo(() => data.reports.filter((r) => r.clientId === clientId).sort((a, b) => b.inputs.periodEnd.localeCompare(a.inputs.periodEnd)), [data.reports, clientId]);

  /** Prefill counts from the review log for the chosen period. */
  const prefillFromLog = () => {
    const inPeriod = data.reviews.filter((r) => r.clientId === client.id && r.reviewDate >= inputs.periodStart && r.reviewDate <= inputs.periodEnd);
    const replied = inPeriod.filter((r) => r.drafts.some((d) => d.status === "published"));
    const negatives = inPeriod.filter((r) => r.stars <= 3);
    const negReplied = negatives.filter((r) => r.drafts.some((d) => d.status === "published"));
    const escalated = inPeriod.filter((r) => r.status === "escalated" || r.history.some((h) => h.action.startsWith("Escalated")));
    const contacted = inPeriod.filter((r) => r.recovery?.contactedOn);
    const resolved = inPeriod.filter((r) => r.recovery?.outcome === "resolved");
    const outstanding = inPeriod.filter((r) => r.recovery?.outcome === "pending");
    const hours: number[] = [];
    for (const r of inPeriod) {
      const pub = r.drafts.find((d) => d.publishedAt);
      if (pub?.publishedAt) hours.push((new Date(pub.publishedAt).getTime() - new Date(r.observedDate).getTime()) / 36e5);
    }
    hours.sort((a, b) => a - b);
    const median = hours.length ? Math.round(hours[Math.floor(hours.length / 2)]) : null;
    const themes = [...new Set(negatives.flatMap((r) => r.classification?.categories ?? []))].join(", ");
    setInputs({
      ...inputs,
      reputation: {
        ...inputs.reputation,
        newReviews: inPeriod.length,
        reviewsReplied: replied.length,
        negativeReviews: negatives.length,
        negativeReplied: negReplied.length,
        medianResponseHours: median,
        averageRating: inPeriod.length ? Math.round((inPeriod.reduce((a, r) => a + r.stars, 0) / inPeriod.length) * 10) / 10 : inputs.reputation.averageRating,
      },
      recovery: {
        ...inputs.recovery,
        issuesIdentified: negatives.length,
        issuesEscalated: escalated.length,
        customersContacted: contacted.length,
        issuesResolved: resolved.length,
        followUpsOutstanding: outstanding.length,
        recurringThemes: inputs.recovery.recurringThemes || themes,
      },
    });
  };

  const generate = () => {
    const prev = previousReports.find((r) => r.inputs.periodEnd < inputs.periodStart) ?? null;
    setPreview({ id: preview?.id ?? uid("rep"), clientId: client.id, inputs, previous: prev ? prev.inputs : null, createdAt: nowIso() });
  };

  const save = () => {
    if (!preview) return;
    ws.saveReport(preview);
    router.push(`/workspace/reports/${preview.id}`);
  };

  const set = (patch: Partial<ReportInputs>) => setInputs({ ...inputs, ...patch });
  const num = (label: string, id: string, value: number | null, onChange: (v: number | null) => void, hint?: string) => (
    <Field label={label} htmlFor={id} hint={hint}>
      <NumberInput id={id} min={0} value={value} onChange={onChange} />
    </Field>
  );

  return (
    <>
      <PageHeader
        title="Monthly reports"
        lede="Enter what happened this period. Leave anything you don't know blank; the report shows a dash, never an invented number. Previous period comparison is automatic once a prior report exists."
        actions={
          <Field label="Client" htmlFor="r-client" className="min-w-[14rem]">
            <Select id="r-client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              {data.clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
        }
      />

      {(
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid content-start gap-6">
            <Card className="p-5">
              <CardTitle aside={<WsButton size="sm" onClick={prefillFromLog}>Prefill from review log</WsButton>}>Period</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Opening date" htmlFor="r-start">
                  <Input id="r-start" type="date" value={inputs.periodStart} onChange={(e) => set({ periodStart: e.target.value })} />
                </Field>
                <Field label="Closing date" htmlFor="r-end">
                  <Input id="r-end" type="date" value={inputs.periodEnd} onChange={(e) => set({ periodEnd: e.target.value })} />
                </Field>
              </div>
              <p className="ws-hint">
                {previousReports.length ? `Previous report on file: ${periodLabel(previousReports[0].inputs.periodStart, previousReports[0].inputs.periodEnd)}.` : "No previous report for this client; comparisons start next month."}
              </p>
            </Card>

            <Card className="p-5">
              <CardTitle>A. Reputation</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {num("New genuine reviews", "r-new", inputs.reputation.newReviews, (v) => set({ reputation: { ...inputs.reputation, newReviews: v } }))}
                <Field label="Average rating at period end" htmlFor="r-avg">
                  <NumberInput id="r-avg" min={1} max={5} step={0.1} value={inputs.reputation.averageRating} onChange={(v) => set({ reputation: { ...inputs.reputation, averageRating: v } })} />
                </Field>
                {num("Total reviews at period end", "r-total", inputs.reputation.totalReviews, (v) => set({ reputation: { ...inputs.reputation, totalReviews: v } }))}
                {num("New reviews answered", "r-rep", inputs.reputation.reviewsReplied, (v) => set({ reputation: { ...inputs.reputation, reviewsReplied: v } }))}
                {num("Negative reviews (1–3★)", "r-neg", inputs.reputation.negativeReviews, (v) => set({ reputation: { ...inputs.reputation, negativeReviews: v } }))}
                {num("Negative reviews answered", "r-negrep", inputs.reputation.negativeReplied, (v) => set({ reputation: { ...inputs.reputation, negativeReplied: v } }))}
                {num("Median response time (hours)", "r-hrs", inputs.reputation.medianResponseHours, (v) => set({ reputation: { ...inputs.reputation, medianResponseHours: v } }))}
                {num("Review requests sent", "r-req", inputs.reputation.requestsSent, (v) => set({ reputation: { ...inputs.reputation, requestsSent: v } }), "Every nominated customer; no gating.")}
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle>B. Customer recovery</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {num("Issues identified", "r-iss", inputs.recovery.issuesIdentified, (v) => set({ recovery: { ...inputs.recovery, issuesIdentified: v } }))}
                {num("Issues escalated to owner", "r-esc", inputs.recovery.issuesEscalated, (v) => set({ recovery: { ...inputs.recovery, issuesEscalated: v } }))}
                {num("Customers contacted", "r-con", inputs.recovery.customersContacted, (v) => set({ recovery: { ...inputs.recovery, customersContacted: v } }))}
                {num("Issues resolved", "r-res", inputs.recovery.issuesResolved, (v) => set({ recovery: { ...inputs.recovery, issuesResolved: v } }))}
                {num("Follow-ups outstanding", "r-out", inputs.recovery.followUpsOutstanding, (v) => set({ recovery: { ...inputs.recovery, followUpsOutstanding: v } }))}
                <Field label="Recurring complaint themes" htmlFor="r-themes" className="sm:col-span-2">
                  <Input id="r-themes" value={inputs.recovery.recurringThemes} onChange={(e) => set({ recovery: { ...inputs.recovery, recurringThemes: e.target.value } })} />
                </Field>
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle>C. Business performance</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {num("Google profile calls", "r-calls", inputs.business.profileCalls, (v) => set({ business: { ...inputs.business, profileCalls: v } }))}
                {num("Website clicks from profile", "r-clicks", inputs.business.websiteClicks, (v) => set({ business: { ...inputs.business, websiteClicks: v } }))}
                {num("Qualified enquiries", "r-enq", inputs.business.qualifiedEnquiries, (v) => set({ business: { ...inputs.business, qualifiedEnquiries: v } }))}
                {num("Quote requests", "r-quotes", inputs.business.quoteRequests, (v) => set({ business: { ...inputs.business, quoteRequests: v } }))}
                {num("Jobs won", "r-jobs", inputs.business.jobsWon, (v) => set({ business: { ...inputs.business, jobsWon: v } }))}
                {num("Attributable revenue (A$)", "r-rev", inputs.business.attributableRevenue, (v) => set({ business: { ...inputs.business, attributableRevenue: v } }), "Only where the customer said reviews or a call influenced them.")}
                {num("Gross profit on those jobs (A$)", "r-gp", inputs.business.grossProfit, (v) => set({ business: { ...inputs.business, grossProfit: v } }))}
                <Field label="Who supplied these figures, and how" htmlFor="r-src" hint="e.g. Owner, from Google Business Profile performance and job sheet, 3 Nov">
                  <Input id="r-src" value={inputs.business.businessDataSource} onChange={(e) => set({ business: { ...inputs.business, businessDataSource: e.target.value } })} />
                </Field>
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle>D. Owner time saved</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Owner hours previously spent per month" htmlFor="r-base" hint="From onboarding; the owner's own estimate.">
                  <NumberInput id="r-base" min={0} step={0.5} value={inputs.time.baselineOwnerHours} onChange={(v) => set({ time: { ...inputs.time, baselineOwnerHours: v } })} />
                </Field>
                <Field label="Hours transferred to Reputrail" htmlFor="r-trans" hint="Your logged hours on this client.">
                  <NumberInput id="r-trans" min={0} step={0.5} value={inputs.time.hoursTransferred} onChange={(v) => set({ time: { ...inputs.time, hoursTransferred: v } })} />
                </Field>
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle>Narrative</CardTitle>
              <div className="grid gap-4">
                <Field label="Key observations" htmlFor="r-obs" hint="Reference the evidence: which reviews, which calls.">
                  <TextArea id="r-obs" rows={5} value={inputs.observations} onChange={(e) => set({ observations: e.target.value })} />
                </Field>
                <Field label="Recommended actions for next month" htmlFor="r-rec">
                  <TextArea id="r-rec" rows={4} value={inputs.recommendedActions} onChange={(e) => set({ recommendedActions: e.target.value })} />
                </Field>
                <Field label="Prepared by" htmlFor="r-by">
                  <Input id="r-by" value={inputs.preparedBy} onChange={(e) => set({ preparedBy: e.target.value })} />
                </Field>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <WsButton variant="primary" onClick={generate}>
                  {preview ? "Regenerate preview" : "Generate report"}
                </WsButton>
                <WsButton variant="field" onClick={save} disabled={!preview}>
                  Save and open print view
                </WsButton>
              </div>
            </Card>

            {previousReports.length ? (
              <Card className="p-5">
                <CardTitle>Saved reports for {client.name}</CardTitle>
                <ul className="grid gap-2 text-small">
                  {previousReports.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-2">
                      <span>
                        {periodLabel(r.inputs.periodStart, r.inputs.periodEnd)} <span className="text-ink-faint">· saved {fmtDate(r.createdAt)}</span>
                      </span>
                      <WsLink href={`/workspace/reports/${r.id}`} size="sm">
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
                <ReportDocument report={preview} clientName={client.name} />
              </div>
            ) : (
              <Empty title="Preview appears here" body="Fill in the period and generate. Missing figures show as dashes." />
            )}
          </div>
        </div>
      )}
    </>
  );
}
