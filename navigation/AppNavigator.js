import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';
import {
  Button,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
// import Touchable from 'react-native-platform-touchable';
import { useDispatch, useSelector } from 'react-redux';

//import { Ionicons } from '@expo/vector-icons';
// import { setUserOutdatedCredentials } from '../actions/user';
// import { setUserValidated } from '../actions/user';
import NewsTabNavigator from './NewsTabNavigator';
import RemindersTabNavigator from './RemindersTabNavigator';
import SignedOutStack from './SignedOutStack';
import WipTabNavigator from './WipTabNavigator';
import { revalidateUserCredentials } from '../actions/user';
//import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import {
//   getBrand,
//   getVersion,
//   getManufacturer
// } from 'react-native-device-info';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AppInfo from '../components/AppInfo';
// import DemoAppSwitch from '../components/DemoAppSwitch';
import DemoDataSwitch from '../components/DemoDataSwitch';
// import BackgroundFetchBlock from '../components/BackgroundFetchBlock';
// import Tasks from '../constants/Tasks';
import Colors from '../constants/Colors';
import { setBadgeCountAsync } from '../helpers/appBadge';
import getBaseStyles from '../helpers/getBaseStyles';
import HomeScreen from '../screens/HomeScreen';

// console.log(Constants && Constants);
// console.log(Platform && Platform);

const CustomDrawerContent = (props) => {
  //   const { showDataSwitch } = props;
  //   console.log('CustomDrawerContent props.showDataSwitch', showDataSwitch);
  const userDataObj = useSelector((state) => state.user.userData[0]);

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
          fontFamily: 'TheGroupTEXT-Bold',
        }}
      >
        QUICK LINKS
      </Text>
      <DrawerItemList {...props} style={{ marginBottom: 20 }} />
      {userDataObj?.userName.toLowerCase?.().indexOf('upstone') > -1 ? (
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
          <DemoDataSwitch />
          <Button
            title="Sentry Test"
            onPress={() => {
              throw new Error('Sentry test on ' + Platform.OS);
            }}
          />
        </View>
      ) : (
        <View>
          <DemoDataSwitch />
        </View>
      )}

      <AppInfo />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const showDataSwitch = true;

  //   console.log('Dwr Navigator props', props);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      headerShown={false}
      drawerStyle={{
        width: baseStyles.panelWidth.width,
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} showDataSwitch={showDataSwitch} />
      )}
      screenOptions={{
        drawerActiveTintColor: Colors.vwgWhite,
        drawerInactiveTintColor: Colors.vwgWhite,
        drawerActiveBackgroundColor: Colors.vwgActiveLink,
        drawerInactiveBackgroundColor: Colors.vwgInactiveLink,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          headerShown: false,
          drawerLabelStyle: baseStyles.panelTextNav,
        }}
      />
      <Drawer.Screen
        name="WipTabs"
        component={WipTabNavigator}
        options={{
          drawerLabel: 'Find Tools, Jobs & LTP List',
          drawerLabelStyle: baseStyles.panelTextNav,
        }}
      />
      <Drawer.Screen
        name="NewsTabs"
        component={NewsTabNavigator}
        options={{
          drawerLabel: 'News & Stats',
          drawerLabelStyle: baseStyles.panelTextNav,
        }}
      />
      <Drawer.Screen
        name="RemindersTabs"
        component={RemindersTabNavigator}
        options={{
          drawerLabel: 'Alerts, S Measures, Loans, ODIS',
          drawerLabelStyle: baseStyles.panelTextNav,
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = (props) => {
  const dispatch = useDispatch();
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  //   const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
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
  const unseenCriticalNews = useSelector(
    (state) => state.news.unseenCriticalNews
  );
  const odisRedCount = useSelector((state) => state.odis.redCount);
  //   console.log('AppNavigator, userIsValidated', userIsValidated);
  //   console.log('AppNavigator, userIsSignedIn', userIsSignedIn);
  //   console.log('AppNavigator,userCredsLastChecked', userCredsLastChecked);

  //   const ageOfCredentialsLimit = 3;
  //   return <AuthLoadingScreen />;

  //   console.log('AppNavigator props', props && props);

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

  //   async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
  //     // console.log('in initBackgroundFetch', taskName, taskFn, interval);
  //     TaskManager.defineTask(taskName, taskFn);

  //     const status = await BackgroundFetch.getStatusAsync();
  //     switch (status) {
  //       case BackgroundFetch.BackgroundFetchStatus.Restricted:
  //       case BackgroundFetch.BackgroundFetchStatus.Denied:
  //         // console.log('Background execution is disabled');
  //         return;

  //       default: {
  //         // console.log('Background execution allowed');

  //         let tasks = await TaskManager.getRegisteredTasksAsync();
  //         tasks = await TaskManager.getRegisteredTasksAsync();
  //         // console.log('Registered tasks', tasks);
  //         if (tasks.find((f) => f.taskName === taskName) == null) {
  //           //   console.log('Registering task');
  //           await BackgroundFetch.registerTaskAsync(taskName, {
  //             minimumInterval: 60 * 1, // 1 minutes
  //             stopOnTerminate: false, // android only,
  //             startOnBoot: true, // android only);
  //           });
  //         } else {
  //           //   console.log(`Task ${taskName} already registered, skipping`);
  //         }

  //         // console.log('Setting interval to', interval);
  //         await BackgroundFetch.setMinimumIntervalAsync(interval);
  //       }
  //     }
  //   }

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
  }, [dispatch]);

  useEffect(() => {
    let tempNotifiableAlertsCount = 0;

    if (
      typeof calibrationExpiryOverdueCount === 'number' &&
      calibrationExpiryOverdueCount > 0
    ) {
      tempNotifiableAlertsCount =
        tempNotifiableAlertsCount + calibrationExpiryOverdueCount;
    }
    if (
      typeof calibrationExpiryRedCount === 'number' &&
      calibrationExpiryRedCount > 0
    ) {
      tempNotifiableAlertsCount =
        tempNotifiableAlertsCount + calibrationExpiryRedCount;
    }

    if (typeof ltpLoansRedCount === 'number' && ltpLoansRedCount > 0) {
      tempNotifiableAlertsCount = tempNotifiableAlertsCount + ltpLoansRedCount;
    }
    if (
      typeof serviceMeasuresRedCount === 'number' &&
      serviceMeasuresRedCount > 0
    ) {
      tempNotifiableAlertsCount =
        tempNotifiableAlertsCount + serviceMeasuresRedCount;
    }
    if (typeof unseenCriticalNews === 'number' && unseenCriticalNews > 0) {
      tempNotifiableAlertsCount =
        tempNotifiableAlertsCount + unseenCriticalNews;
    }
    if (typeof odisRedCount === 'number' && odisRedCount > 0) {
      tempNotifiableAlertsCount = tempNotifiableAlertsCount + 1;
    }

    //   console.log(
    //     'in appnav useEffect before setting badge',
    //     'showingDemoData',
    //     showingDemoData,
    //     'calibrationExpiryOverdueCount',
    //     calibrationExpiryOverdueCount,
    //     'calibrationExpiryRedCount',
    //     calibrationExpiryRedCount,
    //     'serviceMeasuresRedCount',
    //     serviceMeasuresRedCount,
    //     'ltpLoansRedCount',
    //     ltpLoansRedCount,
    //     'unseenCriticalNews',
    //     unseenCriticalNews,
    //     'odisRedCount',
    //     odisRedCount,
    //     'tempNotifiableAlertsCount',
    //     tempNotifiableAlertsCount
    //   );

    setBadgeCountAsync(tempNotifiableAlertsCount);
  }, [
    calibrationExpiryOverdueCount,
    calibrationExpiryRedCount,
    ltpLoansRedCount,
    serviceMeasuresRedCount,
    odisRedCount,
    showingDemoData,
    unseenCriticalNews,
  ]); //testing objects

  const allOK = !!(
    userIsValidated &&
    userIsValidated === true &&
    userIsSignedIn &&
    userIsSignedIn === true
  );

  //   const AppStack = createStackNavigator();

  //   console.log('AppNavigator, props are: ', props);

  //   const newPropsObj = { ...props, showingFullApp: true };
  //   console.log('AppNavigator, newPropsObj is: ', newPropsObj);

  return (
    <NavigationContainer>
      {allOK === true ? <DrawerNavigator /> : <SignedOutStack />}
    </NavigationContainer>
  );
};
export default AppNavigator;
