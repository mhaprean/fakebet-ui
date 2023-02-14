import { Masonry } from '@mui/lab';
import { Alert, Button, Collapse, IconButton, Typography } from '@mui/material';
import qs from 'qs';
import { useState } from 'react';
import MatchMain from '../components/match/MatchMain';
import { useGetFilteredMatchesQuery } from '../redux/features/strapiApi';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import MatchMainListLoading from '../components/loaders/MatchMainListLoading';
import { timeFormatService } from '../services/timeFormaterService';
import { Link } from 'react-router-dom';
import { igubetSports } from '../helpers/igubetSports';
import SportGroup from '../components/sport/SportGroup';
import CloseIcon from '@mui/icons-material/Close';

const Homepage = () => {
  const [page, setPage] = useState(1);

  const [hasError, setHasError] = useState(true);

  const dates = timeFormatService.getStartEnd(0);

  const filters: any = {
    start_time: {
      $gt: dates.start,
    },
    is_validated: {
      $eq: false,
    },
  };

  const matchListQuery = qs.stringify(
    {
      sort: ['validation_date:asc'],
      filters: filters,
      populate: '*',
      pagination: {
        pageSize: 20,
        page: page,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const {
    data: filteredMatches,
    isFetching: isMatchesFetching,
    isLoading: isMatchesLoading,
    isError: isMatchesError,
  } = useGetFilteredMatchesQuery({ queryString: matchListQuery });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Homepage',
      to: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      {igubetSports
        .filter((sport) => sport.key === 'soccer')
        .map((sport) => (
          <SportGroup sport={sport} key={sport.id} soccerLimit={50} />
        ))}

      {isMatchesFetching && (
        <>
          <Typography variant="subtitle1" sx={{ marginBottom: '20px' }}>
            Loading:
          </Typography>
          <MatchMainListLoading matchNr={10} />
        </>
      )}

      {isMatchesError && (
        <div>
          <Collapse in={hasError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setHasError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              error fetching data. refresh the page or try again later.
            </Alert>
          </Collapse>
        </div>
      )}

      {!isMatchesFetching && !isMatchesLoading && filteredMatches?.data && (
        <>
          <Typography variant="subtitle1" sx={{ marginBottom: '20px' }}>
            Latest tips from our users:
          </Typography>
          <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
            {filteredMatches.data.map((match, idx) => (
              <MatchMain key={idx} match={match.attributes} />
            ))}
          </Masonry>
          <Link to="/tips">
            <Button variant="outlined">See all tips</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Homepage;
