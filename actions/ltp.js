// export const Types = {
//   GET_LTP_REQUEST: 'ltp/get_ltp_request',
//   GET_LTP_SUCCESS: 'ltp/get_ltp_success',
//   LTP_ERROR: 'ltp/ltp_error'
// };
import Types from '../constants/Types';

export const getLtpStart = () => ({
  type: Types.GET_LTP_START
});

export const getLtpRequest = () => ({
  type: Types.GET_LTP_REQUEST
});

export const getLtpSuccess = ({ items }) => ({
  type: Types.GET_LTP_SUCCESS,
  payload: {
    items: items
  }
});

export const emptyLtpRequest = () => ({
  type: Types.EMPTY_LTP_REQUEST
});

export const ltpError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.LTP_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl
  }
});
