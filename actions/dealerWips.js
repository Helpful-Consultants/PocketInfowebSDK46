// export const Types = {
//   EMPTY_DEALER_WIPS_REQUEST: 'dealerWips/get_dealer_wips_request',
//   GET_DEALER_WIPS_REQUEST: 'dealerWips/get_dealer_wips_request',
//   GET_DEALER_WIPS_SUCCESS: 'dealerWips/get_dealer_wips_success',
//   DELETE_DEALER_WIP_REQUEST: 'dealerWips/delete_dealer_wip_request',
//   CREATE_DEALER_WIP_REQUEST: 'dealerWips/create_dealer_wip_request',
//   CREATE_DEALER_WIP_SUCCESS: 'dealerWips/create_dealer_wip_success',
//   DEALER_WIPS_ERROR: 'dealerWips/dealer_wips_error'
// };
import Types from '../constants/Types';

export const getDealerWipsStart = () => ({
  type: Types.GET_DEALER_WIPS_START,
});

export const getDealerWipsRequest = ({ dealerId, intId }) => ({
  type: Types.GET_DEALER_WIPS_REQUEST,
  payload: {
    dealerId,
    intId,
  },
});

export const getDealerWipsSuccess = ({ statusCode, items }) => ({
  type: Types.GET_DEALER_WIPS_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
  },
});

export const createDealerWipStart = () => ({
  type: Types.CREATE_DEALER_WIP_START,
});

export const createDealerWipRequest = (wipData) => {
  //   console.log('in delete action');
  //   console.log(wipData);
  return { type: Types.CREATE_DEALER_WIP_REQUEST, payload: wipData };
};

export const createDealerWipSuccess = (payload) => ({
  type: Types.CREATE_DEALER_WIP_SUCCESS,
  payload: payload,
});

export const dealerWipUnavailableTools = (payload) => {
  console.log('in unavail action');
  console.log(payload);
  //   console.log(id, wipNumber, intId);
  return {
    type: Types.DEALER_WIP_UNAVAILABLE_TOOLS,
    payload: payload,
  };
};

export const deleteDealerWipRequest = (payload) => {
  //   console.log('in delete action');
  //   console.log(payload);
  //   console.log(id, wipNumber, intId);
  return {
    type: Types.DELETE_DEALER_WIP_REQUEST,
    payload: payload,
  };
};

export const deleteDealerWipSuccess = ({ statusCode, message }) => ({
  type: Types.DELETE_DEALER_WIP_SUCCESS,
  payload: {
    message,
  },
});

export const deleteDealerWipToolRequest = (payload) => ({
  type: Types.DELETE_DEALER_WIP_TOOL_REQUEST,
  payload: payload,
});
// spacer
// spacer
export const deleteDealerWipToolSuccess = ({ statusCode, message }) => ({
  type: Types.DELETE_DEALER_WIP_TOOL_SUCCESS,
  payload: {
    statusCode,
    message,
  },
});

export const emptyDealerWipsRequest = () => ({
  type: Types.EMPTY_DEALER_WIPS_REQUEST,
});

export const dealerWipsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.DEALER_WIPS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
