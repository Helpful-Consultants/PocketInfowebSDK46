import moment from 'moment';
import InfoTypes from '../constants/InfoTypes';

export const checkDisplayStatus = (
  itemDate,
  displayTimestamp,
  unit = 'days',
  maxAge = 0
) => {
  //   console.log(
  //     'in check if Unseen, params',
  //     itemDate,
  //     typeof itemDate,
  //     moment(itemDate, 'DD/MM/YYYY HH:mm:ss'),
  //     displayTimestamp,
  //     typeof displayTimestamp,
  //     moment(displayTimestamp)
  //   );
  if (displayTimestamp) {
    if (itemDate && itemDate.length > 0) {
      const lastDisplayed = moment(displayTimestamp);
      const itemDateToCompare = moment(itemDate, 'DD/MM/YYYY HH:mm:ss');
      const timeGap = lastDisplayed.diff(itemDateToCompare, unit); // 1
      //   console.log('timeGap', lastDisplayed, itemDateToCompare, timeGap);
      // if (moment(itemDate, 'DD/MM/YYYY HH:mm:ss').isAfter(displayTimestamp)) {
      if (timeGap <= (maxAge || 8)) {
        // whenCreated = moment(itemDate, 'DD/MM/YYYY HH:mm:ss');
        // if (makeDate(itemDate) > new Date(displayTimestamp)) {

        // console.log('in check if Unseen new');
        return true;
      } else {
        // console.log('in check if Unseen old');
        return false;
      }
    } else {
      console.log('in check if Unseen bad itemDate', itemDate);
      return false;
    }
  } else {
    console.log('in check if Unseen bad displayTimestamp', displayTimestamp);
    return false;
  }
};

export const checkDisplayStatuses = (
  scope,
  items,
  displayTimestamp,
  unit = 'seconds',
  maxAge = 0
) => {
  //   console.log('in checkDisplayStatuses', scope, items.length);

  let displayStatuses = 0;

  if (displayTimestamp && items && items.length > 0) {
    items.map((item) => {
      let dateToCheck = null;
      switch (scope) {
        case InfoTypes.LTP_LOANS: {
          dateToCheck = item.createdDate || item.dateCreated;
        }
        case InfoTypes.NEWS: {
          dateToCheck = item.createdDate || item.dateCreated;
        }
        case InfoTypes.ODIS: {
          dateToCheck = item.createdDate || item.dateCreated;
        }
        case InfoTypes.SERVICE_MEASURES: {
          dateToCheck = item.createdDate || item.dateCreated;
        }
      }
      //   console.log('checkDisplayStatuses date to check', dateToCheck);
      if (checkDisplayStatus(dateToCheck, displayTimestamp, unit, maxAge)) {
        // console.log('TRUE!!!!!');
        ++displayStatuses;
      }
    });
  }
  return displayStatuses;
};
