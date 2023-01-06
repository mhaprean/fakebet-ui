import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFoundPage from './pages/404';
import CategoryPage from './pages/CategoryPage';
import IIgubetCategories from './pages/IgubetCategories';
import IgubetLeague from './pages/IgubetLeague';
import IgubetMatch from './pages/IgubetMatch';
import IgubetSports from './pages/IgubetSports';
import IgubetTournament from './pages/IgubetTournaments';
import LeaguePage from './pages/LeaguePage';
import MatchPage from './pages/MatchPage';
import OddspediaCategories from './pages/OddspediaCategories';
import OddspediaLeague from './pages/OddspediaLeague';
import OddspediaLeagues from './pages/OddspediaLeagues';
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

              <Route path="/sports/:sport/event/:event" element={<MatchPage />} />

              <Route path="/sports/:sport/:category" element={<CategoryPage />} />

              <Route path="/sports/:sport/:category/:league" element={<LeaguePage />} />

              <Route path="/oddspedia-categories" element={<OddspediaCategories />} />
              <Route path="/oddspedia-categories/:id" element={<OddspediaLeagues />} />
              <Route path="/oddspedia/:sport/:category/:league" element={<OddspediaLeague />} />
              <Route path="/games" element={<div>games</div>} />

              <Route path="/sports" element={<IgubetSports />} />
              <Route path="/sports/:sport/categories" element={<IIgubetCategories />} />
              <Route path="/igubet-categories/:id" element={<IgubetTournament />} />

              <Route path='/igubet-league/:id' element={<IgubetLeague />} />
              <Route path='/igubet/:sport/:category/:tournament/match/:id' element={<IgubetMatch />} />
              <Route path='*' element={<NotFoundPage />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
