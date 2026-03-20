"use client";
import { motion } from "framer-motion";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/[0.04] safe-top">
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-1 md:py-3">
        <div className="flex items-center justify-between">
          <motion.a
            href="/"
            className="flex items-center gap-2.5 group press-scale"
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 font-mono text-xs md:text-sm font-black text-white shadow-lg shadow-amber-500/20">
              TP
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight">
              <h1 className="font-display text-base md:text-lg font-bold tracking-tight text-white">
                THE PROCESS
              </h1>
              <p className="text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)]">
                NLT143 Analytics
              </p>
            </div>
          </motion.a>

          {/* Champion badge — visible on all sizes */}
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/15 px-2.5 py-1">
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-amber-500/70">
              Champ
            </span>
            <span className="font-mono text-xs md:text-sm font-bold text-gradient-gold">
              Arizona
            </span>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
}
