import { Types } from '../actions/dealerWips';

const INITIAL_STATE = {
  dealerWipsItems: []
};

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: action.payload.items
      };
    }
    case Types.CREATE_DEALER_WIP_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber: action.payload.wipNumber || ''
        }
      };
    }
    case Types.EMPTY_DEALER_WIPS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: []
      };
    }
    case Types.DEALER_WIPS_ERROR: {
      return {
        ...state,
        lastWipProcessed: {},
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
