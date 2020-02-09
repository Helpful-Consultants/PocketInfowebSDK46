import React from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const iconSize = screenHeight && screenHeight > 1333 ? 24 : 18;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);
export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={iconSize}
      color={props.focused ? Colors.vwgDeepBlue : Colors.vwgLinkColor}
    />
  );
}
