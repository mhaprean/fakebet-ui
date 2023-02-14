import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';

import { useAppSelector } from './redux/hooks';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

const NotFoundPage = lazy(() => import('./pages/404'));
const PlayerPage = lazy(() => import('./pages/PlayerPage'));
const PlayersPage = lazy(() => import('./pages/PlayersPage'));
const MatchPage = lazy(() => import('./pages/MatchPage'));
const LeaguePage = lazy(() => import('./pages/LeaguePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Mainpage = lazy(() => import('./pages/Mainpage'));

const SearchPage = lazy(() => import('./pages/SearchPage'));
const SportPage = lazy(() => import('./pages/SportPage'));

const TicketsPage = lazy(() => import('./pages/TicketsPage'));

const App = () => {
  const themeName = useAppSelector((rootState) => rootState.settings.themeName);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={themeName === 'light' ? lightTheme : darkTheme}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/tips" element={<Mainpage />} />
              <Route path="/offer" element={<SportPage />} />
              <Route path="/offer/:category_id/:category_slug" element={<CategoryPage />} />
              <Route path="/offer/:category_id/:category_slug/:league_id" element={<LeaguePage />} />
              <Route
                path="/offer/:category_id/:category_slug/:league_id/:league_slug"
                element={<LeaguePage />}
              />
              <Route path="/offer/league/:league_id/event/:event_id" element={<MatchPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<PlayerPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/my-tickets" element={<TicketsPage myTickets />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
