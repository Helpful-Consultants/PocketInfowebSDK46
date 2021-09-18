import userSagas from './user';
import newsSagas from './news';
import ltpSagas from './ltp';
import ltpLoansSagas from './ltpLoans';
import odisSagas from './odis';
import statsSagas from './stats';
import dealerToolsSagas from './dealerTools';
import dealerWipsSagas from './dealerWips';
import serviceMeasuresSagas from './serviceMeasures';
import calibrationExpirySagas from './calibrationExpiry';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...newsSagas,
    ...ltpSagas,
    ...ltpLoansSagas,
    ...statsSagas,
    ...odisSagas,
    ...dealerToolsSagas,
    ...dealerWipsSagas,
    ...serviceMeasuresSagas,
    ...calibrationExpirySagas,
  ]);
}
