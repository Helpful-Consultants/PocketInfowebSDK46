// import { Types } from '../actions/stats';
import Types from '../constants/Types';

const INITIAL_STATE = {
  statsItems: [],
  isLoading: false,
  error: null
};

export default function stats(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_STATS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_STATS_SUCCESS: {
      console.log('in stats reducer');
      console.log(action.type);
      return {
        ...state,
        statsItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.STATS_ERROR: {
      return {
        ...state,
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
