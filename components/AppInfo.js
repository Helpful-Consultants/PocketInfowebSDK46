import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import moment from 'moment';
// import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import { useMediaQuery } from 'react-responsive';
import appChangeInfoString from '../helpers/appChangeInfoString';
import Colors from '../constants/Colors';

const getDisplayDate = (rawDate) => {
  return (rawDate && moment(rawDate).format('Do MMM YYYY h:mm:ss a')) || '';
};

export default AppInfo = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const odisFetchTime = useSelector((state) => state.odis.fetchTime);
  //   const brandText =
  //     (userDataObj && userDataObj.brand) || (userDataObj && 'All brands') || '';

  const brandText = userDataObj
    ? userDataObj.brand
      ? userDataObj.brand
      : 'All brands'
    : '';
  //   console.log('AppInfo props, userDataObj', userDataObj && userDataObj);
  //   console.log('Platform', Platform);
  //   console.log('Constants', Constants);

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
    // alternatively...
    //   query: '(max-device-width: 1224px)'
  });

  //   console.log(
  //     '!!!!!!!!!!!! isTabletOrMobileDevice',
  //     isTabletOrMobileDevice && isTabletOrMobileDevice
  //   );
  return (
    <View
      style={{
        ...baseStyles.container,
        marginTop: 'auto',
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.panelTextAppName}>{Constants.manifest.name}</Text>
      {Constants.manifest.name &&
      Constants.manifest.name === 'Pocket Infoweb Extra'
        ? null
        : null}
      {userDataObj && userDataObj.userName ? (
        <Text style={baseStyles.panelTextBrand}>
          {(userDataObj && userDataObj.userName) || null}
        </Text>
      ) : null}
      <Text style={baseStyles.panelTextBrand}>{brandText}</Text>
      {odisFetchTime ? (
        <Text style={baseStyles.panelTextAppInfo}>
          {`Last data refresh: ${getDisplayDate(odisFetchTime)}`}
        </Text>
      ) : null}
      {Platform && Platform.OS === 'ios' ? (
        Constants && Constants.deviceName ? (
          <Text style={baseStyles.panelTextAppInfo}>
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
        <Text style={baseStyles.panelTextAppInfo}>
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
      <Text style={baseStyles.panelTextAppInfo}>
        {`Build `}
        {Constants.manifest.sdkVersion
          ? `${Constants.manifest.sdkVersion}/`
          : null}
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
          style={baseStyles.panelTextAppInfo}
        >{`Model ${Platform.constants.Model}`}</Text>
      ) : null}
      <Text style={baseStyles.panelTextAppInfo}>{appChangeInfoString}</Text>
    </View>
  );
};

{
  /* <Text
  style={{
    ...baseStyles.panelTextBrand,
    color: Colors.vwgCoolOrange,
    fontFamily: 'the-sans',
  }}
>
  Showing new features
</Text>; */
}
