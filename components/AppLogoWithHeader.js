import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Colors from '../constants/Colors';
// import appLogo from '../assets/images/logos/tiw-app-logo-trans.png';

export default AppNameWithLogoAndHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logos/workShopEquipmentLogo.png')}
          style={styles.appLogo}
        />
      </View>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/tiwHeaderWithName.png')}
          style={styles.tiwHeader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0
    // backgroundColor: 'red'
  },
  appName: {
    color: Colors.vwgDeepPurple,
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tiwHeader: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0
  },
  headerContainer: {
    // flex: 1,
    // // width: '90%',
    // alignItems: 'center',
    // justifyContent: 'center'
    // marginTop: 10,
    // marginBottom: 20
  },
  appLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginTop: 3
    // marginLeft: -10
  }
});
