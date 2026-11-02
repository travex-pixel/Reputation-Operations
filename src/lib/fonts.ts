import localFont from "next/font/local";

/**
 * Bricolage Grotesque (OFL) — variable, optical size + weight.
 * Width axis pinned to 100 at build time to keep the file small.
 */
export const bricolage = localFont({
  src: "../fonts/BricolageGrotesque-var.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
  style: "normal",
  preload: true,
  adjustFontFallback: "Arial",
});

/** JetBrains Mono (OFL) — record data only: timestamps, counts, statuses. */
export const jetbrains = localFont({
  src: "../fonts/JetBrainsMono-var.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
  style: "normal",
  preload: false,
  adjustFontFallback: "Arial",
});
