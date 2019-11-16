import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/news';
import * as api from '../api/news';

function* getNews() {
  try {
    const result = yield call(api.getNews);
    // console.log('in saga get news, success');
    // console.log(result);
    // console.log('end results in saga get news, success');
    yield put(
      actions.getNewsSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.newsError({
        error: 'An error occurred when trying to get the news'
      })
    );
  }
}

function* watchGetNewsRequest() {
  //   console.log('in saga watch for news');
  yield takeEvery(actions.Types.GET_NEWS_REQUEST, getNews);
}

const newsSagas = [fork(watchGetNewsRequest)];

export default newsSagas;
