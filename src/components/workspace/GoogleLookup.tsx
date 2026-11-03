"use client";

import { useState } from "react";
import type { Prospect } from "@/lib/domain/types";
import { applyPlacesResult, summarisePlaces } from "@/lib/places/apply";
import type { PlacesResult } from "@/lib/places/types";
import { log, ws } from "@/lib/storage/store";
import { placesLookupAction } from "@/app/workspace/actions";
import { Chip, WsButton } from "./ui";

/** One-click Google lookup for a prospect: fetch, show what came back, apply. */
export function GoogleLookup({ prospect, onApplied }: { prospect: Prospect; onApplied?: (patch: Partial<Prospect>) => void }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PlacesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const fetchIt = async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    setApplied(false);
    try {
      const res = await placesLookupAction(prospect.name, prospect.suburb);
      if (res.ok) setResult(res.result);
      else setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  };

  const apply = () => {
    if (!result) return;
    const patch = applyPlacesResult(prospect, result);
    ws.updateProspect(prospect.id, patch, log("Google listing fetched", summarisePlaces(result), "system"));
    onApplied?.(patch);
    setApplied(true);
  };

  return (
    <div className="mt-3 border-t rule pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <WsButton size="sm" onClick={fetchIt} disabled={busy}>
          {busy ? "Fetching from Google" : "Fetch from Google"}
        </WsButton>
        <span className="text-[0.8125rem] text-ink-faint">Rating, review count, phone and website from the Google listing. A few cents per fetch.</span>
      </div>
      {error ? <p className="mt-2 rounded-sm bg-[#fdf1dc] px-3 py-2 text-[0.8125rem] text-stamp-ink">{error}</p> : null}
      {result ? (
        <div className="mt-2 rounded-sm border rule bg-ground-raised p-3 text-small">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-ink">{result.matchedName || "(no name returned)"}</span>
            <Chip tone={result.confidence === "high" ? "good" : result.confidence === "medium" ? "warn" : "bad"}>{result.confidence} match</Chip>
          </div>
          {result.address ? <p className="mt-1 text-[0.8125rem] text-ink-faint">{result.address}</p> : null}
          <p className="mt-1.5 text-ink-soft">{summarisePlaces(result)}</p>
          {result.website ? <p className="mt-1 break-all text-[0.8125rem] text-ink-faint">{result.website}</p> : null}
          {result.lowStarInReturned !== null ? (
            <p className="mt-1 text-[0.8125rem] text-ink-faint">
              Of the {result.reviewsReturned} reviews Google returned, {result.lowStarInReturned} {result.lowStarInReturned === 1 ? "is" : "are"} three stars or under.
            </p>
          ) : null}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <WsButton size="sm" variant="primary" onClick={apply} disabled={applied}>
              {applied ? "Applied to record" : result.confidence === "low" ? "Apply anyway" : "Apply to record"}
            </WsButton>
            {result.mapsUrl ? (
              <a href={result.mapsUrl} target="_blank" rel="noreferrer" className="text-[0.8125rem] underline underline-offset-4">
                Open on Google Maps
              </a>
            ) : null}
            {result.confidence !== "high" ? <span className="text-[0.8125rem] text-stamp-ink">Check it is the same business before applying.</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
