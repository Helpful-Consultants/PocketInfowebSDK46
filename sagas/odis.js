import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import * as actions from '../actions/odis';
import * as api from '../api/odis';
import Types from '../constants/Types';
import { InfoTypes } from '../constants/InfoTypes';
import shouldWeUseDummyData from '../helpers/checkDummyData';
import odisDummyData from '../dummyData/odisDummyData.js';
import { BaseNavigationContainer } from '@react-navigation/native';
export const showingDemoData = (state) => state.user.requestedDemoData;
// export const userBrand = 'pup';

function* getOdis({ payload }) {
  //   console.log(
  //     'in saga get odis, payload userBrand',
  //     payload && payload.userBrand && payload.userBrand
  //   );
  yield put(actions.getOdisStart());
  let showingDummyData = yield select(showingDemoData); // <-- get getShowingDemoData
  let showThisDummyData = yield shouldWeUseDummyData(InfoTypes.ODIS);
  //   console.log(
  //     '*************in saga, showingDummyData ',
  //     showingDummyData && showingDummyData
  //   );
  const fetchTime = Date.now();
  if (showingDummyData && showThisDummyData) {
    // console.log(
    //   'in odis saga showingDummyData is the way',
    //   odisDummyData[0].brandVersions
    // );

    // console.log('in odis saga fetchTime is', fetchTime);
    yield put(
      actions.getOdisSuccess({
        items: odisDummyData[0].brandVersions,
        statusCode: 200,
        userBrand: payload.userBrand ? payload.userBrand : null,
        fetchTime,
      })
    );
  } else {
    // console.log('in odis saga real data');
    try {
      const result = yield call(api.getOdis);
      // console.log('in saga, getOdis success');
      // console.log(result.data && result.data);
      // console.log(result.data[0] && result.data[0].brandVersions);
      if (
        result &&
        result.data &&
        result.data[0] &&
        result.data[0].id &&
        result.data[0].id.length > 0
      ) {
        //   console.log('in odis saga - good 200');
        //   console.log('result.data', result.data && result.data);

        yield put(
          actions.getOdisSuccess({
            items: result.data[0].brandVersions,
            statusCode: 200,
            userBrand: payload.userBrand ? payload.userBrand : null,
            fetchTime,
          })
        );
      } else {
        console.log('in odis saga - bad 200');
        yield put(
          actions.odisError({
            error: 'An error occurred when trying to update the ODIS versions',
          })
        );
      }
    } catch (error) {
      console.log('server error in saga get the ODIS versions !!!!!!!!!!!!!!');
      // console.log('whole Error', error);
      // console.log('whole Error ends');
      // console.log(error && error.config);
      let statusCode = null;
      let errorText =
        'An server error occurred when trying to get the ODIS versions';
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
        actions.odisError({
          error: errorText,
          statusCode: statusCode,
          dataErrorUrl: dataErrorUrl,
        })
      );
    }
  }
}

function* watchGetOdisRequest() {
  //   console.log('in saga watch');
  yield takeLatest(Types.GET_ODIS_REQUEST, getOdis);
}

const odisSagas = [fork(watchGetOdisRequest)];

export default odisSagas;
