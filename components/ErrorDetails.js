import React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

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

  const buildNumber =
    typeof Constants !== 'undefined' &&
    typeof Constants.manifest !== 'undefined' &&
    typeof Platform !== 'undefined'
      ? typeof Platform.OS !== 'undefined' && Platform.OS
        ? Platform.OS === 'ios'
          ? Constants.manifest.ios &&
            typeof Constants.manifest.ios.buildNumber !== 'undefined' &&
            Constants.manifest.ios.buildNumber
            ? Constants.manifest.ios.buildNumber
            : null
          : Constants.manifest.android &&
            typeof Constants.manifest.android.versionCode !== 'undefined' &&
            Constants.manifest.android.versionCode
          ? Constants.manifest.android.versionCode
          : null
        : null
      : null;

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
        <Text style={baseStyles.textLeftAlignedSmall}>
          {Constants.manifest.name}
        </Text>
        <Text style={baseStyles.textLeftAlignedSmall}>
          {`Build `}
          {Constants.manifest.sdkVersion
            ? `${Constants.manifest.sdkVersion}/`
            : null}
          {buildNumber ? `${buildNumber}/` : 'null'}
          {Application.nativeApplicationVersion
            ? `${Application.nativeApplicationVersion}/`
            : null}
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

        {Platform && Platform.OS === 'ios' ? (
          Constants && Constants.deviceName ? (
            <Text style={baseStyles.textLeftAlignedSmall}>
              {Platform.Version ? (
                <Text>
                  {Device && Device.modelName ? `${Device.modelName} ` : null}
                  {`${Platform.constants.systemName} v${Platform.Version}`}
                  {Constants.manifest.android.versionCode
                    ? ` Store v${Constants.manifest.android.versionCode}`
                    : null}
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
                {Application && Application.nativeBuildVersion
                  ? ` Store v${Application.nativeBuildVersion}`
                  : null}
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
