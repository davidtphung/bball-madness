// Championship probability model — all teams with >1% title probability
// Plus key stats for team profiles

export const TEAMS = {
  "Arizona": {
    seed: 1, region: "West", conference: "Big 12",
    record: "30-4", adjO: 122.3, adjD: 93.1, tempo: 71.2,
    titleProb: 0.22, f4Prob: 0.48, e8Prob: 0.62,
    strengths: ["Elite defense", "Tournament experience", "Depth"],
    weaknesses: ["Free throw shooting (68%)"],
    color: "#CC0033", colorAlt: "#003366",
    logo: "🅰️",
    keyPlayers: [
      { name: "Jaden Bradley", pos: "PG", ppg: 16.2, rpg: 3.8, apg: 6.1 },
      { name: "KJ Lewis", pos: "SG", ppg: 14.8, rpg: 5.2, apg: 2.4 },
      { name: "Motiejus Krivas", pos: "C", ppg: 12.1, rpg: 8.9, apg: 1.2 },
    ],
  },
  "Duke": {
    seed: 1, region: "East", conference: "ACC",
    record: "29-5", adjO: 120.8, adjD: 94.2, tempo: 69.8,
    titleProb: 0.14, f4Prob: 0.38, e8Prob: 0.52,
    strengths: ["Offensive firepower", "Coaching pedigree"],
    weaknesses: ["Caleb Foster OUT (foot)", "Depth concerns"],
    color: "#003087", colorAlt: "#FFFFFF",
    logo: "🔵",
    keyPlayers: [
      { name: "Cooper Flagg", pos: "PF", ppg: 18.4, rpg: 7.2, apg: 3.6 },
      { name: "Kon Knueppel", pos: "SG", ppg: 13.1, rpg: 4.8, apg: 2.9 },
    ],
  },
  "Houston": {
    seed: 2, region: "South", conference: "Big 12",
    record: "30-3", adjO: 118.4, adjD: 89.6, tempo: 64.8,
    titleProb: 0.16, f4Prob: 0.42, e8Prob: 0.58,
    strengths: ["#1 defense nationally", "Home region advantage (Houston)"],
    weaknesses: ["Slow tempo can backfire", "Offensive inconsistency"],
    color: "#C8102E", colorAlt: "#FFFFFF",
    logo: "🔴",
    keyPlayers: [
      { name: "J'Wan Roberts", pos: "PF", ppg: 14.2, rpg: 9.1, apg: 1.8 },
      { name: "LJ Cryer", pos: "SG", ppg: 15.6, rpg: 2.4, apg: 3.2 },
    ],
  },
  "Florida": {
    seed: 1, region: "South", conference: "SEC",
    record: "28-6", adjO: 119.2, adjD: 95.1, tempo: 70.4,
    titleProb: 0.08, f4Prob: 0.28, e8Prob: 0.44,
    strengths: ["Balanced scoring", "SEC tournament champion"],
    weaknesses: ["Road record", "Three-point defense"],
    color: "#0021A5", colorAlt: "#FA4616",
    logo: "🐊",
    keyPlayers: [
      { name: "Walter Clayton Jr.", pos: "PG", ppg: 17.8, rpg: 3.2, apg: 5.4 },
      { name: "Alex Condon", pos: "C", ppg: 13.4, rpg: 7.6, apg: 1.8 },
    ],
  },
  "Michigan": {
    seed: 1, region: "Midwest", conference: "Big Ten",
    record: "27-7", adjO: 117.6, adjD: 93.8, tempo: 68.2,
    titleProb: 0.06, f4Prob: 0.22, e8Prob: 0.38,
    strengths: ["Big Ten regular season champs", "Interior defense"],
    weaknesses: ["L.J. Cason questionable", "Perimeter shooting"],
    color: "#00274C", colorAlt: "#FFCB05",
    logo: "〽️",
    keyPlayers: [
      { name: "Danny Wolf", pos: "C", ppg: 14.8, rpg: 10.2, apg: 2.6 },
      { name: "Nimari Burnett", pos: "SG", ppg: 15.2, rpg: 3.4, apg: 3.8 },
    ],
  },
  "UConn": {
    seed: 2, region: "East", conference: "Big East",
    record: "26-8", adjO: 118.8, adjD: 94.6, tempo: 67.4,
    titleProb: 0.05, f4Prob: 0.18, e8Prob: 0.32,
    strengths: ["Back-to-back champion DNA", "Clutch experience"],
    weaknesses: ["Inconsistent this season", "Lost key pieces from title runs"],
    color: "#000E2F", colorAlt: "#FFFFFF",
    logo: "🐺",
    keyPlayers: [
      { name: "Alex Karaban", pos: "PF", ppg: 15.6, rpg: 6.8, apg: 2.4 },
      { name: "Solo Ball", pos: "PG", ppg: 12.4, rpg: 2.8, apg: 5.6 },
    ],
  },
  "Purdue": {
    seed: 2, region: "West", conference: "Big Ten",
    record: "27-7", adjO: 121.2, adjD: 95.8, tempo: 66.8,
    titleProb: 0.05, f4Prob: 0.18, e8Prob: 0.34,
    strengths: ["Elite offense", "Size advantage"],
    weaknesses: ["Perimeter defense", "Tournament history"],
    color: "#CEB888", colorAlt: "#000000",
    logo: "🚂",
    keyPlayers: [
      { name: "Trey Kaufman-Renn", pos: "PF", ppg: 16.8, rpg: 7.4, apg: 2.2 },
      { name: "Braden Smith", pos: "PG", ppg: 14.2, rpg: 4.6, apg: 7.8 },
    ],
  },
  "Iowa State": {
    seed: 2, region: "Midwest", conference: "Big 12",
    record: "27-6", adjO: 116.4, adjD: 91.2, tempo: 65.6,
    titleProb: 0.04, f4Prob: 0.16, e8Prob: 0.30,
    strengths: ["Defensive identity", "T.J. Otzelberger system"],
    weaknesses: ["Offensive ceiling", "Star power"],
    color: "#C8102E", colorAlt: "#F1BE48",
    logo: "🌪️",
    keyPlayers: [
      { name: "Curtis Jones", pos: "SG", ppg: 14.8, rpg: 3.2, apg: 3.6 },
      { name: "Joshua Jefferson", pos: "PF", ppg: 12.6, rpg: 8.4, apg: 1.4 },
    ],
  },
  "Illinois": {
    seed: 3, region: "South", conference: "Big Ten",
    record: "25-9", adjO: 119.6, adjD: 96.2, tempo: 71.8,
    titleProb: 0.03, f4Prob: 0.12, e8Prob: 0.24,
    strengths: ["High tempo offense", "Three-point shooting"],
    weaknesses: ["Defensive lapses", "Turnover prone"],
    color: "#E84A27", colorAlt: "#13294B",
    logo: "🟠",
    keyPlayers: [
      { name: "Kasparas Jakucionis", pos: "PG", ppg: 15.8, rpg: 4.2, apg: 5.8 },
      { name: "Tomislav Ivisic", pos: "C", ppg: 13.4, rpg: 7.8, apg: 1.6 },
    ],
  },
  "Gonzaga": {
    seed: 3, region: "West", conference: "WCC",
    record: "27-6", adjO: 122.8, adjD: 97.4, tempo: 72.6,
    titleProb: 0.03, f4Prob: 0.14, e8Prob: 0.26,
    strengths: ["Best offense in the country", "Graham Ike dominance"],
    weaknesses: ["Conference schedule strength", "Defense"],
    color: "#002967", colorAlt: "#C8102E",
    logo: "🐶",
    keyPlayers: [
      { name: "Graham Ike", pos: "PF", ppg: 17.2, rpg: 8.6, apg: 2.0 },
      { name: "Ryan Nembhard", pos: "PG", ppg: 13.8, rpg: 3.0, apg: 6.4 },
    ],
  },
  "Michigan State": {
    seed: 3, region: "East", conference: "Big Ten",
    record: "24-10", adjO: 117.2, adjD: 94.8, tempo: 68.4,
    titleProb: 0.02, f4Prob: 0.10, e8Prob: 0.20,
    strengths: ["Tom Izzo in March", "Physical defense"],
    weaknesses: ["Inconsistent shooting", "Road struggles"],
    color: "#18453B", colorAlt: "#FFFFFF",
    logo: "🟢",
    keyPlayers: [
      { name: "Jaden Akins", pos: "SG", ppg: 14.6, rpg: 5.2, apg: 3.4 },
      { name: "Xavier Booker", pos: "PF", ppg: 12.8, rpg: 6.4, apg: 1.2 },
    ],
  },
};

export const TEAM_LIST = Object.entries(TEAMS)
  .map(([name, data]) => ({ name, ...data }))
  .sort((a, b) => b.titleProb - a.titleProb);
