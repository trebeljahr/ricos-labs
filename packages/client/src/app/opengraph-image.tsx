import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = siteConfig.seo.image.alt;
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
            "radial-gradient(60% 60% at 82% 14%, #26304A 0%, #12141E 48%, #080912 100%)",
          color: brand.palette[1].hex,
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "28px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(246,239,226,0.58)",
          }}
        >
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(70% 70% at 65% 20%, #26304A 0%, #12141E 55%, #080912 100%)",
              border: "2px solid rgba(246,239,226,0.14)",
              color: brand.palette[1].hex,
              fontFamily: "serif",
              fontSize: "54px",
              lineHeight: 1,
            }}
          >
            R
          </div>
          <span style={{ fontFamily: "serif", fontSize: "46px", letterSpacing: 0, textTransform: "none", color: brand.palette[1].hex }}>
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
              color: brand.palette[2].hex,
            }}
          >
            {brand.promise}
          </div>
          <div
            style={{
              fontSize: "82px",
              lineHeight: 1.05,
              fontFamily: "serif",
              letterSpacing: 0,
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
