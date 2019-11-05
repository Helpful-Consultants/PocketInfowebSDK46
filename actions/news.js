export const Types = {
  GET_NEWS_REQUEST: 'news/get_news_request',
  GET_NEWS_SUCCESS: 'news/get_news_success',
  NEWS_ERROR: 'news/news_error'
};

export const getNewsRequest = () => ({
  type: Types.GET_NEWS_REQUEST
});

export const getNewsSuccess = ({ items }) => ({
  type: Types.GET_NEWS_SUCCESS,
  payload: {
    items: items
  }
});

export const newsError = ({ error }) => ({
  type: Types.NEWS_ERROR,
  payload: {
    error
  }
});
