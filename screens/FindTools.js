import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
// import { NewsLinksView } from '@expo/samples';
// import LocatorLinks from "./LocatorLinks";
import TitleWithAppLogo from '../components/TitleWithAppLogo';

export default function FindToolsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text>Locator will go here when built.</Text>
      </Card>
    </ScrollView>
  );
}

FindToolsScreen.navigationOptions = {
  header: null
};

// LocatorScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='Tool Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
