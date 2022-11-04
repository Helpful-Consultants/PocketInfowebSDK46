import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Constants from 'expo-constants';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';
// import appLogo from '../assets/images/tiw-app-logo-trans.png';

export default AppNameWithLogo = () => {
  // const showingFullApp = useSelector((state) => state.user.showingFullApp);
  const showingFullApp = true;
  const windowDim = useWindowDimensions();
  const baseStyles =
    windowDim &&
    getBaseStyles({ ...windowDim, showingFullApp: showingFullApp });
  //   console.log('name', Constants.manifest);
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
          {Constants &&
          Constants.manifest &&
          Constants.manifest.name &&
          Constants.manifest.name === 'Pocket Infoweb Extra'
            ? 'Pocket Infoweb Extra'
            : 'Pocket Infoweb'}
        </Text>
      </View>
    </View>
  );
};
