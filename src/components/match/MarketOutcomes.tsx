import { Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames';
import { IOutcome } from '../../redux/features/igubetTypes';
import MarketOutcome from './MarketOutcome';

interface IPropsMarketOutcomes {
  outcomes: IOutcome[];
}

const StyledMarketOutcomes = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const MarketOutcomes = ({ outcomes }: IPropsMarketOutcomes) => {
  return (
    <StyledMarketOutcomes className="MarketOutcomes">
      {outcomes.map((outcome, idx) => (
        <MarketOutcome key={idx} outcome={outcome} />
      ))}
    </StyledMarketOutcomes>
  );
};

export default MarketOutcomes;
