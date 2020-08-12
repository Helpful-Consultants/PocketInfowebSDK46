import React from 'react';

import { useWindowDimensions, View } from 'react-native';

import { Badge, Text } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
// import Colors from '../constants/Colors';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

// const iconSize = screenHeight && screenHeight > 1333 ? 24 : 18;

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);

//   <Ionicons
//       name={props.name}
//       size={iconSize}
//       color={props.focused ? Colors.vwgDeepBlue : Colors.vwgLink}
//     />

// containerStyle={{ size: 2, position: 'absolute', top: -4, right: -4 }}
//  badgeStyle={baseStyles.navBarBadge}
//               textStyle={baseStyles.navBarTextBadge}
export default function TabBarIcon(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   const { value, status, focused, showBadge, text } = props;
  const { value, status, focused, text } = props;

  const valueA = '+';
  const statusA = 'warning';
  const statusB = 'success';
  //   const showBadge = true;
  const showBadge = false;

  return (
    <View
      style={
        {
          /* showBadge && showBadge === true
          ? baseStyles.navBarPaddedView
          : baseStyles.navBarNonPaddedView */
        }
      }
    >
      <Text
        style={
          {
            /* focused
            ? baseStyles.navBarTextFocused
            : baseStyles.navBarTextNotFocused */
          }
        }
      >
        {text}
      </Text>
      {showBadge ? (
        <Badge
          value={value}
          containerStyle={baseStyles.navBarBadgeContainer}
          status={statusB}
          badgeStyle={
            focused ? baseStyles.navBarBadgeFocused : baseStyles.navBarBadge
          }
          textStyle={baseStyles.navBarTextBadge}
        />
      ) : null}
    </View>
  );
}
