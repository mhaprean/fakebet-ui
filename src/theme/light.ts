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
  mixins: {
    toolbar: {
      minHeight: '50px',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Heebo',
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
