#!/usr/bin/env node
/**
 * Fill the research gaps from Google's own Places API (not scraping).
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=... node scripts/enrich-places.mjs            # writes research/prospect-places-enrichment.csv
 *   GOOGLE_MAPS_API_KEY=... node scripts/enrich-places.mjs --apply    # also merges high-confidence matches into prospect-list-v2.csv
 *   ... --ids p02,p47,p04                                               # limit to some rows
 *
 * What it fetches per business (one Text Search + one Place Details call):
 *   rating, review count, phone, website, Google Maps link, business status,
 *   and the five reviews Google returns (newest date, how many are 3 stars or under).
 * What it cannot fetch: the full star breakdown, owner reply rate, negatives over
 * 12 months. Those still need a human on the listing; the pitch panel lists them.
 *
 * Key: Google Cloud console → APIs → enable "Places API (New)" → create an API key
 * restricted to that API. At 50 businesses the cost is a few dollars at most and
 * usually inside the monthly free allowance.
 *
 * Nothing is overwritten unless --apply is passed, and then only for rows where the
 * matched name clearly agrees with ours. Blank stays blank; nothing is invented.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!KEY) {
  console.error("Set GOOGLE_MAPS_API_KEY first (Places API (New) must be enabled on the key).");
  process.exit(1);
}
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const onlyIds = (args.find((a) => a.startsWith("--ids="))?.slice(6) ?? "").split(",").filter(Boolean);
const SRC = resolve("research/prospect-list-v2.csv");
const OUT = resolve("research/prospect-places-enrichment.csv");

/* ---------- tiny CSV helpers (same rules as build-seed.mjs) ---------- */
function parseCsv(src) {
  const rows = []; let row = []; let cell = ""; let q = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (q) { if (ch === '"') { if (src[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && src[i + 1] === "\n") i++; row.push(cell); cell = ""; if (row.some((c) => c.trim() !== "")) rows.push(row); row = []; }
    else cell += ch;
  }
  if (cell !== "" || row.length) { row.push(cell); if (row.some((c) => c.trim() !== "")) rows.push(row); }
  return rows;
}
const esc = (v) => { const s = String(v ?? ""); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const toCsv = (rows) => rows.map((r) => r.map(esc).join(",")).join("\n") + "\n";

/* ---------- name matching: honest confidence, not a guess ---------- */
const norm = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]/g, " ").replace(/\b(pty|ltd|the|and|co|services|service|group|sydney|nsw)\b/g, " ").split(/\s+/).filter(Boolean);
function confidence(ours, theirs) {
  const a = new Set(norm(ours)); const b = new Set(norm(theirs));
  if (!a.size || !b.size) return "low";
  const overlap = [...a].filter((t) => b.has(t)).length;
  const score = overlap / Math.max(a.size, b.size);
  return score >= 0.6 ? "high" : score >= 0.34 ? "medium" : "low";
}

/* ---------- Places API (New) ---------- */
async function textSearch(query) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.businessStatus",
    },
    body: JSON.stringify({ textQuery: query, regionCode: "AU", languageCode: "en-AU", maxResultCount: 3 }),
  });
  if (!res.ok) throw new Error(`searchText ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).places ?? [];
}
async function details(id) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: { "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": "reviews" },
  });
  if (!res.ok) throw new Error(`details ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).reviews ?? [];
}

/* ---------- run ---------- */
const [header, ...data] = parseCsv(readFileSync(SRC, "utf8"));
const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
const get = (r, k) => (r[idx[k]] ?? "").trim();
const today = new Date().toISOString().slice(0, 10);

const outHeader = ["id", "business_name", "matched_name", "match_confidence", "matched_address", "phone", "website", "maps_url", "business_status", "google_rating", "review_count", "reviews_returned", "newest_review_date", "low_star_in_returned", "observed_on", "note"];
const outRows = [outHeader];
const applied = [];

for (const r of data) {
  const id = get(r, "id");
  if (onlyIds.length && !onlyIds.includes(id)) continue;
  const name = get(r, "business_name");
  const suburb = get(r, "suburb");
  const query = `${name} ${suburb} NSW`;
  process.stdout.write(`${id} ${name} … `);
  try {
    const places = await textSearch(query);
    if (!places.length) {
      outRows.push([id, name, "", "none", "", "", "", "", "", "", "", "", "", "", today, "No Places result for the query"]);
      console.log("no result");
      continue;
    }
    const p = places[0];
    const matched = p.displayName?.text ?? "";
    const conf = confidence(name, matched);
    let reviews = [];
    let note = "";
    try { reviews = await details(p.id); } catch (e) { note = `reviews unavailable: ${e.message}`; }
    const dates = reviews.map((v) => v.publishTime).filter(Boolean).sort();
    const newest = dates.length ? dates[dates.length - 1].slice(0, 10) : "";
    const low = reviews.filter((v) => typeof v.rating === "number" && v.rating <= 3).length;
    outRows.push([
      id, name, matched, conf, p.formattedAddress ?? "", p.nationalPhoneNumber ?? "", p.websiteUri ?? "", p.googleMapsUri ?? "", p.businessStatus ?? "",
      p.rating ?? "", p.userRatingCount ?? "", reviews.length, newest, reviews.length ? low : "", today, note,
    ]);
    console.log(`${matched} [${conf}] ${p.rating ?? "-"}★ ${p.userRatingCount ?? "-"} reviews ${p.nationalPhoneNumber ?? ""}`);

    if (APPLY && conf === "high") {
      const set = (k, v) => { if (idx[k] !== undefined) r[idx[k]] = v; };
      if (p.rating !== undefined) set("google_rating", String(p.rating));
      if (p.userRatingCount !== undefined) set("review_count", String(p.userRatingCount));
      set("rating_source", "Google Maps (Places API)");
      if (p.googleMapsUri) set("rating_source_url", p.googleMapsUri);
      set("observed_on", today);
      if (p.nationalPhoneNumber && !get(r, "contact_method").includes(p.nationalPhoneNumber)) set("contact_method", `${p.nationalPhoneNumber} (Google listing); ${get(r, "contact_method")}`.replace(/; $/, ""));
      if (p.websiteUri && !get(r, "website")) set("website", p.websiteUri);
      if (newest) set("response_time_estimate", `${get(r, "response_time_estimate")} Newest Google review ${newest}.`.trim());
      set("verification_notes", `${get(r, "verification_notes")} Places API ${today}: matched "${matched}" (${conf}); rating and count OBSERVED via API; owner replies and star breakdown still NOT VERIFIED.`.trim());
      if (get(r, "research_status") === "unverified") set("research_status", "partial");
      applied.push(id);
    }
  } catch (e) {
    outRows.push([id, name, "", "error", "", "", "", "", "", "", "", "", "", "", today, e.message]);
    console.log("error:", e.message);
  }
  await new Promise((res) => setTimeout(res, 150));
}

writeFileSync(OUT, toCsv(outRows));
console.log(`\nWrote ${OUT} (${outRows.length - 1} rows).`);
if (APPLY) {
  writeFileSync(SRC, toCsv([header, ...data]));
  console.log(`Merged ${applied.length} high-confidence rows into ${SRC}: ${applied.join(", ") || "none"}.`);
  console.log("Now run: node scripts/build-seed.mjs research/prospect-list-v2.csv, then in the workspace Settings choose 'Refresh prospects from research'.");
} else {
  console.log("Dry run. Check match_confidence in the enrichment CSV, then re-run with --apply to merge the high-confidence rows.");
}
