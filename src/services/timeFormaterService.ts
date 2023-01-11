import moment from 'moment';
import { IOddspediaMatch } from '../redux/features/oddspediaTypes';

const formatMatchDate = (day: string) => {
  const date = moment(day).format('ddd DD.MM');

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

const isToday = (day: string) => {
  const date = moment(day);

  return date.isSame(new Date(), 'day');
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

// 2023-01-11T20:00:00Z

export const timeFormatService = {
  formatMatchDate,
  getMatchTime,
  isDateValid,
  isToday,
  getCurrentDate,
  getMatchValidationDate,
  formatDateForEventPage,
};
