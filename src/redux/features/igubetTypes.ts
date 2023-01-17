interface ICompetitor {
  name: string;
  logo: string;
}

interface ICompetitors {
  home: ICompetitor;
  away: ICompetitor;
}

export interface IIgubetSport {
  id: number;
  urn_id: string;
  name: string;
  key: string;
  type: string;
  priority: number;
  main_market_id: number;
  main_market_outcomes_count: number;
  secondary_market_id: number;
  secondary_market_outcomes_count: number;
  provider: string;
}

export interface IIgubetCategory {
  id: number;
  urn_id: string;
  name: string;
  country_code: string;
  sport_id: number;
  sport_urn_id: string;
  sport_key: string;
  sport_name: string;
  sport_type: string;
  priority: number;
  slug: string;
  provider: string;
}

export interface IIgutbetTournament {
  id: number;
  urn_id: string;
  name: string;
  priority: number;
  sport: IIgubetSport;
  category: IIgubetCategory;
  slug: string;
  provider: string;

  // custom fields
  image?: string;
}

export interface ITotalScore {
  home: number;
  away: number;
}

export interface IPeriodScore {
  home: number;
  away: number;
  period_key: string;
  period_name: string;
  number: number;
  type: string;
}

interface IStatistics {
  clock?: any;
  total_score: ITotalScore | null;
  period_score: IPeriodScore[] | null;
  game_score?: any;
  max_period_number?: any;
  current_server?: any;
}

export interface IOutcome {
  id: number;
  outcome_external_id: string;
  active: boolean;
  name: string;
  odds: number;

  // custom fields
  formated_name?: string;
  formated_value?: string | number;
  is_winner?: boolean;
  is_validated?: boolean;
}

interface IMarket {
  id: number;
  market_external_id: number;
  match_urn_id: string;
  name: string;
  specifier: string;
  status: number;
  outcomes: IOutcome[];
  priority: number;
  most_balanced: boolean;
  market_groups: string[];
  custom_bet_groups: any[];
  provider: string;
}

export interface IIgubetMatch {
  id: number;
  urn_id: string;
  start_time: string;
  end_date: string;
  status: number;
  type: string;
  stage: string;
  competitors: ICompetitors;
  tournament: IIgutbetTournament;
  statistics: IStatistics;
  stadium: string;
  city: string;
  slug: string;
  available_markets: number;
  top_markets: number;
  main_market: IMarket;
  secondary_market: IMarket;
  has_video: boolean;
  provider: string;


  // custom
  winner?: number;
}

// match markets

export interface IIgubetMarket {
  id: number;
  market_external_id: number;
  match_urn_id: string;
  name: string;
  specifier: string;
  status: number;
  outcomes: IOutcome[];
  priority: number;
  most_balanced: boolean;
  market_groups: string[];
  custom_bet_groups: any[];
  provider: string;

  // custom fields
  rules?: string;
  formated_market_name?: string;
  is_validated?: boolean;
}
 