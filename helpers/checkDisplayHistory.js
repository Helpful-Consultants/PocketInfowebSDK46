import moment from 'moment';
import {
  InfoTypes,
  InfoTypesAlertUnits,
  InfoTypesAlertAges,
} from '../constants/InfoTypes';

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

export const checkDisplayStatuses = (scope, items, displayTimestamp) => {
  //   console.log('in checkDisplayStatuses', scope, items.length);

  let displayStatuses = 0;

  if (displayTimestamp && items && items.length > 0) {
    items.map((item) => {
      let dateToCheck = null;
      let unit = 0;
      let maxAge = 0;
      switch (scope) {
        case InfoTypes.LTP_LOANS: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.LTP_LOANS || 0;
          maxAge = InfoTypesAlertAges.LTP_LOANS || 0;
        }
        case InfoTypes.NEWS: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.NEWS || 0;
          maxAge = InfoTypesAlertAges.NEWS || 0;
        }
        case InfoTypes.ODIS: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.ODIS || 0;
          maxAge = InfoTypesAlertAges.ODIS || 0;
        }
        case InfoTypes.SERVICE_MEASURES: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.SERVICE_MEASURES || 0;
          maxAge = InfoTypesAlertAges.SERVICE_MEASURES || 0;
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
