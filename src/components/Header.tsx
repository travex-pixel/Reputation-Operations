import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "./Button";
import { nav } from "@/lib/site";

export function Header({ onField = false }: { onField?: boolean }) {
  return (
    <header
      className={`relative z-20 ${onField ? "on-field bg-field text-ink-on-field" : "bg-ground text-ink"}`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Wordmark onField={onField} />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.9375rem] font-medium underline-offset-[6px] decoration-1 transition-colors duration-200 hover:underline ${
                onField
                  ? "text-ink-on-field-soft hover:text-ink-on-field"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/#founder"
            className={`inline-flex min-h-11 items-center text-[0.9375rem] font-semibold underline-offset-[6px] decoration-1 transition-colors duration-200 hover:underline ${
              onField ? "text-ink-on-field" : "text-ink"
            }`}
          >
            Talk to us
          </Link>
          <ButtonLink
            href="/audit"
            size="sm"
            variant={onField ? "primary" : "primary-light"}
            aria-label="Get your free reputation audit"
          >
            <span aria-hidden="true" className="sm:hidden">
              Free audit
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              Get your free audit
            </span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
