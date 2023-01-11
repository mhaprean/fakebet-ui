import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

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

export const iguDetaApi = createApi({
  reducerPath: 'iguDetaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tan-crowded-pangolin.cyclic.app/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = 'aaaaa'; //state.auth.token;
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
  }),
});

export const {
  useGetMyProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation
} = iguDetaApi;

export default iguDetaApi;