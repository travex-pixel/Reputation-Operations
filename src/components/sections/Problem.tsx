import { Reveal } from "@/components/Reveal";

const scenes = [
  {
    heading: "The review lands at 9pm.",
    body: "You see it on your phone after a twelve-hour day. You’re angry, you’re tired, and the worst thing you can do is reply right now. So it sits there, unanswered, for everyone who Googles you tomorrow.",
  },
  {
    heading: "The reply you never wrote.",
    body: "Most of the trade listings we look at have more unanswered reviews than answered ones. An unanswered complaint looks like you don’t care. A rushed, defensive reply looks worse. The right reply takes twenty calm minutes you don’t have."
  },
  {
    heading: "The happy customers you never asked.",
    body: "For every customer who writes a one-star review, many more were quietly happy and said nothing online, because nobody asked them. Your rating is built by the few who felt strongly enough to write, not by everyone you did right by."
  },
];

export function Problem() {
  return (
    <section className="bg-ground" aria-labelledby="problem-heading">
      <div className="container-x py-20 md:py-28">
        <Reveal className="max-w-[44rem]">
          <h2 id="problem-heading" className="text-title text-ink">
            Your reputation is decided in the hours you’re on the tools.
          </h2>
          <p className="mt-5 text-lede text-ink-soft">
            Homeowners choose a tradie the same way they choose a restaurant: rating, recency, and
            how the owner handles the bad night. Every quote you win or lose starts with that
            page. Nobody in your business owns it, because everybody is busy doing the work.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t rule pt-10 md:grid-cols-3 md:gap-8">
          {scenes.map((s, i) => (
            <Reveal key={s.heading} delay={i * 90} className="md:border-l md:rule md:pl-6 md:first:border-l-0 md:first:pl-0">
              <h3 className="text-heading text-ink">{s.heading}</h3>
              <p className="mt-3 text-body text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 max-w-[40rem] border-t rule pt-8 md:mt-16">
          <p className="text-heading text-ink">
            Reputrail takes that job off your plate. We look after your reputation, so you can
            look after your business.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
