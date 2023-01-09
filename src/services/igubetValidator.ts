import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../redux/features/oddspediaTypes';
import { validateComboMarkets } from './validators/comboValidators';
import { validateHalfMarkets } from './validators/halfValidators';
import { validateHandicapMarkets } from './validators/handicapValidators';
import { validateScoreMarkets } from './validators/scoreValidators';

const validate1x2 = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 31758 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }
    // draw
    if (outcome.id === 31759 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 31760 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 1449 && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }

    if (outcome.id === 1450 && (homeScore === 0 || awayScore === 0)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamTotal = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 28428 && homeScore < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 28429 && homeScore > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamTotal = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const awayScore = periods[0].away + periods[1].away;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 28579 && awayScore < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 28580 && awayScore > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateTotalGoals = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 1027 && total < limit) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 1028 && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validate1x2AndTotal = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & under
    if (outcome.id === 28726 && homeScore > awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1 & over
    if (outcome.id === 28729 && homeScore > awayScore && total > limit) {
      newOutcome.is_winner = true;
    }
    // X & under
    if (outcome.id === 28730 && homeScore === awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // X & over
    if (outcome.id === 28732 && homeScore === awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    // 2 & under
    if (outcome.id === 28733 && homeScore < awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2 & over
    if (outcome.id === 28734 && homeScore < awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateBothHalvesUnder = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home + periods[0].away;
  const secondHalf = periods[1].home + periods[1].away;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 29921 && firstHalf < limit && secondHalf < limit) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 29922 && (firstHalf > limit || secondHalf > limit)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateBothHalvesOver = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home + periods[0].away;
  const secondHalf = periods[1].home + periods[1].away;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 1806 && firstHalf > limit && secondHalf > limit) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 1807 && (firstHalf < limit || secondHalf < limit)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateDoubleChanceAndTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & under
    if (outcome.id === 28537 && homeScore >= awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1X & over
    if (outcome.id === 28540 && homeScore >= awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    // 12 & under
    if (outcome.id === 28538 && homeScore !== awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // 12 & over
    if (outcome.id === 28541 && homeScore !== awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    // X2 & under
    if (outcome.id === 28539 && homeScore <= awayScore && total < limit) {
      newOutcome.is_winner = true;
    }
    // X2 & over
    if (outcome.id === 28542 && homeScore <= awayScore && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamToWinOrOver = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 24 && (homeScore < awayScore || total > limit)) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 25 && homeScore >= awayScore && total < limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamOddOrEven = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // odd
    if (outcome.id === 15 && homeScore % 2 === 1) {
      newOutcome.is_winner = true;
    }
    // even
    if (outcome.id === 16 && homeScore % 2 === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamOddOrEven = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // odd
    if (outcome.id === 27801 && awayScore % 2 === 1) {
      newOutcome.is_winner = true;
    }
    // even
    if (outcome.id === 27802 && awayScore % 2 === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateOddOrEven = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const total = periods[0].home + periods[0].away + periods[1].home + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // odd
    if (outcome.id === 1454 && total % 2 === 1) {
      newOutcome.is_winner = true;
    }
    // even
    if (outcome.id === 1455 && total % 2 === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamToScoreInBothHalves = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 298 && periods[0].home > 0 && periods[1].home > 0) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 299 && (periods[0].home === 0 || periods[1].home === 0)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamToScoreInBothHalves = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 31203 && periods[0].away > 0 && periods[1].away > 0) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 31204 && (periods[0].away === 0 || periods[1].away === 0)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHalftimeFulltime = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home > periods[0].away ? '1' : periods[0].home === periods[0].away ? 'X' : '2';
  const final = homeScore > awayScore ? '1' : homeScore === awayScore ? 'X' : '2';

  const htimeFtime = `${firstHalf}/${final}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1/1
    if (outcome.id === 1272 && htimeFtime === '1/1') {
      newOutcome.is_winner = true;
    }
    // 1/X
    if (outcome.id === 1273 && htimeFtime === '1/X') {
      newOutcome.is_winner = true;
    }
    // 1/2
    if (outcome.id === 1274 && htimeFtime === '1/2') {
      newOutcome.is_winner = true;
    }

    // X/1
    if (outcome.id === 1275 && htimeFtime === 'X/1') {
      newOutcome.is_winner = true;
    }
    // X/X
    if (outcome.id === 1276 && htimeFtime === 'X/X') {
      newOutcome.is_winner = true;
    }
    // X/2
    if (outcome.id === 1277 && htimeFtime === 'X/2') {
      newOutcome.is_winner = true;
    }

    // 2/1
    if (outcome.id === 1278 && htimeFtime === '2/1') {
      newOutcome.is_winner = true;
    }
    // 2/X
    if (outcome.id === 1279 && htimeFtime === '2/X') {
      newOutcome.is_winner = true;
    }
    // 2/2
    if (outcome.id === 1280 && htimeFtime === '2/2') {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateDoubleChance = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X
    if (outcome.id === 31139 && homeScore >= awayScore) {
      newOutcome.is_winner = true;
    }
    // 12
    if (outcome.id === 31140 && homeScore !== awayScore) {
      newOutcome.is_winner = true;
    }

    // X2
    if (outcome.id === 31141 && homeScore <= awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfResultOrMatchResult = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalfHomeScore = periods[0].home;
  const firstHalfAwayScore = periods[0].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1
    if (outcome.id === 64217400 && (homeScore > awayScore || firstHalfHomeScore > firstHalfAwayScore)) {
      newOutcome.is_winner = true;
    }

    // X
    if (outcome.id === 64217401 && (homeScore === awayScore || firstHalfHomeScore === firstHalfAwayScore)) {
      newOutcome.is_winner = true;
    }

    // 2
    if (outcome.id === 64217402 && (homeScore < awayScore || firstHalfHomeScore < firstHalfAwayScore)) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateWhichTeamToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // none to score
    if (outcome.id === 891 && homeScore === 0 && awayScore === 0) {
      newOutcome.is_winner = true;
    }
    // home only
    if (outcome.id === 892 && homeScore > 0 && awayScore === 0) {
      newOutcome.is_winner = true;
    }
    // away only
    if (outcome.id === 893 && homeScore === 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }
    // both to score
    if (outcome.id === 894 && homeScore > 0 && awayScore > 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

/**
 * Function that validates all the markets from Igubet
 * @param markets - the markets array
 * @param periods - the periods from oddspedia (match outcome)
 * @returns validated array of markets
 */
export const validateMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  const validatedHalfMarkets = validateHalfMarkets(markets, periods);

  const validatedScores = validateScoreMarkets(validatedHalfMarkets, periods);

  const validatedCombos = validateComboMarkets(validatedScores, periods);

  const validateHandicap = validateHandicapMarkets(validatedCombos, periods);

  return validateHandicap.map((market, idx) => {
    switch (market.id) {
      case 4761: // 1x2
        return validate1x2(market, periods);

      case 4568: // double chance
        return validateDoubleChance(market, periods);

      case 391: // both teams to score
        return validateBothTeamsToScore(market, periods);

      case 219: // total goals in match
        return validateTotalGoals(market, periods);

      case 4043: // home team total goals
        return validateHomeTeamTotal(market, periods);

      case 4081: // away team total goals
        return validateAwayTeamTotal(market, periods);

      case 12: // 2 or over 2.5
        return validateAwayTeamToWinOrOver(market, periods);

      case 4106: // 1X2 and total
        return validate1x2AndTotal(market, periods);

      case 4069: // double chance and total
        return validateDoubleChanceAndTotal(market, periods);

      case 4372: // both halves under
        return validateBothHalvesUnder(market, periods);

      case 511: // both halves over
        return validateBothHalvesOver(market, periods);

      case 8: // home team odd or even
        return validateHomeTeamOddOrEven(market, periods);

      case 3877: // away team odd or even
        return validateAwayTeamOddOrEven(market, periods);

      case 393: // odd or even
        return validateOddOrEven(market, periods);

      case 108: // home team to score in both halves
        return validateHomeTeamToScoreInBothHalves(market, periods);

      case 4591: // away team to score in both halves
        return validateAwayTeamToScoreInBothHalves(market, periods);

      case 322: // halftime / fulltime
        return validateHalftimeFulltime(market, periods);

      case 8225098: // 1st half result or match result
        return validateFirstHalfResultOrMatchResult(market, periods);

      case 163: // which team to score
        return validateWhichTeamToScore(market, periods);
      default:
        break;
    }

    return market;
  });
};
