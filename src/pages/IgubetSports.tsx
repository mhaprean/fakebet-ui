import React from 'react'
import { useGetSportsQuery } from '../redux/features/igubetApi';

const IgubetSports = () => {

  const {data: sportsResponse, isLoading} = useGetSportsQuery({});
  return (
    <div>

      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        sportsResponse &&
        sportsResponse.data.map((sport) => <div key={sport.id}>{sport.name}</div>)}
    </div>
  )
}

export default IgubetSports