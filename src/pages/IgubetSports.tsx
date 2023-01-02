import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSportsQuery } from '../redux/features/igubetApi';

const IgubetSports = () => {
  const { data: sportsResponse, isLoading } = useGetSportsQuery({});
  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        sportsResponse &&
        sportsResponse.data.map((sport) => (
          <div key={sport.id}>
            <Link to={`/sports/${sport.id}/categories`}>{sport.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default IgubetSports;
