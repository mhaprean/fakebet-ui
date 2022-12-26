import { Link, useParams } from 'react-router-dom';
import { useGetMatchesQuery } from '../redux/features/igubetApi';

const IgubetLeague = () => {
  const { id } = useParams();

  const { data: matchesRes, isSuccess } = useGetMatchesQuery(
    { tournament_id: id, limit: 100 },
    { skip: !id }
  );
  return (
    <div>
      IgubetLeague
      {isSuccess &&
        matchesRes.data.map((match) => (
          <div key={match.id}>
            <Link
              to={`/igubet/${match.tournament.sport.key}/${match.tournament.category.slug}/${match.tournament.slug}/match/${match.id}`}
            >
              {match.competitors.home.name} - {match.competitors.away.name}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default IgubetLeague;
