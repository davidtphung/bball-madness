"use client";
import { motion } from "framer-motion";

export default function WinProbBar({ probability, label, className = "" }) {
  const pct = Math.round(probability * 100);

  return (
    <div className={`w-full ${className}`} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} win probability`}>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--dim)]">{label}</span>
        <span className="font-mono font-bold text-[var(--text)]">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #22C55E, ${pct > 70 ? "#22C55E" : pct > 40 ? "#F59E0B" : "#EF4444"})`,
          }}
        />
      </div>
    </div>
  );
}
