import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { site, nav } from "@/lib/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t rule bg-ground">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-small text-ink-soft">
              {site.tagline} Human-led reputation management for trades, home services and property
              managers across Australia. Based in {site.region}.
            </p>
          </div>
          <nav aria-label="Footer" className="grid content-start gap-2 text-small">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit py-1 text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline">
                {item.label}
              </Link>
            ))}
            <Link href="/audit" className="w-fit py-1 text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline">
              Get your free reputation audit
            </Link>
          </nav>
          <div className="grid content-start gap-2 text-small">
            <a href={`mailto:${site.email}`} className="w-fit break-all py-1 text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
            {site.phone ? (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="w-fit py-1 tabular text-ink hover:underline">
                {site.phone}
              </a>
            ) : null}
            <p className="py-1 text-ink-soft">{site.region}</p>
            <Link href="/privacy" className="w-fit py-1 text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline">
              Privacy
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t rule pt-6 text-[0.8125rem] leading-relaxed text-ink-faint md:flex-row md:items-start md:justify-between">
          <p>
            © {year} {site.name}
            {site.abn ? ` · ABN ${site.abn}` : ""}. We never buy, fake or suppress reviews.
          </p>
          <p className="md:max-w-md md:text-right">
            Reputrail is independent and not affiliated with Google. Google and Google Business Profile are trade marks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
