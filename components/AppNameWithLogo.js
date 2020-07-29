import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';
// import appLogo from '../assets/images/tiw-app-logo-trans.png';

export default AppNameWithLogo = () => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  console.log(
    'in AppNameWithLogo, windowDim:',
    windowDim,
    'baseStyles.appName',
    baseStyles.appName
  );
  return (
    <View>
      <View style={baseStyles.appLogoContainer}>
        <Image
          source={require('../assets/images/tiw-app-logo-less-whitespace.png')}
          style={baseStyles.appLogo}
        />
        <Text style={baseStyles.appName}>Pocket Infoweb</Text>
      </View>
    </View>
  );
};
