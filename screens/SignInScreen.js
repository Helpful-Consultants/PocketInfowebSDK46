import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';

export default SignUpScreen = props => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <AppNameWithLogo />
      <View>
        <Button
          title='Sign in'
          onPress={() => {
            props.navigation.navigate('Home');
          }}
          style={{
            marginTop: 100
          }}
        />
        <Button
          title='Forgotten password?'
          type='clear'
          onPress={() => {
            props.navigation.navigate('ForgottenPassword');
          }}
          style={{
            marginTop: 100
          }}
        />
        <Button
          title='Register'
          type='clear'
          onPress={() => {
            props.navigation.navigate('Register');
          }}
          style={{
            marginTop: 20
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
