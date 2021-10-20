import { getDateDifference } from '../helpers/dates';
const defaultCounts = {
  redCount: 0,
  amberCount: 0,
  greenCount: 0,
  totalCount: 0,
};

export const getCalibrationExpiryCountsObj = (calibrationExpiryItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDateObj = new Date();

  //   console.log(
  //     'in getCalibrationExpiryCountsObj; calibrationExpiryItems',
  //     calibrationExpiryItems
  //   );

  if (calibrationExpiryItems && calibrationExpiryItems.length > 0) {
    calibrationExpiryItems.map((item) => {
      if (item.expiry && item.expiry.length > 0) {
        if (item.expiry.indexOf('1.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            redCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('2.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            amberCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('3.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            greenCount = parseInt(item.howMany);
          }
        }
      }
    });
  }

  const calibrationExpiryCountObj = {
    redCount,
    amberCount,
    greenCount,
    totalCount: redCount + amberCount + greenCount,
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
