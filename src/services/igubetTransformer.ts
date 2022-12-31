import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';

const excludeIds = [
  36, 75, 89, 222, 269, 284, 317, 359, 369, 379, 535, 542, 626, 631, 669, 815, 3910, 3980, 3981, 4076, 4085,
  4144, 4164, 4197, 4238, 4239, 4240, 4241, 4312, 4457, 4643, 4471, 4710, 4742, 4769, 4773, 4849, 4864, 4896, 4929, 5034,
  23328, 23347, 23362, 23365, 23366, 23368, 23369, 23370, 23371, 23575, 23372, 23619, 23995, 23972,
];

// not the most common betting options. exclude for now, maybe implement in the future
const excludeIdsForNow = [2, 103, 135, 4119];

const allowedSpecifiers = [
  'total=0.5',
  'total=1.5',
  'total=2.5',
  'total=3.5',
  'total=4.5',
  'total=5.5',
  'hcp=-0.5',
  'hcp=-1.5',
  'hcp=-2.5',
  'hcp=-3.5',
  'hcp=1:0',
  'hcp=0:1',
  'hcp=2:0',
  'hcp=0:2',
  'hcp=0:3',
  'hcp=3:0',
  'score=0:0',
  '',
];

export const outcomeExternalIds: { [key: string]: string } = {
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

  784: 'None (0:0)', // which team to score
  788: 'Only Home team',
  790: 'Only Away team',
  792: 'Both teams (GG)',

  794: '1 & under', // 1st half - 1x2 & total (1.5)
  796: '1 & over',
  798: 'X & under',
  800: 'X & over',
  802: '2 & under',
  804: '2 & over',

  1711: 'Home', // id:5017# external_id:14 - Handicap 1:0 hcp=1:0
  1712: 'Draw',
  1713: 'Away',

  1714: 'Home', // id:297# external_id:16 - Handicap hcp=-0.5
  1715: 'Away',

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

  1758: 'Other & Home win', // multiscore different
  1759: 'Other & Away win',
  1803: 'Draw',

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

const formatOddValue = (val: number) => {
  return (val / 1000).toFixed(2);
};

const formatOddName = (outcome: IOutcome, market: IIgubetMarket) => {
  let formatedName = outcome.name;
  if (outcomeExternalIds[outcome.outcome_external_id]) {
    formatedName = outcomeExternalIds[outcome.outcome_external_id];
  }

  if (
    [209, 219, 212, 146, 71, 360, 679, 23391, 3975, 4043, 4081, 4458, 4069, 4106, 4917].includes(market.id)
  ) {
    const limit = market.specifier.replace('total=', '');

    return `${formatedName} ${limit}`;
  }

  if ([297, 4947, 5106, 5017].includes(market.id)) {
    const score = market.specifier.replace('hcp=', '');

    return `${formatedName} (${score})`;
  }
  return formatedName;
};

const formatMarketName = (market: IIgubetMarket) => {
  return market.name + (market.specifier ? '    ' + market.specifier : '');
};

const getMarketRules = (market: IIgubetMarket) => {
  let rules = '';
  switch (market.market_external_id) {
    case 1: // 1x2
      rules = `
      Predict the result of the match.

      Void if the match is not completed. 
      `;
      break;

    case 10: // Double chance
      rules = `
      Bet on two of the three possible outcomes in the match:

      1X   If the match result is either home win or draw this option is a winner
      12   If the match result is either home win or away win this option is a winner
      X2   If the match result is either draw or away win this option is a winner
      
      Void if the match is not completed.
      `;
      break;

    case 11: // Draw no bet
      rules = `
      Predict which team will win the match. Tickets are void if the match result is a draw.

      Void if the match is not completed.
      `;
      break;

    case 47:
      rules = `
      Predict the team to be leading at Half Time and Full Time

      Void if the match is not completed. 
      `;
      break;

    case 48:
      rules = `
      Respective team to score more goals than the opposition in both first and second halves.

      Void if the match is not completed.
      `;
      break;
        

    case 51:
      rules = `
      Bet on the respective team to score more goals than the away team in either the first or second halves.

      Void if the match is not completed.
      `;
      break;
      
    case 57:
      rules = `
      Bet on the respective team to score a goal in each half.

      Void if the match is not completed.
      `;
      break;
          
                  
    default:
      break;
  }

  return rules;
};

export const transformIgubetMarkets = (markets: IIgubetMarket[]): IIgubetMarket[] => {
  const result = markets
    .filter((market) => !excludeIds.includes(market.id))
    .filter((market) => !excludeIdsForNow.includes(market.id))
    .filter((market) => allowedSpecifiers.includes(market.specifier))
    .map((market) => {
      const newOutcomes = market.outcomes.map((outcome) => {
        return {
          ...outcome,
          formated_name: formatOddName(outcome, market),
          formated_value: formatOddValue(outcome.odds),
        };
      });

      return {
        ...market,
        outcomes: newOutcomes,
        formated_market_name: formatMarketName(market),
        rules: getMarketRules(market),
      };
    });

  return result;
};
