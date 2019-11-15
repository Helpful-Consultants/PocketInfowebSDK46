import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import NewsScreen from '../screens/NewsScreen';
// import ProductsScreen from '../screens/ProductsScreen';
import LtpScreen from '../screens/LtpScreen';
import FindToolsScreen from '../screens/FindTools';
import JobsScreen from '../screens/JobsScreen';
import ReturnToolsScreen from '../screens/ReturnToolsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

// Home screen
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'WipHome',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

HomeStack.path = '';
// End Home screen

// Find Tools screen
const FindToolsStack = createStackNavigator(
  {
    FindTools: FindToolsScreen
  },
  config
);

FindToolsStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  )
};

FindToolsStack.path = '';
// End Find Tools screen

// ReturnTools screen
const ReturnToolsStack = createStackNavigator(
  {
    ReturnTools: ReturnToolsScreen
  },
  config
);

ReturnToolsStack.navigationOptions = {
  tabBarLabel: 'Return tools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
    />
  )
};

ReturnToolsStack.path = '';
// End Return Tools screen

// Jobs screen
const JobsStack = createStackNavigator(
  {
    Jobs: JobsScreen
  },
  config
);

JobsStack.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
    />
  )
};

JobsStack.path = '';
// End Jobs screen

// LTP screen
const LtpStack = createStackNavigator(
  {
    Ltp: LtpScreen
  },
  config
);

LtpStack.navigationOptions = {
  tabBarLabel: 'LTP',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
    />
  )
};

LtpStack.path = '';
// End LTP screen

// Tab navigator
const tabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  FindToolsStack,
  ReturnToolsStack,
  JobsStack,
  LtpStack
});

tabNavigator.path = '';
// End Tab navigator

export default tabNavigator;
