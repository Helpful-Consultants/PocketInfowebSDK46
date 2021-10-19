// import { Types } from '../actions/odis';
// import odisDummyData from '../dummyData/odisDummyData';
import Types from '../constants/Types';
// import moment from 'moment';

const INITIAL_STATE = {
  backgroundDataItems: {},
  viewCount: 0,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  fetchTime: null,
};

export default function backgroundData(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    //   console.log('state', state && state);

    case Types.GET_BACKGROUND_DATA_START: {
      console.log(
        'state in reducer; GET_BACKGROUND_DATA_START',
        state && state
      );
      const fetchTime = Date.now();
      //   console.log('action.type is:', action.type, 'fetchTime', fetchTime);

      return {
        ...state,
        fetchTime: fetchTime,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }

    case Types.GET_BACKGROUND_DATA_SUCCESS: {
      console.log(
        'state in reducer; GET_BACKGROUND_DATA_SUCCESS',
        state && state
      );
      //   console.log('from API', action.payload.items && action.payload.items);
      const fetchTime = Date.now();
      return {
        ...state,
        backgroundDataItems:
          (action.payload.items && action.payload.items) || {},
        fetchTime: fetchTime,
        // odisData: {},
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.BACKGROUND_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
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
