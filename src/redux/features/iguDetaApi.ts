import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IIgubetMarket } from './igubetTypes';

export interface IDetaUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  imageThumb?: string;
  role: string;
}

interface ILoginResponse {
  access_token: string;
}

export interface IIguDetaMatch {
  key: string;
  igu_id: number;
  start_time: string;
  home_team: string;
  away_team: string;
  tournament_id: number;
  tournament_name: string;
  category_id: number;
  category_name: string;
  markets: IIgubetMarket[];
}

interface IAddMatchesResponse {

}

export const iguDetaApi = createApi({
  reducerPath: 'iguDetaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tan-crowded-pangolin.cyclic.app/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.iguDetaAuth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query<IDetaUser, any>({
      query: () => 'auth/profile',
    }),
    loginUser: builder.mutation<ILoginResponse, { data: Partial<IDetaUser> }>({
      query: ({ data }) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation<IDetaUser, { data: Partial<IDetaUser> }>({
      query: ({ data }) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    addMatches: builder.mutation<IAddMatchesResponse, { matches: IIguDetaMatch[] }>({
      query: (data) => ({
        url: 'matches/addmany',
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useGetMyProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useAddMatchesMutation,
} = iguDetaApi;

export default iguDetaApi;