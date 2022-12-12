import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<div>home</div>} />
              <Route path='/games' element={<div>games</div>} />
            </Route>
          </Routes>
          <Layout />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
