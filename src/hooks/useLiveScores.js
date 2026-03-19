"use client";
import { useState, useEffect, useCallback } from "react";

export function useLiveScores(intervalMs = 60000) {
  const [scores, setScores] = useState({ games: [], updated: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch("/api/scores");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setScores(data);
      setError(null);
    } catch (err) {
      console.error("Score fetch failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, intervalMs);
    return () => clearInterval(interval);
  }, [fetchScores, intervalMs]);

  const hasLiveGames = scores.games?.some((g) => g.status === "in") ?? false;

  return { ...scores, loading, error, hasLiveGames, refetch: fetchScores };
}
