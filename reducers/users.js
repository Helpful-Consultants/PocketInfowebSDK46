// import { Types } from '../actions/users';
import Types from '../constants/Types';

const INITIAL_STATE = {
  usersItems: [],
  isLoading: false,
  error: null,
};

export default function users(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USERS_START: {
      return {
        ...state,

        isLoading: true,
        error: null,
      };
    }
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        usersItems: action.payload.items,
        isLoading: false,
        error: null,
      };
    }
    case Types.USERS_ERROR: {
      return {
        ...state,
        isLoading: false,

        error: action.payload.error,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
