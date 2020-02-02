import React from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import { Badge, Icon, Text } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const iconSize = screenHeight && screenHeight > 1333 ? 24 : 18;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);

//   <Ionicons
//       name={props.name}
//       size={iconSize}
//       color={props.focused ? Colors.vwgDeepBlue : Colors.vwgIosLink}
//     />

// containerStyle={{ size: 2, position: 'absolute', top: -4, right: -4 }}
//  badgeStyle={styles.badge}
//               textStyle={styles.badgeText}
export default function BadgedText(props) {
  const { value, status, focused, showBadge, text } = props;

  const valueA = '+';
  const statusA = 'warning';
  const statusB = 'success';
  //   const showBadge = true;
  const valueIsNumeric = value && typeof value === 'number';
  //   console.log('&&&&&& isNumeric', valueIsNumeric);

  return (
    <View
      style={showBadge && showBadge === true ? styles.paddedView : styles.view}
    >
      <Text style={styles.text}>{text}</Text>
      {showBadge ? (
        <Badge
          value={value}
          containerStyle={styles.badgeContainer}
          status={statusB}
          badgeStyle={styles.badge}
          textStyle={valueIsNumeric ? styles.badgeNumber : styles.badgeText}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {},
  paddedView: {
    marginRight: 13
  },
  badge: {
    // borderRadius: 12,
    height: 12,
    minWidth: 0,
    width: 12,
    // backgroundColor: Colors.vwgDeepBlue
    backgroundColor: Colors.vwgWhite
  },
  text: {
    color: Colors.vwgWhite,
    // fontSize: 14,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.5),

    textAlign: 'center'
  },
  badgeContainer: {
    position: 'absolute',
    top: -1,
    right: -15,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: Colors.vwgDeepBlue
  },
  badgeNumber: {
    fontSize: RFPercentage(1.4),
    fontFamily: 'the-sans-bold',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0,
    marginTop: 0,
    marginRight: 0,
    color: Colors.vwgDeepBlue
  },
  badgeText: {
    fontSize: RFPercentage(1.7),
    fontFamily: 'the-sans-bold',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0,
    marginTop: -1,
    marginRight: 0,
    color: Colors.vwgDeepBlue
  },
  focused: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.7)
  },
  notFocused: {
    fontFamily: 'the-sans',
    color: Colors.vwgIosLink,
    fontSize: RFPercentage(1.7)
  }
});
