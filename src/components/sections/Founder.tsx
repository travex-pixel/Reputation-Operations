import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";

export function Founder() {
  const signature = site.founder.name ? `${site.founder.name}, ${site.founder.role}` : site.founder.role;

  return (
    <Section id="founder" tone="raised" labelledBy="founder-heading">
      <Reveal className="mx-auto max-w-[40rem]">
        <h2 id="founder-heading" className="text-title text-ink">
          Good work deserves a good reputation.
        </h2>
        <div className="mt-8 grid gap-5 text-lede text-ink-soft">
          <p>
            I started Reputrail because too many good tradespeople lose work to a page they never look at. The job was done well. The one complaint sat there unanswered, and the quote went to someone with a tidier listing.
          </p>
          <p>
            I’m based in Sydney and I’d rather pick up the phone than send a ticket. If a review is bothering you, or you just want a second opinion, get in touch. The audit is free either way.
          </p>
        </div>
        <p className="mt-8 text-small font-semibold text-ink">{signature}</p>
      </Reveal>
    </Section>
  );
}
