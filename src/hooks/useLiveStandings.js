"use client";
import { useState, useEffect, useCallback } from "react";

export function useLiveStandings(intervalMs = 60000) {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStandings = useCallback(async () => {
    try {
      const res = await fetch("/api/standings");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStandings(data);
    } catch (err) {
      console.error("Standings fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStandings();
    const interval = setInterval(fetchStandings, intervalMs);
    return () => clearInterval(interval);
  }, [fetchStandings, intervalMs]);

  return { standings, loading, refetch: fetchStandings };
}
