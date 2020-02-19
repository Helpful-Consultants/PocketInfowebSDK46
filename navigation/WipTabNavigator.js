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
import FindToolsScreen, {
  screenOptions as FindToolsScreenOptions
} from '../screens/FindToolsScreen';
import BookedOutToolsScreen, {
  screenOptions as BookedOutToolsScreenOptions
} from '../screens/BookedOutToolsScreen';
import JobsScreen, {
  screenOptions as JobsScreenOptions
} from '../screens/JobsScreen';
import LtpScreen, {
  screenOptions as LtpScreenOptions
} from '../screens/LtpScreen';

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
      height: 80
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
    )
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

const defaultTabNavScreenOptions =
  Platform.OS === 'ios'
    ? {
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
    : {
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
      };

const WipTabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

export default WipTabNavigator = () => {
  return Platform.OS === 'ios' ? (
    <WipTabs.Navigator
      screenOptions={defaultTabNavScreenOptions}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon',
        style: {
          height: RFPercentage(6.4)
        },
        activeTintColor: Colors.vwgActiveLink,
        inactiveTintColor: Colors.vwgInactiveLink
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
  ) : (
    <WipTabs.Navigator
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
        backgroundColor: Colors.vwgWhite
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
