export const Types = {
  GET_USER_WIPS_REQUEST: 'userWips/get_user_wips_request',
  GET_USER_WIPS_SUCCESS: 'userWips/get_user_wips_success',
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

export const userWipsError = ({ error }) => ({
  type: Types.USER_WIPS_ERROR,
  payload: {
    error
  }
});
