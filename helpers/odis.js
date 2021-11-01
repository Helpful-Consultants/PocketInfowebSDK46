import moment from 'moment';
// import { store } from './store';
import {
  InfoTypesAlertUnits,
  InfoTypesAlertAges,
} from '../constants/InfoTypes';

const getOdisAlertCountForBrand = (
  brandOdisDataObj,
  now,
  unit = InfoTypesAlertUnits.ODIS,
  minAge = InfoTypesAlertAges.ODIS
) => {
  // console.log(
  //   'brand brandOdisDataObj date ',
  //   brandOdisDataObj.dateChanged && brandOdisDataObj.dateChanged
  // );
  let alertsNeeded = 0;

  // console.log('in getOdisAlertCountForBrand', brandOdisDataObj);

  // console.log('alertNeeded', brandOdisDataObj.brandCode, alertNeeded);

  if (brandOdisDataObj && brandOdisDataObj.lastUpdated) {
    //   auFromNow = moment(brandOdisDataObj.dateChanged).fromNow();
    //   console.log('in getOdisAlertCountForBrand', brandOdisDataObj.lastUpdated);

    if (
      (brandOdisDataObj.previousProductVersion &&
        brandOdisDataObj.previousProductVersion !==
          brandOdisDataObj.productVersion) ||
      (brandOdisDataObj.previousMainFeatureVersion &&
        brandOdisDataObj.previousMainFeatureVersion !==
          brandOdisDataObj.mainFeatureVersion) ||
      (brandOdisDataObj.previousDataVersion &&
        brandOdisDataObj.previousDataVersion !== brandOdisDataObj.dataVersion)
    ) {
      // console.log(
      //   'in getOdisAlertCountForBrand comparing dates',
      //   brandOdisDataObj.lastUpdated
      // );
      let dateOfChange = moment(
        brandOdisDataObj.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      // console.log('!!!!! dateOfChange', dateOfChange);
      let ageOfChange = now.diff(moment(dateOfChange), unit) || 0;
      // console.log('!!!!! diff', ageOfChange);
      if (ageOfChange <= minAge) {
        ++alertsNeeded;
        //   console.log('!!!!! alertNeeded', alertNeeded);
      }
    }
  }
  return alertsNeeded;
};

const getOdisAlertCountForAllBrands = (
  odisDataObj,
  now,
  unit = InfoTypesAlertUnits.ODIS,
  minAge = InfoTypesAlertAges.ODIS
) => {
  // console.log('odisDataObj', odisDataObj);
  // let auFromNow = 0;
  // let cvFromNow = 0;
  // let seFromNow = 0;
  // let skFromNow = 0;
  // let vwFromNow = 0;

  let alertsNeeded = 0;

  // console.log('in getOdisAlertCountForAllBrands odisDataObj', odisDataObj);

  if (odisDataObj.au && odisDataObj.au.lastUpdated) {
    //   auFromNow = moment(odisDataObj.au.dateChanged).fromNow();

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
      let auDateOfChange = moment(
        odisDataObj.au.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! auDateOfChange', auDateOfChange);
      let auAgeOfChange = now.diff(moment(auDateOfChange), unit) || 0;
      //   console.log('!!!!! au diff', auAgeOfChange);
      if (auAgeOfChange <= minAge) {
        ++alertsNeeded;
      }
    }
  }
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
      let cvDateOfChange = moment(
        odisDataObj.cv.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! cvDateOfChange', cvDateOfChange);
      let cvAgeOfChange = now.diff(moment(cvDateOfChange), unit) || 0;
      //   console.log('!!!!! cv diff', cvAgeOfChange);
      if (cvAgeOfChange <= minAge) {
        ++alertsNeeded;
      }
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
      let seDateOfChange = moment(
        odisDataObj.se.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! seDateOfChange', seDateOfChange);
      let seAgeOfChange = now.diff(moment(seDateOfChange), unit) || 0;
      //   console.log('!!!!! se diff', seAgeOfChange);
      if (seAgeOfChange <= minAge) {
        ++alertsNeeded;
      }
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
      let skDateOfChange = moment(
        odisDataObj.sk.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! skDateOfChange', skDateOfChange);
      let skAgeOfChange = now.diff(moment(skDateOfChange), unit) || 0;
      //   console.log('!!!!! sk diff', skAgeOfChange);
      if (skAgeOfChange <= minAge) {
        ++alertsNeeded;
      }
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
      let vwDateOfChange = moment(
        odisDataObj.vw.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! vwDateOfChange', vwDateOfChange);
      let vwAgeOfChange = now.diff(moment(vwDateOfChange), unit) || 0;
      //   console.log('!!!!! vw diff', vwAgeOfChange);
      if (vwAgeOfChange <= minAge) {
        ++alertsNeeded;
      }
    }
  }
  // if (odisDataObj.vw && odisDataObj.vw.lastUpdated) {
  //   //   vwFromNow = moment(odisDataObj.vw.dateChanged).fromNow();
  //   let vwDateOfChange = moment(
  //     odisDataObj.vw.lastUpdated,
  //     'DD/MM/YYYY HH:mm:ss'
  //   );
  //   //   console.log('!!!!! vwDateOfChange', vwDateOfChange);
  //   let vwAgeOfChange = now.diff(moment(vwDateOfChange), unit) || 0;
  //   //   console.log('!!!!! vw diff', vwAgeOfChange);
  //   if (vwAgeOfChange <= minAge) {
  //     alertNeeded = true;
  //   }
  // }

  // console.log('alertNeeded', alertNeeded);

  return alertsNeeded;
};

export const getOdisAlertCount = (odisDataObj, userBrand = null) => {
  //   const userBrand = store.getState().user.userBrand;
  let alertsNeeded = 0;
  const minAge = InfoTypesAlertAges.ODIS;
  const now = moment();
  if (odisDataObj) {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        alertsNeeded = getOdisAlertCountForBrand(odisDataObj.au, now, minAge);
      } else if (userBrand === 'cv') {
        // console.log('cv');
        alertsNeeded = getOdisAlertCountForBrand(odisDataObj.cv, now, minAge);
      } else if (userBrand === 'se') {
        // console.log('se');
        alertsNeeded = getOdisAlertCountForBrand(odisDataObj.se, now, minAge);
      } else if (userBrand === 'sk') {
        // console.log('sk');
        alertsNeeded = getOdisAlertCountForBrand(odisDataObj.sk, now, minAge);
      } else if (userBrand === 'vw') {
        // console.log('vw');
        alertsNeeded = getOdisAlertCountForBrand(odisDataObj.vw, now, minAge);
      }
    } else {
      alertsNeeded = getOdisAlertCountForAllBrands(odisDataObj, now, minAge);
    }
  }
  return 1;
};
