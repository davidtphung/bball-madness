"use client";
import { motion } from "framer-motion";
import WinProbBar from "./WinProbBar";

export default function LiveProbabilityTable({ rankings }) {
  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" role="table">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] w-8">#</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)]">Team</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center">Seed</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center">Region</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center w-20">Title %</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center w-20">F4 %</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center w-20">E8 %</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] text-center w-16">Chg</th>
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] hidden lg:table-cell">Title Prob</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((team, i) => {
            const isChampion = team.name === "Arizona";
            const probChange = team.liveTitleProb - team.titleProb;
            const changeStr = probChange > 0.001
              ? `+${(probChange * 100).toFixed(1)}`
              : probChange < -0.001
              ? `${(probChange * 100).toFixed(1)}`
              : "—";

            return (
              <motion.tr
                key={team.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`border-b border-[var(--border)] transition-colors ${
                  team.eliminated
                    ? "opacity-40"
                    : isChampion
                    ? "bg-amber-500/5 hover:bg-amber-500/10"
                    : "hover:bg-[var(--card-hover)]"
                }`}
              >
                <td className="py-3 font-mono text-xs text-[var(--dim)]">
                  {team.eliminated ? "—" : i + 1}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{team.logo}</span>
                    <div>
                      <span className={`text-sm font-semibold ${
                        team.eliminated
                          ? "text-[var(--dim)] line-through"
                          : isChampion
                          ? "text-amber-400"
                          : "text-white"
                      }`}>
                        {team.name}
                      </span>
                      <span className="ml-2 text-[10px] text-[var(--dim)]">{team.record}</span>
                    </div>
                    {isChampion && !team.eliminated && (
                      <span className="text-xs" aria-label="Champion pick">🏆</span>
                    )}
                    {team.eliminated && (
                      <span className="text-[10px] font-mono text-red-400 bg-red-500/10 rounded px-1.5 py-0.5">
                        OUT
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 text-center font-mono text-sm font-bold text-[var(--text)]">
                  {team.seed}
                </td>
                <td className="py-3 text-center text-xs text-[var(--dim)]">
                  {team.region}
                </td>
                <td className="py-3 text-center">
                  <span className={`font-mono text-sm font-bold ${
                    team.eliminated
                      ? "text-[var(--dim)]"
                      : isChampion
                      ? "text-amber-400"
                      : team.liveTitleProb >= 0.10
                      ? "text-green-400"
                      : "text-[var(--text)]"
                  }`}>
                    {team.eliminated ? "0%" : `${(team.liveTitleProb * 100).toFixed(0)}%`}
                  </span>
                </td>
                <td className="py-3 text-center font-mono text-sm text-[var(--text)]">
                  {team.eliminated ? "0%" : `${(team.liveF4Prob * 100).toFixed(0)}%`}
                </td>
                <td className="py-3 text-center font-mono text-sm text-[var(--text)]">
                  {team.eliminated ? "0%" : `${(team.liveE8Prob * 100).toFixed(0)}%`}
                </td>
                <td className="py-3 text-center">
                  <span className={`font-mono text-xs font-bold ${
                    probChange > 0.001
                      ? "text-green-400"
                      : probChange < -0.001
                      ? "text-red-400"
                      : "text-[var(--muted)]"
                  }`}>
                    {changeStr}
                  </span>
                </td>
                <td className="py-3 hidden lg:table-cell w-48">
                  {!team.eliminated && (
                    <WinProbBar probability={team.liveTitleProb} label={team.name} />
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
