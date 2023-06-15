import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { Image, Text } from '@rneui/themed';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';
// import appLogo from '../assets/images/tiw-app-logo-trans.png';

export default AppNameWithLogo = () => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles({ ...windowDim });
  const appEdition = Application.applicationName;
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
        <Text style={baseStyles.textAppName}>{appEdition}</Text>
      </View>
    </View>
  );
};
