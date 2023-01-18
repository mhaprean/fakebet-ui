import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Market from '../components/match/Market';
import MatchPageHeader from '../components/match/MatchPageHeader';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetIguMatchesQuery, useGetIguMatchMarketsQuery } from '../redux/features/igubetApi';
import { IIgubetMarket, IIgubetMatch } from '../redux/features/igubetTypes';
import { useGetIguDetaMatchMarketsQuery } from '../redux/features/iguDetaApi';
import { useGetMatchInfoQuery } from '../redux/features/oddspediaApi';
import { transformIgubetMarkets } from '../services/igubetTransformer';
import { timeFormatService } from '../services/timeFormaterService';

const StyledMatchPage = styled('div')`
  max-width: 100%;
  .chips {
    display: flex;
    gap: 10px;
    overflow: auto;
    padding: 10px 0;

    .chip {
      &.active {
        background: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
  .content {
    max-width: 100%;
  }
`;

const MatchPage = () => {
  const { league_id, event_id, sport } = useParams();

  const [match, setMatch] = useState<IIgubetMatch | null>(null);

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

  // const { data: matchInfoRes, isSuccess: isMatchInfoSucces } = useGetMatchInfoQuery(
  //   { matchKey: event || 1 },
  //   { refetchOnMountOrArgChange: true }
  // );

  // TODO

  // fetch  https://lmt.fn.sportradar.com/common/ro/Etc:UTC/gismo/match_info/37776239

  // id is sport radar id, we have it on market request

  const { data: matchMarketsRes, isLoading } = useGetIguMatchMarketsQuery(
    { matchId: event_id || '' },
    { skip: !event_id }
  );

  const [activeMarket, setActiveMarket] = useState('top');

  const marketGroups: string[] = ['top', 'all', 'half', 'total', 'score', 'handicap', 'combo'];

  // const { data: matchIguDetaRes, isSuccess: isIguDetaSucces } = useGetIguDetaMatchMarketsQuery(
  //   { matchId: matchInfoRes?.data?.sr_id || 0 },
  //   { skip: !isMatchInfoSucces }
  // );

  // const breadcrumbsArray: IBreadcrumb[] = [
  //   {
  //     name: 'Home',
  //     to: '/',
  //   },
  //   {
  //     name: matchInfoRes?.data.sport_name,
  //     to: `/sports/${matchInfoRes?.data.sport_slug}`,
  //   },
  //   {
  //     name: matchInfoRes?.data.category_name,
  //     to: `/sports/${matchInfoRes?.data.sport_slug}/${matchInfoRes?.data.category_slug}`,
  //   },
  //   {
  //     name: matchInfoRes?.data.league_name,
  //     to: `/sports/${matchInfoRes?.data.sport_slug}/${matchInfoRes?.data.category_slug}/${matchInfoRes?.data.league_slug}`,
  //   },
  //   {
  //     name: `${matchInfoRes?.data.ht_abbr} - ${matchInfoRes?.data.at_abbr}`,
  //     to: '',
  //   },
  // ];

  const getfilteredMarkets = (markets: IIgubetMarket[], match: IIgubetMatch) => {
    const transformedMarkets = transformIgubetMarkets(markets);

    console.log(JSON.stringify(transformedMarkets));

    return transformedMarkets
      .filter((market, idx) => market.market_groups.includes(activeMarket))
      .map((market, idx) => <Market key={idx} market={market} open={idx < 5} match={match} />);
  };

  useEffect(() => {
    // matchListResponse.data.find((game) => game.id + '' === event_id) || null

    if (isMatchListSucces) {
      const currentMatch = matchListResponse.data.find((game) => game.id + '' === event_id);

      if (currentMatch) {
        setMatch(currentMatch);
      }
    }
  }, [isMatchListSucces, matchListResponse]);

  return (
    <StyledMatchPage className="MatchPage">
      {/* {isMatchListSucces && (
        <>
          <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

          <MatchPageHeader match={matchInfoRes?.data} />
          <div>
            {matchInfoRes.data.ht} {matchInfoRes.data.at}
          </div>
          <div>{timeFormatService.getMatchValidationDate(matchInfoRes.data.starttime)}</div>
          <div>
            {matchIguDetaRes?.match?.markets.map((market, idx) => (
              <Market key={idx} market={market} open={idx < 5} />
            ))}
          </div>
        </>
      )} */}

      {isMatchListSucces && <MatchPageHeader match={match} />}

      <>
        <div className="chips">
          {marketGroups.map((group, idx) => (
            <Chip
              className={`chip ${group === activeMarket ? 'active' : ''}`}
              key={idx}
              label={group}
              onClick={() => setActiveMarket(group)}
            />
          ))}
        </div>

        <div className="content">
          {!isLoading && matchMarketsRes && match && getfilteredMarkets(matchMarketsRes.data, match)}
        </div>
      </>
    </StyledMatchPage>
  );
};

export default MatchPage;
