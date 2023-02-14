import { useState } from 'react';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../components/atoms/DropdownList';
import { Box } from '@mui/material';
import qs from 'qs';
import PlayerList from '../components/player/PlayerList';
import PlayerListLoading from '../components/loaders/PlayerListLoading';
import { useGetFilteredAccountsQuery } from '../redux/features/strapiApi';
import PagePagination from '../components/atoms/PagePagination';

const PlayersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('10');

  const filters: any = {};

  const playerListQuery = qs.stringify(
    {
      sort: ['current_balance:desc', 'id:desc'],
      filters: filters,
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

      <Box className="Filters" sx={{ display: 'flex', alignItems: 'center' }}>
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

      <PagePagination
        total={filteredPlayersResponse?.meta.pagination.total || 0}
        totalPages={filteredPlayersResponse?.meta.pagination.pageCount || 1}
        currentPage={page}
        onPageChange={setPage}
      />

      {isFilteredPlayersFetching && <PlayerListLoading playersCount={parseInt(perPage)} />}

      {!isFilteredPlayersFetching && filteredPlayersResponse && (
        <PlayerList players={filteredPlayersResponse.data || []} />
      )}
    </div>
  );
};

export default PlayersPage;
