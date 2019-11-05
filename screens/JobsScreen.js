import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
// import { NewsLinksView } from '@expo/samples';
// import JobsLinks from "./JobsLinks";

export default function JobsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>Jobs Stuff here</Text>
    </ScrollView>
  );
}

JobsScreen.navigationOptions = {
  title: 'Loan Tool Programme'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
