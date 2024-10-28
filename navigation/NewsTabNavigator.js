import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getPushDataObject } from 'native-notify';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import TabBarIcon from '../components/TabBarIcon';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import { AppSections } from '../constants/AppParts';
import Colors from '../constants/Colors';
import getBaseStyles from '../helpers/getBaseStyles';
import getNavTargetObj from '../helpers/getNavTargetObj';
import ElsaScreen from '../screens/ElsaScreen';
import NewsScreen from '../screens/NewsScreen';
import StatsScreen from '../screens/StatsScreen';
import { InfoTypesAlertAges } from '../constants/InfoTypes';
// import CatalogueScreen from '../screens/CatalogueScreen';
// import OdisScreen from '../screens/OdisScreen';
// import { setNotificationTarget } from '../actions/user';
// import { resetNotificationTarget } from '../actions/user';

import { selectFetchParamsObj } from '../reducers/user';
import { getUserRequest, setUserValidated } from '../actions/user';
const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

const baseFontSize = 12;
const navBarFontSize =
  screenWidth > 1023
    ? baseFontSize * 1.3
    : screenWidth > 767
      ? baseFontSize * 1.2
      : screenWidth > 413
        ? baseFontSize * 1.1
        : screenWidth > 374
          ? baseFontSize * 1
          : baseFontSize * 1;

const NewsTabs = createBottomTabNavigator();

const NewsTabNavigator = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  const unseenCriticalNews = useSelector(
    (state) => state.news.unseenCriticalNews
  );
  const [pushDataObj, setPushDataObj] = useState(null);
  const windowDim = useWindowDimensions();
  const baseStyles = getBaseStyles(windowDim);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getPushDataObject();
        const data = {};
        if (data && typeof data === 'object') {
          if (
            data.hasOwnProperty('targetScreen') ||
            data.hasOwnProperty('dataError')
          ) {
            setPushDataObj(data);
          } else {
            console.log('News Nav - No relevant data:', JSON.stringify(data));
          }
        } else {
          console.log('News Nav - Data is undefined or not an object');
        }
      } catch (err) {
        console.log('News Nav - Error fetching push data:', err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    // if (!userIsValidated) {
    //   // If not authenticated, navigate to sign-in screen
    //   //   navigation.navigate('SignIn'); // Ensure this matches your navigation setup
    //   dispatch(signOutUserRequest({ calledBy: 'NewsNav' }));
    //   return; // Exit early if the user is not authenticated
    // }
    if (userIsSignedIn && userIsSignedIn === true) {
      if (userCredsLastChecked) {
        console.log('NewsNav userCredsLastChecked', userCredsLastChecked);
        const now = new Date();
        const lastChecked = new Date(userCredsLastChecked);
        // Calculate the age of credentials in minutes
        // console.log('(now - lastChecked):', now - lastChecked);
        const ageOfCredentials = Math.floor((now - lastChecked) / (1000 * 60)); // in hours
        // console.log('ageOfCredentials:', ageOfCredentials);
        if (ageOfCredentials <= InfoTypesAlertAges.USER_CREDENTIALS) {
          dispatch(setUserValidated());
          //   console.log('ageOfCredentials under limit OK', ageOfCredentials);
        } else {
          //   console.log(
          //     'ageOfCredentials over limit so re-check needed',
          //     ageOfCredentials
          //   );
          //   dispatch(setUserOutdatedCredentials());
          //   console.log('&&&&&&&&& dispatch( getUserRequest())');
          if (fetchParamsObj && fetchParamsObj.userIntId) {
            dispatch(
              getUserRequest({
                userIntId: fetchParamsObj.userIntId,
              })
            );
          }
        }
      }
    }
    if (pushDataObj && typeof pushDataObj === 'object') {
      if (pushDataObj?.dataError) {
        navigation.navigate('NewsTabs', { screen: 'News' });
      } else if (pushDataObj?.targetScreen) {
        const targetObj = getNavTargetObj(pushDataObj.targetScreen);
        if (targetObj && targetObj.targetScreen && targetObj.targetSection) {
          const targetSection = tempNotificationTarget?.targetSection;
          const constantFromTargetSection =
            typeof targetSection === 'string'
              ? targetSection.replace(/\s/g, '').toUpperCase()
              : '';
          if (constantFromTargetSection === AppSections.HOME) {
            navigation.navigate('Home');
          } else {
            navigation.navigate(targetObj.targetSection, {
              screen: targetObj.targetScreen,
            });
          }
        }
      }
    }
  }, [pushDataObj, navigation, userIsValidated]); // stops it looping

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#3689b1',
      },
      headerLeftContainerStyle: { ...baseStyles.paddingLeft },
      headerTitle: () => (
        <TitleWithAppLogo title={getFocusedRouteNameFromRoute(route)} />
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="home"
            iconName="home"
            onPress={() => navigation.navigate('Home')}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={navigation.toggleDrawer}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, route, baseStyles.paddingLeft]);

  return (
    <NewsTabs.Navigator //iOS
      initialRouteName="News" // ios and android
      backBehavior="history" // ios and android
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
          fontFamily: 'TheGroupTEXT-Regular',
        },
        tabBarLabelPosition: 'below-icon', //io
        sceneContainerStyle: { backgroundColor: 'white' }, // ios
      }}
      // for ios - end
    >
      <NewsTabs.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="document" size={size} />
          ),
          tabBarBadge: unseenCriticalNews > 0 ? '' : null,
          tabBarBadgeStyle: {
            backgroundColor: Colors.vwgBadgeSevereAlertColor,
          },
        }}
      />
      <NewsTabs.Screen
        name="Elsa2Go"
        component={ElsaScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="phone-portrait" size={size} />
          ),
        }}
      />
      <NewsTabs.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="stats-chart" size={size} />
          ),
        }}
      />
    </NewsTabs.Navigator>
  );
};
// End Tab navigator
export default NewsTabNavigator;
