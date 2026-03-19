import { ESPN_SCOREBOARD_URL } from "@/lib/constants";

export const revalidate = 30;

export async function GET() {
  try {
    const res = await fetch(ESPN_SCOREBOARD_URL, {
      next: { revalidate: 30 },
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) throw new Error(`ESPN API returned ${res.status}`);
    const data = await res.json();

    const games = (data.events || [])
      .filter((event) => {
        const notes = event.competitions?.[0]?.notes;
        const isTournament =
          notes?.some((n) => n.headline?.toLowerCase().includes("ncaa")) ||
          event.season?.slug?.includes("post-season") ||
          true; // Include all college basketball games during tournament
        return isTournament;
      })
      .map((event) => {
        const comp = event.competitions?.[0];
        if (!comp) return null;

        const homeTeam = comp.competitors?.find((c) => c.homeAway === "home");
        const awayTeam = comp.competitors?.find((c) => c.homeAway === "away");

        return {
          id: event.id,
          status: event.status?.type?.state || "pre",
          statusDetail: event.status?.type?.shortDetail || "",
          clock: event.status?.displayClock || "",
          period: event.status?.period || 0,
          home: {
            name: homeTeam?.team?.shortDisplayName || homeTeam?.team?.displayName || "TBD",
            abbreviation: homeTeam?.team?.abbreviation || "",
            score: parseInt(homeTeam?.score) || 0,
            seed: homeTeam?.curatedRank?.current || null,
            logo: homeTeam?.team?.logo || null,
            color: homeTeam?.team?.color ? `#${homeTeam.team.color}` : null,
            winner: homeTeam?.winner || false,
          },
          away: {
            name: awayTeam?.team?.shortDisplayName || awayTeam?.team?.displayName || "TBD",
            abbreviation: awayTeam?.team?.abbreviation || "",
            score: parseInt(awayTeam?.score) || 0,
            seed: awayTeam?.curatedRank?.current || null,
            logo: awayTeam?.team?.logo || null,
            color: awayTeam?.team?.color ? `#${awayTeam.team.color}` : null,
            winner: awayTeam?.winner || false,
          },
          startTime: event.date,
          venue: comp.venue?.fullName || "",
          broadcast: comp.broadcasts?.[0]?.names?.[0] || "",
        };
      })
      .filter(Boolean);

    return Response.json({
      games,
      updated: new Date().toISOString(),
      count: games.length,
    });
  } catch (err) {
    console.error("ESPN API error:", err.message);
    return Response.json({
      games: [],
      error: err.message,
      updated: new Date().toISOString(),
      count: 0,
    });
  }
}
