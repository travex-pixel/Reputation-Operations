import { RecordMotion } from "./RecordMotion";

/**
 * The hero visual: a bad review lands on Tuesday evening and is handled first
 * thing on the next working morning. A quiet, dated feed on a white sheet.
 * Entries fade in once. Fictional, and labelled as such.
 */
type Entry = {
  time: string;
  who: string;
  title: string;
  body?: string;
  quote?: string;
  state?: "signal" | "done";
};

const entries: Entry[] = [
  {
    time: "7:42 pm",
    who: "Google",
    title: "New review · 2 stars",
    quote: "Booked for Tuesday morning. Nobody came and nobody rang. Took a day off work for nothing.",
    state: "signal",
  },
  {
    time: "7:30 am",
    who: "Reputrail",
    title: "Read by a person",
    body: "Not a workmanship complaint. A missed booking, and a customer who still wants the job done.",
  },
  {
    time: "7:38 am",
    who: "Reputrail",
    title: "Issue identified",
    body: "Scheduling miss. Worth a call this morning, call-out fee waived.",
  },
  {
    time: "7:50 am",
    who: "Reputrail",
    title: "Reply drafted in your voice",
    quote: "Sarah, that’s on us. You shouldn’t have had to chase. I’ll ring you this morning and put it right.",
  },
  {
    time: "7:51 am",
    who: "Reputrail",
    title: "Sent to you for approval",
    body: "One text. The review, our read on it, and the draft.",
  },
  {
    time: "8:05 am",
    who: "You",
    title: "Approved from your phone",
    body: "Published on Google two minutes later.",
    state: "done",
  },
];

export function ActivityFeed({ className = "" }: { className?: string }) {
  return (
    <RecordMotion className={className}>
      <figure
        className="overflow-hidden rounded-md border rule bg-ground-raised shadow-float"
        aria-label="Illustrative example of how a negative review that lands on Tuesday evening is handled on Wednesday morning"
      >
        <figcaption className="flex items-center justify-between gap-4 border-b rule px-5 py-3.5 text-[0.8125rem] text-ink-faint">
          <span className="font-medium tabular text-ink">Tue 7:42 pm to Wed 8:05 am</span>
          <span className="shrink-0">Illustrative example</span>
        </figcaption>

        <ol className="px-5 pb-2 pt-1">
          {entries.map((e, i) => (
            <li
              key={e.time + e.title}
              className="record-entry relative grid grid-cols-[3.75rem_1fr] gap-x-4 py-3.5 md:grid-cols-[4.25rem_1fr]"
              style={{ "--i": i } as React.CSSProperties}
            >
              {i > 0 ? <span aria-hidden="true" className="record-rule absolute inset-x-0 top-0 h-px bg-line" /> : null}

              <div className="pt-px text-[0.8125rem] leading-snug tabular text-ink-faint">
                <div>{e.time}</div>
                <div className="mt-0.5 text-[0.75rem]">{e.who}</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-[0.9375rem] font-semibold leading-snug ${e.state === "signal" ? "text-signal-ink" : "text-ink"}`}>
                    {e.title}
                  </p>
                  {e.state === "done" ? (
                    <span
                      className="record-mark inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium text-accent"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                        <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Approved
                    </span>
                  ) : null}
                </div>
                {e.quote ? (
                  <blockquote className="mt-1.5 border-l border-line-strong pl-3 text-small text-pretty text-ink-soft">“{e.quote}”</blockquote>
                ) : null}
                {e.body ? <p className="mt-1 text-small text-ink-soft">{e.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        <div
          className="record-entry flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t rule bg-ground-sunken/60 px-5 py-3 text-[0.8125rem] text-ink-faint"
          style={{ "--i": entries.length } as React.CSSProperties}
        >
          <span className="whitespace-nowrap">Nothing published without your approval</span>
          <span className="whitespace-nowrap">Answered the next working morning</span>
        </div>
      </figure>
    </RecordMotion>
  );
}
