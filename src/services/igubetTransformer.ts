import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';

const excludeIds = [
  17, 36, 49, 70, 75, 89, 222, 247, 287, 269, 284, 295, 487, 317, 351, 359, 369, 379, 399, 535, 542, 605, 626,
  631, 669, 815, 3891, 3910, 3960, 3980, 3981, 4076, 4085, 4144, 4164, 4197, 4238, 4239, 4240, 4241, 4312,
  4457, 4585, 4643, 4471, 4710, 4742, 4769, 4773, 4849, 4864, 4896, 4929, 5034, 23328, 23347, 23362, 23365,
  23366, 23368, 23369, 23370, 23371, 23575, 23372, 23929, 23619, 23995, 23972, 4155, 4145, 4228, 4336, 4487,
  4944,
];

// not the most common betting options. exclude for now, maybe implement in the future
const excludeIdsForNow = [23875, 2, 14, 103, 104, 135, 195, 539, 675, 4119, 3889, 4286, 246];

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
  'hcp=0.5',
  'hcp=1.5',
  'hcp=2.5',
  'hcp=3.5',
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

  1718: '1X & Yes', // double chance & both teams to score
  1719: '1X & No',
  1720: '12 & Yes',
  1721: '12 & No',
  1722: 'X2 & Yes',
  1723: 'X2 & No',

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
  return +(val / 1000).toFixed(2);
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

  if ([297, 23522, 4605, 4947, 5106, 5017].includes(market.id)) {
    const score = market.specifier.replace('hcp=', '');

    // meaning that is european handicap, like 1:0 /  0:2 etc.
    if (score.includes(':')) {
      return `${formatedName} (${score})`;
    }

    const hcp = parseFloat(score);

    const outcomeSpecifier = parseFloat(outcome.name.replace(')', '').split('(')[1]);

    if (hcp === outcomeSpecifier) {
      return `${formatedName} (${hcp < 0 ? hcp : '+' + hcp})`;
    }

    if (hcp === outcomeSpecifier * -1) {
      return `${formatedName} (${-1 * hcp < 0 ? -1 * hcp : '+' + -1 * hcp})`;
    }
  }
  return formatedName;
};

const formatMarketName = (market: IIgubetMarket) => {
  //return market.name;

  if (market.specifier && market.specifier.includes('total=')) {
    const limit = market.specifier.replace('total=', '');

    if (market.id === 3975) {
      return `1st half - Home team total (${limit})`;
    }

    if (market.id === 360) {
      return `2nd half - Home team total (${limit})`;
    }

    if (market.id === 209) {
      return `1st half - Away team total (${limit})`;
    }

    if (market.id === 212) {
      return `2nd half - Away team total (${limit})`;
    }

    if (market.id === 4081) {
      return `Away team total (${limit})`;
    }

    if (market.id === 4043) {
      return `Home team total (${limit})`;
    }

    if (market.id === 12) {
      return `Away team to win or over 2.5`;
    }

    return `${market.name} (${limit})`;
  }

  if (market.specifier && market.specifier.includes('hcp=')) {
    const hcp = market.specifier.replace('hcp=', '');

    return `${market.name} (${hcp})`;
  }

  if (market.id === 108) {
    return 'Home team to score in both halves';
  }

  if (market.id === 196) {
    return 'Away team to win both halves';
  }

  if (market.id === 23449) {
    return 'Home team to win both halves';
  }

  if (market.id === 4278) {
    return 'Home team multigoals';
  }
  if (market.id === 4286) {
    return 'Home team or both teams to score';
  }
  if (market.id === 4543) {
    return 'Away team to win either half';
  }
  if (market.id === 4591) {
    return 'Away team to score in both halves';
  }

  if (market.id === 5008) {
    return 'Home team to win either half';
  }

  if (market.id === 23890) {
    return 'Away team multigoals';
  }

  if (market.id === 8) {
    return 'Home team Odd/Even';
  }

  if (market.id === 3877) {
    return 'Away team Odd/Even';
  }

  if (market.id === 49) {
    return 'Correct score';
  }

  return market.name + (market.specifier ? ' ' + market.specifier : '');
};

const getMarketRules = (market: IIgubetMarket) => {
  let rules = '';
  switch (market.id) {
    case 4761: // 1x2
      rules = `
        Predict the result of the match.`;
      break;

    case 4568: // Double chance
      rules = `
      Bet on two of the three possible outcomes in the match:

      1X   If the match result is either home win or draw this option is a winner
      12   If the match result is either home win or away win this option is a winner
      X2   If the match result is either draw or away win this option is a winner
      `;
      break;

    case 322: // halftime/fulltime
      rules = `
      Predict the team to be leading at Half Time and Full Time
      `;
      break;

    case 23449: // home team to win both halves
      rules = `
      Respective team to score more goals than the opposition in both first and second halves.
      `;
      break;

    case 4543: // away team to win either half
      rules = `
      Bet on the respective team to score more goals than the away team in either the first or second halves.
      `;
      break;

    case 4591: // away team to score in both halves
      rules = `
      Bet on the respective team to score a goal in each half.
      `;
      break;

    case 5017: // european handicap
      rules = ``;

      break;

    default:
      break;
  }

  return rules;
};

export const transformIgubetMarkets = (markets: IIgubetMarket[]): IIgubetMarket[] => {
  const result = markets
    .filter((market) => !excludeIds.includes(market.id) && !excludeIdsForNow.includes(market.id))
    .filter((market) => allowedSpecifiers.includes(market.specifier))
    .map((market) => transformIguSingleMarket(market));

  return result;
};

export const transformIguSingleMarket = (market: IIgubetMarket): IIgubetMarket => {

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
}
