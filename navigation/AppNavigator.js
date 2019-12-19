import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
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

const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: { drawerLabel: 'Home' }
  },
  FindToolsStack: {
    screen: WipTabNavigator,
    navigationOptions: {
      drawerLabel: 'Tools & jobs',
      initialRouteName: 'FindTools'
    }
  },
  NewsStack: {
    screen: NewsTabNavigator,
    navigationOptions: {
      drawerLabel: 'News & products',
      initialRouteName: 'News'
    }
  },
  OdisStack: {
    screen: NewsTabNavigator,
    navigationOptions: {
      drawerLabel: 'Odis versions',
      initialRouteName: 'Odis'
    }
  },
  StatsStack: {
    screen: NewsTabNavigator,
    navigationOptions: { drawerLabel: 'Stats', initialRouteName: 'Stats' }
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
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: SignedOutStack,
      Main: AppDrawerNavigator
    },
    // { initialRouteName: userIsSignedIn ? 'Main' : 'Auth' }
    { initialRouteName: 'AuthLoading' }
  )
);
