import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout isDarkMode={theme === 'dark'} onThemeChange={handleThemeChange} />}>
              <Route path="/" element={<div>dashboard</div>} />
              <Route path="/games" element={<div>games</div>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
