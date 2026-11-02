"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { gateStatusAction } from "@/app/workspace/actions";
import { TagMark } from "@/components/Wordmark";
import { useHydrated, useWorkspace } from "@/lib/storage/store";

const nav = [
  { href: "/workspace", label: "Overview", exact: true },
  { href: "/workspace/prospects", label: "Prospects" },
  { href: "/workspace/audit", label: "Audit generator" },
  { href: "/workspace/ops", label: "Operations" },
  { href: "/workspace/clients", label: "Clients" },
  { href: "/workspace/reports", label: "Monthly reports" },
  { href: "/workspace/settings", label: "Settings & data" },
];

function NavLinks({ variant }: { variant: "side" | "top" }) {
  const pathname = usePathname();
  if (pathname.startsWith("/workspace/unlock")) return null;
  if (variant === "side") {
    return (
      <ul className="sticky top-20 grid gap-0.5">
        {nav.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className={`block rounded-sm px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
                  active ? "bg-ground-sunken text-ink" : "text-ink-soft hover:bg-ground-raised hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className="flex gap-1.5">
      {nav.map((n) => {
        const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
        return (
          <li key={n.href}>
            <Link
              href={n.href}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`ws-chip h-8 px-3 text-[0.8125rem] ${active ? "border-field bg-field text-ink-on-field" : "border-line bg-ground-raised text-ink-soft"}`}
            >
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Shell({ children, gated: gatedAtBuild }: { children: ReactNode; gated: boolean }) {
  const [gated, setGated] = useState<boolean | null>(gatedAtBuild ? true : null);
  useEffect(() => {
    gateStatusAction()
      .then((s) => setGated(s.gated))
      .catch(() => setGated(null));
  }, []);
  const data = useWorkspace();
  const hydrated = useHydrated();
  const openTasks = data.tasks.filter((t) => t.status !== "done").length;
  const attention = data.reviews.filter((r) => ["new", "classified", "draft_ready", "awaiting_approval", "escalated"].includes(r.status)).length;

  return (
    <div className="ws">
      <header className="ws-topbar on-field sticky top-0 z-30 text-ink-on-field">
        <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/workspace" className="flex items-center gap-2.5 rounded-sm" aria-label="Workspace overview">
              <TagMark className="h-6 w-6 text-ink-on-field" />
              <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] opsz-display" translate="no">
                Reputrail
              </span>
            </Link>
            <span className="hidden rounded-sm border border-line-on-field-strong px-1.5 py-px font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-on-field-soft sm:inline">
              Workspace
            </span>
          </div>
          <div className="flex items-center gap-3 text-[0.8125rem] text-ink-on-field-soft">
            {hydrated ? (
              <>
                <span className="hidden sm:inline tabular">
                  {attention} review{attention === 1 ? "" : "s"} need attention · {openTasks} open task{openTasks === 1 ? "" : "s"}
                </span>
              </>
            ) : null}
            <Link href="/" className="underline-offset-4 hover:underline">
              Public site
            </Link>
          </div>
        </div>
      </header>

      {gated === false ? (
        <div className="ws-no-print border-b border-[#f3d9a8] bg-[#fdf1dc] px-4 py-2 text-center text-[0.8125rem] text-stamp-ink">
          No <code className="font-mono">WORKSPACE_PASSCODE</code> is set, so this workspace is open to anyone with the URL. Fine locally; set one before deploying.
        </div>
      ) : null}

      <div className="mx-auto flex max-w-[90rem] gap-6 px-4 py-6 md:px-6 lg:py-8">
        <nav aria-label="Workspace" className="ws-sidebar hidden w-52 shrink-0 lg:block">
          <Suspense fallback={null}>
            <NavLinks variant="side" />
          </Suspense>
          <p className="mt-6 px-3 text-[0.75rem] leading-relaxed text-ink-faint">
            Data is stored in this browser only. Export a backup from Settings after each working session.
          </p>
        </nav>

        <main id="main" className="min-w-0 flex-1">
          <nav aria-label="Workspace sections" className="ws-no-print -mx-4 mb-5 overflow-x-auto px-4 lg:hidden">
            <Suspense fallback={null}>
              <NavLinks variant="top" />
            </Suspense>
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
}
