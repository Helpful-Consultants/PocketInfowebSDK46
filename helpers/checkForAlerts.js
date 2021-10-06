import { store } from './store';
import {
  getBadgeCountAsync,
  setBadgeCountAsync,
  resetBadgeCountAsync,
  incrementBadgeCountAsync,
} from './setAppBadge';
import {
  checkDisplayStatus,
  checkDisplayStatuses,
} from './checkDisplayHistory';
import getOdisAlertCount from './getOdisAlertCount';
import InfoTypes from '../constants/InfoTypes';

import ltpLoansDummyData from '../dummyData/ltpLoansDummyData';
import newsDummyData from '../dummyData/newsDummyData';
import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData';

const unseenServiceMeasuresUnit = 'days';
const unseenServiceMeasuresMaxAge = 3;
const unseenLtpLoansUnit = 'days';
const unseenLtpLoansMaxAge = 3;
const unseenNewsUnit = 'days';
const unseenNewsMaxAge = 7;
const unseenOdisMaxAge = 3;

const countUnseenItems = (
  scope,
  items,
  displayTimestamp,
  unseenItemsUnit,
  unseenItemsMaxAge
) => {
  console.log(
    'in countUnseenItems for',
    scope,
    'there are ',
    items && items.length,
    ' items;',

    ' max age is ',
    unseenItemsUnit,
    ' ',
    unseenItemsMaxAge,
    ' ; displayTimestamp is ',
    displayTimestamp
  );
  if (displayTimestamp) {
    if (
      unseenItemsUnit &&
      unseenItemsMaxAge &&
      displayTimestamp &&
      items &&
      items.length
    ) {
      return checkDisplayStatuses(
        scope,
        items,
        displayTimestamp,
        unseenItemsUnit,
        unseenItemsMaxAge
      );
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const checkForAlerts = (scope) => {
  const requestedDemoData = store.getState().user.requestedDemoData;
  //   console.log('in checkForAlerts, scope is', scope);
  switch (scope) {
    case InfoTypes.LTP_LOANS: {
      let unseenItemsCount = 0;
      const items = requestedDemoData
        ? ltpLoansDummyData
        : store.getState().ltpLoans.ltpLoansItems;
      let displayTimestamp = store.getState().ltpLoans.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = countUnseenItems(
          scope,
          items,
          displayTimestamp,
          unseenLtpLoansUnit,
          unseenLtpLoansMaxAge
        );
        // console.log(
        //   'in checkForAlerts for:',
        //   scope,
        //   items.length,
        //   'items; displayTimestamp:',
        //   displayTimestamp,
        //   'unseenNewsCount:',
        //   unseenItemsCount
        // );
      }
      return unseenItemsCount;
    }
    case InfoTypes.NEWS: {
      let unseenItemsCount = 0;
      const items = requestedDemoData
        ? newsDummyData
        : store.getState().news.newsItems;
      //   console.log('in checkForAlerts', scope, items.length);
      let displayTimestamp = store.getState().news.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = countUnseenItems(
          scope,
          items,
          displayTimestamp,
          unseenNewsUnit,
          unseenNewsMaxAge
        );
        // console.log(
        //   'in checkForAlerts for:',
        //   scope,
        //   items.length,
        //   'items; displayTimestamp:',
        //   displayTimestamp,
        //   'unseenNewsCount:',
        //   unseenItemsCount
        // );
      }
      return unseenItemsCount;
    }
    case InfoTypes.ODIS: {
      let unseenItemsCount = 0;
      let displayTimestamp = store.getState().odis.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = getOdisAlertCount(unseenOdisMaxAge);
      }
      //   console.log('in checkfor alerts, odisAlertCount is ', unseenItemsCount);
      return unseenItemsCount;
    }
    case InfoTypes.NOTIFICATIONS: {
      let unseenItemsCount = 3;
      //   console.log(
      //     'in checkfor alerts, notificationsItemsCount is ',
      //     unseenItemsCount
      //   );

      return unseenItemsCount;
    }
    case InfoTypes.SERVICE_MEASURES: {
      let unseenItemsCount = 0;
      const items = requestedDemoData
        ? serviceMeasuresDummyData
        : store.getState().serviceMeasures.serviceMeasuresItems;

      let displayTimestamp = store.getState().serviceMeasures.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = countUnseenItems(
          scope,
          items,
          displayTimestamp,
          unseenServiceMeasuresUnit,
          unseenServiceMeasuresMaxAge
        );
        // console.log(
        //   'in checkForAlerts for:',
        //   scope,
        //   items.length,
        //   'items; displayTimestamp:',
        //   displayTimestamp,
        //   'unseenNewsCount:',
        //   unseenItemsCount
        // );
      }
      return unseenItemsCount;
    }
    default: {
      console.log('in checkForAlerts, scope', scope);
      return 0;
    }
  }
};

export default checkForAlerts;
