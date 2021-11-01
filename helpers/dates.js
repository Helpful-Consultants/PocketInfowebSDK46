import {
  compareAsc,
  compareDesc,
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  isThisYear,
  parse,
  toDate,
} from 'date-fns';

const parseDateFromMilliseconds = (rawDate) => {
  const parsedDate = (rawDate && toDate(rawDate)) || null;
  //   console.log('parseDateFromMilliseconds', rawDate, parsedDate);
  return parsedDate;
};
const parseDateFromDDMMYYY = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy', new Date())) || null;
  //   console.log('parseDateFromDDMMYYY', rawDate, parsedDate);
  return parsedDate;
};
const parseDateFromDDMMYYYHHMMSS = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy HH:mm:ss', new Date())) || null;
  //   console.log('parseDateFromDDMMYYYHHMMSS', rawDate, parsedDate);
  return parsedDate;
};
const parseAnyDate = (rawDate) => {
  let parsedDate = null;
  let length = 0;
  //   console.log('$$$$ in parseAnyDate', rawDate);
  if (typeof rawDate !== 'undefined' && rawDate) {
    if (typeof rawDate === 'object') {
      parsedDate = rawDate;
      //   console.log(
      //     '-----------date object ',
      //     typeof rawDate,
      //     rawDate,
      //     parsedDate
      //   );
    } else {
      if (typeof rawDate === 'number') {
        parsedDate = parseDateFromMilliseconds(rawDate);
        // console.log('millisecs', rawDate, parsedDate);
      } else {
        length = rawDate.length || 0;
        if (length === 10 && rawDate.substr(5, 3) === '/20') {
          parsedDate = parseDateFromDDMMYYY(rawDate);
          //   console.log('-------dd/MM/yyy', rawDate, parsedDate);
        } else if (length === 19 && rawDate.substr(5, 3) === '/20') {
          parsedDate = parseDateFromDDMMYYYHHMMSS(rawDate);
          //   console.log('-----------do MMM yyyy HH:mm:ss', rawDate, parsedDate);
        } else if (length === 24 && rawDate.substr(10, 1) === 'T') {
          parsedDate = rawDate;
          //   console.log('-----------javascript ', rawDate, parsedDate);
        } else {
          parsedDate = rawDate;
          //   console.log(
          //     '-----------unknown ',
          //     typeof rawDate,
          //     rawDate,
          //     parsedDate
          //   );
        }
      }
    }
  }
  return parsedDate;
};
const formatShortDisplayDate = (parsedDate) => {
  //   console.log('formatShortDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'dd/MM/yy');
  //   console.log('formatShortDisplayDate output', displayDate);
  return displayDate;
};
const formatShortDisplayDateAndShortTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'dd/MM/yy HH:mm');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatShortDisplayDateAndLongTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'dd/MM/yy HH:mm:ss');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayShortDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yy');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayDayMonth = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayDateAndShortTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy h:mma');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayDateAndLongTime = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy h:mm:ssa');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayShortTimeAndShortDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'h:mma, do MMM yy');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayShortTimeAndLongDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'h:mmbbb, eeee do MMM');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayLongDateNoYear = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'eee do MMM');
  //   console.log('formatFriendlyDisplayDate output', displayDate);
  return displayDate;
};
const formatFriendlyDisplayLongDate = (parsedDate) => {
  //   console.log('formatFriendlyDisplayDate input', parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'eee do MMM yy');
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
  displayDate = formatShortDisplayDateAndShortTime(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getShortDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getShortDisplayDateAndLongTime = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatShortDisplayDateAndLongTime(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
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

export const getFriendlyDisplayShortDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);

  displayDate = parsedDate
    ? isThisYear(parsedDate)
      ? formatFriendlyDisplayDayMonth(parsedDate)
      : formatFriendlyDisplayShortDate(parsedDate)
    : '';
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getFriendlyDisplayLongDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);

  displayDate = parsedDate
    ? isThisYear(parsedDate)
      ? formatFriendlyDisplayLongDateNoYear(parsedDate)
      : formatFriendlyDisplayLongDate(parsedDate)
    : '';
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};

export const getFriendlyDisplayDateAndShortTime = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayShortTimeAndDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};

export const getFriendlyDisplayDateAndLongTime = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayDateAndLongTime(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getFriendlyDisplayLongTimeAndShortDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayLongTimeAndShortDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getFriendlyDisplayShortTimeAndShortDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayShortTimeAndShortDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};
export const getFriendlyDisplayShortTimeAndLongDate = (rawDate) => {
  let displayDate = '';
  let parsedDate = parseAnyDate(rawDate);
  displayDate = formatFriendlyDisplayShortTimeAndLongDate(parsedDate) || null;
  //   console.log(
  //     '$$$$ in getFriendlyDisplayDate',
  //     rawDate,
  //     'changed to',
  //     displayDate
  //   );
  return displayDate;
};

export const getDateDifference = (dateOne, dateTwo, log = false) => {
  let timeToExpiry = 0;
  log &&
    console.log('***************in getDateDifference', dateOne, 'to', dateTwo);

  if (dateOne && dateTwo) {
    const parsedDateOne = parseAnyDate(dateOne);
    const parsedDateTwo = parseAnyDate(dateTwo);
    timeToExpiry = differenceInCalendarDays(parsedDateTwo, parsedDateOne);
  }

  log && console.log('££££££££ getDateDifference result', timeToExpiry);
  return timeToExpiry;
};

export const isDateAfter = (dateOne, dateTwo) => {
  let isItAfter = 0;
  //   console.log('***************in isDateAfter', dateOne, 'to', dateTwo);

  if (dateOne && dateTwo) {
    const parsedDateOne = parseAnyDate(dateOne);
    const parsedDateTwo = parseAnyDate(dateTwo);
    isItAfter = isAfter(parsedDateOne, parsedDateTwo);
  }
  //   console.log(
  //     '@@@@@@@@@firstDate',
  //     dateOne,
  //     'parsedDateTwo',
  //     dateTwo,
  //     isItAfter
  //   );
  //   console.log('££££££££ reducertimeToExpiry', timeToExpiry);
  return isItAfter;
};

const zzzzcompareObjectValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = a[key].localeCompare(b[key]);

    return order === 'desc' ? comparison * -1 : comparison;
  };
};

const dateThisYear = (parsedDate) => {
  let dateIsThisYear = true;

  if (parsedDate) {
    dateIsThisYear = isThisYear(parsedDate);
  }
  //   console.log('expiryDate', expiryDate);
  //   console.log('££££££££ reducertimeToExpiry', timeToExpiry);
  return dateIsThisYear;
};

const compareObjectValues = (key, order = 'asc') => {
  //   console.log('compareObjectValues', key, order);
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const parsedDateA = parseAnyDate(a[key]);
    const parsedDateB = parseAnyDate(b[key]);

    const comparisonTrueFalse =
      order === 'asc'
        ? isBefore(parsedDateA, parsedDateB)
        : isAfter(parsedDateA, parsedDateB);

    // const comparison = a[key].localeCompare(b[key]);
    const comparisonNumber = comparisonTrueFalse ? 1 : 0;
    // console.log(
    //   '^^^^^^^^^^^^in compareObjectValues',
    //   parsedDateA,
    //   parsedDateB,
    //   comparisonTrueFalse,
    //   comparisonNumber
    // );

    return comparisonNumber * -1;
  };
};

export const sortObjListByDate = (objArr = [], key = '', order = 'asc') => {
  //   console.log(objArr.length, key, order);
  return objArr.sort(compareObjectValues(key, order));
};
