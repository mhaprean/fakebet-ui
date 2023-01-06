import { Link, useParams } from 'react-router-dom';
import { useGetLeagueInfoQuery, useGetMatchListQuery } from '../redux/features/oddspediaApi';

const LeaguePage = () => {
  const { sport, category, league } = useParams();

  const { data: leagueInfoRes, isLoading } = useGetLeagueInfoQuery(
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
      endDate: '2022-12-25T21:59:59Z',
      sport: sport,
      popularLeaguesOnly: 0,
      category: category,
      league: league,
    },
    { skip: !league }
  );

  return (
    <div>
      LeaguePage
      {isMatchListSucces && matchListResponse.data.matchList.map((match, idx) => <div key={idx} className='match'>
      <Link to={`/sports/${sport}/event/${match.uri.split('-').pop()}`}>
        {match.ht} - {match.at}
      </Link>
      </div>)}
    </div>
  );
};

export default LeaguePage;
