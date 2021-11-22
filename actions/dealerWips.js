import Types from '../constants/Types';

export const getDealerWipsStart = () => ({
  type: Types.GET_DEALER_WIPS_START,
});

export const getDealerWipsRequest = (payload) => ({
  type: Types.GET_DEALER_WIPS_REQUEST,
  payload,
});

export const getDealerWipsSuccess = (payload) => ({
  type: Types.GET_DEALER_WIPS_SUCCESS,
  payload,
});

export const createDealerWipStart = () => ({
  type: Types.CREATE_DEALER_WIP_START,
});

export const createDealerWipRequest = (payload) => {
  //   console.log('in createDealerWip action');
  //   console.log(payload);
  return { type: Types.CREATE_DEALER_WIP_REQUEST, payload };
};

export const createDealerWipSuccess = (payload) => {
  //   console.log('in createDealerWip Success action', payload);
  return {
    type: Types.CREATE_DEALER_WIP_SUCCESS,
    payload,
  };
};

export const dealerWipUnavailableTools = (payload) => {
  //   console.log('in unavail action', payload);
  return {
    type: Types.DEALER_WIP_UNAVAILABLE_TOOLS,
    payload,
  };
};

export const deleteDealerWipRequest = (payload) => {
  //   console.log('********* in delete action');
  //   console.log(payload);
  return {
    type: Types.DELETE_DEALER_WIP_REQUEST,
    payload,
  };
};

export const deleteDealerWipSuccess = (payload) => ({
  type: Types.DELETE_DEALER_WIP_SUCCESS,
  payload,
});

export const deleteDealerWipToolRequest = (payload) => {
  //   console.log('********* in delete tool action');
  //   console.log(payload);
  return {
    type: Types.DELETE_DEALER_WIP_TOOL_REQUEST,
    payload: payload,
  };
};

export const deleteDealerWipToolSuccess = (payload) => ({
  type: Types.DELETE_DEALER_WIP_TOOL_SUCCESS,
  payload,
});

export const emptyDealerWipsRequest = () => ({
  type: Types.EMPTY_DEALER_WIPS_REQUEST,
});

export const dealerWipsError = (payload) => ({
  type: Types.DEALER_WIPS_ERROR,
  payload,
});
