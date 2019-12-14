import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import StatsScreen from '../screens/StatsScreen';
import OdisScreen from '../screens/OdisScreen';
import Colors from '../constants/Colors';

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
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Home</Text>
  ),
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
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>News</Text>
  ),
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
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Products</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  )
};
ProductsStack.path = '';
// End Products screen

// ODIS screen
const OdisStack = createStackNavigator(
  {
    Odis: OdisScreen
  },
  config
);

OdisStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>ODIS</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
    />
  )
};

OdisStack.path = '';
// End ODIS screen

// Stats screen
const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen
  },
  config
);

StatsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Stats</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  )
};

StatsStack.path = '';
// End Stats screen

// Tab navigator
const tabNavigator = createBottomTabNavigator({
  NewsStack,
  ProductsStack,
  OdisStack,
  StatsStack
});

tabNavigator.path = '';
// End Tab navigator

const styles = StyleSheet.create({
  focused: {
    color: Colors.vwgDeepBlue,
    fontSize: 12
  },
  notFocused: {
    color: Colors.vwgIosLink,
    fontSize: 12
  }
});

export default tabNavigator;
