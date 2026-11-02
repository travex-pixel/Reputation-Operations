"use client";

import { useEffect, useRef, useState } from "react";
import { aiStatusAction } from "@/app/workspace/actions";
import type { AiStatus } from "@/lib/ai/provider";
import { log, nowIso, today, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { Card, CardTitle, Chip, Field, Input, PageHeader, WsButton, fmtDateTime } from "./ui";

export function SettingsPanel() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [ai, setAi] = useState<AiStatus | null>(null);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    aiStatusAction().then(setAi).catch(() => setAi(null));
  }, []);

  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;

  const download = () => {
    const json = ws.exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `reputrail-workspace-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg("Backup downloaded.");
  };

  const importFile = async (f: File) => {
    const text = await f.text();
    const res = ws.importJson(text);
    setMsg(res.ok ? "Workspace restored from file." : res.error);
  };

  const loadSample = () => {
    const now = nowIso();
    const cid = uid("c");
    ws.upsertClient({ id: cid, name: "Harbourline Air Conditioning (sample)", trade: "HVAC", ownerFirstName: "Dave", plan: "Pilot", startedOn: today(), voiceGuide: "Warm and direct. First names. Signs off 'Dave'. Calls the team 'the crew'. Never discusses price publicly, never blames the customer, always offers a call.", standingApprovalFiveStar: true, competitors: ["Shire Cool (sample)", "Bayside Air (sample)", "Southside Climate (sample)"], escalationContact: "SMS to business mobile, 7am–7pm", baselineOwnerHoursPerMonth: 6, notes: "SAMPLE DATA for trying the workflow. Fictional business. Delete before real use.", createdAt: now, updatedAt: now });
    const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 864e5).toISOString().slice(0, 10);
    const samples: Array<[number, string, string, number]> = [
      [5, "Sarah", "Dave and the crew installed our ducted system in a day. On time, tidy, explained everything. Highly recommend.", 2],
      [2, "Mark", "Booked for Tuesday morning. Nobody came and nobody rang. Took a day off work for nothing.", 1],
      [1, "Priya", "Unit stopped working three weeks after install and I've been chasing a callback for ten days. Still waiting.", 4],
      [4, "Tom", "Good price, quick install. Left a bit of dust behind but otherwise happy.", 9],
      [5, "Lin", "Fixed the leak under the indoor unit same day. Friendly and professional.", 12],
      [3, "Chris", "Work was fine but the quote changed on the day and nobody explained why.", 15],
    ];
    for (const [stars, author, text, ago] of samples) {
      ws.upsertReview({ id: uid("r"), clientId: cid, platform: "Google", stars, authorFirstName: author, text, reviewDate: d(ago), observedDate: now, classification: null, drafts: [], status: "new", history: [log("Sample review loaded", undefined, "system")], createdAt: now, updatedAt: now });
    }
    setMsg("Sample client and six fictional reviews loaded. They are labelled (sample).");
  };

  return (
    <>
      <PageHeader title="Settings & data" lede="Where your data lives, how to back it up, and what the AI assistance is doing." />
      {msg ? <p role="status" className="mb-4 rounded-sm border rule bg-ground-raised px-4 py-2.5 text-small text-ink">{msg}</p> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <CardTitle>Your name</CardTitle>
          <Field label="Founder name" htmlFor="s-name" hint="Printed on audits and reports.">
            <Input id="s-name" defaultValue={data.settings.founderName} onBlur={(e) => ws.setFounderName(e.target.value.trim())} />
          </Field>
        </Card>

        <Card className="p-5">
          <CardTitle>AI assistance</CardTitle>
          {ai === null ? (
            <p className="text-small text-ink-faint">Checking…</p>
          ) : (
            <div className="text-small text-ink-soft">
              <Chip tone={ai.available ? "good" : "warn"}>{ai.available ? "Claude connected" : "Rules mode"}</Chip>
              <dl className="mt-3 grid grid-cols-[9rem_1fr] gap-y-1 text-[0.8125rem]">
                <dt className="text-ink-faint">Classification</dt><dd className="font-mono">{ai.models.classify}</dd>
                <dt className="text-ink-faint">Drafting</dt><dd className="font-mono">{ai.models.draft}</dd>
                <dt className="text-ink-faint">Insights</dt><dd className="font-mono">{ai.models.insight}</dd>
              </dl>
              {ai.reason ? <p className="mt-3 text-[0.8125rem]">{ai.reason}</p> : null}
              <p className="mt-3 text-[0.8125rem] text-ink-faint">The key is read on the server only (ANTHROPIC_API_KEY). Customer names, phones and emails are stripped before text is sent. Nothing is published or sent by the model.</p>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <CardTitle>Backup and restore</CardTitle>
          <p className="text-small text-ink-soft">All workspace data is stored in this browser’s local storage. Clearing site data or switching devices loses it. Download a backup after each working session and keep it in your Reputrail Drive folder.</p>
          <dl className="mt-3 grid grid-cols-[9rem_1fr] gap-y-1 text-[0.8125rem] text-ink-soft">
            <dt className="text-ink-faint">Prospects</dt><dd className="tabular">{data.prospects.length}</dd>
            <dt className="text-ink-faint">Clients</dt><dd className="tabular">{data.clients.length}</dd>
            <dt className="text-ink-faint">Reviews</dt><dd className="tabular">{data.reviews.length}</dd>
            <dt className="text-ink-faint">Tasks</dt><dd className="tabular">{data.tasks.length}</dd>
            <dt className="text-ink-faint">Audits / reports</dt><dd className="tabular">{data.audits.length} / {data.reports.length}</dd>
            <dt className="text-ink-faint">Last backup</dt><dd>{fmtDateTime(data.settings.lastExportAt)}</dd>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <WsButton variant="primary" onClick={download}>Download backup (JSON)</WsButton>
            <WsButton onClick={() => fileRef.current?.click()}>Restore from file…</WsButton>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" aria-label="Restore workspace from JSON file" onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])} />
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Seed and sample data</CardTitle>
          <p className="text-small text-ink-soft">Prospects were seeded from the research CSV{data.settings.seededAt ? ` on ${fmtDateTime(data.settings.seededAt)}` : ""}. Refreshing re-reads the research fields and keeps your stage, notes and contact history.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <WsButton onClick={() => { ws.reseedProspectsKeepingProgress(); setMsg("Prospect research fields refreshed; your progress was kept."); }}>Refresh prospects from research</WsButton>
            <WsButton onClick={loadSample}>Load sample client (fictional)</WsButton>
            <WsButton variant="danger" onClick={() => { if (window.confirm("Reset the whole workspace to the research seed? Clients, reviews, tasks, audits and reports will be deleted. Download a backup first.")) { ws.resetToSeed(); setMsg("Workspace reset to seed."); } }}>Reset everything</WsButton>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <CardTitle>Privacy and boundaries</CardTitle>
          <ul className="grid gap-1.5 text-small text-ink-soft sm:grid-cols-2">
            <li>Record first names only for reviewers; never addresses or phone numbers in review notes.</li>
            <li>Customer contact details for review requests live in the client’s consent log (Drive), not here.</li>
            <li>Nothing in this workspace publishes, sends or changes anything on a client’s accounts.</li>
            <li>Every approval records who approved, when, via which channel, and what was finally published.</li>
            <li>Delete a client’s records within 30 days of offboarding: use Remove client, then Download backup.</li>
            <li>Set <code className="font-mono text-[0.8125rem]">WORKSPACE_PASSCODE</code> in Vercel so only you can open this area.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
