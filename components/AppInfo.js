import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
// import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import { useMediaQuery } from 'react-responsive';

export default AppInfo = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  //   const brandText =
  //     (userDataObj && userDataObj.brand) || (userDataObj && 'All brands') || '';

  const brandText = userDataObj
    ? userDataObj.brand
      ? userDataObj.brand
      : 'All brands'
    : '';
  console.log('AppInfo props, userDataObj', userDataObj && userDataObj);
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
    <View style={baseStyles.containerFlex}>
      <Text style={baseStyles.panelTextAppName}>{Constants.manifest.name}</Text>
      {Constants.manifest.name &&
      Constants.manifest.name === 'Pocket Infoweb Extra' ? (
        <Text style={baseStyles.panelTextBrand}>Showing new features</Text>
      ) : null}
      {userDataObj && userDataObj.userName ? (
        <Text style={baseStyles.panelTextBrand}>
          {(userDataObj && userDataObj.userName) || null}
        </Text>
      ) : null}
      <Text style={baseStyles.panelTextBrand}>{brandText}</Text>

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
      <Text style={baseStyles.panelTextAppInfo}>Changes: 2 new features</Text>
    </View>
  );
};
