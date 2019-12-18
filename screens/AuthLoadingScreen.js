import React, { useReducer } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { getUserRequest } from '../actions/user';
// import validation from 'validate';

export default AuthLoadingScreen = props => {
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);

  if (userIsSignedIn) {
    // console.log('signed in , going to Main');
    props.navigation.navigate(userIsSignedIn ? 'Main' : 'Auth');
  } else {
    // console.log('signed out , going to Main');
    props.navigation.navigate(userIsSignedIn ? 'Main' : 'Auth');
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppNameWithLogo />
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </SafeAreaView>
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
