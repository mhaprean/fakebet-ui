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
