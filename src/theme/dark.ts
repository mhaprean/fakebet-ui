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
});

export default darkTheme;
