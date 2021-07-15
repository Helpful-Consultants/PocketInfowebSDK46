import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Text } from 'react-native-elements';
import Tasks from '../constants/Tasks';

// 2. Register the task at some point in your app by providing the same name, and some configuration
// options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(Tasks.BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 1 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(Tasks.BACKGROUND_FETCH_TASK);
};

export default BackgroundFetchBlock = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [taskStatus, setTaskStatus] = useState(null);
  const [appBadgeCount, setAppBadgeCount] = useState(0);
  const [appBadgeStatus, setAppBadgeStatus] = useState(null);
  const [notificationsStatus, setNotificationsStatus] = useState(null);
  const [permissionsStatus, setPermissionsStatus] = useState(null);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const getBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const count = await Notifications.getBadgeCountAsync();
      console.log(`app badge number is ${count}`);
      setAppBadgeCount(count);
      setAppBadgeStatus(count ? true : false);
      return count;
    } catch (err) {
      console.log('did not manage to get app badge count!', err);
      return null;
    }
  };

  const incrementBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const count = await Notifications.getBadgeCountAsync();
      console.log(`app badge number is now  ${count}, setting to ${count + 1}`);
      await Notifications.setBadgeCountAsync(count + 1);
      setAppBadgeCount(count + 1);
      setAppBadgeStatus(true);
      return count;
    } catch (err) {
      console.log('did not manage to increment app badge count!', err);
      return null;
    }
  };

  const setBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const setCount = await Notifications.setBadgeCountAsync(1);
      console.log(`setting app badge with number 1 ${setCount}`);
      setAppBadgeStatus(setCount);
    } catch (err) {
      console.log('did not manage to set notif app badge count!', err);
    }
  };

  const resetBadgeCountAsync = async () => {
    // set notifications badge count
    try {
      const resetCount = await Notifications.setBadgeCountAsync(0);
      console.log(`reset app badge count ${resetCount}`);
      setAppBadgeStatus(!resetCount);
      getBadgeCountAsync();
    } catch (err) {
      console.log('did not manage to reset notif app badge count!', err);
    }
  };

  const checkNotificationsStatusAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    // console.log(`notif status`, settings);
    setNotificationsStatus(settings);
    return (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  const requestNotificationsPermissionAsync = async () => {
    const permissionsStatus = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: false,
        allowBadge: true,
        allowSound: false,
        allowAnnouncements: false,
      },
    });
    // console.log(`permissionsStatus`, permissionsStatus);
    setPermissionsStatus(permissionsStatus);
  };

  const checkTaskStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      Tasks.BACKGROUND_FETCH_TASK
    );
    setTaskStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTaskAsync = async () => {
    console.log('in toggleFetchTaskAsync, isRegistered: ', isRegistered);
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
      checkTaskStatusAsync();
    } else {
      await registerBackgroundFetchAsync();
      checkTaskStatusAsync();
    }
  };

  useEffect(() => {
    checkTaskStatusAsync();
    checkNotificationsStatusAsync();
    requestNotificationsPermissionAsync();
    getBadgeCountAsync();
    // console.log('in useEffect appBadgeCount is', appBadgeCount);
  }, []);

  //   console.log('notificationsStatus', notificationsStatus);
  console.log('appBadgeCount', appBadgeCount, 'appBadgeStatus', appBadgeStatus);

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
          Notif status:{' '}
          <Text style={styles.boldText}>
            {notificationsStatus && notificationsStatus.granted
              ? 'granted'
              : 'not granted'}
          </Text>
        </Text>
        <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
          Badge count: <Text style={styles.boldText}>{appBadgeCount}</Text>
          <TouchableOpacity onPress={resetBadgeCountAsync}>
            <Text>{` Reset`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementBadgeCountAsync}>
            <Text>{` Increment`}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
          Background permitted:{' '}
          <Text style={styles.boldText}>
            {taskStatus ? BackgroundFetch.Status[taskStatus] : null}
          </Text>
        </Text>
        <TouchableOpacity onPress={toggleFetchTaskAsync}>
          <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
            {isRegistered
              ? 'Unregister BackgroundFetch task'
              : 'Register BackgroundFetch task'}
          </Text>
        </TouchableOpacity>
        <Text style={{ ...baseStyles.panelTextAppInfo, paddingTop: 0 }}>
          Task{' '}
          <Text style={styles.boldText}>{Tasks.BACKGROUND_FETCH_TASK}</Text>
          <Text style={styles.boldText}>
            {isRegistered ? ' is registered' : ' is not registered yet'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

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
