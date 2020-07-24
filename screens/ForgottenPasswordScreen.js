import React, { Component } from 'react';
import { Linking, useWindowDimensions, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
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
      <AppNameWithLogo />
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginTop: 30,
            marginBottom: 10,
            marginHorizontal: 20,
            textAlign: 'left',
            fontSize: 14,
          }}
        >
          To sign in you need to generate your own PIN (personal identification
          number).
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginRight: 35,
          }}
        >
          <Text
            style={{
              marginVertical: 3,
              marginLeft: 20,
              marginRight: 6,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            1.
          </Text>

          <Text
            style={{
              marginVertical: 3,
              marginLeft: 3,
              marginRight: 30,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            {`Sign in to the Tools Infoweb website on a PC or on this phone.`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginRight: 35,
          }}
        >
          <Text
            style={{
              marginVertical: 3,
              marginLeft: 20,
              marginRight: 3,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            {'2.'}
          </Text>

          <Text
            style={{
              marginVertical: 3,
              marginLeft: 3,
              marginRight: 30,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            {`Go to FAQ | About.`}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginRight: 35 }}>
          <Text
            style={{
              marginVertical: 3,
              marginLeft: 20,
              marginRight: 3,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            3.
          </Text>

          <Text
            style={{
              marginVertical: 3,
              marginLeft: 3,
              marginRight: 30,
              textAlign: 'left',
              fontSize: 14,
            }}
          >
            Click on the 'Generate App PIN' button.
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginRight: 35 }}>
        <Text
          style={{
            marginVertical: 3,
            marginLeft: 3,
            marginRight: 30,
            textAlign: 'left',
            fontSize: 14,
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
        titleStyle={{
          color: Colors.vwgLink,
        }}
      />
      <Text
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        (This opens toolsinfoweb.co.uk in your usual web browser)
      </Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: 'Need your PIN?',
    headerShown: true,
  };
};
