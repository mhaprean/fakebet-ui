import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../redux/features/oddspediaTypes';

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

const validateDrawOrTotal = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
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
  return markets.map((market, idx) => {
    switch (market.id) {
      case 4761: // 1x2
        return validate1x2(market, periods);

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
        return validateDrawOrTotal(market, periods);

      default:
        break;
    }

    return market;
  });
};
