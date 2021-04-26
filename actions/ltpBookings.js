import Types from '../constants/Types';

export const getLtpBookingsStart = () => ({
  type: Types.GET_LTP_BOOKINGS_START,
});

export const getLtpBookingsRequest = ({ intId }) => ({
  type: Types.GET_LTP_BOOKINGS_REQUEST,
  payload: {
    intId,
  },
});

export const getLtpBookingsSuccess = ({ statusCode, items }) => ({
  type: Types.GET_LTP_BOOKINGS_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
  },
});

export const emptyLtpBookingsRequest = () => ({
  type: Types.EMPTY_LTP_BOOKINGS_REQUEST,
});

export const ltpBookingsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.LTP_BOOKINGS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
