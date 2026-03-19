"use client";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area,
} from "recharts";
import { SEED_CHART_DATA, UPSET_TREND, FAMOUS_UPSETS, CINDERELLA_RUNS } from "@/lib/seed-history";
import { CHART_COLORS } from "@/lib/constants";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 shadow-xl">
      <p className="font-mono text-sm font-bold text-white mb-1">Seed #{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[var(--dim)]">{p.name}:</span>
          <span className="font-mono font-bold text-white">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export function SeedWinRateChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
    >
      <h3 className="font-display text-lg font-bold text-white mb-1">Win Rate by Seed</h3>
      <p className="text-xs text-[var(--dim)] mb-4">Historical percentage of teams advancing by round (1985-2025)</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={SEED_CHART_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis
            dataKey="seed"
            tick={{ fill: "#64748B", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1E293B" }}
          />
          <YAxis
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1E293B" }}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Round of 64" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
          <Bar dataKey="Round of 32" fill={CHART_COLORS[1]} radius={[2, 2, 0, 0]} />
          <Bar dataKey="Sweet 16" fill={CHART_COLORS[2]} radius={[2, 2, 0, 0]} />
          <Bar dataKey="Elite Eight" fill={CHART_COLORS[3]} radius={[2, 2, 0, 0]} />
          <Bar dataKey="Final Four" fill={CHART_COLORS[4]} radius={[2, 2, 0, 0]} />
          <Bar dataKey="Championship" fill={CHART_COLORS[5]} radius={[2, 2, 0, 0]} />
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
            iconType="circle"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function UpsetTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
    >
      <h3 className="font-display text-lg font-bold text-white mb-1">Upset Trend</h3>
      <p className="text-xs text-[var(--dim)] mb-4">Total first-round upsets per tournament year</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={UPSET_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="upsetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1E293B" }}
          />
          <YAxis
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1E293B" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="upsets" stroke="#EF4444" fill="url(#upsetGrad)" strokeWidth={2} />
          <Line type="monotone" dataKey="fiveVsTwelve" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 3 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function FamousUpsetsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
    >
      <h3 className="font-display text-lg font-bold text-white mb-4">Legendary Upsets</h3>
      <div className="space-y-3">
        {FAMOUS_UPSETS.map((upset, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center gap-3 rounded-lg bg-[var(--bg)] p-3 hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="font-mono text-lg font-black text-red-400 w-12 text-center">
              #{upset.seed}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">
                {upset.team} <span className="text-red-400">def.</span> {upset.over}
              </div>
              <div className="text-[10px] text-[var(--dim)]">
                {upset.year} · {upset.round} · {upset.score}
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-[var(--dim)]">
                {upset.seed} over {upset.overSeed}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CinderellaTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
    >
      <h3 className="font-display text-lg font-bold text-white mb-4">Cinderella Runs</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" />
        <div className="space-y-4">
          {CINDERELLA_RUNS.map((run, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 pl-8 relative"
            >
              <div className="absolute left-2.5 h-3 w-3 rounded-full bg-purple-500 border-2 border-[var(--card)]" />
              <div className="font-mono text-sm font-bold text-purple-400 w-10">{run.year}</div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-white">{run.team}</span>
                <span className="text-[var(--dim)] text-xs ml-1">(#{run.seed} seed)</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">{run.bestRound}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
