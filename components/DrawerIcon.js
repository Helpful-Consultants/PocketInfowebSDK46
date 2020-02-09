import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
var iconSize = RFPercentage(2.5);

export default function DrawerIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={iconSize}
      style={{ marginBottom: 0, marginLeft: 0, paddingLeft: 0 }}
      color={Colors.vwgLinkColor}
    />
  );
}
