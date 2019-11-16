import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork
} from 'redux-saga/effects';
import * as actions from '../actions/products';
import * as api from '../api/products';

function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    // console.log('in saga get products, success');
    // console.log(result);
    // console.log('end results in saga get products, success');
    yield put(
      actions.getProductsSuccess({
        items: result.data
      })
    );
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
  yield takeEvery(actions.Types.GET_PRODUCTS_REQUEST, getProducts);
}

const productsSagas = [fork(watchGetProductsRequest)];

export default productsSagas;
