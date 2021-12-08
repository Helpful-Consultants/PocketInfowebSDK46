import React from 'react';
import { useSelector } from 'react-redux';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
// import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import { useMediaQuery } from 'react-responsive';
import appChangeInfoString from '../helpers/appChangeInfoString';
import { getShortDisplayDateAndTime } from '../helpers/dates';

export default AppInfo = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const odisFetchTime = useSelector((state) => state.odis.fetchTime);
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  //   console.log('8888888888888 odisFetchTime', odisFetchTime);
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
  //   console.log('AppInfo props', props);

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
      <Text style={baseStyles.panelTextAppName}>
        {Constants &&
        Constants.manifest &&
        Constants.manifest.name &&
        Constants.manifest.name === 'Pocket Infoweb Extra'
          ? 'Pocket Infoweb Extra'
          : showingDemoApp
          ? 'Pocket Infoweb'
          : 'Pocket Infoweb'}
      </Text>
      {showingDemoApp ? null : null}
      {userDataObj && userDataObj.userName ? (
        <Text style={baseStyles.panelTextBrand}>
          {(userDataObj && userDataObj.userName) || null}
        </Text>
      ) : null}
      <Text style={baseStyles.panelTextBrand}>{brandText}</Text>
      {showingDemoApp ? (
        odisFetchTime ? (
          <Text style={baseStyles.panelTextAppInfo}>
            {`Last ODIS check: ${getShortDisplayDateAndTime(odisFetchTime)}`}
          </Text>
        ) : null
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
            Constants.manifest.releaseChannel === 'android' ||
            Constants.manifest.releaseChannel === 'ios-prod' ||
            Constants.manifest.releaseChannel === 'android-prod' ||
            Constants.manifest.releaseChannel === 'prod-v2'
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
