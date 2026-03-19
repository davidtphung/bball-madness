import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#0A0E1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid #F59E0B",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          fontSize: 14,
          color: "#F59E0B",
        }}
      >
        TP
      </div>
    ),
    { ...size }
  );
}
