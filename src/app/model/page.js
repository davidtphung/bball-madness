"use client";
import { motion } from "framer-motion";
import { useLiveStandings } from "@/hooks/useLiveStandings";
import LiveProbabilityTable from "@/components/LiveProbabilityTable";
import { TeamProfileGrid } from "@/components/TeamProfile";
import StatBox from "@/components/StatBox";
import { TEAM_LIST } from "@/lib/teams";

export default function ModelPage() {
  const { standings } = useLiveStandings(60000);

  const probabilities = standings?.probabilities || {};
  const eliminated = new Set(standings?.eliminated || []);
  const updated = standings?.updated;

  // Find current favorite and their prob
  const liveRankings = TEAM_LIST.map((t) => ({
    ...t,
    liveTitleProb: probabilities[t.name]?.titleProb ?? t.titleProb,
    liveF4Prob: probabilities[t.name]?.f4Prob ?? t.f4Prob,
    liveE8Prob: probabilities[t.name]?.e8Prob ?? t.e8Prob,
    eliminated: eliminated.has(t.name),
  })).sort((a, b) => b.liveTitleProb - a.liveTitleProb);

  const favorite = liveRankings[0];
  const arizonaProb = probabilities["Arizona"]?.titleProb
    ? (probabilities["Arizona"].titleProb * 100).toFixed(0)
    : "22";
  const aliveCount = liveRankings.filter((t) => !t.eliminated).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-1">
              Championship Model
            </h1>
            <p className="text-sm text-[var(--dim)]">
              Live probability estimates — updates as games finish
              {updated && (
                <span className="ml-2 font-mono text-[10px] text-[var(--muted)]">
                  ({new Date(updated).toLocaleTimeString()})
                </span>
              )}
            </p>
          </div>
          {standings && (
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-[10px] font-bold text-green-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              LIVE MODEL
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick stats — live */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox
          label="Favorite"
          value={favorite?.name || "Arizona"}
          color="text-amber-400"
          delay={0}
        />
        <StatBox
          label="Arizona Title %"
          value={arizonaProb}
          suffix="%"
          color="text-amber-400"
          delay={0.05}
        />
        <StatBox
          label="Teams Alive"
          value={aliveCount}
          suffix={`/${TEAM_LIST.length}`}
          color="text-blue-400"
          delay={0.1}
        />
        <StatBox
          label="Eliminated"
          value={eliminated.size}
          color="text-red-400"
          delay={0.15}
        />
      </div>

      {/* Eliminated teams banner */}
      {eliminated.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
            Eliminated — Probability Redistributed
          </h2>
          <div className="flex flex-wrap gap-2">
            {[...eliminated].map((name) => (
              <span key={name} className="text-xs text-[var(--dim)] line-through bg-[var(--card)] rounded px-2 py-1">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
      >
        <h2 className="font-display text-lg font-bold text-white mb-2">Methodology</h2>
        <p className="text-sm text-[var(--dim)] leading-relaxed">
          Our model combines KenPom adjusted efficiency margins, strength of schedule,
          recent form, injury impact, and regional site advantages. Probabilities update
          live as teams are eliminated — their probability mass redistributes proportionally
          to surviving teams. Teams that advance get a small boost for demonstrated
          tournament performance. The model favors{" "}
          <span className="text-amber-400 font-semibold">Arizona</span> due to elite defense
          (93.1 adj. defensive efficiency), tournament experience, and depth.
        </p>
      </motion.div>

      {/* Live probability table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
      >
        <h2 className="font-display text-lg font-bold text-white mb-4">
          Live Championship Probability Rankings
        </h2>
        <LiveProbabilityTable rankings={liveRankings} />
      </motion.div>

      {/* Team profiles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-display text-lg font-bold text-white mb-4">
          Team Deep Dive
        </h2>
        <TeamProfileGrid />
      </motion.div>
    </div>
  );
}
