// import { Types } from '../actions/stats';
import Types from '../constants/Types';

const INITIAL_STATE = {
  statsItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null
};

export default function stats(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('stats action.type is:', action.type);
  switch (action.type) {
    case Types.GET_STATS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        statusCode: null,
        dataErrorUrl: null
      };
    }
    case Types.GET_STATS_SUCCESS: {
      //   console.log('in stats reducer');
      //   console.log(action.type);
      return {
        ...state,
        statsItems: action.payload.items,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.STATS_ERROR: {
      console.log('stats error action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        statsItems: [],
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
