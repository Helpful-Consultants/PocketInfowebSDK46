import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import NewsScreen from '../screens/NewsScreen';
// import ProductsScreen from '../screens/ProductsScreen';

import FindToolsScreen from '../screens/FindToolsScreen';
import LtpScreen from '../screens/LtpScreen';
import JobsScreen from '../screens/JobsScreen';
import BookedOutToolsScreen from '../screens/BookedOutToolsScreen';
import Colors from '../constants/Colors';

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {}
// });

// Home screen
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

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

// Find Tools screen
const FindToolsStack = createStackNavigator({
  FindTools: FindToolsScreen
});

FindToolsStack.navigationOptions = {
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>
            Find tools
          </Text>
        )
      : 'Find tools',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  )
};
// End Find Tools screen

// BookedOutTools screen
const BookedOutToolsStack = createStackNavigator({
  BookedOutTools: BookedOutToolsScreen
});

BookedOutToolsStack.navigationOptions = {
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>
            Booked tools
          </Text>
        )
      : 'Booked tools',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
    />
  )
};
// End Return Tools screen

// Jobs screen
const JobsStack = createStackNavigator({
  Jobs: JobsScreen
});

JobsStack.navigationOptions = {
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>Jobs</Text>
        )
      : 'Jobs',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
    />
  )
};
// End Jobs screen

// LTP screen
const LtpStack = createStackNavigator({
  Ltp: LtpScreen
});

LtpStack.navigationOptions = {
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>LTP</Text>
        )
      : 'LTP',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
    />
  )
};
// End LTP screen

// Tab navigator
const WipTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        {
          FindToolsStack,
          BookedOutToolsStack,
          JobsStack,
          LtpStack
        },
        {
          labeled: true,
          shifting: false,
          backBehavior: 'history',
          activeColor: Colors.vwgDeepBlue,
          inactiveColor: Colors.vwgIosLink,
          tabBarColor: Colors.vwgWhite,
          barStyle: {
            labelPosition: 'below-icon',

            // height: RFPercentage(6.4),
            backgroundColor: Colors.vwgWhite
          }
          //   tabBarOptions: {
          //     labelPosition: 'below-icon',
          //     style: {
          //       height: RFPercentage(6.4)
          //     }
          //   },
          //   tabStyle: {
          //     height: RFPercentage(2.2)
          //   }
        }
      )
    : createBottomTabNavigator(
        {
          FindToolsStack,
          BookedOutToolsStack,
          JobsStack,
          LtpStack
        },
        {
          tabBarOptions: {
            labelPosition: 'below-icon',
            style: {
              height: RFPercentage(6.4)
            }
          },
          tabStyle: {
            height: RFPercentage(2.2)
          }
        }
      );
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

export default WipTabNavigator;
