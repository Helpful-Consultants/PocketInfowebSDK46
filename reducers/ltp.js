import { Types } from '../actions/ltp';

const INITIAL_STATE = {
  ltpItems: []
};

export default function ltp(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_SUCCESS: {
      return {
        ...state,
        ltpItems: action.payload.items
      };
    }
    case Types.LTP_ERROR: {
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
