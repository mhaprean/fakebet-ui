import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
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

  const excludeIds = [
    75, 89, 222, 269, 284, 317, 359, 369, 379, 535, 542, 626, 631, 669, 815, 3910, 3980, 3981, 4076, 4085,
    4144, 4164, 4197, 4238, 4239, 4240, 4241, 4312, 4457, 4643, 4471, 4742, 4769, 4773, 4849, 4896, 4929, 5034,
    23328, 23347, 23362, 23365, 23366, 23368, 23369, 23370, 23371, 23575, 23372, 23619, 23995, 23972,
  ];

  const allowedSpecifiers = [
    'total=0.5',
    'total=1.5',
    'total=2.5',
    'total=3.5',
    'total=4.5',
    'total=5.5',
    'hcp=-0.5',
    'hcp=-1.5',
    'hcp=-2.5',
    'hcp=-3.5',
    'hcp=1:0',
    'hcp=0:1',
    'hcp=2:0',
    'hcp=0:2',
    'hcp=0:3',
    'hcp=3:0',
    'score=0:0',
    '',
  ];

  const getfilteredMarkets = (markets: IIgubetMarket[]) => {
    return markets
      .filter((market) => !excludeIds.includes(market.id))
      .filter((market) => allowedSpecifiers.includes(market.specifier))
      .filter((market, idx) => market.market_groups.includes(activeMarket))
      .map((market, idx) => <Market key={idx} market={market} />);
  };

  if (matchMarketsRes?.data) {
    const mar = matchMarketsRes.data.filter((market) => market.specifier !== '');
  }

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
