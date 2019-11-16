export const Types = {
  GET_USER_REQUEST: 'user/get_user_request',
  GET_USER_SUCCESS: 'user/get_user_success',
  USER_ERROR: 'user/user_error'
};

export const getUserRequest = () => ({
  type: Types.GET_USER_REQUEST
});

export const getUserSuccess = ({ items }) => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    items: items
  }
});

export const userError = ({ error }) => ({
  type: Types.USER_ERROR,
  payload: {
    error
  }
});
