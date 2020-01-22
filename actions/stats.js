// export const Types = {
//   GET_STATS_REQUEST: 'stats/get_stats_request',
//   GET_STATS_SUCCESS: 'stats/get_stats_success',
//   STATS_ERROR: 'stats/stats_error'
// };
import Types from '../constants/Types';

export const getStatsStart = () => ({
  type: Types.GET_STATS_START
});

export const getStatsRequest = ({ dealerId }) => ({
  type: Types.GET_STATS_REQUEST,
  payload: {
    dealerId: dealerId
  }
});

export const getStatsSuccess = ({ statusCode, items }) => ({
  type: Types.GET_STATS_SUCCESS,
  payload: {
    items,
    statusCode
  }
});

export const statsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.STATS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl
  }
});
