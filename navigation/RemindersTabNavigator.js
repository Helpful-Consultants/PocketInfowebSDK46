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
  const storedCalibrationExpiryOverdueCount = useSelector(
    (state) => state.calibrationExpiry.overdueCount
  );
  const storedCalibrationExpiryRedCount = useSelector(
    (state) => state.calibrationExpiry.redCount
  );
  const storedCalibrationExpiryAmberCount = useSelector(
    (state) => state.calibrationExpiry.amberCount
  );
  const storedCalibrationExpiryGreenCount = useSelector(
    (state) => state.calibrationExpiry.greenCount
  );
  const storedCalibrationExpiryTotalCount = useSelector(
    (state) => state.calibrationExpiry.totalCount
  );
  const storedLtpLoansTotalCount = useSelector(
    (state) => state.ltpLoans.totalCount
  );
  const storedLtpLoansRedCount = useSelector(
    (state) => state.ltpLoans.redCount
  );
  const storedLtpLoansAmberCount = useSelector(
    (state) => state.ltpLoans.amberCount
  );
  const storedServiceMeasuresRedCount = useSelector(
    (state) => state.serviceMeasures.redCount
  );
  const storedServiceMeasuresAmberCount = useSelector(
    (state) => state.serviceMeasures.amberCount
  );
  const storedServiceMeasuresTotalCount = useSelector(
    (state) => state.serviceMeasures.totalCount
  );
  const [calibrationExpiryRedCount, setCalibrationExpiryRedCount] = useState(0);
  const [calibrationExpiryAmberCount, setCalibrationExpiryAmberCount] =
    useState(0);
  const [calibrationExpiryOverdueCount, setCalibrationExpiryOverdueCount] =
    useState(0);
  const [calibrationExpiryTotalCount, setCalibrationExpiryTotalCount] =
    useState(0);
  const [ltpLoansRedCount, setLtpLoansRedCount] = useState(0);
  const [ltpLoansAmberCount, setLtpLoansAmberCount] = useState(0);
  const [ltpLoansTotalCount, setLtpLoansTotalCount] = useState(0);
  const [serviceMeasuresRedCount, setServiceMeasuresRedCount] = useState(0);
  const [serviceMeasuresAmberCount, setServiceMeasuresAmberCount] = useState(0);
  const [serviceMeasuresGreenCount, setServiceMeasuresGreenCount] = useState(0);
  const [serviceMeasuresTotalCount, setServiceMeasuresTotalCount] = useState(0);

  const [ltpLoansAlertCount, setLtpLoansAlertCount] = useState(0);
  const [calibrationExpiryAlertCount, setCalibrationExpiryAlertCount] =
    useState(0);
  const [notifiableAlertsAmberCount, setNotifiableAlertsAmberCount] =
    useState(0);
  const [notifiableAlertsRedCount, setNotifiableAlertsRedCount] = useState(0);
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
      //   console.log(
      //     'in reminders nav useEffect calibrationExpiryCounts',
      //     calibrationExpiryRedCount,
      //     calibrationExpiryAmberCount
      //   );
      setCalibrationExpiryOverdueCount(storedCalibrationExpiryOverdueCount);
      setCalibrationExpiryRedCount(storedCalibrationExpiryRedCount);
      setCalibrationExpiryAmberCount(storedCalibrationExpiryAmberCount);
      setCalibrationExpiryTotalCount(storedCalibrationExpiryTotalCount);

      const tempNotifiableCalibrationExpiryCount =
        (typeof storedCalibrationExpiryOverdueCount !== 'undefined' ||
          storedCalibrationExpiryOverdueCount !== null) &&
        (typeof storedCalibrationExpiryRedCount !== 'undefined' ||
          storedCalibrationExpiryRedCount !== null) &&
        (typeof storedCalibrationExpiryAmberCount !== 'undefined' ||
          storedCalibrationExpiryAmberCount !== null)
          ? storedCalibrationExpiryOverdueCount +
            storedCalibrationExpiryRedCount +
            storedCalibrationExpiryAmberCount
          : 0;
      setCalibrationExpiryAlertCount(tempNotifiableCalibrationExpiryCount);
      //   console.log(
      //     'in reminders nav useEffect CalibrationExpiryCounts',
      //     CalibrationExpiryRedCount,
      //     CalibrationExpiryAmberCount,
      //     'tempNotifiableCalibrationExpiryCount',
      //     tempNotifiableCalibrationExpiryCount
      //   );
    }
  }, [
    storedCalibrationExpiryOverdueCount,
    storedCalibrationExpiryRedCount,
    storedCalibrationExpiryAmberCount,
    storedCalibrationExpiryTotalCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect serviceMeasuresCounts',
      //     serviceMeasuresRedCount,
      //     serviceMeasuresAmberCount
      //   );
      setServiceMeasuresRedCount(storedServiceMeasuresRedCount);
      setServiceMeasuresAmberCount(storedServiceMeasuresAmberCount);
      setServiceMeasuresTotalCount(storedServiceMeasuresTotalCount);

      const tempNotifiableServiceMeasuresCount =
        (typeof storedServiceMeasuresRedCount !== 'undefined' ||
          storedServiceMeasuresRedCount !== null) &&
        (typeof storedServiceMeasuresAmberCount !== 'undefined' ||
          storedServiceMeasuresAmberCount !== null)
          ? storedServiceMeasuresRedCount + storedServiceMeasuresAmberCount
          : 0;
      setServiceMeasuresAlertCount(tempNotifiableServiceMeasuresCount);
      //   console.log(
      //     'in reminders nav useEffect serviceMeasuresCounts',
      //     serviceMeasuresRedCount,
      //     serviceMeasuresAmberCount,
      //     'tempNotifiableServiceMeasuresCount',
      //     tempNotifiableServiceMeasuresCount
      //   );
    }
  }, [
    storedServiceMeasuresRedCount,
    storedServiceMeasuresAmberCount,
    storedServiceMeasuresTotalCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect ltpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );
      setLtpLoansRedCount(storedLtpLoansRedCount);
      setLtpLoansAmberCount(storedLtpLoansAmberCount);
      setLtpLoansTotalCount(storedLtpLoansTotalCount);

      const tempNotifiableLtpLoansCount =
        (typeof storedLtpLoansRedCount !== 'undefined' ||
          storedLtpLoansRedCount !== null) &&
        (typeof storedLtpLoansAmberCount !== 'undefined' ||
          storedLtpLoansAmberCount !== null)
          ? storedLtpLoansRedCount + storedLtpLoansAmberCount
          : 0;
      setLtpLoansAlertCount(tempNotifiableLtpLoansCount);

      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     LtpLoansRedCount,
      //     LtpLoansAmberCount,
      //     'tempNotifiableLtpLoansCount',
      //     tempNotifiableLtpLoansCount
      //   );
    }
  }, [
    storedLtpLoansRedCount,
    storedLtpLoansAmberCount,
    storedLtpLoansTotalCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );
      let tempNotifiableAlertsRedCount = 0;

      if (
        typeof calibrationExpiryOverdueCount !== 'undefined' ||
        calibrationExpiryOverdueCount !== null
      ) {
        tempNotifiableAlertsRedCount =
          tempNotifiableAlertsRedCount + calibrationExpiryOverdueCount;
      }
      if (
        typeof calibrationExpiryRedCount !== 'undefined' ||
        calibrationExpiryRedCount !== null
      ) {
        tempNotifiableAlertsRedCount =
          tempNotifiableAlertsRedCount + calibrationExpiryRedCount;
      }
      if (
        typeof serviceMeasuresRedCount !== 'undefined' ||
        serviceMeasuresRedCount !== null
      ) {
        tempNotifiableAlertsRedCount =
          tempNotifiableAlertsRedCount + serviceMeasuresRedCount;
      }
      if (
        typeof ltpLoansRedCount !== 'undefined' ||
        ltpLoansRedCount !== null
      ) {
        tempNotifiableAlertsRedCount =
          tempNotifiableAlertsRedCount + ltpLoansRedCount;
      }

      //   console.log(
      //     'in reminders nav useEffect - Red alerts ',
      //     'calibrationExpiryRedCount',
      //     calibrationExpiryRedCount,
      //     'ltpLoansRedCount',
      //     ltpLoansRedCount,
      //     'serviceMeasuresRedCount',
      //     serviceMeasuresRedCount,
      //     'tempNotifiableAlertsRedCount',
      //     tempNotifiableAlertsRedCount
      //   );

      setNotifiableAlertsRedCount(tempNotifiableAlertsRedCount);
    }
  }, [
    calibrationExpiryOverdueCount,
    calibrationExpiryRedCount,
    ltpLoansRedCount,
    serviceMeasuresRedCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );
      let tempNotifiableAlertsAmberCount = 0;

      if (
        typeof calibrationExpiryAmberCount !== 'undefined' ||
        calibrationExpiryAmberCount !== null
      ) {
        tempNotifiableAlertsAmberCount =
          tempNotifiableAlertsAmberCount + calibrationExpiryAmberCount;
      }
      if (
        typeof serviceMeasuresAmberCount !== 'undefined' ||
        serviceMeasuresAmberCount !== null
      ) {
        tempNotifiableAlertsAmberCount =
          tempNotifiableAlertsAmberCount + serviceMeasuresAmberCount;
      }
      if (
        typeof ltpLoansAmberCount !== 'undefined' ||
        ltpLoansAmberCount !== null
      ) {
        tempNotifiableAlertsAmberCount =
          tempNotifiableAlertsAmberCount + ltpLoansAmberCount;
      }

      //   console.log(
      //     'in reminders nav useEffect - Amber Alerts ',
      //     'calibrationExpiryAmberCount',
      //     calibrationExpiryAmberCount,
      //     'ltpLoansAmberCount',
      //     ltpLoansAmberCount,
      //     'serviceMeasuresAmberCount',
      //     serviceMeasuresAmberCount,
      //     'tempNotifiableAlertsAmberCount',
      //     tempNotifiableAlertsAmberCount
      //   );

      setNotifiableAlertsAmberCount(tempNotifiableAlertsAmberCount);
    }
  }, [calibrationExpiryRedCount, ltpLoansRedCount, serviceMeasuresRedCount]);

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
          tabBarBadge: notifiableAlertsRedCount
            ? notifiableAlertsRedCount
            : notifiableAlertsAmberCount
            ? notifiableAlertsAmberCount
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
          tabBarBadge: serviceMeasuresAlertCount
            ? serviceMeasuresAlertCount
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
          tabBarBadge: ltpLoansAlertCount ? ltpLoansAlertCount : null,
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
