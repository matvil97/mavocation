import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          border: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#a78bfa",
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          mv
        </div>
      </div>
    ),
    { ...size }
  );
}
