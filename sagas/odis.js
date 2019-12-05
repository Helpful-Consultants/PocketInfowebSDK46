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

import Types from '../constants/Types';

function* getOdis() {
  console.log('in saga, getOdis');
  yield put(actions.getOdisStart());

  try {
    const result = yield call(api.getOdis);
    console.log('in saga, getOdis success');
    // console.log(result.data && result.data);
    // console.log(result.data[0] && result.data[0].brandVersions);

    if (result.data[0].id && result.data[0].id.length > 0) {
      console.log('in odis saga - good 200');

      yield put(
        actions.getOdisSuccess({
          items: result.data[0].brandVersions
        })
      );
    } else {
      console.log('in odis saga - bad 200');
      yield put(
        actions.odisError({
          error: 'An error occurred when trying to update the odis versions'
        })
      );
    }
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
  yield takeEvery(Types.GET_ODIS_REQUEST, getOdis);
}

const odisSagas = [fork(watchGetOdisRequest)];

export default odisSagas;
