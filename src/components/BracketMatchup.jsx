"use client";
import { motion } from "framer-motion";

export default function BracketMatchup({ game, round, index = 0, regionColor = "#3B82F6", isRight = false }) {
  const isR64 = round === "r64";
  const team1 = isR64 ? game.t1 : game.pick1;
  const team2 = isR64 ? game.t2 : game.pick2;
  const seed1 = isR64 ? game.s1 : null;
  const seed2 = isR64 ? game.s2 : null;
  const pick = game.pick;
  const result = game.result;
  const status = game.status;

  const isComplete = status === "correct" || status === "wrong";

  const getTeamStyle = (teamName) => {
    if (!isComplete) {
      if (teamName === pick) {
        return "bg-white/[0.04] border-l-2 text-white";
      }
      return "text-[var(--dim)]";
    }
    if (teamName === result) {
      return "bg-green-500/[0.06] border-l-2 border-l-green-500 text-green-400";
    }
    return "text-[var(--muted)] opacity-40";
  };

  const isUpsetPick = isR64 && seed1 && seed2 && (
    (pick === team1 && seed1 > seed2) || (pick === team2 && seed2 > seed1)
  );

  const borderColor = !isComplete && pick ? `${regionColor}60` : "transparent";

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 12 : -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-[10.5rem] md:w-44 rounded-xl border border-white/[0.04] bg-[var(--card)] overflow-hidden shadow-sm hover:border-white/[0.08] transition-all press-scale">
        <div
          className={`flex items-center gap-1 px-2 py-1.5 md:py-2 transition-colors ${getTeamStyle(team1)}`}
          style={{ borderLeftColor: !isComplete && pick === team1 ? borderColor : undefined }}
        >
          {seed1 != null && (
            <span className="font-mono text-[9px] md:text-[10px] font-bold w-3.5 text-center text-[var(--dim)] shrink-0">
              {seed1}
            </span>
          )}
          <span className="text-[11px] md:text-xs font-medium truncate flex-1">{team1 || "TBD"}</span>
          {isComplete && result === team1 && <span className="text-[9px] text-green-400">✓</span>}
          {!isComplete && pick === team1 && isUpsetPick && <span className="text-[9px] text-red-400">⚡</span>}
        </div>
        <div className="h-px" style={{ background: `${regionColor}15` }} />
        <div
          className={`flex items-center gap-1 px-2 py-1.5 md:py-2 transition-colors ${getTeamStyle(team2)}`}
          style={{ borderLeftColor: !isComplete && pick === team2 ? borderColor : undefined }}
        >
          {seed2 != null && (
            <span className="font-mono text-[9px] md:text-[10px] font-bold w-3.5 text-center text-[var(--dim)] shrink-0">
              {seed2}
            </span>
          )}
          <span className="text-[11px] md:text-xs font-medium truncate flex-1">{team2 || "TBD"}</span>
          {isComplete && result === team2 && <span className="text-[9px] text-green-400">✓</span>}
          {!isComplete && pick === team2 && isUpsetPick && <span className="text-[9px] text-red-400">⚡</span>}
        </div>
      </div>
    </motion.div>
  );
}
