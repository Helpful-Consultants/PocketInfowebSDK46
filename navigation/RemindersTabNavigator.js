import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { getPushDataObject } from 'native-notify';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import NotificationsScreen from '../screens/NotificationsScreen';
import ServiceMeasuresScreen from '../screens/ServiceMeasuresScreen';
import LtpLoansScreen from '../screens/LtpLoansScreen';
import OdisScreen from '../screens/OdisScreen';
import Colors from '../constants/Colors';
import { AppSections } from '../constants/AppParts';
// import { setNotificationTarget } from '../actions/user';
// import { resetNotificationTarget } from '../actions/user';
import getNavTargetObj from '../helpers/getNavTargetObj';

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

const RemindersTabs = createBottomTabNavigator();

// console.log(
//   'in navigator, showBadgeLtpLoans ',
//   showBadgeLtpLoans && showBadgeLtpLoans,

//   ', showBadgeNotifications',
//   showBadgeNotifications && showBadgeNotifications,
//   'showBadgeOdis ',
//   showBadgeOdis && showBadgeOdis,
//   'showBadgeServiceMeasures ',
//   showBadgeServiceMeasures && showBadgeServiceMeasures
// );

export default RemindersTabNavigator = ({ navigation, route }) => {
  //   const dispatch = useDispatch();
  //   const thisSection = AppSections.REMINDERSTABS;
  //   const notificationTarget = useSelector(
  //     (state) => state.user.notificationTarget
  //   );
  //   console.log(
  //     'notificationTarget state.user.notificationTarget',
  //     notificationTarget
  //   );
  const showingDemoData = useSelector(
    (state) => state.user.userRequestedDemoData
  );
  const calibrationExpiryOverdueCount = useSelector(
    (state) => state.calibrationExpiry.overdueCount
  );
  const calibrationExpiryRedCount = useSelector(
    (state) => state.calibrationExpiry.redCount
  );
  const calibrationExpiryAmberCount = useSelector(
    (state) => state.calibrationExpiry.amberCount
  );
  const ltpLoansRedCount = useSelector((state) => state.ltpLoans.redCount);
  const ltpLoansAmberCount = useSelector((state) => state.ltpLoans.amberCount);
  const odisChangesToHighlight = useSelector(
    (state) => state.odis.changesToHighlight
  );
  const odisRedCount = useSelector((state) => state.odis.redCount);
  const serviceMeasuresRedCount = useSelector(
    (state) => state.serviceMeasures.redCount
  );
  const serviceMeasuresAmberCount = useSelector(
    (state) => state.serviceMeasures.amberCount
  );
  const [notifiableAlertsAmberCount, setNotifiableAlertsAmberCount] =
    useState(0);
  const [notifiableAlertsRedCount, setNotifiableAlertsRedCount] = useState(0);
  const [pushDataObj, setPushDataObj] = useState(null);
  const [pushDataReturned, setPushDataReturned] = useState(false);

  //   const [pushDataTargetScreen, setPushDataTargetScreen] = useState(null);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const getPushDataObjFn = async () => {
    // console.log('in RemNav in getPushDataObjFn');
    // let data = {};
    try {
      data = await getPushDataObject();
      //   console.log('in RemNav getPushDataObjFn finished', data);
      //   if (typeof data == 'object' && Object.hasOwn(data, 'targetScreen')) {
      //     setPushDataTargetScreen(pushDataObj.targetScreen);
      //   }
    } catch (err) {
      //   console.log('in RemNav getPushDataObjFn err', err);
    }
    // console.log('in RemNav end of getPushDataObjFn', data);
  };
  // let data = getPushDataObject();
  let data = {};
  getPushDataObjFn();

  useEffect(() => {
    if (data && data.hasOwnProperty('targetScreen')) {
      //   console.log('in RemNav useEffect 1, storing in state', 'data', data);
      setPushDataObj(data);
    } else if (data && data.hasOwnProperty('dataError')) {
      //   console.log('in RemNav useEffect 1 dataError', 'data', data);
      setPushDataObj(data);
    } else {
      //   console.log('in RemNav useEffect 1 no data in state', 'data', data);
    }
  }); // must not have any dependency on pushDataObj

  useEffect(() => {
    // console.log('in RemNav useEffect 2 pushDataObj', pushDataObj);
    if (pushDataObj && pushDataObj.hasOwnProperty('dataError')) {
      //   console.log(
      //     'in WipNav pushDataObj.hasOwnProperty(dataError)',
      //     pushDataObj
      //   );
      navigation.navigate('NewsTabs', { screen: 'News' });
    } else if (pushDataObj && pushDataObj.hasOwnProperty('targetScreen')) {
      //   console.log(
      //     'in RemNav pushDataObj.hasOwnProperty(targetScreen)',
      //     pushDataObj
      //   );
      const targetObj = getNavTargetObj(pushDataObj.targetScreen);
      //   console.log('in RemNav after getNavTargetObj', targetObj);
      if (
        targetObj &&
        targetObj.hasOwnProperty('targetScreen') &&
        targetObj.hasOwnProperty('targetSection')
      ) {
        //   dispatch(setNotificationTarget(targetObj));
        // console.log(
        //   'in RemNav end of getPushDataObjFn targetObj: ',
        //   targetObj
        // );
        const tempNotificationTarget = { ...targetObj };
        //     (pushDataObj && pushDataObj.targetScreen) || null;
        // console.log(
        //   'in RemNav useEffect, tempNotificationTarget',
        //   tempNotificationTarget
        // );
        const constantFromTargetSection = tempNotificationTarget.targetSection
          ? tempNotificationTarget.targetSection
              .replace(/\s/g, '')
              .toUpperCase()
          : '';
        // setPushDataObj(null);
        if (constantFromTargetSection === AppSections.HOME) {
          //   console.log('in RemNav useEffect, e');
          navigation.navigate('Home');
        } else {
          navigation.navigate(tempNotificationTarget.targetSection, {
            screen: tempNotificationTarget.targetScreen,
          });
        }
        // setPushDataObj(data);
      } else {
        // console.log('in RemNav Target object is not useable.', targetObj);
      }
    }
    if (pushDataObj != null) {
      //   console.log('in RemNav at zz', pushDataObj);
    }
  }, [pushDataObj]); // stops it looping

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#3689b1',
      },
      headerTitle: () => (
        <TitleWithAppLogo title={getFocusedRouteNameFromRoute(route)} />
      ),
      headerLeftContainerStyle: { ...baseStyles.paddingLeft },
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

  useEffect(() => {
    //   console.log(
    //     'in reminders nav useEffect LtpLoansCounts',
    //     ltpLoansRedCount,
    //     ltpLoansAmberCount
    //   );
    let tempNotifiableAlertsRedCount = 0;
    //   console.log(
    //     'in reminders nav useEffect tempNotifiableAlertsRedCount',
    //     tempNotifiableAlertsRedCount
    //   );

    if (
      typeof calibrationExpiryOverdueCount === 'number' &&
      calibrationExpiryOverdueCount > 0
    ) {
      // console.log(
      //   'adding calibrationExpiryOverdueCount',
      //   calibrationExpiryOverdueCount
      // );
      tempNotifiableAlertsRedCount =
        tempNotifiableAlertsRedCount + calibrationExpiryOverdueCount;
    }
    if (
      typeof calibrationExpiryRedCount === 'number' &&
      calibrationExpiryRedCount > 0
    ) {
      // console.log(
      //   'adding calibrationExpiryRedCount',
      //   calibrationExpiryRedCount
      // );
      tempNotifiableAlertsRedCount =
        tempNotifiableAlertsRedCount + calibrationExpiryRedCount;
    }
    if (
      typeof serviceMeasuresRedCount === 'number' &&
      serviceMeasuresRedCount > 0
    ) {
      // console.log(
      //   'adding tempNotifiableAlertsRedCount',
      //   serviceMeasuresRedCount
      // );
      tempNotifiableAlertsRedCount =
        tempNotifiableAlertsRedCount + serviceMeasuresRedCount;
    }
    if (typeof ltpLoansRedCount === 'number' && ltpLoansRedCount > 0) {
      // console.log('adding ltpLoansRedCount', ltpLoansRedCount);
      tempNotifiableAlertsRedCount =
        tempNotifiableAlertsRedCount + ltpLoansRedCount;
    }
    if (typeof odisRedCount === 'number' && odisRedCount > 0) {
      // console.log('adding odisRedCount', odisRedCount);
      tempNotifiableAlertsRedCount = tempNotifiableAlertsRedCount + 1;
    }

    //   console.log(
    //     'in reminders nav useEffect - Red alerts ',
    //     'tempNotifiableAlertsRedCount',
    //     tempNotifiableAlertsRedCount,
    //     'calibrationExpiryRedCount',
    //     calibrationExpiryRedCount,
    //     'serviceMeasuresRedCount',
    //     serviceMeasuresRedCount,
    //     'calibrationExpiryOverdueCount',
    //     calibrationExpiryOverdueCount,
    //     'ltpLoansRedCount',
    //     ltpLoansRedCount,
    //     'odisRedCount',
    //     odisRedCount
    //   );

    setNotifiableAlertsRedCount(tempNotifiableAlertsRedCount);
  }, [
    calibrationExpiryOverdueCount,
    calibrationExpiryRedCount,
    ltpLoansRedCount,
    serviceMeasuresRedCount,
    odisRedCount,

    showingDemoData,
  ]);

  useEffect(() => {
    let tempNotifiableAlertsAmberCount = 0;

    if (
      typeof calibrationExpiryAmberCount === 'number' &&
      calibrationExpiryAmberCount > 0
    ) {
      tempNotifiableAlertsAmberCount =
        tempNotifiableAlertsAmberCount + calibrationExpiryAmberCount;
    }
    if (
      typeof serviceMeasuresAmberCount === 'number' &&
      serviceMeasuresAmberCount > 0
    ) {
      tempNotifiableAlertsAmberCount =
        tempNotifiableAlertsAmberCount + serviceMeasuresAmberCount;
    }
    if (typeof ltpLoansAmberCount === 'number' && ltpLoansAmberCount > 0) {
      tempNotifiableAlertsAmberCount =
        tempNotifiableAlertsAmberCount + ltpLoansAmberCount;
    }
    if (
      typeof odisChangesToHighlight === 'number' &&
      odisChangesToHighlight > 0
    ) {
      tempNotifiableAlertsAmberCount = tempNotifiableAlertsAmberCount + 1;
    }

    //   console.log(
    //     'in reminders nav useEffect - Amber Alerts ',
    //     'calibrationExpiryAmberCount',
    //     calibrationExpiryAmberCount,
    //     'ltpLoansAmberCount',
    //     ltpLoansAmberCount,
    //     'serviceMeasuresAmberCount',
    //     serviceMeasuresAmberCount,
    //   odisChangesToHighlight',
    //   odisChangesToHighlight,
    //     'tempNotifiableAlertsAmberCount',
    //     tempNotifiableAlertsAmberCount',

    //   );

    setNotifiableAlertsAmberCount(tempNotifiableAlertsAmberCount);
  }, [
    calibrationExpiryAmberCount,
    ltpLoansAmberCount,
    serviceMeasuresAmberCount,
    odisChangesToHighlight,
    showingDemoData,
  ]);

  //   console.log(
  //     '$$$$$$$$$$$$$$ in reminders  navigator,',
  //     'notificationsAlertCount:',
  //     notificationsAlertCount,
  //     'serviceMeasuresAlertCount:',
  //     serviceMeasuresAlertCount,
  //     serviceMeasuresAmberCount,
  //     serviceMeasuresAmberCount,
  //     'ltpLoansAlertCount: ',
  //     ltpLoansAlertCount,
  //     ltpLoansRedCount,
  //     ltpLoansAmberCount,
  //   );

  //   useEffect(() => {
  //     if (
  //       notificationTarget &&
  //       notificationTarget.hasOwnProperty('targetScreen')
  //     ) {
  //       const tempNotificationTarget = { ...notificationTarget };
  //       //     (pushDataObj && pushDataObj.targetScreen) || null;
  //       console.log(
  //         'in WipNav useEffect, pushDataObj.targetScreen',
  //         notificationTarget,
  //         tempNotificationTarget
  //       );
  //       dispatch(resetNotificationTarget());
  //       // props.navigation.navigate(pushDataTargetScreen);
  //       //   navigation.navigate('RemindersTabs', { screen: 'Alerts' });
  //       const constantFromTargetSection = tempNotificationTarget.targetSection
  //         ? tempNotificationTarget.targetSection.replace(/\s/g, '').toUpperCase()
  //         : '';
  //       if (constantFromTargetSection === AppSections.HOME) {
  //         navigation.navigate('Home');
  //       } else {
  //         navigation.navigate(tempNotificationTarget.targetSection, {
  //           screen: tempNotificationTarget.targetScreen,
  //         });
  //       }
  //     }
  //   }, [notificationTarget]);

  return (
    <RemindersTabs.Navigator //iOS
      initialRouteName='Alerts' // ios and android
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
      <RemindersTabs.Screen
        name='Alerts'
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='alert-circle' size={size} />
          ),
          tabBarBadge:
            (notifiableAlertsRedCount && notifiableAlertsRedCount > 0) ||
            (notifiableAlertsAmberCount && notifiableAlertsAmberCount > 0)
              ? ''
              : null,
          tabBarBadgeStyle: {
            color:
              notifiableAlertsRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
            backgroundColor:
              notifiableAlertsRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
          },
        }}
      />
      <RemindersTabs.Screen
        name='Service Measures'
        component={ServiceMeasuresScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='checkbox' size={size} />
          ),
          tabBarBadge:
            (serviceMeasuresRedCount && serviceMeasuresRedCount > 0) ||
            (serviceMeasuresAmberCount && serviceMeasuresAmberCount > 0)
              ? ''
              : null,
          tabBarBadgeStyle: {
            color:
              serviceMeasuresRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
            backgroundColor:
              serviceMeasuresRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
          },
        }}
      />
      <RemindersTabs.Screen
        name='LTP Loans'
        component={LtpLoansScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='calendar' size={size} />
          ),
          tabBarBadge:
            (ltpLoansRedCount && ltpLoansRedCount > 0) ||
            (ltpLoansAmberCount && ltpLoansAmberCount > 0)
              ? ''
              : null,
          tabBarBadgeStyle: {
            color:
              ltpLoansRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
            backgroundColor:
              ltpLoansRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : Colors.vwgWarmOrange,
          },
        }}
      />
      <RemindersTabs.Screen
        name='ODIS'
        component={OdisScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon
              focused={focused}
              name='tv'
              size={size}
              // alert={odisChangesToHighlight? false : true}
              alert={false}
            />
          ),
          tabBarBadge: odisChangesToHighlight ? '' : null,
          tabBarBadgeStyle: {
            color:
              odisRedCount && odisRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : odisChangesToHighlight && odisChangesToHighlight > 0
                ? Colors.vwgBadgeAlertColor
                : Colors.vwgBadgeColor,
            backgroundColor:
              odisRedCount && odisRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : odisChangesToHighlight && odisChangesToHighlight > 0
                ? Colors.vwgBadgeAlertColor
                : Colors.vwgBadgeColor,
          },
        }}
      />
    </RemindersTabs.Navigator>
  );
};
// End Tab navigator
