import React from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

const iconSize = RFPercentage(2);

export default function InlineIcon(props) {
  const { iconName, itemType, iconColor, iconSize } = props;
  const color = iconColor || Colors.vwgLink;

  const size = iconSize || RFPercentage(2);

  //   iconName = Platform.OS === 'ios' ? 'ios-home' : 'md-home';

  return itemType && itemType === 'font-awesome' ? (
    <FontAwesome5
      name={iconName}
      size={size}
      style={{
        marginLeft: 0,
        paddingLeft: 0,
      }}
      color={color}
    />
  ) : (
    <Ionicons
      name={iconName}
      size={iconSize}
      style={{ marginVertical: 'auto', marginLeft: 0, paddingLeft: 0 }}
      color={color}
    />
  );
}
