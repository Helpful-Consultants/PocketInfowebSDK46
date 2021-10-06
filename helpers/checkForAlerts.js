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

const unseenServiceMeasuresUnit = 'days';
const unseenServiceMeasuresMaxAge = 3;
const unseenLtpLoansUnit = 'days';
const unseenLtpLoansMaxAge = 3;
const unseenNewsUnit = 'days';
const unseenNewsMaxAge = 3;
const unseenOdisMaxAge = 3;

const countUnseenItems = (
  items,
  displayTimestamp,
  unseenItemsUnit,
  unseenItemsMaxAge
) => {
  console.log(
    'in checkfor alerts, store is ',
    store ? items.length : 'notfound',
    displayTimestamp,
    items && items.length
  );

  if (
    unseenItemsUnit &&
    unseenItemsMaxAge &&
    displayTimestamp &&
    items &&
    items.length
  ) {
    return checkDisplayStatuses(
      items,
      displayTimestamp,
      unseenItemsUnit,
      unseenItemsMaxAge
    );
  } else {
    return 0;
  }
};

// const checkForAlerts = (scope = servicMeasures) => {
//   const unseenServiceMeasuresCount = countUnseenServiceMeasures();
//   console.log(
//     'in checkfor alerts, unseenServiceMeasuresCount is ',
//     unseenServiceMeasuresCount
//   );
// };

const checkForAlerts = (scope = InfoTypes.SERVICE_MEASURES) => {
  switch (scope) {
    case InfoTypes.LTP_LOANS: {
      const items = store.getState().ltpLoans.ltpLoansItems;
      const displayTimestamp = store.getState().ltpLoans.displayTimestamp;
      const unseenItemsCount = countUnseenItems(
        items,
        displayTimestamp,
        unseenLtpLoansUnit,
        unseenLtpLoansMaxAge
      );
      console.log(
        'in checkfor alerts, unseenLtpLoansCount is ',
        unseenItemsCount
      );
      return unseenItemsCount;
    }
    case InfoTypes.NEWS: {
      const items = store.getState().news.newsItems;
      const displayTimestamp = store.getState().news.displayTimestamp;
      const unseenItemsCount = countUnseenItems(
        items,
        displayTimestamp,
        unseenNewsUnit,
        unseenNewsMaxAge
      );

      console.log('in checkfor alerts, unseenNewsCount is ', unseenItemsCount);
      return unseenItemsCount;
    }
    case InfoTypes.ODIS: {
      const odisAlertCount = getOdisAlertCount(unseenOdisMaxAge);
      console.log('in checkfor alerts, odisAlertCount is ', odisAlertCount);
      return odisAlertCount;
    }
    case InfoTypes.NOTIFICATIONS: {
      const unseenItemsCount = 3;
      console.log(
        'in checkfor alerts, notificationsItemsCount is ',
        unseenItemsCount
      );
      return unseenItemsCount;
    }
    case InfoTypes.SERVICE_MEASURES: {
      const items = store.getState().serviceMeasures.serviceMeasuresItems;
      const displayTimestamp =
        store.getState().serviceMeasures.displayTimestamp;
      const unseenItemsCount = countUnseenItems(
        items,
        displayTimestamp,
        unseenServiceMeasuresUnit,
        unseenServiceMeasuresMaxAge
      );
      console.log(
        'in checkfor alerts, unseenServiceMeasuresCount is ',
        unseenItemsCount
      );
      return unseenItemsCount;
    }
    default: {
      console.log('in checkForAlerts, scope', scope);
      return 4;
    }
  }
};

export default checkForAlerts;
