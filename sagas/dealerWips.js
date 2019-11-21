import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/dealerWips';
import * as api from '../api/dealerWips';

// Get WIPS
function* getDealerWips({ payload }) {
  console.log('in saga get dealerWips, payload', payload && payload);
  try {
    const result = yield call(api.getDealerWips, {
      dealerId: payload.dealerId,
      intId: payload.intId
    });
    console.log('in saga get dealerWips -200');
    console.log(result.length);
    console.log('end results in saga get dealerWips, success');
    if (result.data.length > 0) {
      console.log('in wips saga - good 200');
      yield put(
        actions.getDealerWipsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in wips saga - bad 200');
      yield put(
        actions.getDealerWipsError({
          error: 'in wips saga - bad 200'
        })
      );
    }
  } catch (e) {
    console.log('error in saga get dealerWips !!!!!!!!!!!!!!');
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to get the dealer wips'
      })
    );
  }
}

function* watchGetDealerWipsRequest() {
  console.log('in saga watch for dealerWips');
  yield takeEvery(actions.Types.GET_DEALER_WIPS_REQUEST, getDealerWips);
}
// Get WIPS end

// Create WIP
// Create WIP end

// Delete WIP
function* deleteDealerWip(wipData) {
  console.log('in saga DELETE dealerWip called');
  console.log(wipData);
  try {
    yield call(api.deleteDealerWip, wipData);
    yield call(getDealerWips);
  } catch (e) {
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to delete the user WIP'
      })
    );
  }
}

function* watchDeleteDealerWipRequest() {
  console.log('in saga watch for DELETE dealerWip');
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_DEALER_WIP_REQUEST);
    yield call(deleteDealerWip, payload);
  }
}
// Delete WIP end

// Create WIP start
function* createDealerWip({ newWipData }) {
  try {
    yield call(api.createDealerWip, newWipData);
    yield call(getDealerWips);
  } catch (error) {
    if (error.response) {
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to create the user wip'
      })
    );
  }
}

function* watchCreateDealerWipRequest() {
  yield takeLatest(actions.Types.CREATE_DEALER_WIP_REQUEST, createDealerWip);
}
// Create WIP end

const dealerWipsSagas = [
  fork(watchGetDealerWipsRequest),
  fork(watchDeleteDealerWipRequest),
  fork(watchCreateDealerWipRequest)
];

export default dealerWipsSagas;
