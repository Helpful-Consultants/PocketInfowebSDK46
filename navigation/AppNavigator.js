import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignOutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import OdisScreen from '../screens/OdisScreen';
import StatsScreen from '../screens/StatsScreen';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';

useScreens();

const SignedOutStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Sign In'
    }
  },
  ForgottenPassword: {
    screen: ForgottenPasswordScreen,
    navigationOptions: {
      title: 'Forgotten Password'
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register'
    }
  },
  SignOut: {
    screen: SignOutScreen,
    navigationOptions: {
      title: 'Sign out'
    }
  }
});

// // ODIS stack
// const OdisStack = createStackNavigator({
//   Odis: OdisScreen
// });

// Stats stack
const StatsStack = createStackNavigator({
  Stats: StatsScreen
});

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

const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: { drawerLabel: 'Home' }
  },
  JobsScreen: {
    screen: WipTabNavigator,
    navigationOptions: { drawerLabel: 'Tools & jobs' }
  },
  NewsScreen: {
    screen: NewsTabNavigator,
    navigationOptions: { drawerLabel: 'News & products' }
  },
  OdisScreen: {
    screen: NewsTabNavigator,
    navigationOptions: {
      drawerLabel: 'Odis versions',
      initialRouteName: 'OdisScreen'
    }
  },
  StatsStack: {
    screen: NewsTabNavigator,
    navigationOptions: { drawerLabel: 'Stats', initialRouteName: 'OdisScreen' }
  },
  SignedOutStack: {
    screen: SignedOutStack,
    navigationOptions: {
      drawerLabel: 'Sign out'
    }
  }
});

// Tab navigator
const MainTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Wip: WipTabNavigator,
  News: NewsTabNavigator
});

MainTabNavigator.path = '';

export default createAppContainer(
  createSwitchNavigator({
    //   AuthLoading: AuthLoadingScreen,
    Main: AppDrawerNavigator,
    Auth: SignedOutStack
  })
);
