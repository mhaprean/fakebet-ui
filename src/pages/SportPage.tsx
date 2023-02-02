import { Button, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlexBetween from '../components/atoms/FlexBetween';
import PagePagination from '../components/atoms/PagePagination';
import LeagueHeader from '../components/league/LeagueHeader';
import SportPageLoading from '../components/loaders/SportPageLoading';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { igubetSports } from '../helpers/igubetSports';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const SportPage = () => {
  const { sport } = useParams();

  const [page, setPage] = useState(1);

  const iguSport = igubetSports.find((sp) => sp.key === sport);

  const dates = timeFormatService.getStartEnd(0);

  useEffect(() => {
    setPage(1);
  }, [sport]);

  const {
    data: matchListResponse,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetIguSportMatchesQuery({
    sport_key: sport,
    start_from: dates.start,
    start_to: dates.end,
    page: page,
  });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Sports',
      to: `/sports`,
    },
    {
      name: iguSport?.name,
      to: '',
    },
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <PagePagination
        total={matchListResponse?.pagination.total || 0}
        totalPages={matchListResponse?.pagination.last_page || 1}
        currentPage={page}
        onPageChange={setPage}
      />

      {isSuccess &&
        !isFetching &&
        matchListResponse.data.map((match, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            matchListResponse.data[idx].tournament.id !== matchListResponse.data[idx - 1].tournament.id ? (
              <LeagueHeader tournament={matchListResponse.data[idx].tournament} />
            ) : null}

            <Match match={match} />
          </React.Fragment>
        ))}

      {isFetching && <SportPageLoading />}
    </div>
  );
};

export default SportPage;
