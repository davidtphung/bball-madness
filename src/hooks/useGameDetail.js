"use client";
import { useState, useEffect, useCallback } from "react";

export function useGameDetail(gameId, intervalMs = 30000) {
  const [data, setData] = useState({ game: null, kalshi: null, updated: null });
  const [loading, setLoading] = useState(true);

  const fetchGame = useCallback(async () => {
    if (!gameId) return;
    try {
      const res = await fetch(`/api/game?id=${gameId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Game fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
    const isLive = data.game?.status === "in";
    const interval = setInterval(fetchGame, isLive ? intervalMs : intervalMs * 2);
    return () => clearInterval(interval);
  }, [fetchGame, intervalMs, data.game?.status]);

  return { ...data, loading, refetch: fetchGame };
}
