import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IIgubetMarket, IIgubetMatch, IOutcome } from '../../redux/features/igubetTypes';
import MarketOutcomes from './MarketOutcomes';

const StyledMarket = styled('div')`
  .market-title {
    padding: 5px 10px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;

interface IMarketProps {
  market: IIgubetMarket;
  match: IIgubetMatch;
  open?: boolean;
}

const Market = ({ market, open = false, match }: IMarketProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const [selectedOutcome, setSelectedOutcome] = useState(0);

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  const selectOutcome = (id: number) => {
    setSelectedOutcome(id);
  };

  return (
    <StyledMarket className="Market">
      <Paper className="market-title" onClick={toggleExpanded} variant={'outlined'}>
        <Typography>
          {/* {market.id} */}# {market.formated_market_name}
          {/* {market.specifier} */}
        </Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Paper>
      <Collapse in={isOpen}>
        <MarketOutcomes match={match} market={market} />
      </Collapse>
    </StyledMarket>
  );
};

export default Market;
