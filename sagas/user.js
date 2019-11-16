import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/user';
import * as api from '../api/user';

function* getUser() {
  try {
    const result = yield call(api.getUser);
    // console.log('in user saga - success');
    // console.log(result);
    yield put(
      actions.getUserSuccess({
        items: result.data.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.userError({
        error: 'An error occurred when trying to get the user'
      })
    );
  }
}

function* watchGetUserRequest() {
  //   console.log('in saga watch');
  yield takeEvery(actions.Types.GET_USER_REQUEST, getUser);
}

const userSagas = [fork(watchGetUserRequest)];

export default userSagas;
