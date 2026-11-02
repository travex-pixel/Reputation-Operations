"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Quiet once-only reveal. Content is visible by default when JS is off
 * (the `reveal` class is only added after mount) and when reduced motion is set.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    // Already on screen: show immediately, no entrance.
    if (rect.top < window.innerHeight * 0.92) return;
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
