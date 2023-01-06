import { useParams } from 'react-router-dom';
import { useGetMatchInfoQuery } from '../redux/features/oddspediaApi';

const MatchPage = () => {
  const { event } = useParams();

  const { data: matchInfoRes, isSuccess: isMatchInfoSucces } = useGetMatchInfoQuery(
    { matchKey: event || 1 },
    { refetchOnMountOrArgChange: true }
  );
  return (
    <div>
      MatchPage
      {isMatchInfoSucces && <div>
        {matchInfoRes.data.ht} {matchInfoRes.data.at}
        </div>}
    </div>
  );
};

export default MatchPage;
