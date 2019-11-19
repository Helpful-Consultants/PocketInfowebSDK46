import { Types } from '../actions/user';

const INITIAL_STATE = {
  userData: [],
  userIsSignedIn: false
};

export default function user(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('in user reducer');
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      console.log('action.payload is:', action.payload.items);
      return {
        ...state,
        userData: action.payload.items,
        userIsSignedIn: true
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
