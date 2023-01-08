import { Link, useParams } from 'react-router-dom';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { useGetLeagueInfoQuery, useGetMatchListQuery } from '../redux/features/oddspediaApi';

const LeaguePage = () => {
  const { sport, category, league } = useParams();

  const { data: leagueInfo, isLoading } = useGetLeagueInfoQuery(
    {
      category: category || '',
      league: league || '',
      sport: sport || '',
    },
    { skip: !league || !category || !sport }
  );

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetMatchListQuery(
    {
      startDate: '2022-12-18T22:00:00Z',
      endDate: '2023-12-25T21:59:59Z',
      sport: sport,
      popularLeaguesOnly: 0,
      category: category,
      league: league,
    },
    { skip: !league }
  );

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: leagueInfo?.data.sport_name,
      to: `/sports/${leagueInfo?.data.sport_slug}`,
    },
    {
      name: leagueInfo?.data.category_name,
      to: `/sports/${leagueInfo?.data.sport_slug}/${leagueInfo?.data.category_slug}`,
    },
    {
      name: leagueInfo?.data.league_name,
      to: '',
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
      {isMatchListSucces &&
        matchListResponse.data.matchList.map((match, idx) => (
          <div key={idx} className="match">
            <Link to={`/sports/${sport}/event/${match.uri.split('-').pop()}`}>

              <Match match={match} />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default LeaguePage;
