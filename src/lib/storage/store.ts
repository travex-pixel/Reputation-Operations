"use client";

import { useSyncExternalStore } from "react";
import type {
  ActionLog,
  Audit,
  Client,
  MonthlyReport,
  Prospect,
  ReviewRecord,
  Task,
  WorkspaceData,
} from "@/lib/domain/types";
import seed from "@/lib/data/prospects.seed.json";

/**
 * Workspace persistence.
 *
 * Deliberately simple: a single JSON document in the founder's browser
 * (localStorage), versioned, exportable and importable. Nothing leaves the
 * device except the text the founder explicitly sends to the AI actions.
 *
 * This is a `StorageAdapter`; the same interface can be backed by a hosted
 * database (Turso, Neon, Vercel Postgres) when more than one device or person
 * needs the data. See REPUTRAIL_AGENT_ROADMAP.md §Storage for the trade-offs.
 */

export const SCHEMA_VERSION = 1;
const KEY = "reputrail.workspace.v1";

export interface StorageAdapter {
  load(): WorkspaceData | null;
  save(data: WorkspaceData): void;
}

const localStorageAdapter: StorageAdapter = {
  load() {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as WorkspaceData) : null;
    } catch {
      return null;
    }
  },
  save(data) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Workspace save failed", e);
    }
  },
};

export function emptyData(): WorkspaceData {
  return {
    schemaVersion: SCHEMA_VERSION,
    prospects: [],
    clients: [],
    reviews: [],
    tasks: [],
    audits: [],
    reports: [],
    settings: { founderName: "", seededAt: null, lastExportAt: null },
  };
}

export function seededData(): WorkspaceData {
  const d = emptyData();
  d.prospects = (seed.prospects as unknown as Prospect[]).map((p) => ({ ...p }));
  d.settings.seededAt = new Date().toISOString();
  return d;
}

export const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const nowIso = () => new Date().toISOString();
export const today = () => new Date().toISOString().slice(0, 10);

export function log(action: string, details?: string, actor: ActionLog["actor"] = "founder"): ActionLog {
  return { at: nowIso(), actor, action, details };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

type Listener = () => void;
let state: WorkspaceData | null = null;
const listeners = new Set<Listener>();
let hydrated = false;
const SERVER_SNAPSHOT = emptyData();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const loaded = localStorageAdapter.load();
  state = loaded ?? seededData();
  if (!loaded) localStorageAdapter.save(state);
}

function emit() {
  for (const l of listeners) l();
}

function set(mutator: (d: WorkspaceData) => void) {
  hydrate();
  const next: WorkspaceData = structuredClone(state ?? emptyData());
  mutator(next);
  state = next;
  localStorageAdapter.save(next);
  emit();
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot(): WorkspaceData {
  hydrate();
  return state ?? SERVER_SNAPSHOT;
}

function getServerSnapshot(): WorkspaceData {
  return SERVER_SNAPSHOT;
}

export function useWorkspace(): WorkspaceData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once the client store has loaded from localStorage. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      hydrate();
      return hydrated;
    },
    () => false,
  );
}

// ---------------------------------------------------------------------------
// Mutations (all synchronous, all logged where it matters)
// ---------------------------------------------------------------------------

export const ws = {
  // Prospects
  upsertProspect(p: Prospect) {
    set((d) => {
      const i = d.prospects.findIndex((x) => x.id === p.id);
      const next = { ...p, updatedAt: nowIso() };
      if (i === -1) d.prospects.unshift(next);
      else d.prospects[i] = next;
    });
  },
  updateProspect(id: string, patch: Partial<Prospect>, logEntry?: ActionLog) {
    set((d) => {
      const p = d.prospects.find((x) => x.id === id);
      if (!p) return;
      Object.assign(p, patch, { updatedAt: nowIso() });
      if (logEntry) p.history.unshift(logEntry);
    });
  },
  deleteProspect(id: string) {
    set((d) => {
      d.prospects = d.prospects.filter((x) => x.id !== id);
    });
  },

  // Clients
  upsertClient(c: Client) {
    set((d) => {
      const i = d.clients.findIndex((x) => x.id === c.id);
      const next = { ...c, updatedAt: nowIso() };
      if (i === -1) d.clients.unshift(next);
      else d.clients[i] = next;
    });
  },
  deleteClient(id: string) {
    set((d) => {
      d.clients = d.clients.filter((x) => x.id !== id);
    });
  },

  // Reviews
  upsertReview(r: ReviewRecord) {
    set((d) => {
      const i = d.reviews.findIndex((x) => x.id === r.id);
      const next = { ...r, updatedAt: nowIso() };
      if (i === -1) d.reviews.unshift(next);
      else d.reviews[i] = next;
    });
  },
  updateReview(id: string, mutate: (r: ReviewRecord) => void) {
    set((d) => {
      const r = d.reviews.find((x) => x.id === id);
      if (!r) return;
      mutate(r);
      r.updatedAt = nowIso();
    });
  },
  deleteReview(id: string) {
    set((d) => {
      d.reviews = d.reviews.filter((x) => x.id !== id);
    });
  },

  // Tasks
  upsertTask(t: Task) {
    set((d) => {
      const i = d.tasks.findIndex((x) => x.id === t.id);
      if (i === -1) d.tasks.unshift(t);
      else d.tasks[i] = t;
    });
  },
  updateTask(id: string, mutate: (t: Task) => void) {
    set((d) => {
      const t = d.tasks.find((x) => x.id === id);
      if (!t) return;
      mutate(t);
    });
  },
  deleteTask(id: string) {
    set((d) => {
      d.tasks = d.tasks.filter((x) => x.id !== id);
    });
  },

  // Audits and reports
  saveAudit(a: Audit) {
    set((d) => {
      const i = d.audits.findIndex((x) => x.id === a.id);
      if (i === -1) d.audits.unshift(a);
      else d.audits[i] = a;
    });
  },
  deleteAudit(id: string) {
    set((d) => {
      d.audits = d.audits.filter((x) => x.id !== id);
    });
  },
  saveReport(r: MonthlyReport) {
    set((d) => {
      const i = d.reports.findIndex((x) => x.id === r.id);
      if (i === -1) d.reports.unshift(r);
      else d.reports[i] = r;
    });
  },
  deleteReport(id: string) {
    set((d) => {
      d.reports = d.reports.filter((x) => x.id !== id);
    });
  },

  // Settings and data management
  setFounderName(name: string) {
    set((d) => {
      d.settings.founderName = name;
    });
  },
  exportJson(): string {
    hydrate();
    const data = state ?? emptyData();
    set((d) => {
      d.settings.lastExportAt = nowIso();
    });
    return JSON.stringify(data, null, 2);
  },
  importJson(json: string): { ok: true } | { ok: false; error: string } {
    try {
      const parsed = JSON.parse(json) as Partial<WorkspaceData>;
      if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.prospects)) {
        return { ok: false, error: "That file doesn't look like a Reputrail workspace export." };
      }
      const base = emptyData();
      const merged: WorkspaceData = {
        ...base,
        ...parsed,
        schemaVersion: SCHEMA_VERSION,
        settings: { ...base.settings, ...(parsed.settings ?? {}) },
      } as WorkspaceData;
      state = merged;
      localStorageAdapter.save(merged);
      emit();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Import failed" };
    }
  },
  resetToSeed() {
    state = seededData();
    localStorageAdapter.save(state);
    emit();
  },
  reseedProspectsKeepingProgress() {
    set((d) => {
      const fresh = seededData().prospects;
      const byName = new Map(d.prospects.map((p) => [p.name.toLowerCase(), p]));
      d.prospects = fresh.map((f) => {
        const old = byName.get(f.name.toLowerCase());
        if (!old) return f;
        return {
          ...f,
          stage: old.stage,
          lastContacted: old.lastContacted,
          nextAction: old.nextAction,
          nextActionDue: old.nextActionDue,
          notes: old.notes,
          history: [log("Research fields refreshed from seed; progress kept", undefined, "system"), ...old.history],
        };
      });
      const freshNames = new Set(fresh.map((f) => f.name.toLowerCase()));
      for (const p of d.prospects) {
        // keep manually added prospects
        if (!freshNames.has(p.name.toLowerCase()) && !fresh.find((f) => f.id === p.id)) d.prospects.push(p);
      }
    });
  },
};
