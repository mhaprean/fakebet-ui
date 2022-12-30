import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';

const StyledMarket = styled('div')`
  .market-title {
    padding: 10px;
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
    background: ${(props) => props.theme.palette.action.selected};
    border-color: transparent;
    border-radius: 5px;
    text-transform: unset;

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
}

const Market = ({ market }: IMarketProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledMarket className="Market">
      <Paper className="market-title" onClick={toggleExpanded} variant={'outlined'}>
        <Typography>
          id:{market.id}# external_id:{market.market_external_id} - {market.formated_market_name}
        </Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Paper>
      <Collapse in={isOpen}>
        <Typography variant="caption" style={{whiteSpace: 'pre'}}>{market.rules}</Typography>
        <div className="market-outcomes">
          {market.outcomes.map((outcome) => (
            <Button className="outcome" key={outcome.id}>
              <Typography className="outcome-name" variant="body2">
                {outcome.formated_name}
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
