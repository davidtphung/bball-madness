// Historical seed performance data (1985-2025)
// Win rates by seed for each round

export const SEED_WIN_RATES = {
  1:  { r64: 0.993, r32: 0.878, s16: 0.688, e8: 0.500, ff: 0.363, champ: 0.225 },
  2:  { r64: 0.943, r32: 0.725, s16: 0.513, e8: 0.325, ff: 0.200, champ: 0.113 },
  3:  { r64: 0.850, r32: 0.638, s16: 0.388, e8: 0.213, ff: 0.113, champ: 0.038 },
  4:  { r64: 0.793, r32: 0.513, s16: 0.288, e8: 0.163, ff: 0.075, champ: 0.038 },
  5:  { r64: 0.650, r32: 0.363, s16: 0.188, e8: 0.088, ff: 0.038, champ: 0.013 },
  6:  { r64: 0.625, r32: 0.388, s16: 0.200, e8: 0.100, ff: 0.050, champ: 0.013 },
  7:  { r64: 0.600, r32: 0.300, s16: 0.138, e8: 0.075, ff: 0.025, champ: 0.013 },
  8:  { r64: 0.500, r32: 0.200, s16: 0.088, e8: 0.050, ff: 0.025, champ: 0.013 },
  9:  { r64: 0.500, r32: 0.163, s16: 0.063, e8: 0.025, ff: 0.013, champ: 0.000 },
  10: { r64: 0.400, r32: 0.163, s16: 0.063, e8: 0.025, ff: 0.013, champ: 0.000 },
  11: { r64: 0.375, r32: 0.175, s16: 0.088, e8: 0.050, ff: 0.038, champ: 0.013 },
  12: { r64: 0.350, r32: 0.138, s16: 0.038, e8: 0.013, ff: 0.000, champ: 0.000 },
  13: { r64: 0.207, r32: 0.050, s16: 0.013, e8: 0.000, ff: 0.000, champ: 0.000 },
  14: { r64: 0.150, r32: 0.025, s16: 0.013, e8: 0.000, ff: 0.000, champ: 0.000 },
  15: { r64: 0.075, r32: 0.013, s16: 0.013, e8: 0.013, ff: 0.000, champ: 0.000 },
  16: { r64: 0.013, r32: 0.000, s16: 0.000, e8: 0.000, ff: 0.000, champ: 0.000 },
};

// Famous upsets for the history page
export const FAMOUS_UPSETS = [
  { year: 2018, seed: 16, team: "UMBC", overSeed: 1, over: "Virginia", score: "74-54", round: "R64" },
  { year: 2023, seed: 16, team: "FDU", overSeed: 1, over: "Purdue", score: "63-58", round: "R64" },
  { year: 2022, seed: 15, team: "Saint Peter's", overSeed: 2, over: "Kentucky", score: "85-79 OT", round: "R64" },
  { year: 2021, seed: 15, team: "Oral Roberts", overSeed: 2, over: "Ohio State", score: "75-72 OT", round: "R64" },
  { year: 2011, seed: 11, team: "VCU", overSeed: 1, over: "Kansas", score: "71-61", round: "E8" },
  { year: 2018, seed: 11, team: "Loyola Chicago", overSeed: 3, over: "Tennessee", score: "63-62", round: "R32" },
  { year: 2006, seed: 11, team: "George Mason", overSeed: 1, over: "UConn", score: "86-84 OT", round: "E8" },
  { year: 1985, seed: 8, team: "Villanova", overSeed: 1, over: "Georgetown", score: "66-64", round: "Championship" },
];

// Cinderella runs for visualization
export const CINDERELLA_RUNS = [
  { year: 2023, team: "FAU", seed: 9, bestRound: "Final Four" },
  { year: 2022, team: "Saint Peter's", seed: 15, bestRound: "Elite Eight" },
  { year: 2021, team: "UCLA", seed: 11, bestRound: "Final Four" },
  { year: 2018, team: "Loyola Chicago", seed: 11, bestRound: "Final Four" },
  { year: 2011, team: "VCU", seed: 11, bestRound: "Final Four" },
  { year: 2006, team: "George Mason", seed: 11, bestRound: "Final Four" },
  { year: 2003, team: "Syracuse", seed: 3, bestRound: "Champion" },
  { year: 1985, team: "Villanova", seed: 8, bestRound: "Champion" },
];

// Data formatted for Recharts
export const SEED_CHART_DATA = Object.entries(SEED_WIN_RATES).map(([seed, rates]) => ({
  seed: parseInt(seed),
  "Round of 64": +(rates.r64 * 100).toFixed(1),
  "Round of 32": +(rates.r32 * 100).toFixed(1),
  "Sweet 16": +(rates.s16 * 100).toFixed(1),
  "Elite Eight": +(rates.e8 * 100).toFixed(1),
  "Final Four": +(rates.ff * 100).toFixed(1),
  "Championship": +(rates.champ * 100).toFixed(1),
}));

// 5-12 upset rate by year (for trend chart)
export const UPSET_TREND = [
  { year: 2015, upsets: 5, fiveVsTwelve: 1 },
  { year: 2016, upsets: 8, fiveVsTwelve: 2 },
  { year: 2017, upsets: 6, fiveVsTwelve: 1 },
  { year: 2018, upsets: 12, fiveVsTwelve: 2 },
  { year: 2019, upsets: 7, fiveVsTwelve: 1 },
  { year: 2021, upsets: 9, fiveVsTwelve: 2 },
  { year: 2022, upsets: 11, fiveVsTwelve: 3 },
  { year: 2023, upsets: 10, fiveVsTwelve: 2 },
  { year: 2024, upsets: 8, fiveVsTwelve: 1 },
  { year: 2025, upsets: 9, fiveVsTwelve: 2 },
];
