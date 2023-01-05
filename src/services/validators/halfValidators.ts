import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';

const validateFirstHalf1x2 = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 31923 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }

    if (outcome.id === 31924 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }

    if (outcome.id === 31925 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalf1x2 = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 28441 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }
    // draw
    if (outcome.id === 28443 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 28444 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfDoubleChance = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1x
    if (outcome.id === 1084 && homeScore >= awayScore) {
      newOutcome.is_winner = true;
    }

    // 12
    if (outcome.id === 1085 && homeScore !== awayScore) {
      newOutcome.is_winner = true;
    }

    // x2
    if (outcome.id === 1086 && homeScore <= awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfDoubleChance = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1x
    if (outcome.id === 1451 && homeScore >= awayScore) {
      newOutcome.is_winner = true;
    }

    // 12
    if (outcome.id === 1452 && homeScore !== awayScore) {
      newOutcome.is_winner = true;
    }

    // x2
    if (outcome.id === 1453 && homeScore <= awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalf1x2andBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & yes
    if (outcome.id === 849 && homeScore > awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 1 & no
    if (outcome.id === 851 && homeScore > awayScore && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // X & yes
    if (outcome.id === 854 && homeScore === awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // x & no
    if (outcome.id === 855 && homeScore === 0 && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // 2 & yes
    if (outcome.id === 856 && homeScore < awayScore && homeScore > 0) {
      newOutcome.is_winner = true;
    }
    // 2 & no
    if (outcome.id === 857 && homeScore < awayScore && homeScore === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};
const validateSecondHalf1x2andBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & yes
    if (outcome.id === 1488 && homeScore > awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 1 & no
    if (outcome.id === 1489 && homeScore > awayScore && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // X & yes
    if (outcome.id === 1490 && homeScore === awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // x & no
    if (outcome.id === 1491 && homeScore === 0 && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // 2 & yes
    if (outcome.id === 1492 && homeScore < awayScore && homeScore > 0) {
      newOutcome.is_winner = true;
    }
    // 2 & no
    if (outcome.id === 1493 && homeScore < awayScore && homeScore === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfDoubleChanceandBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & yes
    if (outcome.id === 904 && homeScore >= awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 1X & no
    if (outcome.id === 905 && homeScore >= awayScore && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // 12 & yes
    if (outcome.id === 906 && homeScore !== awayScore && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 12 & no
    if (outcome.id === 907 && homeScore !== awayScore && (homeScore === 0 || awayScore === 0)) {
      newOutcome.is_winner = true;
    }

    // X2 & yes
    if (outcome.id === 908 && homeScore <= awayScore && homeScore > 0) {
      newOutcome.is_winner = true;
    }
    // X2 & no
    if (outcome.id === 909 && homeScore <= awayScore && homeScore === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfDoubleChanceandBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & yes
    if (outcome.id === 1682 && homeScore >= awayScore && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 1X & no
    if (outcome.id === 1683 && homeScore >= awayScore && awayScore === 0) {
      newOutcome.is_winner = true;
    }

    // 12 & yes
    if (outcome.id === 1684 && homeScore !== awayScore && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // 12 & no
    if (outcome.id === 1685 && homeScore !== awayScore && (homeScore === 0 || awayScore === 0)) {
      newOutcome.is_winner = true;
    }

    // X2 & yes
    if (outcome.id === 1686 && homeScore <= awayScore && homeScore > 0) {
      newOutcome.is_winner = true;
    }
    // X2 & no
    if (outcome.id === 1687 && homeScore <= awayScore && homeScore === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamToWinEitherHalf = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const wonFirst = periods[0].home > periods[0].away;
  const wonSecond = periods[1].home > periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 32505 && (wonFirst || wonSecond)) {
      newOutcome.is_winner = true;
    }

    // no
    if (outcome.id === 32508 && !wonFirst && !wonFirst) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamToWinEitherHalf = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const wonFirst = periods[0].home < periods[0].away;
  const wonSecond = periods[1].home < periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 31066 && (wonFirst || wonSecond)) {
      newOutcome.is_winner = true;
    }

    // no
    if (outcome.id === 31070 && !wonFirst && !wonFirst) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 895 && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 896 && (homeScore === 0 || awayScore === 0)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 153507 && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 153508 && (homeScore === 0 || awayScore === 0)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalf1x2AndTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & under
    if (outcome.id === 2849 && homeScore > awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1 & over
    if (outcome.id === 2850 && homeScore > awayScore && total > limit) {
      newOutcome.is_winner = true;
    }
    // X & under
    if (outcome.id === 2852 && homeScore === awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // X & over
    if (outcome.id === 2853 && homeScore === awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    // 2 & under
    if (outcome.id === 2854 && homeScore < awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2 & over
    if (outcome.id === 2855 && homeScore < awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalf1x2AndTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & under
    if (outcome.id === 32238 && homeScore > awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1 & over
    if (outcome.id === 32239 && homeScore > awayScore && total > limit) {
      newOutcome.is_winner = true;
    }
    // X & under
    if (outcome.id === 32240 && homeScore === awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // X & over
    if (outcome.id === 32241 && homeScore === awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    // 2 & under
    if (outcome.id === 32242 && homeScore < awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2 & over
    if (outcome.id === 32243 && homeScore < awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfOddOrEven = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const total = periods[0].home + periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // odd
    if (outcome.id === 80 && total % 2 === 1) {
      newOutcome.is_winner = true;
    }
    // even
    if (outcome.id === 81 && total % 2 === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfOddOrEven = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const total = periods[1].home + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // odd
    if (outcome.id === 32620 && total % 2 === 1) {
      newOutcome.is_winner = true;
    }
    // even
    if (outcome.id === 32625 && total % 2 === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 153995 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 153998 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 30294 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 30295 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfHomeTeamTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;

  const total = homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 28082 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 28083 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfAwayTeamTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const awayScore = periods[0].away;

  const total = awayScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 1007 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 1008 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfHomeTeamTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;

  const total = homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // under
    if (outcome.id === 1365 && total < limit) {
      newOutcome.is_winner = true;
    }

    // over
    if (outcome.id === 1366 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfAwayTeamTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const awayScore = periods[1].away;

  const total = awayScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 1011 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 1012 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHighestScoringHalf = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const first = periods[0].home + periods[0].away;
  const second = periods[1].home + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // first
    if (outcome.id === 1440 && first > second) {
      newOutcome.is_winner = true;
    }
    // second
    if (outcome.id === 1441 && first < second) {
      newOutcome.is_winner = true;
    }
    // equal
    if (outcome.id === 1442 && first === second) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

export const validateHalfMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 4834: // 1st half 1x2
        return validateFirstHalf1x2(market, periods);
      case 4050: // 2nd half 1x2'
        return validateSecondHalf1x2(market, periods);

      case 231: // 1st half double chance
        return validateFirstHalfDoubleChance(market, periods);

      case 392: // 2nd half double chance
        return validateSecondHalfDoubleChance(market, periods);

      case 150: // 1st half 1x2 and GG
        return validateFirstHalf1x2andBothTeamsToScore(market, periods);

      case 406: // 2nd half 1x2 and GG
        return validateSecondHalf1x2andBothTeamsToScore(market, periods);

      case 168: // 1st half - double chance && GG
        return validateFirstHalfDoubleChanceandBothTeamsToScore(market, periods);

      case 469: // 2nd half - double chance && GG
        return validateSecondHalfDoubleChanceandBothTeamsToScore(market, periods);

      case 5008: // home team to win either half
        return validateHomeTeamToWinEitherHalf(market, periods);

      case 4543: // away team to win either half
        return validateAwayTeamToWinEitherHalf(market, periods);

      case 164: // 1st half both teams to score
        return validateFirstHalfBothTeamsToScore(market, periods);

      case 23333: // 2nd half both teams to score
        return validateSecondHalfBothTeamsToScore(market, periods);

      case 679: // 1st half 1x2 & total
        return validateFirstHalf1x2AndTotal(market, periods);

      case 4917: // 2nd half 1x2 & total
        return validateSecondHalf1x2AndTotal(market, periods);

      case 38: // first half odd or even
        return validateFirstHalfOddOrEven(market, periods);

      case 5060: // second half odd or even
        return validateSecondHalfOddOrEven(market, periods);

      case 23391: // 1st half total goals
        return validateFirstHalfTotal(market, periods);

      case 4458: // 2nd half total goals
        return validateSecondHalfTotal(market, periods);

      case 3975: // 1st half total goals of home team
        return validateFirstHalfHomeTeamTotal(market, periods);

      case 209: // 1st half total goals of away team
        return validateFirstHalfAwayTeamTotal(market, periods);

      case 360: // 2nd half total goals of home team
        return validateSecondHalfHomeTeamTotal(market, periods);

      case 212: // 2nd half total goals of away team
        return validateSecondHalfAwayTeamTotal(market, periods);

      case 387: // highest scoring half
        return validateHighestScoringHalf(market, periods);
      default:
        break;
    }

    return market;
  });
};
