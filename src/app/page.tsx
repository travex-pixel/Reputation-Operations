import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Experience } from "@/components/sections/Experience";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { WhatWeHandle } from "@/components/sections/WhatWeHandle";
import { Pricing } from "@/components/sections/Pricing";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { Differentiation } from "@/components/sections/Differentiation";
import { Founder } from "@/components/sections/Founder";
import { Faq, faqs } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { MobileCta } from "@/components/MobileCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { url: "/", title: "Reputrail - Your reputation. In good hands.", description: site.preview },
  twitter: { card: "summary_large_image", title: "Reputrail - Your reputation. In good hands.", description: site.preview },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: site.name,
        description: site.description,
        url: site.url,
        email: site.email,
        areaServed: { "@type": "Country", name: "Australia" },
        address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
        priceRange: "A$299 to A$799 per month",
        slogan: site.tagline,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Experience />
        <HowItWorks />
        <WhoWeHelp />
        <WhatWeHandle />
        <Pricing />
        <FreeAudit />
        <Differentiation />
        <Founder />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
