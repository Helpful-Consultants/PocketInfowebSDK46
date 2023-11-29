import {
  InfoTypes,
  InfoTypesAlertUnits,
  InfoTypesAlertAges,
} from '../constants/InfoTypes';
import { getDateDifference } from '../helpers/dates';

export const checkDisplayAge = (
  itemDate,
  displayTimestamp,
  unit = 'days',
  maxAge = 0
) => {
  if (displayTimestamp) {
    if (itemDate && itemDate.length > 0) {
      const timeGap = getDateDifference(lastDisplayed, itemDateToCompare);
      //   console.log('timeGap', lastDisplayed, itemDateToCompare, timeGap);
      if (timeGap <= (maxAge || 8)) {
        // console.log('in check if Unseen new');
        return true;
      } else {
        // console.log('in check if Unseen old');
        return false;
      }
    } else {
      //   console.log('in check if Unseen bad itemDate', itemDate);
      return false;
    }
  } else {
    // console.log('in check if Unseen bad displayTimestamp', displayTimestamp);
    return false;
  }
};

export const checkDisplayAges = (scope, items, displayTimestamp) => {
  //   console.log('in checkDisplayAges', scope, items.length);

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
          maxAge = InfoTypesAlertAges.LTP_LOANS_RED_PERIOD || 0;
        }
        case InfoTypes.NEWS: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.NEWS || 0;
          maxAge = InfoTypesAlertAges.NEWS_RED_PERIOD || 0;
        }
        case InfoTypes.ODIS: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.ODIS || 0;
          maxAge = InfoTypesAlertAges.ODIS_RED_PERIOD || 0;
        }
        case InfoTypes.SERVICE_MEASURES: {
          dateToCheck = item.createdDate || item.dateCreated;
          unit = InfoTypesAlertUnits.SERVICE_MEASURES || 0;
          maxAge = InfoTypesAlertAges.SERVICE_MEASURES_RED_PERIOD || 0;
        }
      }
      //   console.log('checkDisplayAges date to check', dateToCheck);
      if (checkDisplayAge(dateToCheck, displayTimestamp, unit, maxAge)) {
        // console.log('TRUE!!!!!');
        ++displayStatuses;
      }
    });
  }
  return displayStatuses;
};
