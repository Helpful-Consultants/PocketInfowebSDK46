import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Text } from 'react-native-elements';
import Tasks from '../constants/Tasks';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRequestedDemo } from '../actions/user';

// 2. Register the task at some point in your app by providing the same name, and some configuration
// options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(Tasks.BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 1 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(Tasks.BACKGROUND_FETCH_TASK);
}

export default backgroundFetchBlock = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

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
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
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
