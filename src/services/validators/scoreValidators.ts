import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';

const validateCorrectScore = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const score = `${homeScore}:${awayScore}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 0:0
    if (outcome.id === 204 && score === '0:0') {
      newOutcome.is_winner = true;
    }

    // 1:0
    if (outcome.id === 205 && score === '1:0') {
      newOutcome.is_winner = true;
    }

    // 2:0
    if (outcome.id === 206 && score === '2:0') {
      newOutcome.is_winner = true;
    }
    // 3:0
    if (outcome.id === 207 && score === '3:0') {
      newOutcome.is_winner = true;
    }
    // 4:0
    if (outcome.id === 208 && score === '4:0') {
      newOutcome.is_winner = true;
    }
    // 0:1
    if (outcome.id === 209 && score === '0:1') {
      newOutcome.is_winner = true;
    }
    // 1:1
    if (outcome.id === 210 && score === '1:1') {
      newOutcome.is_winner = true;
    }
    // 2:1
    if (outcome.id === 211 && score === '2:1') {
      newOutcome.is_winner = true;
    }
    // 3:1
    if (outcome.id === 212 && score === '3:1') {
      newOutcome.is_winner = true;
    }
    // 4:1
    if (outcome.id === 213 && score === '4:1') {
      newOutcome.is_winner = true;
    }
    // 0:2
    if (outcome.id === 214 && score === '0:2') {
      newOutcome.is_winner = true;
    }
    // 1:2
    if (outcome.id === 215 && score === '1:2') {
      newOutcome.is_winner = true;
    }
    // 2:2
    if (outcome.id === 216 && score === '2:2') {
      newOutcome.is_winner = true;
    }
    // 3:2
    if (outcome.id === 217 && score === '3:2') {
      newOutcome.is_winner = true;
    }
    // 4:2
    if (outcome.id === 218 && score === '4:2') {
      newOutcome.is_winner = true;
    }
    // 0:3
    if (outcome.id === 219 && score === '0:3') {
      newOutcome.is_winner = true;
    }
    // 1:3
    if (outcome.id === 220 && score === '1:3') {
      newOutcome.is_winner = true;
    }
    // 2:3
    if (outcome.id === 221 && score === '2:3') {
      newOutcome.is_winner = true;
    }
    // 3:3
    if (outcome.id === 222 && score === '3:3') {
      newOutcome.is_winner = true;
    }
    // 4:3
    if (outcome.id === 223 && score === '4:3') {
      newOutcome.is_winner = true;
    }
    // 0:4
    if (outcome.id === 224 && score === '0:4') {
      newOutcome.is_winner = true;
    }
    // 1:4
    if (outcome.id === 225 && score === '1:4') {
      newOutcome.is_winner = true;
    }
    // 2:4
    if (outcome.id === 226 && score === '2:4') {
      newOutcome.is_winner = true;
    }
    // 3:4
    if (outcome.id === 227 && score === '3:4') {
      newOutcome.is_winner = true;
    }
    // 4:4
    if (outcome.id === 228 && score === '4:4') {
      newOutcome.is_winner = true;
    }
    // other
    if (outcome.id === 229 && (homeScore > 4 || awayScore > 4)) {
      newOutcome.is_winner = true;
    }
    return newOutcome;
  });

  return { ...market, outcomes };
};

export const validateScoreMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 76: // correct score
        return validateCorrectScore(market, periods);

      default:
        break;
    }

    return market;
  });
};
