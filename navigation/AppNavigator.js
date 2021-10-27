import React, { useEffect, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
// import Touchable from 'react-native-platform-touchable';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
//import { Ionicons } from '@expo/vector-icons';
// import { setUserOutdatedCredentials } from '../actions/user';
// import { setUserValidated } from '../actions/user';
import { revalidateUserCredentials } from '../actions/user';
//import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import {
//   getBrand,
//   getVersion,
//   getManufacturer
// } from 'react-native-device-info';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import HomeScreen from '../screens/HomeScreen';
import AppInfo from '../components/AppInfo';
import DemoAppSwitch from '../components/DemoAppSwitch';
import DemoDataSwitch from '../components/DemoDataSwitch';
import BackgroundFetchBlock from '../components/BackgroundFetchBlock';
// import Tasks from '../constants/Tasks';
import Colors from '../constants/Colors';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';
import RemindersTabNavigator from './RemindersTabNavigator';
import SignedOutStack from './SignedOutStack';
// import { checkNotifiableItems } from '../helpers/alertStatus';
import { setBadgeCountAsync } from '../helpers/appBadge';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const CustomDrawerContent = (props) => {
  //   const { showDataSwitch, showingDemoApp } = props;
  //   console.log('CustomDrawerContent props.showingDemoApp', showingDemoApp);
  //   console.log('CustomDrawerContent props.showDataSwitch', showDataSwitch);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        alignContents: 'space-between',
        paddingBottom: 20,
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 5,
          fontFamily: 'the-sans-bold',
        }}
      >
        QUICK LINKS
      </Text>
      <DrawerItemList {...props} style={{ marginBottom: 20 }} />
      <DemoAppSwitch />
      <DemoDataSwitch />
      <BackgroundFetchBlock />
      <AppInfo />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const { showDemoApp } = props;
  let showDataSwitch = true;

  useEffect(() => {
    // console.log('Dwr Navigator useEffect', showDemoApp);
    showDataSwitch = showDemoApp;
  }, [showDemoApp]);

  //   console.log('Dwr Navigator props', props);
  //   console.log('Dwr Navigator showDemoApp', showDemoApp);
  //   console.log('showingDemoApp', props.showingDemoApp && props.showingDemoApp);

  return (
    <Drawer.Navigator
      headerShown={false}
      drawerStyle={{
        width: baseStyles.panelWidth.width,
      }}
      drawerContent={(props, showDemoApp) => (
        <CustomDrawerContent {...props} showDataSwitch={showDataSwitch} />
      )}
      screenOptions={{
        activeBackgroundColor: Colors.vwgActiveLink,
        inactiveBackgroundColor: Colors.vwgInactiveLink,
        labelStyle: baseStyles.panelTextNav,
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='WipTabs'
        component={WipTabNavigator}
        options={{
          drawerLabel: 'Find Tools, Jobs & LTP List',
        }}
      />
      <Drawer.Screen
        name='NewsTabs'
        component={NewsTabNavigator}
        options={{
          drawerLabel: 'News, Catalogue & Stats',
        }}
      />
      {showDemoApp ? (
        <Drawer.Screen
          name='RemindersTabs'
          component={RemindersTabNavigator}
          options={{
            drawerLabel: 'Alerts, S Measures, Loans & ODIS',
          }}
        />
      ) : null}
    </Drawer.Navigator>
  );
};

export default AppNavigator = (props) => {
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const calibrationExpiryOverdueCount = useSelector(
    (state) => state.calibrationExpiry.overdueCount
  );
  const calibrationExpiryRedCount = useSelector(
    (state) => state.calibrationExpiry.redCount
  );
  const serviceMeasuresRedCount = useSelector(
    (state) => state.serviceMeasures.redCount
  );
  const ltpLoansRedCount = useSelector((state) => state.ltpLoans.redCount);
  const newsRedCount = useSelector((state) => state.news.redCount);
  //   console.log('AppNavigator, userIsValidated', userIsValidated);
  //   console.log('AppNavigator, userIsSignedIn', userIsSignedIn);
  //   console.log('AppNavigator,userCredsLastChecked', userCredsLastChecked);
  const dispatch = useDispatch();
  const [showDemoApp, setShowDemoApp] = useState(false);
  //   const ageOfCredentialsLimit = 3;
  //   return <AuthLoadingScreen />;

  //   console.log('AppNavigator props', props && props);
  //   console.log('AppNavigator showingDemoApp', showingDemoApp && showingDemoApp);

  //   let now = moment();

  //   const fetchDate = async () => {
  //     const now = new Date().toISOString();

  //     //   const nowStr = (now && now.toISOString()) || 'no date';
  //     const result = true;
  //     console.log('Got background fetch call to fetch date', now);
  //     // Be sure to return the successful result type!
  //     return result
  //       ? BackgroundFetch.BackgroundFetchResult.NewData
  //       : BackgroundFetch.BackgroundFetchResult.NoData;
  //   };

  //   const fetchDateTwo = async () => {
  //     const now = new Date().toISOString();

  //     //   const nowStr = (now && now.toISOString()) || 'no date';
  //     const result = true;
  //     console.log('Got background fetch call to fetch date two', now);
  //     // Be sure to return the successful result type!
  //     return result
  //       ? BackgroundFetch.BackgroundFetchResult.NewData
  //       : BackgroundFetch.BackgroundFetchResult.NoData;
  //   };

  async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
    console.log('in initBackgroundFetch', taskName, taskFn, interval);
    TaskManager.defineTask(taskName, taskFn);

    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
      case BackgroundFetch.BackgroundFetchStatus.Restricted:
      case BackgroundFetch.BackgroundFetchStatus.Denied:
        console.log('Background execution is disabled');
        return;

      default: {
        // console.log('Background execution allowed');

        let tasks = await TaskManager.getRegisteredTasksAsync();
        tasks = await TaskManager.getRegisteredTasksAsync();
        // console.log('Registered tasks', tasks);
        if (tasks.find((f) => f.taskName === taskName) == null) {
          //   console.log('Registering task');
          await BackgroundFetch.registerTaskAsync(taskName, {
            minimumInterval: 60 * 1, // 1 minutes
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only);
          });
        } else {
          //   console.log(`Task ${taskName} already registered, skipping`);
        }

        // console.log('Setting interval to', interval);
        await BackgroundFetch.setMinimumIntervalAsync(interval);
      }
    }
  }

  useEffect(() => {
    //   if (userIsSignedIn && userIsSignedIn === true) {
    //     if (userCredsLastChecked) {
    //       console.log('now:', now);
    //       let ageOfCredentials = now.diff(userCredsLastChecked, 'minutes');
    //       console.log('ageOfCredentials:', ageOfCredentials);
    //       if (ageOfCredentials <= ageOfCredentialsLimit) {
    //         dispatch(setUserValidated());
    //         console.log('ageOfCredentials good', ageOfCredentials);
    //       } else {
    //         console.log('ageOfCredentials bad', ageOfCredentials);
    //         dispatch(setUserOutdatedCredentials());
    //       }
    //     }
    //   }
    //   revalidateUser();
    dispatch(revalidateUserCredentials({ calledBy: 'AppNavigator' }));
    //   console.log('AppNavigator, userIsValidated 2', userIsValidated);
    //   console.log('AppNavigator, userIsSignedIn 2', userIsSignedIn);
    //   console.log('AppNavigator,userCredsLastChecked 2 ', userCredsLastChecked);
  }, []);

  useEffect(() => {
    // initBackgroundFetch(Tasks.BACKGROUND_FETCH_TASK, fetchDate, 5);
    // initBackgroundFetch(Tasks.BACKGROUND_FETCH_DATE_TASK, fetchDateTwo, 5);
    // console.log(
    //   '!!!! in AppNavigator useEffect. showingDemoApp is ',
    //   showingDemoApp
    // );
    setShowDemoApp(showingDemoApp);
  }, [showingDemoApp]);

  useEffect(() => {
    if (showingDemoApp) {
      let tempNotifiableAlertsCount = 0;

      if (
        typeof calibrationExpiryOverdueCount !== 'undefined' &&
        calibrationExpiryOverdueCount !== null
      ) {
        tempNotifiableAlertsCount =
          tempNotifiableAlertsCount + calibrationExpiryRedCount;
      }
      if (
        typeof calibrationExpiryRedCount !== 'undefined' &&
        calibrationExpiryRedCount !== null
      ) {
        tempNotifiableAlertsCount =
          tempNotifiableAlertsCount + calibrationExpiryRedCount;
      }

      if (
        typeof ltpLoansRedCount !== 'undefined' &&
        ltpLoansRedCount !== null
      ) {
        tempNotifiableAlertsCount =
          tempNotifiableAlertsCount + ltpLoansRedCount;
      }

      if (
        typeof serviceMeasuresRedCount !== 'undefined' &&
        serviceMeasuresRedCount !== null
      ) {
        tempNotifiableAlertsCount =
          tempNotifiableAlertsCount + serviceMeasuresRedCount;
      }

      if (typeof newsRedCount !== 'undefined' && newsRedCount !== null) {
        tempNotifiableAlertsCount = tempNotifiableAlertsCount + newsRedCount;
      }

      console.log(
        'in appnav useEffect tempNotifiableAlertsCount',
        'calibrationExpiryOverdueCount',
        calibrationExpiryOverdueCount,
        'calibrationExpiryRedCount',
        calibrationExpiryRedCount,
        'serviceMeasuresRedCount',
        serviceMeasuresRedCount,
        'ltpLoansRedCount',
        ltpLoansRedCount,
        'newsRedCount',
        newsRedCount,
        'tempNotifiableAlertsCount',
        tempNotifiableAlertsCount
      );
      setBadgeCountAsync(tempNotifiableAlertsCount);
    } else {
      setBadgeCountAsync(0);
    }
  }, [
    calibrationExpiryOverdueCount,
    calibrationExpiryRedCount,
    ltpLoansRedCount,
    serviceMeasuresRedCount,
    newsRedCount,
    showingDemoApp,
  ]); //testing objects

  //   console.log('?????? in AppNavigator showingDemoApp is ', showingDemoApp);
  //   console.log('ssssss in AppNavigator showDemoApp ', showDemoApp);

  const allOK =
    userIsValidated &&
    userIsValidated === true &&
    userIsSignedIn &&
    userIsSignedIn === true
      ? true
      : false;

  //   const AppStack = createStackNavigator();

  //   console.log(
  //     'AppNavigator, showingDemoApp is: ',
  //     showingDemoApp && showingDemoApp
  //   );

  //   console.log('AppNavigator, props are: ', props);

  //   const newPropsObj = { ...props, showingDemoApp: true };
  //   console.log('AppNavigator, newPropsObj is: ', newPropsObj);
  //   console.log(
  //     '?????? in AppNavigator showingDemoApp is ',
  //     showingDemoApp,
  //     showDemoApp
  //   );
  if (showDemoApp) {
    return (
      <NavigationContainer>
        {allOK === true ? (
          <DrawerNavigator showDemoApp={true} />
        ) : (
          <SignedOutStack />
        )}
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {allOK === true ? (
          <DrawerNavigator showDemoApp={false} />
        ) : (
          <SignedOutStack />
        )}
      </NavigationContainer>
    );
  }
};
