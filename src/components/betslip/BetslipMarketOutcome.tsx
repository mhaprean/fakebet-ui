import { addEvent, IBetEvent, removeEvent } from '../../redux/features/betslipSlice';
import { IIgubetMarket, IIgubetMatch, IOutcome } from '../../redux/features/igubetTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { timeFormatService } from '../../services/timeFormaterService';
import MarketOutcome from '../match/MarketOutcome';

interface IPropsBetslipMarketOutcome {
  outcome: IOutcome;
  match: IIgubetMatch;
  market: IIgubetMarket;
}

/**
 *
 * This is a wrapper component for MarketOutcome.
 * Here we handle the logic for: add, remove, and verify if is selected on current betslip
 * MarketOutcome should not depend on redux, it will only receive some props and render
 */
const BetslipMarketOutcome = ({ outcome, match, market }: IPropsBetslipMarketOutcome) => {
  const betslipState = useAppSelector((rootState) => rootState.betslip);
  const dispatch = useAppDispatch();

  const isSelected = () => {
    let exists = betslipState.betslip.events.find(
      (ev, idx) =>
        match.id === ev.matchId && outcome.id === ev.outcome_id && market.specifier === ev.market_specifier
    );

    if (exists) {
      return true;
    }

    return false;
  };

  const handleSelectOutcome = () => {
    const validationDate = timeFormatService.getMatchValidationDate(match.start_time);

    const alreadyPicked = isSelected();

    const newEvent: IBetEvent = {
      matchId: match.id,
      validationDate: validationDate,
      match: match,
      market: market,

      outcome_id: outcome.id,
      outcome_name: outcome.name,
      market_name: market.name,
      market_specifier: market.specifier,

      odds: outcome.formated_value || 1
    };

    if (alreadyPicked) {
      dispatch(removeEvent({ eventId: match.id }));
    } else {
      dispatch(addEvent({ betEvent: newEvent }));
    }
  };

  return (
    <MarketOutcome
      className="BetslipMarketOutcome"
      isSelected={isSelected()}
      outcome={outcome}
      onSelect={handleSelectOutcome}
    />
  );
};

export default BetslipMarketOutcome;
