import { differenceInCalendarDays, format, parse } from 'date-fns';

export const getDisplayDateFromDDMMYYY = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy', new Date())) || null;
  //   console.log('rrrrrrrrrrrrrrrawDate', rawDate, parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy');
  //   console.log('ddddddddddddddisplayDate', displayDate);
  return displayDate;
};
export const getDisplayDateFromDDMMYYYHHMMSS = (rawDate) => {
  const parsedDate =
    (rawDate && parse(rawDate, 'dd/MM/yyyy', new Date())) || null;
  //   console.log('rrrrrrrrrrrrrrrawDate', rawDate, parsedDate);
  const displayDate = parsedDate && format(parsedDate, 'do MMM yyyy');
  //   console.log('ddddddddddddddisplayDate', displayDate);
  return displayDate;
};
export const getDisplayDateFromDate = (rawDate) => {
  const displayDate = format(rawDate, 'do MMM yyyy');
  //   console.log('ddddddddddddddisplayDate', displayDate);
  return displayDate;
};

export const getDateDifference = (dateOne, dateTwo) => {
  let timeToExpiry = 0;
  // console.log('***************in getDateDifference', dateOne, 'to', dateTwo);

  if (dateOne && dateTwo) {
    timeToExpiry = differenceInCalendarDays(dateTwo, dateOne);
  }
  //   console.log('expiryDate', expiryDate);
  //   console.log('££££££££ reducertimeToExpiry', timeToExpiry);

  return timeToExpiry;
};
