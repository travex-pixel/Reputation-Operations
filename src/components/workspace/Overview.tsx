"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROSPECT_STAGES } from "@/lib/domain/types";
import { useHydrated, useWorkspace } from "@/lib/storage/store";
import { aiStatusAction } from "@/app/workspace/actions";
import type { AiStatus } from "@/lib/ai/provider";
import { Card, CardTitle, Chip, Empty, PageHeader, Stat, StageChip, WsLink, fmtDate } from "./ui";

export function Overview() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [ai, setAi] = useState<AiStatus | null>(null);
  useEffect(() => {
    aiStatusAction().then(setAi).catch(() => setAi(null));
  }, []);

  if (!hydrated) {
    return (
      <div aria-busy="true" className="grid gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-ground-sunken" />
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-md bg-ground-sunken" />
          ))}
        </div>
      </div>
    );
  }

  const byStage = Object.fromEntries(PROSPECT_STAGES.map((s) => [s, data.prospects.filter((p) => p.stage === s).length])) as Record<string, number>;
  const contacted = ["Contacted", "Meeting booked", "Pilot proposed", "Won", "Lost"].reduce((a, s) => a + byStage[s], 0);
  const todayStr = new Date().toISOString().slice(0, 10);
  const openTasks = data.tasks.filter((t) => t.status !== "done").sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"));
  const overdue = openTasks.filter((t) => t.dueDate && t.dueDate < todayStr);
  const attention = data.reviews.filter((r) => ["new", "classified", "draft_ready", "awaiting_approval", "escalated"].includes(r.status));
  const nextActions = data.prospects
    .filter((p) => p.nextActionDue && p.stage !== "Won" && p.stage !== "Lost")
    .sort((a, b) => (a.nextActionDue ?? "").localeCompare(b.nextActionDue ?? ""))
    .slice(0, 6);

  return (
    <>
      <PageHeader
        title="Overview"
        lede="One screen for the week: who to call, what needs approving, what is due. Everything here is stored in this browser."
        actions={
          <>
            <WsLink href="/workspace/prospects" variant="secondary">
              Work the pipeline
            </WsLink>
            <WsLink href="/workspace/audit" variant="primary">
              Prepare an audit
            </WsLink>
          </>
        }
      />

      <section aria-label="Pipeline" className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total prospects" value={data.prospects.length} />
        <Stat label="Qualified" value={byStage.Qualified + byStage["Audit prepared"] + contacted} hint="Qualified or later" tone="good" />
        <Stat label="Audits prepared" value={data.audits.length} hint={`${byStage["Audit prepared"]} in that stage`} />
        <Stat label="Contacted" value={contacted} hint="Contacted or later" />
        <Stat label="Meetings booked" value={byStage["Meeting booked"] + byStage["Pilot proposed"] + byStage.Won} />
        <Stat label="Paid pilots won" value={byStage.Won} tone={byStage.Won > 0 ? "good" : "neutral"} hint="Target: 3" />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          <Card className="p-5">
            <CardTitle aside={<WsLink href="/workspace/ops" size="sm">Open operations</WsLink>}>Needs attention</CardTitle>
            {attention.length === 0 && overdue.length === 0 ? (
              <Empty title="Nothing waiting" body="New reviews, escalations and approvals will appear here." />
            ) : (
              <ul className="divide-y divide-line">
                {overdue.map((t) => (
                  <li key={t.id} className="flex items-start justify-between gap-3 py-2.5 text-small">
                    <div>
                      <span className="font-medium text-ink">{t.title}</span>
                      <div className="text-[0.8125rem] text-ink-faint">{t.action}</div>
                    </div>
                    <Chip tone="bad">Overdue {fmtDate(t.dueDate)}</Chip>
                  </li>
                ))}
                {attention.slice(0, 8).map((r) => {
                  const client = data.clients.find((c) => c.id === r.clientId);
                  return (
                    <li key={r.id} className="flex items-start justify-between gap-3 py-2.5 text-small">
                      <div className="min-w-0">
                        <span className="font-medium text-ink">
                          {r.stars}★ {r.platform} review · {client?.name ?? "Unknown client"}
                        </span>
                        <div className="truncate text-[0.8125rem] text-ink-faint">{r.text}</div>
                      </div>
                      <Chip tone={r.status === "escalated" ? "bad" : r.status === "awaiting_approval" ? "warn" : "info"}>{r.status.replace(/_/g, " ")}</Chip>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <CardTitle aside={<WsLink href="/workspace/prospects" size="sm">All prospects</WsLink>}>Next actions on prospects</CardTitle>
            {nextActions.length === 0 ? (
              <Empty title="No dated next actions" body="Set a next action and due date on a prospect and it will show here." />
            ) : (
              <ul className="divide-y divide-line">
                {nextActions.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-3 py-2.5 text-small">
                    <div className="min-w-0">
                      <Link href={`/workspace/prospects/${p.id}`} className="font-medium text-ink underline-offset-4 hover:underline">
                        {p.name}
                      </Link>
                      <div className="text-[0.8125rem] text-ink-faint">{p.nextAction}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StageChip stage={p.stage} />
                      <Chip tone={p.nextActionDue && p.nextActionDue < todayStr ? "bad" : "neutral"}>{fmtDate(p.nextActionDue)}</Chip>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <Card className="p-5">
            <CardTitle>Pipeline by stage</CardTitle>
            <ul className="grid gap-2">
              {PROSPECT_STAGES.map((s) => (
                <li key={s} className="flex items-center justify-between text-small">
                  <StageChip stage={s} />
                  <span className="tabular font-semibold text-ink">{byStage[s]}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <CardTitle>Clients and reporting</CardTitle>
            <dl className="grid gap-2 text-small">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Active clients</dt>
                <dd className="tabular font-semibold">{data.clients.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Reviews logged</dt>
                <dd className="tabular font-semibold">{data.reviews.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Monthly reports produced</dt>
                <dd className="tabular font-semibold">{data.reports.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Open tasks</dt>
                <dd className="tabular font-semibold">{openTasks.length}</dd>
              </div>
            </dl>
          </Card>

          <Card className="p-5">
            <CardTitle>AI assistance</CardTitle>
            {ai === null ? (
              <p className="text-small text-ink-faint">Checking…</p>
            ) : ai.available ? (
              <div className="text-small text-ink-soft">
                <Chip tone="good">Claude connected</Chip>
                <p className="mt-2">
                  Classification on <span className="font-mono text-[0.8125rem]">{ai.models.classify}</span>, drafting on{" "}
                  <span className="font-mono text-[0.8125rem]">{ai.models.draft}</span>. Every output is a suggestion; you approve.
                </p>
              </div>
            ) : (
              <div className="text-small text-ink-soft">
                <Chip tone="warn">Rules mode</Chip>
                <p className="mt-2">{ai.reason}</p>
                <p className="mt-1 text-[0.8125rem] text-ink-faint">Set ANTHROPIC_API_KEY on the server to enable Claude-assisted classification and drafting.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
