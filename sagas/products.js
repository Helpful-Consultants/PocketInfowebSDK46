import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';

import Types from '../constants/Types';
import * as actions from '../actions/products';
import * as api from '../api/products';

function* getProducts() {
  yield put(actions.getProductsStart());
  try {
    const result = yield call(api.getProducts);
    if (
      result.data[0].id &&
      result.data[0].id.length > 0 &&
      result.data[0].createdDate &&
      result.data[0].createdDate.length > 0
    ) {
      //   console.log('in products saga - good 200');
      yield put(
        actions.getProductsSuccess({
          items: result.data
        })
      );
    } else {
      console.log('in products saga - bad 200');
      yield put(
        actions.productsError({
          error: 'An error occurred when trying to update the products'
        })
      );
    }
  } catch (error) {
    console.log('server error in saga get products !!!!!!!!!!!!!!');
    // console.log('whole Error', error);
    // console.log('whole Error ends');
    // console.log(error && error.config);
    let statusCode = null;
    let errorText = 'An server error occurred when trying to get the products';
    let dataErrorUrl = null;
    if (error.response) {
      //   console.log('error response starts');
      //   console.log('error response', error.response);
      //   console.log('error response ends');
      if (error.response.status) {
        statusCode = error.response.status.toString();
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
        statusCode = error.request.status.toString();
      }
      if (error.request._response) {
        errorText = error.request._response;
        if (
          error.request._response.indexOf('connect') !== -1 ||
          error.request._response.indexOf('timed out') !== -1
        ) {
          statusCode = '999';
        } else {
          if (error.request.status) {
            statusCode = error.request.status.toString();
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
        statusCode = '500';
      }
      errorText = error.message;
    }
    yield put(
      actions.productsError({
        error: errorText,
        statusCode: statusCode,
        dataErrorUrl: dataErrorUrl
      })
    );
  }
}

function* watchGetProductsRequest() {
  //   console.log('in saga watch for products');
  yield takeEvery(Types.GET_PRODUCTS_REQUEST, getProducts);
}

const productsSagas = [fork(watchGetProductsRequest)];

export default productsSagas;
