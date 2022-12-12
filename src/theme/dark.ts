import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
  },
  status: {
    danger: red[900],
  },
});

export default darkTheme;
