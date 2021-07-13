import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
// import Touchable from 'react-native-platform-touchable';
import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
//import { Ionicons } from '@expo/vector-icons';
// import { setUserOutdatedCredentials } from '../actions/user';
// import { setUserValidated } from '../actions/user';
import { revalidateUserCredentials } from '../actions/user';
//import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import {
//   getBrand,
//   getVersion,
//   getManufacturer
// } from 'react-native-device-info';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import HomeScreen from '../screens/HomeScreen';
import AppInfo from '../components/AppInfo';
import DemoSwitch from '../components/DemoSwitch';
import Colors from '../constants/Colors';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';
import RemindersTabNavigator from './RemindersTabNavigator';
import SignedOutStack from './SignedOutStack';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView
    {...props}
    contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      alignContents: 'space-between',
      paddingBottom: 20,
    }}
  >
    <Text
      style={{
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'the-sans-bold',
      }}
    >
      QUICK LINKS
    </Text>
    <DrawerItemList {...props} style={{ marginBottom: 20 }} />
    <DemoSwitch />
    <AppInfo />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: baseStyles.panelWidth.width,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: Colors.vwgActiveLink,
        inactiveBackgroundColor: Colors.vwgInactiveLink,
        labelStyle: baseStyles.panelTextNav,
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
        }}
      />

      <Drawer.Screen
        name='WipsTabs'
        component={WipTabNavigator}
        options={{
          drawerLabel: 'Find Tools, Jobs & LTP List',
          initialRouteName: 'FindTools',
        }}
      />
      <Drawer.Screen
        name='NewsTabs'
        component={NewsTabNavigator}
        options={{
          drawerLabel: 'ODIS, News & Catalogue',
          initialRouteName: 'Odis',
        }}
      />
      <Drawer.Screen
        name='RemindersTabs'
        component={RemindersTabNavigator}
        options={{
          drawerLabel: 'Alerts, S Measures, Loans & Stats',
          initialRouteName: 'Notifications',
        }}
      />
      {/* <Drawer.Screen
        name='SignedOutStack'
        component={SignOutScreen}
        options={{
          drawerLabel: 'Sign out',
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AppNavigator = (props) => {
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  //   console.log('AppNavigator, userIsValidated', userIsValidated);
  //   console.log('AppNavigator, userIsSignedIn', userIsSignedIn);
  //   console.log('AppNavigator,userCredsLastChecked', userCredsLastChecked);
  const dispatch = useDispatch();
  //   return <AuthLoadingScreen />;

  //   console.log('AppNavigator props', props);

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
  //   console.log('AppNavigator, userIsValidated 2', userIsValidated);
  //   console.log('AppNavigator, userIsSignedIn 2', userIsSignedIn);
  //   console.log('AppNavigator,userCredsLastChecked 2 ', userCredsLastChecked);

  const allOK =
    userIsValidated &&
    userIsValidated === true &&
    userIsSignedIn &&
    userIsSignedIn === true
      ? true
      : false;

  const AppStack = createStackNavigator();

  //   console.log('AppNavigator,allOK ', allOK);

  return (
    <NavigationContainer>
      {allOK === true ? <DrawerNavigator props={props} /> : <SignedOutStack />}
    </NavigationContainer>
  );
};
