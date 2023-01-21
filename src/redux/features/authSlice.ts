import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStrapiUser } from './strapiApi';

type AuthState = {
  user: IStrapiUser | null;
  token: string | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ user: IStrapiUser; access_token: string }>) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.access_token;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;

export default authSlice.reducer;
