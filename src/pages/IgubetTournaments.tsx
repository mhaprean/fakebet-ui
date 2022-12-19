import { useGetTournamentsQuery } from '../redux/features/igubetApi';

const IgubetTournament = () => {
  const { data: tournamentsRes, isLoading } = useGetTournamentsQuery({ category_id: 362 });
  return (
    <div>
      IgubetTournament
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        tournamentsRes &&
        tournamentsRes.data.map((tournament) => <div key={tournament.id}>{tournament.name}</div>)}
    </div>
  );
};

export default IgubetTournament;
