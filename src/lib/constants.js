export const COLORS = {
  bg: "#0A0E1A",
  card: "#111827",
  cardHover: "#1A2237",
  border: "#1E293B",
  borderLight: "#334155",
  text: "#E2E8F0",
  dim: "#64748B",
  muted: "#475569",
  red: "#EF4444",
  green: "#22C55E",
  gold: "#F59E0B",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
  orange: "#F97316",
  winner: "#22C55E",
  loser: "#64748B",
  upset: "#EF4444",
  champion: "#F59E0B",
  live: "#EF4444",
};

export const CHART_COLORS = [
  "#3B82F6", "#22C55E", "#F59E0B", "#EF4444",
  "#8B5CF6", "#06B6D4", "#F97316", "#EC4899",
];

export const REGION_COLORS = {
  East: "#3B82F6",
  West: "#EF4444",
  South: "#22C55E",
  Midwest: "#F59E0B",
};

export const ESPN_SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard";

export const ESPN_GAME_URL = (id) =>
  `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/summary?event=${id}`;

export const TOURNAMENT_DATES = {
  r64: ["2026-03-19", "2026-03-20"],
  r32: ["2026-03-21", "2026-03-22"],
  s16: ["2026-03-26", "2026-03-27"],
  e8: ["2026-03-28", "2026-03-29"],
  ff: ["2026-04-04"],
  champ: ["2026-04-06"],
};

export const SITE_CONFIG = {
  title: "THE PROCESS | March Madness 2026 Analytics — NLT143",
  description: "Live bracket, probability models, and game tracking for the 2026 NCAA Tournament. Hinkie/Beane methodology applied to March Madness.",
  url: "https://bballmadness.davidtphung.com",
  brand: "THE PROCESS",
  tagline: "NLT143 Analytics",
  champion: "Arizona",
};
