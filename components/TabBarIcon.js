import React, { useMemo } from 'react';
import { useDimensions } from '../helpers/dimensions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const baseIconSize = 20;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);
export default function TabBarIcon(props) {
  const { width } = useDimensions();
  //   console.log('in tabbariconscreenWidth', width);
  const navBarIconSize = useMemo(() => {
    if (width > 1023) {
      return baseIconSize * 1.3;
    } else if (width > 767) {
      return baseIconSize * 1.2;
    } else if (width > 413) {
      return baseIconSize * 1.1;
    } else if (width > 374) {
      return baseIconSize * 1;
    }
    return baseIconSize; // This is your fallback value in case no condition is met
  }, [width]);
  //   console.log('navBarIconSize', navBarIconSize);
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
      type="ionicon"
    />
  );
}

// size = { iconSize }
// size = { props.size }
