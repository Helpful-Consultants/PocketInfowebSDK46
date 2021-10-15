import { parse } from 'date-fns';
import { getDateDifference } from '../helpers/dates';

export const getServiceMeasuresCountsObj = (serviceMeasuresItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDateObj = new Date();

  const checkTimeToExpiry = (expiryDate) => {
    const parsedExpiryDate =
      (expiryDate && parse(expiryDate, 'dd/MM/yyyy', new Date())) || null;
    const daysLeft = 1 + getDateDifference(nowDateObj, parsedExpiryDate);
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
    expiryCount: redCount + amberCount + greenCount,
  };
  console.log(
    '%%%%%% in getServiceMeasuresCountsObj; serviceMeasuresItems length',
    serviceMeasuresItems.length,
    serviceMeasuresCountsObj
  );

  return serviceMeasuresCountsObj;

  // console.log('serviceMeasuresCount in function', serviceMeasuresCount);

  // setCalibrationredCount(redCount);
  // setCalibrationamberCount(amberCount);
  // setCalibrationgreenCount(greenCount);
  // setserviceMeasuresCount(redCount + amberCount + greenCount);
};
