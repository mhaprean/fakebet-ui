import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IOddspediaCategory,
  IOddspediaGetMatchListData,
  IOddspediaLeague,
  IOddspediaLeagueInfoData,
  IOddspediaMatchInfo,
  IOddspediaMatchOddsData,
  IOddspediaOddsNamesData,
} from './oddspediaTypes';

interface IGetLeaguesResponse {
  generated_at: string;
  data: IOddspediaLeague[];
}

interface IGetLeagueParams {
  topLeaguesOnly?: number;
  includeLeaguesWithoutMatches?: number;
  sport?: string;
  category?: number | string; // category id is the country id
  startDate?: string;
  endDate?: string;
}

interface IGetCategoriesResponse {
  generated_at: string;
  data: IOddspediaCategory[];
}

interface IGetCategoriesParams {
  sport?: string;
  startDate?: string;
  endDate?: string;
  countriesOnly?: number;
}

interface IGetMatchInfoResponse {
  generated_at: string;
  data: IOddspediaMatchInfo;
}

interface IGetMatchListResponse {
  generated_at: string;
  data: IOddspediaGetMatchListData;
}

interface IGetMatchListParams {
  excludeSpecialStatus?: number;
  popularLeaguesOnly?: number;
  sortBy?: string;
  status?: string;
  sport?: string;
  category?: string;
  league?: string;
  perPageDefault?: number;
  perPage?: number;
  page?: number;
  startDate?: string;
  endDate?: string;
  geoCode?: string;

  // optional
  seasonId?: number;
  round?: number;
}

interface IGetOddsNamesResponse {
  generated_at: string;
  data: IOddspediaOddsNamesData;
}

interface IGetMatchOddsResponse {
  generated_at: string;
  data: IOddspediaMatchOddsData;
}

interface IGetLeagueInfoResponse {
  generated_at: string;
  data: IOddspediaLeagueInfoData;
}

export const oddspediaApi = createApi({
  reducerPath: 'oddspediaapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://oddspedia.com/api/v1/',
  }),
  endpoints: (builder) => ({
    getLeagues: builder.query<IGetLeaguesResponse, IGetLeagueParams>({
      query: ({
        topLeaguesOnly = 0,
        includeLeaguesWithoutMatches = 1,
        category,
        sport = 'football',
      }: IGetLeagueParams) => {
        return {
          url: 'getLeagues',
          params: {
            category,
            geoCode: 'RO',
            language: 'en',
            sport,
            topLeaguesOnly,
            includeLeaguesWithoutMatches,
          },
        };
      },
    }),

    getCategories: builder.query<IGetCategoriesResponse, IGetCategoriesParams>({
      query: ({ countriesOnly = 0, sport = 'football' }: IGetCategoriesParams) => {
        return {
          url: 'getCategories',
          params: {
            geoCode: 'RO',
            language: 'en',
            countriesOnly,
            sport,
          },
        };
      },
    }),

    getMatchList: builder.query<IGetMatchListResponse, IGetMatchListParams>({
      query: ({
        excludeSpecialStatus = 0,
        sport = '',
        perPageDefault = 150,
        perPage = 150,
        page = 1,
        category = '',
        league = '',
        sortBy = 'default',
        status = 'all',
        popularLeaguesOnly = 0,
        startDate,
        endDate,
      }: IGetMatchListParams) => {
        return {
          url: 'getMatchList',
          params: {
            geoCode: 'RO',
            language: 'en',
            excludeSpecialStatus,
            sport,
            category,
            league,
            status,
            page,
            perPage,
            perPageDefault,
            sortBy,
            popularLeaguesOnly,
            startDate,
            endDate,
          },
        };
      },
    }),

    getMatchInfo: builder.query<IGetMatchInfoResponse, { matchKey: number | string }>({
      query: ({ matchKey }) => {
        return {
          url: 'getMatchInfo',
          params: {
            geoCode: 'RO',
            wettsteuer: 0,
            matchKey,
            language: 'en',
          },
        };
      },
    }),

    getOddsNames: builder.query<IGetOddsNamesResponse, void>({
      query: () => {
        return {
          url: 'oddsNames',
          params: {
            language: 'en',
          },
        };
      },
    }),

    getLeagueInfo: builder.query<
      IGetLeagueInfoResponse,
      { sport?: string; category: string; league: string }
    >({
      query: ({ sport = 'football', category, league }) => {
        return {
          url: 'getLeagueInfo',
          params: {
            geoCode: 'RO',
            language: 'en',
            sport,
            category,
            league,
          },
        };
      },
    }),

    getMatchOdds: builder.query<IGetMatchOddsResponse, { matchKey: number | string }>({
      query: ({ matchKey }) => {
        return {
          url: 'getMatchOdds',
          params: {
            geoCode: 'RO',
            bookmakerGeoCode: 'RO',
            geoState: '',
            wettsteuer: 0,
            matchKey,
            language: 'en',
          },
        };
      },
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useGetCategoriesQuery,
  useGetMatchListQuery,
  useGetLeagueInfoQuery,
  useGetMatchInfoQuery,
} = oddspediaApi;

export default oddspediaApi;
