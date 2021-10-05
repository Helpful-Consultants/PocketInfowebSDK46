// import { Types } from '../actions/serviceMeasures';
import Types from '../constants/Types';
const INITIAL_STATE = {
  serviceMeasuresItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  displayTimestamp: null,
};

export default function serviceMeasures(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_SERVICE_MEASURES_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_SERVICE_MEASURES_DISPLAY_TIMESTAMP: {
      console.log('date in state is', state.displayTimestamp);
      return {
        ...state,
        displayTimestamp: new Date(),
      };
    }
    case Types.GET_SERVICE_MEASURES_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log(action.payload.items && action.payload.items);

      return {
        ...state,
        // newsItems: [],
        serviceMeasuresItems:
          (action.payload.items && action.payload.items) || [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.EMPTY_SERVICE_MEASURES_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        serviceMeasuresItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SERVICE_MEASURES_ERROR: {
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
