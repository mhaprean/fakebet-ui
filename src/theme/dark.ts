import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    divider: '#6f7f90',
    background: {
      paper: '#323f4b',
      default: '#1f2933',
    },
    primary: {
      main: '#a7f0cd',
    },
    secondary: {
      main: '#e0777c',
    },
    text: {
      primary: '#feffff', // '#e5e7eb' 
      secondary: '#9aa5b1', // #5c6794
      
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
    main: '#323f4b', // '#3e4b57', // 1e263b
    dark: '#3e4b57', // 10141a
    light: '#3e4b57',
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
