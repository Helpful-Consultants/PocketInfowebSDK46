// import { Types } from '../actions/news';
import Types from '../constants/Types';

const INITIAL_STATE = {
  newsItems: [],
  isLoading: false,
  error: null
};

export default function news(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_NEWS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_NEWS_SUCCESS: {
      return {
        ...state,
        // newsItems: [],
        newsItems: action.payload.items,
        isLoading: false,
        error: null
        // newsItems: []alan
      };
    }
    case Types.NEWS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
