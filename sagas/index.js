import userSagas from './user';
import newsSagas from './news';
import productsSagas from './products';
import ltpSagas from './ltp';
import odisSagas from './odis';
import statsSagas from './stats';
import dealerToolsSagas from './dealerTools';
import dealerWipsSagas from './dealerWips';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...newsSagas,
    ...productsSagas,
    ...ltpSagas,
    ...statsSagas,
    ...odisSagas,
    ...dealerToolsSagas,
    ...dealerWipsSagas
  ]);
}
