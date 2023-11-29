import { store } from './store';
import {
  getBadgeCountAsync,
  setBadgeCountAsync,
  resetBadgeCountAsync,
  incrementBadgeCountAsync,
} from '../helpers/appBadge';
import { checkDisplayAge, checkDisplayAges } from './checkDisplayHistory';
import { getOdisAlertCount } from './odis';
import { InfoTypes, InfoTypesAlertAges } from '../constants/InfoTypes';

import ltpLoansDummyData from '../dummyData/ltpLoansDummyData';
import newsDummyData from '../dummyData/newsDummyData';
import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData';

export const countNotifiableItems = () => {
  let alertsCount = 0;
  let serviceMeasuresCountsObj =
    store.getState().serviceMeasures.serviceMeasuresCounts;

  //   console.log(
  //     'A in countNotifiableItems',
  //     serviceMeasuresCountsObj,
  //     'alertsCount',
  //     alertsCount
  //   );
  if (
    serviceMeasuresCountsObj &&
    (serviceMeasuresCountsObj.redCount ||
      serviceMeasuresCountsObj.redCount === 0)
  ) {
    alertsCount = serviceMeasuresCountsObj.redCount;

    console.log(
      'B in countNotifiableItems',
      serviceMeasuresCountsObj,
      'alertsCount',
      alertsCount
    );

    setBadgeCountAsync(alertsCount);
  }
};

export const countUnseenItems = (scope, items, displayTimestamp) => {
  //   console.log(
  //     'in countUnseenItems for',
  //     scope,
  //     'there are ',
  //     items && items.length,
  //     ' items;',
  //     ' ; displayTimestamp is ',
  //     displayTimestamp
  //   );
  if (displayTimestamp) {
    if (displayTimestamp && items && items.length) {
      return checkDisplayAges(scope, items, displayTimestamp);
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export const checkUnseenItems = (scope) => {
  const requestedDemoData = store.getState().user.requestedDemoData;
  //   console.log('in checkUnseenItems, scope is', scope);
  switch (scope) {
    case InfoTypes.LTP_LOANS: {
      let unseenItemsCount = 0;
      const items = requestedDemoData
        ? ltpLoansDummyData
        : store.getState().ltpLoans.ltpLoansItems;
      let displayTimestamp = store.getState().ltpLoans.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = countUnseenItems(scope, items, displayTimestamp);
        // console.log(
        //   'in checkUnseenItems for:',
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
      //   console.log('in checkUnseenItems', scope, items.length);
      let displayTimestamp = store.getState().news.displayTimestamp;
      if (displayTimestamp) {
        unseenItemsCount = countUnseenItems(scope, items, displayTimestamp);
        // console.log(
        //   'in checkUnseenItems for:',
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
        unseenItemsCount = getOdisAlertCount(
          InfoTypesAlertAges.ODIS_RED_PERIOD
        );
      }
      //   console.log('in checkfor alerts, odisChangesToHighlight is ', odisChangesToHighlight);
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
        unseenItemsCount = countUnseenItems(scope, items, displayTimestamp);
        // console.log(
        //   'in checkUnseenItems for:',
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
      //   console.log('in checkUnseenItems, scope', scope);
      return 0;
    }
  }
};
