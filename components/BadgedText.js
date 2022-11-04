import React from 'react';
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Badge, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const iconSize = screenHeight && screenHeight > 1333 ? 24 : 18;
const tempNumberBadgeTopMargin = RFPercentage(0.8);
const numberBadgeTopMargin =
  tempNumberBadgeTopMargin && 5 - tempNumberBadgeTopMargin;
const tempNumberBadgeRightMargin = RFPercentage(4);
const numberBadgeRightMargin =
  tempNumberBadgeRightMargin && 0 - tempNumberBadgeRightMargin;
const tempLargeNumberBadgeRightMargin = RFPercentage(4.5);
const largeNumberBadgeRightMargin =
  tempNumberBadgeRightMargin && 0 - tempLargeNumberBadgeRightMargin;

const tempTextBadgeTopMargin = RFPercentage(0.7);
const textBadgeTopMargin = tempTextBadgeTopMargin && 1 + tempTextBadgeTopMargin;
const tempTextBadgeRightMargin = RFPercentage(2);
const textBadgeRightMargin =
  tempTextBadgeRightMargin && 0 - tempTextBadgeRightMargin;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);

//   <Ionicons
//       name={props.name}
//       size={iconSize}
//       color={props.focused ? Colors.vwgDeepBlue : Colors.vwgLink}
//     />

// containerStyle={{ size: 2, position: 'absolute', top: -4, right: -4 }}
//  badgeStyle={styles.badge}
//               textStyle={styles.badgeText}
export default function BadgedText(props) {
  //   console.log(props);
  const { value, status, showBadge, text, showingFullApp, showSevereAlert } =
    props;
  const windowDim = useWindowDimensions();
  const baseStyles =
    windowDim &&
    getBaseStyles({ ...windowDim, showingFullApp: showingFullApp });

  const valueA = '+';
  const statusA = 'warning';
  const statusB = 'success';
  //   const showBadge = true;
  const valueIsNumeric = value && typeof value === 'number';
  //   console.log('&&&&&& isNumeric', valueIsNumeric);

  //   console.log('tempTextBadgeTopMargin', tempTextBadgeTopMargin);
  //   console.log('textBadgeTopMargin', textBadgeTopMargin);
  //   console.log('tempTextBadgeRightMargin', tempTextBadgeRightMargin);
  //   console.log('textBadgeRightMargin', textBadgeRightMargin);

  //   console.log('IN BADGED TEXT!!!!!!!!!!!!!!!!', props);

  return (
    <View
      style={
        showBadge && showBadge === true
          ? valueIsNumeric
            ? styles.viewWithNumberBadge
            : styles.viewWithTextBadge
          : styles.view
      }
    >
      <Text style={baseStyles.textHomeGridCell}>{` ${text}`}</Text>
      {showBadge ? (
        <Badge
          value={value}
          containerStyle={
            valueIsNumeric
              ? value > 9
                ? styles.containerLargeNumberBadge
                : styles.containerNumberBadge
              : styles.containerTextBadge
          }
          status={statusB}
          badgeStyle={
            valueIsNumeric
              ? value > 9
                ? styles.badgeStyleForLargeNumber
                : styles.badgeStyleForNumber
              : showSevereAlert
              ? styles.badgeStyleForTextSevere
              : styles.badgeStyleForText
          }
          textStyle={
            valueIsNumeric
              ? styles.textStyleForNumberBadge
              : styles.textStyleForTextBadge
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeStyleForNumber: {
    borderRadius: RFPercentage(1),
    borderWidth: 1,
    height: RFPercentage(3.5),
    minWidth: 0,
    width: RFPercentage(3.5),
    backgroundColor: Colors.vwgDeepBlue,
    borderColor: Colors.vwgWhite,
  },
  badgeStyleForLargeNumber: {
    borderRadius: RFPercentage(1),
    borderWidth: 1,
    height: RFPercentage(3.5),
    minWidth: 0,
    width: RFPercentage(4.0),
    backgroundColor: Colors.vwgDeepBlue,
    borderColor: Colors.vwgWhite,
  },
  badgeStyleForText: {
    // borderRadius: 0,
    height: RFPercentage(1.6),
    minWidth: 0,
    width: RFPercentage(1.6),
    // backgroundColor: Colors.vwgDeepBlue
    backgroundColor: Colors.vwgBadgeAlertColor,
    borderColor: Colors.vwgBadgeAlertColor,
  },
  badgeStyleForTextSevere: {
    // borderRadius: 0,
    height: RFPercentage(1.6),
    minWidth: 0,
    width: RFPercentage(1.6),
    // backgroundColor: Colors.vwgDeepBlue
    backgroundColor: Colors.vwgBadgeSevereAlertColor,
    borderColor: Colors.vwgBadgeSevereAlertColor,
  },

  containerNumberBadge: {
    position: 'absolute',
    top: numberBadgeTopMargin,
    right: numberBadgeRightMargin,
    // right: -26,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.vwgDeepBlue
  },
  containerLargeNumberBadge: {
    position: 'absolute',
    top: numberBadgeTopMargin,
    right: largeNumberBadgeRightMargin,
    // right: -26,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.vwgDeepBlue
  },
  containerTextBadge: {
    position: 'absolute',
    // top: 1,
    // right: -8,
    // zIndex: -10,
    top: 2,
    left: textBadgeRightMargin,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vwgDeepBlue,
  },
  textStyleForNumberBadge: {
    fontSize: RFPercentage(2.4),
    fontFamily: 'the-sans',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0,
    marginTop: RFPercentage(0.05),
    marginRight: 0,
    color: Colors.vwgWhite,
  },
  textStyleForTextBadge: {
    fontSize: 1,
    fontFamily: 'the-sans-bold',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0,
    marginTop: -5,
    marginRight: 0,
    color: Colors.vwgBadgeAlertColor,
  },
});
