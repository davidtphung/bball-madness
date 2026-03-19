"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRACKET, RECORD, ROUND_LABELS } from "@/lib/bracket-data";
import { REGION_COLORS } from "@/lib/constants";
import BracketRegion from "@/components/BracketRegion";
import FinalFour from "@/components/FinalFour";

const REGIONS = ["east", "west", "south", "midwest"];

export default function BracketPage() {
  const [view, setView] = useState("full");
  const [selectedRegion, setSelectedRegion] = useState("east");

  return (
    <div className="mx-auto max-w-[100rem] px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          The Bracket
        </h1>
        <p className="text-sm text-[var(--dim)]">
          63 games · {RECORD.correct} correct · {RECORD.wrong} wrong · {RECORD.pending} pending
        </p>
      </motion.div>

      {/* View toggle */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex rounded-lg border border-[var(--border)] bg-[var(--card)] p-0.5">
          {[
            { key: "full", label: "Full Bracket" },
            { key: "region", label: "By Region" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                view === v.key
                  ? "bg-white/10 text-white"
                  : "text-[var(--dim)] hover:text-white"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === "region" && (
          <div className="flex gap-1">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedRegion === r
                    ? "text-white border"
                    : "text-[var(--dim)] hover:text-white border border-transparent"
                }`}
                style={{
                  borderColor: selectedRegion === r ? REGION_COLORS[BRACKET[r].name] : undefined,
                  background: selectedRegion === r ? `${REGION_COLORS[BRACKET[r].name]}15` : undefined,
                }}
              >
                {BRACKET[r].name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full bracket view */}
      {view === "full" && (
        <div className="space-y-8 overflow-x-auto">
          {/* Top half: East (left) vs West (right) */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="flex-1 overflow-x-auto">
              <BracketRegion region={BRACKET.east} regionKey="east" />
            </div>
            <div className="flex-1 overflow-x-auto">
              <BracketRegion region={BRACKET.west} regionKey="west" isRight />
            </div>
          </div>

          {/* Final Four */}
          <FinalFour />

          {/* Bottom half: South (left) vs Midwest (right) */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="flex-1 overflow-x-auto">
              <BracketRegion region={BRACKET.south} regionKey="south" />
            </div>
            <div className="flex-1 overflow-x-auto">
              <BracketRegion region={BRACKET.midwest} regionKey="midwest" isRight />
            </div>
          </div>
        </div>
      )}

      {/* Region view */}
      {view === "region" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <BracketRegion
              region={BRACKET[selectedRegion]}
              regionKey={selectedRegion}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap items-center gap-4 text-[10px] text-[var(--dim)]"
      >
        <span className="font-semibold uppercase tracking-widest">Legend:</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Champion Pick
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500" /> Correct
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500" /> Wrong / Upset
        </span>
        <span className="flex items-center gap-1">
          <span className="text-red-400">⚡</span> Upset Pick
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-500" /> Pending
        </span>
      </motion.div>
    </div>
  );
}
