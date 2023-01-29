import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchPageLoading from '../components/loaders/MatchPageLoading';
import Market from '../components/match/Market';
import MarketOutcomes from '../components/match/MarketOutcomes';
import MatchPageHeader from '../components/match/MatchPageHeader';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetIguMatchesQuery, useGetIguMatchMarketsQuery } from '../redux/features/igubetApi';
import { IgubetMatchPeriods, IIgubetMarket, IIgubetMatch } from '../redux/features/igubetTypes';
import { transformIgubetMarkets } from '../services/igubetTransformer';
import { validateMarkets } from '../services/igubetValidator';
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
        color: ${(props) => props.theme.palette.primary.contrastText};
      }
    }
  }
  .content {
    max-width: 100%;
  }
`;

const MatchPage = () => {
  const { sport, league_id, event_id } = useParams();

  const [match, setMatch] = useState<IIgubetMatch | null>(null);

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguMatchesQuery(
    {
      tournament_id: league_id,
      sport_key: sport,
      limit: 50,
    },
    { skip: !league_id }
  );

  const { data: matchMarketsRes, isLoading } = useGetIguMatchMarketsQuery(
    { matchId: event_id || '' },
    { skip: !event_id }
  );

  const [activeMarket, setActiveMarket] = useState('top');

  const marketGroups: string[] = ['top', 'all', 'half', 'total', 'score', 'handicap', 'combo'];

  const breadcrumbsArray: IBreadcrumb[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: match?.tournament.sport.name,
      to: `/sports/${match?.tournament.sport.key}`,
    },
    {
      name: match?.tournament.category.name,
      to: `/sports/${match?.tournament.sport.key}/${match?.tournament.category.id}/${match?.tournament.category.slug}`,
    },
    {
      name: match?.tournament.name,
      to: `/sports/${match?.tournament.sport.key}/${match?.tournament.category.id}/${match?.tournament.category.slug}/${match?.tournament.id}/${match?.tournament.slug}`,
    },
    {
      name: `${match?.competitors.home.name} - ${match?.competitors.away.name}`,
      to: '',
    },
  ];

  const getfilteredMarkets = (markets: IIgubetMarket[], match: IIgubetMatch) => {
    const transformedMarkets = transformIgubetMarkets(markets);

    // const periods: IgubetMatchPeriods = [
    //   {
    //     home: 0,
    //     away: 0,
    //     period_key: 'match_status.6',
    //     period_name: '1st half',
    //     number: 1,
    //     type: 'regular',
    //   },
    //   {
    //     home: 0,
    //     away: 1,
    //     period_key: 'match_status.7',
    //     period_name: '2nd half',
    //     number: 2,
    //     type: 'regular',
    //   },
    // ];

    // const validatedMarkets = validateMarkets(transformedMarkets, periods);

    const filteredMarkets = transformedMarkets.filter((market, idx) =>
      market.market_groups.includes(activeMarket)
    );

    return filteredMarkets.map((market, idx) => {
      return <Market key={idx} market={market} open={idx < 5} match={match} />;
    });
  };

  useEffect(() => {
    if (isMatchListSucces) {
      const currentMatch = matchListResponse.data.find((game) => game.id + '' === event_id);

      if (currentMatch) {
        setMatch(currentMatch);
      }
    }
  }, [isMatchListSucces, matchListResponse]);

  return (
    <StyledMatchPage className="MatchPage">
      {match && <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />}

      {isMatchListLoading && <MatchPageLoading />}

      {isMatchListSucces && <MatchPageHeader match={match} />}

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
    </StyledMatchPage>
  );
};

export default MatchPage;
