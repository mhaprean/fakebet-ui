import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IBetslip } from './betslipSlice';
import { IPeriodScore, ITotalScore } from './igubetTypes';

export interface IStrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  account: IStrapiAccount;
  tickets: any[];
  bets: any[];
  preferred_theme: string;
  image: string;
}

export interface IStrapiAccount {
  id: number;
  current_balance: number;
  bankruptcy: number;
  user_id: number;
  winning_tickets: number;
  pending_tickets: number;
  losing_tickets: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
  preferred_theme?: string;
}

interface IAddTicketResponse {
  data: any;
}

interface IAddTicketPayload {
  betslip: IBetslip;
  user_id: number;
}

export interface IStrapiBet {
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
    match: {
      data: {
        id: number;
        attributes: {
          total_score: ITotalScore | null;
          period_score: IPeriodScore[] | null;
        };
      };
    };
  };
}

interface IStrapiUserWithAccount extends Pick<IStrapiUser, 'username'> {
  account: {
    data: {
      id: number;
    };
  };
}
export interface IStrapiTicket {
  id: number;
  attributes: {
    is_validated: boolean;
    is_winner: boolean;
    potential_gain: number;
    stake: number;
    total_odds: number;
    current_balance: number;
    validation_date: string;

    createdAt: string;
    updatedAt: string;

    bets: {
      data: IStrapiBet[];
    };

    user: {
      data: {
        id: number;
        attributes: IStrapiUserWithAccount;
      };
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

export type IStrapiUserList = Pick<IStrapiUser, 'id' | 'username' | 'image'>[];

interface IAccountResponse {
  data: {
    id: number;
    attributes: IAccountAttributes;
  };
  meta: any;
}

export interface IAccountAttributes extends Omit<IStrapiAccount, 'id'> {
  user: {
    data: {
      id: number;
      attributes: Omit<IStrapiUser, 'id'>;
    };
  };
}

export interface IAccountItem {
  id: number;
  attributes: IAccountAttributes;
}

export interface IStrapiAccountsResponse {
  data: IAccountItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IStrapiMatch {
  igu_id: string;
  start_time: string;
  validation_date: string;
  slug: string;
  home_team: string;
  away_team: string;
  home_logo: string;
  away_logo: string;
  tournament_id: number;
  tournament_name: string;
  sport_key: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  total_score: ITotalScore;
  period_score: IPeriodScore[];
  is_validated: boolean;
  createdAt: string;
  updatedAt: string;
  total_tickets: number;
  validation_postponed: number;
  sport_radar_id: string;
  bets: {
    data: IStrapiBet[];
  };
  tickets: {
    data: IStrapiTicket[];
  };
}

export interface IStrapiMatchesResponse {
  data: {
    id: number;
    attributes: IStrapiMatch;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:1337';

const BASE_URL = `${SERVER_URL}/api/`;

export const strapi = createApi({
  reducerPath: 'strapi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

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
    getMyProfile: builder.query<IStrapiUser, {}>({
      query: () => {
        return {
          url: 'users/me',
          params: {
            populate: 'account',
          },
        };
      },

      providesTags: ['Account'],
    }),

    getAccount: builder.query<IAccountResponse, { accountId: string }>({
      query: ({ accountId }) => {
        return {
          url: `accounts/${accountId}`,
          params: {
            populate: 'user',
          },
        };
      },
    }),

    getUserById: builder.query<IStrapiUser, { userId: number }>({
      query: ({ userId }) => `users/${userId}`,
    }),

    getUsers: builder.query<IStrapiUserList, { queryString?: string }>({
      query: ({ queryString }) => `users?${queryString}`,
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

    createAccount: builder.mutation<IAccountResponse, { user: number; user_id: number }>({
      query(data) {
        return {
          url: `accounts`,
          method: 'POST',
          body: { data },
        };
      },
      invalidatesTags: ['Account'],
    }),

    addCustomTicket: builder.mutation<IAddTicketResponse, IAddTicketPayload>({
      query: ({ betslip, user_id }) => ({
        url: `custom-ticket`,
        method: 'POST',
        body: { betslip, user_id },
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

    getFilteredAccounts: builder.query<IStrapiAccountsResponse, { queryString?: string }>({
      query: ({ queryString }) => {
        return {
          url: `accounts?${queryString}`,
        };
      },
    }),

    getFilteredMatches: builder.query<IStrapiMatchesResponse, { queryString?: string }>({
      query: ({ queryString }) => {
        return {
          url: `matches?${queryString}`,
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
  useCreateAccountMutation,
  useGetFilteredAccountsQuery,
  useGetAccountQuery,
  useGetFilteredMatchesQuery,
} = strapi;
