import { useParams } from 'react-router-dom';
import { useGetMatchesQuery } from '../redux/features/igubetApi';

const IgubetLeague = () => {
  const { id } = useParams();

  const { data: matchesRes, isSuccess } = useGetMatchesQuery({ tournament_id: id, limit: 100 }, { skip: !id });
  return (
    <div>
      IgubetLeague
      {isSuccess &&
        matchesRes.data.map((match) => (
          <div key={match.id}>
            {match.competitors.home.name} - {match.competitors.away.name}
          </div>
        ))}
    </div>
  );
};

export default IgubetLeague;
