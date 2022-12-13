import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
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
});

export default darkTheme;
