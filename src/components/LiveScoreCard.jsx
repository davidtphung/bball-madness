"use client";
import { motion } from "framer-motion";
import LiveDot from "./LiveDot";

export default function LiveScoreCard({ game, index = 0 }) {
  const isLive = game.status === "in";
  const isFinal = game.status === "post";
  const isUpcoming = game.status === "pre";

  const startTime = game.startTime
    ? new Date(game.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`group relative overflow-hidden rounded-xl border bg-[var(--card)] p-4 transition-all hover:bg-[var(--card-hover)] ${
        isLive
          ? "border-red-500/40 shadow-lg shadow-red-500/10"
          : "border-[var(--border)] hover:border-[var(--border-light)]"
      }`}
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isLive && <LiveDot size={8} />}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isLive
                ? "text-red-400"
                : isFinal
                ? "text-[var(--dim)]"
                : "text-blue-400"
            }`}
          >
            {isLive
              ? `${game.clock} — ${game.period === 1 ? "1st" : "2nd"} Half`
              : isFinal
              ? game.statusDetail || "Final"
              : startTime}
          </span>
        </div>
        {game.broadcast && (
          <span className="text-[10px] font-mono text-[var(--muted)]">
            {game.broadcast}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-2">
        <TeamRow
          name={game.away.name}
          seed={game.away.seed}
          score={game.away.score}
          logo={game.away.logo}
          isWinner={game.away.winner}
          isLive={isLive}
          isFinal={isFinal}
        />
        <TeamRow
          name={game.home.name}
          seed={game.home.seed}
          score={game.home.score}
          logo={game.home.logo}
          isWinner={game.home.winner}
          isLive={isLive}
          isFinal={isFinal}
        />
      </div>

      {/* Venue */}
      {game.venue && (
        <p className="mt-3 text-[10px] text-[var(--muted)] truncate">
          {game.venue}
        </p>
      )}

      {/* Live glow effect */}
      {isLive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}

function TeamRow({ name, seed, score, logo, isWinner, isLive, isFinal }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        {logo ? (
          <img src={logo} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
        ) : (
          <div className="h-5 w-5 rounded bg-[var(--border)] flex items-center justify-center text-[8px] font-mono text-[var(--dim)]">
            {seed || "?"}
          </div>
        )}
        {seed && (
          <span className="font-mono text-[10px] font-bold text-[var(--dim)] w-4 text-right shrink-0">
            {seed}
          </span>
        )}
        <span
          className={`text-sm font-semibold truncate ${
            isFinal && !isWinner ? "text-[var(--dim)]" : "text-[var(--text)]"
          } ${isWinner ? "text-green-400" : ""}`}
        >
          {name}
        </span>
      </div>
      <span
        className={`font-mono text-lg font-bold tabular-nums ${
          isLive
            ? "text-white"
            : isWinner
            ? "text-green-400"
            : isFinal
            ? "text-[var(--dim)]"
            : "text-[var(--muted)]"
        }`}
      >
        {isFinal || isLive ? score : "—"}
      </span>
    </div>
  );
}
