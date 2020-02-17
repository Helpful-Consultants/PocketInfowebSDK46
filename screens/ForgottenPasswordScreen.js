import React, { Component } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import { conditionalExpression } from '@babel/types';

export default ForgottenPasswordScreen = props => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <AppNameWithLogo />
      <View>
        <View
          style={{
            margin: 20,
            textAlign: 'center'
          }}
        >
          <Text
            style={{
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 20,
              textAlign: 'center',
              fontSize: 14
            }}
          >
            To activate Pocket Infoweb you will need to generate an access PIN
            for your user ID.
          </Text>

          <View style={{ flexDirection: 'row', marginRight: 30 }}>
            <Text
              style={{
                marginVertical: 3,
                marginLeft: 30,
                marginRight: 3,
                textAlign: 'left',
                fontSize: 14
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
                fontSize: 14
              }}
            >
              Log in to the Tools Infoweb website on a PC or on this phone with
              with link below.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', marginRight: 30, marginRight: 30 }}
          >
            <Text
              style={{
                marginVertical: 3,
                marginLeft: 30,
                marginRight: 3,
                textAlign: 'left',
                fontSize: 14
              }}
            >
              2.
            </Text>

            <Text
              style={{
                marginVertical: 3,
                marginLeft: 3,
                marginRight: 30,
                textAlign: 'left',
                fontSize: 14
              }}
            >
              Go to FAQ | About.
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                marginVertical: 3,
                marginLeft: 30,
                marginRight: 3,
                textAlign: 'left',
                fontSize: 14
              }}
            >
              3.
            </Text>

            <Text
              style={{
                marginVertical: 3,
                marginLeft: 3,

                textAlign: 'left',
                fontSize: 14
              }}
            >
              Click on the 'Generate App PIN' button.
            </Text>
          </View>
        </View>

        <Button
          title='Check registration on toolsinfoweb.co.uk'
          type='clear'
          onPress={() => {
            Linking.openURL(Urls.toolsInfoweb);
          }}
          buttonStyle={{
            marginTop: 20
          }}
          titleStyle={{
            color: Colors.vwgLink
          }}
        />
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 60,
            textAlign: 'center',
            fontSize: 14
          }}
        >
          (This opens toolsinfoweb.co.uk in your usual web browser)
        </Text>
      </View>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    title: 'Forgotten password',
    headerShown: true
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appName: {
    color: '#0096da',
    color: '#000',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});
