import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';

const validateDoubleChanceAndBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const bothScored = homeScore > 0 && awayScore > 0;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & GG
    if (outcome.id === 96 && homeScore >= awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // 1X & NG
    if (outcome.id === 97 && homeScore >= awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    // 12 & GG
    if (outcome.id === 98 && homeScore !== awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // 12 & NG
    if (outcome.id === 99 && homeScore !== awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    // X2 & GG
    if (outcome.id === 100 && homeScore <= awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // X2 & NG
    if (outcome.id === 101 && homeScore <= awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateDoubleChanceAndFirstHalfBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const ggFirstHalf = periods[0].home > 0 && periods[0].away > 0;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & 1st half GG
    if (outcome.id === 1296 && homeScore >= awayScore && ggFirstHalf) {
      newOutcome.is_winner = true;
    }
    // 1X & 1st half NG
    if (outcome.id === 1297 && homeScore >= awayScore && !ggFirstHalf) {
      newOutcome.is_winner = true;
    }

    // 12 & 1st half GG
    if (outcome.id === 1298 && homeScore !== awayScore && ggFirstHalf) {
      newOutcome.is_winner = true;
    }
    // 12 & 1st half NG
    if (outcome.id === 1299 && homeScore !== awayScore && !ggFirstHalf) {
      newOutcome.is_winner = true;
    }

    // X2 & 1st half GG
    if (outcome.id === 1300 && homeScore <= awayScore && ggFirstHalf) {
      newOutcome.is_winner = true;
    }
    // X2 & 1st half NG
    if (outcome.id === 1301 && homeScore <= awayScore && !ggFirstHalf) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateDoubleChanceAndSecondHalfBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const ggSecondHalf = periods[1].home > 0 && periods[1].away > 0;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1X & 2nd half GG
    if (outcome.id === 28023 && homeScore >= awayScore && ggSecondHalf) {
      newOutcome.is_winner = true;
    }
    // 1X & 2nd half NG
    if (outcome.id === 28024 && homeScore >= awayScore && !ggSecondHalf) {
      newOutcome.is_winner = true;
    }

    // 12 & 2nd half GG
    if (outcome.id === 28025 && homeScore !== awayScore && ggSecondHalf) {
      newOutcome.is_winner = true;
    }
    // 12 & 2nd half NG
    if (outcome.id === 28026 && homeScore !== awayScore && !ggSecondHalf) {
      newOutcome.is_winner = true;
    }

    // X2 & 2nd half GG
    if (outcome.id === 28027 && homeScore <= awayScore && ggSecondHalf) {
      newOutcome.is_winner = true;
    }
    // X2 & 2nd half NG
    if (outcome.id === 2802 && homeScore <= awayScore && !ggSecondHalf) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHalftimeFulltimeAndTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home > periods[0].away ? '1' : periods[0].home === periods[0].away ? 'X' : '2';
  const final = homeScore > awayScore ? '1' : homeScore === awayScore ? 'X' : '2';

  const htimeFtime = `${firstHalf}/${final}`;

  const total = awayScore + homeScore;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1/1 & under
    if (outcome.id === 178 && htimeFtime === '1/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1/X & under
    if (outcome.id === 179 && htimeFtime === '1/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1/2 & under
    if (outcome.id === 180 && htimeFtime === '1/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // X/1 & under
    if (outcome.id === 181 && htimeFtime === 'X/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // X/X & under
    if (outcome.id === 182 && htimeFtime === 'X/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // X/2 & under
    if (outcome.id === 183 && htimeFtime === 'X/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // 2/1 & under
    if (outcome.id === 184 && htimeFtime === '2/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2/X & under
    if (outcome.id === 185 && htimeFtime === '2/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2/2 & under
    if (outcome.id === 186 && htimeFtime === '2/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // over

    // 1/1 & over
    if (outcome.id === 187 && htimeFtime === '1/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 1/X & over
    if (outcome.id === 188 && htimeFtime === '1/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 1/2 & over
    if (outcome.id === 189 && htimeFtime === '1/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    // X/1 & over
    if (outcome.id === 190 && htimeFtime === 'X/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // X/X & over
    if (outcome.id === 191 && htimeFtime === 'X/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // X/2 & over
    if (outcome.id === 192 && htimeFtime === 'X/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    // 2/1 & over
    if (outcome.id === 193 && htimeFtime === '2/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 2/X & over
    if (outcome.id === 194 && htimeFtime === '2/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 2/2 & over
    if (outcome.id === 195 && htimeFtime === '2/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};


const validateHalftimeFulltimeAndFirstHalfTotal = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalf = periods[0].home > periods[0].away ? '1' : periods[0].home === periods[0].away ? 'X' : '2';
  const final = homeScore > awayScore ? '1' : homeScore === awayScore ? 'X' : '2';

  const htimeFtime = `${firstHalf}/${final}`;

  const total = periods[0].home + periods[0].away;

  const limit = parseFloat(market.specifier.replace('total=', ''));

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1/1 & under
    if (outcome.id === 427 && htimeFtime === '1/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1/X & under
    if (outcome.id === 428 && htimeFtime === '1/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 1/2 & under
    if (outcome.id === 429 && htimeFtime === '1/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // X/1 & under
    if (outcome.id === 430 && htimeFtime === 'X/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // X/X & under
    if (outcome.id === 431 && htimeFtime === 'X/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // X/2 & under
    if (outcome.id === 432 && htimeFtime === 'X/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // 2/1 & under
    if (outcome.id === 433 && htimeFtime === '2/1' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2/X & under
    if (outcome.id === 434 && htimeFtime === '2/X' && total < limit) {
      newOutcome.is_winner = true;
    }
    // 2/2 & under
    if (outcome.id === 435 && htimeFtime === '2/2' && total < limit) {
      newOutcome.is_winner = true;
    }

    // over

    // 1/1 & over
    if (outcome.id === 436 && htimeFtime === '1/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 1/X & over
    if (outcome.id === 437 && htimeFtime === '1/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 1/2 & over
    if (outcome.id === 438 && htimeFtime === '1/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    // X/1 & over
    if (outcome.id === 439 && htimeFtime === 'X/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // X/X & over
    if (outcome.id === 440 && htimeFtime === 'X/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // X/2 & over
    if (outcome.id === 441 && htimeFtime === 'X/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    // 2/1 & over
    if (outcome.id === 442 && htimeFtime === '2/1' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 2/X & over
    if (outcome.id === 443 && htimeFtime === '2/X' && total > limit) {
      newOutcome.is_winner = true;
    }
    // 2/2 & over
    if (outcome.id === 444 && htimeFtime === '2/2' && total > limit) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};


const validate1x2AndBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const bothScored = homeScore > 0 && awayScore > 0;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1 & GG
    if (outcome.id === 1660 && homeScore > awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // 1 & NG
    if (outcome.id === 1661 && homeScore > awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    // X & GG
    if (outcome.id === 1662 && homeScore === awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // X & NG
    if (outcome.id === 1663 && homeScore === awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    // 2 & GG
    if (outcome.id === 1664 && homeScore < awayScore && bothScored) {
      newOutcome.is_winner = true;
    }
    // 2 & NG
    if (outcome.id === 1665 && homeScore < awayScore && !bothScored) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};


export const validateComboMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {

      case 459: // 1x2 & GG
        return validate1x2AndBothTeamsToScore(market, periods);
        
      case 47: // double chance & GG
        return validateDoubleChanceAndBothTeamsToScore(market, periods);

      case 331: // double change & 1st half GG
        return validateDoubleChanceAndFirstHalfBothTeamsToScore(market, periods);

      case 3952: // double chance & 2nd half GG
        return validateDoubleChanceAndSecondHalfBothTeamsToScore(market, periods);

      case 71: // halftime/fulltime & total (over or under)
        return validateHalftimeFulltimeAndTotal(market, periods);


      case 146: // halfttime/fulltime & 1st half total 
        return validateHalftimeFulltimeAndFirstHalfTotal(market, periods);
      default:
        break;
    }

    return market;
  });
};
