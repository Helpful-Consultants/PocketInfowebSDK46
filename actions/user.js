// export const Types = {
//   GET_USER_REQUEST: 'user/get_user_request',
//   GET_USER_RESET_ERRORS: 'user/get_user_reset_errors',
//   GET_USER_SUCCESS: 'user/get_user_success',
//   SIGN_OUT_USER_REQUEST: 'user/sign_out_user',
//   GET_USER_INVALID_CREDS: 'user/get_user_invalid_credentials',
//   USER_ERROR: 'user/user_error'
// };
import Types from '../constants/Types';

export const getUserStart = () => ({
  type: Types.GET_USER_START
});

export const getUserRequest = ({ email, pin }) => ({
  type: Types.GET_USER_REQUEST,
  payload: {
    email,
    pin
  }
});

export const signOutUserRequest = () => ({
  type: Types.SIGN_OUT_USER_REQUEST
});

export const getUserSuccess = ({ items }) => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    items: items
  }
});

export const getUserInvalidCredentials = ({ error }) => ({
  type: Types.GET_USER_INVALID_CREDS,
  payload: {
    error
  }
});

export const userError = ({ error }) => ({
  type: Types.USER_ERROR,
  payload: {
    error
  }
});
