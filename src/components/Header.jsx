"use client";
import { motion } from "framer-motion";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.a
            href="/"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-red-600 font-mono text-sm font-black text-white shadow-lg shadow-amber-500/20">
              TP
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-white leading-none">
                THE PROCESS
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)]">
                NLT143 Analytics
              </p>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/80">
                Champion
              </span>
              <span className="font-mono text-sm font-bold text-amber-400">
                Arizona
              </span>
            </div>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
}
