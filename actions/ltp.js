// export const Types = {
//   GET_LTP_REQUEST: 'ltp/get_ltp_request',
//   GET_LTP_SUCCESS: 'ltp/get_ltp_success',
//   LTP_ERROR: 'ltp/ltp_error'
// };
import Types from '../constants/Types';

export const getLtpStart = () => ({
  type: Types.GET_LTP_START,
});

export const getLtpRequest = ({ userBrand }) => ({
  type: Types.GET_LTP_REQUEST,
  payload: {
    userBrand,
  },
});

export const getLtpSuccess = ({ items, userBrand, fetchTime }) => ({
  type: Types.GET_LTP_SUCCESS,
  payload: {
    items,
    userBrand,
    fetchTime,
  },
});

export const emptyLtpRequest = () => ({
  type: Types.EMPTY_LTP_REQUEST,
});

export const ltpError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.LTP_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
