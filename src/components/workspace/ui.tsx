import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ProspectStage, Verification } from "@/lib/domain/types";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type BtnVariant = "primary" | "secondary" | "field" | "ghost" | "danger";
const btnBase =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-sm px-3.5 text-[0.9375rem] font-semibold transition-[transform,filter,background-color,border-color] duration-150 ease-out-quart disabled:pointer-events-none disabled:opacity-50";
const btnVariants: Record<BtnVariant, string> = {
  primary: "ws-btn-primary",
  secondary: "ws-btn-secondary",
  field: "ws-btn-field",
  ghost: "bg-transparent text-ink hover:bg-ground-sunken",
  danger: "border border-signal/40 bg-transparent text-signal-ink hover:bg-signal/5",
};

export function WsButton({
  variant = "secondary",
  className = "",
  size = "md",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: BtnVariant; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      className={`${btnBase} ${btnVariants[variant]} ${size === "sm" ? "h-8 px-2.5 text-[0.8125rem]" : ""} ${className}`}
      {...rest}
    />
  );
}

export function WsLink({
  variant = "secondary",
  className = "",
  size = "md",
  href,
  children,
}: {
  variant?: BtnVariant;
  className?: string;
  size?: "sm" | "md";
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${btnBase} ${btnVariants[variant]} ${size === "sm" ? "h-8 px-2.5 text-[0.8125rem]" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title,
  lede,
  actions,
}: {
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.025em] text-ink opsz-display md:text-[2rem]">{title}</h1>
        {lede ? <p className="mt-1.5 max-w-[46rem] text-small text-ink-soft">{lede}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({ children, className = "", raised = false }: { children: ReactNode; className?: string; raised?: boolean }) {
  return <div className={`${raised ? "ws-card-raised" : "ws-card"} ${className}`}>{children}</div>;
}

export function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{children}</h2>
      {aside}
    </div>
  );
}

export function Stat({ label, value, hint, tone = "neutral" }: { label: string; value: string | number; hint?: string; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const toneCls = tone === "good" ? "text-green-mid" : tone === "warn" ? "text-stamp-ink" : tone === "bad" ? "text-signal-ink" : "text-ink";
  return (
    <div className="ws-card p-4">
      <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">{label}</div>
      <div className={`mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] tabular opsz-display ${toneCls}`}>{value}</div>
      {hint ? <div className="mt-0.5 text-[0.75rem] text-ink-faint">{hint}</div> : null}
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-line-strong bg-ground-raised/60 px-6 py-10 text-center">
      <p className="text-[1rem] font-semibold text-ink">{title}</p>
      {body ? <p className="mx-auto mt-1.5 max-w-[32rem] text-small text-ink-soft">{body}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form fields                                                         */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  children,
  htmlFor,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="ws-label">
        {label}
      </label>
      {children}
      {hint ? <p className="ws-hint">{hint}</p> : null}
    </div>
  );
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input {...props} className={`ws-field ${props.className ?? ""}`} />;
}

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return <select {...props} className={`ws-field ${props.className ?? ""}`} />;
}

export function TextArea(props: ComponentPropsWithoutRef<"textarea">) {
  return <textarea {...props} className={`ws-field ${props.className ?? ""}`} />;
}

/** Number input that keeps null for blank, never 0. */
export function NumberInput({
  value,
  onChange,
  ...rest
}: Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> & {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <input
      {...rest}
      type="number"
      inputMode="decimal"
      value={value === null ? "" : value}
      onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
      className={`ws-field tabular ${rest.className ?? ""}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Chips                                                               */
/* ------------------------------------------------------------------ */

const stageTone: Record<ProspectStage, string> = {
  Researching: "bg-ground-sunken text-ink-soft border-line",
  Qualified: "bg-[#e6efe9] text-green-mid border-[#c9dccf]",
  "Audit prepared": "bg-[#e6efe9] text-green-mid border-[#c9dccf]",
  Contacted: "bg-[#fdf1dc] text-stamp-ink border-[#f3d9a8]",
  "Meeting booked": "bg-[#fdf1dc] text-stamp-ink border-[#f3d9a8]",
  "Pilot proposed": "bg-[#fdf1dc] text-stamp-ink border-[#f3d9a8]",
  Won: "bg-field text-ink-on-field border-field",
  Lost: "bg-ground-sunken text-ink-faint border-line line-through",
};

export function StageChip({ stage }: { stage: ProspectStage }) {
  return <span className={`ws-chip ${stageTone[stage]}`}>{stage}</span>;
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "info" | "field" }) {
  const cls = {
    neutral: "bg-ground-sunken text-ink-soft border-line",
    good: "bg-[#e6efe9] text-green-mid border-[#c9dccf]",
    warn: "bg-[#fdf1dc] text-stamp-ink border-[#f3d9a8]",
    bad: "bg-[#fbe9e4] text-signal-ink border-[#f0c9bf]",
    info: "bg-[#e8eef5] text-[#2a4a6b] border-[#cbd8e6]",
    field: "bg-field text-ink-on-field border-field",
  }[tone];
  return <span className={`ws-chip ${cls}`}>{children}</span>;
}

export function VerifyChip({ v }: { v: Verification }) {
  const map: Record<Verification, { label: string; tone: "good" | "warn" | "neutral" }> = {
    observed: { label: "Observed", tone: "good" },
    inferred: { label: "Inferred", tone: "warn" },
    unverified: { label: "Unverified", tone: "neutral" },
  };
  return <Chip tone={map[v].tone}>{map[v].label}</Chip>;
}

export function Meter({ value, max = 100, tone }: { value: number | null; max?: number; tone?: "good" | "warn" | "bad" }) {
  const pct = value === null ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  const t = tone ?? (pct >= 70 ? "good" : pct >= 45 ? "warn" : "bad");
  return (
    <div className="ws-meter" data-tone={t} role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value ?? undefined}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)) : "—";

export const fmtDateTime = (iso: string | null | undefined) =>
  iso
    ? new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(iso))
    : "—";
