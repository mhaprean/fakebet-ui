import { Box, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetIguSportMatchesQuery } from '../../redux/features/igubetApi';
import { IIgubetSport } from '../../redux/features/igubetTypes';
import { timeFormatService } from '../../services/timeFormaterService';
import SportPageLoading from '../loaders/SportPageLoading';
import MatchList from '../match/MatchList';
import SportTitle from './SportTitle';

interface IPropsSportGroup {
  sport: IIgubetSport;
  soccerLimit?: number;
  sportLimit?: number;
}

const SportGroup = ({ sport, soccerLimit = 20, sportLimit = 10 }: IPropsSportGroup) => {
  const dates = timeFormatService.getStartEnd(3);

  // this is for homepage and sports page
  // we fetch only the first 10 games from each sport that we support
  const {
    data: matchListResponse,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetIguSportMatchesQuery({
    limit: sport.key === 'soccer' ? soccerLimit : sportLimit,
    sport_key: sport.key,
    start_from: dates.start,
    start_to: dates.end,
    page: 1,
  });

  return (
    <div>
      {isFetching && <SportPageLoading withSportName />}
      {isSuccess && !isFetching && matchListResponse.data.length > 0 && (
        <React.Fragment>
          <SportTitle sportName={sport.name} sportSlug={sport.key} />
          <MatchList matches={matchListResponse.data} />
          <Box sx={{ marginTop: '10px', marginBottom: '50px' }}>
            <Link to={`/offer`}>
              <Button sx={{ textTransform: 'initial' }}>Show more</Button>
            </Link>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
};

export default SportGroup;
