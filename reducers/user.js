import { Types } from '../actions/user';

const INITIAL_STATE = {
  userData: [],
  userIsSignedIn: false
};

export default function user(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('in user reducer');
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      console.log('action.payload is:', action.payload.items);
      return {
        ...state,
        userIsSignedIn: true,
        userData: action.payload.items
      };
    }
    case Types.SIGN_OUT_USER_REQUEST: {
      console.log('action.is:', action.type);
      return {
        ...state,
        userIsSignedIn: false,
        userData: []
      };
    }
    case Types.USER_ERROR: {
      return {
        ...state,
        userIsSignedIn: false,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
