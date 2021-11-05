import Types from '../constants/Types';

export const getBackgroundDataStart = () => ({
  type: Types.GET_BACKGROUND_DATA_START,
});

export const getBackgroundDataRequest = () => ({
  type: Types.GET_BACKGROUND_DATA_REQUEST,
});

export const getBackgroundDataSuccess = ({ items }) => ({
  type: Types.GET_BACKGROUND_DATA_SUCCESS,
  payload: {
    items: items,
  },
});

export const BackgroundDataError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.BACKGROUND_DATA_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
