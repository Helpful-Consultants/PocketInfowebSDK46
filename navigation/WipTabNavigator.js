import React from 'react';
import { Platform, Dimensions } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
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
import FindToolsScreen, {
  screenOptions as FindToolsScreenOptions,
} from '../screens/FindToolsScreen';
import BookedOutToolsScreen, {
  screenOptions as BookedOutToolsScreenOptions,
} from '../screens/BookedOutToolsScreen';
import JobsScreen, {
  screenOptions as JobsScreenOptions,
} from '../screens/JobsScreen';
import LtpScreen, {
  screenOptions as LtpScreenOptions,
} from '../screens/LtpScreen';

console.log('LtpScreenOptions', LtpScreenOptions);

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

// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth, 'navBarFontSize', navBarFontSize);

const defaultStackNavOptions = () => {
  //   const windowDim = useWindowDimensions();
  //   const baseStyles = windowDim && getBaseStyles(windowDim);
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

const FindTools = createStackNavigator();

const FindToolsStack = () => {
  return (
    <FindTools.Navigator screenOptions={defaultStackNavOptions}>
      <FindTools.Screen
        name={'FindToolsScreen'}
        component={FindToolsScreen}
        options={FindToolsScreenOptions}
      />
    </FindTools.Navigator>
  );
};

const BookedOutTools = createStackNavigator();
const BookedOutToolsStack = () => {
  return (
    <BookedOutTools.Navigator screenOptions={defaultStackNavOptions}>
      <BookedOutTools.Screen
        name={'BookedOutToolsScreen'}
        component={BookedOutToolsScreen}
        options={BookedOutToolsScreenOptions}
      />
    </BookedOutTools.Navigator>
  );
};

const Jobs = createStackNavigator();
const JobsStack = () => {
  return (
    <Jobs.Navigator screenOptions={defaultStackNavOptions}>
      <Jobs.Screen
        name={'JobsScreen'}
        component={JobsScreen}
        options={JobsScreenOptions}
      />
    </Jobs.Navigator>
  );
};

const Ltp = createStackNavigator();
const LtpStack = () => {
  return (
    <Ltp.Navigator screenOptions={defaultStackNavOptions}>
      <Ltp.Screen
        name={'LtpScreen'}
        component={LtpScreen}
        options={LtpScreenOptions}
      />
    </Ltp.Navigator>
  );
};

// Tab navigator
const WipTabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

export default WipTabNavigator = () => {
  return Platform.OS === 'ios' ? (
    <WipTabs.Navigator //iOS
      lazy={true}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon', // Otherwise weird for landscape
        labelStyle: {
          fontSize: navBarFontSize,
        },
        activeTintColor: Colors.vwgActiveLink,
        inactiveTintColor: Colors.vwgInactiveLink,
        adaptive: false,
      }}
      //screenOptions={defaultTabNavScreenOptions}
    >
      <WipTabs.Screen
        name='FindTools'
        component={FindToolsStack}
        options={FindToolsScreenOptions}
      />
      <WipTabs.Screen
        name='BookedOutTools'
        component={BookedOutToolsStack}
        options={BookedOutToolsScreenOptions}
      />
      <WipTabs.Screen
        name='Jobs'
        component={JobsStack}
        options={JobsScreenOptions}
      />
      <WipTabs.Screen
        name='Ltp'
        component={LtpStack}
        options={LtpScreenOptions}
      />
    </WipTabs.Navigator>
  ) : (
    <WipTabs.Navigator // Android
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
      <WipTabs.Screen
        name='FindTools'
        component={FindToolsStack}
        options={FindToolsScreenOptions}
      />
      <WipTabs.Screen
        name='BookedOutTools'
        component={BookedOutToolsStack}
        options={BookedOutToolsScreenOptions}
      />
      <WipTabs.Screen
        name='Jobs'
        component={JobsStack}
        options={JobsScreenOptions}
      />
      <WipTabs.Screen
        name='Ltp'
        component={LtpStack}
        options={LtpScreenOptions}
      />
    </WipTabs.Navigator>
  );
};
// End Tab navigator
