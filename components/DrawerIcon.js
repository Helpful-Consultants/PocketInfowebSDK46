import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function DrawerIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={18}
      style={{ marginBottom: -3, marginLeft: 0, paddingLeft: 0 }}
      color={props.tintColor}
    />
  );
}
