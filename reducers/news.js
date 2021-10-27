// import { Types } from '../actions/news';
import Types from '../constants/Types';

const INITIAL_STATE = {
  newsItems: [],
  viewCount: 0,
  redCount: 0,
  lastUpdate: null,
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
      //   console.log('date in state is', state.displayTimestamp);
      return {
        ...state,
        displayTimestamp: new Date(),
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
      return {
        ...state,
        // newsItems: [],
        newsItems: itemsList,
        redCount: countCriticalItems(itemsList),
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
