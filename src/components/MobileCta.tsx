"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "./Button";

/**
 * A thin bottom action bar on phones and tablets. Appears once the hero's own
 * button has scrolled away and hides again near the closing call to action,
 * so it never covers the same button twice. Respects the safe-area inset.
 */
export function MobileCta({ heroId = "hero-heading", endId = "cta-heading" }: { heroId?: string; endId?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const end = document.getElementById(endId);
    if (!hero || !end) return;
    let heroOut = false;
    let endIn = false;
    const update = () => setVisible(heroOut && !endIn);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroOut = !e.isIntersecting && e.boundingClientRect.bottom < 0;
          if (e.target === end) endIn = e.isIntersecting;
        }
        update();
      },
      { threshold: 0 },
    );
    io.observe(hero);
    io.observe(end);
    return () => io.disconnect();
  }, [heroId, endId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t rule bg-ground/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out-quart motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <p className="hidden text-small text-ink-soft sm:block">Free, no obligation, two working days.</p>
        <ButtonLink href="/audit" className="w-full sm:w-auto" tabIndex={visible ? 0 : -1}>
          Get your free reputation audit
        </ButtonLink>
      </div>
    </div>
  );
}
