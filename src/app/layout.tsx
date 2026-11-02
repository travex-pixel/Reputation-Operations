import type { Metadata, Viewport } from "next";
import { bricolage, jetbrains } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Reputrail — Managed reputation for Sydney trade businesses",
    template: "%s · Reputrail",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "reputation management Sydney",
    "Google review response service",
    "review management for tradies",
    "trade business reviews",
    "customer feedback management Australia",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: "Reputrail — Your reputation. In good hands.",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reputrail — Your reputation. In good hands.",
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0f2c25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-stamp focus:px-4 focus:py-2 focus:font-semibold focus:text-field-deep"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
