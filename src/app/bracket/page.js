"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRACKET, RECORD } from "@/lib/bracket-data";
import { REGION_COLORS } from "@/lib/constants";
import BracketRegion from "@/components/BracketRegion";
import FinalFour from "@/components/FinalFour";

const REGIONS = ["east", "west", "south", "midwest"];

export default function BracketPage() {
  // Default to region view on mobile-sized viewports
  const [view, setView] = useState("region");
  const [selectedRegion, setSelectedRegion] = useState("east");

  return (
    <div className="mx-auto max-w-[100rem] px-3 md:px-4 py-4 md:py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-6"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-0.5">
          The Bracket
        </h1>
        <p className="text-[11px] md:text-sm text-[var(--dim)]">
          63 games · {RECORD.correct}W · {RECORD.wrong}L · {RECORD.pending} pending
        </p>
      </motion.div>

      {/* View toggle + region selector */}
      <div className="flex flex-col gap-2 mb-4 md:mb-6">
        {/* View toggle */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-white/[0.04] bg-[var(--card)] p-0.5">
            {[
              { key: "region", label: "By Region" },
              { key: "full", label: "Full Bracket" },
            ].map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`rounded-lg px-3 py-1.5 text-[11px] md:text-xs font-medium transition-all press-scale ${
                  view === v.key
                    ? "bg-white/[0.08] text-white"
                    : "text-[var(--dim)] active:text-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region pills — always visible in region mode, scrollable on mobile */}
        {view === "region" && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
            {REGIONS.map((r) => {
              const color = REGION_COLORS[BRACKET[r].name];
              const isActive = selectedRegion === r;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all press-scale ${
                    isActive ? "text-white" : "text-[var(--dim)] active:text-white"
                  }`}
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: isActive ? `${color}40` : "transparent",
                    background: isActive ? `${color}10` : "transparent",
                  }}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: color }} />
                  {BRACKET[r].name}
                </button>
              );
            })}
            <button
              onClick={() => setSelectedRegion("ff")}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all press-scale ${
                selectedRegion === "ff" ? "text-amber-400 border border-amber-500/30 bg-amber-500/10" : "text-[var(--dim)] border border-transparent"
              }`}
            >
              🏆 Final Four
            </button>
          </div>
        )}
      </div>

      {/* Full bracket view — hidden on small screens */}
      {view === "full" && (
        <div className="space-y-6 overflow-x-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 min-w-[44rem]">
            <div className="flex-1">
              <BracketRegion region={BRACKET.east} regionKey="east" />
            </div>
            <div className="flex-1">
              <BracketRegion region={BRACKET.west} regionKey="west" isRight />
            </div>
          </div>
          <FinalFour />
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 min-w-[44rem]">
            <div className="flex-1">
              <BracketRegion region={BRACKET.south} regionKey="south" />
            </div>
            <div className="flex-1">
              <BracketRegion region={BRACKET.midwest} regionKey="midwest" isRight />
            </div>
          </div>
        </div>
      )}

      {/* Region view — mobile-optimized */}
      {view === "region" && (
        <AnimatePresence mode="wait">
          {selectedRegion === "ff" ? (
            <motion.div
              key="ff"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <FinalFour />
            </motion.div>
          ) : (
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-x-auto"
            >
              <BracketRegion
                region={BRACKET[selectedRegion]}
                regionKey={selectedRegion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 text-[9px] md:text-[10px] text-[var(--dim)]"
      >
        <span className="font-bold uppercase tracking-widest">Legend</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Champ Pick
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Correct
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Wrong
        </span>
        <span className="flex items-center gap-1">
          <span className="text-red-400 text-[10px]">⚡</span> Upset
        </span>
      </motion.div>
    </div>
  );
}
