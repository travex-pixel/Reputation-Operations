import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

/**
 * The same missed-booking example as the hero, seen over three days from the
 * owner’s side. Fictional, labelled as such.
 */
const days = [
  {
    day: "Tuesday evening",
    steps: [
      { t: "7:42 pm", text: "A two-star review lands. The customer took a day off and nobody came." },
      { t: "Overnight", text: "Nothing needs to happen tonight. The morning matters." },
    ],
  },
  {
    day: "Wednesday",
    steps: [
      { t: "By 8:05 am", text: "We’ve read it, texted you our read and a draft reply, and you’ve approved it from your phone. It’s on Google before most people have searched for a plumber." },
      { t: "9:10 am", text: "You ring the customer. We’ve briefed you first, so the call is short and goes well." },
      { t: "9:25 am", text: "Rebooked for Friday, fee waived. We log what was agreed." },
    ],
  },
  {
    day: "Friday",
    steps: [
      { t: "4:40 pm", text: "Job done. We send a short thank-you, nothing asked for in return. The next customer sees a problem that was handled." },
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        title="Here’s what happens when something goes wrong."
        lede="One missed booking, Tuesday night to Friday. An illustrative example, not a real customer."
      />

      <ol className="mt-10 grid gap-10 md:mt-14 md:gap-12 lg:grid-cols-3 lg:gap-10">
        {days.map((d, di) => (
          <Reveal as="li" key={d.day} delay={di * 120}>
            <h3 className="border-t border-line-strong pt-4 text-heading text-ink">{d.day}</h3>
            <ol className="mt-6 grid gap-5">
              {d.steps.map((s) => (
                <li key={s.t + s.text} className="grid grid-cols-[5.25rem_1fr] gap-x-4">
                  <span className="pt-0.5 text-small tabular text-ink-faint">{s.t}</span>
                  <p className="text-body text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
