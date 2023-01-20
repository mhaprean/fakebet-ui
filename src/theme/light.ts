import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    background: {
      default: '#edf3f7',
    },
    primary: {
      main: '#10b981',
    },
    secondary: {
      main: '#fc4747',
    },
  },
  navigation: {
    main: '#1a3150',
    dark: '#1a3150',
    light: '#e3e9ee',
    text: '#fff',
    textSecondary: '#556a80',
  },
  mixins: {
    toolbar: {
      minHeight: '50px',
    },
  },
  typography: {

    fontFamily: '"Heebo", sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
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

export default lightTheme;
