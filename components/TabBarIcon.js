import React from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

const baseIconSize = 20;
let navBarIconSize =
  screenWidth > 1023
    ? baseIconSize * 1.3
    : screenWidth > 767
    ? baseIconSize * 1.2
    : screenWidth > 413
    ? baseIconSize * 1.1
    : screenWidth > 374
    ? baseIconSize * 1
    : baseIconSize * 1;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);
export default function TabBarIcon(props) {
  //   console.log('@@@@TabbarIcon props ', props);
  return (
    <Ionicons
      name={props.name}
      size={props.size || navBarIconSize} // Size not passed in Android API
      color={
        props.alert
          ? Colors.vwgAlertColor
          : props.focused
          ? Colors.vwgActiveLink
          : Colors.vwgInactiveLink
      }
      type='ionicon'
    />
  );
}

// size = { iconSize }
// size = { props.size }
