import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { ExampleAudit } from "@/components/sections/ExampleAudit";
import { Success } from "@/components/sections/Success";
import { Why } from "@/components/sections/Why";
import { Faq, faqs } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { FinalCta } from "@/components/sections/FinalCta";
import { MobileCta } from "@/components/MobileCta";
import { site } from "@/lib/site";

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
        areaServed: { "@type": "City", name: "Sydney" },
        address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
        priceRange: "A$299–A$799 per month",
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
      <Header onField />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Industries />
        <Services />
        <ExampleAudit />
        <Success />
        <Why />
        <Founder />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
