import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { getPushDataObject } from 'native-notify';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import NewsScreen from '../screens/NewsScreen';
import StatsScreen from '../screens/StatsScreen';
// import CatalogueScreen from '../screens/CatalogueScreen';
import ElsaScreen from '../screens/ElsaScreen';
// import OdisScreen from '../screens/OdisScreen';
import getNavTargetObj from '../helpers/getNavTargetObj';
import Colors from '../constants/Colors';
import { AppSections } from '../constants/AppParts';
// import { setNotificationTarget } from '../actions/user';
// import { resetNotificationTarget } from '../actions/user';

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

  const getPushDataObjFn = async () => {
    // console.log('in NewsNav in getPushDataObjFn');
    // let data = {};
    try {
      data = await getPushDataObject();
      //   console.log('in NewsNav getPushDataObjFn finished', data);
      //   if (typeof data == 'object' && Object.hasOwn(data, 'targetScreen')) {
      //     setPushDataTargetScreen(pushDataObj.targetScreen);
      //   }
    } catch (err) {
      //   console.log('in NewsNav getPushDataObjFn err', err);
    }
    // console.log('in NewsNav end of getPushDataObjFn', data);
  };
  // let data = getPushDataObject();
  let data = {};
  getPushDataObjFn();

  useEffect(() => {
    if (data && data.hasOwnProperty('targetScreen')) {
      //   console.log(
      //     'in Home useEffect 1, storing in state data' + JSON.stringify(data)
      //   );
      setPushDataObj(data);
    } else if (data && data.hasOwnProperty('dataError')) {
      //   console.log('in Home useEffect 1 dataError' + JSON.stringify(data));
      setPushDataObj(data);
      // } else {
      //   console.log(
      //     'in Home useEffect 1 no data in state data' + JSON.stringify(data)
      //   );
    }
  }); // must not have any dependency on pushDataObj

  useEffect(() => {
    // console.log('in Home useEffect 2 pushDataObj', JSON.stringify(pushDataObj));
    if (pushDataObj?.hasOwnProperty('dataError')) {
      //   console.log(
      //     'in Home pushDataObj.hasOwnProperty(dataError)' +
      //       JSON.stringify(pushDataObj)
      //   );
      navigation.navigate('NewsTabs', { screen: 'News' });
    } else if (pushDataObj?.hasOwnProperty('targetScreen')) {
      //   console.log(
      //     'in Home pushDataObj.hasOwnProperty(targetScreen)' +
      //       JSON.stringify(pushDataObj)
      //   );
      const targetObj = getNavTargetObj(pushDataObj?.targetScreen);
      //   console.log('in Home after getNavTargetObj' + JSON.stringify(targetObj));
      if (
        targetObj?.hasOwnProperty('targetScreen') &&
        targetObj.targetScreen &&
        targetObj?.hasOwnProperty('targetSection') &&
        targetObj.targetSection
      ) {
        //   dispatch(setNotificationTarget(targetObj));
        // console.log('in Home end targetObj: ' + JSON.stringify(targetObj));
        const tempNotificationTarget = { ...targetObj };
        //     (pushDataObj && pushDataObj.targetScreen) || null;
        // console.log(
        //   'in Home useEffect, tempNotificationTarget',
        //   JSON.stringify(tempNotificationTarget)
        // );
        const constantFromTargetSection =
          tempNotificationTarget?.targetSection
            .replace?.(/\s/g, '')
            .toUpperCase?.() ?? '';
        // setPushDataObj(null);
        if (constantFromTargetSection === AppSections.HOME) {
          //   console.log('in Home useEffect, e');
          navigation.navigate('Home');
        } else {
          //   console.log(
          //     'in Home useEffect ready to navigate to' +
          //       JSON.stringify(tempNotificationTarget)
          //   );
          navigation.navigate(tempNotificationTarget.targetSection, {
            screen: tempNotificationTarget.targetScreen,
          });
        }
        // setPushDataObj(data);
        //   } else {
        //     console.log(
        //       'in Home Target object is not useable.' + JSON.stringify(targetObj)
        //     );
      }
    }
    // if (pushDataObj != null) {
    //   console.log('in Home at zz' + JSON.stringify(pushDataObj));
    // }
  }, [pushDataObj]); // stops it looping

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
            title='home'
            iconName={'home'}
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
            iconName={'menu'}
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
