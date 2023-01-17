import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DayHeader from '../components/league/DayHeader';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { useGetIguMatchesQuery, useGetIguMatchesResultsQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const LeaguePage = () => {
  const { sport, category_id, category_slug, league_id, league_slug } = useParams();

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguMatchesQuery(
    {
      tournament_id: league_id,
      sport_key: sport
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
      sport_key: sport
    },
    { skip: !league_id }
  );

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },

    // {
    //   name: 'league name here',
    //   to: '',
    // },
  ];

  if (matchListResponse?.data && matchListResponse.data.length > 0) {
    breadcrumbsArray.push({
      name: matchListResponse.data[0].tournament.sport.name,
      to: `/sports/${matchListResponse.data[0].tournament.sport.key}`,
    });

    breadcrumbsArray.push({
      name: matchListResponse.data[0].tournament.category.name,
      to: `/sports/${matchListResponse.data[0].tournament.sport.key}/${matchListResponse.data[0].tournament.category.id}/${matchListResponse.data[0].tournament.category.slug}`,
    });
    breadcrumbsArray.push({
      name: `${matchListResponse.data[0].tournament.name}`,
      to: '',
    });
  }

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
      {isMatchListLoading && <div>is loading...</div>}
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
