import { useState } from 'react';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../components/atoms/DropdownList';
import { Pagination, Typography } from '@mui/material';
import { useGetUsersQuery } from '../redux/features/strapiApi';
import qs from 'qs';
import PlayerList from '../components/player/PlayerList';
import PlayerListLoading from '../components/loaders/PlayerListLoading';

const PlayersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('10');

  const filters: any = {};

  const playerListQuery = qs.stringify(
    {
      sort: ['current_balance:desc', 'id:desc'],
      filters: filters,
      // fields: ['username', 'id', 'current_balance', 'image', 'statistics'],
      pagination: {
        pageSize: parseInt(perPage),
        page: page,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const { data: filteredPlayers, isFetching: isFilteredPlayersFetching } = useGetUsersQuery({
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

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <div className="Body">
        <div className="Filters">
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
        </div>

        {/* <div className="Pagination">
            <Typography noWrap variant="body2">
              Total: {filteredPlayers?.meta.pagination.total || '0'}
            </Typography>

            <Pagination
              count={filteredPlayers?.meta.pagination.pageCount || 1}
              siblingCount={0}
              page={filteredPlayers?.meta.pagination.page || 1}
              onChange={handleChange}
              color="primary"
            />
          </div> */}

        {isFilteredPlayersFetching && <PlayerListLoading playersCount={parseInt(perPage)} />}

        {!isFilteredPlayersFetching && filteredPlayers && <PlayerList players={filteredPlayers || []} />}
      </div>
    </div>
  );
};

export default PlayersPage;
