import userSagas from './user';
import newsSagas from './news';
import productsSagas from './products';
import ltpSagas from './ltp';
import ltpBookingsSagas from './ltpBookings';
import odisSagas from './odis';
import statsSagas from './stats';
import dealerToolsSagas from './dealerTools';
import dealerWipsSagas from './dealerWips';
import serviceMeasuresSagas from './serviceMeasures';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...newsSagas,
    ...productsSagas,
    ...ltpSagas,
    ...ltpBookingsSagas,
    ...statsSagas,
    ...odisSagas,
    ...dealerToolsSagas,
    ...dealerWipsSagas,
    ...serviceMeasuresSagas,
  ]);
}
