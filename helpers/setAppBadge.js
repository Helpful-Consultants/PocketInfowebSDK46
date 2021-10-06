import * as Notifications from 'expo-notifications';

export const getBadgeCountAsync = async () => {
  // set notifications badge count
  try {
    const count = await Notifications.getBadgeCountAsync();
    //   console.log(`app badge number is ${count}`);
    return count;
  } catch (err) {
    //   console.log('did not manage to get app badge count!', err);
    return null;
  }
};

export const incrementBadgeCountAsync = async () => {
  // set notifications badge count
  try {
    const count = await Notifications.getBadgeCountAsync();
    //   console.log(`app badge number is now  ${count}, setting to ${count + 1}`);
    await Notifications.setBadgeCountAsync(count + 1);
    return count;
  } catch (err) {
    //   console.log('did not manage to increment app badge count!', err);
    return null;
  }
};

export const setBadgeCountAsync = async () => {
  // set notifications badge count
  try {
    const setCount = await Notifications.setBadgeCountAsync(1);
    //   console.log(`setting app badge with number 1 ${setCount}`);
  } catch (err) {
    //   console.log('did not manage to set notif app badge count!', err);
  }
};

export const resetBadgeCountAsync = async () => {
  // set notifications badge count
  try {
    const resetCount = await Notifications.setBadgeCountAsync(0);
    //   console.log(`reset app badge count ${resetCount}`);
  } catch (err) {
    //   console.log('did not manage to reset notif app badge count!', err);
  }
};
