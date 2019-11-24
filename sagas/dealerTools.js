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

function* getDealerTools({ payload }) {
  console.log('in saga get dealerTools, payload', payload && payload);
  try {
    const result = yield call(api.getDealerTools, {
      dealerId: payload.dealerId
    });
    console.log('in saga get dealerTools - 200');
    // console.log(result);

    if (result.data.length > 0) {
      console.log('in tools saga - good 200');
      yield put(
        actions.getDealerToolsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in tools saga - bad 200');
      yield put(
        actions.getDealerToolsError({
          error: 'in tools saga - bad 200'
        })
      );
    }
    // console.log(result);
    // console.log('end results in saga get dealerTools, success');
  } catch (e) {
    console.log('error in saga get dealerTools !!!!!!!!!!!!!!');
    yield put(
      actions.dealerToolsError({
        error: 'An error occurred when trying to get the dealerTools'
      })
    );
  }
}

function* watchGetDealerToolsRequest() {
  //   console.log('in saga watch for dealerTools');
  yield takeEvery(actions.Types.GET_DEALER_TOOLS_REQUEST, getDealerTools);
}

const dealerToolsSagas = [fork(watchGetDealerToolsRequest)];

export default dealerToolsSagas;
