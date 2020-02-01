import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useSelector } from 'react-redux';
// import {
//   createDrawerNavigator,
//   DrawerNavigatorItems as DrawerItems
// } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import {
//   getBrand,
//   getVersion,
//   getManufacturer
// } from 'react-native-device-info';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignOutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
// import StatsScreen from '../screens/StatsScreen';
// import OdisScreen from '../screens/OdisScreen';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const SignedOutStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Sign In'
    },
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ForgottenPassword: {
    screen: ForgottenPasswordScreen,
    navigationOptions: {
      title: 'Forgotten Password'
    },
    navigationOptions: () => ({
      headerShown: true
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register'
    },
    navigationOptions: () => ({
      headerShown: true
    })
  },
  SignOut: {
    screen: SignOutScreen,
    navigationOptions: {
      title: 'Sign out'
    }
  },
  navigationOptions: () => ({
    headerShown: false
  })
});

// Stats stack
// const StatsStack = createStackNavigator({
//   Stats: StatsScreen
// });

// // OdisStack.navigationOptions = {
// //   tabBarLabel: 'ODIS',
// //   tabBarIcon: ({ focused }) => (
// //     <TabBarIcon
// //       focused={focused}
// //       name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
// //     />
// //   )
// // };

// OdisStack.path = '';
// End ODIS screen

// const AppDrawerNavigator = createDrawerNavigator({
//   'Quick Start': {
//     screen: HomeScreen
//   },
//   'Main menu': {
//     screen: WipTabNavigator
//   },
//   'News menu': {
//     screen: NewsTabNavigator
//   },
//   'Odis versions': {
//     screen: OdisScreen
//   },
//   Stats: {
//     screen: StatsScreen
//   },
//   'Sign out': {
//     screen: SignInScreen
//   }
// });

const DrawerContent = props => {
  const userDataObj = useSelector(state => state.user.userData[0]);
  const brandText =
    (userDataObj && userDataObj.brand) || (userDataObj && 'All brands') || '';
  //   const deviceBrand = getBrand();
  //   const appStoreVersion = getVersion();
  //   const manufacturer = getManufacturer();
  //   console.log('deviceBrand', deviceBrand && deviceBrand);
  //   console.log('appStoreVersion', appStoreVersion && appStoreVersion);
  //   console.log('dmanufacturer', manufacturer && manufacturer);
  //   console.log('userBrandText', brandText);
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.stretched}>
          <DrawerItems {...props} />
          <View style={styles.footerContainer}>
            <Text style={styles.appName}>{Constants.manifest.name}</Text>
            {userDataObj && userDataObj.userName ? (
              <Text style={styles.brand}>{userDataObj.userName}</Text>
            ) : null}
            <Text style={styles.brand}>{brandText}</Text>
            {Constants && Constants.deviceName ? (
              <Text style={styles.deviceVersion}>
                {Platform && Platform.OS && Platform.Version ? (
                  <Text>{`${Platform.constants.systemName} v${Platform.Version}`}</Text>
                ) : null}
              </Text>
            ) : null}

            <Text
              style={styles.appVersion}
            >{`Build version ${Constants.manifest.version}`}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: { drawerLabel: 'Home' }
    },
    FindToolsStack: {
      screen: WipTabNavigator,
      navigationOptions: {
        drawerLabel: 'Find tools, return tools, jobs & LTP',
        initialRouteName: 'FindTools'
      }
    },
    NewsStack: {
      screen: NewsTabNavigator,
      navigationOptions: {
        drawerLabel: 'News, products, ODIS, stats',
        initialRouteName: 'News'
      }
    },

    SignedOutStack: {
      screen: SignOutScreen,
      navigationOptions: {
        drawerLabel: 'Sign out'
      }
    }
  },
  {
    contentComponent: DrawerContent
  }
);

// Tab navigator
// const MainTabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Wip: WipTabNavigator,
//   News: NewsTabNavigator
// });

// MainTabNavigator.path = '';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: SignedOutStack,
      Main: AppDrawerNavigator
      //   Main: CustomDrawerContentComponent
    },
    // { initialRouteName: userIsSignedIn ? 'Main' : 'Auth' }
    { initialRouteName: 'AuthLoading' }
  )
);
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
