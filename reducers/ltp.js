// import { Types } from '../actions/ltp';
import Types from '../constants/Types';
const INITIAL_STATE = {
  ltpItems: [],
  isLoading: false,
  error: null
};

export default function ltp(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_LTP_SUCCESS: {
      return {
        ...state,
        ltpItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.LTP_ERROR: {
      return {
        ...state,
        isLoading: false,
        ltpItems: [],
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
