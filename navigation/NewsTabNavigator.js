import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import StatsScreen from '../screens/StatsScreen';
import OdisScreen from '../screens/OdisScreen';
import Colors from '../constants/Colors';

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {}
// });

// Home screen
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  }
  //   config
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
// End Home screen

// News screen
const NewsStack = createStackNavigator(
  {
    News: NewsScreen
  }
  //   config
);

NewsStack.navigationOptions = {
  initialRouteName: 'news',
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
// End News screen

// Products screen
const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen
  }
  //   config
);

ProductsStack.navigationOptions = {
  initialRouteName: 'Products',
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
// End Products screen

// ODIS screen
const OdisStack = createStackNavigator(
  {
    Odis: OdisScreen
  }
  //   config
);

OdisStack.navigationOptions = {
  initialRouteName: 'Odis',
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
// End ODIS screen

// Stats screen
const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen
  }
  //   config
);

StatsStack.navigationOptions = {
  initialRouteName: 'Stats',
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
// End Stats screen

// Tab navigator
const tabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator({
        NewsStack,
        ProductsStack,
        OdisStack,
        StatsStack
      })
    : createBottomTabNavigator({
        NewsStack,
        ProductsStack,
        OdisStack,
        StatsStack
      });
// End Tab navigator

const styles = StyleSheet.create({
  focused: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.7)
  },
  notFocused: {
    fontFamily: 'the-sans',
    color: Colors.vwgIosLink,
    fontSize: RFPercentage(1.7)
  }
});

export default tabNavigator;
