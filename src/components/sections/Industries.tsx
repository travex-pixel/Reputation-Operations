import { Reveal } from "@/components/Reveal";
import { trades } from "@/lib/site";

export function Industries() {
  return (
    <section id="industries" className="bg-ground-raised" aria-labelledby="industries-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="industries-heading" className="text-title text-ink">
              Built for trades where one review decides the next job.
            </h2>
            <p className="mt-5 max-w-[28rem] text-lede text-ink-soft">
              Owner-run trade and home-service businesses in Greater Sydney, usually two to thirty
              staff, where the owner still answers the phone and still feels every review.
            </p>
            <p className="mt-5 max-w-[28rem] text-small text-ink-soft">
              Landscapers, pest controllers, pool and cleaning businesses: ask us. If we’re not the
              right fit, we’ll say so.
            </p>
          </Reveal>

          <ul className="border-t rule">
            {trades.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={Math.min(i * 50, 250)}
                className="grid gap-x-8 gap-y-1.5 border-b rule py-5 md:grid-cols-[11rem_1fr] md:py-6"
              >
                <h3 className="text-heading text-ink">{t.name}</h3>
                <p className="text-body text-ink-soft">{t.why}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
