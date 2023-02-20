import moment from 'moment';
import 'moment-timezone';

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

/**
 *
 * @param day - string
 * @returns 2 strings, start_time and end_time, that we are going to use for the API requests
 *
 */
const getStartEndDate = (day?: string) => {
  const date = day ? moment(day) : moment();

  const start = date.startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
  const end = date.endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');

  const zone = moment.tz.guess();

  const offset = moment().tz(zone).utcOffset();

  let formatedStart;
  let formatedEnd;

  if (offset < 0) {
    formatedStart = moment.utc(start).add(Math.abs(offset), 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
    formatedEnd = moment.utc(end).add(Math.abs(offset), 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
  } else {
    formatedStart = moment.utc(start).subtract(offset, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
    formatedEnd = moment.utc(end).subtract(offset, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  return {
    start: formatedStart,
    end: formatedEnd,
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

const formatDateForPlayerHeader = (day: string) => {
  const date = moment(day).format('DD.MM.YYYY');

  return date;
};

const formatDateForUrl = (day: string) => {
  const date = moment(day).format('YYYY-MM-DD');

  return date;
};

const roundToNextHour = () => {
  const now = moment();
  // Round to nearest hour and add 1 hour
  const nextHour = now.startOf('hour').add(1, 'hour');
  return nextHour.toISOString(); // Return the ISO string representation
};

export const timeFormatService = {
  formatMatchTime,
  formatMatchDate,
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
  formatDateForPlayerHeader,
  formatDateForUrl,
  getStartEndDate,
  roundToNextHour,
};
