import { ESPN_SCOREBOARD_URL } from "@/lib/constants";
import { computeLiveStandings } from "@/lib/bracket-engine";

export const revalidate = 30;

export async function GET() {
  try {
    // Fetch today's + recent tournament games from ESPN
    const [todayRes, yesterdayRes] = await Promise.allSettled([
      fetch(ESPN_SCOREBOARD_URL, { next: { revalidate: 30 } }),
      fetch(
        `${ESPN_SCOREBOARD_URL}?dates=${getYesterdayDate()}`,
        { next: { revalidate: 60 } }
      ),
    ]);

    let allGames = [];

    if (todayRes.status === "fulfilled" && todayRes.value.ok) {
      const data = await todayRes.value.json();
      allGames.push(...parseESPNGames(data));
    }

    if (yesterdayRes.status === "fulfilled" && yesterdayRes.value.ok) {
      const data = await yesterdayRes.value.json();
      allGames.push(...parseESPNGames(data));
    }

    // Deduplicate by game ID
    const seen = new Set();
    allGames = allGames.filter((g) => {
      if (seen.has(g.id)) return false;
      seen.add(g.id);
      return true;
    });

    // Run bracket engine
    const standings = computeLiveStandings(allGames);

    return Response.json({
      ...standings,
      updated: new Date().toISOString(),
      gamesProcessed: allGames.length,
    });
  } catch (err) {
    console.error("Standings API error:", err.message);
    return Response.json({
      record: { correct: 0, wrong: 0, pending: 63 },
      results: [],
      eliminated: [],
      advanced: [],
      liveMatchups: [],
      upsetPicks: [],
      upsetsHit: 0,
      upsetsMissed: 0,
      probabilities: {},
      error: err.message,
      updated: new Date().toISOString(),
      gamesProcessed: 0,
    });
  }
}

function parseESPNGames(data) {
  return (data.events || []).map((event) => {
    const comp = event.competitions?.[0];
    if (!comp) return null;

    const homeTeam = comp.competitors?.find((c) => c.homeAway === "home");
    const awayTeam = comp.competitors?.find((c) => c.homeAway === "away");

    return {
      id: event.id,
      status: event.status?.type?.state || "pre",
      home: {
        name: homeTeam?.team?.shortDisplayName || homeTeam?.team?.displayName || "TBD",
        score: parseInt(homeTeam?.score) || 0,
        seed: homeTeam?.curatedRank?.current || null,
        winner: homeTeam?.winner || false,
      },
      away: {
        name: awayTeam?.team?.shortDisplayName || awayTeam?.team?.displayName || "TBD",
        score: parseInt(awayTeam?.score) || 0,
        seed: awayTeam?.curatedRank?.current || null,
        winner: awayTeam?.winner || false,
      },
    };
  }).filter(Boolean);
}

function getYesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
