// import { Types } from '../actions/ltpBookings';
import Types from '../constants/Types';
const INITIAL_STATE = {
  ltpBookingsItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
};

export default function ltpBookings(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_BOOKINGS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.GET_LTP_BOOKINGS_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log(action.payload.items && action.payload.items);

      return {
        ...state,
        // newsItems: [],
        ltpBookingsItems: (action.payload.items && action.payload.items) || [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.EMPTY_LTP_BOOKINGS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        ltpBookingsItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.LTP_BOOKINGS_ERROR: {
      console.log('action.type is:', action.type);
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        isLoading: false,
        isSending: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
