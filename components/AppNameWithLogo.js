import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';
// import appLogo from '../assets/images/tiw-app-logo-trans.png';

export default AppNameWithLogo = () => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const showingOldApp = useSelector((state) => state.user.showingOldApp);
  //   console.log(
  //     'in AppNameWithLogo, windowDim:',
  //     windowDim,
  //     'baseStyles.textAppName',
  //     baseStyles.textAppName
  //   );
  return (
    <View>
      <View style={baseStyles.viewImageAppLogo}>
        <Image
          source={require('../assets/images/tiw-app-logo-less-whitespace.png')}
          style={baseStyles.imageAppLogo}
        />
        <Text style={baseStyles.textAppName}>
          {showingOldApp ? 'Pocket Infoweb' : 'Pocket Infoweb Extra'}
        </Text>
      </View>
    </View>
  );
};
