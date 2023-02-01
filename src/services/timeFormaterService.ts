import moment from 'moment';
import { IOddspediaMatch } from '../redux/features/oddspediaTypes';

const isToday = (day: string) => {
  const date = moment(day);

  return date.isSame(new Date(), 'day');
};

const formatMatchDate = (day: string) => {
  const date = moment(day);

  const tomorrow = moment().add(1, 'day').endOf('day');

  if (isToday(day)) return 'Today';
  if (date < tomorrow && date > moment().startOf('day')) return 'Tomorrow';

  return date.format('ddd DD.MM');
};

const isPastDate = (day: string) => {
  const now = moment();

  const date = moment(day);

  return date < now;
};

const formatMatchTime = (day: string) => {
  return moment(day).format('HH:mm');
};

const formatLeagueDay = (day: string) => {
  const date = moment(day).format('DD-MMMM');

  return date;
};

// the hour of the match
const getMatchTime = (match: IOddspediaMatch) => {
  let res = moment(match.md).format('HH:mm');

  // matchstatus 2 = live
  // matchstatus 1 = prematch
  // matchstatus 8 = finished
  // matchstatus 4 = postponed

  if (match.matchstatus === 2) {
    if (match.halftime && match.inplay_status) {
      res = match.inplay_status;
    } else {
      res = match.current_time + "'";
    }
  }

  if (match.startTime) {
    res = moment(match.startTime).format('DD.MM');
  }
  if (match.starttime) {
    res = moment(match.starttime).format('DD MMM');
  }

  if (match.matchstatus === 8) {
    res = match.postmatch_status || 'FT';
  }

  if (match.matchstatus === 1) {
    res = moment(match.md).format('HH:mm');
  }

  return res;
};

const isDateValid = (day: string) => {
  const date = moment(day);
  return date.isValid();
};

const isSameDay = (day: string, day2: string) => {
  const isSame = moment(day).isSame(day2, 'day');

  return isSame;
};

const getCurrentDate = () => {
  const date = moment().format('YYYY-MM-DD');

  return date;
};

const getMatchValidationDate = (day: string) => {
  const date = moment.parseZone(day).add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss[Z]');
  return date;
};

const formatDateForEventPage = (day: string) => {
  const date = moment(day).format('DD-MMM-YYYY HH:mm');

  return date;
};

const formatDateForMatchSearch = (day: string) => {
  const date = moment(day).format('DD.MM HH:mm');

  return date;
};

const formatDateForBetslipEvent = (day: string) => {
  const date = moment(day).format('DD.MMM HH:mm');

  return date;
};

// 2023-01-11T20:00:00Z

const getStartEnd = (daysOffset = 2) => {
  const today = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
  const to = moment().add(daysOffset, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');

  return {
    start: today,
    end: to,
  };
};

const formatDateForTicket = (day: string) => {
  const date = moment(day).format('DD.MM HH:mm');

  return date;
};

const formatDateForTicketEvent = (day: string) => {
  const date = moment(day).format('DD.MM');

  return date;
};

export const timeFormatService = {
  formatMatchTime,
  formatMatchDate,
  getMatchTime,
  isDateValid,
  isToday,
  getCurrentDate,
  getMatchValidationDate,
  formatDateForEventPage,
  isSameDay,
  formatLeagueDay,
  formatDateForMatchSearch,
  getStartEnd,
  formatDateForTicket,
  formatDateForTicketEvent,
  isPastDate,
  formatDateForBetslipEvent,
};
