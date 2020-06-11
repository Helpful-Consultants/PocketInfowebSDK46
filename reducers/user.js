// import { Types } from '../actions/user';
import Types from '../constants/Types';
import moment from 'moment';

const INITIAL_STATE = {
  userData: [],
  userBrand: null,
  userApiFetchParamsObj: null,
  userIsSignedIn: false,
  userIsValidated: false,
  userEmail: null,
  userPin: null,
  userName: null,
  userIsValidated: false,
  lastUpdate: null,
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
        statusCode: null,
        userApiFetchParamsObj: null
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

      let userName =
        (action.payload &&
          action.payload.items &&
          action.payload.items[0].userName &&
          action.payload.items[0].userName) ||
        null;
      let dealerName =
        (action.payload &&
          action.payload.items &&
          action.payload.items[0].dealerName &&
          action.payload.items[0].dealerName) ||
        null;
      let userPin =
        (action.payload && action.payload.userPin && action.payload.userPin) ||
        null;
      let userId =
        (action.payload &&
          action.payload.items &&
          action.payload.items[0].userId &&
          action.payload.items[0].userId) ||
        null;

      userDataBrand = userDataBrand && userDataBrand.toLowerCase();

      let userApiFetchParamsObj =
        action.payload &&
        action.payload.items &&
        action.payload.items[0] &&
        action.payload.items[0].dealerId &&
        action.payload.items[0].intId
          ? {
              dealerId: action.payload.items[0].dealerId.toString(),
              intId: action.payload.items[0].intId.toString()
            }
          : null;

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
        userIsValidated: true,
        userData: action.payload.items,
        userName: userName,
        userPin: userPin,
        userId: userId,
        dealerName: dealerName,
        userBrand: userBrand,
        userApiFetchParamsObj: userApiFetchParamsObj,
        lastUpdate: moment(),
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    // case Types.GET_USER_INVALID_CREDENTIALS: {
    //   //   console.log('action.payload is:', action.payload.error);
    //   return {
    //     ...state,
    //     userIsValidated: false,
    //     userIsValidated: false,
    //     isLoading: false,
    //     error: (action.payload.error && action.payload.error) || null,
    //     dataErrorUrl: null,
    //     statusCode:
    //       (action.payload.statusCode && action.payload.statusCode) || null
    //   };
    // }
    case Types.SET_USER_OUTDATED_CREDENTIALS: {
      //   console.log('action.payload is:', action.payload.error);
      return {
        ...state,
        userIsValidated: false
      };
    }
    case Types.SET_USER_VALIDATED: {
      //   console.log('action.payload is:', action.payload.error);
      return {
        ...state,
        userIsSignedIn: true,
        userIsValidated: true
      };
    }

    case Types.REVALIDATE_USER_CREDENTIALS: {
      //   console.log('actionis:', action.payload && action.payload);
      const ageOfCredentialsLimit = 90;
      let now = moment();
      let revalidatedUser = false;
      //   console.log(
      //     'in revalidateUserCredentials',
      //     action.payload && action.payload.calledBy && action.payload.calledBy
      //   );
      if (state.userIsSignedIn && state.userIsSignedIn === true) {
        if (state.lastUpdate) {
          console.log('now:', now);
          let ageOfCredentials = now.diff(state.lastUpdate, 'days');
          console.log('ageOfCredentials:', ageOfCredentials);
          if (ageOfCredentials <= ageOfCredentialsLimit) {
            revalidatedUser = true;
            // console.log('ageOfCredentials good', ageOfCredentials);
          }
        }
      }
      console.log(
        'in revalidateUserCredentials, userIsValidated',
        revalidatedUser
      );
      return {
        ...state,
        userIsValidated: revalidatedUser
      };
    }

    case Types.SIGN_OUT_USER_REQUEST: {
      //   console.log('action.is:', action.type);
      return {
        ...state,
        userIsSignedIn: false,
        userIsValidated: false,
        userData: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.USER_ERROR: {
      //   console.log('action.payload starts');
      //   console.log(action.payload);
      //   console.log('action.payload ends');
      return {
        ...state,
        userIsSignedIn: false,
        userIsValidated: false,
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
