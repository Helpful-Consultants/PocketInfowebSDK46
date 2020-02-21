import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/news';
// import * as actions from '../constants/Types'
import Types from '../constants/Types';
import * as api from '../api/news';

// console.log('in actions Types.GET_NEWS_START is ', Types.GET_NEWS_START);
function* getNews() {
  yield put(actions.getNewsStart());
  try {
    const result = yield call(api.getNews);
    // console.log('in saga get news, success');
    // console.log(result);
    // console.log('end results in saga get news, success');
    // yield put(
    //   actions.getNewsSuccess({
    //     items: result.data
    //   })
    // );

    // console.log(result && result.data[0]);
    // console.log(result && result);
    // console.log('result is:', result.data[0]);
    // console.log('result newsId is:', result.data[0].newsId);
    // console.log('result intIdis:', result.data[0].intId);

    // const newsId = result.data[0].newsId && result.data[0].userId;
    // const userIntId = result.data[0].intId && result.data[0].intId;
    if (
      result.data &&
      result.data[0] &&
      result.data[0].id &&
      result.data[0].id.length > 0 &&
      result.data[0].createdDate &&
      result.data[0].createdDate.length > 0
    ) {
      //   console.log('in news saga - good 200');
      yield put(
        actions.getNewsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in news saga - bad 200');
      yield put(
        actions.newsError({
          error: 'An error occurred when trying to update the news'
        })
      );
    }
  } catch (error) {
    console.log('server error in saga get news !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);
    let statusCode = null;
    let errorText = 'An server error occurred when trying to get the news';
    let dataErrorUrl = null;
    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status;
      }
      if (error.response.data) {
        errorText = error.response.data;
      }
      if (error.response.config.url) {
        dataErrorUrl = error.response.config.url;
      }
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //   console.log('error.response.data', error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      //   console.log('error request start');
      //   console.log('error request', error.request);
      //   console.log('error request ends');
      if (error.request.status) {
        statusCode = error.request.status;
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = 408;
        } else {
          if (error.request.status) {
            statusCode = error.request.status;
          }
        }
      }
      if (error.request.responseURL) {
        dataErrorUrl = error.request.responseURL;
      } else if (error.request._url) {
        dataErrorUrl = error.request._url;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log('error.request'), error.request;
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      //   console.log('error message starts');
      //   console.log('Error message', error.message);
      //   console.log('error message ends');
      if (error.message.indexOf(' 500') !== -1) {
        statusCode = 500;
      }
      errorText = error.message;
    }
    yield put(
      actions.newsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
      })
    );
  }
}

function* watchGetNewsRequest() {
  //   console.log('in saga watch for news');
  yield takeEvery(Types.GET_NEWS_REQUEST, getNews);
}

const newsSagas = [fork(watchGetNewsRequest)];

export default newsSagas;
