import { Types } from '../actions/dealerTools';

const INITIAL_STATE = {
  dealerToolsItems: []
};

export default function dealerTools(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_TOOLS_SUCCESS: {
      return {
        ...state,
        dealerToolsItems: action.payload.items
      };
    }
    case Types.EMPTY_DEALER_TOOLS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerToolsItems: []
      };
    }
    case Types.DEALER_TOOLS_ERROR: {
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
