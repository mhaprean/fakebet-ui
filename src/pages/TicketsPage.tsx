import { Masonry } from '@mui/lab';
import qs from 'qs';
import { useState } from 'react';

import Ticket from '../components/ticket/Ticket';
import { useGetTicketsQuery } from '../redux/features/strapiApi';
import { styled } from '@mui/material/styles';

import { FilterList as FilterListIcon } from '@mui/icons-material';

import FlexBetween from '../components/atoms/FlexBetween';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import DropdownList from '../components/atoms/DropdownList';
import { Pagination, Typography } from '@mui/material';
import TicketListLoading from '../components/loaders/TicketListLoading';

const StyledTicketPage = styled('div')`
  .filters,
  .pagination {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
`;

const TicketsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [stakeFilter, setStakeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filters: any = {};

  if (statusFilter !== 'all') {
    if (statusFilter === 'pending') {
      filters.is_validated = { $eq: false };
    }
    if (statusFilter === 'winning') {
      filters.is_winner = { $eq: true };
    }
    if (statusFilter === 'lost') {
      filters.is_winner = { $eq: false };
    }
  }

  const query = qs.stringify(
    {
      sort: ['id:desc', 'is_validated:asc'],
      filters: filters,
      populate: {
        user: {
          fields: ['username', 'email'],
        },
        bets: {
          fields: '*',
          populate: {
            match: {
              fields: ['total_score', 'period_score', 'tournament_name', 'category_name'],
            },
          },
        },
      },
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
    data: ticketsResponse,
    isLoading,
    isSuccess,
    isFetching,
    isError: isTicketsError,
  } = useGetTicketsQuery({ queryString: query });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Tickets',
      to: ``,
    },
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <StyledTicketPage>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <div className="filters">
        <FilterListIcon />

        <DropdownList
          value={statusFilter}
          onChange={(newValue: string) => {
            setStatusFilter(newValue);
            setPage(1);
          }}
          items={[
            { value: 'all', label: 'All Tickets' },
            { value: 'pending', label: 'Pending Tickets' },
            { value: 'winning', label: 'Winning Tickets' },
            { value: 'lost', label: 'Lost Tickets' },
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
          value={stakeFilter}
          onChange={(newValue: string) => {
            setStakeFilter(newValue);
            setPage(1);
          }}
          items={[
            { value: 'all', label: 'All Stakes' },
            { value: '50', label: '< 50' },
            { value: '100', label: '< 100' },
            { value: '500', label: '< 500' },
            { value: '1000', label: '< 1000' },
          ]}
        /> */}
      </div>
      <FlexBetween className="pagination">
        <Typography noWrap variant="body2">
          Total: {ticketsResponse?.meta.pagination.total}
        </Typography>

        <Pagination
          count={ticketsResponse?.meta.pagination.pageCount || 1}
          siblingCount={0}
          page={ticketsResponse?.meta.pagination.page || 1}
          onChange={handlePageChange}
          color="primary"
        />
      </FlexBetween>

      {isFetching && <TicketListLoading ticketsNr={12} />}

      <>
        {isSuccess && (
          <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
            {ticketsResponse.data.map((ticket, idx) => (
              <Ticket key={idx} ticket={ticket} />
            ))}
          </Masonry>
        )}
      </>

      {isTicketsError && <div>There was an error fetching data. Try again later</div>}
    </StyledTicketPage>
  );
};

export default TicketsPage;
