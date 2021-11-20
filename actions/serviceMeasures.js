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

export const getServiceMeasuresRequest = ({ dealerId, intId }) => ({
  type: Types.GET_SERVICE_MEASURES_REQUEST,
  payload: {
    dealerId,
    intId,
  },
});

export const getServiceMeasuresSuccess = ({
  statusCode,
  items,
  fetchTime,
}) => ({
  type: Types.GET_SERVICE_MEASURES_SUCCESS,
  payload: {
    items,
    statusCode,
    fetchTime,
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
