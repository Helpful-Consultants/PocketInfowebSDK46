// import { Types } from '../actions/user';
import Types from '../constants/Types';

const INITIAL_STATE = {
  userData: [],
  userIsSignedIn: false,
  isLoading: false,
  error: null
};

export default function user(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('in user reducer');
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USER_START: {
      return {
        ...state,
        userData: [],
        isLoading: true,
        error: null
      };
    }
    case Types.GET_USER_SUCCESS: {
      console.log('action.payload is:', action.payload.items);
      return {
        ...state,
        userIsSignedIn: true,
        userData: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.GET_USER_INVALID_CREDS: {
      console.log('action.payload is:', action.payload.error);
      return {
        ...state,
        userIsSignedIn: false,
        isLoading: false,

        error: action.payload.error
      };
    }
    case Types.SIGN_OUT_USER_REQUEST: {
      console.log('action.is:', action.type);
      return {
        ...state,
        userIsSignedIn: false,
        userData: [],
        isLoading: false,
        error: null
      };
    }
    case Types.USER_ERROR: {
      console.log('action.is:', action);
      return {
        ...state,
        userIsSignedIn: false,
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
