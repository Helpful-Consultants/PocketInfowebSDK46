import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default function getLogoTitle(props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/images/logos/tiw-app-logo-trans.png')}
        style={{ width: 26, height: 26 }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: RFPercentage(2.2),
          paddingLeft: 5,
          color: Colors.vwgBlack
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
