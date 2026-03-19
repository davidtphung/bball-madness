"use client";

export default function LiveDot({ size = 8, className = "" }) {
  return (
    <span
      className={`relative inline-flex ${className}`}
      role="status"
      aria-label="Live"
    >
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"
        style={{ width: size, height: size }}
      />
      <span
        className="relative inline-flex rounded-full bg-red-500"
        style={{ width: size, height: size }}
      />
    </span>
  );
}
