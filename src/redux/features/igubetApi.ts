import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IIgubetCategory,
  IIgubetMarket,
  IIgubetMatch,
  IIgubetSport,
  IIgutbetTournament,
} from './igubetTypes';

interface IIgubetPagination {
  total: number;
  page: number;
  limit: number;
  last_page: number;
}

interface IMatchesResponse {
  data: IIgubetMatch[];
  pagination: IIgubetPagination;
}

interface IMatchesParams {
  tournament_id?: number | string;
  category_id?: number | string;
  start_from?: string;
  start_to?: string;
  bettable?: boolean;
  limit?: number;
  match_status?: number;
  sort_by?: string;
  sport_key?: string;
  type?: string;

  page?: number;
}

interface ITournamentsResponse {
  data: IIgutbetTournament[];
  pagination: IIgubetPagination;
}

interface ISportsResponse {
  data: IIgubetSport[];
  pagination: IIgubetPagination;
}

interface ICategoriesResponse {
  data: IIgubetCategory[];
  pagination: IIgubetPagination;
}

export interface IMatchMarketsResponse {
  data: IIgubetMarket[];
  pagination: IIgubetPagination;
}

export const igubetApi = createApi({
  reducerPath: 'igubet_api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://igubet.com/api/v2/',
  }),
  endpoints: (builder) => ({
    getIguSports: builder.query<ISportsResponse, { sport_type?: string; limit?: number }>({
      query: ({ sport_type = 'regular', limit = 500 }) => {
        return {
          url: 'sports',
          params: {
            sport_type,
            limit,
          },
        };
      },
    }),

    getIguCategories: builder.query<ICategoriesResponse, { sport_id?: number; limit?: number }>({
      query: ({ sport_id = 1, limit = 500 }) => {
        return {
          url: 'categories',
          params: {
            sport_id,
            limit,
          },
        };
      },
    }),

    getIguTournaments: builder.query<ITournamentsResponse, { category_id: number | string; limit?: number }>({
      query: ({ category_id, limit = 500 }) => {
        return {
          url: 'tournaments',
          params: {
            category_id,
            limit,
          },
        };
      },
    }),

    getIguMatches: builder.query<IMatchesResponse, IMatchesParams>({
      query: ({
        bettable = true,
        limit = 10,
        match_status = 0,
        sort_by = 'start_time:asc',
        start_from,
        start_to,
        tournament_id,
        sport_key = 'soccer',
        type = 'match',
      }) => {
        return {
          url: 'matches',
          params: {
            bettable,
            limit,
            match_status,
            sort_by,
            start_from,
            start_to,
            tournament_id,
            sport_key,
            type,
          },
        };
      },
    }),

    getIguMatchMarkets: builder.query<IMatchMarketsResponse, { matchId: number | string }>({
      query: ({ matchId }) => {
        return {
          url: `matches/${matchId}/markets`,
          params: {
            limit: 500,
          },
        };
      },
    }),

    iguSearch: builder.query<IIgubetMatch[], { term: string }>({
      query: ({ term }) => {
        return {
          url: `search?q=${term}`,
          params: {
            limit: 50,
          },
        };
      },
    }),

    getIguMatchesResults: builder.query<IMatchesResponse, IMatchesParams>({
      query: ({
        limit = 50,
        match_status = 3,
        sort_by = 'start_time:desc',
        tournament_id,
        type = 'match',
      }) => {
        return {
          url: 'matches',
          params: {
            limit,
            match_status,
            sort_by,
            tournament_id,
            type,
          },
        };
      },
    }),

    getIguSportMatches: builder.query<IMatchesResponse, IMatchesParams>({
      query: ({
        limit = 50,
        match_status = 0,
        sort_by = 'start_time:asc', // 'start_time:asc',
        sport_key = 'soccer',
        type = 'match',
        start_from,
        start_to,
        page = 1,
      }) => {
        return {
          url: `matches?bettable=true&limit=50&page=${page}&match_status=0&sort_by=tournament.priority:asc&sort_by=start_time:asc&sort_by=bets_count:desc&sport_key=${sport_key}&type=match&start_from=${start_from}&start_to=${start_to}`,
          // params: {
          //   limit,
          //   bettable: true,
          //   match_status,
          //   sort_by,
          //   sport_key,
          //   type,
          // },
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.sport_key + queryArgs.start_from + queryArgs.start_to;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.sport_key !== previousArg?.sport_key ||
          currentArg?.start_from !== previousArg?.start_from ||
          currentArg?.start_to !== previousArg?.start_to || 
          currentArg?.page !== previousArg?.page
        );
      },
    }),

    getIguCategoryMatches: builder.query<IMatchesResponse, IMatchesParams>({
      query: ({
        limit = 50,
        match_status = 0,
        sort_by = 'start_time:asc', // 'start_time:asc',
        sport_key = 'soccer',
        type = 'match',
        start_from,
        start_to,
        category_id = 8,
      }) => {
        return {
          url: `matches?bettable=true&limit=50&match_status=0&sort_by=tournament.priority:asc&sort_by=start_time:asc&sort_by=bets_count:desc&sport_key=${sport_key}&category_id=${category_id}&type=match&start_from=${start_from}&start_to=${start_to}`,
          // params: {
          //   limit,
          //   bettable: true,
          //   match_status,
          //   sort_by,
          //   sport_key,
          //   type,
          // },
        };
      },
    }),
  }),
});

export const {
  useGetIguMatchesQuery,
  useGetIguTournamentsQuery,
  useGetIguSportsQuery,
  useGetIguCategoriesQuery,
  useGetIguMatchMarketsQuery,
  useGetIguMatchesResultsQuery,
  useIguSearchQuery,
  useGetIguSportMatchesQuery,
  useGetIguCategoryMatchesQuery,
} = igubetApi;

export default igubetApi;
