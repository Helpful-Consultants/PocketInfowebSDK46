import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/dealerTools';
import * as api from '../api/dealerTools';

function* getDealerTools() {
  try {
    const result = yield call(api.getDealerTools);
    console.log('in saga get dealerTools, success');
    // console.log(result);
    console.log('end results in saga get dealerTools, success');
    yield put(
      actions.getDealerToolsSuccess({
        items: result.data
      })
    );
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.dealerToolsError({
        error: 'An error occurred when trying to get the dealerTools'
      })
    );
  }
}

function* watchGetDealerToolsRequest() {
  console.log('in saga watch for dealerTools');
  yield takeEvery(actions.Types.GET_DEALER_TOOLS_REQUEST, getDealerTools);
}

const dealerToolsSagas = [fork(watchGetDealerToolsRequest)];

export default dealerToolsSagas;
