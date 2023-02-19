import { Button, Paper, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames';
import { IIgubetMarket, IIgubetMatch, IOutcome } from '../../redux/features/igubetTypes';
import BetslipMarketOutcome from '../betslip/BetslipMarketOutcome';
import MarketOutcome from './MarketOutcome';

interface IPropsMarketOutcomes {
  match: IIgubetMatch;
  market: IIgubetMarket;
}

const StyledMarketOutcomes = styled(Paper)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  margin-bottom: 20px;

  .MarketOutcome {
    flex-basis: 40%;
  }

  &.is1x2 {
    .MarketOutcome {
      flex-basis: 30%;
    }
  }
`;

const MarketOutcomes = ({ match, market }: IPropsMarketOutcomes) => {
  return (
    <StyledMarketOutcomes
      className={classNames('MarketOutcomes', { is1x2: [4568, 4761].includes(market.id) })}
      square
      variant="outlined"
    >
      {market.outcomes.map((outcome, idx) => (
        <BetslipMarketOutcome key={idx} outcome={outcome} match={match} market={market} />
      ))}
    </StyledMarketOutcomes>
  );
};

export default MarketOutcomes;
