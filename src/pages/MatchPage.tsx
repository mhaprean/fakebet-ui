import { useParams } from 'react-router-dom';
import Market from '../components/match/Market';
import MatchPageHeader from '../components/match/MatchPageHeader';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetIguDetaMatchMarketsQuery } from '../redux/features/iguDetaApi';
import { useGetMatchInfoQuery } from '../redux/features/oddspediaApi';

const MatchPage = () => {
  const { event } = useParams();

  const { data: matchInfoRes, isSuccess: isMatchInfoSucces } = useGetMatchInfoQuery(
    { matchKey: event || 1 },
    { refetchOnMountOrArgChange: true }
  );

  const { data: matchIguDetaRes, isSuccess: isIguDetaSucces } = useGetIguDetaMatchMarketsQuery(
    { matchId: matchInfoRes?.data?.sr_id || 0 },
    { skip: !isMatchInfoSucces }
  );

  const breadcrumbsArray: IBreadcrumb[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: matchInfoRes?.data.sport_name,
      to: `/sports/${matchInfoRes?.data.sport_slug}`,
    },
    {
      name: matchInfoRes?.data.category_name,
      to: `/sports/${matchInfoRes?.data.sport_slug}/${matchInfoRes?.data.category_slug}`,
    },
    {
      name: matchInfoRes?.data.league_name,
      to: `/sports/${matchInfoRes?.data.sport_slug}/${matchInfoRes?.data.category_slug}/${matchInfoRes?.data.league_slug}`,
    },
    {
      name: `${matchInfoRes?.data.ht_abbr} - ${matchInfoRes?.data.at_abbr}`,
      to: '',
    },
  ];

  return (
    <div>
      {isMatchInfoSucces && (
        <>
          <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

          <MatchPageHeader match={matchInfoRes?.data} />
          <div>
            {matchInfoRes.data.ht} {matchInfoRes.data.at}
          </div>
          <div>
            {matchIguDetaRes?.match.markets.map((market, idx) => (
              <Market key={idx} market={market} open={idx < 5} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MatchPage;
