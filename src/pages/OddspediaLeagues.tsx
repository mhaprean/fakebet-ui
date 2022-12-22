import { useParams } from 'react-router-dom';
import { useGetLeaguesQuery } from '../redux/features/oddspediaApi';

const OddspediaLeagues = () => {
  const { id } = useParams();

  const { data: leaguesRes, isLoading } = useGetLeaguesQuery({ category: id || 0 }, { skip: !id });

  return (
    <div>
      OddspediaLeagues
      {leaguesRes?.data.map((league) => (
        <div key={league.id}>{league.league_name}</div>
      ))}
    </div>
  );
};

export default OddspediaLeagues;
