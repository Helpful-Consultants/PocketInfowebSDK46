import { Types } from '../actions/dealerWips';

const INITIAL_STATE = {
  dealerWipsItems: []
};

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_SUCCESS: {
      return {
        ...state,
        dealerWipsItems: action.payload.items
      };
    }
    case Types.DEALER_WIPS_ERROR: {
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
