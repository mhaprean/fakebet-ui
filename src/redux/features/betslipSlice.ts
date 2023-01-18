import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIgubetMarket, IIgubetMatch } from './igubetTypes';

export interface IBetEvent {

  matchId: number;
  validationDate: string;
  match: IIgubetMatch;
  market: IIgubetMarket;
  
  outcome_id: number;
  outcome_name: string;
  market_name: string;
  market_specifier: string;
  
  odds: number;

  inactive?: boolean;
}

export interface IBetslip {
  events: IBetEvent[];
  stake: number;
  system?: boolean;
  totalOdds: number;
  potentialGain: number;
  minWin?: number;
  iguIds: number[];
  validationDate: string;
}

interface BetslipState {
  betslip: IBetslip;
}

const initialState: BetslipState = {
  betslip: {
    events: [],
    stake: 100,
    minWin: 0,
    potentialGain: 100,
    totalOdds: 1,
    iguIds: [],
    validationDate: '',

  }
}

const calculateTotalOdds = (events: IBetEvent[]): number => {
  let totalOdds = 1;

  events.forEach((match: IBetEvent, idx) => {
    totalOdds = totalOdds * match.odds;
  });

  return parseFloat(totalOdds.toFixed(2));
};

const calculatePotentialGain = (totalOdds: number, stake: number): number => {
  const potentialGain = totalOdds * stake;
  return parseFloat(potentialGain.toFixed(2));
};



export const betslipSlice = createSlice({
  name: 'betslip',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addEvent: (state, action: PayloadAction<{ betEvent: IBetEvent; }>) => {
      const newEvent = action.payload.betEvent;

      state.betslip.events = state.betslip.events.filter((game) => game.matchId !== newEvent.matchId);

      // state.betslip.iguEvents = state.betslip.iguEvents.filter(
      //   (game) => game.id !== newEvent.matchId
      // );

      state.betslip.events.push(action.payload.betEvent);

      // if (action.payload.iguEvent) {
      //   state.betslip.iguEvents.push(action.payload.iguEvent);
      // }

      state.betslip.totalOdds = calculateTotalOdds(state.betslip.events);
      state.betslip.potentialGain = calculatePotentialGain(
        state.betslip.totalOdds,
        state.betslip.stake
      );

      let eventsToSort = [...state.betslip.events];
      eventsToSort.sort(function (a, b) {
        return a.validationDate < b.validationDate ? -1 : a.validationDate > b.validationDate ? 1 : 0;
      });

      if (eventsToSort.length > 0) {
        const lastEvent = eventsToSort.reverse()[0];

        state.betslip.validationDate = lastEvent.validationDate;
      }
    },

    removeEvent: (state, action: PayloadAction<{eventId: number}>) => {
      const eventId = action.payload.eventId;

      const filteredEvents: IBetEvent[] = state.betslip.events.filter((game) => game.matchId !== eventId);

      state.betslip.events = filteredEvents;

      // state.betslip.iguEvents = state.betslip.iguEvents.filter(
      //   (game) => game.id !== removableEvent.matchId
      // );

      state.betslip.totalOdds = calculateTotalOdds(state.betslip.events);
      state.betslip.potentialGain = calculatePotentialGain(
        state.betslip.totalOdds,
        state.betslip.stake
      );

      // // TODO - verify if this works as expected
      let eventsToSort = [...filteredEvents];
      eventsToSort.sort(function (a, b) {
        return a.validationDate < b.validationDate ? -1 : a.validationDate > b.validationDate ? 1 : 0;
      });

      if (eventsToSort.length > 0) {
        const lastEvent = eventsToSort.reverse()[0];

        state.betslip.validationDate = lastEvent.validationDate;
      }
    },

    changeBetslipType: (state, action: PayloadAction<{ system: boolean }>) => {
      state.betslip.system = action.payload.system;
    },
    changeStake: (state, action: PayloadAction<{ stake: number }>) => {
      state.betslip.stake = action.payload.stake;
      state.betslip.totalOdds = calculateTotalOdds(state.betslip.events);
      state.betslip.potentialGain = calculatePotentialGain(
        state.betslip.totalOdds,
        state.betslip.stake
      );
    },
    clearBetslip: (state) => {
      state.betslip.events = [];
      state.betslip.iguIds = [];
      state.betslip.totalOdds = 1;
      state.betslip.potentialGain = 100;
      state.betslip.stake = 100;
      state.betslip.validationDate = '';
    },
  },
});

export const { addEvent, removeEvent, changeBetslipType, changeStake, clearBetslip } = betslipSlice.actions;

export default betslipSlice.reducer;

