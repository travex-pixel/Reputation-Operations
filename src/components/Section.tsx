import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Shared section rhythm: generous vertical space, one container width,
 * a heading block with an optional lede. Keeps the twelve sections consistent.
 */
export function Section({
  id,
  tone = "ground",
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  tone?: "ground" | "raised";
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tone === "raised" ? "bg-ground-raised" : "bg-ground"} ${className}`}
    >
      <div className="container-x py-20 md:py-28 lg:py-32">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  lede,
  align = "left",
  className = "",
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-[40rem] ${className}`}>
      <h2 id={id} className="text-title text-ink">
        {title}
      </h2>
      {lede ? <p className={`mt-5 text-lede text-ink-soft ${align === "center" ? "mx-auto" : ""} max-w-[34rem]`}>{lede}</p> : null}
    </Reveal>
  );
}
