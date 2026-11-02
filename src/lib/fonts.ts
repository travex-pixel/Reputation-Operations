import localFont from "next/font/local";

/**
 * Instrument Sans (OFL) — one family for the whole public site: display,
 * body and labels. Variable weight 400–700; width pinned to 100 at build.
 * Self-hosted; no third-party font requests.
 */
export const instrument = localFont({
  src: "../fonts/InstrumentSans-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-instrument",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

/** JetBrains Mono (OFL) — record data in the internal workspace only. */
export const jetbrains = localFont({
  src: "../fonts/JetBrainsMono-var.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
  style: "normal",
  preload: false,
  adjustFontFallback: "Arial",
});
