import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { setUserOutdatedCredentials } from '../actions/user';
import { setUserValidated } from '../actions/user';

export default AuthLoadingScreen = (props) => {
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userId = useSelector((state) => state.user.userId);
  const userPin = useSelector((state) => state.user.userPin);
  const userLastUpdate = useSelector((state) => state.user.lastUpdate);
  const insets = useSafeArea();
  const dispatch = useDispatch();

  console.log('in AuthLoadingScreen');
  ///dddd
  useEffect(() => {
    if (userId && userPin) {
      if (userLastUpdate) {
        console.log('in AuthLoadingScreen', userId, userPin, userLastUpdate);
        dispatch(setUserValidated());
      } else {
        console.log(
          'in AuthLoadingScreen no last update',
          userId,
          userPin,
          userLastUpdate
        );
        dispatch(setUserOutdatedCredentials());
      }
    } else {
      console.log('in AuthLoadingScreen no userId && userPin');
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
    flex: 1,
  },
  appName: {
    color: '#0096da',
    color: '#000',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
