// export const Types = {
//   GET_ODIS_REQUEST: 'odis/get_odis_request',
//   GET_ODIS_SUCCESS: 'odis/get_odis_success',
//   ODIS_ERROR: 'odis/odis_error'
// };
import Types from '../constants/Types';

export const getOdisStart = () => ({
  type: Types.GET_ODIS_START
});

export const getOdisRequest = () => ({
  type: Types.GET_ODIS_REQUEST
});

export const getOdisSuccess = ({ items }) => ({
  type: Types.GET_ODIS_SUCCESS,
  payload: {
    items: items
  }
});

export const odisError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.ODIS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl
  }
});
