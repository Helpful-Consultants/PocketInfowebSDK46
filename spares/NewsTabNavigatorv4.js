import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import TabBarIcon from '../components/TabBarIcon';
import BadgedTabBarText from '../components/BadgedTabBarText';
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

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);

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
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <BadgedTabBarText
            showBadge={false}
            focused={focused}
            text={'News'}
            value={3}
          />
        )
      : 'News',
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
  tabBarColor: Colors.vwgWhite,
  tabBarLabel: ({ focused }) => (
    <BadgedTabBarText
      showBadge={false}
      focused={focused}
      text={'Products'}
      value={3}
    />
  ),
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <BadgedTabBarText
            showBadge={false}
            focused={focused}
            text={'Products'}
            value={3}
          />
        )
      : 'Products',
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
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>ODIS</Text>
        )
      : 'ODIS',
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
  tabBarColor: Colors.vwgWhite,
  tabBarLabel:
    Platform.OS === 'ios'
      ? ({ focused }) => (
          <Text style={focused ? styles.focused : styles.notFocused}>
            Stats
          </Text>
        )
      : 'Stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  )
};
// End Stats screen

// Tab navigator
const NewsTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        {
          NewsStack,
          ProductsStack,
          OdisStack,
          StatsStack
        },
        {
          labeled: true,
          shifting: false,
          backBehavior: 'history',
          activeColor: Colors.vwgDeepBlue,
          inactiveColor: Colors.vwgLink,
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
          NewsStack,
          ProductsStack,
          OdisStack,
          StatsStack
        },
        {
          tabBarOptions: {
            labelPosition: 'below-icon',
            style: {
              //   height: RFPercentage(6.4)
            }
          },
          tabStyle: {
            // height: RFPercentage(2.2)
          }
        }
      );
// End Tab navigator

const styles = StyleSheet.create({
  focused: {
    fontFamily: 'the-sans',
    color: Colors.vwgActiveLink,
    fontSize: RFPercentage(1.7)
  },
  notFocused: {
    fontFamily: 'the-sans',
    color: Colors.vwgInactiveLink,
    fontSize: RFPercentage(1.7)
  }
});

export default NewsTabNavigator;
