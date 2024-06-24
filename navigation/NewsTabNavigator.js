import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getPushDataObject } from 'native-notify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

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
// import CatalogueScreen from '../screens/CatalogueScreen';
// import OdisScreen from '../screens/OdisScreen';
// import { setNotificationTarget } from '../actions/user';
// import { resetNotificationTarget } from '../actions/user';

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

// const headerHeight =
//   screenWidth > 1023 ? 90 : screenWidth > 767 ? 80 : screenWidth > 413 ? 70 : screenWidth > 374 ? 60 : 60;
// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth, 'navBarFontSize', navBarFontSize);

// Start tab navigator

const NewsTabs = createBottomTabNavigator();

// console.log(
//   'in news navigator, newsAlertCount ',
//   newsAlertCount && newsAlertCount
// );

const NewsTabNavigator = ({ navigation, route }) => {
  // const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  //   console.log(' NewsTabNavigator', navigation.navigate);
  //   const dispatch = useDispatch();
  //   const thisSection = AppSections.NEWSTABS;
  const unseenCriticalNews = useSelector(
    (state) => state.news.unseenCriticalNews
  );
  //   const notificationTarget = useSelector(
  //     (state) => state.user.notificationTarget
  //   );
  const [pushDataObj, setPushDataObj] = useState(null);
  //   const [pushDataTargetScreen, setPushDataTargetScreen] = useState(null);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const getPushDataObjFn = useCallback(async () => {
    // console.log('in NewsNav in getPushDataObjFn');
    // let data = {};
    try {
      const fetchedData = await getPushDataObject();
      //   console.log('in NewsNav getPushDataObjFn finished', data);
      //   if (typeof data == 'object' && Object.hasOwn(data, 'targetScreen')) {
      //     setPushDataTargetScreen(pushDataObj.targetScreen);
      //   }
      return fetchedData;
    } catch (err) {
      console.log('in NewsNav getPushDataObjFn err', err);
      return {};
    }
    // console.log('in NewsNav end of getPushDataObjFn', data);
  }, []);
  // let data = getPushDataObject();
  const data = useMemo(() => getPushDataObjFn(), [getPushDataObjFn]);

  useEffect(() => {
    console.log('useEffect triggered with data:', data);

    // Check if data is defined and an object
    if (data && typeof data === 'object') {
      if (data.hasOwnProperty('targetScreen')) {
        console.log(
          'in NewsNav useEffect 1, storing in state data: ' +
            JSON.stringify(data)
        );
        setPushDataObj(data);
      } else if (data.hasOwnProperty('dataError')) {
        console.log(
          'in NewsNav useEffect 1 dataError: ' + JSON.stringify(data)
        );
        setPushDataObj(data);
      } else {
        console.log(
          'in NewsNav useEffect 1 no relevant data in state: ' +
            JSON.stringify(data)
        );
      }
    } else {
      console.log('data is undefined or not an object');
    }
  }, [data]); // must not have any dependency on pushDataObj

  useEffect(() => {
    // console.log('in NewsNav useEffect 2 pushDataObj', JSON.stringify(pushDataObj));
    if (pushDataObj && typeof pushDataObj === 'object') {
      if (pushDataObj?.hasOwnProperty('dataError')) {
        //   console.log(
        //     'in NewsNav pushDataObj.hasOwnProperty(dataError)' +
        //       JSON.stringify(pushDataObj)
        //   );
        navigation.navigate('NewsTabs', { screen: 'News' });
      } else if (pushDataObj?.hasOwnProperty('targetScreen')) {
        //   console.log(
        //     'in NewsNav pushDataObj.hasOwnProperty(targetScreen)' +
        //       JSON.stringify(pushDataObj)
        //   );
        const targetObj = getNavTargetObj(pushDataObj?.targetScreen);
        //   console.log('in NewsNav after getNavTargetObj' + JSON.stringify(targetObj));
        if (
          targetObj &&
          typeof targetObj === 'object' &&
          targetObj.hasOwnProperty('targetScreen') &&
          targetObj.targetScreen &&
          targetObj.hasOwnProperty('targetSection') &&
          targetObj.targetSection
        ) {
          //   dispatch(setNotificationTarget(targetObj));
          // console.log('in NewsNav end targetObj: ' + JSON.stringify(targetObj));
          const tempNotificationTarget = { ...targetObj };
          //     (pushDataObj && pushDataObj.targetScreen) || null;
          // console.log(
          //   'in NewsNav useEffect, tempNotificationTarget',
          //   JSON.stringify(tempNotificationTarget)
          // );
          const constantFromTargetSection =
            tempNotificationTarget?.targetSection
              .replace?.(/\s/g, '')
              .toUpperCase?.() ?? '';
          // setPushDataObj(null);
          if (constantFromTargetSection === AppSections.HOME) {
            //   console.log('in NewsNav useEffect, e');
            navigation.navigate('Home');
          } else {
            //   console.log(
            //     'in NewsNav useEffect ready to navigate to' +
            //       JSON.stringify(tempNotificationTarget)
            //   );
            navigation.navigate(tempNotificationTarget.targetSection, {
              screen: tempNotificationTarget.targetScreen,
            });
          }
          // setPushDataObj(data);
          //   } else {
          //     console.log(
          //       'in NewsNav Target object is not useable.' + JSON.stringify(targetObj)
          //     );
        }
      }
    } else {
      console.log('data is undefined or not an object');
    }
    // if (pushDataObj != null) {
    //   console.log('in NewsNav at zz' + JSON.stringify(pushDataObj));
    // }
  }, [pushDataObj, navigation]); // stops it looping

  useEffect(() => {
    // console.log('alerts:', alerts);

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
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => {
              navigation.toggleDrawer();
            }}
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
