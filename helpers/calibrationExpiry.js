import { getDateDifference } from '../helpers/dates';
const defaultCounts = {
  overdueCount: 0,
  redCount: 0,
  amberCount: 0,
  totalCount: 0,
};

export const getCalibrationExpiryCountsObj = (calibrationExpiryItems) => {
  let overdueCount = 0;
  let redCount = 0;
  let amberCount = 0;

  //   console.log(
  //     'in getCalibrationExpiryCountsObj; calibrationExpiryItems',
  //     calibrationExpiryItems
  //   );

  if (calibrationExpiryItems && calibrationExpiryItems.length > 0) {
    calibrationExpiryItems.map((item) => {
      if (item.expiry && item.expiry.length > 0) {
        if (item.expiry.indexOf('1.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            overdueCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('2.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            redCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('3.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            amberCount = parseInt(item.howMany);
          }
        }
      }
    });
  }

  const calibrationExpiryCountObj = {
    overdueCount,
    redCount,
    amberCount,
    totalCount: overdueCount + redCount + amberCount,
  };

  //   console.log(
  //     'calibrationExpiryCount in getCalibrationExpiryCountsObj',
  //     calibrationExpiryCountObj
  //   );

  return calibrationExpiryCountObj;

  // console.log('calibrationExpiryCount in function', calibrationExpiryCount);

  // setCalibrationredCount(redCount);
  // setCalibrationamberCount(amberCount);
  // setCalibrationgreenCount(greenCount);
  // setCalibrationExpiryCount(redCount + amberCount + greenCount);
};
