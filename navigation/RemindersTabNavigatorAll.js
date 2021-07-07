import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

// import BadgedTabBarText from '../components/BadgedTabBarText';
// import HomeScreen, {
//   screenOptions as HomeScreenOptions
// } from '../screens/HomeScreen';
import NotificationsScreen, {
  screenOptions as NotificationsScreenOptions,
} from '../screens/NotificationsScreen';
import ServiceMeasuresScreen, {
  screenOptions as ServiceMeasuresScreenOptions,
} from '../screens/ServiceMeasuresScreen';
import LtpLoansScreen, {
  screenOptions as LtpLoansScreenOptions,
} from '../screens/LtpLoansScreen';
import StatsScreen, {
  screenOptions as StatsScreenOptions,
} from '../screens/StatsScreen';

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

const defaultStackNavOptions = () => {
  //   const windowDim = useWindowDimensions();
  //   const baseStyles = windowDim && getBaseStyles(windowDim);
  const navigation = useNavigation();
  return {
    headerStyle: {
      backgroundColor: Colors.vwgHeader,
      height: headerHeight,
    },
    cardStyle: { backgroundColor: 'white' },
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

const Notifications = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Notifications.Navigator screenOptions={defaultStackNavOptions}>
      <Notifications.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
        options={NotificationsScreenOptions}
      />
    </Notifications.Navigator>
  );
};

const ServiceMeasures = createStackNavigator();
const ServiceMeasuresStack = () => {
  return (
    <ServiceMeasures.Navigator screenOptions={defaultStackNavOptions}>
      <ServiceMeasures.Screen
        name={'ServiceMeasuresScreen'}
        component={ServiceMeasuresScreen}
        options={ServiceMeasuresScreenOptions}
      />
    </ServiceMeasures.Navigator>
  );
};

const LtpLoans = createStackNavigator();
const LtpLoansStack = () => {
  return (
    <LtpLoans.Navigator screenOptions={defaultStackNavOptions}>
      <LtpLoans.Screen
        name={'LtpLoansScreen'}
        component={LtpLoansScreen}
        options={LtpLoansScreenOptions}
      />
    </LtpLoans.Navigator>
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

const RemindersTabs =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default RemindersTabNavigator = () => {
  return Platform.OS === 'ios' ? (
    <RemindersTabs.Navigator //iOS
      lazy={true}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon', // Otherwise weird for landscape
        labelStyle: {
          fontSize: navBarFontSize,
        },
        activeTintColor: Colors.vwgActiveLink,
        inactiveTintColor: Colors.vwgInactiveLink,
        activeBackgroundColor: Colors.vwgWhite,
        inactiveBackgroundColor: Colors.vwgWhite,
        adaptive: false,
      }}
    >
      <RemindersTabs.Screen
        name='Notifications'
        component={NotificationsStack}
        options={NotificationsScreenOptions}
      />
      <RemindersTabs.Screen
        name='ServiceMeasures'
        component={ServiceMeasuresStack}
        options={ServiceMeasuresScreenOptions}
      />
      <RemindersTabs.Screen
        name='LtpLoans'
        component={LtpLoansStack}
        options={LtpLoansScreenOptions}
      />
      <RemindersTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </RemindersTabs.Navigator>
  ) : (
    <RemindersTabs.Navigator // Android
      lazy={true}
      labeled={true}
      title='Default Title'
      shifting={false}
      backBehavior={'history'}
      activeColor={Colors.vwgActiveLink}
      inactiveColor={Colors.vwgInactiveLink}
      tabBarOptions={{
        labelStyle: {
          fontSize: navBarFontSize, // Doesn't seem to work
        },
      }}
      barStyle={{
        labelPosition: 'below-icon',
        backgroundColor: Colors.vwgVeryVeryLightGray,
      }}
    >
      <RemindersTabs.Screen
        name='Reminders'
        component={NotificationsStack}
        options={NotificationsScreenOptions}
      />
      <RemindersTabs.Screen
        name='ServiceMeasures'
        component={ServiceMeasuresStack}
        options={ServiceMeasuresScreenOptions}
      />
      <RemindersTabs.Screen
        name='LtpLoans'
        component={LtpLoansStack}
        options={LtpLoansScreenOptions}
      />
      <RemindersTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </RemindersTabs.Navigator>
  );
};
// End Tab navigator
