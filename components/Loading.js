import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Image, Text } from 'react-native-elements';
import AppLogoWithHeader from '../components/AppLogoWithHeader';
import Colors from '../constants/Colors';
// import appLogo from '../assets/images/logos/tiw-app-logo-trans.png';

export default Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppLogoWithHeader />
        <View style={styles.loadingMessage}>
          <Text style={styles.loadingText}>LOADING DATA</Text>
          <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
  contentContainer: {
    // backgroundColor: 'yellow'
  },
  appName: {
    color: '#0096da',
    fontSize: 18
  },

  loadingMessage: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  loadingText: {
    color: Colors.vwgDeepBlue,
    fontSize: 22,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  }
});
