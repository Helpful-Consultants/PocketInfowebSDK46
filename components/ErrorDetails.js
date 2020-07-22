import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

export default ErrorDetails = (props) => {
  const {
    errorSummary,
    errorDetails,
    errorHtml,
    dataStatusCode,
    dataErrorUrl,
  } = props;

  const userDataObj = useSelector((state) => state.user.userData[0]);
  //   console.log(props);
  return (
    <View>
      <View style={styles.errorMessage}>
        <Text style={styles.errorMessageText}>
          If refreshing doesn't fix the problem, please check your phone has
          internet access.
        </Text>
        <Text style={styles.errorMessageText}>
          If you need report this error, please take a picture of this screen
          because the details on it might help the team fix the problem for you.
          Thanks.
        </Text>
      </View>
      <View style={styles.errorMessage}>
        {errorSummary ? (
          <Text style={styles.errorMessageSummaryText}>{errorSummary}</Text>
        ) : null}
        {errorDetails ? (
          <Text style={styles.errorMessageText}>{errorDetails}</Text>
        ) : null}
        {dataStatusCode ? (
          dataStatusCode === 408 ? (
            <Text style={styles.errorMessageText}>
              You are not connected to the internet.
            </Text>
          ) : (
            <Text
              style={styles.errorMessageText}
            >{`Code: ${dataStatusCode}`}</Text>
          )
        ) : null}
        {!dataStatusCode || (dataStatusCode && dataStatusCode !== '999') ? (
          dataErrorUrl ? (
            <Text
              style={styles.errorMessageText}
            >{`URL: ${dataErrorUrl}`}</Text>
          ) : null
        ) : null}
      </View>
      <View style={styles.errorMessage}>
        <Text style={styles.errorMessageText}>{Constants.manifest.name}</Text>
        <Text style={styles.errorMessageText}>
          {`Build `}
          {Constants.nativeAppVersion ? `${Constants.nativeAppVersion}/` : null}
          {Constants.manifest.version
            ? `${Constants.manifest.version} OTA`
            : null}
          {Constants.manifest.releaseChannel
            ? Constants.manifest.releaseChannel
              ? Constants.manifest.releaseChannel === 'default'
                ? ' (Prod)'
                : ' (Staging)'
              : null
            : null}
        </Text>

        {Platform && Platform.OS === 'ios' ? (
          Constants && Constants.deviceName ? (
            <Text style={styles.errorMessageText}>
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
        ) : (
          <Text style={styles.errorMessageText}>
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
        )}

        {Platform && Platform.constants && Platform.constants.Model ? (
          <Text style={styles.errorMessageText}>
            {`Model ${Platform.constants.Model}`}
          </Text>
        ) : null}
      </View>

      {userDataObj ? (
        <View style={styles.errorMessage}>
          {userDataObj.userName ? (
            <Text style={styles.errorMessageText}>{userDataObj.userName}</Text>
          ) : null}
          {userDataObj.dealerName ? (
            <Text style={styles.errorMessageText}>
              {userDataObj.dealerName}
            </Text>
          ) : null}
          {userDataObj.dealerId ? (
            <Text style={styles.errorMessageText}>{userDataObj.dealerId}</Text>
          ) : null}
        </View>
      ) : null}

      {!dataStatusCode || (dataStatusCode && dataStatusCode !== '999') ? (
        errorHtml ? (
          <View style={styles.errorMessage}>
            <HTML html={errorHtml} containerStyle={styles.errorMessage} />
          </View>
        ) : null
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
  },
  errorMessage: {
    padding: 5,
  },
  errorMessageText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.7),
    textAlign: 'left',
    color: Colors.vwgVeryDarkGrey,
  },
  errorMessageSummaryText: {
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.9),
    textAlign: 'left',
    color: Colors.vwgVeryDarkGrey,
  },
});
