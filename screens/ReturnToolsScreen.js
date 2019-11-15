import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

export default ReturnToolsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Return Screen</Text>
    </View>
  );
};

ReturnToolsScreen.navigationOptions = {
  header: null
};
