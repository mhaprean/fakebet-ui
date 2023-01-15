import { Link, useParams } from 'react-router-dom';
import { useGetIguTournamentsQuery } from '../../redux/features/igubetApi';

const IgubetTournament = () => {
  const { id } = useParams();

  const { data: tournamentsRes, isLoading } = useGetIguTournamentsQuery({ category_id: id || 0 }, { skip: !id });

  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        tournamentsRes &&
        tournamentsRes.data.map((tournament) => (
          <div key={tournament.id}>
            <Link to={`/igubet/leagues/${tournament.id}`}>
              {tournament.name} ({tournament.id})
            </Link>
          </div>
        ))}
    </div>
  );
};

export default IgubetTournament;
