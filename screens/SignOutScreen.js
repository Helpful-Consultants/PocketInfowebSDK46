import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
export default SignOutScreen = props => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <AppNameWithLogo />
      <Text>You are signed out.</Text>
      <Button
        title='Sign in'
        onPress={() => {
          props.navigation.navigate('Welcome');
        }}
        style={{
          marginTop: 100
        }}
      />
    </View>
  );
};
