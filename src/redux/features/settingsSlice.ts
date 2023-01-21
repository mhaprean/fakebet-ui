import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStrapiAccount } from './strapiApi';

interface SettingsState {
  language: string;
  themeName: string;
  accountInfo: IStrapiAccount | null;
}

const initialState: SettingsState = {
  language: 'en',
  themeName: 'dark',
  accountInfo: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<{ language: string }>) => {
      state.language = action.payload.language;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.themeName = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
