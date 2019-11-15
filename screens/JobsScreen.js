import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
// import { NewsLinksView } from '@expo/samples';
// import LocatorLinks from "./LocatorLinks";
import TitleWithAppLogo from '../components/TitleWithAppLogo';

export default function JobsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text>Jobs screen will go here when built.</Text>
      </Card>
    </ScrollView>
  );
}
JobsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
