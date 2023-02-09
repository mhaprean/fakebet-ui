import { Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useGetIguMatchMarketsQuery } from '../../redux/features/igubetApi';
import { IIgubetMarket, IIgubetMatch } from '../../redux/features/igubetTypes';
import { transformIgubetMarkets } from '../../services/igubetTransformer';
import MarketsSkeleton from '../loaders/MarketsSkeleton';
import Market from './Market';

interface IPropsMarketsTab {
  match: IIgubetMatch;
}

const StyledMarketsTab = styled('div')`
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
`;

const MarketsTab = ({ match }: IPropsMarketsTab) => {
  const [activeMarket, setActiveMarket] = useState('top');

  const marketGroups: string[] = ['top', 'all', 'half', 'total', 'score', 'handicap', 'combo'];

  const { data: matchMarketsRes, isLoading } = useGetIguMatchMarketsQuery(
    { matchId: match.id || '' },
    { skip: !match.id }
  );

  const getfilteredMarkets = (markets: IIgubetMarket[], match: IIgubetMatch) => {
    const transformedMarkets = transformIgubetMarkets(markets);

    const filteredMarkets = transformedMarkets.filter((market, idx) =>
      market.market_groups.includes(activeMarket)
    );

    return filteredMarkets.map((market, idx) => {
      return <Market key={idx} market={market} open={idx < 5} match={match} />;
    });
  };

  return (
    <StyledMarketsTab className="MarketsTab">
      {isLoading && <MarketsSkeleton />}

      {!isLoading && matchMarketsRes?.data.length === 0 && (
        <Typography variant="subtitle2">No data available.</Typography>
      )}

      {!isLoading && matchMarketsRes && matchMarketsRes.data.length > 0 && (
        <div>
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

          {getfilteredMarkets(matchMarketsRes.data, match)}
        </div>
      )}
    </StyledMarketsTab>
  );
};

export default MarketsTab;
