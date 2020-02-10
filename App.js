import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/Colors';

// import AsyncStorage from '@react-native-community/async-storage'; //breaks
import { AsyncStorage } from 'react-native'; // deprecated

import { Ionicons } from '@expo/vector-icons';
import { Button, colors, ThemeProvider } from 'react-native-elements';
import AppNavigator from './navigation/AppNavigator';
import Loading from './components/Loading';

enableScreens();

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://rem-rest-api.herokuapp.com/api';
axios.defaults.baseURL = 'https://toolsinfoweb.co.uk';

// const theme = {
//   colors: {
//     ...Platform.select({
//       default: colors.platform.android,
//       ios: colors.platform.ios
//     })
//   }
// };

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = compose(persistedReducer, {}, applyMiddleware(sagaMiddleware));
const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  //   persistStore(store).purge();

  const userIsSignedIn = true;

  const persistor = persistStore(store);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    // console.log('in App');
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <View style={styles.container}>
              {Platform.OS === 'ios' ? (
                <StatusBar barStyle='dark-content' />
              ) : (
                <StatusBar backgroundColor='#004466' barStyle='light-content' />
              )}
              <AppNavigator userIsSignedIn={userIsSignedIn} />
            </View>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

// async function loadResourcesAsync() {
//     const Asset.cacheImages([
//     require('./assets/images/icon.png'),
//     require('./assets/images/splash.png'),
//     require('./assets/images/tiw-app-logo-less-whitespace.png'),
//     require('./assets/images/tiw-app-logo-trans.png'),
//     require('./assets/images/tiw-app-logo.png'),
//     require('./assets/images/audi-logo.png'),
//     require('./assets/images/cv-logo.png'),
//     require('./assets/images/seat-logo.png'),
//     require('./assets/images/skoda-logo.png'),
//     require('./assets/images/vw-logo.png'),
//     require('./assets/images/odis.jpg')
//   ]);

//   const fontAssets = cacheFonts([
//     require('./assets/fonts/VWAGTheSans-Regular.ttf'),
//     require('./assets/fonts/VWAGTheSans-Bold.ttf'),
//     require('./assets/fonts/VWAGTheSans-Light.ttf')
//   ]);
//   //             'the-sans-bold': require('./assets/fonts/VWAGTheSans/VWAGTheSans-Bold.ttf')]);
//   await Promise.all([...imageAssets, ...fontAssets]);
// }

async function loadResourcesAsync() {
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
      require('./assets/images/odis.jpg')
    ]),
    Font.loadAsync({
      'the-sans': require('./assets/fonts/VWAGTheSans-Regular.ttf'),
      'the-sans-bold': require('./assets/fonts/VWAGTheSans-Bold.ttf'),
      'the-sans-light': require('./assets/fonts/VWAGTheSans-Light.ttf')
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
