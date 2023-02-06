import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Image, Text } from '@rneui/themed';
import getBaseStyles from '../helpers/getBaseStyles';

export default function TitleWithAppLogo(props) {
  const windowDim = useWindowDimensions();

  //   console.log('windowDim', windowDim && windowDim);
  //   console.log(
  //     'in getLogoTitle/TitleWithAppLogo, windowDim.width:',
  //     windowDim.width
  //   );
  //   console.log(
  //     'in getLogoTitle/TitleWithAppLogo, windowDim.height:',
  //     windowDim.height
  //   );

  //   console.log('in getLogoTitle styled text is', StyledText);
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
            windowDim.width >= 1024
              ? 38
              : windowDim.width >= 768
              ? 32
              : windowDim.width >= 411
              ? 32
              : windowDim.width >= 375
              ? 26
              : 22,
          height:
            windowDim.width >= 1024
              ? 38
              : windowDim.width >= 768
              ? 32
              : windowDim.width >= 411
              ? 32
              : windowDim.width >= 375
              ? 26
              : 22,
        }}
      />
      <Text style={{ ...baseStyles.textScreenTitle }}>{props.title}</Text>
    </View>
  );
}
