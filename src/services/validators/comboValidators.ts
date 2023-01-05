import { IIgubetMarket, IOutcome } from "../../redux/features/igubetTypes";
import { IOddspediaMatchInfoPeriods } from "../../redux/features/oddspediaTypes";


const validateDoubleChanceAndBothTeamsToScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const bothScored = homeScore> 0 && awayScore > 0;


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



export const validateComboMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {

      case 47: // double chance & GG
        return validateDoubleChanceAndBothTeamsToScore(market, periods);
      
      case 3952: // double chance & 2nd half GG
        return validateDoubleChanceAndSecondHalfBothTeamsToScore(market, periods);

      default:
        break;
    }

    return market;
  });
};
