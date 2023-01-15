import React from 'react';
import { Link } from 'react-router-dom';
import { useGetIguSportsQuery } from '../../redux/features/igubetApi';

const IgubetSports = () => {
  const { data: sportsResponse, isLoading } = useGetIguSportsQuery({});
  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        sportsResponse &&
        sportsResponse.data.map((sport) => (
          <div key={sport.id}>
            <Link to={`/igubet/sports/${sport.id}/categories`}>{sport.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default IgubetSports;
