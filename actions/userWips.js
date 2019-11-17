export const Types = {
  GET_USER_WIPS_REQUEST: 'userWips/get_user_wips_request',
  GET_USER_WIPS_SUCCESS: 'userWips/get_user_wips_success',
  DELETE_USER_WIP_REQUEST: 'userWips/delete_user_wip_request',
  CREATE_USER_WIP_REQUEST: 'userWips/create_user_wip_request',
  UPDATE_USER_WIP_REQUEST: 'userWips/update_user_wip_request',
  USER_WIPS_ERROR: 'userWips/user_wips_error'
};

export const getUserWipsRequest = () => ({
  type: Types.GET_USER_WIPS_REQUEST
});

export const getUserWipsSuccess = ({ items }) => ({
  type: Types.GET_USER_WIPS_SUCCESS,
  payload: {
    items: items
  }
});

export const createUserWipRequest = ({
  wipNumber,
  createdBy,
  createdDate,
  userIntId,
  tools
}) => ({
  type: Types.CREATE_USER_WIP_REQUEST,
  payload: {
    wipNumber,
    createdBy,
    createdDate,
    userIntId,
    tools
  }
});

export const updateUserWipRequest = ({
  userWipId,
  wipNumber,
  createdBy,
  createdDate,
  userIntId,
  tools
}) => ({
  type: Types.CREATE_USER_WIP_REQUEST,
  payload: {
    userWipId,
    wipNumber,
    createdBy,
    createdDate,
    userIntId,
    tools
  }
});

export const deleteUserWipRequest = wipData => {
  console.log('in delete action');
  console.log(wipData);
  //   console.log(id, wipNumber, intId);
  return {
    type: Types.DELETE_USER_WIP_REQUEST,
    payload: wipData
  };
};

export const userWipsError = ({ error }) => ({
  type: Types.USER_WIPS_ERROR,
  payload: {
    error
  }
});
