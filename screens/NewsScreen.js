import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
// import { NewsLinksView } from '@expo/samples';
import NewsLinks from './NewsLinks';

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      {/* <Header
        leftComponent={{ icon: 'menu', color: '#000' }}
        centerComponent={{ text: 'News', style: { color: '#000' } }}
        rightComponent={{ icon: 'home', color: '#000' }}
      /> */}
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <NewsLinks />
    </View>
  );
}

NewsScreen.navigationOptions = {
  title: 'News',
  headerStyle: {
    backgroundColor: '#efefef'
  },
  headerTintColor: '#333',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
