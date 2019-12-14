import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import Types from '../constants/Types';
import * as actions from '../actions/ltp';
import * as api from '../api/ltp';

function* getLtp() {
  yield put(actions.getLtpStart());
  try {
    const result = yield call(api.getLtp);
    // console.log('in saga get ltp, success');
    // console.log(result);
    // console.log('end results in saga get ltp, success');
    if (result.data[0].id && result.data[0].id.length > 0) {
      //   console.log('in ltp saga - good 200');
      yield put(
        actions.getLtpSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in ltp saga - bad 200');
      yield put(
        actions.ltpError({
          error: 'An error occurred when trying to update the ltp'
        })
      );
    }
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.ltpError({
        error: 'An general error occurred when trying to get the ltp'
      })
    );
  }
}

function* watchGetLtpRequest() {
  //   console.log('in saga watch for ltp');
  yield takeEvery(Types.GET_LTP_REQUEST, getLtp);
}

const ltpSagas = [fork(watchGetLtpRequest)];

export default ltpSagas;
