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
  const calibrationExpiryCountsObj = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryCounts
  );
  const serviceMeasuresCountsObj = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresCounts
  );
  const ltpLoansCountsObj = useSelector(
    (state) => state.ltpLoans.ltpLoansCounts
  );
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
      const notifiableCalibrationAlertsCount =
        (calibrationExpiryCountsObj &&
          calibrationExpiryCountsObj.redCount &&
          calibrationExpiryCountsObj.amberCount &&
          calibrationExpiryCountsObj.redCount +
            calibrationExpiryCountsObj.amberCount) ||
        0;

      //   console.log(
      //     'in nav useeffect calibrationExpiryCounts',
      //     calibrationExpiryCounts,
      //     'calibrationAlertsCount',
      //     notifiableCalibrationAlertsCount,
      //     calibrationExpiryCountsObj.redCount,
      //     calibrationExpiryCountsObj.amberCount
      //   );

      setNotificationsAlertCount(notifiableCalibrationAlertsCount);
    }
  }, [
    calibrationExpiryCountsObj.redCount,
    calibrationExpiryCountsObj.amberCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      console.log(
        'in nav useEffect serviceMeasuresCountsObj',
        serviceMeasuresCountsObj && serviceMeasuresCountsObj
      );
      const tempNotifiableServiceMeasureCount =
        serviceMeasuresCountsObj &&
        (serviceMeasuresCountsObj.redCount ||
          serviceMeasuresCountsObj.redCount === 0) &&
        (serviceMeasuresCountsObj.amberCount ||
          serviceMeasuresCountsObj.amberCount === 0)
          ? serviceMeasuresCountsObj.amberCount +
            serviceMeasuresCountsObj.redCount
          : 0;

      //   console.log(
      //     'in nav useeffect serviceMeasuresCountsObj',
      //     serviceMeasuresCountsObj,
      //     'ServiceMeasureCount',
      //     notifiableServiceMeasureCount,
      //     serviceMeasuresCountsObj.redCount,
      //     serviceMeasuresCountsObj.amberCount
      //   );

      setServiceMeasuresAlertCount(tempNotifiableServiceMeasureCount);
    }
    //   }, []);
  }, [serviceMeasuresCountsObj.amberCount, serviceMeasuresCountsObj.redCount]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in nav useeffect ltpLoansCountsObj',
      //     ' ltpLoansCountsObj.redCount',
      //     ltpLoansCountsObj.redCount,
      //     'ltpLoansCountsObj.amberCount',
      //     ltpLoansCountsObj.amberCount
      //   );
      const tempNotifiableLtpLoansCount =
        ltpLoansCountsObj &&
        (ltpLoansCountsObj.redCount || ltpLoansCountsObj.redCount === 0) &&
        (ltpLoansCountsObj.amberCount || ltpLoansCountsObj.amberCount === 0)
          ? ltpLoansCountsObj.amberCount + ltpLoansCountsObj.redCount
          : 0;

      //   const tempNotifiableLtpLoansCount = 5;

      //   console.log(
      //     'in nav useeffect ltpLoansCountsObj',
      //     ltpLoansCountsObj,
      //     'LtpLoansCount',
      //     tempNotifiableLtpLoansCount,
      //     ltpLoansCountsObj.redCount,
      //     ltpLoansCountsObj.amberCount
      //   );

      setLtpLoansAlertCount(tempNotifiableLtpLoansCount);
    }
  }, [ltpLoansCountsObj.amberCount, ltpLoansCountsObj.redCount]);

  //   console.log(
  //     '$$$$$$$$$$$$$$ in reminders  navigator,',
  //     'notificationsAlertCount:',
  //     notificationsAlertCount,
  //     'serviceMeasuresAlertCount:',
  //     serviceMeasuresAlertCount,
  //     serviceMeasuresCountsObj,
  //     serviceMeasuresCountsObj.redCount,
  //     serviceMeasuresCountsObj.amberCount,
  //     'ltpLoansAlertCount: ',
  //     ltpLoansAlertCount,
  //     ltpLoansCountsObj,
  //     ltpLoansCountsObj.redCount,
  //     ltpLoansCountsObj.amberCount,
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
              calibrationExpiryCountsObj &&
              calibrationExpiryCountsObj.redCount &&
              calibrationExpiryCountsObj.redCount > 0
                ? Colors.vwgBadgeSevereAlertColor
                : calibrationExpiryCountsObj.amberCount &&
                  calibrationExpiryCountsObj.amberCount > 0
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
              serviceMeasuresCountsObj &&
              serviceMeasuresCountsObj.redCount &&
              serviceMeasuresCountsObj.redCount > 0
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
              ltpLoansCountsObj &&
              ltpLoansCountsObj.redCount &&
              ltpLoansCountsObj.redCount > 0
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
