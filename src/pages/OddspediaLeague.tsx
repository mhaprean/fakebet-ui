import { useParams } from 'react-router-dom';
import { useGetLeagueInfoQuery } from '../redux/features/oddspediaApi';

const OddspediaLeague = () => {
  const { sport, category, league } = useParams();

  const { data: leagueInfoRes, isLoading } = useGetLeagueInfoQuery(
    {
      category: category || '',
      league: league || '',
      sport: sport || '',
    },
    { skip: !league || !category || !sport }
  );

  return (
    <div>
      OddspediaLeague
      <h2>sport: {sport}</h2>
      <h2>category: {category}</h2>
      <h2>league: {league}</h2>

      {!isLoading && leagueInfoRes && leagueInfoRes.data.current_round}
    </div>
  );
};

export default OddspediaLeague;
