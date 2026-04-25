import { ImageResponse } from "next/og";

export const alt = "Tariq Manon — Senior Web Developer & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OBSIDIAN = "#0D0D0D";
const SURFACE = "#1A1A18";
const LINE = "#2A2A28";
const GOLD = "#B09060";
const CREAM = "#F0EAE0";
const MUTED = "#888888";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: OBSIDIAN,
          backgroundImage:
            "radial-gradient(60% 60% at 18% 0%, rgba(176,144,96,0.10) 0%, rgba(13,13,13,0) 70%), radial-gradient(50% 50% at 82% 100%, rgba(176,144,96,0.08) 0%, rgba(13,13,13,0) 70%)",
          color: CREAM,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* hairline border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: `1px solid ${LINE}`,
            borderRadius: "12px",
            pointerEvents: "none",
          }}
        />

        {/* Top row: monogram + eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${LINE}`,
                borderRadius: "50%",
                color: GOLD,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.08em",
                background: SURFACE,
              }}
            >
              TM
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                letterSpacing: "0.18em",
                color: CREAM,
                textTransform: "uppercase",
              }}
            >
              Tariq Manon
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 14px",
              border: `1px solid ${LINE}`,
              borderRadius: "999px",
              background: SURFACE,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: GOLD,
              }}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: "0.18em",
                color: GOLD,
                textTransform: "uppercase",
              }}
            >
              Available for Work
            </div>
          </div>
        </div>

        {/* Middle: headline + supporting line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: CREAM,
            }}
          >
            Elegant, high-performing websites that captivate and convert.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: 880,
            }}
          >
            Senior Web Developer building Shopify, WooCommerce and Next.js stores for clients across the UK, US and Europe.
          </div>
        </div>

        {/* Bottom row: URL + CTA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.08em",
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            tariqmanon.com
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 22px",
              background: GOLD,
              color: OBSIDIAN,
              borderRadius: "6px",
              fontFamily: "system-ui, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
            }}
          >
            Book a Call →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
