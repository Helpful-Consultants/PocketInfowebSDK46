import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
// import { setUserOutdatedCredentials } from '../actions/user';
// import { setUserValidated } from '../actions/user';
import { revalidateUserCredentials } from '../actions/user';

// import {
//   createDrawerNavigator,
//   DrawerNavigatorItems as DrawerItems
// } from 'react-navigation-drawer';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import {
//   getBrand,
//   getVersion,
//   getManufacturer
// } from 'react-native-device-info';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import HomeScreen from '../screens/HomeScreen';
import AppInfo from '../components/AppInfo';
import Colors from '../constants/Colors';
// import AppNameWithLogo from '../components/AppNameWithLogo';
// import StatsScreen from '../screens/StatsScreen';
// import OdisScreen from '../screens/OdisScreen';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';
import SignedOutStack from './SignedOutStack';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const CustomDrawerContent = props => {
  //   const insets = useSafeArea();
  /* <DrawerContentScrollView {...props} style={{ paddingTop: insets.top }}> */

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <AppInfo />
    </DrawerContentScrollView>
  );
};

const drawerContentOptions = {
  activeTintColor: Colors.vwgActiveLink,
  inactiveTintColor: Colors.vwgInactiveLink,
  activeBackgroundColor: 'white',
  labelStyle: { fontFamily: 'the-sans-bold' },
  itemStyle: { marginVertical: 0 }
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={drawerContentOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerLabel: 'Home'
        }}
      />
      <Drawer.Screen
        name='WipsTabs'
        component={WipTabNavigator}
        options={{
          drawerLabel: 'Find tools, return tools, jobs & LTP',
          initialRouteName: 'FindTools'
        }}
      />
      <Drawer.Screen
        name='NewsTabs'
        component={NewsTabNavigator}
        options={{
          drawerLabel: 'News, products, ODIS, stats',
          initialRouteName: 'News'
        }}
      />
      <Drawer.Screen
        name='SignedOutStack'
        component={SignOutScreen}
        options={{
          drawerLabel: 'Sign out'
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator = props => {
  const userIsValidated = useSelector(state => state.user.userIsValidated);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector(state => state.user.lastUpdate);
  console.log('AppNavigator, userIsValidated', userIsValidated);
  console.log('AppNavigator, userIsSignedIn', userIsSignedIn);
  console.log('AppNavigator,userCredsLastChecked', userCredsLastChecked);
  const dispatch = useDispatch();
  //   return <AuthLoadingScreen />;

  //   let now = moment();
  //   const ageOfCredentialsLimit = 3;

  //   if (userIsSignedIn && userIsSignedIn === true) {
  //     if (userCredsLastChecked) {
  //       console.log('now:', now);
  //       let ageOfCredentials = now.diff(userCredsLastChecked, 'minutes');
  //       console.log('ageOfCredentials:', ageOfCredentials);
  //       if (ageOfCredentials <= ageOfCredentialsLimit) {
  //         dispatch(setUserValidated());
  //         console.log('ageOfCredentials good', ageOfCredentials);
  //       } else {
  //         console.log('ageOfCredentials bad', ageOfCredentials);
  //         dispatch(setUserOutdatedCredentials());
  //       }
  //     }
  //   }

  //   revalidateUser();
  dispatch(revalidateUserCredentials({ calledBy: 'AppNavigator' }));

  return (
    <NavigationContainer>
      {userIsValidated &&
      userIsValidated === true &&
      userIsSignedIn &&
      userIsSignedIn === true ? (
        <DrawerNavigator />
      ) : userIsValidated === false || userIsSignedIn === false ? (
        <SignedOutStack />
      ) : null}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  zzstretched: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
    // backgroundColor: 'red'
  },
  footerContainer: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-end',
    // backgroundColor: 'red'
  },
  appName: {
    paddingTop: 100,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(2.2)
    // fontStyle: 'italic'
  },
  brand: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.9)
    // fontStyle: 'italic'
  },
  appVersion: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  },
  deviceVersion: {
    paddingTop: 15,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  }
});
