import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/ltp';
import * as api from '../api/ltp';

function* getLtp() {
  try {
    const result = yield call(api.getLtp);
    // console.log('in saga get ltp, success');
    // console.log(result);
    // console.log('end results in saga get ltp, success');
    yield put(
      actions.getLtpSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.ltpError({
        error: 'An error occurred when trying to get the ltp'
      })
    );
  }
}

function* watchGetLtpRequest() {
  //   console.log('in saga watch for ltp');
  yield takeEvery(actions.Types.GET_LTP_REQUEST, getLtp);
}

const ltpSagas = [fork(watchGetLtpRequest)];

export default ltpSagas;
