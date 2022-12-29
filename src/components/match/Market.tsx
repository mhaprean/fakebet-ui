import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IIgubetMarket } from '../../redux/features/igubetTypes';

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

const marketIds = {
  71: 'Halftime/fulltime & total'
}

const outcomeExternalIds = {
  1: '1',
  2: 'X',
  3: '2',
  9: '1X',
  10: '12',
  11: 'X2',
  12: 'Over',
  13: 'Under',
  74: 'Yes',
  76: 'No',
  
};

const Market = ({ market }: IMarketProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  const formatOddValue = (val: number) => {
    return (val / 1000).toFixed(2);
  };

  return (
    <StyledMarket className="Market">
      <Paper className="market-title" onClick={toggleExpanded} variant={'outlined'}>
        <Typography>
          {market.id}# {market.name} / {market.specifier}
        </Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Paper>
      <Collapse in={isOpen}>
        <div className="market-outcomes">
          {market.outcomes.map((outcome) => (
            <Button className="outcome" key={outcome.id}>
              <Typography className="outcome-name" variant="body2">
                {outcome.name} {outcome.outcome_external_id}
              </Typography>
              <Typography className="outcome-value" variant="body2">
                {formatOddValue(outcome.odds)}
              </Typography>
            </Button>
          ))}
        </div>
      </Collapse>
    </StyledMarket>
  );
};

export default Market;
