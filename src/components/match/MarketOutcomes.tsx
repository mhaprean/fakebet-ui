import { Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames';
import { IOutcome } from '../../redux/features/igubetTypes';

interface IPropsMarketOutcomes {
  outcomes: IOutcome[];
}

const StyledMarketOutcomes = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;

  .outcome {
    display: flex;
    justify-content: space-between;
    flex-basis: 30%;
    flex-grow: 1;
    min-width: 130px;
    background: ${(props) => props.theme.palette.background.default};
    border-radius: 5px;
    text-transform: unset;
    border: 1px solid ${(props) => props.theme.palette.divider};

    &.winner {
      background: ${(props) => alpha(props.theme.palette.primary.main, 0.2)};
    }

    &.selected {
      background: ${(props) => props.theme.palette.info.light};
    }

    .outcome-name {
      color: ${(props) => props.theme.palette.text.secondary};
    }
    .outcome-value {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

const MarketOutcomes = ({ outcomes }: IPropsMarketOutcomes) => {


  const onSelect = (outcome: IOutcome) => {

  }
  
  return (
    <StyledMarketOutcomes className="MarketOutcomes">
      {outcomes.map((outcome) => (
        <Button
          className={classNames('outcome', {
            winner: outcome.is_winner,
            selected: false,
          })}
          key={outcome.id}
          onClick={() => onSelect(outcome)}
        >
          <Typography className="outcome-name" variant="body2">
            {outcome.formated_name}
            {/* {outcome.id} */}
          </Typography>
          <Typography className="outcome-value" variant="body2">
            {outcome.formated_value}
          </Typography>
        </Button>
      ))}
    </StyledMarketOutcomes>
  );
};

export default MarketOutcomes;
