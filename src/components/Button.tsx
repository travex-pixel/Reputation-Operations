import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "primary-light" | "on-field";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-[-0.005em] transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out-quart select-none disabled:pointer-events-none disabled:opacity-60 active:translate-y-0";

const variants: Record<Variant, string> = {
  /** The one primary action: deep forest green, white text. */
  primary: "bg-accent text-white shadow-lift hover:bg-accent-deep hover:-translate-y-px",
  /** Alias kept for existing call sites. */
  "primary-light": "bg-accent text-white shadow-lift hover:bg-accent-deep hover:-translate-y-px",
  /** Quiet outlined action. */
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ground-raised hover:-translate-y-px",
  ghost: "bg-transparent text-ink hover:bg-ground-sunken",
  /** On a dark surface. */
  "on-field": "bg-ink-on-field text-accent-deep shadow-lift hover:bg-white hover:-translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-3.5 text-[0.9375rem]",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-[1.0625rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} transition-transform duration-200 ease-out-quart group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Inline text link with an arrow, used for the secondary action. */
export function TextLink({
  href,
  children,
  onField = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onField?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex min-h-11 items-center gap-1.5 rounded-sm font-medium underline-offset-[6px] decoration-1 transition-colors duration-200 hover:underline ${
        onField ? "text-ink-on-field decoration-ink-on-field-soft" : "text-ink decoration-line-strong hover:text-accent"
      } ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
