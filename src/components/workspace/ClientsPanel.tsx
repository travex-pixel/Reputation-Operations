"use client";

import { useState } from "react";
import { TRADES, type Client, type Plan, type Trade } from "@/lib/domain/types";
import { nowIso, today, uid, useHydrated, useWorkspace, ws } from "@/lib/storage/store";
import { Card, CardTitle, Chip, Empty, Field, Input, NumberInput, PageHeader, Select, TextArea, WsButton, fmtDate } from "./ui";

const PLANS: Plan[] = ["Pilot", "Essential", "Managed", "Premium"];

function blank(): Client {
  const now = nowIso();
  return {
    id: uid("c"),
    name: "",
    trade: "HVAC",
    ownerFirstName: "",
    plan: "Pilot",
    startedOn: today(),
    voiceGuide: "",
    standingApprovalFiveStar: false,
    competitors: ["", "", ""],
    escalationContact: "",
    baselineOwnerHoursPerMonth: null,
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}

export function ClientsPanel() {
  const data = useWorkspace();
  const hydrated = useHydrated();
  const [editing, setEditing] = useState<Client | null>(null);

  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;

  const startFromProspect = (prospectId: string) => {
    const p = data.prospects.find((x) => x.id === prospectId);
    const c = blank();
    if (p) {
      c.prospectId = p.id;
      c.name = p.name;
      c.trade = p.trade;
    }
    setEditing(c);
  };

  return (
    <>
      <PageHeader
        title="Clients"
        lede="Won prospects become clients. The voice guide is what every draft is written from; the standing-approval flag only ever covers five-star thank-yous."
        actions={
          <>
            <Field label="Create from a won prospect" htmlFor="from-p" className="min-w-[16rem]">
              <Select id="from-p" defaultValue="" onChange={(e) => e.target.value && startFromProspect(e.target.value)}>
                <option value="">Choose…</option>
                {data.prospects
                  .filter((p) => p.stage === "Won" || p.stage === "Pilot proposed")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </Select>
            </Field>
            <WsButton variant="primary" onClick={() => setEditing(blank())}>
              New client
            </WsButton>
          </>
        }
      />

      {editing ? <ClientForm client={editing} onClose={() => setEditing(null)} /> : null}

      {data.clients.length === 0 && !editing ? (
        <Empty title="No clients yet" body="When a pilot is agreed, create the client here. The operations board and monthly reports hang off this record." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.clients.map((c) => (
            <Card key={c.id} className="p-5">
              <CardTitle
                aside={
                  <div className="flex gap-2">
                    <Chip tone={c.plan === "Pilot" ? "warn" : "field"}>{c.plan}</Chip>
                    <WsButton size="sm" onClick={() => setEditing(c)}>
                      Edit
                    </WsButton>
                  </div>
                }
              >
                {c.name}
              </CardTitle>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-small">
                <dt className="text-ink-faint">Trade</dt>
                <dd>{c.trade}</dd>
                <dt className="text-ink-faint">Owner</dt>
                <dd>{c.ownerFirstName || "—"}</dd>
                <dt className="text-ink-faint">Started</dt>
                <dd>{fmtDate(c.startedOn)}</dd>
                <dt className="text-ink-faint">Escalation</dt>
                <dd>{c.escalationContact || "—"}</dd>
                <dt className="text-ink-faint">5★ standing approval</dt>
                <dd>{c.standingApprovalFiveStar ? "Yes, recorded in agreement" : "No"}</dd>
                <dt className="text-ink-faint">Baseline owner hours</dt>
                <dd>{c.baselineOwnerHoursPerMonth === null ? "—" : `${c.baselineOwnerHoursPerMonth}h / month`}</dd>
              </dl>
              {c.voiceGuide ? <p className="mt-3 line-clamp-3 text-[0.8125rem] text-ink-soft">{c.voiceGuide}</p> : <p className="mt-3 text-[0.8125rem] text-stamp-ink">No voice guide yet; drafts will be generic until you add one.</p>}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function ClientForm({ client, onClose }: { client: Client; onClose: () => void }) {
  const [c, setC] = useState<Client>(client);
  const [err, setErr] = useState("");
  const set = <K extends keyof Client>(k: K, v: Client[K]) => setC({ ...c, [k]: v });
  const save = () => {
    if (c.name.trim().length < 2) {
      setErr("Add the business name.");
      return;
    }
    ws.upsertClient({ ...c, competitors: c.competitors.map((x) => x.trim()).filter(Boolean) });
    onClose();
  };
  return (
    <Card raised className="mb-6 p-5">
      <CardTitle>{client.name ? `Edit ${client.name}` : "New client"}</CardTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business name" htmlFor="c-name">
          <Input id="c-name" value={c.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!err} />
          {err ? <p className="mt-1 text-[0.8125rem] text-signal-ink">{err}</p> : null}
        </Field>
        <Field label="Trade" htmlFor="c-trade">
          <Select id="c-trade" value={c.trade} onChange={(e) => set("trade", e.target.value as Trade)}>
            {TRADES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Owner first name" htmlFor="c-owner" hint="Used to sign replies.">
          <Input id="c-owner" value={c.ownerFirstName} onChange={(e) => set("ownerFirstName", e.target.value)} />
        </Field>
        <Field label="Plan" htmlFor="c-plan">
          <Select id="c-plan" value={c.plan} onChange={(e) => set("plan", e.target.value as Plan)}>
            {PLANS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="Started on" htmlFor="c-start">
          <Input id="c-start" type="date" value={c.startedOn} onChange={(e) => set("startedOn", e.target.value)} />
        </Field>
        <Field label="Escalation contact" htmlFor="c-esc" hint="How the owner wants to hear about a bad review, and when.">
          <Input id="c-esc" value={c.escalationContact} onChange={(e) => set("escalationContact", e.target.value)} placeholder="SMS to business mobile, 7am–7pm" />
        </Field>
        <Field label="Owner hours per month spent on reviews before Reputrail" htmlFor="c-hours" hint="Their own estimate from the onboarding call; feeds 'time saved'.">
          <NumberInput id="c-hours" min={0} step={0.5} value={c.baselineOwnerHoursPerMonth} onChange={(v) => set("baselineOwnerHoursPerMonth", v)} />
        </Field>
        <Field label="Standing approval for 5-star thank-yous" htmlFor="c-standing" hint="Only if the agreement records it. Never for anything below five stars.">
          <label className="flex min-h-10 items-center gap-2 text-small">
            <input id="c-standing" type="checkbox" checked={c.standingApprovalFiveStar} onChange={(e) => set("standingApprovalFiveStar", e.target.checked)} className="h-4 w-4 accent-field" />
            Recorded in the signed agreement
          </label>
        </Field>
        <Field label="Voice guide" htmlFor="c-voice" className="sm:col-span-2" hint="How the owner talks to customers: greetings, sign-off, words they use and avoid, what they will never say publicly.">
          <TextArea id="c-voice" rows={6} value={c.voiceGuide} onChange={(e) => set("voiceGuide", e.target.value)} placeholder={"Warm, direct, first names. Signs off 'Cheers, Mick'. Says 'the boys' for the crew. Never discusses price publicly. Never blames the customer."} />
        </Field>
        <Field label="Competitors to benchmark (3)" htmlFor="c-comp0" className="sm:col-span-2">
          <div className="grid gap-2 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Input key={i} id={`c-comp${i}`} aria-label={`Competitor ${i + 1}`} value={c.competitors[i] ?? ""} onChange={(e) => set("competitors", c.competitors.map((x, j) => (j === i ? e.target.value : x)).concat(c.competitors.length < 3 ? Array(3 - c.competitors.length).fill("") : []).slice(0, 3))} />
            ))}
          </div>
        </Field>
        <Field label="Notes" htmlFor="c-notes" className="sm:col-span-2">
          <TextArea id="c-notes" value={c.notes} onChange={(e) => set("notes", e.target.value)} />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <WsButton variant="primary" onClick={save}>
          Save client
        </WsButton>
        <WsButton variant="ghost" onClick={onClose}>
          Cancel
        </WsButton>
        {client.name ? (
          <WsButton
            variant="danger"
            className="ml-auto"
            onClick={() => {
              if (window.confirm(`Remove ${client.name}? Their reviews and reports stay in the data but lose their link.`)) {
                ws.deleteClient(client.id);
                onClose();
              }
            }}
          >
            Remove client
          </WsButton>
        ) : null}
      </div>
    </Card>
  );
}
