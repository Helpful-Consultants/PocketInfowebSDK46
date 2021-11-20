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
import FindToolsScreen from '../screens/FindToolsScreen';
import BookedOutToolsScreen from '../screens/BookedOutToolsScreen';
import JobsScreen from '../screens/JobsScreen';
import LtpListScreen from '../screens/LtpListScreen';

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

const WipTabs =
  Platform.OS === 'androidzzz'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default WipTabNavigator = ({ navigation, route }) => {
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
    <WipTabs.Navigator //iOS
      initialRouteName='Find Tools' // ios and android
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
        lazy: true,
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
      <WipTabs.Screen
        name='Find Tools'
        component={FindToolsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='build' size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name='Booked Tools'
        component={BookedOutToolsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='return-down-back' size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name='My Jobs'
        component={JobsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='clipboard' size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name='Loan Tools'
        component={LtpListScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='swap-horizontal' size={size} />
          ),
        }}
      />
    </WipTabs.Navigator>
  );
};
// End Tab navigator
