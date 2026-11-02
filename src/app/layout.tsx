import type { Metadata, Viewport } from "next";
import { instrument, jetbrains } from "@/lib/fonts";
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
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks scripted pages so the hero feed waits for its trigger instead of starting at parse time. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
