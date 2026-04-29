// src/lib/og.ts
// Shared OG image config: font loading, palette, dimensions for ImageResponse
import { ImageResponse } from "@vercel/og"

export const ogConfig = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Space Grotesk",
      data: await fetch(new URL("../styles/fonts/SpaceGrotesk-Medium.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
      weight: 500,
    },
  ],
} as const

export function generateOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #131313, #1c1b1b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f0e6d3",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, fontWeight: 600, letterSpacing: "-0.04em" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 36, opacity: 0.7, marginTop: 16 }}>{subtitle}</div>}
        </div>
      </div>
    ),
    ogConfig
  )
}