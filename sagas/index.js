import userSagas from './users';
import newsSagas from './news';
import productsSagas from './products';
import ltpSagas from './ltp';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([...userSagas, ...newsSagas, ...productsSagas, ...ltpSagas]);
}
