import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { setBadgeCountAsync } from '../helpers/appBadge';

// defines how device should handle a notification when the app is running (foreground notifications)
export const setUpNotificationsHandler = () => {
  console.log('In setUpNotificationsHandler');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
};

export const handleNewNotification = async (notificationObject) => {
  console.log('in handleNewNotification');
  try {
    const newNotification = {
      id: notificationObject.messageId,
      date: notificationObject.sentTime,
      title: notificationObject.data.title,
      body: notificationObject.data.message,
      data: JSON.parse(notificationObject.data.body),
    };
    // add the code to do what you need with the received notification  and, e.g., set badge number on app icon
    console.log(newNotification);
    //   await Notifications.setBadgeCountAsync(99);
    await setBadgeCountAsync(99);
  } catch (error) {
    console.log(error);
  }
};

export const requestNotificationsPermissionAsync = async () => {
  const permissionsStatus = await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: false,
      allowBadge: true,
      allowSound: false,
      allowDisplayInCarPlay: false,
      allowCriticalAlerts: false,
      provideAppNotificationSettings: false,
      allowProvisional: false,
      allowAnnouncements: false,
    },
  });
  // console.log(`permissionsStatus`, permissionsStatus);
  setPermissionsStatus(permissionsStatus);
};

export const checkNotificationsStatusAsync = async () => {
  if (Device.isDevice) {
    {
      const settings = await Notifications.getPermissionsAsync();
      // console.log(`notif status`, settings);
      setNotificationsStatus(settings);
      return (
        settings.granted ||
        settings.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL
      );
    }
  } else {
    console.log(
      'In checkNotificationsStatusAsync on simulator: use physical device for Push Notifications'
    );
    return;
  }
};

export const registerDeviceForPushNotificationsAsync = async () => {
  let token;
  let result = 'Not device';
  if (Device.isDevice) {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      result = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted!');
      }
      result = finalStatus;
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('token is:', token);
    } catch (error) {
      result = 'error in get';
      console.log(Device);
      console.log(error);
    }
  } else {
    console.log(
      'In registerDeviceForPushNotificationsAsync on simulator: use physical device for Push Notifications'
    );
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return { result, token };
};

export const registerBackgroundNotificationsTaskAsync = async () => {
  console.log('in registerBackgroundNotificationsTaskAsync');

  // register task to run whenever is received while the app is in the background
  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATIONS_TASK);
};
export const unregisterBackgroundNotificationsTaskAsync = async () => {
  if (Device.isDevice) {
    console.log('in unregisterBackgroundNotificationsTaskAsync on device');
    return Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATIONS_TASK);
  } else {
    console.log(
      'In unregisterBackgroundNotificationsTaskAsync on simulator: use physical device for Push Notifications'
    );
    return;
  }
};

export const resetBackgroundhandleNotificationsTaskInterval = async () => {
  console.log('in resetBackgroundhandleNotificationsInterval');
  return BackgroundFetch.setMinimumIntervalAsync(15);
};
