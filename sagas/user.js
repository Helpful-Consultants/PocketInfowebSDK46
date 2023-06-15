import { takeLatest, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/user';
// import * as wipsActions from '../actions/dealerWips';
// import * as toolsActions from '../actions/dealerTools';
import * as api from '../api/user';

import Types from '../constants/Types';

function* getUser({ payload }) {
  //   console.log('in user saga - getUser called for', payload && payload);
  let statusCode = null;
  let errorText = 'An error occurred when trying to get the user';
  let dataErrorUrl = null;

  if (payload && payload.userIntId) {
    yield put(actions.getUserStart());
    //   yield put(actions.getUserResetErrors());
    try {
      const result = yield call(api.getUser, {
        userIntId: payload.userIntId,
      });
      //   console.log('in user saga - 200');
      //   console.log('result is:', result && result);
      //   console.log('result is:', result.data[0]);
      // console.log('result userId is:', result.data[0].userId);
      // console.log('result intIdis:', result.data[0].intId);

      // const userId = result.data[0].userId && result.data[0].userId;
      // const userIntId = result.data[0].intId && result.data[0].intId;
      if (result.data && result.data[0]) {
        if (
          result.data[0].intId &&
          result.data[0].intId.length > 0 &&
          result.data[0].userId &&
          result.data[0].userId.length > 0 &&
          result.data[0].dealerId &&
          result.data[0].dealerId.length > 0
        ) {
          //   console.log('in user saga - good 200', result.data);
          yield put(
            actions.getUserSuccess({
              items: result.data,
              //   userPin: payload.pin,
              //   userId: payload.email,
              statusCode:
                (result.status && result.status) ||
                (result.request.status && result.request.status) ||
                null,
            })
          );
          //   let fetchParamsObj = {
          //     dealerId:
          //       result.data[0].dealerId && result.data[0].dealerId.toString(),
          //     intId: result.data[0].intId && result.data[0].intId.toString(),
          //   };
          // console.log(
          //   'fetchParamsObj is ',
          //   fetchParamsObj,
          //   result.data[0]
          // );
          // yield put(wipsActions.getDealerWipsStart());
          // yield put(wipsActions.getDealerWipsRequest(fetchParamsObj));
          // yield put(toolsActions.getDealerToolsStart());
          // yield put(toolsActions.getDealerToolsRequest(fetchParamsObj));
        } else if (result.data[0].userId && result.data[0].userId.length > 0) {
          //   console.log('in user saga - bad 200');
          //   console.log(result.data && result.data[0]);

          const message =
            (result.data[0].userName && result.data[0].username) ||
            'user intId not accepted';
          // console.log('message is :', message);
          //   yield put(
          //     actions.getUserInvalidCredentials({
          //       error: message
          //     })
          //   );
          yield put(
            actions.userError({
              error: message,
              statusCode:
                (result.status && result.status) ||
                (result.request.status && result.request.status) ||
                null,
            })
          );
        } else {
          console.log('$$$$$$$$$$$$$$$$$ user  weird result');
          console.log(result && result);
          yield put(
            actions.userError({
              error: 'Unable to check your User ID at Tools Infoweb',
              statusCode:
                (result.request.status && result.request.status) || null,
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
      } else {
        //   console.log('$$$$$$$$$$$$$$$$$ user  very weird result');
        //   console.log(result && result);
        yield put(
          actions.userError({
            error: 'Unable to check your User ID at Tools Infoweb',
            statusCode:
              (result.request.status && result.request.status) || null,
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
    } catch (error) {
      console.log('in user saga - error time!!!!!!!!!!!!!!');
      console.log('whole Error', error);
      console.log('whole Error ends');
      console.log(error && error.config);

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
        //   console.log(
        //     'error request response ' + error.request._response &&
        //       error.request._response
        //   );
        if (error.request.status) {
          statusCode = error.request.status;
        }
        if (error.request._response) {
          errorText = error.request._response;
          if (error.request._response.indexOf(' connect') !== -1) {
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
        errorText = 'Unable to check your User ID!: ' + error.message;
      }
      yield put(
        actions.userError({
          error: errorText,
          statusCode: statusCode,
          dataErrorUrl: dataErrorUrl,
        })
      );
    }
  } else {
    errorText = 'Please sign in again for security ';
    yield put(
      actions.userError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl,
      })
    );
  }
}

function* checkUserCredentials({ payload }) {
  console.log(
    'in user creds saga - checkUserCreds called for',
    payload && payload
  );
  let statusCode = null;
  let errorText = 'An error occurred when trying to check the user creds';
  let dataErrorUrl = null;

  if (payload && payload.email && payload.pin) {
    yield put(actions.getUserStart());
    //   yield put(actions.getUserResetErrors());
    try {
      const result = yield call(api.checkUserCredentials, {
        email: payload.email,
        pin: payload.pin,
      });
      console.log('in user creds saga - 200!');
      //   console.log('result is:', result && result);
      //   console.log('result is:', result.data[0]);
      // console.log('result userId is:', result.data[0].userId);
      // console.log('result intIdis:', result.data[0].intId);

      // const userId = result.data[0].userId && result.data[0].userId;
      // const userIntId = result.data[0].intId && result.data[0].intId;
      if (result.data && result.data[0]) {
        if (
          result.data[0].intId &&
          result.data[0].intId.length > 0 &&
          result.data[0].userId &&
          result.data[0].userId.length > 0 &&
          result.data[0].dealerId &&
          result.data[0].dealerId.length > 0
        ) {
          console.log('in user creds saga - good 200', result.data);
          yield put(
            actions.getUserSuccess({
              items: result.data,
              //   userPin: payload.pin,
              //   userId: payload.email,
              statusCode:
                (result.status && result.status) ||
                (result.request.status && result.request.status) ||
                null,
            })
          );
        } else if (result.data[0].userId && result.data[0].userId.length > 0) {
          //   console.log('in user creds saga - bad 200');
          //   console.log(result.data && result.data[0]);

          const message =
            (result.data[0].userName && result.data[0].username) ||
            'Email or PIN not accepted';
          // console.log('message is :', message);
          //   yield put(
          //     actions.getUserInvalidCredentials({
          //       error: message
          //     })
          //   );
          yield put(
            actions.userError({
              error: message,
              statusCode:
                (result.status && result.status) ||
                (result.request.status && result.request.status) ||
                null,
            })
          );
        } else {
          console.log('$$$$$$$$$$$$$$$$$ user creds weird result');
          console.log(result && result);
          yield put(
            actions.userError({
              error: 'Unable to check your User ID at Tools Infoweb',
              statusCode:
                (result.request.status && result.request.status) || null,
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
      } else {
        console.log('$$$$$$$$$$$$$$$$$ user creds very weird result');
        //   console.log(result && result);
        yield put(
          actions.userError({
            error: 'Unable to check your User ID at Tools Infoweb',
            statusCode:
              (result.request.status && result.request.status) || null,
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
    } catch (error) {
      console.log('in user creds saga - error time!!!!!!!!!!!!!!');
      //   console.log('whole Error', error);
      //   console.log('whole Error ends');
      //   console.log(error && error.config);

      if (error.response) {
        // console.log('error response starts');
        // console.log('error response', error.response);
        // console.log('error response ends');
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
        //   console.log(
        //     'error request response ' + error.request._response &&
        //       error.request._response
        //   );
        if (error.request.status) {
          statusCode = error.request.status;
        }
        if (error.request._response) {
          errorText = error.request._response;
          if (error.request._response.indexOf(' connect') !== -1) {
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
        console.log('error message starts');
        console.log('Error message', error.message);
        console.log('error message ends');
        if (error.message.indexOf(' 500') !== -1) {
          statusCode = 500;
        }
        errorText = 'Unable to check your User ID: ' + error.message;
      }
      yield put(
        actions.userError({
          error: errorText,
          statusCode: statusCode,
          dataErrorUrl: dataErrorUrl,
        })
      );
    }
  } else {
    errorText = 'Please sign in again for security ';
    yield put(
      actions.userError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl,
      })
    );
  }
}

function* watchGetUserRequest() {
  //   console.log('in saga watch');
  yield takeLatest(Types.GET_USER_REQUEST, getUser);
}
function* watchCheckUserCredentialsRequest() {
  //   console.log('in saga watch');
  yield takeLatest(Types.CHECK_USER_CREDENTIALS_REQUEST, checkUserCredentials);
}

const userSagas = [
  fork(watchGetUserRequest),
  fork(watchCheckUserCredentialsRequest),
];

export default userSagas;
