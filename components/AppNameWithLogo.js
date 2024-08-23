import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { Image, Text } from '@rneui/themed';
import getBaseStyles from '../helpers/getBaseStyles';
import Constants from 'expo-constants';

// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';
// import appLogo from '../assets/images/tiw-app-logo-trans.png';

export default AppNameWithLogo = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles({ ...windowDim });
  const { appName } = props;
  return (
    <View>
      <View style={baseStyles.viewImageAppLogo}>
        <Image
          source={require('../assets/images/tiw-app-logo-less-whitespace.png')}
          style={baseStyles.imageAppLogo}
        />
        <Text style={baseStyles.textAppName}>{appName}</Text>
      </View>
    </View>
  );
};
