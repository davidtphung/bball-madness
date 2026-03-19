"use client";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { useGameDetail } from "@/hooks/useGameDetail";
import LiveDot from "@/components/LiveDot";

export default function GamePage({ params }) {
  const { id } = use(params);
  const { game, kalshi, loading, updated } = useGameDetail(id, 15000);
  const [tab, setTab] = useState("summary");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <span className="text-sm text-[var(--dim)]">Loading game data...</span>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-2">🏀</div>
          <p className="text-[var(--dim)]">Game not found</p>
          <a href="/" className="text-sm text-amber-400 hover:underline mt-2 inline-block">Back to scores</a>
        </div>
      </div>
    );
  }

  const isLive = game.status === "in";
  const isFinal = game.status === "post";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Back link */}
      <a href="/" className="inline-flex items-center gap-1 text-xs text-[var(--dim)] hover:text-white mb-4 transition-colors">
        &larr; Back to scores
      </a>

      {/* Scoreboard header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-6 mb-6 ${
          isLive ? "border-red-500/40 bg-gradient-to-br from-red-500/5 to-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]"
        }`}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isLive && <LiveDot size={8} />}
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLive ? "text-red-400" : isFinal ? "text-[var(--dim)]" : "text-blue-400"
            }`}>
              {game.statusDetail}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[var(--muted)]">
            {game.broadcast && <span>{game.broadcast}</span>}
            {game.venue && <span>{game.venue}</span>}
          </div>
        </div>

        {/* Teams + Score */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Away team */}
          <TeamHeader team={game.away} align="right" />

          {/* Score */}
          <div className="text-center">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-4xl md:text-5xl font-black tabular-nums ${
                game.away.winner ? "text-white" : isFinal ? "text-[var(--dim)]" : "text-white"
              }`}>
                {isLive || isFinal ? game.away.score : "—"}
              </span>
              <span className="text-lg text-[var(--muted)] font-mono">-</span>
              <span className={`font-mono text-4xl md:text-5xl font-black tabular-nums ${
                game.home.winner ? "text-white" : isFinal ? "text-[var(--dim)]" : "text-white"
              }`}>
                {isLive || isFinal ? game.home.score : "—"}
              </span>
            </div>

            {/* Linescore */}
            {(game.home.linescores?.length > 0 || game.away.linescores?.length > 0) && (
              <div className="mt-2 inline-flex gap-px rounded bg-[var(--bg)] overflow-hidden text-[10px] font-mono">
                {game.away.linescores?.map((s, i) => (
                  <div key={`a${i}`} className="px-3 py-1 border-r border-[var(--border)]">
                    <div className="text-[var(--muted)]">{i === 0 ? "1H" : i === 1 ? "2H" : `OT${i-1}`}</div>
                    <div className="text-[var(--text)] font-bold">{s}</div>
                  </div>
                ))}
                <div className="px-3 py-1 bg-white/5">
                  <div className="text-[var(--muted)]">T</div>
                  <div className="text-white font-bold">{game.away.score}</div>
                </div>
              </div>
            )}
          </div>

          {/* Home team */}
          <TeamHeader team={game.home} align="left" />
        </div>
      </motion.div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 border-b border-[var(--border)] pb-2">
        {[
          { key: "summary", label: "Summary" },
          { key: "stats", label: "Stats" },
          { key: "winprob", label: "Win Probability" },
          { key: "plays", label: "Play-by-Play" },
          { key: "market", label: "Prediction Market" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
              tab === t.key
                ? "text-white bg-white/10 border-b-2 border-amber-400"
                : "text-[var(--dim)] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "summary" && <SummaryTab game={game} />}
          {tab === "stats" && <StatsTab game={game} />}
          {tab === "winprob" && <WinProbTab game={game} />}
          {tab === "plays" && <PlaysTab game={game} />}
          {tab === "market" && <MarketTab kalshi={kalshi} game={game} />}
        </motion.div>
      </AnimatePresence>

      {/* Updated timestamp */}
      {updated && (
        <p className="text-[10px] font-mono text-[var(--muted)] mt-6 text-center">
          Last updated: {new Date(updated).toLocaleTimeString()}
          {isLive && " · Refreshing every 15s"}
        </p>
      )}
    </div>
  );
}

function TeamHeader({ team, align }) {
  const isRight = align === "right";
  return (
    <div className={`flex items-center gap-3 ${isRight ? "flex-row-reverse text-right" : ""}`}>
      {team.logo ? (
        <img src={team.logo} alt="" className="h-12 w-12 object-contain" />
      ) : (
        <div className="h-12 w-12 rounded-lg flex items-center justify-center text-lg font-bold"
          style={{ background: team.color + "20", color: team.color }}>
          {team.abbreviation?.slice(0, 2)}
        </div>
      )}
      <div>
        <div className="flex items-center gap-2" style={{ flexDirection: isRight ? "row-reverse" : "row" }}>
          {team.seed && (
            <span className="font-mono text-[10px] font-bold text-[var(--dim)] bg-[var(--bg)] rounded px-1.5 py-0.5">
              {team.seed}
            </span>
          )}
          <h2 className={`text-lg font-bold ${team.winner ? "text-green-400" : "text-white"}`}>
            {team.shortName}
          </h2>
        </div>
        <p className="text-[10px] text-[var(--dim)]">{team.record}</p>
      </div>
    </div>
  );
}

function SummaryTab({ game }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Team leaders */}
      {[game.away, game.home].map((team) => (
        <div key={team.abbreviation} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--dim)] mb-3">
            {team.shortName} Leaders
          </h3>
          {team.leaders?.length > 0 ? (
            <div className="space-y-3">
              {team.leaders.map((cat, i) => (
                <div key={i}>
                  <div className="text-[10px] text-[var(--muted)] mb-1">{cat.category}</div>
                  {cat.leaders.map((l, j) => (
                    <div key={j} className="flex items-center gap-2">
                      {l.headshot && (
                        <img src={l.headshot} alt="" className="h-8 w-8 rounded-full object-cover" />
                      )}
                      <div>
                        <span className="text-sm font-semibold text-white">{l.name}</span>
                        <span className="text-[10px] text-[var(--dim)] ml-1">{l.position}</span>
                      </div>
                      <span className="ml-auto font-mono text-sm font-bold text-amber-400">{l.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--muted)]">Leaders available after tipoff</p>
          )}
        </div>
      ))}
    </div>
  );
}

function StatsTab({ game }) {
  const awayStats = game.away.stats || [];
  const homeStats = game.home.stats || [];

  if (awayStats.length === 0 && homeStats.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--dim)]">
        <p className="text-sm">Stats available after tipoff</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-sm">
        {/* Header */}
        <div className="text-right font-semibold text-white text-xs">{game.away.shortName}</div>
        <div className="text-center text-[10px] text-[var(--dim)]">Stat</div>
        <div className="font-semibold text-white text-xs">{game.home.shortName}</div>

        {awayStats.map((stat, i) => {
          const homeStat = homeStats[i];
          const awayVal = parseFloat(stat.value) || 0;
          const homeVal = parseFloat(homeStat?.value) || 0;
          const awayBetter = awayVal > homeVal;
          const homeBetter = homeVal > awayVal;

          return [
            <div key={`a${i}`} className={`text-right font-mono ${awayBetter ? "text-green-400 font-bold" : "text-[var(--text)]"}`}>
              {stat.value}
            </div>,
            <div key={`l${i}`} className="text-center text-[10px] text-[var(--dim)] px-4 whitespace-nowrap">
              {stat.displayName}
            </div>,
            <div key={`h${i}`} className={`font-mono ${homeBetter ? "text-green-400 font-bold" : "text-[var(--text)]"}`}>
              {homeStat?.value || "—"}
            </div>,
          ];
        })}
      </div>
    </div>
  );
}

function WinProbTab({ game }) {
  const wpData = game.winProbability || [];

  if (wpData.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--dim)]">
        <p className="text-sm">Win probability chart available during and after the game</p>
      </div>
    );
  }

  const chartData = wpData.map((wp, i) => ({
    index: i,
    away: +(100 - wp.homeWinPct).toFixed(1),
    home: wp.homeWinPct,
  }));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--dim)]">
          Win Probability
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="h-2 w-8 rounded" style={{ background: game.away.color }} />
            {game.away.shortName}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-8 rounded" style={{ background: game.home.color }} />
            {game.home.shortName}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis hide />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1E293B" }}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #1E293B",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(val, name) => [`${val}%`, name === "away" ? game.away.shortName : game.home.shortName]}
          />
          <ReferenceLine y={50} stroke="#334155" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="away" stroke={game.away.color} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="home" stroke={game.home.color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function PlaysTab({ game }) {
  const plays = game.plays || [];

  if (plays.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--dim)]">
        <p className="text-sm">Play-by-play available after tipoff</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <div className="divide-y divide-[var(--border)]">
        {[...plays].reverse().map((play, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`flex items-start gap-3 px-4 py-3 ${
              play.scoringPlay ? "bg-green-500/5" : ""
            }`}
          >
            <div className="flex flex-col items-center shrink-0 w-12">
              <span className="font-mono text-[10px] font-bold text-[var(--dim)]">
                {play.clock}
              </span>
              <span className="text-[8px] text-[var(--muted)]">
                {play.period === 1 ? "1H" : play.period === 2 ? "2H" : `OT${play.period - 2}`}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--text)]">{play.text}</p>
            </div>
            {play.scoringPlay && (
              <div className="shrink-0 font-mono text-xs font-bold text-green-400">
                {play.awayScore}-{play.homeScore}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MarketTab({ kalshi, game }) {
  const markets = kalshi?.markets || [];
  const available = kalshi?.available || false;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-purple-400 font-mono text-sm font-bold">Kalshi</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--dim)]">Prediction Markets</span>
        </div>

        {available && markets.length > 0 ? (
          <div className="space-y-2">
            {markets.map((m, i) => (
              <motion.div
                key={m.ticker || i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-[var(--card)] border border-[var(--border)] p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{m.title}</p>
                  <p className="text-[10px] text-[var(--muted)] font-mono">{m.ticker}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <div className="text-center">
                    <div className="font-mono text-lg font-bold text-green-400">
                      {m.yesPrice != null ? `${m.yesPrice}\u00A2` : "—"}
                    </div>
                    <div className="text-[8px] text-green-400/60 uppercase">Yes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-lg font-bold text-red-400">
                      {m.noPrice != null ? `${m.noPrice}\u00A2` : "—"}
                    </div>
                    <div className="text-[8px] text-red-400/60 uppercase">No</div>
                  </div>
                  {m.volume != null && (
                    <div className="text-center ml-2">
                      <div className="font-mono text-xs text-[var(--dim)]">{m.volume.toLocaleString()}</div>
                      <div className="text-[8px] text-[var(--muted)] uppercase">Vol</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--dim)] mb-2">
              No active Kalshi markets found for this matchup
            </p>
            <p className="text-xs text-[var(--muted)]">
              Prediction markets for NCAA Tournament games may be available on Kalshi.
              Markets typically open closer to game time.
            </p>
          </div>
        )}
      </div>

      {/* Implied odds from seed */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--dim)] mb-3">
          Model-Implied Win Probability
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[game.away, game.home].map((team) => {
            const seed = team.seed || 8;
            const otherSeed = team === game.away ? (game.home.seed || 8) : (game.away.seed || 8);
            const diff = otherSeed - seed;
            const prob = Math.min(97, Math.max(3, 50 + diff * 3));
            return (
              <div key={team.abbreviation} className="text-center">
                <div className="text-sm font-semibold text-white mb-1">
                  {team.seed && <span className="font-mono text-[var(--dim)] mr-1">({team.seed})</span>}
                  {team.shortName}
                </div>
                <div className="font-mono text-3xl font-black" style={{ color: team.color }}>
                  {prob}%
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--bg)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prob}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: team.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
