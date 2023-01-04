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

      default:
        break;
    }

    return market;
  });
};
