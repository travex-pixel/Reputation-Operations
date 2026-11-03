import "server-only";
import type { PlacesLookup, PlacesResult } from "./types";

/**
 * Google Places API (New), server-side only. The key never reaches the browser.
 * One Text Search plus one Place Details call per business; a few cents at most.
 * Not scraping: this is Google's supported interface for listing data.
 */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\b(pty|ltd|the|and|co|services|service|group|sydney|nsw)\b/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export function matchConfidence(ours: string, theirs: string): PlacesResult["confidence"] {
  const a = new Set(norm(ours));
  const b = new Set(norm(theirs));
  if (!a.size || !b.size) return "low";
  const overlap = [...a].filter((t) => b.has(t)).length;
  const score = overlap / Math.max(a.size, b.size);
  return score >= 0.6 ? "high" : score >= 0.34 ? "medium" : "low";
}

export function placesConfigured() {
  return Boolean(process.env.GOOGLE_MAPS_API_KEY);
}

interface Place {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  businessStatus?: string;
}

export async function lookupPlace(name: string, suburb: string): Promise<PlacesLookup> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return { ok: false, configured: false, error: "Google lookup is not set up yet. Add GOOGLE_MAPS_API_KEY in Vercel and redeploy." };
  if (!name.trim()) return { ok: false, configured: true, error: "Business name is empty." };

  const search = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.businessStatus",
    },
    body: JSON.stringify({ textQuery: `${name} ${suburb} NSW`.trim(), regionCode: "AU", languageCode: "en-AU", maxResultCount: 3 }),
    signal: AbortSignal.timeout(10000),
  });
  if (!search.ok) {
    const body = (await search.text()).slice(0, 200);
    return { ok: false, configured: true, error: search.status === 403 ? "Google rejected the key. Check that Places API (New) is enabled and the key allows it." : `Google search failed (${search.status}): ${body}` };
  }
  const places = ((await search.json()).places ?? []) as Place[];
  if (!places.length) return { ok: false, configured: true, error: "No Google listing found for that name and suburb." };
  const p = places[0];
  const matchedName = p.displayName?.text ?? "";

  let reviews: { rating?: number; publishTime?: string }[] = [];
  try {
    const det = await fetch(`https://places.googleapis.com/v1/places/${p.id}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "reviews" },
      signal: AbortSignal.timeout(10000),
    });
    if (det.ok) reviews = ((await det.json()).reviews ?? []) as typeof reviews;
  } catch {
    reviews = [];
  }
  const dates = reviews.map((r) => r.publishTime ?? "").filter(Boolean).sort();
  const low = reviews.filter((r) => typeof r.rating === "number" && r.rating <= 3).length;

  return {
    ok: true,
    result: {
      matchedName,
      confidence: matchConfidence(name, matchedName),
      address: p.formattedAddress ?? "",
      phone: p.nationalPhoneNumber ?? "",
      website: p.websiteUri ?? "",
      mapsUrl: p.googleMapsUri ?? "",
      businessStatus: p.businessStatus ?? "",
      rating: typeof p.rating === "number" ? p.rating : null,
      reviewCount: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
      reviewsReturned: reviews.length,
      newestReviewDate: dates.length ? dates[dates.length - 1].slice(0, 10) : "",
      lowStarInReturned: reviews.length ? low : null,
      observedOn: new Date().toISOString().slice(0, 10),
    },
  };
}
