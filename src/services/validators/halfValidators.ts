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
      default:
        break;
    }

    return market;
  });
};
