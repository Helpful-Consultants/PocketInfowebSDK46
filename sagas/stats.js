import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import Types from '../constants/Types';
import * as actions from '../actions/stats';
import * as api from '../api/stats';

function* getStats({ payload }) {
  //   console.log('in saga get stats, payload', payload && payload);
  yield put(actions.getStatsStart());
  try {
    const result = yield call(api.getStats, {
      dealerId: payload.dealerId
    });
    // console.log('in saga get stats, success');
    // console.log(result);
    // console.log('end results in saga get stats, success')
    if (result.data[0].userName && result.data[0].userName.length > 0) {
      // if (1 === 1) {
      //   console.log('in stats saga - good 200');
      yield put(
        actions.getStatsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in stats saga - bad 200');
      yield put(
        actions.statsError({
          error: 'An error occurred when trying to update the stats'
        })
      );
    }
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.statsError({
        error: 'An general error occurred when trying to get the stats'
      })
    );
  }
}

function* watchGetStatsRequest() {
  //   console.log('in saga watch for stats');
  yield takeEvery(Types.GET_STATS_REQUEST, getStats);
}

const statsSagas = [fork(watchGetStatsRequest)];

export default statsSagas;
