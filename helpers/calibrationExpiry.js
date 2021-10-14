export const getCalibrationExpiryCountsObj = (calibrationExpiryItems) => {
  let redExpiryCount = 0;
  let amberExpiryCount = 0;
  let greenExpiryCount = 0;

  console.log(
    'in getCalibrationExpiryCountsObj; calibrationExpiryItems',
    calibrationExpiryItems
  );

  if (calibrationExpiryItems && calibrationExpiryItems.length > 0) {
    calibrationExpiryItems.map((item) => {
      if (item.expiry && item.expiry.length > 0) {
        if (item.expiry.indexOf('1.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            redExpiryCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('2.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            amberExpiryCount = parseInt(item.howMany);
          }
        } else if (item.expiry.indexOf('3.') !== -1) {
          if (!isNaN(parseInt(item.howMany))) {
            greenExpiryCount = parseInt(item.howMany);
          }
        }
      }
    });
  }

  const calibrationExpiryCountObj = {
    redExpiryCount,
    amberExpiryCount,
    greenExpiryCount,
    expiryCount: redExpiryCount + amberExpiryCount + greenExpiryCount,
  };

  return calibrationExpiryCountObj;

  // console.log('calibrationExpiryCount in function', calibrationExpiryCount);

  // setCalibrationredExpiryCount(redExpiryCount);
  // setCalibrationamberExpiryCount(amberExpiryCount);
  // setCalibrationgreenExpiryCount(greenExpiryCount);
  // setCalibrationExpiryCount(redExpiryCount + amberExpiryCount + greenExpiryCount);
};
