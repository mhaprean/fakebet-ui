import { Button, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { IOutcome } from '../../redux/features/igubetTypes';

const StyledMarketOutcome = styled(Button)`
  display: flex;
  justify-content: space-between;
  flex-basis: 30%;
  flex-grow: 1;
  min-width: 70px;
  background: ${(props) => props.theme.palette.background.default};
  border-radius: 5px;
  text-transform: unset;
  border: 1px solid ${(props) => props.theme.palette.divider};

  &:hover {
    background: ${(props) => alpha(props.theme.palette.secondary.main, 0.2)};
  }

  &.winner {
    background: ${(props) => alpha(props.theme.palette.success.main, 0.2)};
  }

  &.selected {
    background: ${(props) => alpha(props.theme.palette.secondary.main, 0.8)};
  }

  .outcome-name {
    color: ${(props) => props.theme.palette.text.secondary};
  }
  .outcome-value {
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

interface IPropsMarketOutcome {
  outcome: IOutcome;
  onSelect?: () => void;
  isSelected?: boolean;
  className?: string;
}

const MarketOutcome = ({
  outcome,
  onSelect = () => {},
  isSelected = false,
  className = '',
}: IPropsMarketOutcome) => {
  return (
    <StyledMarketOutcome
      className={classNames('MarketOutcome', className, {
        winner: outcome.is_winner,
        selected: isSelected,
      })}
      key={outcome.id}
      onClick={() => onSelect()}
      color={'secondary'}
    >
      <Typography className="outcome-name" variant="body2">
        {outcome.formated_name}
        {/* {outcome.id} */}
      </Typography>
      <Typography className="outcome-value" variant="body2">
        {outcome.formated_value?.toFixed(2)}
      </Typography>
    </StyledMarketOutcome>
  );
};

export default MarketOutcome;
