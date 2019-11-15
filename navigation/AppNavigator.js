import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import { HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import WelcomeScreen from '../screens/WelcomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignOutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import OdisScreen from '../screens/OdisScreen';
import StatsScreen from '../screens/StatsScreen';

import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';
import DashboardStackNavigator from './DashboardStackNavigator';

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

const AppDrawerNavigator = createDrawerNavigator({
  'Quick Start': {
    screen: HomeScreen
  },
  'Main menu': {
    screen: WipTabNavigator
  },
  'News menu': {
    screen: NewsTabNavigator
  },
  'Odis versions': {
    screen: OdisScreen
  },
  Stats: {
    screen: StatsScreen
  },
  'Sign out': {
    screen: SignOutScreen
  }
});

export default createAppContainer(
  createSwitchNavigator({
    Auth: SignedOutStack,
    // SignOut: SignOutScreen,
    // Dashboard: AppDrawerNavigator,
    // Main: AppDrawerNavigator,
    Wip: WipTabNavigator,
    News: NewsTabNavigator
    // Home: HomeScreen,
    // Odis: OdisScreen
  })
);
