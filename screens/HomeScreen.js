import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import AppNameWithLogo from '../components/AppNameWithLogo';
import OdisLinkWithStatus from '../components/OdisLinkWithStatus';
import BadgedText from '../components/BadgedText';
import checkForAlerts from '../helpers/checkForAlerts';
import { InfoTypes } from '../constants/InfoTypes';
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
import { getLtpRequest, emptyLtpRequest } from '../actions/ltp';
import { getLtpLoansRequest } from '../actions/ltpLoans';
// import Constants from 'expo-constants';
// import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';
const buttonTextColor = Colors.vwgWhite;
// var gridCellHeight = PixelRatio.getPixelSizeForLayoutSize(200);
// var gridCellWidth = PixelRatio.getPixelSizeForLayoutSize(200);
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);

// if (Platform.OS !== 'android') {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: false,
//       shouldPlaySound: false,
//       shouldSetBadge: true,
//     }),
//   });
// }

// await Notifications.scheduleLocalNotificationAsync({
//   title: '...',
//   body: '...',
//   ios: {count: 1},
// }, {
//   time: ...
// })

// async function getiOSNotificationPermission() {
//   console.log('in home getiOSNotificationPermission');

//   const { status } = await Notifications.requestPermissionsAsync;

//   const { status } = await Permissions.getAsync(
//     Permissions.USER_FACING_NOTIFICATIONS
//   );
//   if (status !== 'granted') {
//     await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
//   }
// }

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}
export async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: false,
      allowBadge: true,
      allowSound: false,
      allowDisplayInCarPlay: false,
      allowCriticalAlerts: false,
      provideAppNotificationSettings: false,
      allowProvisional: false,
      allowAnnouncements: false,
    },
  });
}

const showBadgeNews = checkForAlerts(InfoTypes.NEWS);
const showBadgeNotifications = checkForAlerts(InfoTypes.NOTIFICATIONS);
const showBadgeServiceMeasures = checkForAlerts(InfoTypes.SERVICE_MEASURES);
const showBadgeLtpLoans = checkForAlerts(InfoTypes.LTP_LOANS);
const showBadgeOdis = checkForAlerts(InfoTypes.ODIS);

export default HomeScreen = (props) => {
  const dispatch = useDispatch();
  //   const navigation = useNavigation();

  const { navigation } = props;
  const insets = useSafeArea();

  // force a crash
  //const crashMe = CrashObj;

  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userError = useSelector((state) => state.user.error);
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user.userId);
  //   console.log('IN HOME !!!!! 1f');
  const userIntId = useSelector((state) => state.user.userIntId);
  const userRequestedDemoData = useSelector(
    (state) => state.user.requestedDemoData
  );
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);

  //   console.log('IN HOME !!!!! 1g');
  //   const userIntId =
  //     userDataObj && userDataObj.intId ? userDataObj.intId.toString() : null;

  const userPin = useSelector((state) => state.user.userPin);
  const userBrand = useSelector((state) => state.user.userBrand);
  const dealerName = useSelector((state) => state.user.dealerName);
  const userApiFetchParamsObj = useSelector(
    (state) => state.user.userApiFetchParamsObj
  );

  const odisObj = useSelector((state) => state.odis.odisData);
  const odisViewCount = useSelector((state) => state.odis.viewCount);

  const lastUpdateNews = useSelector((state) => state.news.lastUpdate);
  const newsObj = useSelector((state) => state.news);
  const previousUpdateNews = useSelector((state) => state.news.previousUpdate);

  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);

  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingWips = useSelector((state) => state.dealerWips.isLoading);
  const isLoadingOdis = useSelector((state) => state.odis.isLoading);
  const isLoadingNews = useSelector((state) => state.news.isLoading);
  const isLoadingLtp = useSelector((state) => state.ltp.isLoading);
  const isLoadingLtpLoans = useSelector((state) => state.ltpLoans.isLoading);
  const isLoadingCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.isLoading
  );

  const [isCheckingAppVersion, setIsCheckingAppVersion] = useState(false);
  const [isUpdatingAppVersion, setIsUpdatingAppVersion] = useState(false);
  const [shouldCheckAppVersion, setShouldCheckAppVersion] = useState(false);
  const [timeCheckedAppVersion, setTimeCheckedAppVersion] = useState(null);
  const [isAppUpdated, setIsAppUpdated] = useState(false);
  const [showReloadDialogue, setShowReloadDialogue] = useState(false);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [wipsCount, setWipsCount] = useState(0);
  const [bookedOutToolsCount, setBookedOutToolsCount] = useState(0);
  const [ageOfNews, setAgeOfNews] = useState(0);

  const [isLoadingAny, setIsLoadingAny] = useState(false);

  const [newsAlertCount, setNewsAlertCount] = useState(0);
  const [ltpLoansAlertCount, setLtpLoansAlertCount] = useState(0);
  const [notificationsAlertCount, setNotificationsAlertCount] = useState(0);
  const [odisAlertCount, setOdisAlertCount] = useState(0);
  const [serviceMeasuresAlertCount, setServiceMeasuresAlertCount] = useState(0);

  const windowDim = useWindowDimensions();
  const baseStyles =
    windowDim &&
    getBaseStyles({ ...windowDim, showingDemoApp: showingDemoApp });

  //   console.log('IN HOME !!!!! showingDemoApp', showingDemoApp);
  //   console.log('windowDim', windowDim);

  //   console.log('IN HOME !!!!!  2');
  const getLtpItems = useCallback(async () => {
    dispatch(getLtpRequest());
  });

  const getAllItems = useCallback(async (userApiFetchParamsObj) => {
    dispatch(
      getUserRequest({
        intId:
          (userIntId && userIntId) ||
          (userApiFetchParamsObj &&
            userApiFetchParamsObj.intId &&
            userApiFetchParamsObj.intId) ||
          null,
      })
    );
    dispatch(getDealerWipsRequest(userApiFetchParamsObj));
    dispatch(getLtpLoansRequest(userApiFetchParamsObj));
    dispatch(getOdisRequest());
    dispatch(getNewsRequest());
    dispatch(getCalibrationExpiryRequest(userApiFetchParamsObj));
  });

  const updateItemsAsync = async () => {
    // console.log(
    //   'home - updateItemsAsync, userApiFetchParamsObj:',
    //   userApiFetchParamsObj && userApiFetchParamsObj
    // );
    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.intId.length > 0 &&
      userApiFetchParamsObj.dealerId &&
      userApiFetchParamsObj.dealerId.length > 0
    ) {
      getAllItems(userApiFetchParamsObj);
    }
  };

  const getLtpItemsAsync = async () => {
    // console.log('home - updateItemsAsync');
    getLtpItems();
  };
  //   console.log('IN HOME !!!!! brand', userBrand);
  const notificationLimit = 168;
  const now = moment();

  //   console.log('IN HOME !!!!! 3');

  //   useEffect(() => {
  //     registerForPushNotificationsAsync().then((token) =>
  //       setExpoPushToken(token)
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
    // will run again, though, if the user userApiFetchParamsObj wasn't ready before
    // console.log(
    //   'home - ltp useEffect',
    //   userApiFetchParamsObj && userApiFetchParamsObj.intId
    // );
    getLtpItemsAsync();
  }, [userApiFetchParamsObj]);

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

  //   useEffect(() => {
  //     // console.log('in this one useEffect isRefreshNeeded ', isRefreshNeeded);

  //     if (!ltpItems || ltpItems.length === 0) {
  //       // console.log('in this one useEffect - getting ltp');
  //       getLtpItemsAsync(userApiFetchParamsObj);
  //     }

  //     if (__DEV__) {
  //       // console.log('no update check because DEV');
  //       setShouldCheckAppVersion(false);
  //     } else {
  //       setShouldCheckAppVersion(true);
  //     }
  //   if (searchInput && searchInput.length > 0) {
  //     setSearchInput('');
  //   }

  // updateItemsAsync();
  // const listener = event => {
  //   if (event.type === Updates.EventType.DOWNLOAD_FINISHED) {
  //     setShowReloadDialogue(true);

  //    Updates.reloadAsync();
  //   }
  // };
  // const getUpdatesAsync = async () => {
  //   //   console.log('in home screen getUpdatesAsync');
  //   try {
  //     // const update = await Updates.checkForUpdateAsync(listener(event));
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       //   console.log('updateAvailable', update && update);
  //       setIsCheckingAppVersion(false);
  //       setIsUpdatingAppVersion(true);
  //       setShowReloadDialogue(true);
  //       await Updates.fetchUpdateAsync();
  //      Updates.reloadAsync();
  //     } else {
  //       updateItemsAsync();
  //       setIsCheckingAppVersion(false);
  //       setShowReloadDialogue(false);
  //     }
  //   } catch (e) {
  //     setIsCheckingAppVersion(false);
  //     setIsUpdatingAppVersion(false);
  //     console.log('updateAvailable error');
  //   }
  // };

  // if (isRefreshNeeded === true) {
  //   if (__DEV__) {
  //     // console.log('no update check because DEV');
  //     setShouldCheckAppVersion(false);
  //     updateItemsAsync();
  //   } else {
  //     setShouldCheckAppVersion(true);
  //     console.log('timeCheckedAppVersion', timeCheckedAppVersion);
  //     console.log('timeCheckedAppVersion now', now);
  //     if (timeCheckedAppVersion) {
  //       setShouldCheckAppVersion(true);
  //       console.log(
  //         'timeCheckedAppVersion diff',
  //         now.diff(moment(timeCheckedAppVersion))
  //       );

  //       if (now.diff(moment(timeCheckedAppVersion), 'minutes') > 10) {
  //         setTimeCheckedAppVersion(now);
  //         setIsCheckingAppVersion(true);
  //         getUpdatesAsync();
  //       } else {
  //         setIsCheckingAppVersion(false);
  //         updateItemsAsync();
  //       }
  //     } else {
  //       //   console.log('no timeCheckedAppVersion', timeCheckedAppVersion);
  //       //   console.log('timeCheckedAppVersion now', now);
  //       setTimeCheckedAppVersion(now);
  //       //   console.log('timeCheckedAppVersion', timeCheckedAppVersion);
  //       setIsCheckingAppVersion(true);

  //       //   console.log('isCheckingAppVersion', isCheckingAppVersion);
  //       //   console.log('calling getUpdatesAsync');
  //       getUpdatesAsync();
  //     }
  //   }
  // }
  //   }, [isRefreshNeeded]);

  //   console.log('IN HOME !!!!! 4');

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
        updateItemsAsync();
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
    // console.log('timeCheckedAppVersion', timeCheckedAppVersion);
    // console.log('timeCheckedAppVersion now', now);
    if (timeCheckedAppVersion) {
      setShouldCheckAppVersion(true);
      //   console.log(
      //     'timeCheckedAppVersion diff',
      //     now.diff(moment(timeCheckedAppVersion))
      //   );

      if (now.diff(moment(timeCheckedAppVersion), 'minutes') > 10) {
        setTimeCheckedAppVersion(now);
        setIsCheckingAppVersion(true);
        getUpdatesAsync();
      } else {
        setIsCheckingAppVersion(false);
        dispatch(revalidateUserCredentials('HomeScreen'));
        updateItemsAsync();
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

  useFocusEffect(
    useCallback(() => {
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      //   console.log('in home useFocusEffect');

      updateItemsAsync();
      checkAppUpdates();
      if (__DEV__) {
        // console.log('no update check because DEV');
        setShouldCheckAppVersion(false);
        dispatch(revalidateUserCredentials({ calledBy: 'HomeScreen' }));
        updateItemsAsync();
      } else {
        setShouldCheckAppVersion(true);
        checkAppUpdates();
      }
    }, [])
  );

  useEffect(() => {
    if (showingDemoApp) {
      setNewsAlertCount(checkForAlerts(InfoTypes.NEWS));
      setLtpLoansAlertCount(checkForAlerts(InfoTypes.LTP_LOANS));
      setNotificationsAlertCount(checkForAlerts(InfoTypes.NOTIFICATIONS));
      setOdisAlertCount(checkForAlerts(InfoTypes.ODIS));
      setServiceMeasuresAlertCount(checkForAlerts(InfoTypes.SERVICE_MEASURES));
    }
  }, [showingDemoApp]);

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
  useEffect(() => {
    // console.log('news useEffect', lastUpdateNews);
    if (lastUpdateNews && lastUpdateNews !== null) {
      const lastUpdateString = lastUpdateNews.toString();
      //   console.log('lastUpdateNews', lastUpdateString);
      const last = moment(lastUpdateString, 'DD/MM/YYYY HH:mm:ss');
      // const last = moment(lastUpdateNews.toString(), 'DD/MM/YYYY HH:mm:ss');
      // const last = moment('31/01/2020 12:31:19', 'DD/MM/YYYY HH:mm:ss');
      //   console.log('now', now);
      //   console.log('last', last);

      let newAgeOfNews = now.diff(moment(last), 'hours');
      //   let fromNow = moment(last).fromNow();
      //   console.log('news fromNow', fromNow);

      // setAgeOfNews(newAgeOfNews);
      //   console.log('news useEffect', last, now, newAgeOfNews);
      setAgeOfNews(newAgeOfNews);
    }
  }, [lastUpdateNews]);

  useEffect(() => {
    const userWipsItems =
      (userApiFetchParamsObj &&
        userApiFetchParamsObj.intId &&
        dealerWipsItems &&
        dealerWipsItems.length > 0 &&
        dealerWipsItems.filter(
          (item) =>
            item.tools &&
            item.tools.length > 0 &&
            item.userIntId &&
            item.userIntId.toString() == userApiFetchParamsObj.intId.toString()
        )) ||
      [];

    setWipsCount((userWipsItems && userWipsItems.length) || 0);

    const buildBookedOutToolsArrForJob = (wip) => {
      const thisWipsToolsArr = wip.tools.map((tool) => ({
        ...tool,
        wipNumber: wip.wipNumber,
        wipId: wip.id.toString(),
        wipCreatedDate: wip.createdDate,
      }));
      return thisWipsToolsArr;
    };
    const buildBookedOutToolsArr = (wips) => {
      let allToolsArr = [];

      wips.forEach((wip) => {
        if (wip.tools && wip.tools.length > 0) {
          let wipToolsArr = buildBookedOutToolsArrForJob(wip);
          allToolsArr.push(...wipToolsArr);
        }
      });
      return allToolsArr;
    };

    let bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
    setBookedOutToolsCount(
      (bookedOutToolItems && bookedOutToolItems.length) || 0
    );
  }, [dealerWipsItems]);

  //   const gridRows =
  //     Constants.manifest.name &&
  //     Constants.manifest.name === 'Pocket Infoweb Extra'
  //       ? 8
  //       : 6;

  const gridRows = showingDemoApp ? 8 : 6;
  //   console.log('home screen gridRows', gridRows);
  //   console.log('Rendering Home screen');

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
        <AppNameWithLogo />
        {showingDemoApp ? (
          <Text
            style={{
              ...baseStyles.textExtraApp,
              color: Colors.vwgCoolOrange,
            }}
          >
            Showing proposed new features
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
                        {wipsCount && wipsCount > 0 ? (
                          <Text style={baseStyles.textHomeGridCellCount}>
                            {` (${wipsCount})`}
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
                      {bookedOutToolsCount && bookedOutToolsCount > 0 ? (
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
                              {` (${bookedOutToolsCount})`}
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
                {showingDemoApp ? (
                  <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                    <Touchable
                      style={baseStyles.viewHomeGridCell}
                      onPress={() =>
                        navigation.navigate('RemindersTabs', {
                          screen: 'Notifications',
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
                          showBadge={showBadgeNotifications}
                          focused={false}
                          text={'Notifications'}
                          value={notificationsAlertCount ? '+' : null}
                          showingDemoApp={showingDemoApp}
                        />
                      </View>
                    </Touchable>
                    <Touchable
                      style={baseStyles.viewHomeGridCell}
                      onPress={() =>
                        navigation.navigate('RemindersTabs', {
                          screen: 'All LTP Loans',
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
                          showBadge={showBadgeLtpLoans}
                          focused={false}
                          text={'LTP Loans'}
                          value={ltpLoansAlertCount ? '+' : null}
                          showingDemoApp={showingDemoApp}
                        />
                      </View>
                    </Touchable>
                  </View>
                ) : null}
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
                        showBadge={showBadgeNews}
                        focused={false}
                        text={'News'}
                        value={newsAlertCount ? '+' : null}
                        showingDemoApp={showingDemoApp}
                      />
                    </View>
                  </Touchable>

                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('NewsTabs', { screen: 'Catalogue' })
                    }
                  >
                    <View style={baseStyles.viewColumnFlexCentre}>
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'book' : 'book'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={false}
                        focused={false}
                        text={'Catalogue'}
                        value={'+'}
                        showingDemoApp={showingDemoApp}
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
                  showingDemoApp={showingDemoApp}
                  navigation={navigation}
                  showOdisAlert={showBadgeOdis}
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
