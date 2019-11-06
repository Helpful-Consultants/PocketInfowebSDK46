import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/odis';
import * as api from '../api/odis';

function* getOdis() {
  try {
    const result = yield call(api.getOdis);
    // console.log('in saga');
    // console.log(result);
    yield put(
      actions.getOdisSuccess({
        items: result.data.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.odisError({
        error: 'An error occurred when trying to get the odis'
      })
    );
  }
}

function* watchGetOdisRequest() {
  //   console.log('in saga watch');
  yield takeEvery(actions.Types.GET_ODIS_REQUEST, getOdis);
}

const odisSagas = [fork(watchGetOdisRequest)];

export default odisSagas;
