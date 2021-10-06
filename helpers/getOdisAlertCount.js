import moment from 'moment';
import { store } from './store';

const getOdisAlertCountForBrand = (
  brandOdisDataObj,
  now,
  notificationLimit = 0
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
      let ageOfChange = now.diff(moment(dateOfChange), 'days') || 0;
      // console.log('!!!!! diff', ageOfChange);
      if (ageOfChange <= notificationLimit) {
        ++alertsNeeded;
        //   console.log('!!!!! alertNeeded', alertNeeded);
      }
    }
  }
  return alertsNeeded;
};

const getOdisAlertCountForAllBrands = (
  allBrandOdisDataObj,
  now,
  notificationLimit = 0
) => {
  // console.log('allBrandOdisDataObj', allBrandOdisDataObj);
  // let auFromNow = 0;
  // let cvFromNow = 0;
  // let seFromNow = 0;
  // let skFromNow = 0;
  // let vwFromNow = 0;

  let alertsNeeded = 0;

  // console.log('in getOdisAlertCountForAllBrands allBrandOdisDataObj', allBrandOdisDataObj);

  if (allBrandOdisDataObj.au && allBrandOdisDataObj.au.lastUpdated) {
    //   auFromNow = moment(allBrandOdisDataObj.au.dateChanged).fromNow();

    if (
      (allBrandOdisDataObj.au.previousProductVersion &&
        allBrandOdisDataObj.au.previousProductVersion !==
          allBrandOdisDataObj.au.productVersion) ||
      (allBrandOdisDataObj.au.previousMainFeatureVersion &&
        allBrandOdisDataObj.au.previousMainFeatureVersion !==
          allBrandOdisDataObj.au.mainFeatureVersion) ||
      (allBrandOdisDataObj.au.previousDataVersion &&
        allBrandOdisDataObj.au.previousDataVersion !==
          allBrandOdisDataObj.au.dataVersion)
    ) {
      let auDateOfChange = moment(
        allBrandOdisDataObj.au.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! auDateOfChange', auDateOfChange);
      let auAgeOfChange = now.diff(moment(auDateOfChange), 'days') || 0;
      //   console.log('!!!!! au diff', auAgeOfChange);
      if (auAgeOfChange <= notificationLimit) {
        ++alertsNeeded;
      }
    }
  }
  if (allBrandOdisDataObj.cv && allBrandOdisDataObj.cv.lastUpdated) {
    //   cvFromNow = moment(allBrandOdisDataObj.cv.dateChanged).fromNow();

    if (
      (allBrandOdisDataObj.cv.previousProductVersion &&
        allBrandOdisDataObj.cv.previousProductVersion !==
          allBrandOdisDataObj.cv.productVersion) ||
      (allBrandOdisDataObj.cv.previousMainFeatureVersion &&
        allBrandOdisDataObj.cv.previousMainFeatureVersion !==
          allBrandOdisDataObj.cv.mainFeatureVersion) ||
      (allBrandOdisDataObj.cv.previousDataVersion &&
        allBrandOdisDataObj.cv.previousDataVersion !==
          allBrandOdisDataObj.cv.dataVersion)
    ) {
      let cvDateOfChange = moment(
        allBrandOdisDataObj.cv.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! cvDateOfChange', cvDateOfChange);
      let cvAgeOfChange = now.diff(moment(cvDateOfChange), 'days') || 0;
      //   console.log('!!!!! cv diff', cvAgeOfChange);
      if (cvAgeOfChange <= notificationLimit) {
        ++alertsNeeded;
      }
    }
  }
  if (allBrandOdisDataObj.se && allBrandOdisDataObj.se.lastUpdated) {
    //   seFromNow = moment(allBrandOdisDataObj.se.dateChanged).fromNow();

    if (
      (allBrandOdisDataObj.se.previousProductVersion &&
        allBrandOdisDataObj.se.previousProductVersion !==
          allBrandOdisDataObj.se.productVersion) ||
      (allBrandOdisDataObj.se.previousMainFeatureVersion &&
        allBrandOdisDataObj.se.previousMainFeatureVersion !==
          allBrandOdisDataObj.se.mainFeatureVersion) ||
      (allBrandOdisDataObj.se.previousDataVersion &&
        allBrandOdisDataObj.se.previousDataVersion !==
          allBrandOdisDataObj.se.dataVersion)
    ) {
      let seDateOfChange = moment(
        allBrandOdisDataObj.se.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! seDateOfChange', seDateOfChange);
      let seAgeOfChange = now.diff(moment(seDateOfChange), 'days') || 0;
      //   console.log('!!!!! se diff', seAgeOfChange);
      if (seAgeOfChange <= notificationLimit) {
        ++alertsNeeded;
      }
    }
  }
  if (allBrandOdisDataObj.sk && allBrandOdisDataObj.sk.lastUpdated) {
    //   skFromNow = moment(allBrandOdisDataObj.sk.dateChanged).fromNow();

    if (
      (allBrandOdisDataObj.sk.previousProductVersion &&
        allBrandOdisDataObj.sk.previousProductVersion !==
          allBrandOdisDataObj.sk.productVersion) ||
      (allBrandOdisDataObj.sk.previousMainFeatureVersion &&
        allBrandOdisDataObj.sk.previousMainFeatureVersion !==
          allBrandOdisDataObj.sk.mainFeatureVersion) ||
      (allBrandOdisDataObj.sk.previousDataVersion &&
        allBrandOdisDataObj.sk.previousDataVersion !==
          allBrandOdisDataObj.sk.dataVersion)
    ) {
      let skDateOfChange = moment(
        allBrandOdisDataObj.sk.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! skDateOfChange', skDateOfChange);
      let skAgeOfChange = now.diff(moment(skDateOfChange), 'days') || 0;
      //   console.log('!!!!! sk diff', skAgeOfChange);
      if (skAgeOfChange <= notificationLimit) {
        ++alertsNeeded;
      }
    }
  }
  if (allBrandOdisDataObj.vw && allBrandOdisDataObj.vw.lastUpdated) {
    //   vwFromNow = moment(allBrandOdisDataObj.vw.dateChanged).fromNow();

    if (
      (allBrandOdisDataObj.vw.previousProductVersion &&
        allBrandOdisDataObj.vw.previousProductVersion !==
          allBrandOdisDataObj.vw.productVersion) ||
      (allBrandOdisDataObj.vw.previousMainFeatureVersion &&
        allBrandOdisDataObj.vw.previousMainFeatureVersion !==
          allBrandOdisDataObj.vw.mainFeatureVersion) ||
      (allBrandOdisDataObj.vw.previousDataVersion &&
        allBrandOdisDataObj.vw.previousDataVersion !==
          allBrandOdisDataObj.vw.dataVersion)
    ) {
      let vwDateOfChange = moment(
        allBrandOdisDataObj.vw.lastUpdated,
        'DD/MM/YYYY HH:mm:ss'
      );
      //   console.log('!!!!! vwDateOfChange', vwDateOfChange);
      let vwAgeOfChange = now.diff(moment(vwDateOfChange), 'days') || 0;
      //   console.log('!!!!! vw diff', vwAgeOfChange);
      if (vwAgeOfChange <= notificationLimit) {
        ++alertsNeeded;
      }
    }
  }
  // if (allBrandOdisDataObj.vw && allBrandOdisDataObj.vw.lastUpdated) {
  //   //   vwFromNow = moment(allBrandOdisDataObj.vw.dateChanged).fromNow();
  //   let vwDateOfChange = moment(
  //     allBrandOdisDataObj.vw.lastUpdated,
  //     'DD/MM/YYYY HH:mm:ss'
  //   );
  //   //   console.log('!!!!! vwDateOfChange', vwDateOfChange);
  //   let vwAgeOfChange = now.diff(moment(vwDateOfChange), 'days') || 0;
  //   //   console.log('!!!!! vw diff', vwAgeOfChange);
  //   if (vwAgeOfChange <= notificationLimit) {
  //     alertNeeded = true;
  //   }
  // }

  // console.log('alertNeeded', alertNeeded);

  return alertsNeeded;
};

const getOdisAlertCount = (notificationLimit = 0) => {
  const allBrandOdisDataObj = store.getState().odis.odisData;
  const userBrand = store.getState().user.userBrand;
  let alertsNeeded = 0;
  const now = moment();
  if (allBrandOdisDataObj) {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        alertsNeeded = getOdisAlertCountForBrand(
          allBrandOdisDataObj.au,
          now,
          notificationLimit
        );
      } else if (userBrand === 'cv') {
        // console.log('cv');
        alertsNeeded = getOdisAlertCountForBrand(
          allBrandOdisDataObj.cv,
          now,
          notificationLimit
        );
      } else if (userBrand === 'se') {
        // console.log('se');
        alertsNeeded = getOdisAlertCountForBrand(
          allBrandOdisDataObj.se,
          now,
          notificationLimit
        );
      } else if (userBrand === 'sk') {
        // console.log('sk');
        alertsNeeded = getOdisAlertCountForBrand(
          allBrandOdisDataObj.sk,
          now,
          notificationLimit
        );
      } else if (userBrand === 'vw') {
        // console.log('vw');
        alertsNeeded = getOdisAlertCountForBrand(
          allBrandOdisDataObj.vw,
          now,
          notificationLimit
        );
      }
    } else {
      alertsNeeded = getOdisAlertCountForAllBrands(
        allBrandOdisDataObj,
        now,
        notificationLimit
      );
    }
  }
  return alertsNeeded;
};

export default getOdisAlertCount;
