import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Market from '../../components/match/Market';
import { useGetMatchMarketsQuery } from '../../redux/features/igubetApi';
import { IIgubetMarket } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';
import { transformIgubetMarkets } from '../../services/igubetTransformer';
import { validateMarkets } from '../../services/igubetValidator';

const StyledMatch = styled('div')`
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

const IgubetMatch = () => {
  const { sport, category, tournament, id } = useParams();

  const { data: matchMarketsRes, isLoading } = useGetMatchMarketsQuery({ matchId: id || '' }, { skip: !id });

  const [activeMarket, setActiveMarket] = useState('top');

  const marketGroups: string[] = ['top', 'all', 'half', 'total', 'score', 'handicap', 'combo'];

  const changeMarket = (newMarket: string) => {
    setActiveMarket(newMarket);
  };

  const getfilteredMarkets = (markets: IIgubetMarket[]) => {
    const transformedMarkets = transformIgubetMarkets(markets);

    console.log(JSON.stringify(transformedMarkets));

    const oddspediaPeriods: IOddspediaMatchInfoPeriods = [
      { period_type: 'regular_period', period_number: 1, home: 2, away: 0, tiebreak: null },
      { period_type: 'regular_period', period_number: 2, home: 1, away: 1, tiebreak: null },
    ];

    const validatedMarkets = validateMarkets(transformedMarkets, oddspediaPeriods);

    return validatedMarkets
      .filter((market, idx) => market.market_groups.includes(activeMarket))
      .map((market, idx) => <Market key={idx} market={market} open={idx < 5} />);
  };

  return (
    <StyledMatch>
      <div className="chips">
        {marketGroups.map((group, idx) => (
          <Chip
            className={`chip ${group === activeMarket ? 'active' : ''}`}
            key={idx}
            label={group}
            onClick={() => changeMarket(group)}
          />
        ))}
      </div>
      <div className="content">
        {!isLoading && matchMarketsRes && getfilteredMarkets(matchMarketsRes.data)}
      </div>
    </StyledMatch>
  );
};

export default IgubetMatch;
