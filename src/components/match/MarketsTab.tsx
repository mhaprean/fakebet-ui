import { Chip } from '@mui/material';
import { useState } from 'react';
import { IIgubetMarket, IIgubetMatch } from '../../redux/features/igubetTypes';
import { transformIgubetMarkets } from '../../services/igubetTransformer';
import Market from './Market';

interface IPropsMarketsTab {
  match: IIgubetMatch;
  markets: IIgubetMarket[];
}

const MarketsTab = ({ match, markets }: IPropsMarketsTab) => {
  const [activeMarket, setActiveMarket] = useState('top');

  const marketGroups: string[] = ['top', 'all', 'half', 'total', 'score', 'handicap', 'combo'];

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
      {getfilteredMarkets(markets, match)}
    </div>
  );
};

export default MarketsTab;
