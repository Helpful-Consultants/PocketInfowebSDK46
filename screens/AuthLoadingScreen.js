import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { getUserRequest } from '../actions/user';
// import validation from 'validate';

export default AuthLoadingScreen = props => {
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);

  console.log('in AuthLoadingScreen');

  useEffect(() => {
    if (userIsSignedIn) {
      console.log('in auth loading, signed in , going to Main');
      props.navigation.navigate('Main');
    } else {
      console.log('in auth loading, signed out , going to Auth  route');
      //   console.log(props.navigation);
      props.navigation.navigate('Auth');
    }
  }, [userIsSignedIn]);

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
