import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/stats';
import * as api from '../api/stats';

function* getStats() {
  try {
    const result = yield call(api.getStats);
    // console.log('in saga get stats, success');
    // console.log(result);
    // console.log('end results in saga get stats, success');
    yield put(
      actions.getStatsSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.statsError({
        error: 'An error occurred when trying to get the stats'
      })
    );
  }
}

function* watchGetStatsRequest() {
  //   console.log('in saga watch for stats');
  yield takeEvery(actions.Types.GET_STATS_REQUEST, getStats);
}

const statsSagas = [fork(watchGetStatsRequest)];

export default statsSagas;
