import Types from '../constants/Types';

export const getServiceMeasuresStart = () => ({
  type: Types.GET_SERVICE_MEASURES_START,
});

export const getServiceMeasuresRequest = ({ dealerId, intId }) => ({
  type: Types.GET_SERVICE_MEASURES_REQUEST,
  payload: {
    dealerId,
    intId,
  },
});

export const getServiceMeasuresSuccess = ({ statusCode, items }) => ({
  type: Types.GET_SERVICE_MEASURES_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
  },
});

export const emptyServiceMeasuresRequest = () => ({
  type: Types.EMPTY_SERVICE_MEASURES_REQUEST,
});

export const serviceMeasuresError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.SERVICE_MEASURES_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
