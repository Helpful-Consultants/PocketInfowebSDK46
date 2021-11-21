// import { store } from './store';
import { InfoTypesAlertAges } from '../constants/InfoTypes';
import { getDateDifference, isDateAfter } from '../helpers/dates';

export const checkOdisChangeAge = (
  lastUpdated = null,
  displayTime = null,
  maxAge = InfoTypesAlertAges.ODIS_RED_PERIOD
) => {
  //   console.log(
  //     '------------checkOdisChangeAge ',
  //     'lastUpdated',
  //     lastUpdated,
  //     'displayTime',
  //     displayTime,
  //     'maxAge',
  //     maxAge
  //   );
  let recentChange = false;

  // console.log('in getOdisAlertCountForBrand', brandOdisDataObj);

  // console.log('alertNeeded', odisDataObj.brandCode, alertNeeded);

  if (lastUpdated && displayTime) {
    //   console.log('in getOdisAlertCountForBrand', odisDataObj.lastUpdated);

    // console.log(
    //   'in getOdisAlertCountForBrand comparing dates',
    //   odisDataObj.lastUpdated
    // );

    // console.log('!!!!! dateOfChange', dateOfChange);
    const ageOfChange = getDateDifference(lastUpdated, displayTime) + 1;
    // console.log('!!!!! diff', ageOfChange);
    if (ageOfChange <= maxAge) {
      recentChange = true;
      console.log('!!!!! recentChange', recentChange);
    }
  }
  return recentChange;
};

const getOdisAlertCountForBrand = (
  brandOdisDataObj,
  timestamp = null,
  minAge = InfoTypesAlertAges.ODIS_RED_PERIOD
) => {
  //   console.log(
  //     'in getOdisAlertCountForBrand brandOdisDataObj',
  //     brandOdisDataObj && brandOdisDataObj
  //   );
  let alertsNeeded = 0;

  // console.log('in getOdisAlertCountForBrand', brandOdisDataObj);

  // console.log('alertNeeded', odisDataObj.brandCode, alertNeeded);

  if (brandOdisDataObj && brandOdisDataObj.lastUpdated) {
    // console.log('in getOdisAlertCountForBrand', brandOdisDataObj.lastUpdated);

    // if (
    //   (odisDataObj.previousProductVersion &&
    //     odisDataObj.previousProductVersion !== odisDataObj.productVersion) ||
    //   (odisDataObj.previousMainFeatureVersion &&
    //     odisDataObj.previousMainFeatureVersion !==
    //       odisDataObj.mainFeatureVersion) ||
    //   (odisDataObj.previousDataVersion &&
    //     odisDataObj.previousDataVersion !== odisDataObj.dataVersion)
    // ) {
    // console.log(
    //   'in getOdisAlertCountForBrand comparing dates',
    //   odisDataObj.lastUpdated
    // );

    // console.log('!!!!! dateOfChange', dateOfChange);
    const ageOfChange = getDateDifference(
      brandOdisDataObj.lastUpdated,
      timestamp
    );
    //   console.log('!!!!! diff', ageOfChange);
    if (ageOfChange <= minAge) {
      ++alertsNeeded;
      //   console.log('!!!!! alertNeeded', alertNeeded);
    }
    // }
  }
  return {
    alertsNeeded,
    latestChangeDate: brandOdisDataObj.lastUpdated,
    oldestChangeDate: brandOdisDataObj.lastUpdated,
  };
};

const getOdisAlertCountForAllBrands = (
  odisDataObj,
  timestamp,
  minAge = InfoTypesAlertAges.ODIS_RED_PERIOD
) => {
  // console.log('odisDataObj', odisDataObj);
  // let auFromNow = 0;
  // let cvFromNow = 0;
  // let seFromNow = 0;
  // let skFromNow = 0;
  // let vwFromNow = 0;

  let alertsNeeded = 0;
  let latestChangeDate = null;
  let oldestChangeDate = null;

  //   console.log('in getOdisAlertCountForAllBrands odisDataObj', timestamp, minAge);

  if (odisDataObj.au && odisDataObj.au.lastUpdated) {
    // console.log('here@@@@@@@@@@@@@@@@@ 1111');

    // if (
    //   (odisDataObj.au.previousProductVersion &&
    //     odisDataObj.au.previousProductVersion !==
    //       odisDataObj.au.productVersion) ||
    //   (odisDataObj.au.previousMainFeatureVersion &&
    //     odisDataObj.au.previousMainFeatureVersion !==
    //       odisDataObj.au.mainFeatureVersion) ||
    //   (odisDataObj.au.previousDataVersion &&
    //     odisDataObj.au.previousDataVersion !== odisDataObj.au.dataVersion)
    // ) {
    //   console.log('!!!!! auDateOfChange', odisDataObj.au.lastUpdated, timestamp);

    const auAgeOfChange = getDateDifference(
      odisDataObj.au.lastUpdated,
      timestamp
    );

    if (auAgeOfChange <= minAge) {
      ++alertsNeeded;
      latestChangeDate = odisDataObj.au.lastUpdated;
      oldestChangeDate = odisDataObj.au.lastUpdated;
    }
    //   console.log(
    //     '!!!!! au diff',
    //     auAgeOfChange,
    //     odisDataObj.au.lastUpdated,
    //     timestamp,
    //     'alertsNeeded',
    //     alertsNeeded
    //   );
  }
  //   }
  //   console.log(
  //     'au',
  //     'latestChangeDate',
  //     latestChangeDate,
  //     'oldestChangeDate',
  //     oldestChangeDate
  //   );
  if (odisDataObj.cv && odisDataObj.cv.lastUpdated) {
    // if (
    //   (odisDataObj.cv.previousProductVersion &&
    //     odisDataObj.cv.previousProductVersion !==
    //       odisDataObj.cv.productVersion) ||
    //   (odisDataObj.cv.previousMainFeatureVersion &&
    //     odisDataObj.cv.previousMainFeatureVersion !==
    //       odisDataObj.cv.mainFeatureVersion) ||
    //   (odisDataObj.cv.previousDataVersion &&
    //     odisDataObj.cv.previousDataVersion !== odisDataObj.cv.dataVersion)
    // ) {
    const cvAgeOfChange = getDateDifference(
      odisDataObj.cv.lastUpdated,
      timestamp
    );
    if (cvAgeOfChange <= minAge) {
      ++alertsNeeded;

      latestChangeDate = latestChangeDate
        ? isDateAfter(odisDataObj.cv.lastUpdated, latestChangeDate)
          ? odisDataObj.cv.lastUpdated
          : latestChangeDate
        : odisDataObj.cv.lastUpdated;

      oldestChangeDate = oldestChangeDate
        ? isDateAfter(odisDataObj.cv.lastUpdated, oldestChangeDate)
          ? odisDataObj.cv.lastUpdated
          : oldestChangeDate
        : odisDataObj.cv.lastUpdated;
    }
    //   console.log(
    //     '!!!!! cv diff',
    //     cvAgeOfChange,
    //     odisDataObj.cv.lastUpdated,
    //     timestamp,
    //     'alertsNeeded',
    //     alertsNeeded
    //   );
  }
  //   }
  if (odisDataObj.se && odisDataObj.se.lastUpdated) {
    // if (
    //   (odisDataObj.se.previousProductVersion &&
    //     odisDataObj.se.previousProductVersion !==
    //       odisDataObj.se.productVersion) ||
    //   (odisDataObj.se.previousMainFeatureVersion &&
    //     odisDataObj.se.previousMainFeatureVersion !==
    //       odisDataObj.se.mainFeatureVersion) ||
    //   (odisDataObj.se.previousDataVersion &&
    //     odisDataObj.se.previousDataVersion !== odisDataObj.se.dataVersion)
    // ) {
    const seAgeOfChange = getDateDifference(
      odisDataObj.se.lastUpdated,
      timestamp
    );
    //   console.log('!!!!! se diff', seAgeOfChange);
    if (seAgeOfChange <= minAge) {
      ++alertsNeeded;
      latestChangeDate = latestChangeDate
        ? isDateAfter(odisDataObj.se.lastUpdated, latestChangeDate)
          ? odisDataObj.se.lastUpdated
          : latestChangeDate
        : odisDataObj.se.lastUpdated;

      oldestChangeDate = oldestChangeDate
        ? isDateAfter(odisDataObj.se.lastUpdated, oldestChangeDate)
          ? odisDataObj.se.lastUpdated
          : oldestChangeDate
        : odisDataObj.se.lastUpdated;
    }
    //   console.log(
    //     '!!!!! se diff',
    //     seAgeOfChange,
    //     odisDataObj.se.lastUpdated,
    //     timestamp,
    //     'alertsNeeded',
    //     alertsNeeded
    //   );
  }
  //   }
  if (odisDataObj.sk && odisDataObj.sk.lastUpdated) {
    // if (
    //   (odisDataObj.sk.previousProductVersion &&
    //     odisDataObj.sk.previousProductVersion !==
    //       odisDataObj.sk.productVersion) ||
    //   (odisDataObj.sk.previousMainFeatureVersion &&
    //     odisDataObj.sk.previousMainFeatureVersion !==
    //       odisDataObj.sk.mainFeatureVersion) ||
    //   (odisDataObj.sk.previousDataVersion &&
    //     odisDataObj.sk.previousDataVersion !== odisDataObj.sk.dataVersion)
    // ) {
    const skAgeOfChange = getDateDifference(
      odisDataObj.sk.lastUpdated,
      timestamp
    );
    //   console.log('!!!!! sk diff', skAgeOfChange);
    if (skAgeOfChange <= minAge) {
      ++alertsNeeded;
      latestChangeDate = latestChangeDate
        ? isDateAfter(odisDataObj.sk.lastUpdated, latestChangeDate)
          ? odisDataObj.sk.lastUpdated
          : latestChangeDate
        : odisDataObj.sk.lastUpdated;

      oldestChangeDate = oldestChangeDate
        ? isDateAfter(odisDataObj.sk.lastUpdated, oldestChangeDate)
          ? odisDataObj.sk.lastUpdated
          : oldestChangeDate
        : odisDataObj.sk.lastUpdated;
    }
    //   console.log(
    //     '!!!!! sk diff',
    //     skAgeOfChange,
    //     odisDataObj.sk.lastUpdated,
    //     timestamp,
    //     'alertsNeeded',
    //     alertsNeeded
    //   );
  }
  //   }
  if (odisDataObj.vw && odisDataObj.vw.lastUpdated) {
    // if (
    //   (odisDataObj.vw.previousProductVersion &&
    //     odisDataObj.vw.previousProductVersion !==
    //       odisDataObj.vw.productVersion) ||
    //   (odisDataObj.vw.previousMainFeatureVersion &&
    //     odisDataObj.vw.previousMainFeatureVersion !==
    //       odisDataObj.vw.mainFeatureVersion) ||
    //   (odisDataObj.vw.previousDataVersion &&
    //     odisDataObj.vw.previousDataVersion !== odisDataObj.vw.dataVersion)
    // ) {
    const vwAgeOfChange = getDateDifference(
      odisDataObj.vw.lastUpdated,
      timestamp
    );
    //   console.log('!!!!! vw diff', vwAgeOfChange);
    if (vwAgeOfChange <= minAge) {
      ++alertsNeeded;
      latestChangeDate = latestChangeDate
        ? isDateAfter(odisDataObj.vw.lastUpdated, latestChangeDate)
          ? odisDataObj.vw.lastUpdated
          : latestChangeDate
        : odisDataObj.vw.lastUpdated;

      oldestChangeDate = oldestChangeDate
        ? isDateAfter(odisDataObj.vw.lastUpdated, oldestChangeDate)
          ? odisDataObj.vw.lastUpdated
          : oldestChangeDate
        : odisDataObj.vw.lastUpdated;
    }
    //   console.log(
    //     '!!!!! vw diff',
    //     vwAgeOfChange,
    //     odisDataObj.vw.lastUpdated,
    //     timestamp,
    //     'alertsNeeded',
    //     alertsNeeded
    //   );
  }
  //   }

  //   console.log('alertNeeded', alertsNeeded);
  return {
    alertsNeeded,
    latestChangeDate,
    oldestChangeDate,
    brandCode: 'vw',
  };
};

export const getOdisAlertCount = (odisDataObj, timestamp, userBrand = null) => {
  //   const userBrand = store.getState().user.userBrand;
  let changeObj = null;
  const minAge = InfoTypesAlertAges.ODIS_RED_PERIOD;

  //   console.log('in getOdisAlertCount start', odisDataObj, timestamp, userBrand);

  if (odisDataObj) {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        changeObj = getOdisAlertCountForBrand(
          odisDataObj.au,
          timestamp,
          minAge
        );
      } else if (userBrand === 'cv') {
        // console.log('cv');
        changeObj = getOdisAlertCountForBrand(
          odisDataObj.cv,
          timestamp,
          minAge
        );
      } else if (userBrand === 'se') {
        // console.log('se');
        changeObj = getOdisAlertCountForBrand(
          odisDataObj.se,
          timestamp,
          minAge
        );
      } else if (userBrand === 'sk') {
        // console.log('sk');
        changeObj = getOdisAlertCountForBrand(
          odisDataObj.sk,
          timestamp,
          minAge
        );
      } else if (userBrand === 'vw') {
        // console.log('vw,  odisDataObj', odisDataObj);
        changeObj = getOdisAlertCountForBrand(
          odisDataObj.vw,
          timestamp,
          minAge
        );
      }
    } else {
      //   console.log('getOdisAlertCount all brands');
      changeObj = getOdisAlertCountForAllBrands(odisDataObj, timestamp, minAge);
    }
  }

  //   console.log('in getOdisAlertCount else', userBrand);
  if (userBrand) {
    changeObj = { ...changeObj, userBrand: userBrand };
  }

  //   console.log('in getOdisAlertCount end', odisDataObj, timestamp, userBrand);
  return changeObj;
};
