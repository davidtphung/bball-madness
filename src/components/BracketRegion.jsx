"use client";
import { motion } from "framer-motion";
import BracketMatchup from "./BracketMatchup";
import { REGION_COLORS } from "@/lib/constants";

export default function BracketRegion({ region, regionKey, isRight = false }) {
  const color = REGION_COLORS[region.name] || "#3B82F6";
  const rounds = [
    { key: "r64", label: "R64", games: region.r64 || [] },
    { key: "r32", label: "R32", games: region.r32 || [] },
    { key: "s16", label: "S16", games: region.s16 || [] },
    { key: "e8", label: "E8", games: region.e8 ? [region.e8] : [] },
  ];

  if (isRight) rounds.reverse();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      {/* Region header */}
      <div className="flex items-center gap-2 mb-4" style={{ flexDirection: isRight ? "row-reverse" : "row" }}>
        <div className="h-6 w-1 rounded-full" style={{ background: color }} />
        <h3 className="font-display text-lg font-bold text-white">{region.name}</h3>
        <span className="text-[10px] text-[var(--dim)] font-mono">{region.site}</span>
      </div>

      {/* Bracket columns */}
      <div className={`flex gap-2 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        {rounds.map((round) => (
          <div
            key={round.key}
            className="flex flex-col justify-around gap-2 min-w-[11rem]"
            style={{
              paddingTop: round.key === "r32" ? "1.25rem" : round.key === "s16" ? "3.5rem" : round.key === "e8" ? "8rem" : 0,
            }}
          >
            <div className={`text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${isRight ? "text-right" : "text-left"}`} style={{ color }}>
              {round.label}
            </div>
            {round.games.map((game, i) => (
              <div key={game.id || `${round.key}-${i}`} className="mb-2">
                <BracketMatchup
                  game={game}
                  round={round.key}
                  index={i}
                  regionColor={color}
                  isRight={isRight}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
