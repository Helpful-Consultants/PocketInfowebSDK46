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
    console.log('in saga get news, success');
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
      result.data[0].id &&
      result.data[0].id.length > 0 &&
      result.data[0].createdDate &&
      result.data[0].createdDate.length > 0
    ) {
      console.log('in news saga - good 200');
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
  yield takeEvery(Types.GET_NEWS_REQUEST, getNews);
}

const newsSagas = [fork(watchGetNewsRequest)];

export default newsSagas;
