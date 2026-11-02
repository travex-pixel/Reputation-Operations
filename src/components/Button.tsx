import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "primary-light";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-[-0.01em] transition-[transform,background-color,color,box-shadow] duration-200 ease-out-quart select-none disabled:pointer-events-none disabled:opacity-60 active:translate-y-0";

const variants: Record<Variant, string> = {
  /** Amber on the green field — the one primary action. */
  primary:
    "bg-stamp text-field-deep shadow-lift hover:bg-[#f0b057] hover:-translate-y-px hover:shadow-float",
  /** Same amber action on the chalk ground: one action, one colour. */
  "primary-light":
    "bg-stamp text-field-deep shadow-lift hover:bg-[#f0b057] hover:-translate-y-px hover:shadow-float",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ground-raised hover:-translate-y-px",
  ghost: "bg-transparent text-ink hover:bg-ground-sunken",
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
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
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
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
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
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      className={`group/link inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold underline-offset-[5px] decoration-1 transition-colors duration-200 hover:underline ${
        onField
          ? "text-ink-on-field decoration-ink-on-field-soft"
          : "text-green-mid decoration-line-strong hover:text-ink"
      } ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
