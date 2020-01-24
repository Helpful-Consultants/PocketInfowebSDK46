// import { Types } from '../actions/news';
import Types from '../constants/Types';

const INITIAL_STATE = {
  newsItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null
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
        statusCode: null
      };
    }
    case Types.GET_NEWS_SUCCESS: {
      return {
        ...state,
        // newsItems: [],
        newsItems: action.payload.items,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
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
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
