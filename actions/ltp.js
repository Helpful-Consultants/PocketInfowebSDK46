export const Types = {
  GET_LTP_REQUEST: 'ltp/get_ltp_request',
  GET_LTP_SUCCESS: 'ltp/get_ltp_success',
  LTP_ERROR: 'ltp/ltp_error'
};

export const getLtpRequest = () => ({
  type: Types.GET_LTP_REQUEST
});

export const getLtpSuccess = ({ items }) => ({
  type: Types.GET_LTP_SUCCESS,
  payload: {
    items: items
  }
});

export const ltpError = ({ error }) => ({
  type: Types.LTP_ERROR,
  payload: {
    error
  }
});
