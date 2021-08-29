import React from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import BlinkingView from './BlinkingView';

var { screenHeight, screenWidth } = Dimensions.get('window');
var gridHeight = screenHeight * 0.18;
var gridWidth = screenWidth * 0.3;
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);
var iconSizeSmall = RFPercentage(3.5);

const buttonColor = Colors.vwgDeepBlue;
const buttonTextColor = Colors.vwgWhite;
const disabledButtonTextColor = Colors.vwgDarkGay;
const iconColor = Colors.vwgDeepBlue;
const iconColorHighlighted = Colors.vwgWarmOrange;
const disabledButtonColor = Colors.vwgMidGray;

export default function OdisLinkWithStatus(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('%%%%%% in OdisLinkWithStatus ');
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const { itemsObj, navigation, userBrand, viewCount, viewMax, showingOldApp } =
    props;
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('in odisstatus userBrand', userBrand && userBrand);
  //   console.log('in odisstatus odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);
  const notificationLimit = 7;
  let odisChanged = false;

  const now = moment();
  //   console.log(now);

  const getOdisStatusForBrand = (itemObj) => {
    // console.log(
    //   'brand itemObj date ',
    //   itemObj.dateChanged && itemObj.dateChanged
    // );
    let alertNeeded = false;

    // console.log('in getOdisStatusForBrand', itemObj);

    // console.log('alertNeeded', itemObj.brandCode, alertNeeded);

    if (itemObj && itemObj.lastUpdated) {
      //   auFromNow = moment(itemObj.dateChanged).fromNow();
      //   console.log('in getOdisStatusForBrand', itemObj.lastUpdated);

      if (
        (itemObj.previousProductVersion &&
          itemObj.previousProductVersion !== itemObj.productVersion) ||
        (itemObj.previousMainFeatureVersion &&
          itemObj.previousMainFeatureVersion !== itemObj.mainFeatureVersion) ||
        (itemObj.previousDataVersion &&
          itemObj.previousDataVersion !== itemObj.dataVersion)
      ) {
        // console.log(
        //   'in getOdisStatusForBrand comparing dates',
        //   itemObj.lastUpdated
        // );
        let dateOfChange = moment(itemObj.lastUpdated, 'DD/MM/YYYY HH:mm:ss');
        // console.log('!!!!! dateOfChange', dateOfChange);
        let ageOfChange = now.diff(moment(dateOfChange), 'days') || 0;
        // console.log('!!!!! diff', ageOfChange);
        if (ageOfChange <= notificationLimit) {
          alertNeeded = true;
          //   console.log('!!!!! alertNeeded', alertNeeded);
        }
      }
    }
    return alertNeeded;
  };

  const getOdisStatusForAllBrands = (itemsObj) => {
    // console.log('itemsObj', itemsObj);
    // let auFromNow = 0;
    // let cvFromNow = 0;
    // let seFromNow = 0;
    // let skFromNow = 0;
    // let vwFromNow = 0;

    let alertNeeded = false;

    // console.log('in getOdisStatusForAllBrands itemsObj', itemsObj);

    if (itemsObj.au && itemsObj.au.lastUpdated) {
      //   auFromNow = moment(itemsObj.au.dateChanged).fromNow();

      if (
        (itemsObj.au.previousProductVersion &&
          itemsObj.au.previousProductVersion !== itemsObj.au.productVersion) ||
        (itemsObj.au.previousMainFeatureVersion &&
          itemsObj.au.previousMainFeatureVersion !==
            itemsObj.au.mainFeatureVersion) ||
        (itemsObj.au.previousDataVersion &&
          itemsObj.au.previousDataVersion !== itemsObj.au.dataVersion)
      ) {
        let auDateOfChange = moment(
          itemsObj.au.lastUpdated,
          'DD/MM/YYYY HH:mm:ss'
        );
        //   console.log('!!!!! auDateOfChange', auDateOfChange);
        let auAgeOfChange = now.diff(moment(auDateOfChange), 'days') || 0;
        //   console.log('!!!!! au diff', auAgeOfChange);
        if (auAgeOfChange <= notificationLimit) {
          alertNeeded = true;
        }
      }
    }
    if (itemsObj.cv && itemsObj.cv.lastUpdated) {
      //   cvFromNow = moment(itemsObj.cv.dateChanged).fromNow();

      if (
        (itemsObj.cv.previousProductVersion &&
          itemsObj.cv.previousProductVersion !== itemsObj.cv.productVersion) ||
        (itemsObj.cv.previousMainFeatureVersion &&
          itemsObj.cv.previousMainFeatureVersion !==
            itemsObj.cv.mainFeatureVersion) ||
        (itemsObj.cv.previousDataVersion &&
          itemsObj.cv.previousDataVersion !== itemsObj.cv.dataVersion)
      ) {
        let cvDateOfChange = moment(
          itemsObj.cv.lastUpdated,
          'DD/MM/YYYY HH:mm:ss'
        );
        //   console.log('!!!!! cvDateOfChange', cvDateOfChange);
        let cvAgeOfChange = now.diff(moment(cvDateOfChange), 'days') || 0;
        //   console.log('!!!!! cv diff', cvAgeOfChange);
        if (cvAgeOfChange <= notificationLimit) {
          alertNeeded = true;
        }
      }
    }
    if (itemsObj.se && itemsObj.se.lastUpdated) {
      //   seFromNow = moment(itemsObj.se.dateChanged).fromNow();

      if (
        (itemsObj.se.previousProductVersion &&
          itemsObj.se.previousProductVersion !== itemsObj.se.productVersion) ||
        (itemsObj.se.previousMainFeatureVersion &&
          itemsObj.se.previousMainFeatureVersion !==
            itemsObj.se.mainFeatureVersion) ||
        (itemsObj.se.previousDataVersion &&
          itemsObj.se.previousDataVersion !== itemsObj.se.dataVersion)
      ) {
        let seDateOfChange = moment(
          itemsObj.se.lastUpdated,
          'DD/MM/YYYY HH:mm:ss'
        );
        //   console.log('!!!!! seDateOfChange', seDateOfChange);
        let seAgeOfChange = now.diff(moment(seDateOfChange), 'days') || 0;
        //   console.log('!!!!! se diff', seAgeOfChange);
        if (seAgeOfChange <= notificationLimit) {
          alertNeeded = true;
        }
      }
    }
    if (itemsObj.sk && itemsObj.sk.lastUpdated) {
      //   skFromNow = moment(itemsObj.sk.dateChanged).fromNow();

      if (
        (itemsObj.sk.previousProductVersion &&
          itemsObj.sk.previousProductVersion !== itemsObj.sk.productVersion) ||
        (itemsObj.sk.previousMainFeatureVersion &&
          itemsObj.sk.previousMainFeatureVersion !==
            itemsObj.sk.mainFeatureVersion) ||
        (itemsObj.sk.previousDataVersion &&
          itemsObj.sk.previousDataVersion !== itemsObj.sk.dataVersion)
      ) {
        let skDateOfChange = moment(
          itemsObj.sk.lastUpdated,
          'DD/MM/YYYY HH:mm:ss'
        );
        //   console.log('!!!!! skDateOfChange', skDateOfChange);
        let skAgeOfChange = now.diff(moment(skDateOfChange), 'days') || 0;
        //   console.log('!!!!! sk diff', skAgeOfChange);
        if (skAgeOfChange <= notificationLimit) {
          alertNeeded = true;
        }
      }
    }
    if (itemsObj.vw && itemsObj.vw.lastUpdated) {
      //   vwFromNow = moment(itemsObj.vw.dateChanged).fromNow();

      if (
        (itemsObj.vw.previousProductVersion &&
          itemsObj.vw.previousProductVersion !== itemsObj.vw.productVersion) ||
        (itemsObj.vw.previousMainFeatureVersion &&
          itemsObj.vw.previousMainFeatureVersion !==
            itemsObj.vw.mainFeatureVersion) ||
        (itemsObj.vw.previousDataVersion &&
          itemsObj.vw.previousDataVersion !== itemsObj.vw.dataVersion)
      ) {
        let vwDateOfChange = moment(
          itemsObj.vw.lastUpdated,
          'DD/MM/YYYY HH:mm:ss'
        );
        //   console.log('!!!!! vwDateOfChange', vwDateOfChange);
        let vwAgeOfChange = now.diff(moment(vwDateOfChange), 'days') || 0;
        //   console.log('!!!!! vw diff', vwAgeOfChange);
        if (vwAgeOfChange <= notificationLimit) {
          alertNeeded = true;
        }
      }
    }
    // if (itemsObj.vw && itemsObj.vw.lastUpdated) {
    //   //   vwFromNow = moment(itemsObj.vw.dateChanged).fromNow();
    //   let vwDateOfChange = moment(
    //     itemsObj.vw.lastUpdated,
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

    return alertNeeded;
  };

  const getOdisStatusForBrands = (itemsObj) => {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        odisChanged = getOdisStatusForBrand(itemsObj.au);
      } else if (userBrand === 'cv') {
        // console.log('cv');
        odisChanged = getOdisStatusForBrand(itemsObj.cv);
      } else if (userBrand === 'se') {
        // console.log('se');
        odisChanged = getOdisStatusForBrand(itemsObj.se);
      } else if (userBrand === 'sk') {
        // console.log('sk');
        odisChanged = getOdisStatusForBrand(itemsObj.sk);
      } else if (userBrand === 'vw') {
        // console.log('vw');
        odisChanged = getOdisStatusForBrand(itemsObj.vw);
      }
    } else {
      odisChanged = getOdisStatusForAllBrands(itemsObj);
    }
  };
  itemsObj && getOdisStatusForBrands(itemsObj);

  //   console.log('odisChanged', odisChanged);

  //   console.log('count', viewCount && viewCount, 'max', viewMax && viewMax);

  //   const blink =
  //     (odisChanged && viewCount && viewMax && viewCount <= viewMax && true) ||
  //     false;
  let blink = odisChanged || false;
  //   console.log('ODIS alert needed: ', blink);
  //   blink = true;

  return (
    <Touchable
      onPress={() =>
        showingOldApp
          ? navigation.navigate('NewsTabs', { screen: 'ODIS' })
          : navigation.navigate('RemindersTabs', { screen: 'ODIS' })
      }
      style={{ padding: 5 }}
    >
      <BlinkingView
        iconName={Platform.OS === 'ios' ? 'tv' : 'md-tv'}
        iconType='ionicon'
        iconSize={iconSizeSmall}
        text={
          blink === true
            ? 'See changed ODIS versions'
            : 'See current ODIS versions'
        }
        colorOne={Colors.vwgDeepBlue}
        colorTwo={Colors.vwgSkyBlue}
        fallbackColor={Colors.vwgCoolOrange}
        blink={blink}
      />
    </Touchable>
  );
}
