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

export default function OdisStatus(props) {
  //   console.log(props.items);
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const { itemsObj, navigation, userBrand } = props;
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  console.log('in odisstatus userBrand', userBrand && userBrand);
  //   console.log('in odisstatus odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);
  const notificationLimit = 120;
  let odisChanged = false;
  let ageOfChange = 0;

  const now = moment();
  //   console.log(now);

  const getOdisStatusForBrand = itemObj => {
    console.log('itemObj date ', itemObj.dateChanged && itemObj.dateChanged);
    if (1 === 2) {
      return true;
    } else if (itemObj.dateChanged) {
      let fromNow = moment(itemObj.dateChanged).fromNow();
      console.log('!!!!! fromNow', fromNow);

      ageOfChange = now.diff(moment(itemObj.dateChanged), 'minutes');
      console.log('!!!!! diff', ageOfChange);
      return true;
    } else {
      return false;
    }
  };

  const getOdisStatusForAllBrands = itemsObj => {
    // console.log('itemsObj', itemsObj);
    if (1 === 2) {
      return true;
    } else if (
      itemsObj.au.dateChanged ||
      itemsObj.cv.dateChanged ||
      itemsObj.se.dateChanged ||
      itemsObj.sk.dateChanged ||
      itemsObj.vw.dateChanged
    ) {
      let fromNow = moment(itemObj.dateChanged).fromNow();
      console.log('!!!!! fromNow', fromNow);

      ageOfChange = now.diff(moment(itemObj.dateChanged), 'minutes');
      console.log('!!!!! diff', ageOfChange);
      return true;
    } else {
      return false;
    }
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

  return (
    <Touchable onPress={() => navigation.navigate('Odis')}>
      <BlinkingView
        iconName={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
        iconType='ionicon'
        iconSize={iconSizeSmall}
        text={'See latest ODIS versions'}
        colorOne={Colors.vwgDeepBlue}
        colorTwo={Colors.vwgSkyBlue}
        blink={odisChanged && ageOfChange && ageOfChange < notificationLimit}
      />
    </Touchable>
  );
}
