import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    divider: '#545963',
    background: {
      paper: '#2f353d',
      default: '#202328',
    },
    primary: {
      main: '#afbeff',
    },
    secondary: {
      main: '#f56642',
    },
    text: {
      primary: '#ffffff',
      secondary: '#dedede',
      disabled: '#56585b',
    },
    action: {
      selected: 'rgba(208, 218, 245, 0.16)',
      hover: 'rgba(208, 218, 245, 0.08)',
    },

    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
    },
    error: {
      main: '#e65853',
    },
  },
  navigation: {
    main: '#2d343d',
    dark: '#16181d',
    light: '#3f4855',
    text: '#fff',
    textSecondary: '#fcfeff',
  },
  mixins: {
    toolbar: {
      minHeight: '50px',
    },
  },
  typography: {
    fontFamily: '"Heebo", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: 35,
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 14,
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
    },
  },
});

export default darkTheme;
