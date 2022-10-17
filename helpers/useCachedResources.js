import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load images
        await Promise.all([
          Asset.loadAsync([
            require('../assets/images/icon.png'),
            require('../assets/images/splash.png'),
            require('../assets/images/tiw-app-logo-less-whitespace.png'),
            require('../assets/images/tiw-app-logo-trans.png'),
            require('../assets/images/tiw-app-logo-trans-white.png'),
            require('../assets/images/tiw-app-logo.png'),
            require('../assets/images/audi-logo.png'),
            require('../assets/images/cv-logo.png'),
            require('../assets/images/seat-logo.png'),
            require('../assets/images/skoda-logo.png'),
            require('../assets/images/vw-logo.png'),
            require('../assets/images/odis.jpg'),
            require('../assets/images/no-image-placeholder.png'),
          ]),
          Font.loadAsync({
            'the-sans': require('../assets/fonts/VWAGTheSans-Regular.ttf'),
            'the-sans-bold': require('../assets/fonts/VWAGTheSans-Bold.ttf'),
            'the-sans-light': require('../assets/fonts/VWAGTheSans-Light.ttf'),
          }),
        ]);
        console.log(' loadResourcesAsync done');
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};
