import { Reveal } from "@/components/Reveal";
import { ButtonLink, TextLink } from "@/components/Button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="on-field bg-field text-ink-on-field" aria-labelledby="cta-heading">
      <div className="container-x py-20 md:py-28">
        <Reveal className="max-w-[44rem]">
          <h2 id="cta-heading" className="text-display text-ink-on-field">
            {site.tagline}
          </h2>
          <p className="mt-6 max-w-[34rem] text-lede text-ink-on-field-soft">
            Send us your business name. Within two working days you’ll have a one-page audit of
            where you stand and what we’d fix first. Free, no obligation, and yours to keep.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
              Get your free reputation audit
            </ButtonLink>
            <TextLink href="/#founder" onField>
              Talk to us
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
