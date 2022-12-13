import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOddspediaCategory, IOddspediaLeague } from './oddspediaTypes';

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
            sport
          },
        };
      },
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useGetCategoriesQuery
} = oddspediaApi;

export default oddspediaApi;
