// import { Types } from '../actions/ltp';
import Types from '../constants/Types';
const INITIAL_STATE = {
  ltpItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
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
        dataErrorUrl: null,
      };
    }
    case Types.GET_LTP_SUCCESS: {
      //   console.log(
      //     'ltp action items length ',
      //     action.payload && action.payload.items && action.payload.items.length
      //   );
      return {
        ...state,
        ltpItems: action.payload.items,
        isLoading: false,
        error: null,
        statusCode: null,
        dataErrorUrl: null,
      };
    }
    case Types.EMPTY_LTP_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        ltpItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.LTP_ERROR: {
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
