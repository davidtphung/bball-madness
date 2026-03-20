"use client";
import { motion } from "framer-motion";

export default function StatBox({ label, value, suffix = "", color = "text-white", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-[var(--card)] p-3 md:p-4 noise"
    >
      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--dim)] mb-0.5 md:mb-1">
        {label}
      </p>
      <p className={`font-mono text-xl md:text-2xl font-black ${color} leading-none`}>
        {value}
        {suffix && <span className="text-xs md:text-sm text-[var(--dim)] ml-0.5">{suffix}</span>}
      </p>
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-2xl" />
    </motion.div>
  );
}
