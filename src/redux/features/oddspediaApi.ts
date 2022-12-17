import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOddspediaCategory, IOddspediaGetMatchListData, IOddspediaLeague, IOddspediaMatchInfo } from './oddspediaTypes';

interface IGetLeaguesResponse {
  generated_at: string;
  data: IOddspediaLeague[];
}

interface IGetLeagueParams {
  topLeaguesOnly?: number;
  includeLeaguesWithoutMatches?: number;
  sport?: string;
  category?: number; // category id is the country id
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
  perPageDefault?: number;
  perPage?: number;
  page?: number;
  startDate?: string;
  endDate?: string;
}

export const oddspediaApi = createApi({
  reducerPath: 'oddspediaapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://oddspedia.com/api/v1/',
  }),
  endpoints: (builder) => ({
    getLeagues: builder.query<IGetLeaguesResponse, IGetLeagueParams>({
      query: ({ topLeaguesOnly = 0, includeLeaguesWithoutMatches = 1 }: IGetLeagueParams) => {
        return {
          url: 'getLeagues',
          params: {
            geoCode: 'RO',
            language: 'en',
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
        sortBy = 'default',
        status = 'all',
        popularLeaguesOnly = 0,
      }: IGetMatchListParams) => {
        return {
          url: 'getMatchList',
          params: {
            geoCode: 'RO',
            language: 'en',
            excludeSpecialStatus,
            sport,
            status,
            page,
            perPage,
            perPageDefault,
            sortBy,
            popularLeaguesOnly,
          },
        };
      },
    }),

    getMatchInfo: builder.query<IGetMatchInfoResponse, {matchKey: number | string}>({
      query: ({
        matchKey
      }) => {
        return {
          url: 'getMatchList',
          params: {
            geoCode: 'RO',
            wettsteuer: 0,
            matchKey,
            language: 'en'
          },
        };
      },
    }),
  }),
});

export const { useGetLeaguesQuery, useGetCategoriesQuery, useGetMatchListQuery } = oddspediaApi;

export default oddspediaApi;
