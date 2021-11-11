import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import Tasks from '../constants/Tasks';
import { store } from './store';

// console.log('in appbadgeStatus', store);

export const getBadgeCountAsync = async () => {
  // set notifications badge count
  console.log('in getBadgeCountAsync', store);
  try {
    const count = await Notifications.getBadgeCountAsync();
    //   console.log(`app badge number is ${count}`);
    // setAppBadgeCount(count);
    // setAppBadgeStatus(count ? true : false);
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
    // setAppBadgeCount(count + 1);
    // setAppBadgeStatus(true);
    return count;
  } catch (err) {
    //   console.log('did not manage to increment app badge count!', err);
    return null;
  }
};

export const setBadgeCountAsync = async (count = 0) => {
  // set notifications badge count
  //   console.log(`setting the app badge with number ${count}`);
  try {
    const setCount = await Notifications.setBadgeCountAsync(count);
    // console.log('successfully set app badge to', count);
    // setAppBadgeStatus(setCount);
  } catch (err) {
    //   console.log('did not manage to set notif app badge count!', err);
  }
};

export const resetBadgeCountAsync = async () => {
  // set notifications badge count
  try {
    const resetCount = await Notifications.setBadgeCountAsync(0);
    //   console.log(`reset app badge count ${resetCount}`);
    // setAppBadgeStatus(!resetCount);
    getBadgeCountAsync();
  } catch (err) {
    //   console.log('did not manage to reset notif app badge count!', err);
  }
};
