import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    background: {
      default: '#edf3f7',
    },
  },
  mixins: {
    toolbar: {
      minHeight: '50px',
    },
  },
});

export default lightTheme;
