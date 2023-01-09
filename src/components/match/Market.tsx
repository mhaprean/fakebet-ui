import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, Paper, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames';
import { useState } from 'react';
import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';

const StyledMarket = styled('div')`
  .market-title {
    padding: 5px 10px;
    margin-bottom: 5px;
    /* color: ${(props) => props.theme.palette.text.secondary}; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .market-outcomes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 0;
    margin-bottom: 20px;
  }

  .outcome {
    display: flex;
    justify-content: space-between;
    flex-basis: 30%;
    flex-grow: 1;
    min-width: 130px;
    background: ${(props) => props.theme.palette.background.paper};
    border-color: transparent;
    border-radius: 5px;
    text-transform: unset;

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

interface IMarketProps {
  market: IIgubetMarket;
  open?: boolean;
}

const Market = ({ market, open = false }: IMarketProps) => {
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
         {/* {market.id} */}
          # {market.formated_market_name} 
          {/* {market.specifier} */}
        </Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Paper>
      <Collapse in={isOpen}>
        {/* <Typography variant="caption" style={{ whiteSpace: 'pre' }}>
          {market.rules}
        </Typography> */}
        <div className="market-outcomes">
          {market.outcomes.map((outcome) => (
            <Button
              className={classNames('outcome', {
                winner: outcome.is_winner,
                selected: outcome.id === selectedOutcome,
              })}
              key={outcome.id}
              onClick={() => selectOutcome(outcome.id)}
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
        </div>
      </Collapse>
    </StyledMarket>
  );
};

export default Market;
