import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Reputrail collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `Reputrail ("we", "us") is a managed online-reputation service based in ${site.region}, Australia. This policy explains how we handle personal information when you use our website, request an audit, or become a client. It is written to follow the Australian Privacy Principles even where the Privacy Act’s small-business exemption might apply to us.`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "From prospective clients: the details you give us on the audit request form (your name, business name, trade, suburb, website or listing link, email, phone, and anything you write in the notes field).",
      "From clients: business contact details, your preferences for how we respond to reviews, and the authorisation records that let us act on your behalf.",
      "From your customers, only when you ask us to run review requests: a first name and one contact detail (email or mobile) for each customer you nominate, plus the date of the completed job. We do not collect anything else about them.",
      "From public sources: the public text of reviews about your business and your competitors, as published on Google, hipages, Facebook and ProductReview.com.au.",
      "Website analytics, if enabled, are aggregated and do not identify you.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "To prepare your audit and talk to you about it. To monitor, draft and (with your approval) publish responses to reviews. To send review requests to customers you have nominated, each with a working unsubscribe link as the Spam Act 2003 requires. To prepare your monthly report. To run and improve our service.",
      "We use AI tools, including the Anthropic Claude API, to help classify reviews and produce first drafts. We remove customer contact details before any text is sent to these tools, and under Anthropic’s commercial terms our inputs are not used to train their models. A person reviews every output before it is used.",
    ],
  },
  {
    h: "What we never do",
    p: [
      "We never sell or rent personal information. We never use your customers’ details for our own marketing. We never contact your customers except to send the review request you asked for, and we stop immediately if they unsubscribe or if you ask us to.",
    ],
  },
  {
    h: "Storage, security and retention",
    p: [
      "Information is stored in access-controlled accounts (Google Workspace and encrypted documents) with two-factor authentication. Only the people working on your account can see it.",
      "We keep customer contact details for review requests for no longer than 90 days after the request is sent, then delete them. We keep client records for the life of the engagement and for up to seven years afterwards where Australian tax or legal obligations require. When you leave, we delete your customers’ details within 30 days and remove ourselves from your Google Business Profile.",
      "If we become aware of a data breach likely to cause serious harm, we will tell you promptly and notify the Office of the Australian Information Commissioner where required.",
    ],
  },
  {
    h: "Overseas disclosure",
    p: [
      "Some of our tools, including Google Workspace and the Anthropic API, process data on servers outside Australia, primarily in the United States. We minimise what is sent, and we choose providers whose terms prohibit use of our data for their own purposes.",
    ],
  },
  {
    h: "Your rights",
    p: [
      `You can ask to see, correct or delete the personal information we hold about you at any time by emailing ${site.email}. We respond within 30 days. If you are unhappy with how we have handled your information, tell us first and we will try to put it right; you may also complain to the Office of the Australian Information Commissioner at oaic.gov.au.`,
    ],
  },
  {
    h: "Changes",
    p: [
      "We will post any changes to this policy on this page with a new date. This policy was last updated on 2 November 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ground">
        <article className="container-x max-w-[44rem] py-12 md:py-20">
          <h1 className="text-title text-ink">Privacy policy</h1>
          <p className="mt-4 text-lede text-ink-soft">
            Plain English, as short as we can make it. This is a working policy for a small
            Australian business and will be reviewed by a lawyer before we take on paying
            clients.
          </p>
          <div className="mt-10 grid gap-9 border-t rule pt-9">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-heading text-ink">{s.h}</h2>
                <div className="mt-3 grid gap-3 text-body text-ink-soft">
                  {s.p.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
