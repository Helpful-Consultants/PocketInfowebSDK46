import { Updates } from 'expo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';

export default Loading = () => {
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
  //           Updates.reloadFromCache();
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

  //       Updates.reloadFromCache();
  //     }
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppNameWithLogo />
        <View style={styles.loadingMessage}>
          {showReloadDialogue === true ? (
            <Text style={styles.loadingText}>
              Updating your app to a new app...
            </Text>
          ) : (
            <Text style={styles.loadingText}>Loading the app...</Text>
          )}
          <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  loadingMessage: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  loadingText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50
  }
});
