"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Starts the record's stamp-in sequence when it scrolls into view, so a phone
 * visitor sees it play rather than finding it already finished.
 * Without JS the CSS runs on load, and reduced motion shows the finished record.
 */
export function RecordMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("record-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("record-live");
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
