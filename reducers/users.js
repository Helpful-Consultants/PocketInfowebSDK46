import { Types } from '../actions/users';

const INITIAL_STATE = {
  items: []
};

export default function users(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items
      };
    }
    case Types.USERS_ERROR: {
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
