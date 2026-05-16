// src/lib/og.tsx
// Shared OG image config with Sovereign Architect palette
import { ImageResponse } from "next/og"

export const ogConfig = {
  width: 1200,
  height: 630,
} as const

export function generateOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #131313 0%, #1c1b1b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f0e9e0",
          fontFamily: "Space Grotesk",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255,198,139,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(163,196,255,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <div style={{ textAlign: "center", zIndex: 1, maxWidth: "800px", padding: "0 60px" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 36,
                opacity: 0.85,
                letterSpacing: "-0.02em",
              }}
            >
              {subtitle}
            </div>
          )}
          <div
            style={{
              marginTop: "80px",
              fontSize: 22,
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span style={{ color: "#ffc68b" }}>●</span>
            ALEX REEVES
            <span style={{ color: "#ffc68b" }}>●</span>
          </div>
        </div>
      </div>
    ),
    ogConfig
  )
}