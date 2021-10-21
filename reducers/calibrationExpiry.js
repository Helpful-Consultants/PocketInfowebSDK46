// import { Types } from '../actions/calibrationExpiry';
import Types from '../constants/Types';
import { getCalibrationExpiryCountsObj } from '../helpers/calibrationExpiry';

const defaultCounts = {
  overdueCount: 0,
  redCount: 0,
  amberCount: 0,
  totalCount: 0,
};

const INITIAL_STATE = {
  calibrationExpiryItems: [],
  calibrationExpiryCounts: defaultCounts,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
};

export default function calibrationExpiry(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);

  switch (action.type) {
    case Types.GET_CALIBRATION_EXPIRY_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.GET_CALIBRATION_EXPIRY_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log(action.payload.items && action.payload.items);
      const calibrationExpiryItemsArr =
        (action.payload && action.payload.items && action.payload.items) || [];
      const calibrationExpiryCountsObj = getCalibrationExpiryCountsObj(
        calibrationExpiryItemsArr
      );
      //   console.log(
      //     'in reducer calibrationExpiryCountsObj',
      //     calibrationExpiryCountsObj
      //   );

      return {
        ...state,
        // newsItems: [],
        calibrationExpiryItems: calibrationExpiryItemsArr,
        calibrationExpiryCounts: getCalibrationExpiryCountsObj(
          calibrationExpiryItemsArr
        ),
        calibrationExpiryCounts: calibrationExpiryCountsObj,
        overdueCount: calibrationExpiryCountsObj.overdueCount,
        redCount: calibrationExpiryCountsObj.redCount,
        amberCount: calibrationExpiryCountsObj.amberCount,
        totalCount: calibrationExpiryCountsObj.totalCount,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.EMPTY_CALIBRATION_EXPIRY_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        calibrationExpiryItems: [],
        calibrationExpiryCounts: defaultCounts,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.CALIBRATION_EXPIRY_ERROR: {
      console.log('action.type is:', action.type);
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        isLoading: false,
        isSending: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
