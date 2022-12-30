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

const marketIds = {
  71: 'Halftime/fulltime & total',
};

const outcomeExternalIds: { [key: string]: string } = {
  1: '1',
  2: 'X',
  3: '2',
  4: '1', // draw no bet
  5: '2', // draw no bet
  9: '1X',
  10: '12',
  11: 'X2',
  12: 'Over',
  13: 'Under',
  70: 'Odd', // 1st half odd/even
  72: 'Even', // 1st half odd/even
  74: 'Yes',
  76: 'No',

  78: '1 & Yes',
  80: '1 & No',
  82: 'X & Yes',
  84: 'X & No',
  86: '2 & Yes',
  88: '2 & No',

  418: '1/1', // halftime / fulltime
  420: '1/X',
  422: '1/2',
  424: 'X/1',
  426: 'X/X',
  428: 'X/2',
  430: '2/1',
  432: '2/X',
  434: '2/2',

  794: '1 & under', // 1st half - 1x2 & total (1.5)
  796: '1 & over',
  798: 'X & under',
  800: 'X & over',
  802: '2 & under',
  804: '2 & over',

  1718: '1X & GG', // double chance & both teams to score
  1719: '1X & NG',
  1720: '12 & GG',
  1721: '12 & NG',
  1722: 'X2 & GG',
  1723: 'X2 & NG',

  1724: '1X & under', // double chance & total (1.5)
  1725: '12 & under',
  1726: 'X2 & under',
  1727: '1X & over',
  1728: '12 & over',
  1729: 'X2 & over',

  1836: '1/1 & under', // half time / fulltime & total (1.5),
  1837: '1/X & under',
  1838: '1/2 & under',
  1839: 'X/1 & under',
  1840: 'X/X & under',
  1841: 'X/2 & under',
  1842: '2/1 & under',
  1843: '2/X & under',
  1844: '2/2 & under',
  1845: '1/1 & over',
  1846: '1/X & over',
  1847: '1/2 & over',
  1848: 'X/1 & over',
  1849: 'X/X & over',
  1850: 'X/2 & over',
  1851: '2/1 & over',
  1852: '2/X & over',
  1853: '2/2 & over',

};

const Market = ({ market }: IMarketProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  const formatOddValue = (val: number) => {
    return (val / 1000).toFixed(2);
  };

  const formatOddName = (outcome: IOutcome) => {
    if (outcomeExternalIds[outcome.outcome_external_id]) {

      return outcomeExternalIds[outcome.outcome_external_id];
    }
    return outcome.name;
  }

  return (
    <StyledMarket className="Market">
      <Paper className="market-title" onClick={toggleExpanded} variant={'outlined'}>
        <Typography>
          {market.id}# {market.name}  {market.specifier ? ' / '+market.specifier : ''}
        </Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Paper>
      <Collapse in={isOpen}>
        <div className="market-outcomes">
          {market.outcomes

            .map((outcome) => (
              <Button className="outcome" key={outcome.id}>
                <Typography className="outcome-name" variant="body2">
                  {/* {outcome.name} {outcome.outcome_external_id} */}
                  {formatOddName(outcome)}
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
