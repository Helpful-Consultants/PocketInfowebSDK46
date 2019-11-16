import { Types } from '../actions/user';

const INITIAL_STATE = {
  userData: []
};

export default function user(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload.items
      };
    }
    case Types.USER_ERROR: {
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
