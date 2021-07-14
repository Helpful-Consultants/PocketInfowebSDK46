import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
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
  const [status, setStatus] = useState(null);
  const [badgeStatus, setBadgeStatus] = useState(null);
  const [notificationsStatus, setNotificationsStatus] = useState(null);
  const [permissionsStatus, setPermissionsStatus] = useState(null);

  const getBadgeCount = async () => {
    // set notifications badge count
    try {
      const appBadgeCount = await Notifications.getBadgeCountAsync();
      console.log(`badge number is ${appBadgeCount}`);
      setBadgeStatus(appBadgeCount);
      return appBadgeCount;
    } catch (err) {
      console.log('did not manage to get app badge count!', err);
      return null;
    }
  };

  const setBadgeCount = async () => {
    // set notifications badge count
    try {
      const setAppBadgeCount = await Notifications.setBadgeCountAsync(1);
      console.log(`showing app badge with number 1 ${setAppBadgeCount}`);
      setBadgeStatus(setAppBadgeCount);
    } catch (err) {
      console.log('did not manage to show notif app badge count!', err);
    }
  };

  const resetBadgeCount = async () => {
    // set notifications badge count
    try {
      const resetAppBadgeCount = await Notifications.setBadgeCountAsync(0);
      console.log(`reset app badge count ${resetAppBadgeCount}`);
      setBadgeStatus(resetAppBadgeCount);
    } catch (err) {
      console.log('did not manage to reset notif app badge count!', err);
    }
  };

  const checkNotificationsStatusAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    console.log(`notif status`, settings);
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
    console.log(`permissionsStatus`, permissionsStatus);
    setPermissionsStatus(permissionsStatus);
  };

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      Tasks.BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  useEffect(() => {
    checkStatusAsync();
    checkNotificationsStatusAsync();
    requestNotificationsPermissionAsync();
    setBadgeCount();
    // console.log('in useEffect badgeCount is', badgeCount);
  }, []);

  console.log('notificationsStatus', notificationsStatus);

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Notif status:{' '}
          <Text style={styles.boldText}>
            {notificationsStatus && notificationsStatus.granted
              ? 'granted'
              : 'not granted'}
          </Text>
        </Text>
        <Text>
          Badge status:{' '}
          <Text style={styles.boldText}>{badgeStatus ? 'true' : 'false'}</Text>
        </Text>
        <Text>
          Background permitted:{' '}
          <Text style={styles.boldText}>
            {status ? BackgroundFetch.Status[status] : null}
          </Text>
        </Text>
        <Text>
          Background task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? Tasks.BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>

      <Button
        title={
          isRegistered
            ? 'Unregister BackgroundFetch task'
            : 'Register BackgroundFetch task'
        }
        onPress={toggleFetchTask}
      />
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
