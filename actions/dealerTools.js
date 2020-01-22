// export const Types = {
//   EMPTY_DEALER_TOOLS_REQUEST: 'dealerTools/empty_dealer_tools_request',
//   GET_DEALER_TOOLS_REQUEST: 'dealerTools/get_dealer_tools_request',
//   GET_DEALER_TOOLS_SUCCESS: 'dealerTools/get_dealer_tools_success',
//   DEALER_TOOLS_ERROR: 'dealerTools/dealer_tools_error'
// };
import Types from '../constants/Types';

export const getDealerToolsStart = () => ({
  type: Types.GET_DEALER_TOOLS_START
});

export const getDealerToolsRequest = ({ dealerId }) => ({
  type: Types.GET_DEALER_TOOLS_REQUEST,
  payload: {
    dealerId
  }
});

export const getDealerToolsSuccess = ({ statusCode, items }) => ({
  type: Types.GET_DEALER_TOOLS_SUCCESS,
  payload: {
    items,
    statusCode
  }
});

export const emptyDealerToolsRequest = () => ({
  type: Types.EMPTY_DEALER_TOOLS_REQUEST
});

export const dealerToolsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.DEALER_TOOLS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl
  }
});
