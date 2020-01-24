import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useDispatch, useSelector } from 'react-redux';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { signOutUserRequest } from '../actions/user';
import { emptyDealerToolsRequest } from '../actions/dealerTools';
import { emptyDealerWipsRequest } from '../actions/dealerWips';

// import validation from 'validate';

export default SignOutScreen = props => {
  const dispatch = useDispatch();
  console.log('in signout screen, signingOut');
  dispatch(emptyDealerWipsRequest());
  dispatch(emptyDealerToolsRequest());
  dispatch(signOutUserRequest());
  props.navigation.navigate('AuthLoading');

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
    flex: 1
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
