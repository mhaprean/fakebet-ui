import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IIgubetMatch, IIgutbetTournament } from './igubetTypes';

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
  tournament_id?: number;
  start_from?: string;
  start_to?: string;
  bettable?: boolean;
  limit?: number;
  match_status?: number;
  sort_by?: string;
}

interface ITournamentsResponse {
  data: IIgutbetTournament[];
  pagination: IIgubetPagination;
}

export const igubetApi = createApi({
  reducerPath: 'igubetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://igubet.com/api/v2/',
  }),
  endpoints: (builder) => ({
    getTournaments: builder.query<ITournamentsResponse, { category_id: number; limit?: number }>({
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

    getMatches: builder.query<IMatchesResponse, IMatchesParams>({
      query: ({
        bettable = true,
        limit = 10,
        match_status = 0,
        sort_by = 'start_time:asc',
        start_from,
        start_to,
        tournament_id,
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
          },
        };
      },
    }),
  }),
});

export const { useGetMatchesQuery, useGetTournamentsQuery } = igubetApi;

export default igubetApi;
