import Types from '../constants/Types';

export const getLtpLoansStart = () => ({
  type: Types.GET_LTP_LOANS_START,
});

export const setLtpLoansDisplayTimestamp = ({ displayTime }) => ({
  type: Types.SET_LTP_LOANS_DISPLAY_TIMESTAMP,
  payload: {
    displayTime,
  },
});

export const getLtpLoansRequest = ({ intId }) => ({
  type: Types.GET_LTP_LOANS_REQUEST,
  payload: {
    intId,
  },
});

export const getLtpLoansSuccess = ({ statusCode, items, fetchTime }) => ({
  type: Types.GET_LTP_LOANS_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
    fetchTime,
  },
});

export const emptyLtpLoansRequest = () => ({
  type: Types.EMPTY_LTP_LOANS_REQUEST,
});

export const ltpLoansError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.LTP_LOANS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
