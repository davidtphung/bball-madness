import { ImageResponse } from "next/og";

export const alt = "THE PROCESS — March Madness 2026 Analytics by NLT143";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0E1A",
          display: "flex",
          flexDirection: "column",
          padding: 60,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #F59E0B, #DC2626)",
          }}
        />

        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#111827",
              border: "2px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              fontSize: 24,
              color: "#F59E0B",
            }}
          >
            TP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF", lineHeight: 1.2 }}>
              THE PROCESS
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B", letterSpacing: 3 }}>
              NLT143 ANALYTICS
            </span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flex: 1, gap: 60 }}>
          {/* Left side */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <span style={{ fontSize: 64, fontWeight: "bold", color: "#FFFFFF", lineHeight: 1.1 }}>
              March Madness
            </span>
            <span style={{ fontSize: 64, fontWeight: "bold", color: "#F59E0B", lineHeight: 1.1, marginBottom: 24 }}>
              2026
            </span>
            <span style={{ fontSize: 20, color: "#64748B", marginBottom: 32 }}>
              Live bracket, probability models, and game tracking
            </span>

            {/* Champion badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#111827",
                border: "1.5px solid rgba(245,158,11,0.4)",
                borderRadius: 999,
                padding: "10px 24px",
                width: 320,
              }}
            >
              <span style={{ fontSize: 20 }}>🏆</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", letterSpacing: 2 }}>
                CHAMPION PICK
              </span>
              <span style={{ fontSize: 20, fontWeight: "bold", color: "#FBBF24", fontFamily: "monospace" }}>
                Arizona
              </span>
            </div>
          </div>

          {/* Right side — stats grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", width: 340 }}>
            {[
              { label: "TITLE PROB", value: "22%", color: "#F59E0B" },
              { label: "TEAMS MODELED", value: "11", color: "#3B82F6" },
              { label: "UPSETS CALLED", value: "7", color: "#EF4444" },
              { label: "BRACKET GAMES", value: "63", color: "#22C55E" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#111827",
                  border: "1px solid #1E293B",
                  borderRadius: 12,
                  padding: "14px 20px",
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 600, color: "#64748B", letterSpacing: 2 }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: 32, fontWeight: "bold", color: stat.color, fontFamily: "monospace" }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
          <span style={{ fontSize: 14, color: "#475569", fontFamily: "monospace" }}>
            bballmadness.davidtphung.com
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "East", color: "#3B82F6" },
              { label: "West", color: "#EF4444" },
              { label: "South", color: "#22C55E" },
              { label: "Midwest", color: "#F59E0B" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  borderRadius: 999,
                  border: `1px solid ${r.color}`,
                  padding: "4px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: r.color,
                }}
              >
                {r.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
