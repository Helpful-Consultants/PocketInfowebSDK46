// export const Types = {
//   GET_NEWS_START: 'news/get_news_start',
//   GET_NEWS_REQUEST: 'news/get_news_request',
//   GET_NEWS_SUCCESS: 'news/get_news_success',
//   NEWS_ERROR: 'news/news_error'
// };
import Types from '../constants/Types';

// console.log(Types);
// console.log('in actions Types.GET_NEWS_START is ', Types.GET_NEWS_START);

export const getNewsStart = () => ({
  type: Types.GET_NEWS_START,
});

export const getNewsRequest = () => ({
  type: Types.GET_NEWS_REQUEST,
});

export const getNewsSuccess = ({ items }) => ({
  type: Types.GET_NEWS_SUCCESS,
  payload: {
    items: items,
  },
});

export const newsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.NEWS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
