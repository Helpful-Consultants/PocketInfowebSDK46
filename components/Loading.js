import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';

export default Loading = () => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const [showReloadDialogue, setShowReloadDialogue] = useState(false);
  //   useEffect(() => {
  //     console.log('in getUpdatesAsync');
  //     const getUpdatesAsync = async () => {
  //       try {
  //         const update = await Updates.checkForUpdateAsync(listener(event));
  //         if (update.isAvailable) {
  //           console.log('updateAvailable', update && update);
  //           await Updates.fetchUpdateAsync();
  //           // ... notify user of update ...
  //          Updates.reloadAsync();
  //         }
  //         // continues returns to AppEntry.js, hiding the loader and revealing the app (this could be an action instead but for the sake of this short example this should suffice)
  //       } catch (e) {
  //         console.log('updateAvailable error');
  //       }
  //     };
  //     console.log('in update check useEffect');
  //     if (!__DEV__) {
  //       getUpdatesAsync();
  //     } else {
  //       console.log('no update check because DEV');
  //     }
  //   }, []);

  //   const listener = event => {
  //     if (event.type === Updates.EventType.DOWNLOAD_FINISHED) {
  //       setShowReloadDialogue(true);

  //      Updates.reloadAsync();
  //     }
  //   };

  return (
    <SafeAreaView style={baseStyles.containerFlexMarginTop}>
      <ScrollView>
        <AppNameWithLogo />
        <View style={baseStyles.viewLoadingMessage}>
          {showReloadDialogue === true ? (
            <Text style={baseStyles.textLoading}>
              Updating your app to a new app...
            </Text>
          ) : (
            <Text style={baseStyles.textLoading}>Loading the app...</Text>
          )}
          <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
