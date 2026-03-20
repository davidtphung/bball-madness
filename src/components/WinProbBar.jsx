"use client";
import { motion } from "framer-motion";

export default function WinProbBar({ probability, label, className = "" }) {
  const pct = Math.round(probability * 100);

  return (
    <div className={`w-full ${className}`} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} win probability`}>
      <div className="flex justify-between text-[10px] md:text-xs mb-1">
        <span className="text-[var(--dim)]">{label}</span>
        <span className="font-mono font-bold text-[var(--text)]">{pct}%</span>
      </div>
      <div className="h-1.5 md:h-2 w-full rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: pct > 70
              ? "linear-gradient(90deg, #2ED573, #22C55E)"
              : pct > 40
              ? "linear-gradient(90deg, #FFA502, #FF6348)"
              : "linear-gradient(90deg, #FF4757, #FF6348)",
          }}
        />
      </div>
    </div>
  );
}
