import React from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

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
  const { value, status } = props;

  const valueA = '+';
  const statusA = 'warning';
  const statusB = 'success';
  const showBadge = true;

  return (
    <View>
      <Icon
        type='ionicon'
        name={props.name}
        size={iconSize}
        color={props.focused ? Colors.vwgDeepBlue : Colors.vwgLinkColor}
      />
      {showBadge ? (
        <Badge
          value={valueA}
          containerStyle={styles.badgeContainer}
          status={statusB}
          badgeStyle={styles.badge}
          textStyle={styles.badgeText}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    // borderRadius: 12,
    height: 10,
    minWidth: 0,
    width: 10
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: -5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  badgeText: {
    fontSize: 6,
    fontFamily: 'the-sans-bold',
    textAlign: 'center',
    // paddingRight: 2
    paddingHorizontal: 0
  }
});
