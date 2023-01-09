import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';

const validateEuropeanHandicap = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const hcp = market.specifier
    .replace('hcp=', '')
    .split(':')
    .map((part) => parseFloat(part));

  const homeScore = periods[0].home + periods[1].home + hcp[0];
  const awayScore = periods[0].away + periods[1].away + hcp[1];

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 32525 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }
    // draw
    if (outcome.id === 32526 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 32527 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfEuropeanHandicap = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const hcp = market.specifier
    .replace('hcp=', '')
    .split(':')
    .map((part) => parseFloat(part));

  const homeScore = periods[0].home + hcp[0];
  const awayScore = periods[0].away + hcp[1];

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 32749 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }
    // draw
    if (outcome.id === 32750 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 32751 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfEuropeanHandicap = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const hcp = market.specifier
    .replace('hcp=', '')
    .split(':')
    .map((part) => parseFloat(part));

  const homeScore = periods[1].home + hcp[0];
  const awayScore = periods[1].away + hcp[1];

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 32310 && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }
    // draw
    if (outcome.id === 32311 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 32312 && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAsianHandicap = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const hcp = parseFloat(market.specifier.replace('hcp=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 1230 && homeScore + hcp > awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 1232 && homeScore < awayScore + -1 * hcp) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfAsianHandicap = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const hcp = parseFloat(market.specifier.replace('hcp=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 31230 && homeScore + hcp > awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 31231 && homeScore < awayScore + -1 * hcp) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfAsianHandicap = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const hcp = parseFloat(market.specifier.replace('hcp=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // home
    if (outcome.id === 155165 && homeScore + hcp > awayScore) {
      newOutcome.is_winner = true;
    }
    // away
    if (outcome.id === 155167 && homeScore < awayScore + -1 * hcp) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

export const validateHandicapMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 5017: // european handicap
        return validateEuropeanHandicap(market, periods);

      case 5106: // first half - european handicap
        return validateFirstHalfEuropeanHandicap(market, periods);

      case 4947: // second half - european handicap
        return validateSecondHalfEuropeanHandicap(market, periods);

      case 297: // asian handicap
        return validateAsianHandicap(market, periods);

      case 4605: // first half - asian handicap
        return validateFirstHalfAsianHandicap(market, periods);

      case 23522: // second half - asian handicap
        return validateSecondHalfAsianHandicap(market, periods);

      default:
        break;
    }

    return market;
  });
};
