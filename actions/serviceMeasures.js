import Types from '../constants/Types';

export const getServiceMeasuresStart = () => ({
  type: Types.GET_SERVICE_MEASURES_START,
});

export const setServiceMeasuresDisplayTimestamp = (displayTime) => ({
  type: Types.SET_SERVICE_MEASURES_DISPLAY_TIMESTAMP,
  payload: {
    displayTime,
  },
});

export const getServiceMeasuresRequest = (payload) => ({
  type: Types.GET_SERVICE_MEASURES_REQUEST,
  payload,
});

export const getServiceMeasuresSuccess = (payload) => ({
  type: Types.GET_SERVICE_MEASURES_SUCCESS,
  payload,
});

export const emptyServiceMeasuresRequest = () => ({
  type: Types.EMPTY_SERVICE_MEASURES_REQUEST,
});

export const serviceMeasuresError = (payload) => ({
  type: Types.SERVICE_MEASURES_ERROR,
  payload,
});
