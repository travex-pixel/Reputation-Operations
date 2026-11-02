"use client";

import { useMemo, useState } from "react";
import { classifyReviewAction, draftResponsesAction, insightsAction } from "@/app/workspace/actions";
import type { Insight } from "@/lib/ai/provider";
import { FEEDBACK_CATEGORIES, type Classification, type Draft, type FeedbackCategory, type Platform, type ReviewRecord, type Task, type TaskType } from "@/lib/domain/types";
import { log, nowIso, today, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { Card, CardTitle, Chip, Empty, Field, Input, NumberInput, PageHeader, Select, TextArea, WsButton, WsLink, fmtDate, fmtDateTime } from "./ui";

const PLATFORMS: Platform[] = ["Google", "hipages", "Facebook", "ProductReview", "Other"];

const statusTone = (s: ReviewRecord["status"]): "neutral" | "good" | "warn" | "bad" | "info" | "field" =>
  s === "published" || s === "resolved" ? "good" : s === "escalated" ? "bad" : s === "awaiting_approval" || s === "draft_ready" ? "warn" : s === "no_action" ? "neutral" : "info";

export function OpsBoard() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [clientId, setClientId] = useState("");
  const [tab, setTab] = useState<"reviews" | "tasks" | "insights">("reviews");
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [insights, setInsights] = useState<Insight[] | null>(null);

  const effectiveClientId = clientId || data.clients[0]?.id || "";
  const client = data.clients.find((c) => c.id === effectiveClientId);
  const reviews = useMemo(
    () => data.reviews.filter((r) => !effectiveClientId || r.clientId === effectiveClientId).sort((a, b) => b.observedDate.localeCompare(a.observedDate)),
    [data.reviews, effectiveClientId],
  );
  const tasks = useMemo(
    () => data.tasks.filter((t) => !effectiveClientId || t.clientId === effectiveClientId || !t.clientId).sort((a, b) => (a.status === "done" ? 1 : 0) - (b.status === "done" ? 1 : 0) || (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999")),
    [data.tasks, effectiveClientId],
  );

  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;

  if (!data.clients.length) {
    return (
      <>
        <PageHeader title="Operations" lede="Reviews, escalations, approvals and follow-ups for your clients." />
        <Empty title="Add a client first" body="The operations board tracks reviews against a client record so that drafts use the right voice guide and approvals are logged against the right business." action={<WsLink href="/workspace/clients" variant="primary">Go to clients</WsLink>} />
      </>
    );
  }

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  };

  const classify = (r: ReviewRecord) =>
    run(`classify-${r.id}`, async () => {
      const c = await classifyReviewAction({ businessName: client?.name ?? "", trade: client?.trade ?? "", stars: r.stars, text: r.text, authorFirstName: r.authorFirstName });
      ws.updateReview(r.id, (x) => {
        x.classification = c;
        x.status = c.sensitive || c.recommendedAction === "escalate_to_owner" ? "escalated" : "classified";
        x.history.unshift(log(`Classified by ${c.source}${c.model ? ` (${c.model})` : ""}`, `${c.sentiment}; ${c.categories.join(", ")}; ${c.recommendedAction}`, c.source === "ai" ? "ai" : "system"));
        if (x.status === "escalated") x.history.unshift(log("Escalated to owner (automatic on sensitive classification)", undefined, "system"));
      });
      if (c.sensitive || c.recommendedAction === "escalate_to_owner" || c.sentiment === "negative") {
        ws.upsertTask({
          id: uid("t"),
          type: "escalation",
          title: `Escalate ${r.stars}★ ${r.platform} review to ${client?.ownerFirstName || "owner"}`,
          clientId: r.clientId,
          reviewId: r.id,
          status: "open",
          dueDate: today(),
          action: c.sensitive ? "Call the owner; do not draft publicly without their words" : "Text the owner with the review, our read and a recommendation",
          notes: c.issue,
          history: [log("Task created from classification", undefined, "system")],
          createdAt: nowIso(),
          completedAt: null,
        });
      }
    });

  const draft = (r: ReviewRecord) =>
    run(`draft-${r.id}`, async () => {
      const examples = data.reviews
        .filter((x) => x.clientId === r.clientId)
        .flatMap((x) => x.drafts.filter((d) => d.status === "published" || d.status === "approved").map((d) => d.publishedText ?? d.amendedText ?? d.text));
      const suggestions = await draftResponsesAction({
        businessName: client?.name ?? "",
        trade: client?.trade ?? "",
        stars: r.stars,
        text: r.text,
        authorFirstName: r.authorFirstName,
        ownerFirstName: client?.ownerFirstName ?? "",
        voiceGuide: client?.voiceGuide ?? "",
        approvedExamples: examples,
        classification: r.classification,
      });
      ws.updateReview(r.id, (x) => {
        for (const s of suggestions) {
          x.drafts.unshift({ id: uid("d"), text: s.text, tone: s.tone, source: "ai", createdAt: nowIso(), status: "draft" });
        }
        if (x.status === "new" || x.status === "classified") x.status = "draft_ready";
        x.history.unshift(log(`${suggestions.length} draft${suggestions.length === 1 ? "" : "s"} prepared`, undefined, "ai"));
      });
    });

  const loadInsights = () =>
    run("insights", async () => {
      const res = await insightsAction({
        businessName: client?.name ?? "",
        trade: client?.trade ?? "",
        reviews: reviews.map((r) => ({ stars: r.stars, text: r.text, date: r.reviewDate, categories: r.classification?.categories, sentiment: r.classification?.sentiment })),
      });
      setInsights(res);
    });

  const createReportingTasks = () => {
    const end = new Date();
    const due = new Date(end.getFullYear(), end.getMonth() + 1, 3).toISOString().slice(0, 10);
    for (const c of data.clients) {
      const exists = data.tasks.some((t) => t.type === "report" && t.clientId === c.id && t.dueDate === due);
      if (!exists)
        ws.upsertTask({ id: uid("t"), type: "report", title: `Monthly report · ${c.name}`, clientId: c.id, status: "open", dueDate: due, action: "Prepare and send the one-page report", notes: "", history: [log("Reporting deadline created", undefined, "system")], createdAt: nowIso(), completedAt: null });
    }
  };

  return (
    <>
      <PageHeader
        title="Operations"
        lede="Every review gets read, sorted, drafted, approved by the owner, and only then published by a person. Nothing here sends or publishes automatically."
        actions={
          <>
            <Field label="Client" htmlFor="o-client" className="min-w-[14rem]">
              <Select id="o-client" value={effectiveClientId} onChange={(e) => { setClientId(e.target.value); setInsights(null); }}>
                {data.clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <WsButton variant="primary" onClick={() => setAdding(true)}>
              Log a review
            </WsButton>
          </>
        }
      />

      {error ? (
        <p role="alert" className="mb-4 rounded-sm border border-signal/40 bg-signal/5 px-4 py-2.5 text-small text-ink">
          {error}
        </p>
      ) : null}

      <div className="mb-5 flex gap-1.5" role="tablist" aria-label="Operations views">
        {(["reviews", "tasks", "insights"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`ws-chip h-9 px-3.5 text-[0.875rem] ${tab === t ? "border-field bg-field text-ink-on-field" : "border-line bg-ground-raised text-ink-soft hover:text-ink"}`}
          >
            {t === "reviews" ? `Reviews (${reviews.filter((r) => r.status !== "published" && r.status !== "resolved" && r.status !== "no_action").length} open)` : t === "tasks" ? `Tasks (${tasks.filter((x) => x.status !== "done").length} open)` : "Customer insights"}
          </button>
        ))}
      </div>

      {adding && client ? <AddReview client={client} onClose={() => setAdding(false)} /> : null}

      {tab === "reviews" ? (
        reviews.length === 0 ? (
          <Empty title="No reviews logged" body="Log a review as you find it during the daily monitoring window. Paste the text, set the stars and date, then classify and draft." action={<WsButton variant="primary" onClick={() => setAdding(true)}>Log a review</WsButton>} />
        ) : (
          <div className="grid gap-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} r={r} ownerName={client?.ownerFirstName ?? ""} standing={client?.standingApprovalFiveStar ?? false} busy={busy} onClassify={() => classify(r)} onDraft={() => draft(r)} />
            ))}
          </div>
        )
      ) : null}

      {tab === "tasks" ? <TasksPanel tasks={tasks} clientId={effectiveClientId} onCreateReporting={createReportingTasks} /> : null}

      {tab === "insights" ? (
        <Card className="p-5">
          <CardTitle aside={<WsButton variant="primary" size="sm" onClick={loadInsights} disabled={busy === "insights" || !reviews.length}>{busy === "insights" ? "Analysing…" : "Analyse reviews"}</WsButton>}>Customer experience intelligence</CardTitle>
          <p className="text-small text-ink-soft">Recurring complaints, repeated failures, what customers praise, and emerging risks, each tied to the reviews that support it. Treat as prompts for the owner conversation, not conclusions.</p>
          {insights === null ? (
            <p className="mt-4 text-small text-ink-faint">{reviews.length ? `Analyse ${reviews.length} logged review${reviews.length === 1 ? "" : "s"} for ${client?.name}.` : "Log some reviews first."}</p>
          ) : insights.length === 0 ? (
            <p className="mt-4 text-small text-ink-faint">No patterns found yet.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {insights.map((i, k) => (
                <li key={k} className="rounded-sm border rule bg-ground-raised p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip tone={i.kind === "positive_driver" ? "good" : i.kind === "emerging_risk" || i.kind === "service_failure" ? "bad" : i.kind === "recurring_complaint" ? "warn" : "info"}>{i.kind.replace(/_/g, " ")}</Chip>
                    <Chip>confidence {i.confidence}</Chip>
                  </div>
                  <p className="mt-2 font-semibold text-ink">{i.theme}</p>
                  <ul className="mt-1.5 grid gap-1 text-[0.8125rem] text-ink-soft">
                    {i.evidence.map((e, j) => (
                      <li key={j} className="border-l rule pl-2">{e}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-small text-ink">
                    <span className="font-semibold">Recommend: </span>
                    {i.recommendation}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */

function ReviewCard({ r, ownerName, standing, busy, onClassify, onDraft }: { r: ReviewRecord; ownerName: string; standing: boolean; busy: string | null; onClassify: () => void; onDraft: () => void }) {
  const [open, setOpen] = useState(r.status !== "published" && r.status !== "resolved");
  const [editingCls, setEditingCls] = useState(false);
  const c = r.classification;

  const setStatus = (status: ReviewRecord["status"], note: string) =>
    ws.updateReview(r.id, (x) => {
      x.status = status;
      x.history.unshift(log(note));
    });

  const correct = (patch: Partial<Classification>) =>
    ws.updateReview(r.id, (x) => {
      if (!x.classification) return;
      Object.assign(x.classification, patch, { source: "human", correctedBy: "founder", classifiedAt: nowIso() });
      x.history.unshift(log("Classification corrected by founder"));
    });

  return (
    <Card className="overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ink tabular">{"★".repeat(r.stars)}<span className="text-line-strong">{"★".repeat(5 - r.stars)}</span></span>
            <span className="text-small text-ink-soft">{r.platform} · {fmtDate(r.reviewDate)}{r.authorFirstName ? ` · ${r.authorFirstName}` : ""}</span>
            <Chip tone={statusTone(r.status)}>{r.status.replace(/_/g, " ")}</Chip>
            {c?.sensitive ? <Chip tone="bad">sensitive</Chip> : null}
          </div>
          <p className={`mt-1.5 text-small text-ink-soft ${open ? "" : "line-clamp-2"}`}>{r.text}</p>
        </div>
        <span aria-hidden="true" className={`mt-1 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open ? (
        <div className="grid gap-5 border-t rule px-5 py-5 lg:grid-cols-[1fr_1fr]">
          {/* Classification */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-[0.9375rem] font-semibold text-ink">1. Review intelligence</h3>
              <div className="flex gap-2">
                {c ? <WsButton size="sm" onClick={() => setEditingCls(!editingCls)}>{editingCls ? "Done" : "Correct"}</WsButton> : null}
                <WsButton size="sm" variant="primary" onClick={onClassify} disabled={busy === `classify-${r.id}`}>
                  {busy === `classify-${r.id}` ? "Classifying…" : c ? "Re-classify" : "Classify"}
                </WsButton>
              </div>
            </div>
            {!c ? (
              <p className="text-small text-ink-faint">Not classified yet. Classification is a suggestion you confirm or correct.</p>
            ) : editingCls ? (
              <div className="grid gap-3">
                <Field label="Sentiment" htmlFor={`sent-${r.id}`}>
                  <Select id={`sent-${r.id}`} value={c.sentiment} onChange={(e) => correct({ sentiment: e.target.value as Classification["sentiment"] })}>
                    <option>positive</option>
                    <option>neutral</option>
                    <option>negative</option>
                  </Select>
                </Field>
                <fieldset>
                  <legend className="ws-label">Categories</legend>
                  <div className="flex flex-wrap gap-1.5">
                    {FEEDBACK_CATEGORIES.map((cat) => {
                      const on = c.categories.includes(cat);
                      return (
                        <button key={cat} type="button" aria-pressed={on} onClick={() => correct({ categories: on ? c.categories.filter((x) => x !== cat) : [...c.categories, cat as FeedbackCategory] })} className={`ws-chip h-7 ${on ? "border-field bg-field text-ink-on-field" : "border-line bg-ground-raised text-ink-soft"}`}>
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <Field label="Sensitive (safety, defect, legal, money, conduct)" htmlFor={`sens-${r.id}`}>
                  <label className="flex items-center gap-2 text-small"><input id={`sens-${r.id}`} type="checkbox" checked={c.sensitive} onChange={(e) => correct({ sensitive: e.target.checked, risk: e.target.checked ? "sensitive" : c.risk === "sensitive" ? "medium" : c.risk })} className="h-4 w-4 accent-field" /> Escalate; no public draft without the owner’s words</label>
                </Field>
              </div>
            ) : (
              <dl className="grid gap-1.5 text-small">
                <div className="flex flex-wrap gap-1.5">
                  <Chip tone={c.sentiment === "positive" ? "good" : c.sentiment === "negative" ? "bad" : "warn"}>{c.sentiment}</Chip>
                  {c.categories.map((x) => <Chip key={x}>{x}</Chip>)}
                  <Chip tone={c.urgency === "high" ? "bad" : c.urgency === "medium" ? "warn" : "neutral"}>urgency {c.urgency}</Chip>
                  <Chip tone={c.risk === "sensitive" || c.risk === "high" ? "bad" : "neutral"}>risk {c.risk}</Chip>
                </div>
                <div><dt className="inline font-semibold text-ink">Issue: </dt><dd className="inline text-ink-soft">{c.issue}</dd></div>
                <div><dt className="inline font-semibold text-ink">Recommended: </dt><dd className="inline text-ink-soft">{c.recommendedAction.replace(/_/g, " ")}</dd></div>
                <div><dt className="inline font-semibold text-ink">Why: </dt><dd className="inline text-ink-soft">{c.rationale}</dd></div>
                <div className="text-[0.75rem] text-ink-faint">Source: {c.source}{c.model ? ` · ${c.model}` : ""}{c.correctedBy ? " · corrected by founder" : ""} · {fmtDateTime(c.classifiedAt)}</div>
              </dl>
            )}

            {/* Recovery */}
            {c && c.sentiment !== "positive" ? (
              <div className="mt-5 border-t rule pt-4">
                <h3 className="text-[0.9375rem] font-semibold text-ink">3. Customer recovery</h3>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <Field label="Owner contacted customer on" htmlFor={`rc-${r.id}`}>
                    <Input id={`rc-${r.id}`} type="date" value={r.recovery?.contactedOn ?? ""} onChange={(e) => ws.updateReview(r.id, (x) => { x.recovery = { outcome: "pending", agreed: "", followUpDue: null, ...(x.recovery ?? {}), contactedOn: e.target.value || null }; x.history.unshift(log("Recovery contact recorded", e.target.value)); })} />
                  </Field>
                  <Field label="Outcome" htmlFor={`ro-${r.id}`}>
                    <Select id={`ro-${r.id}`} value={r.recovery?.outcome ?? "pending"} onChange={(e) => ws.updateReview(r.id, (x) => { x.recovery = { contactedOn: null, agreed: "", followUpDue: null, ...(x.recovery ?? {}), outcome: e.target.value as NonNullable<ReviewRecord["recovery"]>["outcome"] }; if (e.target.value === "resolved") x.status = "resolved"; x.history.unshift(log(`Recovery outcome: ${e.target.value}`)); })}>
                      <option value="pending">pending</option>
                      <option value="resolved">resolved</option>
                      <option value="declined">declined</option>
                      <option value="not_needed">not needed</option>
                    </Select>
                  </Field>
                  <Field label="What was agreed" htmlFor={`ra-${r.id}`} className="sm:col-span-2">
                    <Input id={`ra-${r.id}`} value={r.recovery?.agreed ?? ""} onChange={(e) => ws.updateReview(r.id, (x) => { x.recovery = { contactedOn: null, outcome: "pending", followUpDue: null, ...(x.recovery ?? {}), agreed: e.target.value }; })} placeholder="Rebooked Friday, call-out fee waived" />
                  </Field>
                </div>
              </div>
            ) : null}
          </div>

          {/* Drafts and approvals */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-[0.9375rem] font-semibold text-ink">2. Response and approval</h3>
              <WsButton size="sm" variant="primary" onClick={onDraft} disabled={busy === `draft-${r.id}` || (c?.sensitive ?? false)}>
                {busy === `draft-${r.id}` ? "Drafting…" : "Draft replies"}
              </WsButton>
            </div>
            {c?.sensitive ? <p className="mb-2 rounded-sm bg-[#fbe9e4] px-3 py-2 text-[0.8125rem] text-signal-ink">Sensitive complaint: escalated. Write any public reply with the owner’s own words, then add it below as a human draft.</p> : null}
            {r.drafts.length === 0 ? <p className="text-small text-ink-faint">No drafts yet.</p> : null}
            <div className="grid gap-3">
              {r.drafts.map((d) => (
                <DraftCard key={d.id} r={r} d={d} standing={standing && r.stars === 5} ownerName={ownerName} />
              ))}
            </div>
            <HumanDraft r={r} />

            <div className="mt-4 flex flex-wrap gap-2 border-t rule pt-3">
              {r.status !== "escalated" ? <WsButton size="sm" onClick={() => setStatus("escalated", "Escalated to owner (manual)")}>Escalate</WsButton> : null}
              {r.status !== "no_action" ? <WsButton size="sm" variant="ghost" onClick={() => setStatus("no_action", "Marked no action")}>No action</WsButton> : null}
              <WsButton size="sm" variant="danger" className="ml-auto" onClick={() => window.confirm("Delete this review record?") && ws.deleteReview(r.id)}>Delete</WsButton>
            </div>

            <details className="mt-3 text-[0.75rem] text-ink-faint">
              <summary className="cursor-pointer">History ({r.history.length})</summary>
              <ul className="mt-1 grid gap-1">
                {r.history.map((h, i) => (
                  <li key={i}><span className="tabular">{fmtDateTime(h.at)}</span> · {h.actor} · {h.action}{h.details ? ` · ${h.details}` : ""}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function DraftCard({ r, d, standing, ownerName }: { r: ReviewRecord; d: Draft; standing: boolean; ownerName: string }) {
  const [text, setText] = useState(d.amendedText ?? d.text);
  const [channel, setChannel] = useState<NonNullable<Draft["approvalChannel"]>>("sms");
  const upd = (mut: (x: Draft, rev: ReviewRecord) => void, note: string, actor: "founder" | "client" | "system" = "founder") =>
    ws.updateReview(r.id, (rev) => {
      const x = rev.drafts.find((z) => z.id === d.id);
      if (!x) return;
      mut(x, rev);
      rev.history.unshift(log(note, undefined, actor));
    });
  const tone = d.status === "published" ? "good" : d.status === "approved" || d.status === "amended" ? "good" : d.status === "awaiting_approval" ? "warn" : d.status === "rejected" ? "bad" : "neutral";
  return (
    <div className={`rounded-sm border p-3 ${d.status === "rejected" ? "border-line opacity-60" : "border-line bg-ground-raised"}`}>
      <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-ink-faint">
        <Chip tone={tone}>{d.status.replace(/_/g, " ")}</Chip>
        <span>{d.tone}</span>
        <span>· {d.source === "ai" ? `AI draft${d.model ? ` (${d.model})` : ""}` : "Human draft"}</span>
        <span>· {fmtDateTime(d.createdAt)}</span>
      </div>
      {d.status === "draft" || d.status === "awaiting_approval" ? (
        <TextArea aria-label="Draft reply text" className="mt-2" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <p className="mt-2 whitespace-pre-line text-small text-ink">{d.publishedText ?? d.amendedText ?? d.text}</p>
      )}
      {d.status === "draft" ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Select aria-label="Approval channel" value={channel} onChange={(e) => setChannel(e.target.value as NonNullable<Draft["approvalChannel"]>)} className="h-8 min-h-0 w-auto py-0.5 text-[0.8125rem]">
            <option value="sms">by SMS</option>
            <option value="email">by email</option>
            <option value="call">by phone</option>
            <option value="in_person">in person</option>
          </Select>
          <WsButton size="sm" variant="field" onClick={() => upd((x, rev) => { x.text = text; x.status = "awaiting_approval"; x.approvalChannel = channel; rev.status = "awaiting_approval"; }, `Draft sent to ${ownerName || "owner"} for approval (${channel})`)}>
            Sent to owner for approval
          </WsButton>
          {standing ? (
            <WsButton size="sm" onClick={() => upd((x, rev) => { x.text = text; x.status = "approved"; x.approvedBy = `${ownerName || "owner"} (standing approval, 5★)`; x.approvedAt = nowIso(); x.approvalChannel = "standing"; rev.status = "approved"; }, "Approved under standing 5-star approval", "system")}>
              Standing approval (5★)
            </WsButton>
          ) : null}
          <WsButton size="sm" variant="ghost" onClick={() => upd((x) => { x.status = "rejected"; x.rejectionReason = "Discarded by founder"; }, "Draft discarded")}>Discard</WsButton>
        </div>
      ) : null}
      {d.status === "awaiting_approval" ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <WsButton size="sm" variant="field" onClick={() => upd((x, rev) => { const amended = text !== x.text; x.amendedText = amended ? text : undefined; x.status = amended ? "amended" : "approved"; x.approvedBy = ownerName || "owner"; x.approvedAt = nowIso(); rev.status = "approved"; }, `Owner ${text !== d.text ? "approved with amendments" : "approved"} via ${d.approvalChannel ?? "message"}`, "client")}>
            Owner approved{text !== d.text ? " (with edits)" : ""}
          </WsButton>
          <WsButton size="sm" variant="danger" onClick={() => { const reason = window.prompt("Reason the owner gave (optional)") ?? ""; upd((x, rev) => { x.status = "rejected"; x.rejectionReason = reason; if (!rev.drafts.some((z) => z.status !== "rejected")) rev.status = "classified"; }, `Owner rejected draft${reason ? `: ${reason}` : ""}`, "client"); }}>
            Owner rejected
          </WsButton>
        </div>
      ) : null}
      {d.status === "approved" || d.status === "amended" ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[0.75rem] text-ink-faint">Approved by {d.approvedBy} · {fmtDateTime(d.approvedAt)}</span>
          <WsButton size="sm" variant="primary" onClick={() => upd((x, rev) => { x.status = "published"; x.publishedAt = nowIso(); x.publishedText = x.amendedText ?? x.text; rev.status = rev.recovery && rev.recovery.outcome === "pending" ? "published" : rev.stars <= 3 ? "published" : "published"; }, "Published by founder (manual, on the platform) exactly as approved")}>
            I published this on {r.platform}
          </WsButton>
        </div>
      ) : null}
      {d.status === "published" ? <p className="mt-1 text-[0.75rem] text-ink-faint">Published {fmtDateTime(d.publishedAt)} · approved by {d.approvedBy}</p> : null}
      {d.status === "rejected" && d.rejectionReason ? <p className="mt-1 text-[0.75rem] text-ink-faint">Reason: {d.rejectionReason}</p> : null}
    </div>
  );
}

function HumanDraft({ r }: { r: ReviewRecord }) {
  const [text, setText] = useState("");
  if (r.status === "published" || r.status === "resolved") return null;
  return (
    <div className="mt-3">
      <Field label="Write your own draft" htmlFor={`hd-${r.id}`}>
        <TextArea id={`hd-${r.id}`} rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Or edit an AI draft above. This becomes a human draft in the approval queue." />
      </Field>
      <WsButton size="sm" className="mt-2" disabled={text.trim().length < 10} onClick={() => { ws.updateReview(r.id, (x) => { x.drafts.unshift({ id: uid("d"), text: text.trim(), tone: "Human", source: "human", createdAt: nowIso(), status: "draft" }); if (x.status === "new" || x.status === "classified") x.status = "draft_ready"; x.history.unshift(log("Human draft written")); }); setText(""); }}>
        Add draft
      </WsButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function AddReview({ client, onClose }: { client: { id: string }; onClose: () => void }) {
  const [platform, setPlatform] = useState<Platform>("Google");
  const [stars, setStars] = useState<number | null>(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState(today());
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if (!text.trim() || !stars) {
      setErr("Paste the review text and set the stars.");
      return;
    }
    const now = nowIso();
    ws.upsertReview({ id: uid("r"), clientId: client.id, platform, stars, authorFirstName: author.trim(), text: text.trim(), reviewDate: date, observedDate: now, sourceUrl: url.trim() || undefined, classification: null, drafts: [], status: "new", history: [log("Review logged")], createdAt: now, updatedAt: now });
    onClose();
  };
  return (
    <Card raised className="mb-5 p-5">
      <CardTitle>Log a review</CardTitle>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Platform" htmlFor="nr-plat">
          <Select id="nr-plat" value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="Stars" htmlFor="nr-stars">
          <NumberInput id="nr-stars" min={1} max={5} value={stars} onChange={setStars} />
        </Field>
        <Field label="Reviewer first name" htmlFor="nr-author" hint="First name only.">
          <Input id="nr-author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Field>
        <Field label="Review date" htmlFor="nr-date">
          <Input id="nr-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Review text" htmlFor="nr-text" className="sm:col-span-4">
          <TextArea id="nr-text" rows={4} value={text} onChange={(e) => setText(e.target.value)} aria-invalid={!!err} />
          {err ? <p className="mt-1 text-[0.8125rem] text-signal-ink">{err}</p> : null}
        </Field>
        <Field label="Link to the review (optional)" htmlFor="nr-url" className="sm:col-span-4">
          <Input id="nr-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
      </div>
      <div className="mt-4 flex gap-2">
        <WsButton variant="primary" onClick={submit}>
          Save review
        </WsButton>
        <WsButton variant="ghost" onClick={onClose}>
          Cancel
        </WsButton>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

const TASK_TYPES: TaskType[] = ["review", "escalation", "follow_up", "approval", "review_request", "report", "prospect", "other"];

function TasksPanel({ tasks, clientId, onCreateReporting }: { tasks: Task[]; clientId: string; onCreateReporting: () => void }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("follow_up");
  const [due, setDue] = useState(today());
  const [action, setAction] = useState("");
  const add = () => {
    if (title.trim().length < 3) return;
    ws.upsertTask({ id: uid("t"), type, title: title.trim(), clientId: clientId || undefined, status: "open", dueDate: due || null, action: action.trim(), notes: "", history: [log("Task created")], createdAt: nowIso(), completedAt: null });
    setTitle("");
    setAction("");
  };
  const todayStr = today();
  return (
    <div className="grid gap-5">
      <Card className="p-5">
        <CardTitle aside={<WsButton size="sm" onClick={onCreateReporting}>Create this month’s reporting deadlines</WsButton>}>New task</CardTitle>
        <div className="grid gap-3 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.4fr_auto] md:items-end">
          <Field label="Title" htmlFor="t-title"><Input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
          <Field label="Type" htmlFor="t-type">
            <Select id="t-type" value={type} onChange={(e) => setType(e.target.value as TaskType)}>
              {TASK_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
            </Select>
          </Field>
          <Field label="Due" htmlFor="t-due"><Input id="t-due" type="date" value={due} onChange={(e) => setDue(e.target.value)} /></Field>
          <Field label="Assigned action" htmlFor="t-action"><Input id="t-action" value={action} onChange={(e) => setAction(e.target.value)} placeholder="Call owner before 8am" /></Field>
          <WsButton variant="primary" onClick={add} disabled={title.trim().length < 3}>Add</WsButton>
        </div>
      </Card>
      {tasks.length === 0 ? (
        <Empty title="No tasks" body="Escalations and approvals create tasks automatically; add follow-ups and reporting deadlines here." />
      ) : (
        <Card className="overflow-hidden">
          <table className="ws-table">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Task</th>
                <th scope="col">Type</th>
                <th scope="col">Due</th>
                <th scope="col">Action</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className={t.status === "done" ? "opacity-60" : ""}>
                  <td>
                    <label className="sr-only" htmlFor={`ts-${t.id}`}>Status for {t.title}</label>
                    <select id={`ts-${t.id}`} value={t.status} onChange={(e) => ws.updateTask(t.id, (x) => { x.status = e.target.value as Task["status"]; x.completedAt = x.status === "done" ? nowIso() : null; x.history.unshift(log(`Status → ${x.status}`)); })} className="ws-field h-8 min-h-0 w-auto py-0.5 text-[0.8125rem]">
                      <option value="open">open</option>
                      <option value="in_progress">in progress</option>
                      <option value="waiting">waiting</option>
                      <option value="done">done</option>
                    </select>
                  </td>
                  <td className="font-medium text-ink">{t.title}</td>
                  <td><Chip tone={t.type === "escalation" ? "bad" : t.type === "approval" ? "warn" : "neutral"}>{t.type.replace(/_/g, " ")}</Chip></td>
                  <td className={`tabular ${t.dueDate && t.dueDate < todayStr && t.status !== "done" ? "text-signal-ink" : ""}`}>{fmtDate(t.dueDate)}</td>
                  <td className="max-w-[16rem] text-ink-soft">{t.action || "—"}</td>
                  <td className="max-w-[16rem]">
                    <label className="sr-only" htmlFor={`tn-${t.id}`}>Notes for {t.title}</label>
                    <input id={`tn-${t.id}`} defaultValue={t.notes} onBlur={(e) => e.target.value !== t.notes && ws.updateTask(t.id, (x) => { x.notes = e.target.value; })} className="ws-field h-8 min-h-0 py-0.5 text-[0.8125rem]" placeholder="Add a note…" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
