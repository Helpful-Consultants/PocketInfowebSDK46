import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';

import Types from '../constants/Types';
import * as actions from '../actions/dealerWips';
import * as toolsActions from '../actions/dealerTools';
import * as api from '../api/dealerWips';

// Get WIPS
function* getDealerWips({ payload }) {
  //   console.log('in saga get dealerWips, payload', payload && payload);
  yield put(actions.getDealerWipsStart());
  try {
    const result = yield call(api.getDealerWips, {
      dealerId: payload.dealerId,
      intId: payload.intId
    });
    // console.log('in saga get dealerWips -200');

    // console.log('end results in saga get dealerWips, success');
    if (result.data.length > 0) {
      //   console.log('in Wips saga - good 200');
      //   console.log(result.data);
      yield put(
        actions.getDealerWipsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in Wips saga - bad 200');
      yield put(
        actions.getDealerWipsError({
          error: 'in Wips saga - bad 200'
        })
      );
    }
    // console.log(result);
    // console.log('end results in saga get dealerWips, success');
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
  //   console.log('in saga watch for dealerWips');
  yield takeEvery(Types.GET_DEALER_WIPS_REQUEST, getDealerWips);
}
// Get WIPS end

// Create WIP start
function* createDealerWip({ payload }) {
  //   console.log('in create wip saga', payload);
  //   console.log('in create wip saga', payload.wipObj);

  try {
    yield call(api.createDealerWip, payload.wipObj);
    // console.log('in wips saga - good 200', payload.getWipsDataObj);
    yield put(
      actions.createDealerWipSuccess({
        code: '200',
        message: 'Successful',
        wipNumber: payload.getWipsDataObj.wipNumber || ''
      })
    );
    console.log('createDealerWipSuccess');
    yield put(actions.getDealerWipsStart());
    // console.log('getDealerWipStarted');
    yield put(actions.getDealerWipsRequest(payload.getWipsDataObj));
    yield put(toolsActions.getDealerToolsStart());
    yield put(toolsActions.getDealerToolsRequest(payload.getWipsDataObj));

    // yield put(
    //   toolsActions.getDealerToolsRequest(payload.getWipsDataObj.dealerId)
    // );
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
  yield takeLatest(Types.CREATE_DEALER_WIP_REQUEST, createDealerWip);
}
// Create WIP end

// DELETe WIP TOOL start
function* updateDealerWip({ payload }) {
  console.log('in UPDATE wip saga', payload);
  console.log('in UPDATE wip saga', payload.wipObj);
  try {
    // delete the old one
    yield call(api.deleteDealerWip, payload);
    // yield put(actions.getDealerWipsRequest(payload.wipDataObj));
    // yield call(getDealerWips);
    yield put(
      actions.deleteDealerWipSuccess({
        code: '200',
        message: 'Successful',
        wipNumber: payload.wipNumber || ''
      })
    );
    // create a new one
    yield call(api.createDealerWip, payload.wipObj);
    yield put(
      actions.createDealerWipSuccess({
        code: '200',
        message: 'Successful',
        wipNumber: payload.wipNumber || ''
      })
    );
    // refresh the list
    yield put(actions.getDealerWipsStart());
    yield put(actions.getDealerWipsRequest(payload.getWipsDataObj));
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
      console.log('Error in deleteDealerWip', error.message);
    }
    console.log(error.config);
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to delete the user WIP'
      })
    );
  }
}

function* watchUpdateDealerWipRequest() {
  yield takeEvery(Types.UPDATE_DEALER_WIP_REQUEST, updateDealerWip);
}
// Update WIP end

// Remove tool from WIP start
function* deleteDealerWipTool({ payload }) {
  //   console.log('in DELETE wip TOOL saga', payload);
  //   console.log('in DELETE wip TOOL saga', payload.wipObj);
  try {
    // delete the old one
    yield call(api.deleteDealerWipTool, payload);
    // yield put(actions.getDealerWipsRequest(payload.wipDataObj));
    // yield call(getDealerWips);
    yield put(
      actions.deleteDealerWipToolSuccess({
        code: '200',
        message: 'Successful',
        wipNumber: payload.wipNumber || ''
      })
    );
    // refresh the list
    yield put(actions.getDealerWipsStart());
    yield put(actions.getDealerWipsRequest(payload.getWipsDataObj));
    yield put(toolsActions.getDealerToolsStart());
    yield put(toolsActions.getDealerToolsRequest(payload.getWipsDataObj));
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
      console.log('Error in deleteDealerWipTool', error.message);
    }
    console.log(error.config);
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to delete the user WIP tool'
      })
    );
  }
}

function* watchDeleteDealerWipToolRequest() {
  yield takeEvery(Types.DELETE_DEALER_WIP_TOOL_REQUEST, deleteDealerWipTool);
}
// Remove tool from WIP end

// Delete WIP
function* deleteDealerWip(payload) {
  //   console.log('in saga DELETE dealerWip called');
  //   console.log('in saga DELETE dealerWip payload', payload);
  //   console.log('in saga DELETE dealerWip wip', payload.wipNumber);

  try {
    yield call(api.deleteDealerWip, payload);
    // yield put(actions.getDealerWipsRequest(payload.wipDataObj));
    // yield call(getDealerWips);
    yield put(
      actions.deleteDealerWipSuccess({
        code: '200',
        message: 'Successful',
        wipNumber: payload.wipNumber || ''
      })
    );
    yield put(actions.getDealerWipsStart());
    yield put(actions.getDealerWipsRequest(payload));
    yield put(toolsActions.getDealerToolsStart());
    yield put(toolsActions.getDealerToolsRequest(payload.getWipsDataObj));
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
      console.log('Error in deleteDealerWip', error.message);
    }
    console.log(error.config);
    yield put(
      actions.dealerWipsError({
        error: 'An error occurred when trying to delete the user WIP'
      })
    );
  }
}

function* watchDeleteDealerWipRequest() {
  //   console.log('in saga watch for DELETE dealerWip');
  while (true) {
    const { payload } = yield take(Types.DELETE_DEALER_WIP_REQUEST);
    yield call(deleteDealerWip, payload);
  }
}
// Delete WIP end

const dealerWipsSagas = [
  fork(watchGetDealerWipsRequest),
  fork(watchDeleteDealerWipRequest),
  fork(watchCreateDealerWipRequest),
  fork(watchDeleteDealerWipToolRequest)
];

export default dealerWipsSagas;
