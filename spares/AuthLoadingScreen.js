import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { getUserRequest } from '../actions/user';
import { setUserOutdatedCredentials } from '../actions/user';
import { setUserValidated } from '../actions/user';
// import validation from 'validate';

export default AuthLoadingScreen = props => {
  const userIsValidated = useSelector(state => state.user.userIsValidated);
  const userId = useSelector(state => state.user.userId);
  const userPin = useSelector(state => state.user.userPin);
  const userLastUpdate = useSelector(state => state.user.lastUpdate);
  const insets = useSafeArea();
  const dispatch = useDispatch();

  console.log('in AuthLoadingScreen');

  useEffect(() => {
    if (userEmail && userPin) {
      if (userLastUpdate) {
        console.log('in AuthLoadingScreen', userEmail, userPin, userLastUpdate);
        dispatch(setUserValidated());
      } else {
        console.log(
          'in AuthLoadingScreen no last update',
          userEmail,
          userPin,
          userLastUpdate
        );
        dispatch(setUserOutdatedCredentials());
      }
    } else {
      console.log('in AuthLoadingScreen no userEmail && userPin');
      dispatch(setUserOutdatedCredentials());
    }
  }, []);

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <AppNameWithLogo />
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
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
