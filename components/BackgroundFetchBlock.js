import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Device from 'expo-device';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Text } from 'react-native-elements';
import Tasks from '../constants/Tasks';
import { getShortDisplayDateAndLongTime } from '../helpers/dates';
import {
  registerBackgroundNotificationsTaskAsync,
  registerDeviceForPushNotificationsAsync,
  setUpForegroundNotificationsHandler,
  schedulePushNotificationAsync,
  scheduleRegularPushNotificationAsync,
  unregisterBackgroundNotificationsTaskAsync,
} from '../helpers/notifications';
// import { store } from '../helpers/store';
// console.log('in backgroundfetchblock', store);

const exponentPushTokenIPhone12 = 'ExponentPushToken[8l1YL_H2N_84dNlAy4aPBh]';
const exponentPushTokenAndroid = 'ExponentPushToken[]';
const exponentPushTokenIPhone12Extra =
  'ExponentPushToken[rFlR5bPYAAfrGqKwglHzQs]';
const exponentPushTokenIPhone7Extra =
  'ExponentPushToken[WCD8FKGLAdvehtFR3DcPNo]';
const exponentPushTokenLyndonExtra =
  'ExponentPushToken[ntbDpPBhHEY4fpLtMsTio9]';

// 2. Register the task at some point in your app by providing the same name, and some configuration
// options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const registerBackgroundFetchTaskAsync = async () => {
  const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();
  //   console.log(
  //     'in registerBackgroundFetchTaskAsync',
  //     BackgroundFetch.BackgroundFetchStatus
  //   );
  switch (backgroundFetchStatus) {
    case BackgroundFetch.BackgroundFetchStatus.Restricted:
    case BackgroundFetch.BackgroundFetchStatus.Denied:
      console.log('Background execution is disabled');
      return;
    default: {
      //   console.log('Background execution allowed');
      let tasks = await TaskManager.getRegisteredTasksAsync();
      if (
        tasks.find((f) => f.taskName === Tasks.BACKGROUND_FETCH_DATE_TASK) ==
        null
      ) {
        console.log('Registering task');
        await BackgroundFetch.registerTaskAsync(
          Tasks.BACKGROUND_FETCH_DATE_TASK,
          {
            minimumInterval: 15, // 15 minutes in the minimum for iOS
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
          }
        );
        tasks = await TaskManager.getRegisteredTasksAsync();
        console.log('Registered tasks', tasks);
      } else {
        console.log(
          `Task ${Tasks.BACKGROUND_FETCH_DATE_TASK} already registered, skipping`
        );
      }
      console.log('Setting interval to', 15);
      await BackgroundFetch.setMinimumIntervalAsync(15);
    }
  }
};
const resetBackgroundFetchTaskInterval = async () => {
  console.log('in resetBackgroundFetchTaskInterval');
  return BackgroundFetch.setMinimumIntervalAsync(15);
};

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const unregisterBackgroundFetchTaskAsync = async () => {
  console.log('in unregisterBackgroundFetchTaskAsync');
  return Notifications.unregisterTaskAsync(Tasks.BACKGROUND_FETCH_DATE_TASK);
};

export default BackgroundFetchBlock = () => {
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const backgroundDataItems = useSelector(
    (state) => state.backgroundData.backgroundDataItems
  );
  const backgroundData = useSelector((state) => state.backgroundData);
  const backgroundDataFetchTime = useSelector(
    (state) => state.backgroundData.fetchTime
  );
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const [isFetchTaskRegistered, setIsFetchTaskRegistered] = useState(false);
  const [
    isBackgroundNotificationsTaskRegistered,
    setIsBackgroundNotificationsTaskRegistered,
  ] = useState(false);
  const [ExponentPushToken, setExponentPushToken] = useState('');
  const [expoPushResult, setExpoPushResult] = useState('');
  const [backgroundTaskStatus, setBackgroundTaskStatus] = useState(null);
  const [appBadgeCount, setAppBadgeCount] = useState(0);
  const [appBadgeStatus, setAppBadgeStatus] = useState(null);
  const [notificationsPermissionsStatus, setNotificationsPermissionsStatus] =
    useState(null);
  const [notification, setNotification] = useState(false);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const notificationListener = useRef();
  const responseListener = useRef();

  const getBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const count = await Notifications.getBadgeCountAsync();
      //   console.log(`app badge number is ${count}`);
      setAppBadgeCount(count);
      setAppBadgeStatus(count ? true : false);
      return count;
    } catch (err) {
      //   console.log('did not manage to get app badge count!', err);
      return null;
    }
  };

  const incrementBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const count = await Notifications.getBadgeCountAsync();
      //   console.log(`app badge number is now  ${count}, setting to ${count + 1}`);
      await Notifications.setBadgeCountAsync(count + 1);
      setAppBadgeCount(count + 1);
      setAppBadgeStatus(true);
      return count;
    } catch (err) {
      //   console.log('did not manage to increment app badge count!', err);
      return null;
    }
  };

  const setBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const setCount = await Notifications.setBadgeCountAsync(1);
      //   console.log(`setting app badge with number 1 ${setCount}`);
      setAppBadgeStatus(setCount);
    } catch (err) {
      //   console.log('did not manage to set notif app badge count!', err);
    }
  };

  const resetBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const resetCount = await Notifications.setBadgeCountAsync(0);
      //   console.log(`reset app badge count ${resetCount}`);
      setAppBadgeStatus(!resetCount);
      getBadgeCountAsync();
    } catch (err) {
      //   console.log('did not manage to reset notif app badge count!', err);
    }
  };

  const checkNotificationsPermissionStatusAsync = async (settings) => {
    // const settings = await Notifications.getPermissionsAsync();
    // console.log(`notif status`, settings);
    const returnVal =
      (settings && settings.granted) ||
      (settings &&
        settings.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL);
    setNotificationsPermissionsStatus(returnVal);
    return returnVal;
  };

  const checkBackgroundFetchTaskStatusAsync = async () => {
    const getStatus = await BackgroundFetch.getStatusAsync();
    const getIsTaskRegistered = await TaskManager.isTaskRegisteredAsync(
      Tasks.BACKGROUND_FETCH_DATE_TASK
    );
    const [status, isTaskRegistered] = await Promise.all([
      getStatus,
      getIsTaskRegistered,
    ]);
    console.log(
      'in checkBackgroundFetchTaskStatusAsync backgroundFetchStatus: ',
      status,
      'isFetchTaskRegistered',
      isTaskRegistered
    );
    setBackgroundTaskStatus(status);
    setIsFetchTaskRegistered(isTaskRegistered);
  };

  const checkBackgroundNotificationsTaskStatusAsync = async () => {
    const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(
      Tasks.BACKGROUND_NOTIFICATIONS_TASK
    );
    console.log(
      '$$$ in checkBackgroundNotificationsTaskStatusAsync;isBackgroundNotificationsTaskRegistered',
      isTaskRegistered
    );
    setIsBackgroundNotificationsTaskRegistered(isTaskRegistered);
  };

  const toggleBackgroundFetchTaskAsync = async () => {
    console.log(
      'in toggleBackgroundFetchTaskAsync, isFetchTaskRegistered: ',
      isFetchTaskRegistered
    );
    if (isFetchTaskRegistered) {
      await unregisterBackgroundFetchTaskAsync();
      console.log(
        'in toggleBackgroundFetchTaskAsync, unregisterBackgroundFetchTaskAsync finished '
      );
      checkBackgroundFetchTaskStatusAsync();
    } else {
      await registerBackgroundFetchTaskAsync();
      await resetBackgroundFetchTaskInterval();
      console.log(
        'in toggleBackgroundFetchTaskAsync, registerBackgroundFetchTaskAsync finished '
      );
      checkBackgroundFetchTaskStatusAsync();
    }
  };
  const toggleBackgroundNotificationsTaskAsync = async () => {
    console.log(
      '££££ in toggleBackgroundNotificationsTaskAsync, isBackgroundNotificationsTaskRegistered: ',
      isBackgroundNotificationsTaskRegistered
    );
    if (isBackgroundNotificationsTaskRegistered) {
      await unregisterBackgroundNotificationsTaskAsync();
      console.log(
        '££££ in toggleBackgroundNotificationsTaskAsync, unregisterBackgroundNotificationsTaskAsync finished '
      );
      checkBackgroundNotificationsTaskStatusAsync();
    } else {
      await registerBackgroundNotificationsTaskAsync();
      console.log(
        '££££ in toggleBackgroundNotificationsTaskAsync, registerBackgroundNotificationsTaskAsync finished '
      );
      checkBackgroundNotificationsTaskStatusAsync();
    }
  };

  useEffect(() => {
    checkBackgroundFetchTaskStatusAsync();
    // requestNotificationsPermissionAsync();
    setUpForegroundNotificationsHandler();
    registerDeviceForPushNotificationsAsync().then(({ permission, token }) => {
      console.log('permission:', permission);
      console.log('token:', token);
      setExponentPushToken(token);
      checkNotificationsPermissionStatusAsync(permission);
    });
    checkBackgroundNotificationsTaskStatusAsync();
    // checkNotificationsPermissionStatusAsync();
    getBadgeCountAsync(); //conflict?

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // const foregroundReceivedNotificationSubscription =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     handleNotifications(notification.request.trigger.remoteMessage);
    //   });

    return () => {
      // cleanup the listener and task registry
      //   foregroundReceivedNotificationSubscription.remove();
      //   unregisterBackgroundNotificationsTaskAsync();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //   console.log(
  //     'backgroundDataItems fetched at ',
  //     backgroundDataFetchTime &&
  //       getShortDisplayDateAndLongTime(backgroundDataFetchTime),
  //     backgroundDataItems && backgroundDataItems
  //   );
  //   console.log(
  //     'backgroundDataItems from store',
  //     backgroundDataItems && backgroundDataItems
  //   );
  //   console.log(
  //     'backgroundDataItems.datetime from store',
  //     backgroundDataItems &&
  //       backgroundDataItems.datetime &&
  //       backgroundDataItems.datetime
  //   );

  //   console.log('notificationsPermissionsStatus', notificationsPermissionsStatus);
  //   console.log('appBadgeCount', appBadgeCount, 'appBadgeStatus', appBadgeStatus);

  //   console.log('backgroundData', backgroundData);
  return showingDemoApp && userDataObj && userDataObj.userName ? (
    userDataObj.userName.toLowerCase().indexOf('zzupstone') > -1 ? (
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
            Last background fetch at:{' '}
            {(backgroundDataFetchTime &&
              getShortDisplayDateAndLongTime(backgroundDataFetchTime)) ||
              'not called yet'}{' '}
            <Text style={styles.boldText}>
              {' '}
              Result:{' '}
              {backgroundDataItems !== 'undefined' &&
              backgroundDataItems &&
              backgroundDataItems.abbreviation &&
              backgroundDataItems.abbreviation.length > 0
                ? backgroundDataItems.abbreviation
                : 'n/a'}{' '}
              {typeof backgroundDataItems !== 'undefined' &&
              backgroundDataItems &&
              backgroundDataItems.datetime &&
              backgroundDataItems.datetime.length > 0
                ? backgroundDataItems.datetime
                : 'n/a'}{' '}
            </Text>
          </Text>
          <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
            {`${
              notificationsPermissionsStatus &&
              notificationsPermissionsStatus.granted
                ? 'Notif granted'
                : 'Notif not granted'
            }; Backgrnd task status: ${
              backgroundTaskStatus ? backgroundTaskStatus : 'N'
            }`}
          </Text>
          {1 === 1 ? null : (
            <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
              Badge count: <Text style={styles.boldText}>{appBadgeCount}</Text>
              <TouchableOpacity
                onPress={() => {
                  resetBadgeCountAsync();
                }}
              >
                <Text>{` Reset`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  incrementBadgeCountAsync();
                }}
              >
                <Text>{` Increment`}</Text>
              </TouchableOpacity>
            </Text>
          )}
          {1 === 2 ? (
            <TouchableOpacity
              onPress={() => {
                toggleBackgroundFetchTaskAsync();
              }}
            >
              <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                {isFetchTaskRegistered
                  ? `>Unregister ${Tasks.BACKGROUND_FETCH_DATE_TASK}`
                  : `>Register ${Tasks.BACKGROUND_FETCH_DATE_TASK}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {1 === 2 ? (
            <TouchableOpacity
              onPress={() => {
                toggleBackgroundNotificationsTaskAsync();
              }}
            >
              <Text
                style={{
                  ...baseStyles.panelTextAppInfo,
                  paddingTop: 0,
                  hidden,
                }}
              >
                {isBackgroundNotificationsTaskRegistered
                  ? `>Unregister ${Tasks.BACKGROUND_NOTIFICATIONS_TASK}`
                  : `>Register ${Tasks.BACKGROUND_NOTIFICATIONS_TASK}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {notificationsPermissionsStatus &&
          notificationsPermissionsStatus.granted ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  schedulePushNotificationAsync(ExponentPushToken);
                }}
              >
                <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                  {`>Schedule a push notification`}
                </Text>
              </TouchableOpacity>
              <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                {Device.isDevice ? 'Device' : 'Simulator; '}
                {ExponentPushToken}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    ) : (
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
            {`${
              1 === 1 ? 'Notif granted' : 'Notif not granted'
            }; Backgrnd task status: ${
              backgroundTaskStatus ? backgroundTaskStatus : 'N'
            }`}
          </Text>
          <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
            {Device.isDevice ? 'Device' : 'Simulator; '}
            {ExponentPushToken}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              schedulePushNotificationAsync(ExponentPushToken);
            }}
          >
            <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
              {`> Send yourself a test notification`}
            </Text>
            <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
              {`Your token is ${ExponentPushToken}`}
            </Text>
          </TouchableOpacity>
        </View>
        {userDataObj.userName.toLowerCase().indexOf('upstone') > -1 ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                scheduleRegularPushNotificationAsync(ExponentPushToken);
              }}
            >
              <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                {`> Schedule a regular notification`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                schedulePushNotificationAsync(exponentPushTokenIPhone7Extra);
              }}
            >
              <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                {`> Schedule a push notification to Al phone 7 ${exponentPushTokenIPhone7Extra}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                schedulePushNotificationAsync(exponentPushTokenIPhone12Extra);
              }}
            >
              <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
                {`> Schedule a push notification to Al phone 12 ${exponentPushTokenIPhone12Extra}`}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    )
  ) : null;
};

/* {ExponentPushToken ? ExponentPushToken : expoPushResult ? expoPushResult : null} */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },

  textContainer: {},
  boldText: {
    fontWeight: 'bold',
  },
});
