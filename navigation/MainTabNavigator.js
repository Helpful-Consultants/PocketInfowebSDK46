import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import LtpScreen from '../screens/LtpScreen';
import LocatorScreen from '../screens/LocatorScreen';
import JobsScreen from '../screens/JobsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UsersScreen from '../screens/UsersScreen';

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
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

HomeStack.path = '';

// End Home screen
// Tools screen

const LocatorStack = createStackNavigator(
  {
    Tools: LocatorScreen
  },
  config
);

LocatorStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  )
};

LocatorStack.path = '';

// End Tools screen
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
// News screen

const NewsStack = createStackNavigator(
  {
    News: NewsScreen
  },
  config
);

NewsStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

NewsStack.path = '';

// End News screen
// Products screen

const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  )
};

ProductsStack.path = '';

// End Products screen
// LTP screen

const LtpStack = createStackNavigator(
  {
    LTP: LtpScreen
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
// Users screen

const UsersStack = createStackNavigator(
  {
    Users: UsersScreen
  },
  config
);

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  )
};

UsersStack.path = '';

// End Users screen
// Settings screen

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

SettingsStack.path = '';

// End Settings screen
// Options screen

const OptionsStack = createStackNavigator(
  {
    Options: SettingsScreen
  },
  config
);

OptionsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
    />
  )
};

OptionsStack.path = '';

// End Options screen

// Panel at bottom

const tabNavigator = createBottomTabNavigator({
  LocatorStack,
  JobsStack,
  LtpStack,
  NewsStack,
  ProductsStack
  //   UsersStack

  //   OptionsStack
});

tabNavigator.path = '';

export default tabNavigator;
