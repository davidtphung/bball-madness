import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "linear-gradient(135deg, #0A0E1A 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "4px solid #F59E0B",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            fontSize: 72,
            background: "linear-gradient(135deg, #F59E0B, #DC2626)",
            backgroundClip: "text",
            color: "#F59E0B",
            lineHeight: 1,
          }}
        >
          TP
        </div>
      </div>
    ),
    { ...size }
  );
}
