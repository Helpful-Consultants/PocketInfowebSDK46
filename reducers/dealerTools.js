// import { Types } from '../actions/dealerTools';
import Types from '../constants/Types';

const INITIAL_STATE = {
  dealerToolsItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  statusCode: null
};

export default function dealerTools(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_TOOLS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.GET_DEALER_TOOLS_SUCCESS: {
      //   console.log(action.payload.statusCode && action.payload.statusCode);
      action.payload.items.sort((a, b) => a.partNumber > b.partNumber);
      return {
        ...state,
        dealerToolsItems: action.payload.items,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.EMPTY_DEALER_TOOLS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerToolsItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.DEALER_TOOLS_ERROR: {
      console.log(action && action.payload);
      return {
        ...state,
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
