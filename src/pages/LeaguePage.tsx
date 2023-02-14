import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DayHeader from '../components/league/DayHeader';
import LeaguePageLoading from '../components/loaders/LeaguePageLoading';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { useGetIguMatchesQuery, useGetIguMatchesResultsQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const LeaguePage = () => {
  const { category_id, category_slug, league_id, league_slug } = useParams();

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguMatchesQuery(
    {
      tournament_id: league_id,
      sport_key: 'soccer',
    },
    { skip: !league_id }
  );

  const {
    data: matchListResultResponse,
    error: matchListResultError,
    isFetching: isMatchListResultLoading,
    isSuccess: isMatchListResultSucces,
  } = useGetIguMatchesResultsQuery(
    {
      tournament_id: league_id,
      sport_key: 'soccer',
    },
    { skip: !league_id }
  );

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },

    {
      name: 'Offer',
      to: '/offer',
    },
  ];

  if (matchListResponse?.data && matchListResponse.data.length > 0) {
    breadcrumbsArray.push({
      name: matchListResponse.data[0].tournament.category.name,
      to: `/offer/${matchListResponse.data[0].tournament.category.id}/${matchListResponse.data[0].tournament.category.slug}`,
    });
    breadcrumbsArray.push({
      name: `${matchListResponse.data[0].tournament.name}`,
      to: '',
    });
  }

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
      {isMatchListLoading && <LeaguePageLoading />}
      {isMatchListSucces && !isMatchListLoading && (
        <>
          <div>
            <Typography variant="h5" sx={{ marginTop: '20px' }}>
              Upcoming games
            </Typography>
          </div>
          {matchListResponse.data.map((match, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 ||
              !timeFormatService.isSameDay(match.start_time, matchListResponse.data[idx - 1].start_time) ? (
                <DayHeader day={match.start_time} />
              ) : null}

              <div className="match">
                <Match match={match} />
              </div>
            </React.Fragment>
          ))}
        </>
      )}

      {isMatchListResultSucces && !isMatchListLoading && (
        <>
          <div>
            <Typography variant="h5" sx={{ marginTop: '20px' }}>
              Results:
            </Typography>
          </div>
          {matchListResultResponse.data.map((match, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 ||
              !timeFormatService.isSameDay(
                match.start_time,
                matchListResultResponse.data[idx - 1].start_time
              ) ? (
                <DayHeader day={match.start_time} />
              ) : null}

              <div className="match">
                <Match match={match} />
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default LeaguePage;
