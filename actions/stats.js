export const Types = {
  GET_STATS_REQUEST: 'stats/get_stats_request',
  GET_STATS_SUCCESS: 'stats/get_stats_success',
  STATS_ERROR: 'stats/stats_error'
};

export const getStatsRequest = () => ({
  type: Types.GET_STATS_REQUEST
});

export const getStatsSuccess = ({ items }) => ({
  type: Types.GET_STATS_SUCCESS,
  payload: {
    items: items
  }
});

export const statsError = ({ error }) => ({
  type: Types.STATS_ERROR,
  payload: {
    error
  }
});
