import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { store } from '../helpers/store';
import {
  getBackgroundDataRequest,
  //   getBackgroundDataStart,
} from '../actions/backgroundData';
import backgroundData from '../reducers/backgroundData';

export const defineBackgroundTask = async (taskName, taskExecutor) => {
  //   console.log('INSIDE TASKMANAGER.defineTASK');
  //   console.log(
  //     'in defineBackgroundFetch',
  //     'task:',
  //     taskName,
  //     'taskName:',
  //     taskExecutor
  //   );

  TaskManager.defineTask(taskName, taskExecutor);

  //   console.log(
  //     '%%%%%%%%% in defineBackgroundTask, BackgroundFetch',
  //     BackgroundFetch && BackgroundFetch
  //   );

  const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();

  //   console.log(
  //     '%%%%%%%%% in registerBackgroundFetchAsync, BackgroundFetchStatus',
  //     backgroundFetchStatus
  //   );
  switch (backgroundFetchStatus) {
    case BackgroundFetch.BackgroundFetchStatus.Restricted:
    case BackgroundFetch.BackgroundFetchStatus.Denied:
      console.log(
        '%%%%%%%%%%%%%%% in defineBackgroundFetch Background execution is disabled'
      );
      return;

    default: {
      console.log('in defineBackgroundFetch Background execution allowed');

      let tasks = await TaskManager.getRegisteredTasksAsync();
      tasks = await TaskManager.getRegisteredTasksAsync();
      //   console.log('in defineBackgroundFetch Registered tasks', tasks);
    }
  }
};

export const fetchNews = async (props) => {
  console.log('background fetch running!!!!!');
  console.log('this.props', props);

  const now = new Date().toISOString();
  //   const { dispatch } = this.props;

  //   console.log('dispatch', dispatch);
  //   dispatch(getNewsRequest);

  //   const nowStr = (now && now.toISOString()) || 'no date';
  const result = true;
  console.log('Got background fetch call to fetch date', now);
  //   await store.dispatch(getNewsRequest());
  //   alert('Got background fetch call to fetch date: ' + now);
  return result
    ? BackgroundFetch.BackgroundFetchResult.NewData
    : BackgroundFetch.BackgroundFetchResult.NoData;
};

export const fetchDate = async () => {
  //   const now = new Date().toISOString();
  //   console.log('task management background fetchDate running!');
  //   console.log('the store contains', store ? store.getState() : 'nought');
  const result = true;
  store && store.dispatch && (await store.dispatch(getBackgroundDataRequest()));
  //   console.log(
  //     'the store now contains',
  //     store ? store.getState().backgroundData : 'nought'
  //   );
  //   console.log('background fetchDate finished!!!!!');
  //alert('Got background fetch call to fetch date: ' + now);
  return result
    ? BackgroundFetch.BackgroundFetchResult.NewData
    : BackgroundFetch.BackgroundFetchResult.NoData;
};

export const showAppBadgeCount = (props) => {
  //   const nowStr = (now && now.toISOString()) || 'no date';
  const result = true;
  console.log('showAppBadgeCount', props);
};
