import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      // default: '#202020',
      paper: '#121212',

    },
  },
  status: {
    danger: red[900],
  },
  mixins: {
    toolbar: {
      minHeight: '50px',
    },
  },
  typography: {
    fontSize: 12,
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
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  },
});

export default darkTheme;
