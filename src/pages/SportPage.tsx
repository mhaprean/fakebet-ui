import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DayHeader from '../components/league/DayHeader';
import Match from '../components/match/Match';
import { igubetSports } from '../helpers/igubetSports';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const SportPage = () => {
  const { sport } = useParams();

  const iguSport = igubetSports.find((sp) => sp.key === sport);

  const { data: matchListResponse, isSuccess } = useGetIguSportMatchesQuery({ sport_key: sport });
  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Upcoming {iguSport?.name} games
        </Typography>
      </div>
      {isSuccess &&
        matchListResponse.data.map((match, idx) => (
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
    </div>
  );
};

export default SportPage;
