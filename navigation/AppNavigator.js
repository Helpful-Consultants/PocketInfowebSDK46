import React, { useEffect } from 'react';
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
import DemoSwitch from '../components/DemoSwitch';
import BackgroundFetchBlock from '../components/BackgroundFetchBlock';
import Colors from '../constants/Colors';
import Tasks from '../constants/Tasks';
import WipTabNavigator from './WipTabNavigator';
import NewsTabNavigator from './NewsTabNavigator';
import RemindersTabNavigator from './RemindersTabNavigator';
import SignedOutStack from './SignedOutStack';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const CustomDrawerContent = (props) => (
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
    <DemoSwitch />
    <AppInfo />
    <BackgroundFetchBlock />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  return (
    <Drawer.Navigator
      headerShown={false}
      drawerStyle={{
        width: baseStyles.panelWidth.width,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        name='WipsTabs'
        component={WipTabNavigator}
        options={{
          drawerLabel: 'Find Tools, Jobs & LTP List',
          initialRouteName: 'FindTools',
        }}
      />
      <Drawer.Screen
        name='NewsTabs'
        component={NewsTabNavigator}
        options={{
          drawerLabel: 'News, Catalogue & Stats',
          initialRouteName: 'News',
        }}
      />
      <Drawer.Screen
        name='RemindersTabs'
        component={RemindersTabNavigator}
        options={{
          drawerLabel: 'Alerts, S Measures, Loans & ODIS',
          initialRouteName: 'Notifications',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator = (props) => {
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  //   console.log('AppNavigator, userIsValidated', userIsValidated);
  //   console.log('AppNavigator, userIsSignedIn', userIsSignedIn);
  //   console.log('AppNavigator,userCredsLastChecked', userCredsLastChecked);
  const dispatch = useDispatch();
  //   return <AuthLoadingScreen />;

  //   console.log('AppNavigator props', props);

  //   let now = moment();
  //   const ageOfCredentialsLimit = 3;

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

  const fetchDate = async () => {
    const now = new Date().toISOString();

    //   const nowStr = (now && now.toISOString()) || 'no date';
    const result = true;
    console.log('Got background fetch call to fetch date', now);
    // Be sure to return the successful result type!
    return result
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  };

  const fetchDateTwo = async () => {
    const now = new Date().toISOString();

    //   const nowStr = (now && now.toISOString()) || 'no date';
    const result = true;
    console.log('Got background fetch call to fetch date two', now);
    // Be sure to return the successful result type!
    return result
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  };

  async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
    console.log('in initBackgroundFetch', taskName, taskFn, interval);
    TaskManager.defineTask(taskName, taskFn);

    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
      case BackgroundFetch.Status.Restricted:
      case BackgroundFetch.Status.Denied:
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
    // initBackgroundFetch(Tasks.BACKGROUND_FETCH_TASK, fetchDate, 5);
    // initBackgroundFetch(Tasks.BACKGROUND_FETCH_DATE_TASK, fetchDateTwo, 5);
  }, []);

  const allOK =
    userIsValidated &&
    userIsValidated === true &&
    userIsSignedIn &&
    userIsSignedIn === true
      ? true
      : false;

  //   const AppStack = createStackNavigator();

  //   console.log('AppNavigator,allOK ', allOK);

  return (
    <NavigationContainer>
      {allOK === true ? <DrawerNavigator props={props} /> : <SignedOutStack />}
    </NavigationContainer>
  );
};
