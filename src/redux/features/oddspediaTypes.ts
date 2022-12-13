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
