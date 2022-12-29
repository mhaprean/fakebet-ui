import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Market from '../components/match/Market';
import { useGetMatchMarketsQuery } from '../redux/features/igubetApi';
import { IIgubetMarket } from '../redux/features/igubetTypes';

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

  const filterMarkets = (markets: IIgubetMarket[]) => {
    return markets
      .filter((market, idx) => market.market_groups.includes(activeMarket))
      .map((market, idx) => <Market key={idx} market={market} />);
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
      <div className="content">{!isLoading && matchMarketsRes && filterMarkets(matchMarketsRes.data)}</div>
    </StyledMatch>
  );
};

export default IgubetMatch;
