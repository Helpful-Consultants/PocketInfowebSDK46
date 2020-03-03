import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

export default AppInfo = props => {
  const userDataObj = useSelector(state => state.user.userData[0]);
  const brandText =
    (userDataObj && userDataObj.brand) || (userDataObj && 'All brands') || '';
  //   console.log(props);
  //   console.log('Platform', Platform);
  //   console.log('Constants', Constants);
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{Constants.manifest.name}</Text>
      {userDataObj && userDataObj.userName ? (
        <Text style={styles.brand}>{userDataObj.userName}</Text>
      ) : null}
      <Text style={styles.brand}>{brandText}</Text>

      {Platform && Platform.OS === 'ios' ? (
        Constants && Constants.deviceName ? (
          <Text style={styles.deviceVersion}>
            {Platform.Version ? (
              <Text>
                {`${Platform.constants.systemName} v${Platform.Version}`}
                {Constants.nativeBuildVersion
                  ? ` Store v${Constants.nativeBuildVersion}`
                  : null}
              </Text>
            ) : null}
          </Text>
        ) : null
      ) : Constants && Constants.deviceName ? (
        <Text style={styles.deviceVersion}>
          {Platform && Platform.Version ? (
            <Text>
              {Platform && Platform.OS === 'android'
                ? `Android`
                : `${Platform.OS}`}
              {` v${Platform.Version}`}
              {Constants.nativeBuildVersion
                ? ` Store v${Constants.nativeBuildVersion}`
                : null}
            </Text>
          ) : null}
        </Text>
      ) : null}

      <Text style={styles.appVersion}>
        {`Build `}
        {Constants.nativeAppVersion ? `${Constants.nativeAppVersion}/` : null}
        {Constants.manifest.version
          ? `${Constants.manifest.version} OTA`
          : null}
        {Constants.manifest.releaseChannel
          ? Constants.manifest.releaseChannel === 'default' ||
            Constants.manifest.releaseChannel === 'ios' ||
            Constants.manifest.releaseChannel === 'android'
            ? ' (Prod)'
            : Constants.manifest.releaseChannel === 'ios-staging' ||
              Constants.manifest.releaseChannel === 'android-staging' ||
              Constants.manifest.releaseChannel === 'staging'
            ? ' (Staging)'
            : ` (${Constants.manifest.releaseChannel})`
          : null}
      </Text>
      {Platform && Platform.constants && Platform.constants.Model ? (
        <Text
          style={styles.appVersion}
        >{`Model ${Platform.constants.Model}`}</Text>
      ) : null}
      <Text style={styles.appVersion}>Bug fix for news</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-end',
    // backgroundColor: 'red'
  },
  appName: {
    paddingTop: 100,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(2.2)
    // fontStyle: 'italic'
  },
  brand: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.9)
    // fontStyle: 'italic'
  },
  appVersion: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  },
  deviceVersion: {
    paddingTop: 15,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  }
});
