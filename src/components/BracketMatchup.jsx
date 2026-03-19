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
  const winner = result || pick;

  const getTeamStyle = (teamName) => {
    if (!isComplete) {
      if (teamName === pick) {
        return "bg-white/5 border-l-2 border-l-amber-500 text-white";
      }
      return "text-[var(--dim)]";
    }
    if (teamName === result) {
      return "bg-green-500/10 border-l-2 border-l-green-500 text-green-400";
    }
    return "text-[var(--dim)] opacity-50";
  };

  const isUpsetPick = isR64 && seed1 && seed2 && (
    (pick === team1 && seed1 > seed2) || (pick === team2 && seed2 > seed1)
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="relative group"
    >
      <div className="w-44 rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-md hover:shadow-lg hover:border-[var(--border-light)] transition-all">
        {/* Team 1 */}
        <div className={`flex items-center gap-1.5 px-2 py-1.5 transition-colors ${getTeamStyle(team1)}`}>
          {seed1 != null && (
            <span className="font-mono text-[10px] font-bold w-4 text-center text-[var(--dim)] shrink-0">
              {seed1}
            </span>
          )}
          <span className="text-xs font-medium truncate flex-1">{team1 || "TBD"}</span>
          {isComplete && result === team1 && (
            <span className="text-[10px]" aria-label="Winner">✓</span>
          )}
          {!isComplete && pick === team1 && isUpsetPick && (
            <span className="text-[10px] text-red-400" aria-label="Upset pick">⚡</span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: regionColor, opacity: 0.3 }} />

        {/* Team 2 */}
        <div className={`flex items-center gap-1.5 px-2 py-1.5 transition-colors ${getTeamStyle(team2)}`}>
          {seed2 != null && (
            <span className="font-mono text-[10px] font-bold w-4 text-center text-[var(--dim)] shrink-0">
              {seed2}
            </span>
          )}
          <span className="text-xs font-medium truncate flex-1">{team2 || "TBD"}</span>
          {isComplete && result === team2 && (
            <span className="text-[10px]" aria-label="Winner">✓</span>
          )}
          {!isComplete && pick === team2 && isUpsetPick && (
            <span className="text-[10px] text-red-400" aria-label="Upset pick">⚡</span>
          )}
        </div>
      </div>

      {/* Pick indicator tooltip */}
      {!isComplete && (
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="rounded bg-amber-500 px-1 py-0.5 text-[8px] font-bold text-black whitespace-nowrap">
            Pick: {pick}
          </div>
        </div>
      )}
    </motion.div>
  );
}
