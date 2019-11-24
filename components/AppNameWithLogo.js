import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
// import appLogo from '../assets/images/logos/tiw-app-logo-trans.png';

export default AppNameWithLogo = () => {
  return (
    <View>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logos/tiw-app-logo-trans.png')}
          style={styles.appLogo}
        />
        <Text style={styles.appName}>Pocket Infoweb</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appName: {
    color: Colors.vwgBlack,
    fontSize: RFPercentage(3.5)
    // textTransform: 'uppercase'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0
  },
  appLogo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3
  }
});
