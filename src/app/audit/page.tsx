import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuditForm } from "./AuditForm";

export const metadata: Metadata = {
  title: "Get your free reputation audit",
  description:
    "Send us your business name. Within two working days you’ll have a one-page audit of your reviews against three local competitors and the three things we’d fix first. Free, no obligation.",
  alternates: { canonical: "/audit" },
  robots: { index: true, follow: true },
  openGraph: {
    url: "/audit",
    title: "Get your free reputation audit · Reputrail",
    description: "One page on where your reviews stand against three local competitors, and what we’d fix first. Free, no obligation.",
  },
  twitter: { title: "Get your free reputation audit · Reputrail" },
};

const steps = [
  { title: "You tell us who you are", body: "Business name, your name, and where to send it. Under a minute." },
  {
    title: "We do the digging",
    body: "A person reads your reviews on Google, hipages and Facebook, picks three local competitors and looks at reply rates, recency and what customers keep saying.",
  },
  {
    title: "You get one page, within two working days",
    body: "Where you stand, what we found and the three things we’d fix first. Yours to keep, whether or not you work with us.",
  },
];

export default function AuditPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ground">
        <div className="container-x grid gap-10 py-10 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="text-title text-ink">See where your reputation stands.</h1>
            <p className="mt-5 max-w-[30rem] text-lede text-ink-soft">
              One page on your reviews, against three local competitors, and what we’d fix first. Free. No obligation.
            </p>
            <p className="mt-4 max-w-[30rem] text-small text-ink">No logins or access needed. We only use what’s already public.</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <AuditForm />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <ol className="grid gap-6 border-t rule pt-8">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-x-4">
                  <span className="pt-0.5 text-small tabular text-ink-faint">{i + 1}.</span>
                  <div>
                    <h2 className="text-heading text-ink">{s.title}</h2>
                    <p className="mt-1.5 text-small text-ink-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
