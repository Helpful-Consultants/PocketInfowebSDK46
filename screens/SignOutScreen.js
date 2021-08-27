import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useDispatch } from 'react-redux';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { signOutUserRequest } from '../actions/user';
import { emptyDealerToolsRequest } from '../actions/dealerTools';
import { emptyDealerWipsRequest } from '../actions/dealerWips';
import { emptyLtpRequest } from '../actions/ltp';

export default SignOutScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  console.log('in signout screen, signingOut');
  dispatch(emptyDealerWipsRequest());
  dispatch(emptyDealerToolsRequest());
  dispatch(emptyLtpRequest());
  dispatch(signOutUserRequest({ calledBy: 'SignoutScreen' }));
  //   props.navigation.navigate('AuthLoading');

  return (
    <SafeAreaView style={baseStyles.containerFlex}>
      <AppNameWithLogo />
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    title: 'Sign out',
  };
};
