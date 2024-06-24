import * as SplashScreen from 'expo-splash-screen';
// import * as Notifications from 'expo-notifications';
import registerNNPushToken from 'native-notify';
import * as Device from 'expo-device';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import { store, runSagaMiddleware } from './helpers/store';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
// import rootSaga from './sagas';
import { Platform, StatusBar, useWindowDimensions, View } from 'react-native';
import { Text, TextInput } from 'react-native'; // not react-native-elements or @rneui/themed, for setting properties
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tasks from './constants/Tasks';
import {
  defineBackgroundTask,
  showAppBadgeCount,
  fetchDate,
  //   fetchData,
} from './helpers/taskManagement';
import { handleBackgroundNotification } from './helpers/notifications';
// import { loadCachedResources } from './helpers/loadCachedResources';
import * as Sentry from '@sentry/react-native';
// import '@expo/match-media';
// import { useMediaQuery } from 'react-responsive';
// import { Ionicons } from '@expo/vector-icons';
// import { Button, colors, ThemeProvider } from '@rneui/themed';
import AppNavigator from './navigation/AppNavigator';
import Loading from './components/Loading';

// showAppBadgeCount(store);

// Here so it can use the Redux store
// const zzzzzzzfetchDate = async () => {
//   //   const now = new Date().toISOString();
//   console.log('background fetchDate running!');
//   console.log('the store contains', store ? store : 'nought');
//   const result = true;
//   store && store.dispatch && (await store.dispatch(getBackgroundDataRequest()));
//   console.log('the store now contains', store ? store : 'nought');
//   console.log('background fetchDate finished!!!!!');
//   //alert('Got background fetch call to fetch date: ' + now);
//   return result
//     ? BackgroundFetch.BackgroundFetchResult.NewData
//     : BackgroundFetch.BackgroundFetchResult.NoData;
// };

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
enableScreens();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://www.toolsinfoweb.co.uk';

// const theme = {
//   colors: {
//     ...Platform.select({
//       default: colors.platform.android,
//       ios: colors.platform.ios
//     })
//   }
// };

let sentryDSN =
  'https://753764f4208a4f429c2c21d20a45adf0@o359939.ingest.sentry.io/3578989';

const appName =
  Constants && Constants.expoConfig && Constants.expoConfig.name
    ? Constants.expoConfig.name
    : 'Test app';
if (appName.toLowerCase().includes('extra')) {
  sentryDSN =
    'https://179ccb307bf249eeafa60884b960924a@o359939.ingest.sentry.io/5806088';
}

// Sentry.init({
//   dsn: sentryDSN,
//   enableInExpoDevelopment: true,
//   debug: true,
// });
const appOS =
  Platform && Platform.OS ? (Platform.OS === 'ios' ? 'ios' : 'android') : null;
const sentryDist =
  Constants && Constants.expoConfig
    ? appOS === 'ios' &&
      Constants.expoConfig.ios &&
      Constants.expoConfig.ios.buildNumber
      ? Constants.expoConfig.ios.buildNumber
      : appOS === 'android' &&
          Constants.expoConfig.android &&
          Constants.expoConfig.android.versionCode
        ? Constants.expoConfig.android.versionCode
        : ''
    : '';
// console.log('SENTRY_PROJECT', process.env.EXPO_PUBLIC_SENTRY_PROJECT);
console.log('sentryDist for sentry', appOS, sentryDist);
// Constants.expoConfig.android &&
//   console.log('Constants.expoConfig', Constants && Constants.expoConfig);
// console.log(
//   'Constants.ios.buildNumber',
//   Constants &&
//     Constants.expoConfig &&
//     Constants.expoConfig.ios &&
//     Constants.expoConfig.ios.buildNumber
// );
// console.log(
//   'Constants.android.versionCode',
//   Constants &&
//     Constants.expoConfig &&
//     Constants.expoConfig.android &&
//     Constants.expoConfig.android.versionCode
// );
// console.log(
//   'release',
//   Constants && Constants.expoConfig && Constants.expoConfig.releaseId
// );

// Sentry.init({
//   dsn: sentryDSN,
//   enableInExpoDevelopment: true,
//   debug: true,
//   release: release,
//   dist: sentryDist,
// });

// enableInExpoDevelopment: true/false depetermines whether Sentry is enabled in dev mode
Sentry.init({
  dsn: sentryDSN,
  debug: true,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

runSagaMiddleware(); // run here so it isn't run on every render

// deprecated so moved above
// Sentry.setRelease(Constants.manifest.revisionId);

// const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// if (Platform.OS !== 'android') {
//   Notifications.setNotificationHandler({
//     handleNotifications: async () => ({
//       shouldShowAlert: false,
//       shouldPlaySound: false,
//       shouldSetBadge: true,
//     }),
//   });
// }

// await Notifications.scheduleLocalNotificationAsync({
//   title: '...',
//   body: '...',
//   ios: {count: 1},
// }, {
//   time: ...
// })
// const myMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My first middleware ran');
//   return next(action);
// };
// const mySecondMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My second middleware ran');
//   return next(action);
// };
// const myThirdMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My third middleware ran');
//   return next(action);
// };
// const persistedReducer = persistReducer(persistConfig, reducers);

// console.log('creating store');

// // const store = compose(persistedReducer, {}, applyMiddleware(sagaMiddleware));
// const store = createStore(
//   persistedReducer,
//   {},
//   compose(applyMiddleware(sagaMiddleware))
// );

// defineBackgroundFetch(Tasks.BACKGROUND_FETCH_TASK, fetchDate);
// console.log('%%%%%%%%% in app.js calling defineBackgroundTask');
defineBackgroundTask(Tasks.BACKGROUND_FETCH_DATE_TASK, fetchDate);
defineBackgroundTask(
  Tasks.BACKGROUND_NOTIFICATIONS_TASK,
  ({ data, error, executionInfo }) =>
    handleBackgroundNotification(data.notification)
);

// defineBackgroundFetch(Tasks.BACKGROUND_FETCH_DATA_TASK, fetchData);

// async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
//   console.log('in initBackgroundFetch', taskName, taskFn, interval);
//   TaskManager.defineTask(taskName, taskFn);

//   const status = await BackgroundFetch.getStatusAsync();
//   switch (status) {
//     case BackgroundFetch.BackgroundFetchStatus.Restricted:
//     case BackgroundFetch.BackgroundFetchStatus.Denied:
//       console.log('Background execution is disabled');
//       return;

//     default: {
//       console.log('Background execution allowed');

//       let tasks = await TaskManager.getRegisteredTasksAsync();
//       tasks = await TaskManager.getRegisteredTasksAsync();
//       console.log('Registered tasks', tasks);
//       if (tasks.find((f) => f.taskName === taskName) == null) {
//         console.log('Registering task');
//         await BackgroundFetch.registerTaskAsync(taskName, {
//           minimumInterval: 60 * 1, // 1 minutes
//           stopOnTerminate: false, // android only,
//           startOnBoot: true, // android only);
//         });
//       } else {
//         console.log(`Task ${taskName} already registered, skipping`);
//       }

//       console.log('Setting interval to', interval);
//       await BackgroundFetch.setMinimumIntervalAsync(interval);
//     }
//   }
// }

// TaskManager.defineTask(Tasks.BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();
//   const result = true;
//   console.log(`Got background fetch call`);
//   console.log(
//     `Got background fetch call at date: ${new Date(now).toISOString()}`
//   );
//   // Be sure to return the successful result type!
//   return result
//     ? BackgroundFetch.BackgroundFetchResult.NewData
//     : BackgroundFetch.BackgroundFetchResult.NoData;
// });

// console.log('store', store);

function App(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   const isAppReady = loadCachedResources();
  //   console.log('app props', props); const isAppReady = loadCachedResources();
  const [isAppReady, setIsAppReady] = useState(false);
  const appOS =
    Platform && Platform.OS
      ? Platform.OS === 'ios'
        ? 'ios'
        : 'android'
      : null;
  //   const appEdition =
  //       Constants.manifest.name === 'Pocket Infoweb Extra' ? 'extra' : 'pro';
  //   const appEdition = 'pro';
  const appName =
    Constants && Constants.expoConfig && Constants.expoConfig.name
      ? Constants.expoConfig.name
      : 'Test app';
  //   console.log('appName is', appName);
  const NNPushID = appName.toLowerCase().includes('extra') ? 6502 : 6501;
  const NNPushTokenKey = appName.toLowerCase().includes('extra')
    ? 'WJQm9OtVWDabcKdQ1oxW3f'
    : '28ZUQr3UiskMDLgEwxcmm1';

  //   console.log('NNPushTokenKey', NNPushTokenKey);
  //   console.log('NNPushID', NNPushID);
  //   console.log('Not calling NNPushID');
  //   appOS == 'ios' && registerNNPushToken(NNPushID, NNPushTokenKey);

  const registerForPush = async () => {
    console.log('in registerForPush', NNPushID, NNPushTokenKey);

    try {
      registerNNPushToken(NNPushID, NNPushTokenKey);
      console.log('in registerForPush finished');
    } catch (err) {
      console.log('in registerForPush err', err);
    }
  };

  console.log('device', Device.isDevice);
  // Device.isDevice && registerForPush;
  // Device.isDevice && registerForPush();
  registerForPush();
  //   registerNNPushToken(20905, 'DJT3KwE2V9QURLP8wQSG1z');

  //   console.log('registerNNPushToken', registerNNPushToken);

  async function unregisterBackgroundFetch(taskName) {
    console.log('in unregisterBackgroundFetch', taskName);
    try {
      if (!TaskManager.isTaskDefined(taskName)) {
        await BackgroundFetch.unregisterTaskAsync(taskName);
        console.log(
          'in unregisterBackgroundFetch, ',
          taskName,
          ' is now unregistered'
        );
      } else {
        console.log(
          'in unregisterBackgroundFetch, ',
          taskName,
          ' was not registered'
        );
      }
    } catch (err) {
      console.log('unregisterTaskAsync() failed:', err);
    }
  }

  //   countNotifiableItems();

  //   unregisterBackgroundFetch('getDateAndTime');
  //   const dispatch = useDispatch();

  //   persistStore(store).purge();
  //   const userIsValidated = true;

  // This prevents any fontscaling by the user - a bit mean
  //   Text.defaultProps = Text.defaultProps || {};
  //   Text.defaultProps.allowFontScaling = false;
  //   TextInput.defaultProps = TextInput.defaultProps || {};
  //   TextInput.defaultProps.allowFontScaling = false;
  //   const userIsValidated = true;

  // This limits fontscaling by the user - a bit kinder
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.maxFontSizeMultiplier = appOS === 'ios' ? 1.6 : 1.4;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.maxFontSizeMultiplier = appOS === 'ios' ? 1.5 : 1.4;
  //   console.log('7777 Text.defaultProps', Text && Text, TextInput && TextInput);

  const persistor = persistStore(store);

  //   useEffect(() => {
  //     async function loadResourcesAndDataAsync() {
  //       try {
  //         SplashScreen.preventAutoHideAsync();

  //         // Load images
  //         const resourecs = loadResourcesAsync();
  //       } catch (e) {
  //         // We might want to provide this error information to an error reporting service
  //         console.warn(e);
  //       } finally {
  //         setLoadingComplete(true);
  //         SplashScreen.hideAsync();
  //       }
  //     }

  //     loadResourcesAndDataAsync();
  //   }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Promise.all([
          Asset.loadAsync([
            require('./assets/images/icon.png'),
            require('./assets/images/splash.png'),
            require('./assets/images/tiw-app-logo-less-whitespace.png'),
            require('./assets/images/tiw-app-logo-trans.png'),
            require('./assets/images/tiw-app-logo-trans-white.png'),
            require('./assets/images/tiw-app-logo.png'),
            require('./assets/images/audi-logo.png'),
            require('./assets/images/cv-logo.png'),
            require('./assets/images/seat-logo.png'),
            require('./assets/images/skoda-logo.png'),
            require('./assets/images/vw-logo.png'),
            require('./assets/images/odis.jpg'),
            require('./assets/images/no-image-placeholder.png'),
          ]),
          Font.loadAsync({
            'the-sans': require('./assets/fonts/VWAGTheSans-Regular.ttf'),
            'the-sans-bold': require('./assets/fonts/VWAGTheSans-Bold.ttf'),
            'the-sans-light': require('./assets/fonts/VWAGTheSans-Light.ttf'),
          }),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setisAppReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <View style={baseStyles.containerFlex} onLayout={onLayoutRootView}>
            {appOS === 'ios' ? (
              <StatusBar barStyle="dark-content" />
            ) : (
              <StatusBar backgroundColor="#3689b1" barStyle="light-content" />
            )}
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
export default Sentry.wrap(App);
