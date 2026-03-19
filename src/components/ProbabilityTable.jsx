"use client";
import { motion } from "framer-motion";
import WinProbBar from "./WinProbBar";
import { TEAM_LIST } from "@/lib/teams";

export default function ProbabilityTable() {
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
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--dim)] hidden lg:table-cell">Title Prob</th>
          </tr>
        </thead>
        <tbody>
          {TEAM_LIST.map((team, i) => {
            const isChampion = team.name === "Arizona";
            return (
              <motion.tr
                key={team.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors ${
                  isChampion ? "bg-amber-500/5" : ""
                }`}
              >
                <td className="py-3 font-mono text-xs text-[var(--dim)]">{i + 1}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{team.logo}</span>
                    <div>
                      <span className={`text-sm font-semibold ${isChampion ? "text-amber-400" : "text-white"}`}>
                        {team.name}
                      </span>
                      <span className="ml-2 text-[10px] text-[var(--dim)]">{team.record}</span>
                    </div>
                    {isChampion && (
                      <span className="text-xs" aria-label="Champion pick">🏆</span>
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
                    isChampion ? "text-amber-400" : team.titleProb >= 0.10 ? "text-green-400" : "text-[var(--text)]"
                  }`}>
                    {(team.titleProb * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-3 text-center font-mono text-sm text-[var(--text)]">
                  {(team.f4Prob * 100).toFixed(0)}%
                </td>
                <td className="py-3 text-center font-mono text-sm text-[var(--text)]">
                  {(team.e8Prob * 100).toFixed(0)}%
                </td>
                <td className="py-3 hidden lg:table-cell w-48">
                  <WinProbBar probability={team.titleProb} label={team.name} />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
