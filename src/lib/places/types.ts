/** Result of one Google Places lookup. Everything optional is "not returned", never zero. */
export interface PlacesResult {
  matchedName: string;
  confidence: "high" | "medium" | "low";
  address: string;
  phone: string;
  website: string;
  mapsUrl: string;
  businessStatus: string;
  rating: number | null;
  reviewCount: number | null;
  reviewsReturned: number;
  newestReviewDate: string;
  lowStarInReturned: number | null;
  observedOn: string;
}

export type PlacesLookup = { ok: true; result: PlacesResult } | { ok: false; error: string; configured: boolean };
