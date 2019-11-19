import { Types } from '../actions/stats';

const INITIAL_STATE = {
  statsItems: []
};

export default function stats(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_STATS_SUCCESS: {
      console.log('in stats reducer');
      console.log(action.type);
      return {
        ...state,
        statsItems: action.payload.items
      };
    }
    case Types.STATS_ERROR: {
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
