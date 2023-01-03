import { IIgubetMarket, IOutcome } from '../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../redux/features/oddspediaTypes';

const validate1x2 = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const outcomes = market.outcomes.map((outcome, idx) => {

    const newOutcome = {...outcome, is_validated: true, is_winner: false};

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

  return {...market, outcomes};
};

export const validateMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 4761: // 1x2
        return validate1x2(market, periods);
        break;

      default:
        break;
    }

    return market;
  });

};
