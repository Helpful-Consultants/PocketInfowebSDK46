import React, { useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import NewsScreen from '../screens/NewsScreen';
import StatsScreen from '../screens/StatsScreen';
import CatalogueScreen from '../screens/CatalogueScreen';

import Colors from '../constants/Colors';
const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);
const baseFontSize = 12;
let navBarFontSize =
  screenWidth > 1023
    ? baseFontSize * 1.3
    : screenWidth > 767
    ? baseFontSize * 1.2
    : screenWidth > 413
    ? baseFontSize * 1.1
    : screenWidth > 374
    ? baseFontSize * 1
    : baseFontSize * 1;

let headerHeight =
  screenWidth > 1023
    ? 90
    : screenWidth > 767
    ? 80
    : screenWidth > 413
    ? 70
    : screenWidth > 374
    ? 60
    : 60;
// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth, 'navBarFontSize', navBarFontSize);

// Start tab navigator

const NewsTabs =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default NewsTabNavigator = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#3689b1',
      },
      headerTitle: () => (
        <TitleWithAppLogo title={getFocusedRouteNameFromRoute(route)} />
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='home'
            iconName={Platform.OS === 'ios' ? 'home' : 'home'}
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
            iconName={Platform.OS === 'ios' ? 'menu' : 'menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, route]);

  return (
    <NewsTabs.Navigator //iOS
      initialRouteName='News' // ios and android
      backBehavior='history' // ios and android
      // for android - start
      activeColor={Colors.vwgActiveLink} // android
      inactiveColor={Colors.vwgInactiveLink} // android
      shifting={false} //android
      barStyle={{
        // android
        labelPosition: 'below-icon',
        backgroundColor: Colors.vwgVeryLightGray,
      }}
      // for android - end
      // for ios - start
      sceneContainerStyle={{ backgroundColor: 'white' }} // ios
      screenOptions={{
        // android and ios
        headerShown: false, //ios
        tabBarActiveTintColor: Colors.vwgActiveLink, //ios
        tabBarInactiveTintColor: Colors.vwgInactiveLink, //ios
        tabBarActiveBackgroundColor: Colors.vwgWhite, //ios
        tabBarInactiveBackgroundColor: Colors.vwgWhite, //ios
        tabBarLabelStyle: {
          //ios
          fontSize: navBarFontSize,
        },
        tabBarLabelPosition: 'below-icon', //io
        sceneContainerStyle: { backgroundColor: 'white' }, // ios
      }}
      // for ios - end
    >
      <NewsTabs.Screen
        name='News'
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='document' size={size} />
          ),
        }}
      />
      <NewsTabs.Screen
        name='Catalogue'
        component={CatalogueScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='book' size={size} />
          ),
        }}
      />
      <NewsTabs.Screen
        name='Stats'
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='stats-chart' size={size} />
          ),
        }}
      />
    </NewsTabs.Navigator>
  );
};
// End Tab navigator
