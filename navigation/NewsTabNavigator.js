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
// import LtpScreen from '../screens/LtpScreen';
// import FindToolsScreen from '../screens/FindTools';
// import JobsScreen from '../screens/JobsScreen';
import OdisScreen from '../screens/OdisScreen';

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
  tabBarLabel: 'News Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

HomeStack.path = '';
// End Home screen

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

// ODIS screen
const OdisStack = createStackNavigator(
  {
    Odis: OdisScreen
  },
  config
);

OdisStack.navigationOptions = {
  tabBarLabel: 'ODIS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
    />
  )
};

OdisStack.path = '';
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

// Tab navigator
const tabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  NewsStack,
  ProductsStack,
  OdisStack
});

tabNavigator.path = '';
// End Tab navigator

export default tabNavigator;
