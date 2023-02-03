import qs from 'qs';
import { useState } from 'react';
import { useGetTicketsQuery } from '../redux/features/strapiApi';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import TicketListLoading from '../components/loaders/TicketListLoading';
import TicketList from '../components/ticket/TicketList';
import { useAppSelector } from '../redux/hooks';
import PagePagination from '../components/atoms/PagePagination';
import TicketFilters from '../components/ticket/TicketFilters';

interface IPropsTicketsPage {
  myTickets?: boolean;
}

const TicketsPage = ({ myTickets = false }: IPropsTicketsPage) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [statusFilter, setStatusFilter] = useState('all');

  const authState = useAppSelector((rootState) => rootState.auth);

  const filters: any = {};

  if (myTickets && authState.isAuth) {
    filters.user = authState.user?.id;
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

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

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

      {isTicketsError && <div>There was an error fetching data. Try again later</div>}
    </div>
  );
};

export default TicketsPage;
