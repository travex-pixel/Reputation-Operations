import { RecordMotion } from "./RecordMotion";

/**
 * The record: what Reputrail does when a bad review lands, shown as the
 * dated, signed-off log a tradie would recognise. Pure CSS motion; entries
 * stamp in once. Fictional, and labelled as such.
 */
type Entry = {
  time: string;
  day?: string;
  title: string;
  detail?: string;
  tone?: "signal" | "stamp" | "neutral";
  quote?: string;
  mark?: string;
};

const entries: Entry[] = [
  {
    time: "7:42 pm",
    day: "Tue",
    title: "New Google review · 2 stars",
    quote:
      "Booked for Tuesday morning. Nobody came and nobody rang. Took a day off work for nothing.",
    tone: "signal",
  },
  {
    time: "7:49 pm",
    title: "Escalated to you by text",
    detail: "A missed booking, not a workmanship complaint. Worth a call. We suggest what to offer.",
  },
  {
    time: "8:05 pm",
    title: "Reply drafted in your voice",
    quote:
      "Sarah, that’s on us. You shouldn’t have had to chase. I’ll ring you in the morning to sort it out properly.",
  },
  {
    time: "8:20 pm",
    title: "You approve it from your phone",
    detail: "One tap. Nothing goes public without you.",
    tone: "stamp",
    mark: "Approved",
  },
  {
    time: "8:22 pm",
    title: "Reply published on Google",
    detail: "Forty minutes after the review landed. Visible to the next person who searches you.",
  },
  {
    time: "9:10 am",
    day: "Wed",
    title: "You call the customer",
    detail: "We brief you first. Rebooked for Friday, call-out fee waived. Logged.",
  },
  {
    time: "4:40 pm",
    day: "Fri",
    title: "Job done. Follow-up sent.",
    detail: "A short thank-you with a review link. She updates her review to 4 stars.",
    tone: "stamp",
    mark: "Resolved",
  },
];

export function Record({ className = "" }: { className?: string }) {
  return (
    <RecordMotion className={className}>
    <figure
      className="on-field tag-shape bg-field-deep text-ink-on-field shadow-float ring-1 ring-line-on-field"
      aria-label="Illustrative record of a negative review being handled over three days"
    >
      <figcaption className="flex items-center justify-between gap-4 border-b rule-on-field px-5 pb-3.5 pt-7 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-on-field-soft md:text-mono">
        <span>Reputation record</span>
        <span>Illustrative example</span>
      </figcaption>

      <ol className="px-5 pb-5 pt-1">
        {entries.map((e, i) => (
          <li
            key={e.time + e.title}
            className="record-entry relative grid grid-cols-[4.25rem_1fr] gap-x-4 py-3.5 md:grid-cols-[4.75rem_1fr]"
            style={{ "--i": i } as React.CSSProperties}
          >
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="record-rule absolute inset-x-0 top-0 h-px bg-line-on-field"
              />
            ) : null}

            <div className="pt-0.5 font-mono text-mono tabular text-ink-on-field-soft">
              {e.day ? <div className="text-[0.6875rem] uppercase">{e.day}</div> : null}
              <div>{e.time}</div>
            </div>

            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p
                  className={`text-[0.9375rem] font-semibold leading-snug ${
                    e.tone === "signal" ? "text-signal-on-field" : "text-ink-on-field"
                  }`}
                >
                  {e.title}
                </p>
                {e.mark ? (
                  <span
                    className="record-mark -mt-0.5 inline-block shrink-0 rounded-[3px] border-2 border-stamp px-1.5 py-px font-mono text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-stamp"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {e.mark}
                  </span>
                ) : null}
              </div>
              {e.quote ? (
                <blockquote className="mt-1.5 border-l border-line-on-field-strong pl-3 text-small text-ink-on-field-soft">
                  “{e.quote}”
                </blockquote>
              ) : null}
              {e.detail ? (
                <p className="mt-1 text-small text-ink-on-field-soft">{e.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div
        className="record-entry flex items-center justify-between gap-4 border-t rule-on-field px-5 py-3.5 font-mono text-mono text-ink-on-field-soft"
        style={{ "--i": entries.length } as React.CSSProperties}
      >
        <span>Logged by a person at Reputrail</span>
        <span className="text-stamp">Next report · 1 Dec</span>
      </div>
    </figure>
    </RecordMotion>
  );
}
