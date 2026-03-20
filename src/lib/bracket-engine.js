// Live bracket engine — matches ESPN results against our picks,
// computes record, tracks upsets, adjusts probabilities in real time.

import { BRACKET, UPSET_PICKS } from "./bracket-data";
import { TEAMS } from "./teams";

// Fuzzy team name matching — ESPN names don't always match ours exactly
const NAME_ALIASES = {
  "Ohio St": "Ohio State", "Ohio St.": "Ohio State",
  "N Dakota St": "North Dakota State", "NDSU": "North Dakota State", "N. Dakota St.": "North Dakota State",
  "S. Florida": "South Florida", "USF": "South Florida", "S Florida": "South Florida",
  "Michigan St": "Michigan State", "Mich. St.": "Michigan State", "MSU": "Michigan State",
  "N Iowa": "Northern Iowa", "UNI": "Northern Iowa", "Northern Iowa": "Northern Iowa",
  "Cal Baptist": "Cal Baptist", "CBU": "Cal Baptist", "California Baptist": "Cal Baptist",
  "St. John's": "St. John's", "St John's": "St. John's",
  "Saint Mary's": "Saint Mary's", "St. Mary's": "Saint Mary's", "Saint Mary's (CA)": "Saint Mary's",
  "Kennesaw St": "Kennesaw State", "Kennesaw St.": "Kennesaw State",
  "Prairie View": "Prairie View A&M", "PV A&M": "Prairie View A&M", "Prairie View A&M": "Prairie View A&M",
  "NC State": "NC State", "N.C. State": "NC State",
  "UNC": "North Carolina", "North Carolina": "North Carolina",
  "VCU": "VCU",
  "UCF": "UCF",
  "LIU": "LIU",
  "SMU": "SMU",
  "BYU": "BYU",
  "LSU": "LSU",
  "UMBC": "UMBC",
  "Miami OH": "Miami (OH)", "Miami (OH)": "Miami (OH)", "Miami Ohio": "Miami (OH)",
  "Miami FL": "Miami (FL)", "Miami": "Miami (FL)", "Miami (FL)": "Miami (FL)",
  "Iowa St": "Iowa State", "Iowa St.": "Iowa State",
  "Tennessee St": "Tennessee State", "Tenn. St.": "Tennessee State", "Tennessee State": "Tennessee State",
  "Tenn": "Tennessee", "Tennessee": "Tennessee",
  "Wright St": "Wright State", "Wright St.": "Wright State",
  "Santa Clara": "Santa Clara",
  "Saint Louis": "Saint Louis", "St. Louis": "Saint Louis",
  "Utah St": "Utah State", "Utah St.": "Utah State",
  "Texas A&M": "Texas A&M", "Texas A&amp;M": "Texas A&M",
  "High Point": "High Point",
  "Gonzaga": "Gonzaga",
};

function normalizeName(name) {
  if (!name) return "";
  const trimmed = name.trim();
  return NAME_ALIASES[trimmed] || trimmed;
}

// Build a flat list of all R64 matchups with both team names
function getAllR64Teams() {
  const teams = [];
  for (const regionKey of ["east", "west", "south", "midwest"]) {
    const region = BRACKET[regionKey];
    for (const game of region.r64) {
      teams.push(
        { name: game.t1, seed: game.s1, region: regionKey },
        { name: game.t2, seed: game.s2, region: regionKey }
      );
    }
  }
  return teams;
}

// Match an ESPN game result to one of our bracket games
function matchGameToBracket(espnGame, allBracketTeams) {
  const homeName = normalizeName(espnGame.home?.name);
  const awayName = normalizeName(espnGame.away?.name);

  // Check if either team is in our bracket
  const homeMatch = allBracketTeams.find(
    (t) => t.name === homeName || homeName.includes(t.name) || t.name.includes(homeName)
  );
  const awayMatch = allBracketTeams.find(
    (t) => t.name === awayName || awayName.includes(t.name) || t.name.includes(awayName)
  );

  if (!homeMatch && !awayMatch) return null;

  return {
    espnId: espnGame.id,
    status: espnGame.status,
    home: { ...espnGame.home, bracketName: homeMatch?.name || homeName },
    away: { ...espnGame.away, bracketName: awayMatch?.name || awayName },
  };
}

// Find which bracket game this ESPN result maps to
function findBracketGame(winnerName, loserName) {
  for (const regionKey of ["east", "west", "south", "midwest"]) {
    const region = BRACKET[regionKey];
    for (const game of region.r64) {
      if (
        (game.t1 === winnerName && game.t2 === loserName) ||
        (game.t2 === winnerName && game.t1 === loserName)
      ) {
        return { game, round: "r64", region: regionKey };
      }
    }
  }
  return null;
}

// Main engine: process live ESPN data against bracket
export function computeLiveStandings(espnGames) {
  const allBracketTeams = getAllR64Teams();
  const results = [];
  let correct = 0;
  let wrong = 0;
  let pending = 63;
  let upsetsHit = 0;
  let upsetsMissed = 0;
  const eliminated = new Set();
  const advanced = new Set();
  const liveMatchups = [];

  for (const espnGame of espnGames) {
    const matched = matchGameToBracket(espnGame, allBracketTeams);
    if (!matched) continue;

    const isFinal = matched.status === "post";
    const isLive = matched.status === "in";

    if (isFinal) {
      const winner = matched.home.winner
        ? matched.home.bracketName
        : matched.away.winner
        ? matched.away.bracketName
        : null;

      const loser = matched.home.winner
        ? matched.away.bracketName
        : matched.away.winner
        ? matched.home.bracketName
        : null;

      if (winner && loser) {
        const bracketGame = findBracketGame(winner, loser);
        if (bracketGame) {
          const isCorrect = bracketGame.game.pick === winner;
          results.push({
            winner,
            loser,
            pick: bracketGame.game.pick,
            correct: isCorrect,
            region: bracketGame.region,
            round: bracketGame.round,
            score: `${Math.max(matched.home.score, matched.away.score)}-${Math.min(matched.home.score, matched.away.score)}`,
          });

          if (isCorrect) correct++;
          else wrong++;
          pending--;

          eliminated.add(loser);
          advanced.add(winner);

          // Check upset picks
          const upsetPick = UPSET_PICKS.find(
            (u) => u.team === winner || u.over === winner
          );
          if (upsetPick) {
            if (upsetPick.team === winner) upsetsHit++;
            else upsetsMissed++;
          }
        }
      }
    }

    if (isLive) {
      liveMatchups.push({
        home: matched.home,
        away: matched.away,
        espnId: matched.espnId,
      });
    }
  }

  // Recompute probabilities based on eliminations
  const liveProbabilities = computeLiveProbabilities(eliminated, advanced);

  // Update upset picks status
  const upsetPicksLive = UPSET_PICKS.map((u) => ({
    ...u,
    status: eliminated.has(u.team)
      ? "missed"
      : eliminated.has(u.over)
      ? "hit"
      : advanced.has(u.team)
      ? "alive"
      : "pending",
  }));

  return {
    record: { correct, wrong, pending },
    results,
    eliminated: [...eliminated],
    advanced: [...advanced],
    liveMatchups,
    upsetPicks: upsetPicksLive,
    upsetsHit,
    upsetsMissed,
    probabilities: liveProbabilities,
  };
}

// Recalculate title probabilities based on eliminations
function computeLiveProbabilities(eliminated, advanced) {
  const baseProbabilities = {};
  for (const [name, team] of Object.entries(TEAMS)) {
    baseProbabilities[name] = {
      titleProb: team.titleProb,
      f4Prob: team.f4Prob,
      e8Prob: team.e8Prob,
    };
  }

  // Zero out eliminated teams
  for (const name of eliminated) {
    if (baseProbabilities[name]) {
      baseProbabilities[name] = { titleProb: 0, f4Prob: 0, e8Prob: 0 };
    }
  }

  // Redistribute eliminated probability proportionally among surviving teams
  const totalElimProb = [...eliminated].reduce((sum, name) => {
    const team = TEAMS[name];
    return sum + (team?.titleProb || 0);
  }, 0);

  if (totalElimProb > 0) {
    const survivingTeams = Object.keys(baseProbabilities).filter(
      (name) => !eliminated.has(name) && baseProbabilities[name].titleProb > 0
    );

    const survivingTotal = survivingTeams.reduce(
      (sum, name) => sum + baseProbabilities[name].titleProb,
      0
    );

    if (survivingTotal > 0) {
      for (const name of survivingTeams) {
        const share = baseProbabilities[name].titleProb / survivingTotal;
        baseProbabilities[name].titleProb += totalElimProb * share;

        // Also boost F4 and E8 proportionally
        const f4ElimProb = [...eliminated].reduce(
          (sum, eName) => sum + (TEAMS[eName]?.f4Prob || 0),
          0
        );
        const e8ElimProb = [...eliminated].reduce(
          (sum, eName) => sum + (TEAMS[eName]?.e8Prob || 0),
          0
        );
        baseProbabilities[name].f4Prob += f4ElimProb * share;
        baseProbabilities[name].e8Prob += e8ElimProb * share;

        // Cap at reasonable limits
        baseProbabilities[name].titleProb = Math.min(0.95, baseProbabilities[name].titleProb);
        baseProbabilities[name].f4Prob = Math.min(0.95, baseProbabilities[name].f4Prob);
        baseProbabilities[name].e8Prob = Math.min(0.95, baseProbabilities[name].e8Prob);
      }
    }
  }

  // Boost teams that have advanced
  for (const name of advanced) {
    if (baseProbabilities[name]) {
      baseProbabilities[name].titleProb *= 1.05;
      baseProbabilities[name].f4Prob *= 1.05;
      baseProbabilities[name].e8Prob = Math.min(0.95, baseProbabilities[name].e8Prob * 1.08);
    }
  }

  // Normalize title probs to sum to 1
  const totalTitle = Object.values(baseProbabilities).reduce(
    (sum, t) => sum + t.titleProb,
    0
  );
  if (totalTitle > 0) {
    for (const name of Object.keys(baseProbabilities)) {
      baseProbabilities[name].titleProb = +(baseProbabilities[name].titleProb / totalTitle).toFixed(4);
      baseProbabilities[name].f4Prob = +baseProbabilities[name].f4Prob.toFixed(4);
      baseProbabilities[name].e8Prob = +baseProbabilities[name].e8Prob.toFixed(4);
    }
  }

  return baseProbabilities;
}
