import { ImageResponse } from "next/og";

export const ogConfig = {
  width: 1200,
  height: 630,
} as const;

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
          fontFamily: "system-ui",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, fontWeight: 600, letterSpacing: "-0.04em" }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 36, opacity: 0.7, marginTop: 16 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    ogConfig
  );
}