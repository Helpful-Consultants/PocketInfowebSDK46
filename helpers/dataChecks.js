import * as BackgroundFetch from 'expo-background-fetch';
import { store } from './store';
import { getBackgroundDataStart } from '../actions/backgroundData';
import { getOdisRequest } from '../actions/odis';
import { getNewsRequest } from '../actions/news';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';

export const fetchNotifiable = async () => {
  console.log('task management background fetchNotifiable running!');
  const result = true;
  if (store && store.dispatch) {
    store.dispatch(getBackgroundDataStart());
    store.dispatch(getOdisRequest());
    store.dispatch(getNewsRequest());
    store.dispatch(getCalibrationExpiryRequest());
    store.dispatch(getServiceMeasuresRequest());
    store.dispatch(getLtpLoansRequest());
  }
  console.log('background fetchNotifiable finished!!!!!');

  return result
    ? BackgroundFetch.BackgroundFetchResult.NewData
    : BackgroundFetch.BackgroundFetchResult.NoData;
};

export const zzzfetchNotifiable = async () => {
  console.log('task management background fetchNotifiable running!');
  const result = true;
  if (store && store.dispatch) {
    store.dispatch(getBackgroundDataStart());
    store.dispatch(getOdisRequest());
    store.dispatch(getNewsRequest());
    store.dispatch(getCalibrationExpiryRequest());
    store.dispatch(getServiceMeasuresRequest());
    store.dispatch(getLtpLoansRequest());
  }
  console.log('background fetchNotifiable finished!!!!!');

  return result
    ? BackgroundFetch.BackgroundFetchResult.NewData
    : BackgroundFetch.BackgroundFetchResult.NoData;
};
