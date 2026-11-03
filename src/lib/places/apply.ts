import type { Prospect } from "@/lib/domain/types";
import type { PlacesResult } from "./types";

/** Merge a Places result into a prospect. Pure; the caller saves and logs. Blank stays blank. */
export function applyPlacesResult(p: Prospect, r: PlacesResult): Partial<Prospect> {
  const patch: Partial<Prospect> = {};
  if (r.rating !== null) patch.googleRating = r.rating;
  if (r.reviewCount !== null) patch.reviewCount = r.reviewCount;
  patch.ratingSource = "Google Maps (Places API)";
  if (r.mapsUrl) patch.ratingSourceUrl = r.mapsUrl;
  patch.observedOn = r.observedOn;
  if (r.phone && !p.contactMethod.includes(r.phone)) patch.contactMethod = `${r.phone} (Google listing)${p.contactMethod ? `; ${p.contactMethod}` : ""}`;
  if (r.website && !p.website) patch.website = r.website;
  if (r.newestReviewDate) {
    const note = `Newest Google review ${r.newestReviewDate}.`;
    patch.responseTimeEstimate = p.responseTimeEstimate.includes(note) ? p.responseTimeEstimate : `${p.responseTimeEstimate} ${note}`.trim();
  }
  const vn = `Google Places ${r.observedOn}: matched "${r.matchedName}" (${r.confidence} confidence); rating and count OBSERVED via API; star breakdown and owner replies still NOT VERIFIED.`;
  patch.verificationNotes = p.verificationNotes.includes(vn) ? p.verificationNotes : `${p.verificationNotes} ${vn}`.trim();
  if (p.researchStatus === "unverified") patch.researchStatus = "partial";
  return patch;
}

export function summarisePlaces(r: PlacesResult) {
  const bits = [
    r.rating !== null ? `${r.rating.toFixed(1)} stars` : "no rating",
    r.reviewCount !== null ? `${r.reviewCount} reviews` : "",
    r.phone || "no phone on listing",
    r.newestReviewDate ? `newest review ${r.newestReviewDate}` : "",
  ].filter(Boolean);
  return bits.join(" · ");
}
