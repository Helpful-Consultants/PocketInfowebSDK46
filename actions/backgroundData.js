import Types from '../constants/Types';

export const getBackgroundDataStart = () => ({
  type: Types.GET_BACKGROUND_DATA_START,
});

export const getBackgroundDataRequest = () => ({
  type: Types.GET_BACKGROUND_DATA_REQUEST,
});

export const getBackgroundDataSuccess = (payload) => ({
  type: Types.GET_BACKGROUND_DATA_SUCCESS,
  payload,
});

export const BackgroundDataError = (payload) => ({
  type: Types.BACKGROUND_DATA_ERROR,
  payload,
});
