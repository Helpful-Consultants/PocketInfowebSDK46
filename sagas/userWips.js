import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/userWips';
import * as api from '../api/userWips';

function* getUserWips() {
  try {
    const result = yield call(api.getUserWips);
    console.log('in saga get userWips, success');
    // console.log(result);
    console.log('end results in saga get userWips, success');
    yield put(
      actions.getUserWipsSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.userWipsError({
        error: 'An error occurred when trying to get the userWips'
      })
    );
  }
}

function* watchGetUserWipsRequest() {
  console.log('in saga watch for userWips');
  yield takeEvery(actions.Types.GET_USER_WIPS_REQUEST, getUserWips);
}

const userWipsSagas = [fork(watchGetUserWipsRequest)];

export default userWipsSagas;
