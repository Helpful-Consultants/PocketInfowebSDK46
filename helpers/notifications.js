import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

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
  const settings = await Notifications.getPermissionsAsync();
  // console.log(`notif status`, settings);
  setNotificationsStatus(settings);
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice || Device.productName?.includes('emulator')) {
    console.log('In simulator: use physical device for Push Notifications');
  } else {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted!');
      }
      const token = (
        await Notifications.getExpoPushTokenAsync({
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
        })
      ).data;
      return token;
    } catch (error) {
      console.log(Device);
      console.log(error);
    }
  }
};
