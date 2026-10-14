import {
  ApiLeague,
  ApiPlayerInfo,
  ApiStatistic,
  ApiTeam,
} from "../types/footballPlayersStatistics";

export function mapPlayer(p: ApiPlayerInfo) {
  return {
    name: p.name,
    firstname: p.firstname ?? null,
    lastname: p.lastname ?? null,
    age: p.age ?? null,
    birthDate: p.birth.date ?? null,
    birthPlace: p.birth.place ?? null,
    birthCountry: p.birth.country ?? null,
    nationality: p.nationality ?? null,
    height: p.height ?? null,
    weight: p.weight ?? null,
    injured: p.injured ?? null,
    photo: p.photo ?? null,
  };
}

export function mapTeam(t: ApiTeam) {
  return {
    apiId: t.id,
    name: t.name,
    logo: t.logo,
  };
}

export function mapLeague(l: ApiLeague) {
  return {
    apiId: l.id,
    name: l.name,
    country: l.country,
    logo: l.logo,
    flag: l.flag,
    season: l.season,
  };
}

export function buildStatistic(
  playerId: number,
  teamId: number,
  leagueId: number,
  s: ApiStatistic,
) {
  return {
    playerId,
    teamId,
    leagueId,

    games: {
      create: {
        appearences: s.games.appearences ?? null,
        lineups: s.games.lineups ?? null,
        minutes: s.games.minutes ?? null,
        number: s.games.number ?? null,
        position: s.games.position ?? null,
        rating: s.games.rating ?? null,
        captain: s.games.captain ?? null,
      },
    },
    substitutes: {
      create: {
        in_: s.substitutes.in ?? null,
        out: s.substitutes.out ?? null,
        bench: s.substitutes.bench ?? null,
      },
    },
    shots: {
      create: {
        total: s.shots.total ?? null,
        onTarget: s.shots.on ?? null,
      },
    },
    goals: {
      create: {
        total: s.goals.total ?? null,
        conceded: s.goals.conceded ?? null,
        assists: s.goals.assists ?? null,
        saves: s.goals.saves ?? null,
      },
    },
    passes: {
      create: {
        total: s.passes.total ?? null,
        key: s.passes.key ?? null,
        accuracy: s.passes.accuracy ?? null,
      },
    },
    tackles: {
      create: {
        total: s.tackles.total ?? null,
        blocks: s.tackles.blocks ?? null,
        interceptions: s.tackles.interceptions ?? null,
      },
    },
    duels: {
      create: {
        total: s.duels.total ?? null,
        won: s.duels.won ?? null,
      },
    },
    dribbles: {
      create: {
        attempts: s.dribbles.attempts ?? null,
        success: s.dribbles.success ?? null,
        past: s.dribbles.past ?? null,
      },
    },
    fouls: {
      create: {
        drawn: s.fouls.drawn ?? null,
        committed: s.fouls.committed ?? null,
      },
    },
    cards: {
      create: {
        yellow: s.cards.yellow ?? null,
        yellowred: s.cards.yellowred ?? null,
        red: s.cards.red ?? null,
      },
    },
    penalty: {
      create: {
        won: s.penalty.won ?? null,
        commited: s.penalty.commited ?? null,
        scored: s.penalty.scored ?? null,
        missed: s.penalty.missed ?? null,
        saved: s.penalty.saved ?? null,
      },
    },
  };
}
