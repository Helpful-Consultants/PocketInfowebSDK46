import { Types } from '../actions/odis';

const INITIAL_STATE = {
  odisItems: []
};

export default function odis(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_ODIS_SUCCESS: {
      return {
        ...state,
        odisItems: action.payload.items
      };
    }
    case Types.ODIS_ERROR: {
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
