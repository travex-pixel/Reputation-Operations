#!/usr/bin/env node
/**
 * Build the workspace seed from the research CSV.
 * Usage: node scripts/build-seed.mjs [research/prospect-list-v2.csv]
 * Writes src/lib/data/prospects.seed.json. Blank numeric cells stay null;
 * nothing is invented. Verification notes travel with each record.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const file = process.argv[2] ?? (existsSync("research/prospect-list-v2.csv") ? "research/prospect-list-v2.csv" : "research/prospect-list.csv");
const text = readFileSync(resolve(file), "utf8");

function parseCsv(src) {
  const rows = [];
  let row = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (q) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else q = false;
      } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    if (row.some((c) => c.trim() !== "")) rows.push(row);
  }
  return rows;
}

const [header, ...data] = parseCsv(text);
const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
const get = (r, k) => (idx[k] === undefined ? "" : (r[idx[k]] ?? "").trim());
const num = (v) => {
  if (v === undefined || v === null) return null;
  const s = String(v).replace(/[^0-9.\-]/g, "");
  if (s === "" || s === "-" || s === ".") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};
const tradeMap = (t) => {
  const s = t.toLowerCase();
  if (s.includes("hvac") || s.includes("air")) return "HVAC";
  if (s.includes("plumb")) return "Plumber";
  if (s.includes("electric")) return "Electrician";
  if (s.includes("paint")) return "Painter";
  if (s.includes("roof")) return "Roofer";
  if (s.includes("renov") || s.includes("build")) return "Renovator/Builder";
  return "Other";
};
const qualityMap = (v) => {
  const s = v.toLowerCase();
  for (const k of ["personalised", "generic", "defensive", "helpful", "absent"]) if (s.includes(k)) return k;
  return "unknown";
};
const statusMap = (v) => {
  const s = v.toLowerCase();
  if (s.startsWith("verified")) return "verified";
  if (s.startsWith("partial")) return "partial";
  return "unverified";
};
const isV2 = "fit_score" in idx;
const now = new Date().toISOString();

const prospects = data.map((r, i) => {
  const id = isV2 ? get(r, "id") || `p${String(i + 1).padStart(2, "0")}` : `p${String(i + 1).padStart(2, "0")}`;
  const fit = isV2 ? num(get(r, "fit_score")) : num(get(r, "total_score")) !== null ? Math.round((num(get(r, "total_score")) / 25) * 100) : null;
  const inspected = num(get(r, "reviews_inspected"));
  return {
    id,
    name: get(r, "business_name"),
    trade: tradeMap(get(r, "trade")),
    suburb: isV2 ? get(r, "suburb") : get(r, "suburb_or_area"),
    serviceArea: isV2 ? get(r, "service_area") : get(r, "suburb_or_area"),
    website: get(r, "website"),
    contactMethod: isV2 ? get(r, "contact_method") : get(r, "public_contact_method"),
    sizeClues: isV2 ? get(r, "size_clues") : "",
    googleRating: num(isV2 ? get(r, "google_rating") : get(r, "public_rating")),
    reviewCount: num(get(r, "review_count")),
    ratingSource: get(r, "rating_source"),
    ratingSourceUrl: get(r, "rating_source_url"),
    observedOn: isV2 ? get(r, "observed_on") : "2026-11-02",
    oneStar: num(get(r, "one_star")),
    twoStar: num(get(r, "two_star")),
    threeStar: num(get(r, "three_star")),
    negativeLast12m: num(get(r, "negative_last_12m")),
    reviewsInspected: inspected ?? 0,
    ownerResponsesLast20: num(get(r, "owner_responses_last_20")),
    ownerResponsePct: num(get(r, "owner_response_pct")),
    negativeResponsePct: num(get(r, "negative_response_pct")),
    responseQuality: qualityMap(isV2 ? get(r, "response_quality") : get(r, "response_consistency")),
    responseTimeEstimate: isV2 ? get(r, "response_time_estimate") : "not observed",
    recurringComplaints: isV2 ? get(r, "recurring_complaints") : get(r, "recent_review_themes"),
    positiveThemes: isV2 ? get(r, "positive_themes") : "not observed",
    competitorComparison: get(r, "competitor_comparison"),
    cxWeaknesses: isV2 ? get(r, "cx_weaknesses") : get(r, "potential_reputation_problems"),
    fitScore: fit ?? 50,
    openingAngle: isV2 ? get(r, "opening_angle") : get(r, "personalised_opener"),
    researchStatus: statusMap(isV2 ? get(r, "research_status") : get(r, "verification_status")),
    verificationNotes: isV2 ? get(r, "verification_notes") : get(r, "verification_status"),
    sources: get(r, "sources"),
    stage: "Researching",
    lastContacted: null,
    nextAction: "Verify Google listing: rating, count, last 10 reviews, owner replies",
    nextActionDue: null,
    notes: isV2 ? "" : `Service fit: ${get(r, "service_fit_notes")}`,
    history: [{ at: now, actor: "system", action: "Seeded from research CSV", details: file }],
    createdAt: now,
    updatedAt: now,
  };
});

mkdirSync("src/lib/data", { recursive: true });
writeFileSync("src/lib/data/prospects.seed.json", JSON.stringify({ source: file, builtAt: now, prospects }, null, 2));
console.log(`Wrote ${prospects.length} prospects from ${file}`);
