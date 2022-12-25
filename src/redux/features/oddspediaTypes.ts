export interface IOddspediaLeague {
  sport_id: number;
  sport_name: string;
  sport_slug: string;
  sport_slug_en: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  category_slug_en: string;
  id: number;
  league_name: string;
  league_slug: string;
  league_abbr?: any;
  slug_en: string;
  match_count_prematch: number;
  match_count_inplay: number;
  order?: any;
}

export interface IOddspediaCategory {
  id: number;
  sport_id: number;
  name: string;
  slug: string;
  slug_en: string;
  match_count_prematch_all: number;
  match_count_prematch: number;
  match_count_inplay: number;
  order: number;
}

interface IOddspediaMatchListSport {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  slug_en: string;
  sort: number;
}

interface IOddspediaMatchListCategory {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  slug_en: string;
}

interface IOddspediaMatchListLeague {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  slug_en: string;
  sort: number | null;
  abbr: null | string;
  category_id: number;
  sport_id: number;
  has_standing: number;
  is_group_stage_over: number;
  round_name: string;
  season_id: number;
  has_scheme: boolean;
}

interface IOddspediaMatch {
  id: number;
  md: string;
  ht: string;
  ht_id: number;
  ht_abbr: string;
  ht_slug: string;
  ht_slug_en: string;
  at: string;
  at_id: number;
  at_abbr: string;
  at_slug: string;
  at_slug_en: string;
  uri: string;
  inplay: number;
  current_time: number;
  additional_time: number | string;
  hscore: number;
  ascore: number;
  status: string;
  matchstatus: number;
  popular: string;
  cancel: string;
  special_status: null;
  status_reason: null;
  sport_id: number;
  category_id: number;
  league_id: number;
  sport_sort: number;
  league_sort: number;
  game_score: null;
  inplay_status: string;
  show_inplay_status: boolean;
  postmatch_status: null | string;
  halftime: null;
  ht_red_cards: number;
  at_red_cards: number;
  winner: number;
  aggregate_winner: number;
  league_round_name: string;
  has_limited_coverage: boolean;
  aggregate_home_score: null;
  aggregate_away_score: null;
  group_name: string;
  has_special_offer: null;
}

export interface IOddspediaGetMatchListData {
  sportList: {
    [key: string]: IOddspediaMatchListSport;
  };
  matchList: IOddspediaMatch[];
  categoryList: { [key: string]: IOddspediaMatchListCategory };
  leagueList: { [key: string]: IOddspediaMatchListLeague };
  matches_count: number;
  total_pages: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
}

interface MatchKey {
  statement: string;
}

export interface IOddspediaMatchInfo {
  id: string;
  def_ot: number;
  sr_id: number;
  starttime: string;
  md: string;
  sport_id: number;
  sport_name: string;
  sport_name_en: string;
  sport_slug: string;
  sport_slug_en: string;
  country_id: number;
  ccode: string;
  category_name: string;
  category_slug: string;
  category_slug_en: string;
  is_summer_olympics: number;
  is_winter_olympics: number;
  league_id: number;
  league_name: string;
  league_name_en: string;
  league_slug: string;
  league_slug_en: string;
  league_abbr?: any;
  ht_id: number;
  ht_form: string;
  ht_abbr: string;
  ht: string;
  ht_slug: string;
  ht_slug_en: string;
  hscore?: any;
  at_id: number;
  at_form: string;
  at_abbr: string;
  at: string;
  at_slug: string;
  at_slug_en: string;
  ascore?: any;
  ht_playoff_series?: any;
  at_playoff_series?: any;
  scorers?: any;
  inplay_status?: any;
  show_inplay_status: boolean;
  current_time: number;
  additional_time: string;
  game_score?: any;
  season_id: number;
  season_name: string;
  season_start_date: string;
  season_end_date: string;
  stage_id: number;
  stage_type: string;
  stage_phase: string;
  stage_order: number;
  stage_start_date: string;
  stage_end_date: string;
  group_id: number;
  stage_group_name: string;
  stage_group_max_rounds: number;
  stage_group_group_name: string;
  referee_id?: any;
  referee_type?: any;
  referee_name?: any;
  referee_country_code?: any;
  referee_nationality?: any;
  venue_id: number;
  venue_name: string;
  venue_country_code: string;
  venue_country: string;
  venue_city: string;
  venue_capacity: string;
  surface?: any;
  weather_conditions: any;
  matchstatus: number;
  special_status?: any;
  status?: any;
  has_standings: number;
  round_name: string;
  to_show_standings: number;
  short_periods_names?: any;
  postmatch_status?: any;
  prize_money?: any;
  prize_currency?: any;
  halftime?: any;
  template: any;
  match_keys: MatchKey[];
  uri: string;
  video?: any;
  winner?: any;
  ht_red_cards: number;
  at_red_cards: number;
  aggregate_home_score?: any;
  aggregate_away_score?: any;
}

interface IOddspediaOddName {
  id: number;
  name: string;
  alternative_name: string;
  period: string;
  oddsnames: string[];
  waytype: number;
  has_handicap: number;
  payout: number;
}

export interface IOddspediaOddsNamesData {
  [key: string]: IOddspediaOddName;
}

interface IOddspediaOdd {
  bid: number;
  bookie_name: string;
  bookie_slug: string;
  bookie_order: number;
  wettsteuer: number;
  offer_id: number;
  o1: string;
  o1d: number;
  o1_link: string;
  o2: string;
  o2d: number;
  o2_link: string;
  o3: string;
  o3d: number;
  o3_link: string;
  payout: number;
  status: number;
}

interface IOddspediaOddsPeriod {
  ot_id: number;
  name: string;
  winning_odd?: any;
  odds: IOddspediaOdd[];
}

interface IOddspediaPrematchOdd {
  id: number;
  name: string;
  short_name: string;
  oddsnames: string[];
  waytype: number;
  has_handicap: number;
  payout: number;
  periods: IOddspediaOddsPeriod[];
}

export interface IOddspediaMatchOddsData {
  prematch: IOddspediaPrematchOdd[];
}

interface IStage {
  name: string;
  type: string;
}

interface IAllRound {
  round: string;
  round_en: string;
  start_date: string;
  end_date: string;
}

interface IAllWeek {
  week: number;
  start_date: string;
  end_date: string;
}

interface IAllSeason {
  season_id: number;
  start_date: string;
  end_date: string;
  season_name: string;
  year: string;
}

export interface IOddspediaLeagueInfoData {
  is_summer_olympics: number;
  is_winter_olympics: number;
  current_season: number;
  has_standing: number;
  sport_id: number;
  sport_name: string;
  sport_name_en: string;
  sport_slug: string;
  sport_slug_en: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  category_slug_en: string;
  league_id: number;
  league_name: string;
  league_name_en: string;
  league_slug: string;
  league_slug_en: string;
  league_abbr?: any;
  playlist?: any;
  has_sr_coverage: boolean;
  stage: IStage;
  all_rounds: IAllRound[];
  current_round: string;
  all_weeks: IAllWeek[];
  current_week: number;
  all_seasons: IAllSeason[];
  title_holder?: any;
  runner_up?: any;
  top_scorer?: any;
}
