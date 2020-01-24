import React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Image, Text } from 'react-native-elements';
import Colors from '../constants/Colors';
// import appLogo from '../assets/images/logos/tiw-app-logo-trans.png';

export default Loading = () => {
  return (
    <SafeAreaView>
      <Image
        source={require('../assets/images/tiwHeader.png')}
        style={styles.tiwHeader}
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logos/tiw-app-logo-trans.png')}
          style={styles.appLogo}
        />

        <Text style={styles.loading}>Loading data...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    
  },
  loading: {
    color: Colors.vwgDarkGray,
    fontSize: 18
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  appLogo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  tiwHeader: {
    width: '100%',
    height: 100,
    // resizeMode: 'contain',
    marginTop: 3
  }
});
