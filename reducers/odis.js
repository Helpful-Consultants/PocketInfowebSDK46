// import { Types } from '../actions/odis';
import Types from '../constants/Types';

const INITIAL_STATE = {
  odisItems: [],
  isLoading: false,
  error: null
};

export default function odis(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_ODIS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_ODIS_SUCCESS: {
      return {
        ...state,
        odisItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.ODIS_ERROR: {
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
