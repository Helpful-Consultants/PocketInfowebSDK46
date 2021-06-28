import Types from '../constants/Types';

export const getCalibrationExpiryStart = () => ({
  type: Types.GET_CALIBRATION_EXPIRY_START,
});

export const getCalibrationExpiryRequest = ({ dealerId }) => ({
  type: Types.GET_CALIBRATION_EXPIRY_REQUEST,
  payload: {
    dealerId,
  },
});

export const getCalibrationExpirySuccess = ({ statusCode, items }) => ({
  type: Types.GET_CALIBRATION_EXPIRY_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
  },
});

export const emptyCalibrationExpiryRequest = () => ({
  type: Types.EMPTY_CALIBRATION_EXPIRY_REQUEST,
});

export const calibrationExpiryError = ({
  error,
  statusCode,
  dataErrorUrl,
}) => ({
  type: Types.CALIBRATION_EXPIRY_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
