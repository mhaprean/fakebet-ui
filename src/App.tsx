import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IguWraper from './layouts/IguWraper';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/404';
import CategoryPage from './pages/CategoryPage';
import IIgubetCategories from './pages/igubet/IgubetCategories';
import IgubetHome from './pages/igubet/IgubetHome';
import IgubetLeague from './pages/igubet/IgubetLeague';
import IgubetMatch from './pages/igubet/IgubetMatch';
import IgubetSports from './pages/igubet/IgubetSports';
import IgubetTournament from './pages/igubet/IgubetTournaments';
import LeaguePage from './pages/LeaguePage';
import MatchPage from './pages/MatchPage';
import SearchPage from './pages/SearchPage';
import SportPage from './pages/SportPage';
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
            <Route
              path="/"
              element={<Layout isDarkMode={theme === 'dark'} onThemeChange={handleThemeChange} />}
            >
              <Route path="/" element={<div>dashboard</div>} />

              <Route path='/sports/:sport' element={<SportPage />} />

              <Route path="/sports/:sport/:category_id/:category_slug" element={<CategoryPage />} />

              <Route path="/sports/:sport/:category_id/:category_slug/:league_id" element={<LeaguePage />} />

              <Route path="/sports/:sport/:category_id/:category_slug/:league_id/:league_slug" element={<LeaguePage />} />

              <Route path="/sports/:sport/league/:league_id/event/:event_id" element={<MatchPage />} />

              <Route path="/search" element={<SearchPage />} />

              {/* <Route element={<IguWraper />}>
                <Route path="/igubet" element={<IgubetHome />} />
                <Route path="/igubet/sports" element={<IgubetSports />} />
                <Route path="/igubet/sports/:sport/categories" element={<IIgubetCategories />} />
                <Route path="/igubet/categories/:id" element={<IgubetTournament />} />

                <Route path="/igubet/leagues/:id" element={<IgubetLeague />} />
                <Route path="/igubet/:sport/:category/:tournament/match/:id" element={<IgubetMatch />} />
              </Route> */}

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
