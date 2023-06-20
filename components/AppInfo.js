import React from 'react';
import { useSelector } from 'react-redux';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
// import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
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
  const appName =
    Constants && Constants.expoConfig && Constants.expoConfig.name
      ? Constants.expoConfig.name
      : 'Test app';
  const appOS =
    Platform && Platform.OS
      ? Platform.OS === 'ios'
        ? 'ios'
        : 'android'
      : null;
  //   console.log('appOS is', appOS);
  //   console.log('Constants.expoConfig', Constants.expoConfig);
  const sdkVersion =
    Constants && Constants.expoConfig && Constants.expoConfig.sdkVersion
      ? Constants.expoConfig.sdkVersion
      : null;
  //   console.log(
  //     'Constants.expoConfig.sdkVersion',
  //     Constants.expoConfig.sdkVersion
  //   );
  //   console.log('sdkVersion', sdkVersion);
  const appVersion =
    Constants && Constants.expoConfig && Constants.expoConfig.version
      ? Constants.expoConfig.version
      : null;
  //   console.log('Constants.expoConfig.version', Constants.expoConfig.version);
  //   console.log('appVersion', appVersion);

  const buildNumber =
    Constants && Constants.expoConfig && appOS
      ? appOS === 'ios'
        ? Constants.expoConfig.ios && Constants.expoConfig.ios.buildNumber
          ? Constants.expoConfig.ios.buildNumber
          : null
        : Constants.expoConfig.android &&
          Constants.expoConfig.android.versionCode
        ? Constants.expoConfig.android.versionCode
        : null
      : null;
  const runtimeVersion =
    Constants && Constants.expoConfig && Constants.expoConfig.runtimeVersion
      ? Constants.expoConfig.runtimeVersion.toString()
      : null;
  //   console.log('Constants.expoConfig', Constants.expoConfig);
  //   console.log('appVersion', appVersion);
  //   console.log('Constants.expoConfig.ios', Constants.expoConfig.ios);
  //   console.log('buildNumber', buildNumber);

  //   console.log('runtimeVersion', runtimeVersion);

  const channel = Updates && Updates.channel ? Updates.channel : null;
  const isUpdatedOTA = Updates
    ? Updates.isEmbeddedLaunch
      ? false
      : true
    : false;

  //   console.log('Updates.channel', Updates);
  //   console.log('channel', channel);

  return (
    <View
      style={{
        ...baseStyles.container,
        marginTop: 'auto',
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.panelTextAppName}>{appName}</Text>
      {userDataObj && userDataObj.userName ? (
        <Text style={baseStyles.panelTextBrand}>
          {(userDataObj && userDataObj.userName) || null}
        </Text>
      ) : null}
      <Text style={baseStyles.panelTextBrand}>{brandText}</Text>
      {1 === 2 && showingDemoApp ? (
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
                {Device && Device.modelName ? `${Device.modelName} ` : null}
                {`${Platform.constants.systemName} v${Platform.Version}`}
              </Text>
            ) : null}
          </Text>
        ) : null
      ) : (
        <Text style={baseStyles.panelTextAppInfo}>
          {Platform && Platform.Version ? (
            <Text>
              {Device && Device.modelName ? `${Device.modelName} ` : null}
              {Platform && Platform.OS === 'android'
                ? `Android`
                : `${Platform.OS}`}
              {` v${Platform.Version}`}
            </Text>
          ) : null}
        </Text>
      )}
      <Text style={baseStyles.panelTextAppInfo}>
        {`Build `}
        {sdkVersion ? `${sdkVersion}` : null}
        {buildNumber ? `/${buildNumber}` : null}
        {appVersion ? `/${appVersion}` : null}
        {channel ? `/${channel}` : null}
        {isUpdatedOTA ? '/OTA' : null}
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
