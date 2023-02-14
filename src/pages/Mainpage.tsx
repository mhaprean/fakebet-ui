import { Masonry } from '@mui/lab';
import { Box, Pagination, Typography } from '@mui/material';
import qs from 'qs';
import { useState } from 'react';
import MatchMain from '../components/match/MatchMain';
import { useGetFilteredMatchesQuery } from '../redux/features/strapiApi';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../components/atoms/DropdownList';
import PagePagination from '../components/atoms/PagePagination';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import MatchMainListLoading from '../components/loaders/MatchMainListLoading';

const Mainpage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [sportFilter, setSportFilter] = useState('all');
  const [gamesFilter, setGamesFilter] = useState('all');

  const filters: any = {};

  if (gamesFilter !== 'all') {
    const isValidated = gamesFilter === 'upcoming' ? false : true;
    filters.is_validated = { $eq: isValidated };
  }

  const matchListQuery = qs.stringify(
    {
      sort: ['validation_date:desc'],
      filters: filters,

      populate: '*',
      // fields: ['title'],
      pagination: {
        pageSize: parseInt(perPage),
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
      name: 'Latest Tips',
      to: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <Box className="Filters" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <FilterListIcon />

        <DropdownList
          value={gamesFilter}
          onChange={(newValue: string) => {
            setGamesFilter(newValue);
            setPage(1);
          }}
          items={[
            { value: 'all', label: 'All Matches' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'finished', label: 'Finished' },
          ]}
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

        {/* <DropdownList
          value={sportFilter}
          onChange={(newValue: string) => {
            setSportFilter(newValue);
            setPage(1);
          }}
          items={[
            { value: 'all', label: 'All Sports' },
            { value: 'soccer', label: 'Football' },
            { value: 'basketball', label: 'Basketball' },
            { value: 'ice-hockey', label: 'Ice Hockey' },
            { value: 'tennis', label: 'Tennis' },
            { value: 'handball', label: 'Handball' },
          ]}
        /> */}
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
    </div>
  );
};

export default Mainpage;
