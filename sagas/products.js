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
      console.log('in products saga - good 200');
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
  } catch (e) {
    console.log('error!!!!!!!!!!!!!!');
    yield put(
      actions.productsError({
        error: 'An error occurred when trying to get the products'
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
