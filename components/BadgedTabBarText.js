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
//       color={props.focused ? Colors.vwgDeepBlue : Colors.vwgLinkColor}
//     />

// containerStyle={{ size: 2, position: 'absolute', top: -4, right: -4 }}
//  badgeStyle={styles.badge}
//               textStyle={styles.badgeText}
export default function TabBarIcon(props) {
  //   const { value, status, focused, showBadge, text } = props;
  const { value, status, focused, text } = props;

  const valueA = '+';
  const statusA = 'warning';
  const statusB = 'success';
  //   const showBadge = true;
  const showBadge = false;

  return (
    <View
      style={showBadge && showBadge === true ? styles.paddedView : styles.view}
    >
      <Text style={focused ? styles.focused : styles.notFocused}>{text}</Text>
      {showBadge ? (
        <Badge
          value={value}
          containerStyle={styles.badgeContainer}
          status={statusB}
          badgeStyle={focused ? styles.badgeFocused : styles.badge}
          textStyle={styles.badgeText}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {},
  paddedView: {
    marginRight: 8
  },
  badge: {
    // borderRadius: 12,
    height: 10,
    minWidth: 0,
    width: 10,
    backgroundColor: Colors.vwgLinkColor
  },
  badgeFocused: {
    // borderRadius: 12,
    height: 10,
    minWidth: 0,
    width: 10,
    backgroundColor: Colors.vwgDeepBlue
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'yellow'
  },
  badgeText: {
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0
  },
  focused: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.7)
  },
  notFocused: {
    fontFamily: 'the-sans',
    color: Colors.vwgLinkColor,
    fontSize: RFPercentage(1.7)
  }
});
