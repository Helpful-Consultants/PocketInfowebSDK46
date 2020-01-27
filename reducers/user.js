// import { Types } from '../actions/user';
import Types from '../constants/Types';

const INITIAL_STATE = {
  userData: [],
  userBrand: null,
  userIsSignedIn: false,
  isLoading: false,
  error: null,
  dataErrorUrl: null,
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
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.GET_USER_SUCCESS: {
      //   console.log('action.payload is:', action.payload.items);
      let userBrand = null;
      let userDataBrand =
        (action.payload &&
          action.payload.items &&
          action.payload.items[0].brand &&
          action.payload.items[0].brand) ||
        null;

      userDataBrand = userDataBrand && userDataBrand.toLowerCase();

      //   console.log(action.payload && action.payload);
      //   console.log('action.payload.items ', action.payload.items);
      //   console.log('action.payload.items[0] ', action.payload.items[0]);
      //   console.log('userDataBrand is ', userDataBrand);

      switch (userDataBrand) {
        case 'audi': {
          userBrand = 'au';
        }
        case 'seat': {
          userBrand = 'se';
        }
        case 'skoda': {
          userBrand = 'sk';
        }
        case 'volkswagen': {
          userBrand = 'vw';
        }
        case 'volkswagen commercial vehicles': {
          userBrand = 'cv';
        }
      }
      //   userBrand = 'se';
      //   console.log('userBrand in reducer is ', userBrand);
      return {
        ...state,
        userIsSignedIn: true,
        userData: action.payload.items,
        userBrand: userBrand,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
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
