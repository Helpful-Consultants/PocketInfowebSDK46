export const Types = {
  EMPTY_DEALER_WIPS_REQUEST: 'dealerWips/get_dealer_wips_request',
  GET_DEALER_WIPS_REQUEST: 'dealerWips/get_dealer_wips_request',
  GET_DEALER_WIPS_SUCCESS: 'dealerWips/get_dealer_wips_success',
  DELETE_DEALER_WIP_REQUEST: 'dealerWips/delete_dealer_wip_request',
  CREATE_DEALER_WIP_REQUEST: 'dealerWips/create_dealer_wip_request',
  CREATE_DEALER_WIP_SUCCESS: 'dealerWips/create_dealer_wip_success',
  UPDATE_DEALER_WIP_REQUEST: 'dealerWips/update_dealer_wip_request',
  DEALER_WIPS_ERROR: 'dealerWips/dealer_wips_error'
};

export const emptyDealerWipsRequest = () => ({
  type: Types.EMPTY_DEALER_WIPS_REQUEST
});

export const getDealerWipsRequest = ({ dealerId, intId }) => ({
  type: Types.GET_DEALER_WIPS_REQUEST,
  payload: {
    dealerId: dealerId,
    intId: intId
  }
});

export const getDealerWipsSuccess = ({ items }) => ({
  type: Types.GET_DEALER_WIPS_SUCCESS,
  payload: {
    items: items
  }
});
export const createDealerWipSuccess = ({ code, message }) => ({
  type: Types.CREATE_DEALER_WIP_SUCCESS,
  payload: {
    code,
    message
  }
});

// export const createDealerWipRequest = ({
//   wipNumber,
//   createdBy,
//   createdDate,
//   intId,
//   tools
// }) => ({
//   type: Types.CREATE_DEALER_WIP_REQUEST,
//   payload: {
//     wipNumber,
//     createdBy,
//     createdDate,
//     intId,
//     tools
//   }
// });
export const createDealerWipRequest = newWipData => ({
  type: Types.CREATE_DEALER_WIP_REQUEST,
  payload: newWipData
});

export const updateDealerWipRequest = ({
  dealerWipId,
  wipNumber,
  createdBy,
  createdDate,
  userIntId,
  tools
}) => ({
  type: Types.CREATE_DEALER_WIP_REQUEST,
  payload: {
    dealerWipId,
    wipNumber,
    createdBy,
    createdDate,
    userIntId,
    tools
  }
});

export const deleteDealerWipRequest = wipData => {
  console.log('in delete action');
  console.log(wipData);
  //   console.log(id, wipNumber, intId);
  return {
    type: Types.DELETE_DEALER_WIP_REQUEST,
    payload: wipData
  };
};

export const dealerWipsError = ({ error }) => ({
  type: Types.DEALER_WIPS_ERROR,
  payload: {
    error
  }
});
