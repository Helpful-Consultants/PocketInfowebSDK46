import { takeLatest, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/calibrationExpiry';
import * as api from '../api/calibrationExpiry';
import Types from '../constants/Types';

function* getCalibrationExpiry({ payload }) {
  //   console.log(
  //     '%%%%%%%%%%%%%%in saga get calibrationExpiry, payload',
  //     payload && payload
  //   );
  let statusCode = null;
  let errorText =
    'An error occurred when trying to get the calibartion expirations';
  let dataErrorUrl = null;
  yield put(actions.getCalibrationExpiryStart());
  try {
    const result = yield call(api.getCalibrationExpiry, {
      dealerId: payload.dealerId,
    });
    // console.log('in saga get calibrationExpiry - 200');
    // console.log(result);
    if (
      result.data &&
      result.data.length > 0 &&
      result.data &&
      result.data[0].howMany &&
      result.data[0].expiry
    ) {
      //   console.log('in CalibrationExpiry saga - good 200');
      //   console.log(result.data);
      yield put(
        actions.getCalibrationExpirySuccess({
          items: result.data,
          statusCode:
            (result.status && result.status) ||
            (result.request.status && result.request.status) ||
            null,
        })
      );
    } else if (result && result.data) {
      //   console.log('in CalibrationExpiry saga - empty 200');
      //   console.log(
      //     'in CalibrationExpiry saga - empty 200',
      //     result.request.status && result.request.status
      //   );
      //   console.log(result && result);
      yield put(
        actions.getCalibrationExpirySuccess({
          items: [],
          statusCode:
            (result.status && result.status) ||
            (result.request.status && result.request.status) ||
            null,
        })
      );
    } else {
      console.log('dealer calibrationExpiry weird result');
      console.log(result && result);
      yield put(
        actions.calibrationExpiryError({
          error:
            (result.request.response && result.request.response.toString()) ||
            'An error occurred when trying to update the calibrationExpiry',
          statusCode: (result.request.status && result.request.status) || null,
          dataErrorUrl:
            (result && result.responseURL && result.responseURL) ||
            (result &&
              result.request &&
              result.request._url &&
              result.request._url) ||
            null,
        })
      );
    }
    // console.log(result);
    // console.log('end results in saga get calibrationExpiry, success');
  } catch (error) {
    console.log('server error in saga get calibrationExpiry !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);
    let statusCode = null;
    let errorText =
      'An server error occurred when trying to get calibrationExpiry';
    let dataErrorUrl = null;
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
      actions.calibrationExpiryError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl,
      })
    );
  }
}

function* watchGetCalibrationExpiryRequest() {
  //   console.log('in saga watch for calibrationExpiry');
  yield takeLatest(Types.GET_CALIBRATION_EXPIRY_REQUEST, getCalibrationExpiry);
}

const calibrationExpirySagas = [fork(watchGetCalibrationExpiryRequest)];

export default calibrationExpirySagas;
