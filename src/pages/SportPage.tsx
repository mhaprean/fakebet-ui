import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DayHeader from '../components/league/DayHeader';
import LeagueHeader from '../components/league/LeagueHeader';
import Match from '../components/match/Match';
import { igubetSports } from '../helpers/igubetSports';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const SportPage = () => {
  const { sport } = useParams();

  const [page, setPage] = useState(1);

  const iguSport = igubetSports.find((sp) => sp.key === sport);

  const dates = timeFormatService.getStartEnd();


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
  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Upcoming {iguSport?.name} games
        </Typography>
      </div>
      {isSuccess &&
        !isLoading &&
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

      {isFetching && <div>Loading...</div>}
      {matchListResponse && !isFetching && matchListResponse.pagination.last_page > page && (
        <Button onClick={() => setPage(page + 1)} className="show-more" size="small" sx={{ marginTop: '20px' }}>
          Show more
        </Button>
      )}
    </div>
  );
};

export default SportPage;
