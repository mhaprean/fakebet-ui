import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  themeName: string;
}

const initialState: SettingsState = {
  language: 'en',
  themeName: 'dark',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<{ language: string }>) => {
      state.language = action.payload.language;
    },
    setAppTheme: (state, action: PayloadAction<string>) => {
      state.themeName = action.payload;
    },
  },
});

export const { setLanguage, setAppTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
