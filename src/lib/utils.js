export function isUpset(winnerSeed, loserSeed) {
  return winnerSeed > loserSeed;
}

export function getSeedColor(seed) {
  if (seed <= 4) return "#22C55E";
  if (seed <= 8) return "#3B82F6";
  if (seed <= 12) return "#F59E0B";
  return "#EF4444";
}

export function formatScore(home, away) {
  if (home == null || away == null) return "—";
  return `${home} - ${away}`;
}

export function getGameStatus(status) {
  switch (status) {
    case "in": return "LIVE";
    case "post": return "FINAL";
    case "pre": return "UPCOMING";
    default: return status?.toUpperCase() || "TBD";
  }
}

export function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getWinProbability(seed1, seed2) {
  const diff = seed2 - seed1;
  const base = 0.5 + diff * 0.03;
  return Math.min(0.97, Math.max(0.03, base));
}

export function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
