import { Link, useParams } from 'react-router-dom';
import { useGetLeaguesQuery } from '../redux/features/oddspediaApi';

const OddspediaLeagues = () => {
  const { id } = useParams();

  const { data: leaguesRes, isLoading } = useGetLeaguesQuery({ category: id || 0 }, { skip: !id });

  return (
    <div>
      OddspediaLeagues
      {leaguesRes?.data.map((league) => (
        <div key={league.id}>
          <Link to={`/oddspedia/${league.sport_slug}/${league.category_slug}/${league.league_slug}`}>{league.league_name}</Link>
        </div>
      ))}
    </div>
  );
};

export default OddspediaLeagues;
