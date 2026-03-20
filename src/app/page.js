"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveScores } from "@/hooks/useLiveScores";
import { useLiveStandings } from "@/hooks/useLiveStandings";
import LiveScoreCard from "@/components/LiveScoreCard";
import StatBox from "@/components/StatBox";
import { BRACKET } from "@/lib/bracket-data";

export default function HomePage() {
  const { games, loading, updated, hasLiveGames, error } = useLiveScores(60000);
  const { standings } = useLiveStandings(60000);

  const record = standings?.record || { correct: 0, wrong: 0, pending: 63 };
  const upsetsHit = standings?.upsetsHit || 0;
  const upsetPicks = standings?.upsetPicks || [];
  const results = standings?.results || [];
  const probabilities = standings?.probabilities || {};
  const eliminated = new Set(standings?.eliminated || []);

  // Live title prob for Arizona
  const arizonaTitleProb = probabilities["Arizona"]
    ? (probabilities["Arizona"].titleProb * 100).toFixed(0)
    : "22";

  const liveGames = games.filter((g) => g.status === "in");
  const upcomingGames = games.filter((g) => g.status === "pre");
  const completedGames = games.filter((g) => g.status === "post");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
              March Madness <span className="text-amber-400">2026</span>
            </h1>
            <p className="text-sm text-[var(--dim)]">
              Round of 64 — Day 1 · Thursday, March 19
            </p>
          </div>
          <div className="flex items-center gap-2">
            {updated && (
              <span className="text-[10px] font-mono text-[var(--muted)]">
                Updated {new Date(updated).toLocaleTimeString()}
              </span>
            )}
            {hasLiveGames && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[10px] font-bold text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Stats row — all live */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatBox label="Record" value={`${record.correct}-${record.wrong}`} color="text-green-400" delay={0} />
          <StatBox label="Pending" value={record.pending} color="text-blue-400" delay={0.05} />
          <StatBox
            label="Upsets Hit"
            value={`${upsetsHit}/7`}
            color="text-red-400"
            delay={0.1}
          />
          <StatBox label="Champion" value={BRACKET.champion} color="text-amber-400" delay={0.15} />
          <StatBox
            label="Title Prob"
            value={arizonaTitleProb}
            suffix="%"
            color="text-amber-400"
            delay={0.2}
          />
        </div>
      </motion.div>

      {/* Results ticker — shows completed bracket matchups */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-xl border border-green-500/20 bg-green-500/5 p-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">
            Bracket Results — {record.correct} Correct, {record.wrong} Wrong
          </h2>
          <div className="flex flex-wrap gap-2">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.03 }}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                  r.correct
                    ? "border-green-500/20 bg-[var(--card)]"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <span className={`text-[10px] font-bold ${r.correct ? "text-green-400" : "text-red-400"}`}>
                  {r.correct ? "✓" : "✗"}
                </span>
                <span className="text-xs font-semibold text-white">{r.winner}</span>
                <span className="text-[10px] text-[var(--dim)]">def.</span>
                <span className="text-xs text-[var(--dim)] line-through">{r.loser}</span>
                <span className="font-mono text-[10px] text-[var(--muted)]">{r.score}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upset picks banner — now live status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
          Upset Picks — {upsetsHit} Hit / 7 Called
        </h2>
        <div className="flex flex-wrap gap-2">
          {(upsetPicks.length > 0
            ? upsetPicks
            : [
                { team: "VCU", seed: 11, over: "North Carolina", overSeed: 6, region: "South", status: "pending" },
                { team: "Saint Louis", seed: 9, over: "Georgia", overSeed: 8, region: "Midwest", status: "pending" },
                { team: "Santa Clara", seed: 10, over: "Kentucky", overSeed: 7, region: "Midwest", status: "pending" },
                { team: "Akron", seed: 12, over: "Texas Tech", overSeed: 5, region: "Midwest", status: "pending" },
                { team: "Utah State", seed: 9, over: "Villanova", overSeed: 8, region: "West", status: "pending" },
                { team: "Iowa", seed: 9, over: "Clemson", overSeed: 8, region: "South", status: "pending" },
                { team: "Missouri", seed: 10, over: "Miami (FL)", overSeed: 7, region: "West", status: "pending" },
              ]
          ).map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                u.status === "hit"
                  ? "border-green-500/30 bg-green-500/10"
                  : u.status === "missed"
                  ? "border-red-500/30 bg-red-500/10 opacity-50"
                  : u.status === "alive"
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-red-500/20 bg-[var(--card)]"
              }`}
            >
              {u.status === "hit" && <span className="text-[10px] text-green-400">✓</span>}
              {u.status === "missed" && <span className="text-[10px] text-red-400">✗</span>}
              {u.status === "alive" && <span className="text-[10px] text-amber-400">●</span>}
              <span className="font-mono text-xs font-bold text-red-400">#{u.seed}</span>
              <span className={`text-xs font-semibold ${
                u.status === "missed" ? "text-[var(--dim)] line-through" : "text-white"
              }`}>{u.team}</span>
              <span className="text-[10px] text-[var(--dim)]">over</span>
              <span className={`text-xs ${
                u.status === "hit" ? "text-[var(--dim)] line-through" : "text-[var(--dim)]"
              }`}>#{u.overSeed} {u.over}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <span className="text-sm text-[var(--dim)]">Loading live scores...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && games.length === 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center mb-8">
          <p className="text-sm text-amber-400 mb-1">Live scores temporarily unavailable</p>
          <p className="text-xs text-[var(--dim)]">ESPN API may be down. Scores update automatically when available.</p>
        </div>
      )}

      {/* Live Games */}
      {liveGames.length > 0 && (
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live Now — {liveGames.length} {liveGames.length === 1 ? "Game" : "Games"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveGames.map((game, i) => (
              <LiveScoreCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Games */}
      {upcomingGames.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Upcoming — {upcomingGames.length} {upcomingGames.length === 1 ? "Game" : "Games"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingGames.map((game, i) => (
              <LiveScoreCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Games */}
      {completedGames.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--dim)] mb-4">
            Final — {completedGames.length} {completedGames.length === 1 ? "Game" : "Games"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedGames.map((game, i) => (
              <LiveScoreCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* No games fallback */}
      {!loading && games.length === 0 && !error && (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🏀</div>
          <h2 className="font-display text-xl font-bold text-white mb-2">No Games Right Now</h2>
          <p className="text-sm text-[var(--dim)]">
            Check back when games tip off. Scores update automatically every 60 seconds.
          </p>
        </div>
      )}
    </div>
  );
}
