import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/404';
import CategoryPage from './pages/CategoryPage';
import Homepage from './pages/Homepage';
import LeaguePage from './pages/LeaguePage';
import MatchPage from './pages/MatchPage';
import SearchPage from './pages/SearchPage';
import SportPage from './pages/SportPage';
import TicketsPage from './pages/TicketsPage';
import { useAppSelector } from './redux/hooks';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

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

              <Route path="/sports/:sport" element={<SportPage />} />

              <Route path="/sports/:sport/:category_id/:category_slug" element={<CategoryPage />} />

              <Route path="/sports/:sport/:category_id/:category_slug/:league_id" element={<LeaguePage />} />

              <Route
                path="/sports/:sport/:category_id/:category_slug/:league_id/:league_slug"
                element={<LeaguePage />}
              />

              <Route path="/sports/:sport/league/:league_id/event/:event_id" element={<MatchPage />} />

              <Route path="/search" element={<SearchPage />} />

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
