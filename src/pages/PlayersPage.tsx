import { useState } from 'react';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../components/atoms/DropdownList';
import { Box, Pagination, Typography } from '@mui/material';
import qs from 'qs';
import PlayerList from '../components/player/PlayerList';
import PlayerListLoading from '../components/loaders/PlayerListLoading';
import { useGetFilteredAccountsQuery } from '../redux/features/strapiApi';
import FlexBetween from '../components/atoms/FlexBetween';

const PlayersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('10');

  const filters: any = {};

  const playerListQuery = qs.stringify(
    {
      sort: ['current_balance:desc', 'id:desc'],
      filters: filters,
      // fields: ['username', 'id', 'current_balance', 'image', 'statistics'],
      populate: 'user',
      pagination: {
        pageSize: parseInt(perPage),
        page: page,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const { data: filteredPlayersResponse, isFetching: isFilteredPlayersFetching } =
    useGetFilteredAccountsQuery({
      queryString: playerListQuery,
    });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Players',
      to: ``,
    },
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <div className="Body">
        <Box className="Filters" sx={{ display: 'flex' }}>
          <FilterListIcon />

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

        <FlexBetween className="players-pagination">
          <Typography noWrap variant="body2">
            Total: {filteredPlayersResponse?.meta.pagination.total || '0'}
          </Typography>

          <Pagination
            count={filteredPlayersResponse?.meta.pagination.pageCount || 1}
            siblingCount={0}
            page={filteredPlayersResponse?.meta.pagination.page || 1}
            onChange={handlePageChange}
            color="primary"
          />
        </FlexBetween>

        {isFilteredPlayersFetching && <PlayerListLoading playersCount={parseInt(perPage)} />}

        {!isFilteredPlayersFetching && filteredPlayersResponse && (
          <PlayerList players={filteredPlayersResponse.data || []} />
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
