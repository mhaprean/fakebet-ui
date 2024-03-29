import { Masonry } from '@mui/lab';
import { Box, Chip, Typography } from '@mui/material';
import qs from 'qs';
import { useState } from 'react';
import MatchMain from '../components/match/MatchMain';
import { useGetFilteredMatchesQuery } from '../redux/features/strapiApi';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../components/atoms/DropdownList';
import PagePagination from '../components/atoms/PagePagination';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import MatchMainListLoading from '../components/loaders/MatchMainListLoading';
import { timeFormatService } from '../services/timeFormaterService';

const TipsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [gamesFilter, setGamesFilter] = useState('upcoming');

  const filters: any = {};

  const isValidated = gamesFilter === 'upcoming' ? false : true;
  filters.is_validated = { $eq: isValidated };

  if (!isValidated) {
    filters.start_time = { $gt: timeFormatService.roundToNextHour() };
  }

  const matchListQuery = qs.stringify(
    {
      sort: [gamesFilter === 'upcoming' ? 'validation_date:asc' : 'validation_date:desc'],
      filters: filters,
      populate: '*',
      pagination: {
        pageSize: parseInt(perPage),
        page: page,
      },
    },
    {
      encodeValuesOnly: true,
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
      name: 'Latest Tips',
      to: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <Box className="Filters" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <FilterListIcon />

        <Chip
          label="Upcoming"
          variant={gamesFilter === 'upcoming' ? 'filled' : 'outlined'}
          color={gamesFilter === 'upcoming' ? 'primary' : 'default'}
          onClick={() => setGamesFilter('upcoming')}
          size="medium"
        />
        <Chip
          label="Finished"
          variant={gamesFilter === 'finished' ? 'filled' : 'outlined'}
          color={gamesFilter === 'finished' ? 'primary' : 'default'}
          onClick={() => setGamesFilter('finished')}
          size="medium"
        />

        <DropdownList
          value={perPage}
          onChange={(newValue: string) => {
            setPerPage(newValue);
            setPage(1);
          }}
          items={[
            { value: '10', label: 'Per page: 10' },
            { value: '20', label: 'Per page: 20' },
            { value: '30', label: 'Per page: 30' },
          ]}
        />
      </Box>

      <PagePagination
        total={filteredMatches?.meta.pagination.total || 0}
        totalPages={filteredMatches?.meta.pagination.pageCount || 1}
        currentPage={page}
        onPageChange={setPage}
      />

      {isMatchesFetching && <MatchMainListLoading matchNr={10} />}

      {isMatchesError && <div>error fetching data</div>}

      {!isMatchesFetching && !isMatchesLoading && filteredMatches?.data && (
        <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
          {filteredMatches.data.map((match, idx) => (
            <MatchMain key={idx} match={match.attributes} />
          ))}
        </Masonry>
      )}

      {!isMatchesFetching && !isMatchesLoading && filteredMatches?.data.length === 0 && (
        <Typography variant="subtitle2" sx={{marginTop: '20px'}}>No tips available.</Typography>
      )}
    </div>
  );
};

export default TipsPage;
