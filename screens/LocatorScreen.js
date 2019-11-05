import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
// import { NewsLinksView } from '@expo/samples';
// import LocatorLinks from "./LocatorLinks";

export default function LocatorScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>Locator Stuff here</Text>
    </ScrollView>
  );
}

LocatorScreen.navigationOptions = {
  title: 'Loan Tool Programme'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
