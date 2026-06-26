import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mavocation – Trouve ta vocation en 5 minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow violet */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(124,58,237,0.25)",
            filter: "blur(100px)",
          }}
        />
        {/* Background glow cyan */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(8,145,178,0.2)",
            filter: "blur(100px)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 36,
            background: "rgba(124,58,237,0.1)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#a78bfa",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#a78bfa",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Méthode RIASEC · Standard mondial
          </span>
        </div>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: "-2px",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              background: "linear-gradient(to right, #a78bfa, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ma
          </span>
          <span style={{ color: "#f0f0ff" }}>vocation</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          20 questions · 5 minutes · Un profil scientifique
        </div>

        {/* RIASEC letters */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 52,
          }}
        >
          {[
            { l: "R", c: "#f97316" },
            { l: "I", c: "#3b82f6" },
            { l: "A", c: "#a855f7" },
            { l: "S", c: "#10b981" },
            { l: "E", c: "#ef4444" },
            { l: "C", c: "#f59e0b" },
          ].map(({ l, c }) => (
            <div
              key={l}
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: `${c}20`,
                border: `1px solid ${c}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
                color: c,
                fontFamily: "monospace",
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
