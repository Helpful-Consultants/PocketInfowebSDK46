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
// import * as toolsActions from '../actions/dealerTools';
import * as api from '../api/dealerWips';

// Get WIPS
function* getDealerWips({ payload }) {
  //   console.log('in saga get dealerWips, payload', payload && payload);
  let statusCode = null;
  let errorText = 'A server error occurred when trying to get the dealer jobs';
  let dataErrorUrl = null;
  yield put(actions.getDealerWipsStart());
  try {
    const result = yield call(api.getDealerWips, {
      dealerId: payload.dealerId,
      intId: payload.intId
    });
    // console.log('in saga get dealerWips -200');

    // console.log('end results in saga get dealerWips, success');
    // console.log('@@@@@@@@@@@result starts');
    // console.log(result);
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    // console.log(
    //   'the wips data starts here',
    //   result.data && result.data,
    //   'wips data ends here'
    // );
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    if (
      result.data &&
      result.data.length > 0 &&
      result.data[0] &&
      result.data[0].id &&
      //   result.data[0].tools &&
      result.data[0].wipNumber
    ) {
      //   console.log('in wips saga - good 200');

      //   console.log('in Wips saga - good 200');
      //   console.log(result.data);
      yield put(
        actions.getDealerWipsSuccess({
          items: result.data,
          statusCode:
            (result.status && result.status) ||
            (result.request.status && result.request.status) ||
            null
        })
      );
    } else if (result && result.data && result.data.length > 0) {
      console.log(
        'in Wips saga - an empty 200',
        result.request.status && result.request.status,
        payload && payload
      );
      //   console.log(result && result);
      yield put(
        actions.getDealerWipsSuccess({
          items: [],
          statusCode:
            (result.status && result.status) ||
            (result.request.status && result.request.status) ||
            null
        })
      );
    } else {
      console.log('dealer wips weird result');
      //   console.log(result && result);
      yield put(
        actions.dealerWipsError({
          error:
            (result.request.response && result.request.response.toString()) ||
            'An error occurred when trying to update the jobs',
          statusCode: (result.request.status && result.request.status) || null,
          dataErrorUrl:
            (result && result.responseURL && result.responseURL) ||
            (result &&
              result.request &&
              result.request._url &&
              result.request._url) ||
            null
        })
      );
    }

    // console.log(result);
    // console.log('end results in saga get dealerWips, success');
  } catch (error) {
    // console.log('server error in saga get dealerWips !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);

    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status;
      }
      if (error.response.data) {
        errorText = error.response.data;
      }
      if (error.response.config.url) {
        dataErrorUrl = error.response.config.url;
      }
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //   console.log('error.response.data', error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      //   console.log('error request start');
      //   console.log('error request', error.request);
      //   console.log('error request ends');
      if (error.request.status) {
        statusCode = error.request.status;
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = 408;
        } else {
          if (error.request.status) {
            statusCode = error.request.status;
          }
        }
      }
      if (error.request.responseURL) {
        dataErrorUrl = error.request.responseURL;
      } else if (error.request._url) {
        dataErrorUrl = error.request._url;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log('error.request'), error.request;
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      //   console.log('error message starts');
      //   console.log('Error message', error.message);
      //   console.log('error message ends');
      if (error.message.indexOf(' 500') !== -1) {
        statusCode = 500;
      }
      errorText = error.message;
    }
    yield put(
      actions.dealerWipsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
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
  console.log('in create wip saga', payload);
  //   console.log('in create wip saga', payload.wipObj);
  let statusCode = null;
  let errorText = 'A server error occurred when trying to save the job';
  let dataErrorUrl = null;
  yield put(actions.createDealerWipStart());
  try {
    const result = yield call(api.createDealerWip, payload.wipObj);
    // console.log('in wips saga - good 200', payload.apiFetchParamsObj);
    if (
      result &&
      result.data &&
      result.data[0] &&
      result.data[0].unavailableTools &&
      result.data[0].unavailableTools.length > 0
    ) {
      console.log('!!!!!!!unavailableTools', result.data[0].unavailableTools);
      yield put(
        actions.dealerWipUnavailableTools({
          statusCode: 409,
          message: 'Some of these tools are unavailable',
          wipNumber: (payload.wipObj && payload.wipObj.wipNumber) || '',
          unavailableToolsArr: result.data[0].unavailableTools
        })
      );
    } else {
      yield put(
        actions.createDealerWipSuccess({
          statusCode: 201,
          message: 'Job booked OK',
          wipNumber: (payload.wipObj && payload.wipObj.wipNumber) || ''
        })
      );
      //   console.log('createDealerWipSuccess', result);
      yield put(actions.getDealerWipsStart());
      // console.log('getDealerWipStarted');
      yield put(actions.getDealerWipsRequest(payload.apiFetchParamsObj));
    }

    // yield put(toolsActions.getDealerToolsStart());
    // yield put(toolsActions.getDealerToolsRequest(payload.apiFetchParamsObj));

    // yield put(
    //   toolsActions.getDealerToolsRequest(payload.apiFetchParamsObj.dealerId)
    // );
  } catch (error) {
    // console.log('server error in saga delete dealerWip !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);

    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status;
      }
      if (error.response.data) {
        errorText = error.response.data;
      }
      if (error.response.config.url) {
        dataErrorUrl = error.response.config.url;
      }
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //   console.log('error.response.data', error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      //   console.log('error request start');
      //   console.log('error request', error.request);
      //   console.log('error request ends');
      if (error.request.status) {
        statusCode = error.request.status;
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = 408;
        } else {
          if (error.request.status) {
            statusCode = error.request.status;
          }
        }
      }
      if (error.request.responseURL) {
        dataErrorUrl = error.request.responseURL;
      } else if (error.request._url) {
        dataErrorUrl = error.request._url;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log('error.request'), error.request;
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      //   console.log('error message starts');
      //   console.log('Error message', error.message);
      //   console.log('error message ends');
      if (error.message.indexOf(' 500') !== -1) {
        statusCode = 500;
      }
      errorText = error.message;
    }
    yield put(
      actions.dealerWipsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
      })
    );
  }
}

function* watchCreateDealerWipRequest() {
  yield takeLatest(Types.CREATE_DEALER_WIP_REQUEST, createDealerWip);
}
// Create WIP end

// Remove tool from WIP start
function* deleteDealerWipTool({ payload }) {
  //   console.log('in DELETE wip TOOL saga', payload);
  //   console.log('in DELETE wip TOOL saga', payload.wipObj);
  let statusCode = null;
  let errorText = 'Anerror occurred when trying update the job';
  let dataErrorUrl = null;
  try {
    // delete the old one
    const result = yield call(api.deleteDealerWipTool, payload);
    // yield put(actions.getDealerWipsRequest(payload.wipDataObj));
    // yield call(getDealerWips);
    // console.log('delete wip tool result', result && result);
    yield put(
      actions.deleteDealerWipToolSuccess({
        message: 'Successful',
        wipNumber: payload.wipNumber || '',
        statusCode:
          (result.status && result.status) ||
          (result.request.status && result.request.status) ||
          null
      })
    );
    // refresh the list
    yield put(actions.getDealerWipsStart());
    yield put(actions.getDealerWipsRequest(payload.apiFetchParamsObj));
    // yield put(toolsActions.getDealerToolsStart());
    // yield put(toolsActions.getDealerToolsRequest(payload.apiFetchParamsObj));
  } catch (error) {
    // console.log('server error in saga delete dealerWip !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);

    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status;
      }
      if (error.response.data) {
        errorText = error.response.data;
      }
      if (error.response.config.url) {
        dataErrorUrl = error.response.config.url;
      }
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //   console.log('error.response.data', error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      //   console.log('error request start');
      //   console.log('error request', error.request);
      //   console.log('error request ends');
      if (error.request.status) {
        statusCode = error.request.status;
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = 408;
        } else {
          if (error.request.status) {
            statusCode = error.request.status;
          }
        }
      }
      if (error.request.responseURL) {
        dataErrorUrl = error.request.responseURL;
      } else if (error.request._url) {
        dataErrorUrl = error.request._url;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log('error.request'), error.request;
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      //   console.log('error message starts');
      //   console.log('Error message', error.message);
      //   console.log('error message ends');
      if (error.message.indexOf(' 500') !== -1) {
        statusCode = 500;
      }
      errorText = error.message;
    }
    yield put(
      actions.dealerWipsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
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
  let statusCode = null;
  let errorText = 'Anerror occurred when trying to delete the job';
  let dataErrorUrl = null;

  //   console.log('delete wip called', payload);

  try {
    const result = yield call(api.deleteDealerWip, payload);
    // yield put(actions.getDealerWipsRequest(payload.wipDataObj));
    // yield call(getDealerWips);
    yield put(
      actions.deleteDealerWipSuccess({
        statusCode: 202,
        message: 'Probably successful',
        wipNumber: payload.wipNumber || ''
      })
    );
    // console.log('delete wip good result', result && result);
    yield put(actions.getDealerWipsStart());
    yield put(actions.getDealerWipsRequest(payload));
    // yield put(toolsActions.getDealerToolsStart());
    // yield put(toolsActions.getDealerToolsRequest(payload.apiFetchParamsObj));
  } catch (error) {
    // console.log('server error in saga delete dealerWip !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);

    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status;
      }
      if (error.response.data) {
        errorText = error.response.data;
      }
      if (error.response.config.url) {
        dataErrorUrl = error.response.config.url;
      }
      // console.error(error);if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //   console.log('error.response.data', error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      //   console.log('error request start');
      //   console.log('error request', error.request);
      //   console.log('error request ends');
      if (error.request.status) {
        statusCode = error.request.status;
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = 408;
        } else {
          if (error.request.status) {
            statusCode = error.request.status;
          }
        }
      }
      if (error.request.responseURL) {
        dataErrorUrl = error.request.responseURL;
      } else if (error.request._url) {
        dataErrorUrl = error.request._url;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log('error.request'), error.request;
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      //   console.log('error message starts');
      //   console.log('Error message', error.message);
      //   console.log('error message ends');
      if (error.message.indexOf(' 500') !== -1) {
        statusCode = 500;
      }
      errorText = error.message;
    }
    yield put(
      actions.dealerWipsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
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
