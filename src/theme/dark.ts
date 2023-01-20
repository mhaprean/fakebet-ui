import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#212c47', // #2b395c
      default: '#10141f',

    },
    primary: {
      main: '#10b981',
    },
    secondary: {
      main: '#fc4747',
    },
    text: {
      primary: '#feffff',
      secondary: '#d2d4d4', // #5c6794
    },
    action: {
      selected: 'rgba(208, 218, 245, 0.16)',
      hover: 'rgba(208, 218, 245, 0.08)',
    }
  },
  navigation: {
    main: '#1e263b',
    dark: '#1e263b', // 10141a
    light: '#1e263b',
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
