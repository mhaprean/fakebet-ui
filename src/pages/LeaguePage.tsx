import { Link, useParams } from 'react-router-dom';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { useGetIguMatchesQuery, useGetIguMatchesResultsQuery } from '../redux/features/igubetApi';

const LeaguePage = () => {
  const { sport, category, league_id, league_slug } = useParams();

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguMatchesQuery(
    {
      tournament_id: league_id,
    },
    { skip: !league_id }
  );

  const {
    data: matchListResultResponse,
    error: matchListResultError,
    isFetching: isMatchListResultLoading,
    isSuccess: isMatchListResultSucces,
  } = useGetIguMatchesResultsQuery(
    {
      tournament_id: league_id,
    },
    { skip: !league_id }
  );

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    // {
    //   name: leagueInfo?.data.sport_name,
    //   to: `/sports/${leagueInfo?.data.sport_slug}`,
    // },
    // {
    //   name: leagueInfo?.data.category_name,
    //   to: `/sports/${leagueInfo?.data.sport_slug}/${leagueInfo?.data.category_slug}`,
    // },
    // {
    //   name: leagueInfo?.data.league_name,
    //   to: '',
    // },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
      {isMatchListSucces &&
        <>
        <div>upcoming:</div>
        {matchListResponse.data.map((match, idx) => (
          <div key={idx} className="match">
            <Match match={match} />
          </div>
        ))}
        </>}

      {isMatchListResultSucces && (
        <>
        <div>results: </div>
          {matchListResultResponse.data.map((match, idx) => (
            <div key={idx} className="match">
              <Match match={match} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LeaguePage;
