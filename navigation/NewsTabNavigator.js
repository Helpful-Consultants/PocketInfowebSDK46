import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import NewsScreen from '../screens/NewsScreen';
import StatsScreen from '../screens/StatsScreen';
// import CatalogueScreen from '../screens/CatalogueScreen';
import ElsaScreen from '../screens/ElsaScreen';
// import OdisScreen from '../screens/OdisScreen';
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

const NewsTabs = createBottomTabNavigator();

// console.log(
//   'in news navigator, newsAlertCount ',
//   newsAlertCount && newsAlertCount
// );

export default NewsTabNavigator = ({ navigation, route }) => {
  // const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const unseenCriticalNews = useSelector(
    (state) => state.news.unseenCriticalNews
  );

  useEffect(() => {
    // console.log('alerts:', alerts);

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
          tabBarBadge:
            typeof unseenCriticalNews === 'number' && unseenCriticalNews > 0
              ? ''
              : null,
          tabBarBadgeStyle: {
            backgroundColor: Colors.vwgBadgeSevereAlertColor,
            // width: 5,
            //height: 5,
            // right: 10,
            // borderRadius: 2,
          },
        }}
      />
      <NewsTabs.Screen
        name='Elsa2Go'
        component={ElsaScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='phone-portrait' size={size} />
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
