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

  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMyProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddCustomTicketMutation,
} = strapi;
