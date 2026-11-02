import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "./Button";
import { nav } from "@/lib/site";

/** Minimal header: wordmark, three anchors on desktop, one action. */
export function Header() {
  return (
    <header className="relative z-20 bg-ground/90 backdrop-blur-sm">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-ink-soft underline-offset-[6px] decoration-1 transition-colors duration-200 hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/audit" size="sm" aria-label="Get your free reputation audit">
          <span aria-hidden="true" className="sm:hidden">
            Free audit
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            Get your free audit
          </span>
        </ButtonLink>
      </div>
    </header>
  );
}
