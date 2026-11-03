"use client";

import { useState } from "react";
import type { Prospect } from "@/lib/domain/types";
import { applyPlacesResult, summarisePlaces } from "@/lib/places/apply";
import { log, ws } from "@/lib/storage/store";
import { placesLookupAction } from "@/app/workspace/actions";
import { WsButton } from "./ui";

/**
 * Fetch Google listing details for every prospect that has not been fetched
 * yet. High-confidence matches are applied; the rest are listed for a human.
 */
export function GoogleLookupAll({ prospects }: { prospects: Prospect[] }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [summary, setSummary] = useState<string[]>([]);

  const pending = prospects.filter((p) => !/Places API/.test(p.ratingSource));

  const run = async () => {
    if (!pending.length || running) return;
    if (!window.confirm(`Fetch Google listing details for ${pending.length} prospects? About ${pending.length} lookups, a few cents each.`)) return;
    setRunning(true);
    setSummary([]);
    const notes: string[] = [];
    let applied = 0;
    let check = 0;
    let failed = 0;
    for (let i = 0; i < pending.length; i++) {
      const p = pending[i];
      setProgress({ done: i, total: pending.length });
      try {
        const res = await placesLookupAction(p.name, p.suburb);
        if (!res.ok) {
          failed++;
          notes.push(`${p.name}: ${res.error}`);
          if (!res.configured) break;
          continue;
        }
        if (res.result.confidence === "high") {
          ws.updateProspect(p.id, applyPlacesResult(p, res.result), log("Google listing fetched", summarisePlaces(res.result), "system"));
          applied++;
        } else {
          check++;
          notes.push(`${p.name}: Google returned "${res.result.matchedName}" (${res.result.confidence} match). Open the record and fetch again to check.`);
        }
      } catch (e) {
        failed++;
        notes.push(`${p.name}: ${e instanceof Error ? e.message : "failed"}`);
      }
    }
    setProgress(null);
    setRunning(false);
    setSummary([`Applied ${applied}, ${check} need a check, ${failed} failed.`, ...notes]);
  };

  return (
    <div className="ws-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">Fill the gaps from Google</p>
          <p className="text-[0.8125rem] text-ink-soft">
            {pending.length === 0 ? "Every prospect has Google listing details." : `${pending.length} prospect${pending.length === 1 ? "" : "s"} without Google listing details. Fetches rating, review count, phone and website; applies clear matches, lists the rest.`}
          </p>
        </div>
        <WsButton variant="primary" onClick={run} disabled={running || pending.length === 0}>
          {running && progress ? `Fetching ${progress.done + 1} of ${progress.total}` : "Fetch from Google for all"}
        </WsButton>
      </div>
      {summary.length ? (
        <ul className="mt-3 grid gap-1 border-t rule pt-3 text-[0.8125rem] text-ink-soft">
          {summary.map((s, i) => (
            <li key={i} className={i === 0 ? "font-semibold text-ink" : ""}>
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
