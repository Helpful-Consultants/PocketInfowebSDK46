// import { Types } from '../actions/dealerTools';
import Types from '../constants/Types';

const INITIAL_STATE = {
  dealerToolsItems: [],
  isLoading: false,
  error: null
};

export default function dealerTools(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_TOOLS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_DEALER_TOOLS_SUCCESS: {
      return {
        ...state,
        dealerToolsItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.EMPTY_DEALER_TOOLS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerToolsItems: [],
        isLoading: false,
        error: null
      };
    }
    case Types.DEALER_TOOLS_ERROR: {
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
