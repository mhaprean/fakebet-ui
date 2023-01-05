import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../redux/features/oddspediaTypes';
import { validateComboMarkets } from './validators/comboValidators';
import { validateHalfMarkets } from './validators/halfValidators';
import { validateScoreMarkets } from './validators/scoreValidators';

const validate1x2 = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    if (outcome.id === 31758 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }

    if (outcome.id === 31759 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }

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

const validateDrawOrOver = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 32482 && (homeScore === awayScore || total > limit)) {
      newOutcome.is_winner = true;
    }
    if (outcome.id === 32483 && homeScore !== awayScore && total < limit) {
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

const validateDrawOrUnder = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // yes
    if (outcome.id === 2493 && (homeScore === awayScore || total < limit)) {
      newOutcome.is_winner = true;
    }
    // no
    if (outcome.id === 2495 && homeScore !== awayScore && total > limit) {
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

const validateFirstHalfMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const total = awayScore + homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 30954 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 30955 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 30956 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 30957 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 30958 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const total = awayScore + homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 32090 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 32091 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 32092 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 32093 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 32094 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 159988 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 159989 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 159990 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 159991 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 159992 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;

  const total = homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 29607 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 29608 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 29609 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 29611 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 29612 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateMultigoals = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = homeScore + awayScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 30652 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 30657 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-4 goals
    if (outcome.id === 30659 && total <= 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-5 goals
    if (outcome.id === 30661 && total <= 5 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-6 goals
    if (outcome.id === 30663 && total <= 6 && total > 0) {
      newOutcome.is_winner = true;
    }

    // 2-3 goals
    if (outcome.id === 30666 && total <= 3 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-4 goals
    if (outcome.id === 30668 && total <= 4 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-5 goals
    if (outcome.id === 30670 && total <= 5 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-6 goals
    if (outcome.id === 30672 && total <= 6 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 3-4 goals
    if (outcome.id === 30674 && total <= 4 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 3-5 goals
    if (outcome.id === 30675 && total <= 5 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 3-6 goals
    if (outcome.id === 30676 && total <= 6 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 4-5 goals
    if (outcome.id === 30678 && total <= 5 && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 4-6 goals
    if (outcome.id === 30679 && total <= 6 && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 5-6 goals
    if (outcome.id === 30681 && total <= 6 && total >= 5) {
      newOutcome.is_winner = true;
    }

    // 7+ goals
    if (outcome.id === 30682 && total >= 7) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 30684 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};


const validateHalftimeFulltime = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home > periods[0].away ? '1' : (periods[0].home === periods[0].away ? 'X' : '2');
  const final = homeScore > awayScore ? '1' : (homeScore === awayScore ? 'X' : '2');

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


const validateDoubleChance = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
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

  return validatedCombos.map((market, idx) => {
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

      case 4996: // X or over 2.5
        return validateDrawOrOver(market, periods);

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

      case 583: // X or under
        return validateDrawOrUnder(market, periods);

      case 679: // 1st half 1x2 & total
        return validateFirstHalf1x2AndTotal(market, periods);

      case 4917: // 1st half 1x2 & total
        return validateSecondHalf1x2AndTotal(market, periods);

      case 8: // home team odd or even
        return validateHomeTeamOddOrEven(market, periods);

      case 3877: // away team odd or even
        return validateAwayTeamOddOrEven(market, periods);

      case 38: // first half odd or even
        return validateFirstHalfOddOrEven(market, periods);

      case 5060: // second half odd or even
        return validateSecondHalfOddOrEven(market, periods);

      case 393: // odd or even
        return validateOddOrEven(market, periods);

      case 387: // highest scoring half
        return validateHighestScoringHalf(market, periods);

      case 108: // home team to score in both halves
        return validateHomeTeamToScoreInBothHalves(market, periods);

      case 4591: // away team to score in both halves
        return validateAwayTeamToScoreInBothHalves(market, periods);

      case 4514: // 1st half - multigoals
        return validateFirstHalfMultigoals(market, periods);

      case 4888: // 2ns half - multigoals
        return validateSecondHalfMultigoals(market, periods);

      case 4278: // home team multigoals
        return validateHomeTeamMultigoals(market, periods);

      case 23890: // away team multigoals
        return validateAwayTeamMultigoals(market, periods);

      case 4486: // multigoals
        return validateMultigoals(market, periods);

      case 322: // halftime / fulltime
        return validateHalftimeFulltime(market, periods);

      default:
        break;
    }

    return market;
  });
};
