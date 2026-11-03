"use client";

import { useState } from "react";
import type { Prospect, ProspectStage } from "@/lib/domain/types";
import { PITCH_SITUATIONS, generatePitch, type PitchSituation } from "@/lib/pitch/generate";
import { log, today, useWorkspace, ws } from "@/lib/storage/store";
import { Card, CardTitle, Chip, Select, WsButton } from "./ui";

/** Where the prospect sits decides which script opens by default. */
function defaultSituation(p: Prospect): PitchSituation {
  if (p.stage === "Lost") return "not_now";
  if (p.stage === "Meeting booked" || p.stage === "Pilot proposed" || p.stage === "Won") return "interested";
  if (p.lastContacted) return "no_reply";
  if (p.contactMethod && !/\d{4}/.test(p.contactMethod) && /form|email|@/i.test(p.contactMethod) && !/phone/i.test(p.contactMethod)) return "email_first";
  return "first_call";
}

const plus = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export function PitchPanel({ prospect, onApplied }: { prospect: Prospect; onApplied?: (patch: Partial<Prospect>) => void }) {
  const data = useWorkspace();
  const [situation, setSituation] = useState<PitchSituation>(() => defaultSituation(prospect));
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const pitch = generatePitch(prospect, situation, data.settings.founderName);
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(`${prospect.name} ${prospect.suburb}`.trim())}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pitch.lines.join("\n\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const outcome = (label: string, patch: Partial<Prospect>, next?: PitchSituation) => {
    const stageAfterContact: ProspectStage =
      prospect.stage === "Researching" || prospect.stage === "Qualified" || prospect.stage === "Audit prepared" ? "Contacted" : prospect.stage;
    const full = { lastContacted: today(), stage: stageAfterContact, ...patch };
    ws.updateProspect(prospect.id, full, log(`Touch: ${pitch.title}`, label));
    onApplied?.(full);
    if (next) setSituation(next);
    setDone(label);
    setTimeout(() => setDone(null), 2000);
  };

  return (
    <Card raised className="p-5">
      <CardTitle aside={<Chip tone={pitch.channel === "phone" ? "field" : "info"}>{pitch.channel === "phone" ? "Phone" : "Email"}</Chip>}>Pitch</CardTitle>
      <label className="ws-label" htmlFor="situation">
        Where are we with them?
      </label>
      <Select id="situation" value={situation} onChange={(e) => setSituation(e.target.value as PitchSituation)}>
        {PITCH_SITUATIONS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </Select>

      {pitch.gaps.length > 0 && (situation === "first_call" || situation === "email_first" || situation === "interested") ? (
        <div className="mt-4 rounded-sm border border-[#f3d9a8] bg-[#fdf1dc] px-3 py-2.5 text-[0.8125rem] text-stamp-ink">
          <p className="font-semibold">
            Check on Google Maps first ({pitch.gaps.length} blank{pitch.gaps.length === 1 ? "" : "s"}).{" "}
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Open the listing
            </a>
          </p>
          <ul className="mt-1.5 grid gap-1">
            {pitch.gaps.map((g) => (
              <li key={g.field}>
                <span className="font-medium">{g.field}:</span> {g.why}
              </li>
            ))}
          </ul>
          <p className="mt-1.5">Fill them in the research record, save, and the pitch below updates.</p>
        </div>
      ) : null}

      <div className="mt-4 rounded-sm border rule bg-ground-raised p-3.5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">{pitch.title}</p>
          <Chip tone={pitch.observation.basis === "observed" ? "good" : pitch.observation.basis === "research" ? "warn" : "neutral"}>
            {pitch.observation.basis === "observed" ? "Observation verified" : pitch.observation.basis === "research" ? "From research notes" : "No observation yet"}
          </Chip>
        </div>
        <ol className="grid gap-2.5 text-small text-ink">
          {pitch.lines.map((line, i) => (
            <li key={i} className="whitespace-pre-wrap">
              {line}
            </li>
          ))}
        </ol>
        <ul className="mt-3 grid gap-1 border-t rule pt-3 text-[0.8125rem] text-ink-soft">
          {pitch.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <WsButton size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy script"}
          </WsButton>
        </div>
      </div>

      <div className="mt-4 border-t rule pt-4">
        <p className="ws-label">How did it go?</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <WsButton size="sm" onClick={() => outcome("No answer", { nextAction: "Try again, then email", nextActionDue: plus(2) }, "voicemail")}>
            No answer
          </WsButton>
          <WsButton size="sm" onClick={() => outcome("Left message / sent email", { nextAction: "Second touch if no reply", nextActionDue: plus(5) }, "no_reply")}>
            Left message
          </WsButton>
          <WsButton size="sm" variant="primary" onClick={() => outcome("Wants the audit", { nextAction: "Fill gaps on Maps, prepare and send audit", nextActionDue: plus(2) }, "interested")}>
            Wants the audit
          </WsButton>
          <WsButton size="sm" onClick={() => outcome("Not now", { nextAction: "Quarterly check-in", nextActionDue: plus(90) }, "not_now")}>
            Not now
          </WsButton>
          <WsButton size="sm" variant="danger" onClick={() => outcome("Not interested", { stage: "Lost", nextAction: "", nextActionDue: null }, "not_now")}>
            Not interested
          </WsButton>
        </div>
        <p className="ws-hint">{done ? `Logged: ${done}. Next action and due date set.` : "Logs the touch, moves the stage and sets the next action."}</p>
      </div>
    </Card>
  );
}
