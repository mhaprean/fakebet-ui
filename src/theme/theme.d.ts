import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    navigation: {
      main: string;
      dark: string;
      light: string;
      text: string;
      textSecondary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    navigation?: {
      main?: string;
      dark?: string;
      light?: string;
      text?: string;
      textSecondary?: string;
    };
  }
}