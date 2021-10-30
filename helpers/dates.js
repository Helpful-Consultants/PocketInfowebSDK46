import { differenceInCalendarDays, format, parse, toDate } from 'date-fns';

const parseDateFromMilliseconds = (rawDate) => {
  const parsedDate = (rawDate && toDate(rawDate)) || null;
  console.log('parseDateFromMilliseconds', rawDate, parsedDate);
  return parsedDate;
};
const parseDateFromDDMMYYY = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy', new Date())) || null;
  console.log('parseDateFromDDMMYYY', rawDate, parsedDate);
  return parsedDate;
};
const parseDateFromDDMMYYYHHMMSS = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy HH:mm:ss', new Date())) || null;
  console.log('parseDateFromDDMMYYYHHMMSS', rawDate, parsedDate);
  return parsedDate;
};
const parseAnyDate = (rawDate) => {
  let parsedDate = null;
  let length = 0;
  console.log('$$$$ in parseAnyDate', rawDate);
  if (typeof rawDate !== 'undefined' && rawDate) {
    if (typeof rawDate === 'object') {
      parsedDate = rawDate;
      console.log(
        '-----------date object ',
        typeof rawDate,
        rawDate,
        parsedDate
      );
    } else {
      if (typeof rawDate === 'number') {
        parsedDate = parseDateFromMilliseconds(rawDate);
        console.log('millisecs', rawDate, parsedDate);
      } else length = (rawDate && rawDate.length) || 0;
      if (length === 10 && rawDate.substr(5, 3) === '/20') {
        parsedDate = parseDateFromDDMMYYY(rawDate);
        console.log('-------dd/MM/yyy', rawDate, parsedDate);
      } else if (length === 19 && rawDate.substr(5, 3) === '/20') {
        parsedDate = parseDateFromDDMMYYYHHMMSS(rawDate);
        console.log('-----------do MMM yyyy HH:mm:ss', rawDate, parsedDate);
      } else if (length === 24 && rawDate.substr(10, 1) === 'T') {
        parsedDate = rawDate;
        console.log('-----------javascript ', rawDate, parsedDate);
      } else {
        parsedDate = rawDate;
        console.log('-----------unknown ', typeof rawDate, rawDate, parsedDate);
      }
    }
  }
  return parsedDate;
};
const formatFriendlyDisplayDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatShortDisplayDate = (parsedDate) => {
  //   console.log('formatShortDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'dd/MM/yy');
  //   console.log('formatShortDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayDateAndTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy HH:mm:ss');
  console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatShortDisplayDateAndTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'dd/MM/yy HH:mm:ss');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};

export const getShortDisplayDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatShortDisplayDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getShortDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getShortDisplayDateAndTime = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatShortDisplayDateAndTime(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getShortDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getFriendlyDisplayDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};

export const getFriendlyDisplayDateAndTime = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayDateAndTime(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};

export const getDateDifference = (dateOne, dateTwo) => {
  let timeToExpiry = 0;
  console.log('***************in getDateDifference', dateOne, 'to', dateTwo);

  if (dateOne && dateTwo) {
    const parsedDateOne = parseAnyDate(dateOne);
    const parsedDateTwo = parseAnyDate(dateTwo);
    timeToExpiry = differenceInCalendarDays(parsedDateTwo, parsedDateOne);
  }
  //   console.log('expiryDate', expiryDate);
  //   console.log('££££££££ reducertimeToExpiry', timeToExpiry);
  return timeToExpiry;
};
