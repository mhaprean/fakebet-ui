import { useParams } from 'react-router-dom';
import MatchPageHeader from '../components/match/MatchPageHeader';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetMatchInfoQuery } from '../redux/features/oddspediaApi';

const MatchPage = () => {
  const { event } = useParams();

  const { data: matchInfoRes, isSuccess: isMatchInfoSucces } = useGetMatchInfoQuery(
    { matchKey: event || 1 },
    { refetchOnMountOrArgChange: true }
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
        </>
      )}
    </div>
  );
};

export default MatchPage;
