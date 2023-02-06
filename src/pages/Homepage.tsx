import { Masonry } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import qs from 'qs';
import { useState } from 'react';
import MatchMain from '../components/match/MatchMain';
import { useGetFilteredMatchesQuery } from '../redux/features/strapiApi';
import PagePagination from '../components/atoms/PagePagination';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import MatchMainListLoading from '../components/loaders/MatchMainListLoading';
import { timeFormatService } from '../services/timeFormaterService';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [page, setPage] = useState(1);

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
      sort: ['validation_date:desc'],
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

      {isMatchesFetching && (
        <>
          {' '}
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            Loading:
          </Typography>
          <MatchMainListLoading matchNr={10} />
        </>
      )}

      {isMatchesError && <div>error fetching data. refresh the page or try again later.</div>}

      {!isMatchesFetching && !isMatchesLoading && filteredMatches?.data && (
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            Latest tips from our users:
          </Typography>
          <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
            {filteredMatches.data.map((match, idx) => (
              <MatchMain key={idx} match={match.attributes} />
            ))}
          </Masonry>
          <Link to="/main">
            <Button variant="outlined">See all tips</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Homepage;
