// import { store } from './store';
import { InfoTypesAlertAges } from '../constants/InfoTypes';
import { getDateDifference, isDateAfter } from '../helpers/dates';

const getOdisAlertCountForBrand = (
  brandOdisDataObj,
  now,
  minAge = InfoTypesAlertAges.ODIS_RED_PERIOD
) => {
  // console.log(
  //   'brand brandOdisDataObj date ',
  //   odisDataObj.dateChanged && odisDataObj.dateChanged
  // );
  let alertsNeeded = 0;

  // console.log('in getOdisAlertCountForBrand', brandOdisDataObj);

  // console.log('alertNeeded', odisDataObj.brandCode, alertNeeded);

  if (brandOdisDataObj && odisDataObj.lastUpdated) {
    //   auFromNow = moment(odisDataObj.dateChanged).fromNow();
    //   console.log('in getOdisAlertCountForBrand', odisDataObj.lastUpdated);

    if (
      (odisDataObj.previousProductVersion &&
        odisDataObj.previousProductVersion !== odisDataObj.productVersion) ||
      (odisDataObj.previousMainFeatureVersion &&
        odisDataObj.previousMainFeatureVersion !==
          odisDataObj.mainFeatureVersion) ||
      (odisDataObj.previousDataVersion &&
        odisDataObj.previousDataVersion !== odisDataObj.dataVersion)
    ) {
      // console.log(
      //   'in getOdisAlertCountForBrand comparing dates',
      //   odisDataObj.lastUpdated
      // );

      // console.log('!!!!! dateOfChange', dateOfChange);
      const ageOfChange = getDateDifference(odisDataObj.lastUpdated, now);
      // console.log('!!!!! diff', ageOfChange);
      if (ageOfChange <= minAge) {
        ++alertsNeeded;
        //   console.log('!!!!! alertNeeded', alertNeeded);
      }
    }
  }
  return {
    alertsNeeded,
    latestChangeDate: odisDataObj.lastUpdated,
    oldestChangeDate: odisDataObj.lastUpdated,
  };
};

const getOdisAlertCountForAllBrands = (
  odisDataObj,
  now,
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
  let brandCode = null;

  //   console.log('in getOdisAlertCountForAllBrands odisDataObj', now, minAge);

  if (odisDataObj.au && odisDataObj.au.lastUpdated) {
    //   auFromNow = moment(odisDataObj.au.dateChanged).fromNow();
    // console.log('here@@@@@@@@@@@@@@@@@ 1111');

    if (
      (odisDataObj.au.previousProductVersion &&
        odisDataObj.au.previousProductVersion !==
          odisDataObj.au.productVersion) ||
      (odisDataObj.au.previousMainFeatureVersion &&
        odisDataObj.au.previousMainFeatureVersion !==
          odisDataObj.au.mainFeatureVersion) ||
      (odisDataObj.au.previousDataVersion &&
        odisDataObj.au.previousDataVersion !== odisDataObj.au.dataVersion)
    ) {
      //   console.log('!!!!! auDateOfChange', auDateOfChange);

      const auAgeOfChange = getDateDifference(odisDataObj.au.lastUpdated, now);

      if (auAgeOfChange <= minAge) {
        ++alertsNeeded;
        latestChangeDate = odisDataObj.au.lastUpdated;
        oldestChangeDate = odisDataObj.au.lastUpdated;
      }
      //   console.log(
      //     '!!!!! au diff',
      //     auAgeOfChange,
      //     odisDataObj.au.lastUpdated,
      //     now,
      //     'alertsNeeded',
      //     alertsNeeded
      //   );
    }
  }
  console.log(
    'au',
    'latestChangeDate',
    latestChangeDate,
    'oldestChangeDate',
    oldestChangeDate
  );
  if (odisDataObj.cv && odisDataObj.cv.lastUpdated) {
    //   cvFromNow = moment(odisDataObj.cv.dateChanged).fromNow();

    if (
      (odisDataObj.cv.previousProductVersion &&
        odisDataObj.cv.previousProductVersion !==
          odisDataObj.cv.productVersion) ||
      (odisDataObj.cv.previousMainFeatureVersion &&
        odisDataObj.cv.previousMainFeatureVersion !==
          odisDataObj.cv.mainFeatureVersion) ||
      (odisDataObj.cv.previousDataVersion &&
        odisDataObj.cv.previousDataVersion !== odisDataObj.cv.dataVersion)
    ) {
      const cvAgeOfChange = getDateDifference(odisDataObj.cv.lastUpdated, now);
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
      //     now,
      //     'alertsNeeded',
      //     alertsNeeded
      //   );
    }
  }
  if (odisDataObj.se && odisDataObj.se.lastUpdated) {
    //   seFromNow = moment(odisDataObj.se.dateChanged).fromNow();

    if (
      (odisDataObj.se.previousProductVersion &&
        odisDataObj.se.previousProductVersion !==
          odisDataObj.se.productVersion) ||
      (odisDataObj.se.previousMainFeatureVersion &&
        odisDataObj.se.previousMainFeatureVersion !==
          odisDataObj.se.mainFeatureVersion) ||
      (odisDataObj.se.previousDataVersion &&
        odisDataObj.se.previousDataVersion !== odisDataObj.se.dataVersion)
    ) {
      const seAgeOfChange = getDateDifference(odisDataObj.se.lastUpdated, now);
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
      //     now,
      //     'alertsNeeded',
      //     alertsNeeded
      //   );
    }
  }
  if (odisDataObj.sk && odisDataObj.sk.lastUpdated) {
    //   skFromNow = moment(odisDataObj.sk.dateChanged).fromNow();

    if (
      (odisDataObj.sk.previousProductVersion &&
        odisDataObj.sk.previousProductVersion !==
          odisDataObj.sk.productVersion) ||
      (odisDataObj.sk.previousMainFeatureVersion &&
        odisDataObj.sk.previousMainFeatureVersion !==
          odisDataObj.sk.mainFeatureVersion) ||
      (odisDataObj.sk.previousDataVersion &&
        odisDataObj.sk.previousDataVersion !== odisDataObj.sk.dataVersion)
    ) {
      const skAgeOfChange = getDateDifference(odisDataObj.sk.lastUpdated, now);
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
      //     now,
      //     'alertsNeeded',
      //     alertsNeeded
      //   );
    }
  }
  if (odisDataObj.vw && odisDataObj.vw.lastUpdated) {
    //   vwFromNow = moment(odisDataObj.vw.dateChanged).fromNow();

    if (
      (odisDataObj.vw.previousProductVersion &&
        odisDataObj.vw.previousProductVersion !==
          odisDataObj.vw.productVersion) ||
      (odisDataObj.vw.previousMainFeatureVersion &&
        odisDataObj.vw.previousMainFeatureVersion !==
          odisDataObj.vw.mainFeatureVersion) ||
      (odisDataObj.vw.previousDataVersion &&
        odisDataObj.vw.previousDataVersion !== odisDataObj.vw.dataVersion)
    ) {
      const vwAgeOfChange = getDateDifference(odisDataObj.vw.lastUpdated, now);
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
      //     now,
      //     'alertsNeeded',
      //     alertsNeeded
      //   );
    }
  }

  //   console.log('alertNeeded', alertsNeeded);
  return {
    alertsNeeded,
    latestChangeDate,
    oldestChangeDate,
    brandCode: 'vw',
  };
};

export const getOdisAlertCount = (odisDataObj, now, userBrand = null) => {
  //   const userBrand = store.getState().user.userBrand;
  let changeObj = null;
  const minAge = InfoTypesAlertAges.ODIS_RED_PERIOD;

  //   console.log('in getOdisAlertCount', now, userBrand);

  if (odisDataObj) {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        changeObj = getOdisAlertCountForBrand(odisDataObj.au, now, minAge);
      } else if (userBrand === 'cv') {
        // console.log('cv');
        changeObj = getOdisAlertCountForBrand(odisDataObj.cv, now, minAge);
      } else if (userBrand === 'se') {
        // console.log('se');
        changeObj = getOdisAlertCountForBrand(odisDataObj.se, now, minAge);
      } else if (userBrand === 'sk') {
        // console.log('sk');
        changeObj = getOdisAlertCountForBrand(odisDataObj.sk, now, minAge);
      } else if (userBrand === 'vw') {
        // console.log('vw');
        changeObj = getOdisAlertCountForBrand(odisDataObj.vw, now, minAge);
      }
    } else {
      //   console.log('getOdisAlertCount all brands');
      changeObj = getOdisAlertCountForAllBrands(odisDataObj, now, minAge);
    }
  }
  if (userBrand) {
    changeObj = { ...changeObj, userBrand: userBrand };
  }
  return changeObj;
};
