"use client";
import { motion } from "framer-motion";
import ProbabilityTable from "@/components/ProbabilityTable";
import { TeamProfileGrid } from "@/components/TeamProfile";
import StatBox from "@/components/StatBox";
import { TEAM_LIST } from "@/lib/teams";

export default function ModelPage() {
  const topTeam = TEAM_LIST[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          Championship Model
        </h1>
        <p className="text-sm text-[var(--dim)] mb-6">
          Probability estimates for all tournament contenders · Updated pre-tournament
        </p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox label="Favorite" value="Arizona" color="text-amber-400" delay={0} />
        <StatBox label="Title Prob" value="22" suffix="%" color="text-amber-400" delay={0.05} />
        <StatBox label="Teams Modeled" value={TEAM_LIST.length} color="text-blue-400" delay={0.1} />
        <StatBox label="1-Seeds Avg" value="15" suffix="%" color="text-green-400" delay={0.15} />
      </div>

      {/* Model methodology */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
      >
        <h2 className="font-display text-lg font-bold text-white mb-2">Methodology</h2>
        <p className="text-sm text-[var(--dim)] leading-relaxed">
          Our model combines KenPom adjusted efficiency margins, strength of schedule,
          recent form (last 10 games), injury impact, tournament experience, and home-court
          advantage for regional sites. Monte Carlo simulation (10,000 iterations) produces
          probability distributions for each round. The model favors{" "}
          <span className="text-amber-400 font-semibold">Arizona</span> due to elite defense
          (93.1 adj. defensive efficiency), tournament experience, and depth — giving them a
          22% championship probability, the highest in the field.
        </p>
      </motion.div>

      {/* Probability table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
      >
        <h2 className="font-display text-lg font-bold text-white mb-4">
          Championship Probability Rankings
        </h2>
        <ProbabilityTable />
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
