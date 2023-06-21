import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
// import * as Permissions from 'expo-permissions';
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { differenceInMinutes } from 'date-fns';
import AppNameWithLogo from '../components/AppNameWithLogo';
import OdisLinkWithStatus from '../components/OdisLinkWithStatus';
import BadgedText from '../components/BadgedText';
import Colors from '../constants/Colors';
import {
  getUserRequest,
  revalidateUserCredentials,
  signOutUserRequest,
} from '../actions/user';
import { getOdisRequest } from '../actions/odis';
import { emptyDealerToolsRequest } from '../actions/dealerTools';
import {
  getDealerWipsRequest,
  emptyDealerWipsRequest,
} from '../actions/dealerWips';
import { getNewsRequest } from '../actions/news';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpRequest, emptyLtpRequest } from '../actions/ltp';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import { selectFetchParamsObj } from '../reducers/user';
// import { setUserRequestedDemoApp } from '../actions/user';
import {
  selectBookedOutToolsForUser,
  selectDealerWipsForUser,
} from '../reducers/dealerWips';
// import Constants from 'expo-constants';
// import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';
const buttonTextColor = Colors.vwgWhite;
// var gridCellHeight = PixelRatio.getPixelSizeForLayoutSize(200);
// var gridCellWidth = PixelRatio.getPixelSizeForLayoutSize(200);
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);

export default HomeScreen = (props) => {
  const dispatch = useDispatch();
  //   const navigation = useNavigation();

  const { navigation } = props;
  const insets = useSafeArea();
  //   console.log('Constants', Constants);
  const appOS =
    Platform && Platform.OS
      ? Platform.OS === 'ios'
        ? 'ios'
        : 'android'
      : null;
  const appName =
    Constants && Constants.expoConfig && Constants.expoConfig.name
      ? Constants.expoConfig.name
      : 'Test app';
  const appEdition = appName.toLowerCase().includes('extra') ? 'extra' : 'pro';
  const storeBuildNumberAndroidPro = 30; // it is a number
  const storeBuildNumberAndroidExtra = 29; // it is a number
  const storeBuildStringIOSPro = '130'; // it is a string
  const storeBuildStringIOSExtra = '130'; // it is a string
  //   console.log(Constants);
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

  //   console.log('^^^^^^^^buildNumber is', buildNumber);
  //   console.log('IN HOME !!!!! buildNumber', buildNumber, typeof buildNumber);
  //   console.log('IN HOME !!!!! Platform', Platform);
  const isUpdateNeeded = buildNumber
    ? appOS === 'ios'
      ? appEdition === 'extra'
        ? buildNumber !== storeBuildStringIOSExtra // it is a string
          ? true
          : false
        : buildNumber !== storeBuildStringIOSPro
        ? true
        : false
      : appEdition === 'extra' // android
      ? buildNumber !== storeBuildNumberAndroidExtra // it is a number
        ? true
        : false
      : buildNumber !== storeBuildNumberAndroidPro
      ? true
      : false
    : true;
  //   const isUpdateNeeded = false;

  //   console.log(
  //     'IN HOME !!!!! buildNumber',
  //     buildNumber,
  //     typeof buildNumber,
  //     'isUpdateNeeded',
  //     isUpdateNeeded
  //   );
  // force a crash
  //const crashMe = CrashObj;

  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userError = useSelector((state) => state.user.error);
  const userName = useSelector((state) => state.user.userName);
  //   console.log('IN HOME !!!!! 1f');
  const userIntId = useSelector((state) => state.user.userIntId);

  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const showingDemoApp = false;
  const showingUpdateAppPrompt = true;

  //   console.log('IN HOME !!!!! 1g');

  //   const userPin = useSelector((state) => state.user.userPin);
  //   const userBrand = useSelector((state) => state.user.userBrand);
  const dealerName = useSelector((state) => state.user.dealerName);
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const unseenCriticalNews = useSelector(
    (state) => state.news.unseenCriticalNews
  );
  const userBookedOutTools = useSelector(selectBookedOutToolsForUser);
  const userWipsItems = useSelector(selectDealerWipsForUser);
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingWips = useSelector((state) => state.dealerWips.isLoading);
  const isLoadingOdis = useSelector((state) => state.odis.isLoading);
  const isLoadingNews = useSelector((state) => state.news.isLoading);
  const isLoadingLtp = useSelector((state) => state.ltp.isLoading);
  const isLoadingLtpLoans = useSelector((state) => state.ltpLoans.isLoading);
  const isLoadingCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.isLoading
  );
  const serviceMeasuresRedCount = useSelector(
    (state) => state.serviceMeasures.redCount
  );
  const serviceMeasuresAmberCount = useSelector(
    (state) => state.serviceMeasures.amberCount
  );
  const calibrationExpiryRedCount = useSelector(
    (state) => state.calibrationExpiry.redCount
  );
  const calibrationExpiryAmberCount = useSelector(
    (state) => state.calibrationExpiry.amberCount
  );
  const ltpLoansRedCount = useSelector((state) => state.ltpLoans.redCount);
  const ltpLoansAmberCount = useSelector((state) => state.ltpLoans.amberCount);
  const odisChangesToHighlight = useSelector(
    (state) => state.odis.changesToHighlight
  );
  const odisRedCount = useSelector((state) => state.odis.redCount);
  const [ltpLoansTotalAlertCount, setLtpLoansTotalAlertCount] = useState(0);
  const [notificationsRedCount, setNotificationsRedCount] = useState(0);
  const [notificationsAmberCount, setNotificationsAmberCount] = useState(0);
  const [notificationsTotalAlertCount, setNotificationsTotalAlertCount] =
    useState(0);
  const [isCheckingAppVersion, setIsCheckingAppVersion] = useState(false);
  const [isUpdatingAppVersion, setIsUpdatingAppVersion] = useState(false);
  const [shouldCheckAppVersion, setShouldCheckAppVersion] = useState(false);
  const [timeCheckedAppVersion, setTimeCheckedAppVersion] = useState(null);
  const [isAppUpdated, setIsAppUpdated] = useState(false);
  const [showReloadDialogue, setShowReloadDialogue] = useState(false);
  const [isLoadingAny, setIsLoadingAny] = useState(false);

  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles({ ...windowDim });

  //   console.log('windowDim', windowDim);

  //   console.log('IN HOME !!!!!  2');

  const getAllItems = useCallback(
    (fetchParamsObj) => {
      if (
        fetchParamsObj &&
        fetchParamsObj.userIntId &&
        fetchParamsObj.userIntId
      ) {
        dispatch(
          getUserRequest({
            userIntId: fetchParamsObj.userIntId,
          })
        );
        dispatch(getDealerWipsRequest(fetchParamsObj));
        dispatch(getServiceMeasuresRequest(fetchParamsObj));
        dispatch(getLtpLoansRequest(fetchParamsObj));
        dispatch(getOdisRequest(fetchParamsObj));
        dispatch(getNewsRequest());
        dispatch(getCalibrationExpiryRequest(fetchParamsObj));
        dispatch(getLtpRequest(fetchParamsObj));
      }
    },
    [fetchParamsObj]
  );
  const getLtpItems = useCallback(
    (fetchParamsObj) => {
      if (
        fetchParamsObj &&
        fetchParamsObj.userIntId &&
        fetchParamsObj.userIntId
      ) {
        dispatch(getLtpRequest(fetchParamsObj));
      }
    },
    [fetchParamsObj]
  );

  //   console.log('IN HOME !!!!! brand', userBrand);
  //   const notificationLimit = 168;
  //   console.log('IN HOME !!!!! 3');

  //   useEffect(() => {
  //     registerDeviceForPushNotificationsAsync().then((token) =>
  //       setExponentPushToken(token)
  //     );

  //     notificationListener.current =
  //       Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //       });

  //     responseListener.current =
  //       Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(response);
  //       });

  //     return () => {
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     };
  //   }, []);

  useEffect(() => {
    // runs only once as LTP doesnt change too often
    // will run again, though, if the user fetchParamsObj wasn't ready before
    // console.log(
    //   'home - ltp useEffect',
    //   fetchParamsObj && fetchParamsObj.userIntId
    // );
    getLtpItems();
  }, [fetchParamsObj]);

  useEffect(() => {
    if (
      isLoadingUser ||
      isLoadingOdis ||
      isLoadingNews ||
      isLoadingWips ||
      isLoadingCalibrationExpiry ||
      isLoadingLtpLoans ||
      isLoadingLtp
    ) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [
    isLoadingUser,
    isLoadingOdis,
    isLoadingNews,
    isLoadingWips,
    isLoadingCalibrationExpiry,
    isLoadingLtpLoans,
    isLoadingLtp,
  ]);

  const getUpdatesAsync = async () => {
    //   console.log('in home screen getUpdatesAsync');
    try {
      // const update = await Updates.checkForUpdateAsync(listener(event));
      const update = await Updates.checkForUpdateAsync();
      //   console.log(update && update);
      if (update.isAvailable) {
        //   console.log('updateAvailable', update && update);
        setIsCheckingAppVersion(false);
        setIsUpdatingAppVersion(true);
        setShowReloadDialogue(true);
        await Updates.fetchUpdateAsync();
        Updates.reloadAsync();
      } else {
        getAllItems();
        setIsCheckingAppVersion(false);
        setShowReloadDialogue(false);
      }
    } catch (e) {
      setIsCheckingAppVersion(false);
      setIsUpdatingAppVersion(false);
      //   console.log('updateAvailable error', e);
    }
  };

  const checkAppUpdates = () => {
    const now = Date.now();
    // console.log('timeCheckedAppVersion', timeCheckedAppVersion);
    // console.log(
    //   'in checkAppUpdates now',
    //   now,
    //   'time checked',
    //   timeCheckedAppVersion,
    //   differenceInMinutes(now, timeCheckedAppVersion)
    // );
    if (timeCheckedAppVersion) {
      setShouldCheckAppVersion(true);

      if (differenceInMinutes(now, timeCheckedAppVersion) > 10) {
        setTimeCheckedAppVersion(now);
        setIsCheckingAppVersion(true);
        getUpdatesAsync();
      } else {
        setIsCheckingAppVersion(false);
        dispatch(revalidateUserCredentials('HomeScreen'));
        getAllItems();
      }
    } else {
      //   console.log('no timeCheckedAppVersion', timeCheckedAppVersion);
      //   console.log('timeCheckedAppVersion now', now);
      setTimeCheckedAppVersion(now);
      //   console.log('timeCheckedAppVersion', timeCheckedAppVersion);
      setIsCheckingAppVersion(true);
      //   console.log('isCheckingAppVersion', isCheckingAppVersion);
      //   console.log('calling getUpdatesAsync');
      getUpdatesAsync();
    }
  };

  const requestSignOutHandler = useCallback(() => {
    // console.log('in homescreen requestSignOutHandler');
    // console.log('signingOut');
    dispatch(emptyDealerWipsRequest());
    dispatch(emptyDealerToolsRequest());
    // dispatch(signOutUserRequest()), [userIsValidated];
    dispatch(emptyLtpRequest());
    dispatch(signOutUserRequest({ calledBy: 'HomeScreen' }));
    // navigation.navigate('AuthLoading');
  });

  //   console.log('IN HOME !!!!!  5');

  //   useEffect(() => {
  //     // console.log(
  //     //   'in home useEffect fetchParamsObj is:  ',
  //     //   fetchParamsObj && fetchParamsObj,
  //     //   userWipsItems && userWipsItems
  //     // );

  //     // setWipsCount((userWipsItems && userWipsItems.length) || 0);

  //     const buildBookedOutToolsArrForJob = (wip) => {
  //       const thisWipsToolsArr = wip.tools.map((tool) => ({
  //         ...tool,
  //         wipNumber: wip.wipNumber,
  //         wipId: wip.id.toString(),
  //         wipCreatedDate: wip.createdDate,
  //       }));
  //       return thisWipsToolsArr;
  //     };
  //     const buildBookedOutToolsArr = (wips) => {
  //       let allToolsArr = [];

  //       wips.forEach((wip) => {
  //         if (wip.tools && wip.tools.length > 0) {
  //           let wipToolsArr = buildBookedOutToolsArrForJob(wip);
  //           allToolsArr.push(...wipToolsArr);
  //         }
  //       });
  //       return allToolsArr;
  //     };

  //     let bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
  //     console.log(
  //       'in home useEffect bookedOutToolItems is:  ',
  //       bookedOutToolItems && bookedOutToolItems.length
  //     );
  //     setBookedOutToolsCount(
  //       (bookedOutToolItems && bookedOutToolItems.length) || 0
  //     );
  //   }, [userWipsItems.length]);

  const gridRows = 8;

  const openAppStore = () => {
    const androidAppLinkPro =
      'market://details?id=com.helpfulconsultants.pocketinfowebpro';
    const androidAppLinkExtra =
      'market://details?id=com.helpfulconsultants.pocketinfowebextra';
    const iosAppLinkPro =
      'itms-apps://apps.apple.com/gb/app/pocket-infoweb/id1488802249';
    const iosAppLinkExtra =
      'itms-apps://apps.apple.com/gb/app/pocket-infoweb-extra/id1552850825';
    const appOS =
      Platform && Platform.OS
        ? Platform.OS === 'ios'
          ? 'ios'
          : 'android'
        : null;
    const appLink =
      appOS === 'ios'
        ? appEdition === 'extra'
          ? iosAppLinkExtra
          : iosAppLinkPro
        : appEdition === 'extra'
        ? androidAppLinkExtra
        : androidAppLinkPro;
    // console.log('appOS is', appOS);
    // console.log('appLink is', appLink);

    Linking.canOpenURL(appLink).then(
      (supported) => {
        // console.log('open to link', appLink);
        supported && Linking.openURL(appLink);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    //   console.log(
    //     'in home useEffect LtpLoansCounts',
    //     ltpLoansAmberCount,
    //     ltpLoansRedCount
    //   );
    const tempNotifiableOdisRedCount =
      typeof odisRedCount === 'number' && odisRedCount > 0 ? 1 : 0;
    const tempNotifiableCalibrationExpiryRedCount =
      typeof calibrationExpiryRedCount === 'number' &&
      calibrationExpiryRedCount > 0
        ? calibrationExpiryRedCount
        : 0;
    const tempNotifiableServiceMeasuresRedCount =
      typeof serviceMeasuresRedCount === 'number' && serviceMeasuresRedCount > 0
        ? serviceMeasuresRedCount
        : 0;
    const tempNotifiableLtpLoansRedCount =
      typeof ltpLoansRedCount === 'number' && ltpLoansRedCount > 0
        ? ltpLoansRedCount
        : 0;

    setNotificationsRedCount(
      tempNotifiableOdisRedCount +
        tempNotifiableCalibrationExpiryRedCount +
        tempNotifiableLtpLoansRedCount +
        tempNotifiableServiceMeasuresRedCount
    );

    const tempNotifiableCalibrationExpiryAmberCount =
      typeof calibrationExpiryAmberCount === 'number' &&
      calibrationExpiryAmberCount > 0
        ? calibrationExpiryAmberCount
        : 0;
    const tempNotifiableLtpLoansAmberCount =
      typeof ltpLoansAmberCount === 'number' && ltpLoansAmberCount > 0
        ? ltpLoansAmberCount
        : 0;

    const tempNotifiableServiceMeasuresAmberCount =
      typeof serviceMeasuresAmberCount === 'number' &&
      serviceMeasuresAmberCount > 0
        ? serviceMeasuresAmberCount
        : 0;
    setNotificationsAmberCount(
      tempNotifiableCalibrationExpiryAmberCount +
        tempNotifiableLtpLoansAmberCount +
        tempNotifiableServiceMeasuresAmberCount +
        odisChangesToHighlight
    );
    setNotificationsTotalAlertCount(
      tempNotifiableCalibrationExpiryRedCount +
        tempNotifiableLtpLoansRedCount +
        tempNotifiableServiceMeasuresRedCount +
        tempNotifiableCalibrationExpiryAmberCount +
        tempNotifiableLtpLoansAmberCount +
        tempNotifiableServiceMeasuresAmberCount
    );
    setLtpLoansTotalAlertCount(
      tempNotifiableLtpLoansRedCount + tempNotifiableLtpLoansAmberCount
    );
  }, [
    calibrationExpiryRedCount,
    calibrationExpiryAmberCount,
    ltpLoansRedCount,
    ltpLoansAmberCount,
    serviceMeasuresRedCount,
    serviceMeasuresAmberCount,
    odisChangesToHighlight,
    odisRedCount,
    showingDemoData,
  ]);

  useFocusEffect(
    useCallback(() => {
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      //   console.log('in home useFocusEffect');

      getAllItems();
      checkAppUpdates();
      if (__DEV__) {
        // console.log('no update check because DEV');
        setShouldCheckAppVersion(false);
        dispatch(revalidateUserCredentials({ calledBy: 'HomeScreen' }));
        getAllItems();
      } else {
        setShouldCheckAppVersion(true);
        checkAppUpdates();
      }
    }, [getAllItems])
  );

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
      }}
    >
      <ScrollView
        style={baseStyles.containerFlex}
        contentContainerStyle={{
          ...baseStyles.containerFlexCentredJustfied,
          height: '100%',
        }}
      >
        <AppNameWithLogo appName={appName} />
        {1 === 2 && showingDemoApp && !isUpdateNeeded ? (
          <Text
            style={{
              ...baseStyles.textExtraApp,
              color: Colors.vwgCoolOrange,
            }}
          >
            Showing proposed new features
          </Text>
        ) : null}

        {isUpdateNeeded ? (
          <Text
            style={{
              ...baseStyles.textUpdateApp,
              color: Colors.vwgCoolOrange,
            }}
            onPress={openAppStore}
          >
            Press here to update app in app store
          </Text>
        ) : null}

        <View style={baseStyles.containerFlexCentredJustfiedGrow}>
          {showReloadDialogue === true ? (
            <View>
              <Text style={baseStyles.textSmall}>
                There is a new version of this app.
              </Text>
              <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />

              <Text style={baseStyles.textSmall}>Updating...</Text>
            </View>
          ) : (
            <View>
              <View
                style={{
                  ...baseStyles.viewRowFlexCentreJustifiedAligned,
                  marginVertical: gridRows && gridRows === 8 ? 2 : 5,
                }}
              >
                {shouldCheckAppVersion ? (
                  //prod mode
                  isCheckingAppVersion ? (
                    <Text style={baseStyles.textSmallColouredCentred}>
                      Checking you have the latest app version...
                    </Text>
                  ) : isLoadingAny ? (
                    <Text style={baseStyles.textSmallColouredCentred}>
                      Syncing your data...
                    </Text>
                  ) : (
                    // dummy to keep layout
                    <Text
                      style={{
                        ...baseStyles.textSmallColouredCentred,
                        color: Colors.vwgWhite,
                        opacity: 1,
                      }}
                    >
                      .
                    </Text>
                  )
                ) : isLoadingAny ? (
                  //dev mode - no OTA app refressh
                  <Text style={baseStyles.textSmallColouredCentred}>
                    Syncing your data...
                  </Text>
                ) : (
                  // dummy to keep layout
                  <Text
                    style={{
                      ...baseStyles.textSmallColouredCentred,
                      color: Colors.vwgWhite,
                      opacity: 1,
                    }}
                  >
                    .
                  </Text>
                )}
              </View>
              <View style={baseStyles.containerFlexCentredJustfied}>
                <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('WipTabs', { screen: 'Find Tools' })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'build' : 'build'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <Text style={baseStyles.textHomeGridCell}>
                        Find Tools
                      </Text>
                    </View>
                  </Touchable>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('WipTabs', { screen: 'My Jobs' })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'clipboard' : 'clipboard'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <Text style={baseStyles.textHomeGridCell}>
                        {`My Jobs`}
                        {userWipsItems && userWipsItems.length > 0 ? (
                          <Text style={baseStyles.textHomeGridCellCount}>
                            {` (${userWipsItems.length})`}
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('WipTabs', {
                        screen: 'Booked Tools',
                      })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={
                          Platform.OS === 'ios'
                            ? 'return-down-back'
                            : 'return-down-back'
                        }
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      {userBookedOutTools && userBookedOutTools.length > 0 ? (
                        <View>
                          <Text
                            style={{
                              ...baseStyles.textHomeGridCell,
                              marginTop: -6,
                            }}
                          >{`Booked`}</Text>
                          <Text style={baseStyles.textHomeGridCell}>
                            {`Tools`}
                            <Text style={baseStyles.textHomeGridCellCount}>
                              {` (${userBookedOutTools.length})`}
                            </Text>
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={baseStyles.textHomeGridCell}
                        >{`Booked Tools`}</Text>
                      )}
                    </View>
                  </Touchable>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('WipTabs', { screen: 'Loan Tools' })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={
                          Platform.OS === 'ios'
                            ? 'swap-horizontal'
                            : 'swap-horizontal'
                        }
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <Text style={baseStyles.textHomeGridCell}>
                        Loan Tool List
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {
                  <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                    <Touchable
                      style={baseStyles.viewHomeGridCell}
                      onPress={() =>
                        navigation.navigate('RemindersTabs', {
                          screen: 'Alerts',
                        })
                      }
                    >
                      <View style={baseStyles.viewColumnFlexCentre}>
                        <Ionicons
                          name={
                            Platform.OS === 'ios'
                              ? 'alert-circle'
                              : 'alert-circle'
                          }
                          type='ionicon'
                          color={buttonTextColor}
                          size={iconSize}
                        />
                        <BadgedText
                          showBadge={
                            (typeof notificationsRedCount === 'number' &&
                              notificationsRedCount > 0) ||
                            (notificationsAmberCount &&
                              notificationsAmberCount > 0)
                          }
                          focused={false}
                          text={'Alerts'}
                          value={
                            (typeof notificationsRedCount === 'number' &&
                              notificationsRedCount > 0) ||
                            (typeof notificationsAmberCount === 'number' &&
                              notificationsAmberCount > 0)
                              ? '+'
                              : null
                          }
                          showSevereAlert={
                            typeof notificationsRedCount === 'number' &&
                            notificationsRedCount > 0
                              ? true
                              : false
                          }
                        />
                      </View>
                    </Touchable>
                    <Touchable
                      style={baseStyles.viewHomeGridCell}
                      onPress={() =>
                        navigation.navigate('RemindersTabs', {
                          screen: 'LTP Loans',
                        })
                      }
                    >
                      <View style={baseStyles.viewColumnFlexCentre}>
                        <Ionicons
                          name={Platform.OS === 'ios' ? 'calendar' : 'calendar'}
                          type='ionicon'
                          color={buttonTextColor}
                          size={iconSize}
                        />
                        <BadgedText
                          showBadge={
                            (typeof ltpLoansRedCount === 'number' &&
                              ltpLoansRedCount > 0) ||
                            (typeof ltpLoansAmberCount === 'number' &&
                              ltpLoansAmberCount > 0)
                              ? '+'
                              : 0
                          }
                          focused={false}
                          text={'LTP Loans'}
                          value={
                            (typeof ltpLoansRedCount === 'number' &&
                              ltpLoansRedCount > 0) ||
                            (typeof ltpLoansAmberCount === 'number' &&
                              ltpLoansAmberCount > 0)
                              ? '+'
                              : null
                          }
                          showSevereAlert={ltpLoansRedCount > 0 ? true : false}
                        />
                      </View>
                    </Touchable>
                  </View>
                }
                <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('NewsTabs', {
                        screen: 'News',
                      })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'document' : 'document'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={
                          typeof unseenCriticalNews === 'number' &&
                          unseenCriticalNews > 0
                            ? 1
                            : 0
                        }
                        focused={false}
                        text={'News'}
                        value={
                          typeof unseenCriticalNews === 'number' &&
                          unseenCriticalNews > 0
                            ? '+'
                            : null
                        }
                        showSevereAlert={true}
                      />
                    </View>
                  </Touchable>

                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('NewsTabs', { screen: 'Elsa2Go' })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={
                          Platform.OS === 'ios'
                            ? 'phone-portrait'
                            : 'phone-portrait'
                        }
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={false}
                        focused={false}
                        text={'Elsa2Go'}
                        value={'+'}
                      />
                    </View>
                  </Touchable>
                </View>
              </View>

              <View
                style={{
                  ...baseStyles.viewRowFlexCentreJustifiedAligned,
                  marginTop: gridRows && gridRows === 8 ? 6 : 10,
                }}
              >
                <OdisLinkWithStatus
                  navigation={navigation}
                  showAlert={odisChangesToHighlight}
                  showSevereAlert={odisRedCount}
                />
              </View>

              <View
                style={{
                  marginTop: gridRows && gridRows === 8 ? 3 : 8,
                  marginHorizontal: 20,
                }}
              >
                <Text style={baseStyles.textSignedIn}>
                  {userIsValidated
                    ? `Signed in as ${userName}`
                    : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
                </Text>
                <Text style={baseStyles.textSignedInSmall}>
                  {userIsValidated ? `${dealerName}` : null}
                </Text>
              </View>
              <Touchable
                style={{ marginTop: 0 }}
                onPress={() => requestSignOutHandler()}
              >
                <View
                  style={{
                    ...baseStyles.viewRowFlexCentreJustifiedAligned,
                    marginTop: 5,
                  }}
                >
                  <Ionicons
                    name={
                      Platform.OS === 'ios'
                        ? 'log-out-outline'
                        : 'log-out-outline'
                    }
                    type='ionicon'
                    size={20}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text
                    style={baseStyles.textLargeColouredCentred}
                  >{` Sign out to change user`}</Text>
                </View>
              </Touchable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
