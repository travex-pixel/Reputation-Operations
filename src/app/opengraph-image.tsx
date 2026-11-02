import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Reputrail - Your reputation. In good hands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "src/fonts/InstrumentSans-SemiBold-og.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#faf9f6",
        color: "#171717",
        fontFamily: "Instrument",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <path
            d="M14.4 2.6a2.6 2.6 0 0 1 3.2 0l9.4 7.4a2.6 2.6 0 0 1 1 2.05V27a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 27V12.05a2.6 2.6 0 0 1 1-2.05l9.4-7.4Z"
            fill="#315b49"
          />
          <circle cx="16" cy="9.6" r="2.1" fill="#faf9f6" />
          <path d="M10.6 19.4l3.5 3.5 7.3-7.6" stroke="#faf9f6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>Reputrail</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1.02 }}>
          <div>Your reputation.</div>
          <div>In good hands.</div>
        </div>
        <div style={{ fontSize: 30, color: "#5f5f5f", maxWidth: 900, lineHeight: 1.35 }}>
          Human-led reputation management for Australian trades, home services and property managers.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e9e7e2",
          paddingTop: 24,
          fontSize: 24,
          color: "#5f5f5f",
        }}
      >
        <div>A real person. Your voice. Your approval.</div>
        <div style={{ color: "#315b49" }}>reputrail.com.au</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Instrument", data: font, style: "normal", weight: 600 }] },
  );
}
