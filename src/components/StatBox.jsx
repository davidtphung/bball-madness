"use client";
import { motion } from "framer-motion";

export default function StatBox({ label, value, suffix = "", color = "text-white", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--dim)] mb-1">
        {label}
      </p>
      <p className={`font-mono text-2xl font-bold ${color}`}>
        {value}
        {suffix && <span className="text-sm text-[var(--dim)] ml-1">{suffix}</span>}
      </p>
    </motion.div>
  );
}
