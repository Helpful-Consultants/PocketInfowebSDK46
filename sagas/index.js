import userSagas from './users';
import newsSagas from './news';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([...userSagas, ...newsSagas]);
}
