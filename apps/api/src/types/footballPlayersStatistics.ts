export interface ApiResponse {
  get: string;
  parameters: {
    season: string;
    league: string;
    page: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: ApiPlayer[];
}

export interface ApiPlayer {
  player: ApiPlayerInfo;
  statistics: ApiStatistic[];
}

export interface ApiPlayerInfo {
  id: number;
  name: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  birth: {
    date?: string;
    place?: string;
    country?: string;
  };
  nationality?: string;
  height?: string;
  weight?: string;
  injured?: boolean;
  photo?: string;
}

export interface ApiStatistic {
  team: ApiTeam;
  league: ApiLeague;
  games: ApiGames;
  substitutes: ApiSubstitutes;
  shots: ApiShots;
  goals: ApiGoals;
  passes: ApiPasses;
  tackles: ApiTackles;
  duels: ApiDuels;
  dribbles: ApiDribbles;
  fouls: ApiFouls;
  cards: ApiCards;
  penalty: ApiPenalty;
}

export interface ApiTeam {
  id: number;
  name: string;
  logo: string;
}

export interface ApiLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface ApiGames {
  appearences?: number;
  lineups?: number;
  minutes?: number;
  number?: number;
  position?: string;
  rating?: string;
  captain?: boolean;
}

export interface ApiSubstitutes {
  in?: number;
  out?: number;
  bench?: number;
}

export interface ApiShots {
  total?: number;
  on?: number;
}

export interface ApiGoals {
  total?: number;
  conceded?: number;
  assists?: number;
  saves?: number;
}

export interface ApiPasses {
  total?: number;
  key?: number;
  accuracy?: number;
}

export interface ApiTackles {
  total?: number;
  blocks?: number;
  interceptions?: number;
}

export interface ApiDuels {
  total?: number;
  won?: number;
}

export interface ApiDribbles {
  attempts?: number;
  success?: number;
  past?: number;
}

export interface ApiFouls {
  drawn?: number;
  committed?: number;
}

export interface ApiCards {
  yellow?: number;
  yellowred?: number;
  red?: number;
}

export interface ApiPenalty {
  won?: number;
  commited?: number;
  scored?: number;
  missed?: number;
  saved?: number;
}
