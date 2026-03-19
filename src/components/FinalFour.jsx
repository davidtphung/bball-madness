"use client";
import { motion } from "framer-motion";
import { BRACKET } from "@/lib/bracket-data";

export default function FinalFour() {
  const { finalFour, championship, champion } = BRACKET;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center py-8"
    >
      <h3 className="font-display text-xl font-bold text-white mb-6">Final Four & Championship</h3>

      <div className="flex items-center gap-4">
        {/* Semi 1 */}
        <FinalFourGame
          game={finalFour.semi1}
          label="Semifinal 1"
        />

        {/* Championship */}
        <div className="flex flex-col items-center">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 mb-2">
            Championship
          </div>
          <div className="relative w-52 rounded-xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-transparent p-4 shadow-xl shadow-amber-500/10">
            <div className="space-y-2">
              <TeamLine name={championship.team1} isPick={championship.pick === championship.team1} />
              <div className="h-px bg-amber-500/30" />
              <TeamLine name={championship.team2} isPick={championship.pick === championship.team2} />
            </div>
            {championship.predictedScore && (
              <div className="mt-2 text-center font-mono text-xs text-amber-400/60">
                Predicted: {championship.predictedScore}
              </div>
            )}
          </div>

          {/* Champion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 flex flex-col items-center"
          >
            <div className="text-4xl mb-1" aria-hidden="true">🏆</div>
            <div className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-2 shadow-lg shadow-amber-500/30">
              <span className="font-display text-lg font-black text-black tracking-tight">
                {champion}
              </span>
            </div>
            <span className="mt-1 text-[10px] font-mono text-amber-500/60">
              22% Title Probability
            </span>
          </motion.div>
        </div>

        {/* Semi 2 */}
        <FinalFourGame
          game={finalFour.semi2}
          label="Semifinal 2"
        />
      </div>
    </motion.div>
  );
}

function FinalFourGame({ game, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-purple-400 mb-2">
        {label}
      </div>
      <div className="w-44 rounded-lg border border-purple-500/30 bg-[var(--card)] overflow-hidden shadow-lg">
        <TeamLine name={game.team1} isPick={game.pick === game.team1} className="px-3 py-2" />
        <div className="h-px bg-purple-500/20" />
        <TeamLine name={game.team2} isPick={game.pick === game.team2} className="px-3 py-2" />
      </div>
      {game.predictedScore && (
        <div className="mt-1 font-mono text-[10px] text-[var(--dim)]">
          {game.predictedScore}
        </div>
      )}
    </div>
  );
}

function TeamLine({ name, isPick, className = "" }) {
  const isChampion = name === BRACKET.champion;
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={`text-sm font-semibold ${
        isChampion ? "text-amber-400" : isPick ? "text-white" : "text-[var(--dim)]"
      }`}>
        {name}
      </span>
      {isPick && (
        <span className={`text-[10px] font-bold ${isChampion ? "text-amber-500" : "text-green-400"}`}>
          ←
        </span>
      )}
    </div>
  );
}
