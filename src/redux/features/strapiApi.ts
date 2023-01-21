import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

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

interface IStrapiAccount {
  id: number;
  current_balance: number;
  statistics: null;
  preffered_theme: string;
  favorites: null;
  user_image: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user_id: number;
}

interface ICreateAccountResponse {
  data: {
    id: 7;
    attributes: Omit<IStrapiAccount, 'id'>;
  };
}

interface IUpdateAccountResponse {}

interface IUserRegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface ICreateAccountPayload {
  current_balance: number;
  user: number | number[];
  preffered_theme?: string;
  user_image?: string;

  statistics?: any; // this is a json object
  favorites?: any; // this is a json object
}

export const strapi = createApi({
  reducerPath: 'strapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.100.6:1337/api/',
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
          params: {
            populate: '*',
          },
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

    createAccount: builder.mutation<ICreateAccountResponse, ICreateAccountPayload>({
      query(body) {
        return {
          url: `accounts`,
          method: 'POST',
          body: {
            data: body,
          },
        };
      },
    }),

    updateAccount: builder.mutation<
      IUpdateAccountResponse,
      { id: number; data: Partial<ICreateAccountPayload> }
    >({
      query: ({ id, data }) => ({
        url: `accounts/${id}`,
        method: 'PUT',
        body: { data },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMyProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} = strapi;
