// import { Types } from '../actions/user';
import Types from '../constants/Types';

const INITIAL_STATE = {
  userData: [],
  userIsSignedIn: false,
  isLoading: false,
  error: null,
  statusCode: null
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
        error: null,
        statusCode: null
      };
    }
    case Types.GET_USER_SUCCESS: {
      //   console.log('action.payload is:', action.payload.items);
      return {
        ...state,
        userIsSignedIn: true,
        userData: action.payload.items,
        isLoading: false,
        error: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.GET_USER_INVALID_CREDS: {
      console.log('action.payload is:', action.payload.error);
      return {
        ...state,
        userIsSignedIn: false,
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.SIGN_OUT_USER_REQUEST: {
      //   console.log('action.is:', action.type);
      return {
        ...state,
        userIsSignedIn: false,
        userData: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.USER_ERROR: {
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        userIsSignedIn: false,
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
