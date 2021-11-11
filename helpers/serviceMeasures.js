import { getDateDifference } from '../helpers/dates';

export const getServiceMeasuresCountsObj = (serviceMeasuresItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDate = Date.now();

  const checkTimeToExpiry = (expiryDate = null) => {
    const daysLeft = getDateDifference(nowDate, expiryDate) + 1; // add 1 for today;
    // console.log(
    //   '£££ in getServiceMeasuresCountsObj, checkTimeToExpiry ',
    //   expiryDate,
    //   'parsedExpiryDate',
    //   parsedExpiryDate,
    //   daysLeft
    // );
    return daysLeft;
  };

  //   console.log(
  //     'in getServiceMeasuresCountsObj; serviceMeasuresItems length',
  //     serviceMeasuresItems.length
  //   );

  if (serviceMeasuresItems && serviceMeasuresItems.length > 0) {
    serviceMeasuresItems.map((item) => {
      const timeToExpiry =
        item.expiryDate && checkTimeToExpiry(item.expiryDate);
      //   console.log(
      //     'in getServiceMeasuresCountsObj; ',
      //     'item.expiryDate',
      //     item.expiryDate,
      //     'timeToExpiry',
      //     timeToExpiry
      //   );
      if (timeToExpiry !== null) {
        if (timeToExpiry <= 3) {
          redCount++;
        } else if (timeToExpiry <= 8) {
          amberCount++;
        } else {
          greenCount++;
        }
      }
    });
  }

  const serviceMeasuresCountsObj = {
    redCount,
    amberCount,
    greenCount,
    totalCount: redCount + amberCount + greenCount,
  };
  //   console.log(
  //     '%%%%%% in getServiceMeasuresCountsObj; serviceMeasuresItems length',
  //     serviceMeasuresItems.length,
  //     serviceMeasuresCountsObj
  //   );

  return serviceMeasuresCountsObj;

  // console.log('serviceMeasuresCount in function', serviceMeasuresCount);

  // setCalibrationredCount(redCount);
  // setCalibrationamberCount(amberCount);
  // setCalibrationgreenCount(greenCount);
  // setserviceMeasuresCount(redCount + amberCount + greenCount);
};
