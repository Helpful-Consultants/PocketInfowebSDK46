// import { Types } from '../actions/news';
import Types from '../constants/Types';
import { getDateOfLatestCriticalNewsItem } from '../helpers/news';
import { getDateDifference } from '../helpers/dates';
import { InfoTypesAlertAges } from '../constants/InfoTypes';

const INITIAL_STATE = {
  newsItems: [],
  viewCount: 0,
  redCount: 0,
  lastUpdate: null,
  latestCriticalItemDate: null,
  unseenCriticalItems: false,
  previousUpdate: null,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  displayTimestamp: null,
};

const countCriticalItems = (items) => {
  let count = 0;

  if (items && items.length > 0) {
    items.map((item) => {
      if (
        item.businessCritical &&
        item.businessCritical.length > 0 &&
        (item.businessCritical.toLowerCase() === 'y' ||
          item.businessCritical.toLowerCase() === 'yes' ||
          item.businessCritical.toLowerCase() === 'true')
      ) {
        count++;
      }
    });
  }

  return count;
};
const checkUnseenCriticalItems = (
  latestCriticalItemDate = null,
  displayTimestamp = null
) => {
  const ageOfView = getDateDifference(
    (latestCriticalItemDate, displayTimestamp, true)
  );
  const minAge = InfoTypesAlertAges.NEWS_RED_PERIOD;

  //   console.log(
  //     'in checkUnseenCriticalItems',
  //     'ageOfView',
  //     ageOfView,
  //     'latestCriticalItemDate',
  //     latestCriticalItemDate,
  //     'displayTimestamp',
  //     displayTimestamp
  //   );

  const unseenCriticalItems = ageOfView > minAge ? 0 : 1;

  return unseenCriticalItems;
};

export default function news(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_NEWS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_NEWS_DISPLAY_TIMESTAMP: {
      //   console.log(
      //     'date in state is',
      //     state.displayTimestamp,
      //     'setting to',
      //     Date.now()
      //   );
      const itemsList = state.newsItems;

      const dateOfLatestCriticalNewsItem =
        getDateOfLatestCriticalNewsItem(itemsList);
      const redCount = countCriticalItems(itemsList);
      const unseenCriticalItems = state.displayTimestamp
        ? redCount
          ? dateOfLatestCriticalNewsItem
            ? checkUnseenCriticalItems(
                dateOfLatestCriticalNewsItem,
                state.displayTimestamp
              )
            : 0
          : 0
        : 1;

      //   console.log(
      //     'in news reducer setting timestamp',
      //     'redCount',
      //     redCount,
      //     'dateOfLatestCriticalNewsItem',
      //     dateOfLatestCriticalNewsItem,
      //     'state.displayTimestamp',in appnav useEffect
      //     state.displayTimestamp,
      //     'unseenCriticalItems',
      //     unseenCriticalItems
      //   );
      return {
        ...state,
        unseenCriticalItems: unseenCriticalItems,
        displayTimestamp: Date.now(),
      };
    }
    case Types.GET_NEWS_SUCCESS: {
      //   console.log(action.payload.items && action.payload.items);
      const newlastUpdate =
        (action.payload.items &&
          action.payload.items[0] &&
          action.payload.items[0].lastUpdated &&
          action.payload.items[0].lastUpdated) ||
        null;

      //   const newPreviousUpdated =
      //     (state.previousUpdated &&
      //       state.lastUpdated &&
      //       state.previousUpdated !== newlastUpdated &&
      //       state.lastUpdated) ||
      //     null;
      const itemsList = (action.payload.items && action.payload.items) || [];
      const dateOfLatestCriticalNewsItem =
        getDateOfLatestCriticalNewsItem(itemsList);
      const redCount = countCriticalItems(itemsList);
      const unseenCriticalItems = state.displayTimestamp
        ? redCount
          ? dateOfLatestCriticalNewsItem
            ? checkUnseenCriticalItems(
                dateOfLatestCriticalNewsItem,
                state.displayTimestamp
              )
            : 0
          : 0
        : 1;

      //   console.log(
      //     'in news reducer, saving news',
      //     'redCount',
      //     redCount,
      //     'dateOfLatestCriticalNewsItem',
      //     dateOfLatestCriticalNewsItem,
      //     'state.displayTimestamp',
      //     state.displayTimestamp,
      //     'unseenCriticalItems',
      //     unseenCriticalItems
      //   );
      return {
        ...state,
        // newsItems: [],
        newsItems: itemsList,
        latestCriticalItemDate: dateOfLatestCriticalNewsItem,
        redCount: redCount,
        unseenCriticalItems: unseenCriticalItems,
        previousUpdate: (state.lastUpdate && state.lastUpdate) || newlastUpdate,
        lastUpdate: newlastUpdate,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.INCREMENT_NEWS_VIEW_COUNT: {
      //   console.log('in odis reducer increment view couunt ');
      let oldViewCount = (state && state.viewCount) || 0;

      return {
        ...state,
        viewCount: oldViewCount + 1,
      };
    }
    case Types.RESET_NEWS_VIEW_COUNT: {
      return {
        ...state,
        viewCount: 0,
      };
    }
    case Types.NEWS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
