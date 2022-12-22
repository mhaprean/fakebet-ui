import { useParams } from 'react-router-dom';
import { useGetTournamentsQuery } from '../redux/features/igubetApi';

const IgubetTournament = () => {
  const { id } = useParams();

  const { data: tournamentsRes, isLoading } = useGetTournamentsQuery({ category_id: id || 0 }, { skip: !id });

  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        tournamentsRes &&
        tournamentsRes.data.map((tournament) => <div key={tournament.id}>{tournament.name}</div>)}
    </div>
  );
};

export default IgubetTournament;
