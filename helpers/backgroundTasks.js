import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export const defineBackgroundTask = async (taskName, taskFn) => {
  console.log('INSIDE TASKMANAGER.defineTASK');
  console.log(
    'in defineBackgroundFetch',
    'task:',
    taskName,
    'taskName:',
    taskFn
  );
  TaskManager.defineTask(taskName, taskFn);

  const status = await BackgroundFetch.getStatusAsync();
  switch (status) {
    case BackgroundFetch.Status.Restricted:
    case BackgroundFetch.Status.Denied:
      console.log('in defineBackgroundFetch Background execution is disabled');
      return;

    default: {
      console.log('in defineBackgroundFetch Background execution allowed');

      let tasks = await TaskManager.getRegisteredTasksAsync();
      tasks = await TaskManager.getRegisteredTasksAsync();
      console.log('in defineBackgroundFetch Registered tasks', tasks);
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
    ? BackgroundFetch.Result.NewData
    : BackgroundFetch.Result.NoData;
};

export const fetchDate = async (store) => {
  console.log('store', store ? store : 'nought');
  const now = new Date().toISOString();
  const result = true;
  console.log('store', store ? store : 'nought');
  //   store.dispatch(getBackgroundDataRequest());
  console.log('Got background fetch call to fetch date', now);

  console.log('background fetchDate running!!!!!');
  //alert('Got background fetch call to fetch date: ' + now);

  return result
    ? BackgroundFetch.Result.NewData
    : BackgroundFetch.Result.NoData;
};

export const fetchData = async () => {
  const now = new Date().toISOString();

  //   const nowStr = (now && now.toISOString()) || 'no date';
  const result = true;
  console.log('Got background fetch call to fetch datA', now);
  return result
    ? BackgroundFetch.Result.NewData
    : BackgroundFetch.Result.NoData;
};
