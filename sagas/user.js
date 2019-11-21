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
    console.log('in user saga - 200');
    // console.log(result.data);
    // console.log('result is:', result.data[0]);
    // console.log('result userId is:', result.data[0].userId);
    // console.log('result intIdis:', result.data[0].intId);

    // const userId = result.data[0].userId && result.data[0].userId;
    // const userIntId = result.data[0].intId && result.data[0].intId;
    if (result.data[0].intId.length > 0 || result.data[0].userId.length > 0) {
      console.log('in user saga - good 200');
      yield put(
        actions.getUserSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in user saga - bad 200');
      yield put(
        actions.userError({
          error: 'User credentials not verified'
        })
      );
    }
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
