import Link from "next/link";

/**
 * The Reputrail mark: a service tag with a punched hole and a tick,
 * the thing a tradie signs to say "checked, and due again".
 */
export function TagMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14.4 2.6a2.6 2.6 0 0 1 3.2 0l9.4 7.4a2.6 2.6 0 0 1 1 2.05V27a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 27V12.05a2.6 2.6 0 0 1 1-2.05l9.4-7.4Z"
        fill="currentColor"
      />
      <circle cx="16" cy="9.6" r="2.1" fill="var(--ground)" />
      <path
        d="M10.6 19.4l3.5 3.5 7.3-7.6"
        stroke="var(--stamp)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  onField = false,
  className = "",
}: {
  onField?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 rounded-sm ${className}`}
      aria-label="Reputrail home"
    >
      <TagMark
        className={`h-7 w-7 transition-transform duration-300 ease-out-expo group-hover:-translate-y-px ${
          onField ? "text-ink-on-field" : "text-field"
        }`}
      />
      <span
        className={`opsz-display text-[1.375rem] font-semibold tracking-[-0.03em] ${
          onField ? "text-ink-on-field" : "text-ink"
        }`}
        translate="no"
      >
        Reputrail
      </span>
    </Link>
  );
}
