import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

// import BadgedTabBarText from '../components/BadgedTabBarText';
// import HomeScreen, {
//   screenOptions as HomeScreenOptions
// } from '../screens/HomeScreen';
import NewsScreen, {
  screenOptions as NewsScreenOptions,
} from '../screens/NewsScreen';
import ProductsScreen, {
  screenOptions as ProductsScreenOptions,
} from '../screens/ProductsScreen';
import OdisScreen, {
  screenOptions as OdisScreenOptions,
} from '../screens/OdisScreen';
import StatsScreen, {
  screenOptions as StatsScreenOptions,
} from '../screens/StatsScreen';

import Colors from '../constants/Colors';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth);

const defaultStackNavOptions = () => {
  const navigation = useNavigation();
  return {
    headerStyle: {
      backgroundColor: Colors.vwgHeader,
      height: 80,
    },
    cardStyle: { backgroundColor: 'white' },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='home'
          iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          onPress={() => {
            {
              /* console.log('pressed homescreen icon'); */
            }
            navigation.navigate('Home');
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='menu'
          iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

// const HomeStack = createStackNavigator();
// <HomeStack.Navigator screenOptions={defaultStackNavOptions}>
//   <HomeStack.Screen
//     name={Home}
//     component={HomeScreen}
//     options={HomeScreenOptions}
//   />
// </HomeStack.Navigator>;

const News = createStackNavigator();

const NewsStack = () => {
  return (
    <News.Navigator screenOptions={defaultStackNavOptions}>
      <News.Screen
        name={'NewsScreen'}
        component={NewsScreen}
        options={NewsScreenOptions}
      />
    </News.Navigator>
  );
};

const Products = createStackNavigator();
const ProductsStack = () => {
  return (
    <Products.Navigator screenOptions={defaultStackNavOptions}>
      <Products.Screen
        name={'ProductsScreen'}
        component={ProductsScreen}
        options={ProductsScreenOptions}
      />
    </Products.Navigator>
  );
};

const Odis = createStackNavigator();
const OdisStack = () => {
  return (
    <Odis.Navigator screenOptions={defaultStackNavOptions}>
      <Odis.Screen
        name={'OdisScreen'}
        component={OdisScreen}
        options={OdisScreenOptions}
      />
    </Odis.Navigator>
  );
};

const Stats = createStackNavigator();
const StatsStack = () => {
  return (
    <Stats.Navigator screenOptions={defaultStackNavOptions}>
      <Stats.Screen
        name={'StatsScreen'}
        component={StatsScreen}
        options={StatsScreenOptions}
      />
    </Stats.Navigator>
  );
};

// Tab navigator

const defaultTabNavScreenOptions =
  Platform.OS === 'android'
    ? {
        labeled: true,
        shifting: false,
        backBehavior: 'history',
        activeColor: Colors.vwgDeepBlue,
        inactiveColor: Colors.vwgLink,
        tabBarColor: Colors.vwgWhite,
        barStyle: {
          labelPosition: 'below-icon',

          // height: RFPercentage(6.4),
          backgroundColor: Colors.vwgWhite,
        },
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
    : {
        tabBarOptions: {
          labelPosition: 'below-icon',
          style: {
            // height: RFPercentage(6.4)
          },
          activeTintColor: Colors.vwgActiveLink,
        },
        tabStyle: {
          //   height: RFPercentage(2.2)
        },
      };

const NewsTabs =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default NewsTabNavigator = () => {
  return Platform.OS === 'ios' ? (
    <NewsTabs.Navigator
      lazy={true}
      screenOptions={defaultTabNavScreenOptions}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon',
        style: {
          height: RFPercentage(6.4),
        },
        activeTintColor: Colors.vwgActiveLink,
        inactiveTintColor: Colors.vwgInactiveLink,
      }}
    >
      <NewsTabs.Screen
        name='News'
        component={NewsStack}
        options={NewsScreenOptions}
      />
      <NewsTabs.Screen
        name='Products'
        component={ProductsStack}
        options={ProductsScreenOptions}
      />
      <NewsTabs.Screen
        name='Odis'
        component={OdisStack}
        options={OdisScreenOptions}
      />
      <NewsTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </NewsTabs.Navigator>
  ) : (
    <NewsTabs.Navigator
      lazy={true}
      screenOptions={defaultTabNavScreenOptions}
      labeled={true}
      title='Default Title'
      shifting={false}
      backBehavior={'history'}
      activeColor={Colors.vwgActiveLink}
      inactiveColor={Colors.vwgInactiveLink}
      tabBarColor={Colors.vwgWhite}
      barStyle={{
        labelPosition: 'below-icon',

        // height: RFPercentage(6.4),
        backgroundColor: Colors.vwgWhite,
      }}
    >
      <NewsTabs.Screen
        name='News'
        component={NewsStack}
        options={NewsScreenOptions}
      />
      <NewsTabs.Screen
        name='Products'
        component={ProductsStack}
        options={ProductsScreenOptions}
      />
      <NewsTabs.Screen
        name='Odis'
        component={OdisStack}
        options={OdisScreenOptions}
      />
      <NewsTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </NewsTabs.Navigator>
  );
};

// End Tab navigator

const styles = StyleSheet.create({
  focused: {
    fontFamily: 'the-sans',
    color: Colors.vwgActiveLink,
    fontSize: RFPercentage(1.7),
  },
  notFocused: {
    fontFamily: 'the-sans',
    color: Colors.vwgInactiveLink,
    fontSize: RFPercentage(1.7),
  },
});
