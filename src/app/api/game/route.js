export const revalidate = 30;

const ESPN_SUMMARY = (id) =>
  `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/summary?event=${id}`;

const KALSHI_EVENTS_URL = "https://api.elections.kalshi.com/trade-api/v2/events";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("id");

  if (!gameId) {
    return Response.json({ error: "Missing game id" }, { status: 400 });
  }

  const [espnData, kalshiData] = await Promise.allSettled([
    fetchESPN(gameId),
    fetchKalshi(gameId),
  ]);

  return Response.json({
    game: espnData.status === "fulfilled" ? espnData.value : null,
    kalshi: kalshiData.status === "fulfilled" ? kalshiData.value : null,
    updated: new Date().toISOString(),
  });
}

async function fetchESPN(gameId) {
  const res = await fetch(ESPN_SUMMARY(gameId), {
    next: { revalidate: 30 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`ESPN ${res.status}`);
  const data = await res.json();

  const comp = data.header?.competitions?.[0];
  const homeComp = comp?.competitors?.find((c) => c.homeAway === "home");
  const awayComp = comp?.competitors?.find((c) => c.homeAway === "away");

  // Box score
  const boxscore = data.boxscore;
  const homeStats = extractTeamStats(boxscore, 0);
  const awayStats = extractTeamStats(boxscore, 1);

  // Leaders
  const leaders = data.leaders || [];
  const homeLeaders = extractLeaders(leaders, 0);
  const awayLeaders = extractLeaders(leaders, 1);

  // Win probability plays
  const winProbability = (data.winprobability || []).map((wp) => ({
    time: wp.playId,
    homeWinPct: +(wp.homeWinPercentage * 100).toFixed(1),
    secondsLeft: wp.secondsLeft,
  }));

  // Scoring plays / play-by-play
  const plays = (data.plays || []).slice(-20).map((p) => ({
    text: p.text,
    clock: p.clock?.displayValue,
    period: p.period?.number,
    homeScore: p.homeScore,
    awayScore: p.awayScore,
    scoringPlay: p.scoringPlay,
    type: p.type?.text,
  }));

  return {
    id: gameId,
    status: comp?.status?.type?.state || "pre",
    statusDetail: comp?.status?.type?.shortDetail || "",
    clock: comp?.status?.displayClock || "",
    period: comp?.status?.period || 0,
    venue: data.gameInfo?.venue?.fullName || "",
    attendance: data.gameInfo?.attendance,
    broadcast: comp?.broadcasts?.[0]?.names?.[0] || "",
    startTime: comp?.date,
    home: {
      name: homeComp?.team?.displayName || "TBD",
      shortName: homeComp?.team?.shortDisplayName || "TBD",
      abbreviation: homeComp?.team?.abbreviation || "",
      score: parseInt(homeComp?.score) || 0,
      seed: homeComp?.curatedRank?.current || null,
      logo: homeComp?.team?.logos?.[0]?.href || null,
      color: homeComp?.team?.color ? `#${homeComp.team.color}` : "#666",
      record: homeComp?.record?.[0]?.displayValue || "",
      winner: homeComp?.winner || false,
      stats: homeStats,
      leaders: homeLeaders,
      linescores: (homeComp?.linescores || []).map((l) => l.displayValue),
    },
    away: {
      name: awayComp?.team?.displayName || "TBD",
      shortName: awayComp?.team?.shortDisplayName || "TBD",
      abbreviation: awayComp?.team?.abbreviation || "",
      score: parseInt(awayComp?.score) || 0,
      seed: awayComp?.curatedRank?.current || null,
      logo: awayComp?.team?.logos?.[0]?.href || null,
      color: awayComp?.team?.color ? `#${awayComp.team.color}` : "#666",
      record: awayComp?.record?.[0]?.displayValue || "",
      winner: awayComp?.winner || false,
      stats: awayStats,
      leaders: awayLeaders,
      linescores: (awayComp?.linescores || []).map((l) => l.displayValue),
    },
    winProbability,
    plays,
  };
}

function extractTeamStats(boxscore, teamIndex) {
  if (!boxscore?.teams?.[teamIndex]?.statistics) return [];
  return boxscore.teams[teamIndex].statistics.map((s) => ({
    name: s.name,
    displayName: s.displayName,
    abbreviation: s.abbreviation,
    value: s.displayValue,
  }));
}

function extractLeaders(leaders, teamIndex) {
  if (!leaders?.[teamIndex]?.leaders) return [];
  return leaders[teamIndex].leaders.map((cat) => ({
    category: cat.displayName,
    leaders: (cat.leaders || []).slice(0, 1).map((l) => ({
      name: l.athlete?.displayName || "",
      value: l.displayValue,
      position: l.athlete?.position?.abbreviation || "",
      headshot: l.athlete?.headshot?.href || null,
    })),
  }));
}

async function fetchKalshi(gameId) {
  try {
    // Search Kalshi for NCAA tournament / March Madness markets
    const res = await fetch(
      `${KALSHI_EVENTS_URL}?status=open&series_ticker=NCAA&limit=50`,
      {
        next: { revalidate: 60 },
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) return { markets: [], available: false };
    const data = await res.json();

    const markets = (data.events || [])
      .flatMap((event) =>
        (event.markets || []).map((m) => ({
          ticker: m.ticker,
          title: m.title || event.title,
          yesPrice: m.yes_price,
          noPrice: m.no_price,
          volume: m.volume,
          lastPrice: m.last_price,
        }))
      )
      .slice(0, 10);

    return { markets, available: markets.length > 0 };
  } catch {
    return { markets: [], available: false };
  }
}
