import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDetaUser } from './iguDetaApi';

export interface IguDetaAuthState {
  isAuth: boolean;
  token: string;
  user: IDetaUser | null;
}

const initialState: IguDetaAuthState = {
  isAuth: false,
  token: '',
  user: null,
};

export const iguDetaAuthSlice = createSlice({
  name: 'iguDetaAuth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuthDeta: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setTokenDeta: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserDeta: (state, action: PayloadAction<IDetaUser | null>) => {
      state.user = action.payload;
    },
    logoutDeta: (state) => {
      state.isAuth = false;
      state.token = '';
      state.user = null;
    },
    loginDeta: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
  },
});

export const { setAuthDeta, setTokenDeta, setUserDeta, logoutDeta, loginDeta } = iguDetaAuthSlice.actions;

export default iguDetaAuthSlice.reducer;
