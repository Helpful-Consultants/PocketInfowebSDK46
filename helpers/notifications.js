import * as Notifications from 'expo-notifications';
//import * as BackgroundFetch from 'expo-background-fetch';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { setBadgeCountAsync } from '../helpers/appBadge';

// defines how device should handle a notification when the app is running (foreground notifications)
export const setUpForegroundNotificationsHandler = () => {
  console.log('In setUpForegroundNotificationsHandler');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
};
// defines how device should handle a notification when the app is running (foreground notifications)
export const handleBackgroundNotification = async (notificationObject) => {
  console.log('in handleBackgroundNotification');
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

// export const requestNotificationsPermissionAsync = async () => {
//   const permissionsStatus = await Notifications.requestPermissionsAsync({
//     android: {},
//     ios: {
//       allowAlert: false,
//       allowBadge: true,
//       allowSound: false,
//       allowDisplayInCarPlay: false,
//       allowCriticalAlerts: false,
//       provideAppNotificationSettings: true,
//       allowProvisional: false,
//       allowAnnouncements: false,
//     },
//   });
//   // console.log(`permissionsStatus`, permissionsStatus);
//   // setPermissionsStatus(permissionsStatus);
//   return permissionsStatus;
// };

export const checkNotificationsPermissionStatusAsync = async () => {
  if (Device.isDevice) {
    {
      const settings = await Notifications.getPermissionsAsync();
      // console.log(`notif status`, settings);
      setNotificationsStatus(settings);
      return (
        (settings && settings.granted) ||
        (settings &&
          settings.ios?.status ===
            Notifications.IosAuthorizationStatus.PROVISIONAL)
      );
    }
  } else {
    console.log(
      'In checkNotificationsPermissionStatusAsync on simulator: use physical device for Push Notifications'
    );
    return;
  }
};

export const registerDeviceForPushNotificationsAsync = async () => {
  let token;
  finalStatus = 'Not device';

  if (Device.isDevice) {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      result = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
          },
        });
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted!');
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('token is:', token);
    } catch (error) {
      console.log('error in get');
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
  return { finalStatus, token };
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
export const schedulePushNotificationAsync = async (token = '') => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'T&E Notification',
      body: `ODIS version updated - please check in the app. Sent to ${token}`,
      data: { badge: 33 },
    },
    trigger: { seconds: 2 },
  });
};
export const scheduleRegularPushNotificationAsync = async (token = '') => {
  const trigger = new Date(Date.now() + 5 * 60 * 1000);
  trigger.setMinutes(0);
  trigger.setSeconds(0);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'T&E Notification',
      body: 'You should get this every 5 mins',
      data: { badge: 5 },
    },
    trigger,
  });
};
export const zzzzscheduleRegularPushNotificationAsync = async (token = '') => {
  const trigger = new Date(Date.now() + 5 * 60 * 1000);
  trigger.setMinutes(0);
  trigger.setSeconds(0);
  const notificationID = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'T&E Notification',
      body: 'You should get this every 5 mins',
      data: { badge: 5 },
    },
    trigger,
  });
};
