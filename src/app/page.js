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

  const arizonaTitleProb = probabilities["Arizona"]
    ? (probabilities["Arizona"].titleProb * 100).toFixed(0)
    : "22";

  const liveGames = games.filter((g) => g.status === "in");
  const upcomingGames = games.filter((g) => g.status === "pre");
  const completedGames = games.filter((g) => g.status === "post");

  return (
    <div className="mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-6">
      {/* Hero — compact on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 md:mb-8"
      >
        <div className="flex items-end justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">
              March Madness{" "}
              <span className="text-gradient-gold">2026</span>
            </h1>
            <p className="text-[11px] md:text-sm text-[var(--dim)] mt-0.5">
              Round of 64 — Day 1 · Thursday, March 19
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {hasLiveGames && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/15 px-2 py-0.5 text-[9px] font-bold text-red-400 uppercase tracking-widest">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="live-pulse absolute inline-flex h-full w-full rounded-full bg-red-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            )}
            {updated && (
              <span className="text-[9px] font-mono text-[var(--muted)]">
                {new Date(updated).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>

        {/* Stats — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:gap-3">
          {[
            { label: "Record", value: `${record.correct}-${record.wrong}`, color: "text-green-400" },
            { label: "Pending", value: record.pending, color: "text-blue-400" },
            { label: "Upsets", value: `${upsetsHit}/7`, color: "text-red-400" },
            { label: "Champ", value: "AZ", color: "text-amber-400" },
            { label: "Title %", value: arizonaTitleProb, suffix: "%", color: "text-amber-400" },
          ].map((s, i) => (
            <div key={s.label} className="shrink-0 w-[6.5rem] md:w-auto">
              <StatBox {...s} delay={i * 0.04} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Results ticker — horizontal scroll on mobile */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 md:mb-8"
        >
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-green-400 mb-2 px-0.5">
            Bracket Results — {record.correct}W {record.wrong}L
          </h2>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1 md:mx-0 md:px-0 md:flex-wrap">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + i * 0.02 }}
                className={`shrink-0 flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 ${
                  r.correct
                    ? "border-green-500/15 bg-green-500/[0.04]"
                    : "border-red-500/15 bg-red-500/[0.04]"
                }`}
              >
                <span className={`text-[10px] font-black ${r.correct ? "text-green-400" : "text-red-400"}`}>
                  {r.correct ? "W" : "L"}
                </span>
                <span className="text-[11px] font-semibold text-white">{r.winner}</span>
                <span className="font-mono text-[9px] text-[var(--muted)]">{r.score}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upset picks — compact pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-5 md:mb-8"
      >
        <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400 mb-2 px-0.5">
          Upset Picks — {upsetsHit} Hit
        </h2>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1 md:mx-0 md:px-0 md:flex-wrap">
          {(upsetPicks.length > 0
            ? upsetPicks
            : [
                { team: "VCU", seed: 11, over: "UNC", overSeed: 6, status: "pending" },
                { team: "Saint Louis", seed: 9, over: "Georgia", overSeed: 8, status: "pending" },
                { team: "Santa Clara", seed: 10, over: "Kentucky", overSeed: 7, status: "pending" },
                { team: "Akron", seed: 12, over: "Texas Tech", overSeed: 5, status: "pending" },
                { team: "Utah State", seed: 9, over: "Nova", overSeed: 8, status: "pending" },
                { team: "Iowa", seed: 9, over: "Clemson", overSeed: 8, status: "pending" },
                { team: "Missouri", seed: 10, over: "Miami", overSeed: 7, status: "pending" },
              ]
          ).map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03 }}
              className={`shrink-0 flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-[11px] ${
                u.status === "hit"
                  ? "border-green-500/20 bg-green-500/[0.06]"
                  : u.status === "missed"
                  ? "border-red-500/15 bg-red-500/[0.04] opacity-40"
                  : "border-white/[0.04] bg-[var(--card)]"
              }`}
            >
              {u.status === "hit" && <span className="text-green-400 font-black text-[10px]">✓</span>}
              {u.status === "missed" && <span className="text-red-400 font-black text-[10px]">✗</span>}
              <span className="font-mono text-[10px] font-bold text-red-400">
                {u.seed}
              </span>
              <span className={`font-semibold ${u.status === "missed" ? "line-through text-[var(--muted)]" : "text-white"}`}>
                {u.team}
              </span>
              <span className="text-[var(--muted)]">›</span>
              <span className="text-[var(--muted)] font-mono text-[10px]">{u.overSeed}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <span className="text-xs text-[var(--dim)]">Loading scores...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && games.length === 0 && (
        <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-5 text-center mb-6">
          <p className="text-sm text-amber-400 mb-1">Scores temporarily unavailable</p>
          <p className="text-[11px] text-[var(--dim)]">Auto-retrying every 60 seconds</p>
        </div>
      )}

      {/* Live Games */}
      {liveGames.length > 0 && (
        <GameSection
          title={`Live · ${liveGames.length}`}
          titleColor="text-red-400"
          games={liveGames}
          showLiveDot
        />
      )}

      {/* Upcoming Games */}
      {upcomingGames.length > 0 && (
        <GameSection
          title={`Upcoming · ${upcomingGames.length}`}
          titleColor="text-blue-400"
          games={upcomingGames}
        />
      )}

      {/* Completed Games */}
      {completedGames.length > 0 && (
        <GameSection
          title={`Final · ${completedGames.length}`}
          titleColor="text-[var(--dim)]"
          games={completedGames}
        />
      )}

      {/* Empty state */}
      {!loading && games.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="text-3xl mb-2">🏀</div>
          <h2 className="font-display text-lg font-bold text-white mb-1">No Games Right Now</h2>
          <p className="text-xs text-[var(--dim)]">
            Scores auto-update every 60 seconds
          </p>
        </div>
      )}
    </div>
  );
}

function GameSection({ title, titleColor, games, showLiveDot = false }) {
  return (
    <section className="mb-6 md:mb-8">
      <h2 className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] ${titleColor} mb-2.5 px-0.5`}>
        {showLiveDot && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="live-pulse absolute inline-flex h-full w-full rounded-full bg-red-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
        )}
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {games.map((game, i) => (
          <LiveScoreCard key={game.id} game={game} index={i} />
        ))}
      </div>
    </section>
  );
}
