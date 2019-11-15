export const Types = {
  GET_USER_WIPS_REQUEST: 'userWips/get_userWips_request',
  GET_USER_WIPS_SUCCESS: 'userWips/get_userWips_success',
  USER_WIPS_ERROR: 'userWips/userWips_error'
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
