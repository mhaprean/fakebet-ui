import { IIgubetMarket, IOutcome } from "../../redux/features/igubetTypes";
import { IOddspediaMatchInfoPeriods } from "../../redux/features/oddspediaTypes";


const validateEuropeanHandicap = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {

  const hcp = market.specifier.replace('hcp=', '').split(':').map((part) => parseFloat(part));


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



export const validateHandicapMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 5017: // european handicap
        return validateEuropeanHandicap(market, periods);


      default:
        break;
    }

    return market;
  });
};
