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

function* getUser({ payload }) {
  console.log('in user saga - getUser called', payload);
  try {
    const result = yield call(api.getUser, {
      email: payload.email,
      pin: payload.pin
    });
    console.log('in user saga - success');
    console.log(result);
    yield put(
      actions.getUserSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('in user saga - error!!!!!!!!!!!!!!');
    yield put(
      actions.userError({
        error: 'An error occurred when trying to get the user'
      })
    );
  }
}

function* watchGetUserRequest() {
  //   console.log('in saga watch');
  yield takeLatest(actions.Types.GET_USER_REQUEST, getUser);
}

const userSagas = [fork(watchGetUserRequest)];

export default userSagas;
