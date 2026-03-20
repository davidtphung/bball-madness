export const revalidate = 30;

const KALSHI_BASE = "https://api.elections.kalshi.com/trade-api/v2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");
  const category = searchParams.get("category") || "ncaa";

  try {
    // Fetch multiple Kalshi endpoints in parallel for comprehensive coverage
    const [eventsRes, marketsRes] = await Promise.allSettled([
      fetch(`${KALSHI_BASE}/events?status=open&limit=100&with_nested_markets=true`, {
        next: { revalidate: 30 },
        headers: { Accept: "application/json" },
      }),
      fetch(`${KALSHI_BASE}/markets?status=open&limit=200`, {
        next: { revalidate: 30 },
        headers: { Accept: "application/json" },
      }),
    ]);

    let allMarkets = [];

    // Parse events with nested markets
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const data = await eventsRes.value.json();
      const ncaaEvents = (data.events || []).filter((e) =>
        isNCAATournamentMarket(e.title) || isNCAATournamentMarket(e.category)
      );

      for (const event of ncaaEvents) {
        for (const market of event.markets || []) {
          allMarkets.push(formatMarket(market, event.title));
        }
      }
    }

    // Parse standalone markets
    if (marketsRes.status === "fulfilled" && marketsRes.value.ok) {
      const data = await marketsRes.value.json();
      const ncaaMarkets = (data.markets || []).filter((m) =>
        isNCAATournamentMarket(m.title) || isNCAATournamentMarket(m.subtitle)
      );

      for (const market of ncaaMarkets) {
        if (!allMarkets.find((m) => m.ticker === market.ticker)) {
          allMarkets.push(formatMarket(market));
        }
      }
    }

    // Filter by team if specified
    if (team) {
      const teamLower = team.toLowerCase();
      const teamAliases = getTeamAliases(team);

      allMarkets = allMarkets.filter((m) => {
        const searchText = `${m.title} ${m.subtitle || ""}`.toLowerCase();
        return teamAliases.some((alias) => searchText.includes(alias));
      });
    }

    // Sort: game-specific first, then championship, then other
    allMarkets.sort((a, b) => {
      const aGame = a.type === "game" ? 0 : a.type === "championship" ? 1 : 2;
      const bGame = b.type === "game" ? 0 : b.type === "championship" ? 1 : 2;
      if (aGame !== bGame) return aGame - bGame;
      return (b.volume || 0) - (a.volume || 0);
    });

    // Championship winner markets (always include)
    const champMarkets = allMarkets.filter((m) => m.type === "championship");
    const gameMarkets = allMarkets.filter((m) => m.type === "game");
    const otherMarkets = allMarkets.filter((m) => m.type === "other");

    return Response.json({
      markets: allMarkets.slice(0, 20),
      championship: champMarkets.slice(0, 10),
      gameSpecific: gameMarkets.slice(0, 10),
      other: otherMarkets.slice(0, 10),
      total: allMarkets.length,
      updated: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Kalshi API error:", err.message);
    return Response.json({
      markets: [],
      championship: [],
      gameSpecific: [],
      other: [],
      total: 0,
      error: err.message,
      updated: new Date().toISOString(),
    });
  }
}

function isNCAATournamentMarket(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return (
    lower.includes("ncaa") ||
    lower.includes("march madness") ||
    lower.includes("tournament") ||
    lower.includes("final four") ||
    lower.includes("elite eight") ||
    lower.includes("sweet 16") ||
    lower.includes("sweet sixteen") ||
    lower.includes("college basketball") ||
    lower.includes("cbb") ||
    // Check for tournament team names
    TOURNAMENT_TEAMS.some((t) => lower.includes(t))
  );
}

function formatMarket(market, eventTitle) {
  const title = market.title || eventTitle || "";
  const subtitle = market.subtitle || "";
  const fullText = `${title} ${subtitle}`.toLowerCase();

  let type = "other";
  if (
    fullText.includes("win") &&
    (fullText.includes("championship") || fullText.includes("title") || fullText.includes("national"))
  ) {
    type = "championship";
  } else if (
    fullText.includes("vs") ||
    fullText.includes("beat") ||
    fullText.includes("advance") ||
    fullText.includes("win game") ||
    fullText.includes("winner of")
  ) {
    type = "game";
  } else if (
    fullText.includes("final four") ||
    fullText.includes("elite eight") ||
    fullText.includes("sweet 16") ||
    fullText.includes("make")
  ) {
    type = "advancement";
  }

  return {
    ticker: market.ticker,
    title: market.title || eventTitle,
    subtitle: market.subtitle || null,
    yesPrice: market.yes_price ?? market.last_price ?? null,
    noPrice: market.no_price ?? (market.yes_price ? 100 - market.yes_price : null),
    lastPrice: market.last_price ?? null,
    volume: market.volume ?? 0,
    openInterest: market.open_interest ?? 0,
    type,
    closeTime: market.close_time || market.expiration_time || null,
  };
}

function getTeamAliases(team) {
  const aliases = {
    "Arizona": ["arizona", "wildcats"],
    "Duke": ["duke", "blue devils"],
    "Houston": ["houston", "cougars"],
    "Florida": ["florida", "gators"],
    "Michigan": ["michigan", "wolverines"],
    "UConn": ["uconn", "connecticut", "huskies"],
    "Purdue": ["purdue", "boilermakers"],
    "Iowa State": ["iowa state", "cyclones"],
    "Illinois": ["illinois", "illini"],
    "Gonzaga": ["gonzaga", "bulldogs", "zags"],
    "Michigan State": ["michigan state", "spartans", "msu"],
    "Kansas": ["kansas", "jayhawks"],
    "Kentucky": ["kentucky", "wildcats"],
    "North Carolina": ["north carolina", "unc", "tar heels"],
    "Alabama": ["alabama", "crimson tide"],
    "Tennessee": ["tennessee", "volunteers", "vols"],
  };
  return aliases[team] || [team.toLowerCase()];
}

const TOURNAMENT_TEAMS = [
  "arizona", "duke", "houston", "florida", "michigan", "uconn",
  "purdue", "iowa state", "illinois", "gonzaga", "michigan state",
  "kansas", "kentucky", "north carolina", "alabama", "tennessee",
  "arkansas", "louisville", "wisconsin", "vanderbilt", "byu",
  "ucla", "st. john", "villanova", "ohio state", "clemson",
  "virginia", "texas tech", "miami", "missouri", "saint mary",
];
