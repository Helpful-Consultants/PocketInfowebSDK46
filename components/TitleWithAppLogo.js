import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import appLogo from '../assets/images/logos/tiw-app-logo-trans.png';

export default function getLogoTitle(props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={appLogo} style={{ width: 26, height: 26 }} />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 12,
          paddingLeft: 5
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
