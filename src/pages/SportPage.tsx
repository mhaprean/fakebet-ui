import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DayHeader from '../components/league/DayHeader';
import LeagueHeader from '../components/league/LeagueHeader';
import Match from '../components/match/Match';
import { igubetSports } from '../helpers/igubetSports';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const SportPage = () => {
  const { sport } = useParams();

  const iguSport = igubetSports.find((sp) => sp.key === sport);

  const dates = timeFormatService.getStartEnd();

  const { data: matchListResponse, isSuccess, isFetching } = useGetIguSportMatchesQuery({
    sport_key: sport,
    start_from: dates.start,
    start_to: dates.end,
  });
  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Upcoming {iguSport?.name} games
        </Typography>
      </div>
      {isFetching && <div>Is loading...</div>}
      {isSuccess && !isFetching && 
        matchListResponse.data.map((match, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            matchListResponse.data[idx].tournament.id !== matchListResponse.data[idx - 1].tournament.id ? (
              <LeagueHeader tournament={matchListResponse.data[idx].tournament} />
            ) : null}

            <div className="match">
              <Match match={match} />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default SportPage;
