import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h4">welcome to fake bet admin</Typography>
      </div>
    </ThemeProvider>
  );
};

export default App;
