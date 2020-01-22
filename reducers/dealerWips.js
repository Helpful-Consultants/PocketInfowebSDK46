// import { Types } from '../actions/dealerWips';
import Types from '../constants/Types';
const INITIAL_STATE = {
  dealerWipsItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null
};

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.GET_DEALER_WIPS_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: action.payload.items,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.CREATE_DEALER_WIP_SUCCESS: {
      //   console.log(action.payload);
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber:
            (action.payload.wipNumber && action.payload.wipNumber) || ''
        },
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    // case Types.UPDATE_DEALER_WIP_SUCCESS: {
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     lastWipProcessed: {
    //       code: action.payload.code,
    //       message: action.payload.message,
    //       wipNumber: action.payload.wipNumber || ''
    //     },
    //     isLoading: false,
    //     error: null
    //   };
    // }
    case Types.DELETE_DEALER_WIP_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber:
            (action.payload.wipNumber && action.payload.wipNumber) || ''
        },
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null
      };
    }
    case Types.DELETE_DEALER_WIP_TOOL_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber:
            (action.payload.wipNumber && action.payload.wipNumber) || ''
        },
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null
      };
    }
    case Types.EMPTY_DEALER_WIPS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null
      };
    }
    case Types.DEALER_WIPS_ERROR: {
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        lastWipProcessed: {},
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
