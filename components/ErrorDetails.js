import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';

export default ErrorDetails = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const {
    errorSummary,
    errorDetails,
    errorHtml,
    dataStatusCode,
    dataErrorUrl,
  } = props;
  const appName =
    Constants && Constants.expoConfig && Constants.expoConfig.name
      ? Constants.expoConfig.name
      : 'Test app';
  const appEdition = appName.toLowerCase().includes('extra') ? 'extra' : 'pro';
  const appOS =
    typeof Platform !== 'undefined' &&
    Platform &&
    typeof Platform.OS !== 'undefined' &&
    Platform.OS
      ? Platform.OS === 'ios'
        ? 'ios'
        : 'android'
      : null;
  const sdkVersion =
    Constants && Constants.expoConfig && Constants.expoConfig.sdkVersion
      ? Constants.expoConfig.sdkVersion
      : null;
  console.log(
    'Constants.expoConfig.sdkVersion',
    Constants.expoConfig.sdkVersion
  );
  console.log('sdkVersion', sdkVersion);
  const appVersion =
    Constants && Constants.expoConfig && Constants.expoConfig.version
      ? Constants.expoConfig.version
      : null;
  console.log('Constants.expoConfig.version', Constants.expoConfig.version);
  console.log('appVersion', appVersion);

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

  const channel = Updates && Updates.channel ? Updates.channel : null;
  const isUpdatedOTA = Updates
    ? Updates.isEmbeddedLaunch
      ? false
      : true
    : false;

  //   console.log('in ErrorDetails', props);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  //   console.log(props);
  return (
    <View>
      <View style={baseStyles.viewPaddedLeft}>
        <Text style={baseStyles.textLeftAlignedSmall}>
          Data problem. If refreshing doesn't fix the problem, please check your
          phone has internet access.
        </Text>
        <Text style={baseStyles.textLeftAlignedSmall}>
          If you need report this error, please take a picture of this screen
          because the details on it might help the team fix the problem for you.
          Thanks.
        </Text>
      </View>
      <View style={baseStyles.viewPaddedLeft}>
        {errorSummary ? (
          <Text style={baseStyles.textLeftAlignedSmall}>{errorSummary}</Text>
        ) : null}
        {errorDetails ? (
          <Text style={baseStyles.textLeftAlignedSmall}>{errorDetails}</Text>
        ) : null}
        {dataStatusCode ? (
          dataStatusCode === 408 ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              You are not connected to the internet.
            </Text>
          ) : (
            <Text
              style={baseStyles.textLeftAlignedSmall}
            >{`Code: ${dataStatusCode}`}</Text>
          )
        ) : null}
        {!dataStatusCode || (dataStatusCode && dataStatusCode !== '999') ? (
          dataErrorUrl ? (
            <Text
              style={baseStyles.textLeftAlignedSmall}
            >{`URL: ${dataErrorUrl}`}</Text>
          ) : null
        ) : null}
      </View>
      <View style={baseStyles.viewPaddedLeft}>
        <Text style={baseStyles.textLeftAlignedSmall}>{appName}</Text>
        <Text style={baseStyles.textLeftAlignedSmall}>
          {`Build `}
          {sdkVersion ? `${sdkVersion}` : null}
          {buildNumber ? `/${buildNumber}` : null}
          {appVersion ? `/${appVersion}` : null}
          {channel ? `/${channel}` : null}
          {isUpdatedOTA ? '/OTA' : null}
        </Text>

        {Platform && Platform.OS === 'ios' ? (
          Constants && Constants.deviceName ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              {Platform.Version ? (
                <Text>
                  {Device && Device.modelName ? `${Device.modelName} ` : null}
                  {`${Platform.constants.systemName} v${Platform.Version}`}
                </Text>
              ) : null}
            </Text>
          ) : null
        ) : (
          <Text style={baseStyles.textLeftAlignedSmall}>
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
      </View>

      {userDataObj ? (
        <View style={baseStyles.viewPaddedLeft}>
          {userDataObj.userName ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              {userDataObj.userName}
            </Text>
          ) : null}
          {userDataObj.dealerName ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              {userDataObj.dealerName}
            </Text>
          ) : null}
          {userDataObj.dealerId ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              {userDataObj.dealerId}
            </Text>
          ) : null}
        </View>
      ) : null}

      {!dataStatusCode || (dataStatusCode && dataStatusCode !== '999') ? (
        errorHtml ? (
          <View style={baseStyles.viewPaddedLeft}>
            <HTML
              source={{ html: errorHtml }}
              containerStyle={baseStyles.textLeftAlignedSmall}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
};
