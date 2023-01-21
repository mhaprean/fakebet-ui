import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IBetslip } from './betslipSlice';

export interface IStrapiUser {
  id: number;
  username: string;
  email: string;

  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  tickets: any[];
  account: null;
  bets: any[];

  current_balance: number;
  preffered_theme: string;
  image: string;
}

interface IStrapiLocalError {
  status: number;
  name: string;
  message: string;
  details: any;
}

interface IAuthLocalResponse {
  jwt: string;
  user: IStrapiUser;
  data?: any;
  error?: IStrapiLocalError;
}

interface IAuthLocalRegisterResponse {
  jwt: string;
  user: IStrapiUser;
  data?: any;
  error?: IStrapiLocalError;
}

interface IUserRegisterPayload {
  username: string;
  email: string;
  password: string;
  preffered_theme?: string;
}

interface IAddTicketResponse {
  data: any;
}

interface IAddTicketPayload {
  betslip: IBetslip;
  user_id: number;
  current_balance: number;
}

interface IStrapiBet {
  id: number;
  attributes: {
    is_validated: boolean;
    is_winner: boolean;
    market_id: string;
    market_name: string;
    market_specifier: string;
    outcome_id: string;
    outcome_name: string;
    outcome_odds: number;
    match_date: string;
    createdAt: string;
    updatedAt: string;
    home_team: string;
    home_logo: string;
    away_team: string;
    away_logo: string;
    tournament_id: number;
    tournament_name: string;
    sport_key: string;
    category_slug: string;
    category_name: string;
    category_id: number;
    validation_date: string;
  };
}

interface IStrapiTicket {
  id: number;
  attributes: {
    is_validated: boolean;
    is_winner: boolean;
    potential_gain: number;
    stake: number;
    total_odds: number;
    current_balance: number;
    validation_date: string;

    bets: {
      data: IStrapiBet[];
    };
  };
}

interface IStrapiTicketsResponse {
  data: IStrapiTicket[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const strapi = createApi({
  reducerPath: 'strapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getUsers: builder.query<IStrapiUser[], void>({
      query: () => 'users',
    }),
    getMyProfile: builder.query<IStrapiUser, {}>({
      query: () => {
        return {
          url: 'users/me',
          // params: {
          //   populate: '*',
          // },
        };
      },

      providesTags: ['Account'],
    }),

    getUserById: builder.query<IStrapiUser, { userId: number }>({
      query: ({ userId }) => `users/${userId}`,
    }),

    login: builder.mutation<IAuthLocalResponse, { identifier: string; password: string }>({
      query(body) {
        return {
          url: `auth/local`,
          method: 'POST',
          body,
        };
      },
    }),

    register: builder.mutation<IAuthLocalRegisterResponse, IUserRegisterPayload>({
      query(body) {
        return {
          url: `auth/local/register`,
          method: 'POST',
          body,
        };
      },
    }),

    addCustomTicket: builder.mutation<IAddTicketResponse, IAddTicketPayload>({
      query: ({ betslip, user_id, current_balance }) => ({
        url: `custom-ticket`,
        method: 'POST',
        body: { betslip, user_id, current_balance },
      }),
      invalidatesTags: ['Account'],
    }),

    getTickets: builder.query<IStrapiTicketsResponse, { queryString?: string }>({
      query: ({ queryString = '' }) => {
        return {
          url: `tickets?${queryString}`,
        };
      },
    }),


  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMyProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddCustomTicketMutation,
  useGetTicketsQuery,
} = strapi;