import { Types } from '../actions/userWips';

const INITIAL_STATE = {
  userWipItems: []
};

export default function userWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USER_WIPS_SUCCESS: {
      return {
        ...state,
        userWipItems: action.payload.items
      };
    }
    case Types.USER_WIPS_ERROR: {
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
