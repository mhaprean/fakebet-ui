import { useParams } from 'react-router-dom';
import { useGetMatchMarketsQuery } from '../redux/features/igubetApi';

const IgubetMatch = () => {
  const { sport, category, tournament, id } = useParams();

  const { data: matchMarketsRes, isLoading } = useGetMatchMarketsQuery({ matchId: id || '' }, { skip: !id });

  return (
    <div>
      IgubetMatch: {id}
      {sport} - {category} - {tournament}

      <div>
        {!isLoading && matchMarketsRes && matchMarketsRes.data.map((market, idx) => <div key={idx}>
          {market.id} : {market.name}

        </div>)}
      </div>
    </div>
  );
};

export default IgubetMatch;
