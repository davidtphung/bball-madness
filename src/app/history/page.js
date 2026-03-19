"use client";
import { motion } from "framer-motion";
import {
  SeedWinRateChart,
  UpsetTrendChart,
  FamousUpsetsTable,
  CinderellaTimeline,
} from "@/components/SeedHistoryChart";
import StatBox from "@/components/StatBox";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          Historical Analysis
        </h1>
        <p className="text-sm text-[var(--dim)] mb-6">
          40 years of NCAA Tournament data (1985-2025) · Seed performance, upsets, and Cinderella runs
        </p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox label="1 Seeds Win %" value="99.3" suffix="%" color="text-green-400" delay={0} />
        <StatBox label="16 Over 1 Upsets" value="2" color="text-red-400" delay={0.05} />
        <StatBox label="12 Over 5 Rate" value="35" suffix="%" color="text-amber-400" delay={0.1} />
        <StatBox label="Avg R64 Upsets" value="8.5" color="text-purple-400" delay={0.15} />
      </div>

      {/* Charts grid */}
      <div className="space-y-6">
        <SeedWinRateChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpsetTrendChart />
          <FamousUpsetsTable />
        </div>

        <CinderellaTimeline />

        {/* Key insight card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-6"
        >
          <h3 className="font-display text-lg font-bold text-amber-400 mb-2">
            Why Arizona at 22%
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[var(--dim)]">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-1">Historical Edge</p>
              <p>1-seeds win the title 22.5% of the time historically. Arizona&apos;s 93.1 adjusted defense
                ranks in the top 5% of all tournament 1-seeds since 1985.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-1">Path Advantage</p>
              <p>The West Region is projected as the most favorable for a 1-seed, with no
                other team above 5% title probability in their quadrant.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-1">Matchup Profile</p>
              <p>Arizona&apos;s defensive identity historically travels well in March.
                Elite defenses win 60% of tournament games decided by 5 or fewer points.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
