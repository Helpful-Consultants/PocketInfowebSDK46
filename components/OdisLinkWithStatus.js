import React from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
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
  //   console.log('%%%%%% in OdisLinkWithStatus ');
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const { itemsObj, navigation, userBrand } = props;
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('in odisstatus userBrand', userBrand && userBrand);
  //   console.log('in odisstatus odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);
  const notificationLimit = 120;
  let odisChanged = false;

  const now = moment();
  //   console.log(now);

  const getOdisStatusForBrand = itemObj => {
    // console.log(
    //   'brand itemObj date ',
    //   itemObj.dateChanged && itemObj.dateChanged
    // );
    let alertNeeded = false;

    if (itemObj.dateChanged) {
      let fromNow = moment(itemObj.dateChanged).fromNow();
      //   console.log('!!!!! fromNow', fromNow);
      let ageOfChange = now.diff(moment(itemObj.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! diff', ageOfChange);
      if (ageOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    console.log('alertNeeded', itemObj.brand, alertNeeded);
    return alertNeeded;
  };

  const getOdisStatusForAllBrands = itemsObj => {
    // console.log('itemsObj', itemsObj);
    let auFromNow = 0;
    let cvFromNow = 0;
    let seFromNow = 0;
    let skFromNow = 0;
    let vwFromNow = 0;
    let auAgeOfChange = 0;
    let cvAgeOfChange = 0;
    let seAgeOfChange = 0;
    let skAgeOfChange = 0;
    let vwAgeOfChange = 0;
    let alertNeeded = false;

    if (itemsObj.au && itemsObj.au.dateChanged) {
      auFromNow = moment(itemsObj.au.dateChanged).fromNow();
      //   console.log('!!!!! au fromNow', auFromNow);
      auAgeOfChange = now.diff(moment(itemsObj.au.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! au diff', auAgeOfChange);
      if (auAgeOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    if (itemsObj.cv && itemsObj.cv.dateChanged) {
      cvFromNow = moment(itemsObj.cv.dateChanged).fromNow();
      //   console.log('!!!!! cv fromNow', cvFromNow);
      cvAgeOfChange = now.diff(moment(itemsObj.cv.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! cv diff', cvAgeOfChange);
      if (cvAgeOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    if (itemsObj.se && itemsObj.se.dateChanged) {
      seFromNow = moment(itemsObj.se.dateChanged).fromNow();
      //   console.log('!!!!! se fromNow', seFromNow);
      seAgeOfChange = now.diff(moment(itemsObj.se.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! se diff', seAgeOfChange);
      if (seAgeOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    if (itemsObj.sk && itemsObj.sk.dateChanged) {
      skFromNow = moment(itemsObj.sk.dateChanged).fromNow();
      //   console.log('!!!!! sk fromNow', skFromNow);
      skAgeOfChange = now.diff(moment(itemsObj.sk.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! sk diff', skAgeOfChange);
      if (skAgeOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    if (itemsObj.vw && itemsObj.vw.dateChanged) {
      vwFromNow = moment(itemsObj.vw.dateChanged).fromNow();
      //   console.log('!!!!! vw fromNow', vwFromNow);
      vwAgeOfChange = now.diff(moment(itemsObj.vw.dateChanged), 'minutes') || 0;
      //   console.log('!!!!! vw diff', vwAgeOfChange);
      if (vwAgeOfChange > notificationLimit) {
        alertNeeded = true;
      }
    }
    // console.log('alertNeeded', alertNeeded);

    return alertNeeded;
  };

  const getOdisStatusForBrands = itemsObj => {
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

  console.log('odisChanged', odisChanged);

  return (
    <Touchable onPress={() => navigation.navigate('Odis')}>
      <BlinkingView
        iconName={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
        iconType='ionicon'
        iconSize={iconSizeSmall}
        text={'See latest ODIS versions'}
        colorOne={Colors.vwgDeepBlue}
        colorTwo={Colors.vwgSkyBlue}
        blink={odisChanged}
      />
    </Touchable>
  );
}
