import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Reputrail — Your reputation. In good hands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "src/fonts/BricolageGrotesque-SemiBold-og.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0f2c25",
        color: "#eaf2ec",
        fontFamily: "Bricolage",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
          <path
            d="M14.4 2.6a2.6 2.6 0 0 1 3.2 0l9.4 7.4a2.6 2.6 0 0 1 1 2.05V27a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 27V12.05a2.6 2.6 0 0 1 1-2.05l9.4-7.4Z"
            fill="#eaf2ec"
          />
          <circle cx="16" cy="9.6" r="2.1" fill="#0f2c25" />
          <path
            d="M10.6 19.4l3.5 3.5 7.3-7.6"
            stroke="#e9a23b"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>Reputrail</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>
          Someone looking after your reviews who picks up the phone.
        </div>
        <div style={{ fontSize: 28, color: "#a3bfb2", maxWidth: 900, lineHeight: 1.35 }}>
          Managed reputation for Sydney trade businesses. Reviews watched and answered, bad ones
          escalated the same day, customers won back.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(234,242,236,0.2)",
          paddingTop: 24,
          fontSize: 24,
          color: "#a3bfb2",
        }}
      >
        <div>Your reputation. In good hands.</div>
        <div style={{ color: "#e9a23b" }}>reputrail.com.au</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, style: "normal", weight: 600 }],
    },
  );
}
