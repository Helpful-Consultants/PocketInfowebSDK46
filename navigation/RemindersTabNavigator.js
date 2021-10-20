import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import NotificationsScreen from '../screens/NotificationsScreen';
import ServiceMeasuresScreen from '../screens/ServiceMeasuresScreen';
import LtpLoansScreen from '../screens/LtpLoansScreen';
import OdisScreen from '../screens/OdisScreen';
import { checkUnseenItems } from '../helpers/alertStatus';
import { InfoTypes } from '../constants/InfoTypes';
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

const RemindersTabs =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

// const showBadgeLtpLoans = checkUnseenItems(InfoTypes.LTP_LOANS);
// const showBadgeNotifications = checkUnseenItems(InfoTypes.NOTIFICATIONS);
// const showBadgeOdis = checkUnseenItems(InfoTypes.ODIS);
// const showBadgeServiceMeasures = checkUnseenItems(InfoTypes.SERVICE_MEASURES);

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
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const odisViewCount = useSelector((state) => state.odis.viewCount);
  const serviceMeasuresRedCount =
    useSelector(
      (state) => state.serviceMeasures.serviceMeasuresCounts.redCount
    ) || 0;
  const serviceMeasuresAmberCount =
    useSelector(
      (state) => state.serviceMeasures.serviceMeasuresCounts.amberCount
    ) || 0;
  const ltpLoansRedCount =
    useSelector((state) => state.ltpLoans.ltpLoansCounts.redCount) || 0;
  const ltpLoansAmberCount =
    useSelector((state) => state.ltpLoans.ltpLoansCounts.amberCount) || 0;
  const calibrationExpiryRedCount =
    useSelector(
      (state) => state.calibrationExpiry.calibrationExpiryCounts.redCount
    ) || 0;
  const calibrationExpiryAmberCount =
    useSelector(
      (state) => state.calibrationExpiry.calibrationExpiryCounts.amberCount
    ) || 0;

  const [ltpLoansAlertCount, setLtpLoansAlertCount] = useState(0);
  const [notificationsAlertCount, setNotificationsAlertCount] = useState(0);
  const [odisAlertCount, setOdisAlertCount] = useState(0);
  const [serviceMeasuresAlertCount, setServiceMeasuresAlertCount] = useState(0);
  //   const [calibrationAmberExpiryCount, setCalibrationAmberExpiryCount] =
  //     useState(0);
  //   const [calibrationRedExpiryCount, setCalibrationRedExpiryCount] = useState(0);

  useEffect(() => {
    if (showingDemoApp) {
      //   setLtpLoansAlertCount(checkUnseenItems(InfoTypes.LTP_LOANS));
      //   setNotificationsAlertCount(notifiableCalibrationAlertsCount);
      setOdisAlertCount(checkUnseenItems(InfoTypes.ODIS));
    }
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

  useEffect(() => {
    if (showingDemoApp) {
      const tempNotifiableCalibrationExpiryAlertCount =
        (calibrationExpiryAmberCount || calibrationExpiryAmberCount === 0) &&
        (calibrationExpiryRedCount || calibrationExpiryRedCount === 0)
          ? calibrationExpiryRedCount + calibrationExpiryAmberCount
          : 0;

      console.log(
        'in nav useEffect calibrationExpiryCounts',
        'calibrationExpiryRedCount:',
        calibrationExpiryRedCount,
        'calibrationExpiryAmberCount:',
        calibrationExpiryAmberCount,
        'tempNotifiableCalibrationExpiryAlertCount:',
        tempNotifiableCalibrationExpiryAlertCount
      );

      setNotificationsAlertCount(tempNotifiableCalibrationExpiryAlertCount);
    }
  }, [calibrationExpiryRedCount, calibrationExpiryAmberCount]);

  useEffect(() => {
    if (showingDemoApp) {
      const tempNotifiableServiceMeasuresAlertCount =
        (serviceMeasuresRedCount || serviceMeasuresRedCount === 0) &&
        (serviceMeasuresAmberCount || serviceMeasuresAmberCount === 0)
          ? serviceMeasuresRedCount + serviceMeasuresAmberCount
          : 0;
      console.log(
        'in nav useEffect serviceMeasuresCounts',
        'serviceMeasuresRedCount:',
        serviceMeasuresRedCount,
        'serviceMeasuresAmberCount:',
        serviceMeasuresAmberCount,
        'tempNotifiableServiceMeasuresAlertCount:',
        tempNotifiableServiceMeasuresAlertCount
      );

      //   console.log(
      //     'in nav useEffect',
      //     'ServiceMeasureCount',
      //     notifiableServiceMeasureCount,
      //     serviceMeasuresAmberCount,
      //     serviceMeasuresAmberCount
      //   );

      setServiceMeasuresAlertCount(tempNotifiableServiceMeasuresAlertCount);
    }
    //   }, []);
  }, [serviceMeasuresRedCount, serviceMeasuresAmberCount]);

  useEffect(() => {
    if (showingDemoApp) {
      const tempNotifiableLtpLoansAlertCount =
        (ltpLoansRedCount || ltpLoansRedCount === 0) &&
        (ltpLoansAmberCount || ltpLoansAmberCount === 0)
          ? ltpLoansAmberCount + ltpLoansRedCount
          : 0;
      console.log(
        'in nav useEffect ltpLoansCounts',
        'ltpLoansRedCount:',
        ltpLoansRedCount,
        'ltpLoansAmberCount:',
        ltpLoansAmberCount,
        'tempNotifiableLtpLoansAlertCount:',
        tempNotifiableLtpLoansAlertCount
      );

      setLtpLoansAlertCount(tempNotifiableLtpLoansAlertCount);
    }
  }, [ltpLoansRedCount, ltpLoansAmberCount]);

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
  //     'odisAlertCount:',
  //     odisAlertCount
  //   );

  return (
    <RemindersTabs.Navigator //iOS
      initialRouteName='Notifications' // ios and android
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
        name='Notifications'
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name='alert-circle' size={size} />
          ),
          tabBarBadge: notificationsAlertCount ? notificationsAlertCount : null,
          tabBarBadgeStyle: {
            backgroundColor:
              calibrationExpiryRedCount && calibrationExpiryRedCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : calibrationExpiryAmberCount && calibrationExpiryAmberCount > 0
                ? Colors.vwgWarmOrange
                : Colors.vwgMintGreen,
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
          tabBarBadge: serviceMeasuresAlertCount
            ? serviceMeasuresAlertCount
            : null,
          tabBarBadgeStyle: {
            backgroundColor:
              serviceMeasuresRedCount && serviceMeasuresRedCount > 0
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
          tabBarBadge: ltpLoansAlertCount ? ltpLoansAlertCount : null,
          tabBarBadgeStyle: {
            backgroundColor:
              ltpLoansRedCount && ltpLoansRedCount > 0
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
              // alert={odisAlertCount ? false : true}
              alert={false}
            />
          ),
          tabBarBadge: odisAlertCount ? '' : null,
          tabBarBadgeStyle: {
            backgroundColor: Colors.vwgBadgeAlertColor,
          },
        }}
      />
    </RemindersTabs.Navigator>
  );
};
// End Tab navigator
