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

// Get WIPS
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
// Get WIPS end

// Create WIP
// Create WIP end

// Delete WIP
function* deleteUserWip(wipData) {
  console.log('in saga DELETE userWip called');
  console.log(wipData);
  try {
    yield call(api.deleteUserWip, wipData);
    yield call(getUserWips);
  } catch (e) {
    yield put(
      actions.userWipsError({
        error: 'An error occurred when trying to delete the user WIP'
      })
    );
  }
}

function* watchDeleteUserWipRequest() {
  console.log('in saga watch for DELETE userWip');
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_USER_WIP_REQUEST);
    yield call(deleteUserWip, payload);
  }
}
// Delete WIP end

// Create WIP start
function* createUserWip({ payload }) {
  try {
    yield call(api.createUserWip, {
      firstName: payload.firstName,
      lastName: payload.lastName
    });

    yield call(getUserWips);
  } catch (e) {
    yield put(
      actions.usersWipsError({
        error: 'An error occurred when trying to create the user'
      })
    );
  }
}

function* watchCreateUserWipRequest() {
  yield takeLatest(actions.Types.CREATE_USER_WIP_REQUEST, createUserWip);
}
// Create WIP end

const userWipsSagas = [
  fork(watchGetUserWipsRequest),
  fork(watchDeleteUserWipRequest),
  fork(watchCreateUserWipRequest)
];

export default userWipsSagas;
