import { Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames';
import { IIgubetMarket, IIgubetMatch, IOutcome } from '../../redux/features/igubetTypes';
import BetslipMarketOutcome from '../betslip/BetslipMarketOutcome';
import MarketOutcome from './MarketOutcome';

interface IPropsMarketOutcomes {
  match: IIgubetMatch;
  market: IIgubetMarket;
}

const StyledMarketOutcomes = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const MarketOutcomes = ({ match, market }: IPropsMarketOutcomes) => {
  return (
    <StyledMarketOutcomes className="MarketOutcomes">
      {market.outcomes.map((outcome, idx) => (
        <BetslipMarketOutcome key={idx} outcome={outcome} match={match} market={market} />
      ))}
    </StyledMarketOutcomes>
  );
};

export default MarketOutcomes;
