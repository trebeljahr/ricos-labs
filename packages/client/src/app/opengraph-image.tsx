import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = `${siteConfig.legalName}. ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 80% 20%, #2a1a3d 0%, #14121f 55%, #0a0913 100%)",
          color: "#f6efe2",
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "14px",
            fontSize: "28px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(246,239,226,0.55)",
          }}
        >
          <span style={{ fontFamily: "serif", fontSize: "44px", letterSpacing: 0, textTransform: "none", color: "#f6efe2" }}>
            Ricos Labs
          </span>
          <span>LLC</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "880px" }}>
          <div
            style={{
              fontSize: "30px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d97757",
            }}
          >
            An independent software studio
          </div>
          <div
            style={{
              fontSize: "82px",
              lineHeight: 1.05,
              fontFamily: "serif",
              letterSpacing: "-0.01em",
            }}
          >
            Games, real-time apps, and developer tools for the browser.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "26px",
            color: "rgba(246,239,226,0.6)",
          }}
        >
          <span>playtiao.com · raptor.trebeljahr.com · ricos.site</span>
          <span>ricoslabs.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
