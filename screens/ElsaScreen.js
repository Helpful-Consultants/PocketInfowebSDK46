import React, { useState } from 'react';
import { Image, Platform, Text, useWindowDimensions, View } from 'react-native';
// import Touchable from 'react-native-platform-touchable';
// import * as WebBrowser from 'expo-web-browser';
// import TitleWithAppLogo from '../components/TitleWithAppLogo';
// import TabBarIcon from '../components/TabBarIcon';
// import { Ionicons } from '@expo/vector-icons';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import BadgedText from '../components/BadgedText';
// import Colors from '../constants/Colors';

// const catalogueUrl =
//   'https://www.toolsinfoweb.co.uk/VW_AG_Sales_Catalogue/Catalogue_2021_May/';
// const buttonTextColor = Colors.vwgWhite;
// let iconSize = RFPercentage(5);

export default ElsaScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  return (
    <View
      style={{
        ...baseStyles.viewColumnFlexLeft,
        marginTop: 20,
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.textItemMain}>
        The Volkswagen Group Aftersales application, Elsa2Go, is coming soon.
      </Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Text style={baseStyles.textItemMain}>
        Look out for further information at Tools Infoweb. If you've got
        notifications enabled for Pocket Infoweb you'll be notified directly on
        your phone.
      </Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Image
        source={require('../assets/images/elsa2go.jpg')}
        style={baseStyles.inlineImageElsa}
      ></Image>
    </View>
  );
};
