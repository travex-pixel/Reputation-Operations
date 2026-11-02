import { ButtonLink, TextLink } from "@/components/Button";
import { ActivityFeed } from "@/components/ActivityFeed";

export function Hero() {
  return (
    <section className="bg-ground" aria-labelledby="hero-heading">
      <div className="container-x grid gap-12 pb-20 pt-10 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-x-16 lg:pb-28 lg:pt-20">
        <div className="max-w-[36rem]">
          <p className="label text-accent">
            Human-led reputation management <span className="whitespace-nowrap">· Australia-wide</span>
          </p>
          <h1 id="hero-heading" className="mt-5 text-display text-ink">
            Your reputation.
            <br />
            In good hands.
          </h1>
          <p className="mt-6 max-w-[31rem] text-lede text-ink-soft">
            We look after your reviews, respond to customers and help resolve complaints before they cost you the next job.
          </p>
          <p className="mt-4 max-w-[31rem] text-lede text-ink-soft">
            You stay on the tools. We’ve got your reputation covered.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
            <TextLink href="/#how-it-works">See how it works</TextLink>
          </div>

          <p className="mt-8 text-small text-ink-faint">A real person. Your voice. Your approval.</p>
        </div>

        <ActivityFeed className="w-full" />
      </div>
    </section>
  );
}
