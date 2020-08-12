import React from 'react';
import { Linking, useWindowDimensions, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import { conditionalExpression } from '@babel/types';

export default ForgottenPasswordScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <ScrollView>
        <AppNameWithLogo />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              ...baseStyles.textLargerCentred,
              marginTop: 30,
              marginBottom: 25,
              marginHorizontal: 20,
            }}
          >
            To sign in you need to generate your own PIN (personal
            identification number).
          </Text>

          <View style={baseStyles.viewRowFlexCentred}>
            <Text
              style={{
                ...baseStyles.textLargerCentred,
                marginVertical: 3,
                marginHorizontal: 20,
              }}
            >
              {`Sign in to the Tools Infoweb website on a PC or on this phone.`}
            </Text>
          </View>

          <View style={baseStyles.viewRowFlexCentred}>
            <Text
              style={{
                ...baseStyles.textLargerCentred,
                marginVertical: 3,
                marginHorizontal: 20,
              }}
            >
              {`Go to FAQ | About.`}
            </Text>
          </View>

          <View style={baseStyles.viewRowFlexCentred}>
            <Text
              style={{
                ...baseStyles.textLargerCentred,
                marginVertical: 3,
              }}
            >
              Click on the 'Generate App PIN' button.
            </Text>
          </View>
        </View>

        <View style={baseStyles.viewRowFlexCentred}>
          <Text
            style={{
              ...baseStyles.textLargerCentred,
              marginVertical: 3,
            }}
          >
            You can also reset your PIN there if you've forgotten it.
          </Text>
        </View>

        <Button
          title='Check registration on toolsinfoweb.co.uk'
          type='clear'
          onPress={() => {
            Linking.openURL(Urls.toolsInfoweb);
          }}
          buttonStyle={{
            marginTop: 20,
          }}
          titleStyle={baseStyles.textLinkLarger}
        />
        <Text
          style={{
            ...baseStyles.textCentred,
            marginVertical: 10,
            marginHorizontal: 20,
            textAlign: 'center',
          }}
        >
          (This opens toolsinfoweb.co.uk in your usual web browser)
        </Text>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: 'Need your PIN?',
    headerShown: true,
  };
};
