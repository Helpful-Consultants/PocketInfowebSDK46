import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default function getLogoTitle(props) {
  const windowDim = useWindowDimensions();

  //   console.log('windowDim', windowDim && windowDim);
  console.log(
    'in getLogoTitle/TitleWithAppLogo, windowDim.width:',
    windowDim.width
  );
  console.log(
    'in getLogoTitle/TitleWithAppLogo, windowDim.height:',
    windowDim.height
  );
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in getLogoTitle/TitleWithAppLogo, baseStyles:', baseStyles);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={
          Platform.OS === 'ios'
            ? require('../assets/images/tiw-app-logo-trans.png')
            : require('../assets/images/tiw-app-logo-trans-white.png')
        }
        style={{
          width:
            windowDim.width > 1023
              ? 42
              : windowDim.width > 767
              ? 36
              : windowDim.width > 374
              ? 26
              : 22,
          height:
            windowDim.width > 1023
              ? 42
              : windowDim.width > 767
              ? 36
              : windowDim.width > 374
              ? 26
              : 22,
        }}
      />
      <Text style={baseStyles.screenTitleText}>{props.title}</Text>
    </View>
  );
}
