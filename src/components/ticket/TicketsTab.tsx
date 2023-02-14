import { Typography } from '@mui/material';
import qs from 'qs';
import { useState } from 'react';
import { useGetTicketsQuery } from '../../redux/features/strapiApi';
import { useAppSelector } from '../../redux/hooks';
import PagePagination from '../atoms/PagePagination';
import TicketListLoading from '../loaders/TicketListLoading';
import TicketFilters from './TicketFilters';
import TicketList from './TicketList';

interface IPropsTicketsTab {
  userId?: number;
  matchId?: number;
}

const TicketsTab = ({ userId = 0, matchId = 0 }: IPropsTicketsTab) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [statusFilter, setStatusFilter] = useState('all');

  const filters: any = {};

  if (userId) {
    filters.user = userId;
  }
  if (matchId) {
    filters.matches = {
      igu_id: {
        $eq: matchId,
      },
    };
  }

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
          populate: {
            account: {
              fields: ['id'],
            },
          },
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

  return (
    <div>
      <TicketFilters
        status={statusFilter}
        onStatusChange={setStatusFilter}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />

      <PagePagination
        total={ticketsResponse?.meta.pagination.total || 0}
        totalPages={ticketsResponse?.meta.pagination.pageCount || 1}
        currentPage={page}
        onPageChange={setPage}
      />

      {isFetching && <TicketListLoading ticketsNr={12} />}
      {isSuccess && <TicketList tickets={ticketsResponse.data || []} />}
      {isSuccess && ticketsResponse.data.length === 0 && (
        <Typography variant="subtitle2">No tickets available.</Typography>
      )}

      {isTicketsError && (
        <Typography variant="subtitle2">There was an error fetching data. Try again later</Typography>
      )}
    </div>
  );
};

export default TicketsTab;
