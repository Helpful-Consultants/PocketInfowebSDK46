import { Types } from '../actions/news';

const INITIAL_STATE = {
  newsItems: []
};

export default function news(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_NEWS_SUCCESS: {
      return {
        ...state,
        newsItems: action.payload.items
      };
    }
    case Types.NEWS_ERROR: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
