"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAMS } from "@/lib/teams";
import WinProbBar from "./WinProbBar";

export default function TeamProfile({ teamName }) {
  const team = TEAMS[teamName];
  if (!team) return null;

  const isChampion = teamName === "Arizona";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-5 ${
        isChampion
          ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent"
          : "border-[var(--border)] bg-[var(--card)]"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{team.logo}</span>
          <div>
            <h3 className={`font-display text-xl font-bold ${isChampion ? "text-amber-400" : "text-white"}`}>
              {teamName}
              {isChampion && <span className="ml-2 text-sm">🏆</span>}
            </h3>
            <p className="text-xs text-[var(--dim)]">
              {team.seed} seed · {team.region} · {team.conference} · {team.record}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-mono text-2xl font-black ${isChampion ? "text-amber-400" : "text-white"}`}>
            {(team.titleProb * 100).toFixed(0)}%
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--dim)]">Title Prob</div>
        </div>
      </div>

      {/* Probability bars */}
      <div className="space-y-2 mb-4">
        <WinProbBar probability={team.e8Prob} label="Elite Eight" />
        <WinProbBar probability={team.f4Prob} label="Final Four" />
        <WinProbBar probability={team.titleProb} label="Championship" />
      </div>

      {/* Efficiency */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-[var(--bg)] p-2 text-center">
          <div className="font-mono text-lg font-bold text-green-400">{team.adjO}</div>
          <div className="text-[9px] uppercase tracking-widest text-[var(--dim)]">Adj. Off</div>
        </div>
        <div className="rounded-lg bg-[var(--bg)] p-2 text-center">
          <div className="font-mono text-lg font-bold text-blue-400">{team.adjD}</div>
          <div className="text-[9px] uppercase tracking-widest text-[var(--dim)]">Adj. Def</div>
        </div>
        <div className="rounded-lg bg-[var(--bg)] p-2 text-center">
          <div className="font-mono text-lg font-bold text-purple-400">{team.tempo}</div>
          <div className="text-[9px] uppercase tracking-widest text-[var(--dim)]">Tempo</div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-green-400 mb-1">Strengths</div>
          {team.strengths.map((s, i) => (
            <div key={i} className="text-xs text-[var(--text)] flex items-center gap-1">
              <span className="text-green-400 text-[10px]">+</span> {s}
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-red-400 mb-1">Weaknesses</div>
          {team.weaknesses.map((w, i) => (
            <div key={i} className="text-xs text-[var(--text)] flex items-center gap-1">
              <span className="text-red-400 text-[10px]">−</span> {w}
            </div>
          ))}
        </div>
      </div>

      {/* Key Players */}
      {team.keyPlayers && (
        <div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--dim)] mb-2">Key Players</div>
          <div className="space-y-1">
            {team.keyPlayers.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-[var(--text)] font-medium">{p.name} <span className="text-[var(--dim)]">({p.pos})</span></span>
                <span className="font-mono text-[var(--dim)]">
                  {p.ppg}p · {p.rpg}r · {p.apg}a
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function TeamProfileGrid() {
  const [selected, setSelected] = useState("Arizona");

  return (
    <div>
      {/* Team selector pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(TEAMS).map((name) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selected === name
                ? name === "Arizona"
                  ? "bg-amber-500 text-black"
                  : "bg-white/10 text-white border border-white/20"
                : "text-[var(--dim)] hover:text-white hover:bg-white/5"
            }`}
          >
            {TEAMS[name].logo} {name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <TeamProfile key={selected} teamName={selected} />
      </AnimatePresence>
    </div>
  );
}
