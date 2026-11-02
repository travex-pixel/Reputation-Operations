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
      { t: "7:49 pm", text: "We read it, work out what went wrong and text you: a missed booking, worth a call, here’s what we’d offer." },
      { t: "8:05 pm", text: "A short public reply in your voice is drafted and sent to you." },
      { t: "8:20 pm", text: "You approve it from your phone. It goes up on Google. Forty minutes after the review." },
    ],
  },
  {
    day: "Wednesday",
    steps: [
      { t: "9:10 am", text: "You ring the customer. We’ve briefed you first, so the call is short and goes well." },
      { t: "9:25 am", text: "Rebooked for Friday, call-out fee waived. We log what was agreed." },
    ],
  },
  {
    day: "Friday",
    steps: [
      { t: "4:40 pm", text: "Job done. We send a short thank-you with a link in case she’d like to update her review." },
      { t: "Later", text: "Whatever she decides, the next customer sees a problem that was handled, not ignored." },
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        title="Here’s what happens when something goes wrong."
        lede="One missed booking, from the review landing to the job being done. This is an illustrative example, not a real customer."
      />

      <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
        {days.map((d, di) => (
          <Reveal as="li" key={d.day} delay={di * 120}>
            <h3 className="border-t border-ink pt-4 text-heading text-ink">{d.day}</h3>
            <ol className="mt-6 grid gap-5">
              {d.steps.map((s) => (
                <li key={s.t + s.text} className="grid grid-cols-[4.5rem_1fr] gap-x-4">
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
