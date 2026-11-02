import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="cta" className="border-t rule bg-ground-raised" aria-label="Request your free reputation audit">
      <div className="container-x py-24 md:py-32">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <h2 id="cta-heading" className="text-title text-ink">
            Your reputation. In good hands.
          </h2>
          <p className="mt-6 text-lede text-ink-soft">
            Send us your business name. Within two working days, we’ll show you where you stand and what we’d fix first.
          </p>
          <p className="mt-3 text-lede text-ink-soft">Free. No obligation. Yours to keep.</p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
            <p className="text-small text-ink-faint">
              {site.phone ? (
                <>
                  Or call{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tabular text-ink underline-offset-4 hover:underline">
                    {site.phone}
                  </a>{" "}
                  or email{" "}
                </>
              ) : (
                <>Or email </>
              )}
              <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
