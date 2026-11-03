/**
 * Pitch generator: deterministic, no AI. Reads a prospect record and writes
 * the words for the next touch, chosen by how the prospect has responded so
 * far. Every observation it uses is one that was actually recorded, with a
 * flag when the record is thin so the caller checks Google Maps first.
 */
import type { Prospect } from "@/lib/domain/types";
import { site } from "@/lib/site";

export const PITCH_SITUATIONS = [
  { id: "first_call", label: "First call (not contacted yet)" },
  { id: "voicemail", label: "No answer / gatekeeper" },
  { id: "email_first", label: "First email (no phone, or they prefer email)" },
  { id: "no_reply", label: "No reply after first touch" },
  { id: "interested", label: "Spoke, wants the audit" },
  { id: "not_now", label: "Spoke, not now" },
] as const;
export type PitchSituation = (typeof PITCH_SITUATIONS)[number]["id"];

export interface Observation {
  /** One sentence, safe to say out loud, built only from recorded fields. */
  text: string;
  /** Where it came from, for the caller's confidence. */
  basis: "observed" | "research" | "none";
}

export interface Gap {
  field: string;
  why: string;
}

export interface Pitch {
  situation: PitchSituation;
  channel: "phone" | "email";
  title: string;
  /** Paragraphs to say or send, in order. */
  lines: string[];
  /** Short reminders for the caller. */
  tips: string[];
  observation: Observation;
  gaps: Gap[];
  bestTime: string;
}

const money = (n: number) => `A$${n.toLocaleString("en-AU")}`;

/** Which recorded fact, if any, is strong enough to open with. */
export function pickObservation(p: Prospect): Observation {
  const src = p.ratingSource && p.ratingSource.toLowerCase() !== "none surfaced" ? p.ratingSource : "";
  const hasRating = p.googleRating !== null && !!src;

  if (p.negativeResponsePct !== null && p.negativeResponsePct < 50 && (p.oneStar ?? 0) + (p.twoStar ?? 0) + (p.threeStar ?? 0) > 0) {
    const neg = (p.oneStar ?? 0) + (p.twoStar ?? 0) + (p.threeStar ?? 0);
    return {
      text: `You've got ${neg} review${neg === 1 ? "" : "s"} at three stars or under and ${p.negativeResponsePct === 0 ? "none of them have" : `only about ${p.negativeResponsePct}% have`} a reply. Those are the ones the next customer reads first.`,
      basis: "observed",
    };
  }
  if (p.ownerResponsePct !== null && p.ownerResponsePct < 40 && p.reviewCount !== null) {
    return {
      text: `Of your last 20 reviews, ${p.ownerResponsesLast20 !== null ? `${p.ownerResponsesLast20} got` : `about ${p.ownerResponsePct}% got`} a reply from the business. Customers notice the silence more than the stars.`,
      basis: "observed",
    };
  }
  if (p.openingAngle.trim()) {
    return { text: p.openingAngle.trim().replace(/\.?\s*Offer (a|the) free audit.*$/i, "."), basis: "research" };
  }
  if (hasRating && p.reviewCount !== null) {
    return {
      text: `On ${src} you're sitting at ${p.googleRating!.toFixed(1)} from ${p.reviewCount} review${p.reviewCount === 1 ? "" : "s"}. For the work you do, that's thinner than it should be.`,
      basis: "observed",
    };
  }
  if (p.recurringComplaints.trim() && p.recurringComplaints.trim().toLowerCase() !== "not observed") {
    return { text: `The reviews that mention a problem keep coming back to the same thing: ${p.recurringComplaints.trim().replace(/\.$/, "")}.`, basis: "research" };
  }
  return {
    text: "I had a look at how the business shows up when someone searches the name, and I'd like to show you what I found.",
    basis: "none",
  };
}

/** What's blank that three minutes on Google Maps would fill. */
export function findGaps(p: Prospect): Gap[] {
  const gaps: Gap[] = [];
  if (p.googleRating === null || !/google/i.test(p.ratingSource)) gaps.push({ field: "Google rating and review count", why: "Open the Google profile and read the number off the top. Record 'Google Maps' as the source." });
  if (p.oneStar === null && p.twoStar === null && p.threeStar === null) gaps.push({ field: "Star breakdown (1, 2, 3 star)", why: "Tap the rating to see the bar chart. Negative reviews are the whole pitch." });
  if (p.ownerResponsesLast20 === null) gaps.push({ field: "Owner replies in the last 20", why: "Sort by newest, count how many of the first 20 have a response from the owner." });
  if (p.negativeLast12m === null) gaps.push({ field: "Negatives in the last 12 months", why: "Sort by lowest rating and count anything three stars or under dated in the last year." });
  if (!p.responseTimeEstimate.trim()) gaps.push({ field: "Newest review date", why: "If the newest review is months old, say so: recency is what Google and customers weigh." });
  return gaps;
}

function bestTimeFor(p: Prospect) {
  switch (p.trade) {
    case "Plumber":
    case "HVAC":
    case "Electrician":
    case "Roofer":
      return "7:30 to 8:30 am before they're on site, or 3:30 to 5 pm. Not Monday morning.";
    case "Painter":
    case "Renovator/Builder":
    case "Landscaper":
      return "Early morning or after 4 pm. Builders often answer at lunch.";
    case "Property maintenance":
      return "Mid-morning, 9:30 to 11 am, once the overnight calls are cleared.";
    default:
      return "Business hours, avoiding the first hour of the day.";
  }
}

export function generatePitch(p: Prospect, situation: PitchSituation, founderName: string): Pitch {
  const me = founderName.trim() || "[your name]";
  const biz = p.name;
  const area = p.suburb || p.serviceArea || "your area";
  const trade = p.trade === "Other" ? "trade" : p.trade === "Renovator/Builder" ? "building" : p.trade.toLowerCase();
  const obs = pickObservation(p);
  const gaps = findGaps(p);
  const pilot = site.pricing.pilot;
  const essential = site.pricing.plans[0].price;
  const audit = `I'm doing free one-page audits for a handful of ${trade} businesses: your numbers next to three competitors near you, what customers keep saying, and the three things I'd fix first. It uses only what's public, no logins.`;
  const priceLine = `If you ever wanted us to run it, plans start at ${money(essential)} a month, month to month, and the first three customers get the full service at ${money(pilot.price)} ${pilot.period}. But the audit comes first, and it's yours either way.`;
  const bestTime = bestTimeFor(p);
  const common: string[] = [
    "Say who you are in the first sentence and that you're not selling anything today.",
    "Use one observation you've seen yourself. If the record is thin, open Google Maps before you dial.",
  ];

  switch (situation) {
    case "first_call":
      return {
        situation, channel: "phone", title: "First call", observation: obs, gaps, bestTime,
        lines: [
          `Morning, it's ${me} from Reputrail. Is the owner about? It's about ${biz}'s reviews, I'll be quick and I'm not selling anything today.`,
          `Hi, ${me} here. I run a small service that looks after online reviews and customer follow-up for ${trade} businesses. Have you got two minutes? I'm not going to pitch you.`,
          `I was looking at ${biz} against a few other ${trade} businesses around ${area}. ${obs.text}`,
          `Can I ask how you handle reviews now? Who sees them, who replies, and what happens when a bad one comes in?`,
          `That's useful, thanks. Can I do one thing for you? ${audit} What email should I send it to?`,
          `If they ask the price: ${priceLine}`,
          `If no: "No worries at all. Who else should I be talking to?"`,
        ],
        tips: [...common, `Best time to ring a ${trade}: ${bestTime}`, "Listen more than you talk. Write down their exact words about the last bad review."],
      };
    case "voicemail":
      return {
        situation, channel: "phone", title: "Voicemail or gatekeeper", observation: obs, gaps, bestTime,
        lines: [
          `Gatekeeper: "It's ${me} from Reputrail. I've had a look at ${biz}'s reviews against a few competitors nearby and wanted to pass it on to the owner. Nothing to buy. When's a good time to catch them?"`,
          `Voicemail (under 20 seconds): "Hi, it's ${me} from Reputrail. I run a small service that looks after reviews for ${trade} businesses. I noticed something about how ${biz} shows up online and I've put a free one-page audit together. I'll try again ${bestTime.includes("am") ? "tomorrow morning" : "later this week"}; otherwise it's ${site.email}. Thanks."`,
          `Then log the touch here and set the next action to the time the gatekeeper gave you.`,
        ],
        tips: ["Don't leave the observation on voicemail; it reads as criticism without the conversation.", "Two attempts by phone, then switch to the first email. Never text a mobile.", `Best time: ${bestTime}`],
      };
    case "email_first":
      return {
        situation, channel: "email", title: "First email", observation: obs, gaps, bestTime,
        lines: [
          `Subject: One observation about ${biz}'s reviews`,
          `Hi there,`,
          `I run Reputrail, a small Australian service that looks after online reviews and customer follow-up for ${trade} businesses: a person reads every review, drafts the reply in your voice for your approval, and rings you the same working day when something needs handling.`,
          `Looking at ${biz} alongside other ${trade} businesses around ${area}, I noticed one thing. ${obs.text}`,
          `${audit} Would you like one?`,
          `If not, reply "no thanks" and I won't write again.`,
          `${me} · Reputrail · ${site.phone || "[your number]"} · ${site.url.replace(/^https?:\/\//, "")}`,
        ],
        tips: ["Only to a published business address (info@, the contact page). The opt-out line is required and we honour it within five working days.", "No attachments on a first email; the audit comes after they say yes."],
      };
    case "no_reply":
      return {
        situation, channel: p.contactMethod.toLowerCase().includes("form") && !/\d{4}/.test(p.contactMethod) ? "email" : "phone", title: "Second and last touch", observation: obs, gaps, bestTime,
        lines: [
          `Phone: "Hi, ${me} from Reputrail again. I ${p.lastContacted ? "rang" : "sent a note"} the other day about ${biz}'s reviews. I've gone ahead and put the one-page audit together; it's free and it's yours. Where should I send it?"`,
          `Email: "Hi there, following up once. I've put together the free audit on ${biz}: where you sit next to three ${trade} businesses near you and what I'd fix first. Reply with the best email and I'll send it over. If it's not of interest, no reply needed and I won't follow up again."`,
          `If they still don't respond: move the record to the quarterly check-in list. Two touches, then stop.`,
        ],
        tips: ["Lead with the audit being done, not the observation again.", "This is the last unprompted touch. After this, quarterly only.", "Prepare the audit before this call so 'it's ready' is true: use Prepare audit above."],
      };
    case "interested":
      return {
        situation, channel: "email", title: "They want the audit", observation: obs, gaps, bestTime,
        lines: [
          `Before you send anything: open Google Maps, fill the gaps below in the research record, then Prepare audit. Send it within two working days of the call.`,
          `Subject: Your reputation audit, ${biz}`,
          `Hi [name], thanks for the time ${p.lastContacted ? "the other day" : "today"}. Attached is the one-page audit on ${biz}; the three things I'd fix first are in the bottom third. Two things you said stuck with me: "[quote]" and "[quote]".`,
          `If you'd like us to take this on for a month, reply "let's do it" and I'll send the one-page agreement and the Google manager invite instructions; it's a two-minute job on your end and you can remove us in one click. If not, no hard feelings, and thanks again for the insight.`,
          `${me}`,
          `Five working days later, one check-in: "Did the audit land? Anything you disagree with?"`,
        ],
        tips: ["Quote their own words back; it proves someone listened.", `Pilot terms if they ask: Managed plan at ${money(pilot.price)} ${pilot.period}, nothing renews automatically, continue at ${money(site.pricing.plans[1].price)} a month or stop.`, "Move the stage to Audit prepared once it's sent, then Meeting booked if they want to talk."],
      };
    case "not_now":
      return {
        situation, channel: "email", title: "Not now", observation: obs, gaps, bestTime,
        lines: [
          `On the call: "No worries at all. Can I send the one-page audit anyway? It's yours to keep and there's no follow-up from me beyond one check-in in a few months." Then: "Who else should I be talking to?"`,
          `Same-day note: "Hi [name], thanks for being straight with me. The audit on ${biz} is attached in case it's useful. I'll check in around [month, three months from now] and otherwise leave you alone. If anything changes before then, you've got my number. ${me}"`,
          `Set the next action to a quarterly check-in and leave the stage where it is unless they said a clear no, in which case mark it Lost.`,
        ],
        tips: ["Ask for the referral every time; a no with a name is a win.", "Record the reason in the notes: price, timing, already handled, or sceptical. It changes the next pitch.", "Quarterly means quarterly. Don't drift back early."],
      };
  }
}
