// import { Types } from '../actions/ltp';
import Types from '../constants/Types';
const INITIAL_STATE = {
  ltpItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null
};

export default function ltp(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        statusCode: null,
        dataErrorUrl: null
      };
    }
    case Types.GET_LTP_SUCCESS: {
      action.payload.items.sort((a, b) => a.loanToolNo > b.loanToolNo);
      return {
        ...state,
        ltpItems: action.payload.items,
        isLoading: false,
        error: null,
        statusCode: null,
        dataErrorUrl: null
      };
    }
    case Types.LTP_ERROR: {
      console.log('action is', action);
      return {
        ...state,
        ltpItems: [],
        isLoading: false,
        error: action.payload.error,
        statusCode: action.payload.statusCode || null,
        dataErrorUrl: action.payload.dataErrorUrl
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
