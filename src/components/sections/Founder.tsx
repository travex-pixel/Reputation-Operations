import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { TagMark } from "@/components/Wordmark";
import { site } from "@/lib/site";

export function Founder() {
  const signature = site.founder.name
    ? `${site.founder.name}, ${site.founder.role}`
    : site.founder.role;

  return (
    <section id="founder" className="bg-ground-raised" aria-labelledby="founder-heading">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <Reveal>
            <h2 id="founder-heading" className="text-title text-ink">
              A note from the founder
            </h2>
            <div className="mt-6 grid max-w-[38rem] gap-5 text-body text-ink-soft">
              <p>
                I started Reputrail because I kept watching good tradespeople lose work to a page
                they never looked at. The work was excellent. The reviews were four years old, the
                one complaint sat there unanswered, and the quote went to someone with a tidier
                Google listing.
              </p>
              <p>
                I’m based in Sydney. I like talking to people, I’m good at calming a difficult
                conversation down, and I’d rather pick up the phone than send a ticket. That’s the
                service: a person who treats your reputation as their job, with the tools to do
                it properly in the background.
              </p>
              <p>
                We’re taking on three founding customers at the pilot price, in person, in Sydney.
                If you’d like to be one of them, or you just want a second opinion on your
                reviews, get in touch. The audit is free either way.
              </p>
            </div>
            <p className="mt-7 flex items-center gap-3 text-small font-semibold text-ink">
              <TagMark className="h-6 w-6 text-field" />
              <span>{signature}</span>
            </p>
          </Reveal>

          <Reveal className="self-start rounded-md border rule bg-ground p-6 md:p-8 lg:sticky lg:top-24">
            <h3 className="text-heading text-ink">Talk to us</h3>
            <p className="mt-2 text-small text-ink-soft">
              The quickest way to start is the free audit. If you’d rather talk first, email and
              we’ll ring you back within one working day.
            </p>
            <dl className="mt-6 grid gap-4 text-small">
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}?subject=Reputrail%20enquiry`}
                    className="break-all font-semibold text-ink underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.phone ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-ink tabular underline-offset-4 hover:underline"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                  Where
                </dt>
                <dd className="mt-1 text-ink">
                  {site.region}. Happy to meet on site or over a coffee anywhere in Greater Sydney.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                  Hours
                </dt>
                <dd className="mt-1 text-ink">
                  Reviews are checked every working day. Escalations reach you the same day.
                </dd>
              </div>
            </dl>
            <div className="mt-7 grid gap-3">
              <ButtonLink href="/audit" variant="primary-light" className="w-full">
                Get your free reputation audit
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}?subject=Reputrail%20enquiry`}
                variant="secondary"
                className="w-full"
              >
                Email us instead
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
