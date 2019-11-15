export const Types = {
  GET_DEALER_TOOLS_REQUEST: 'dealerTools/get_dealerTools_request',
  GET_DEALER_TOOLS_SUCCESS: 'dealerTools/get_dealerTools_success',
  DEALER_TOOLS_ERROR: 'dealerTools/dealerTools_error'
};

export const getDealerToolsRequest = () => ({
  type: Types.GET_DEALER_TOOLS_REQUEST
});

export const getDealerToolsSuccess = ({ items }) => ({
  type: Types.GET_DEALER_TOOLS_SUCCESS,
  payload: {
    items: items
  }
});

export const dealerToolsError = ({ error }) => ({
  type: Types.DEALER_TOOLS_ERROR,
  payload: {
    error
  }
});
