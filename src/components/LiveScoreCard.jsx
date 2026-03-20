"use client";
import { motion } from "framer-motion";
import LiveDot from "./LiveDot";

export default function LiveScoreCard({ game, index = 0 }) {
  const isLive = game.status === "in";
  const isFinal = game.status === "post";

  const startTime = game.startTime
    ? new Date(game.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : "";

  return (
    <motion.a
      href={`/game/${game.id}`}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block overflow-hidden rounded-2xl border bg-[var(--card)] transition-all press-scale active:bg-[var(--card-hover)] ${
        isLive
          ? "border-red-500/30 glow-red"
          : "border-white/[0.04] hover:border-white/[0.08]"
      }`}
    >
      {/* Top status strip */}
      <div className={`flex items-center justify-between px-3.5 pt-3 pb-1.5 ${
        isLive ? "text-red-400" : isFinal ? "text-[var(--dim)]" : "text-blue-400"
      }`}>
        <div className="flex items-center gap-1.5">
          {isLive && <LiveDot size={6} />}
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isLive
              ? `${game.clock} · ${game.period === 1 ? "1H" : "2H"}`
              : isFinal
              ? game.statusDetail || "Final"
              : startTime}
          </span>
        </div>
        {game.broadcast && (
          <span className="text-[9px] font-mono text-[var(--muted)] hidden sm:inline">
            {game.broadcast}
          </span>
        )}
      </div>

      {/* Teams — tight, ESPN-style */}
      <div className="px-3.5 pb-3 space-y-1">
        <TeamRow
          name={game.away.name}
          seed={game.away.seed}
          score={game.away.score}
          logo={game.away.logo}
          isWinner={game.away.winner}
          isLive={isLive}
          isFinal={isFinal}
        />
        <div className="h-px bg-white/[0.03]" />
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

      {/* Live glow gradient */}
      {isLive && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.04] via-transparent to-transparent pointer-events-none" />
      )}

      {/* Hover chevron */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-all group-hover:translate-x-0 translate-x-1 text-[var(--dim)] text-xs">
        ›
      </div>
    </motion.a>
  );
}

function TeamRow({ name, seed, score, logo, isWinner, isLive, isFinal }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2 min-w-0">
        {logo ? (
          <img src={logo} alt="" className="h-5 w-5 md:h-6 md:w-6 object-contain rounded-sm" aria-hidden="true" />
        ) : (
          <div className="h-5 w-5 md:h-6 md:w-6 rounded-md bg-white/[0.04] flex items-center justify-center text-[8px] font-mono font-bold text-[var(--dim)]">
            {seed || "?"}
          </div>
        )}
        {seed && (
          <span className="font-mono text-[10px] font-bold text-[var(--dim)] w-3.5 text-right shrink-0">
            {seed}
          </span>
        )}
        <span
          className={`text-[13px] md:text-sm font-semibold truncate ${
            isFinal && !isWinner ? "text-[var(--muted)]" : "text-[var(--text)]"
          } ${isWinner ? "text-green-400" : ""}`}
        >
          {name}
        </span>
        {isWinner && (
          <span className="shrink-0 ml-0.5 text-green-400 text-[10px]" aria-label="Winner">
            ✓
          </span>
        )}
      </div>
      <span
        className={`font-mono text-base md:text-lg font-black tabular-nums ml-2 ${
          isLive
            ? "text-white"
            : isWinner
            ? "text-green-400"
            : isFinal
            ? "text-[var(--muted)]"
            : "text-[var(--muted)]"
        }`}
      >
        {isFinal || isLive ? score : "—"}
      </span>
    </div>
  );
}
