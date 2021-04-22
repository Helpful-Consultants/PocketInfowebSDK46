import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Icon, Text } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
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
import { getProductsRequest } from '../actions/products';
import { getLtpRequest, emptyLtpRequest } from '../actions/ltp';
import Constants from 'expo-constants';

const buttonTextColor = Colors.vwgWhite;
// var gridCellHeight = PixelRatio.getPixelSizeForLayoutSize(200);
// var gridCellWidth = PixelRatio.getPixelSizeForLayoutSize(200);
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);

export default HomeScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  //   console.log('IN HOME !!!!!');
  //   console.log(props);
  const dispatch = useDispatch();
  //   const navigation = useNavigation();

  const { navigation } = props;
  const insets = useSafeArea();

  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userError = useSelector((state) => state.user.error);
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user.userId);
  //   console.log('IN HOME !!!!! 1f');
  const userIntId = useSelector((state) => state.user.userIntId);
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
  const lastUpdateProducts = useSelector((state) => state.products.lastUpdate);
  const newsObj = useSelector((state) => state.news);
  const previousUpdateNews = useSelector((state) => state.news.previousUpdate);

  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const ltpItems = useSelector((state) => state.ltp.ltpItems);

  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingWips = useSelector((state) => state.dealerWips.isLoading);
  const isLoadingOdis = useSelector((state) => state.odis.isLoading);
  const isLoadingNews = useSelector((state) => state.news.isLoading);
  const isLoadingProducts = useSelector((state) => state.products.isLoading);
  const isLoadingLtp = useSelector((state) => state.ltp.isLoading);

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
  const [ageOfProducts, setAgeOfProducts] = useState(0);

  const [isLoadingAny, setIsLoadingAny] = useState(false);
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
    dispatch(getOdisRequest());
    dispatch(getNewsRequest());
    dispatch(getProductsRequest());
  });

  const updateItemsAsync = async () => {
    console.log(
      'home - updateItemsAsync, userApiFetchParamsObj:',
      userApiFetchParamsObj && userApiFetchParamsObj
    );
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
      isLoadingProducts ||
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
    isLoadingProducts,
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
      console.log('updateAvailable error');
    }
  };

  const checkAppUpdates = () => {
    console.log('timeCheckedAppVersion', timeCheckedAppVersion);
    console.log('timeCheckedAppVersion now', now);
    if (timeCheckedAppVersion) {
      setShouldCheckAppVersion(true);
      console.log(
        'timeCheckedAppVersion diff',
        now.diff(moment(timeCheckedAppVersion))
      );

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
    // console.log('news useEffect', lastUpdateNews);
    if (lastUpdateProducts && lastUpdateProducts !== null) {
      const lastUpdateString = lastUpdateProducts.toString();
      //   console.log('lastUpdateProducts', lastUpdateString);
      const last = moment(lastUpdateString, 'DD/MM/YYYY HH:mm:ss');
      // const last = moment(lastUpdateProducts.toString(), 'DD/MM/YYYY HH:mm:ss');
      // const last = moment('31/01/2020 12:31:19', 'DD/MM/YYYY HH:mm:ss');
      //   console.log('now', now);
      //   console.log('last', last);

      let newAgeOfProducts = now.diff(moment(last), 'hours');
      //   let fromNow = moment(last).fromNow();
      //   console.log('news fromNow', fromNow);

      // setAgeOfNews(newAgeOfNews);
      //   console.log('Products useEffect', last, now, newAgeOfProducts);
      setAgeOfProducts(newAgeOfProducts);
    }
  }, [lastUpdateProducts]);

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

  const gridRows =
    Constants.manifest.name &&
    Constants.manifest.name === 'Pocket Infoweb Extra'
      ? 8
      : 6;
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
        contentContainerStyle={baseStyles.containerFlexCentredJustfied}
      >
        <AppNameWithLogo />
        {Constants.manifest.name &&
        Constants.manifest.name === 'Pocket Infoweb Extra' ? (
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
                      navigation.navigate('WipsTabs', { screen: 'FindTools' })
                    }
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
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
                      navigation.navigate('WipsTabs', { screen: 'Jobs' })
                    }
                  >
                    <View>
                      <Icon
                        name={
                          Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'
                        }
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
                      navigation.navigate('WipsTabs', {
                        screen: 'BookedOutTools',
                      })
                    }
                  >
                    <View>
                      <Icon
                        name={
                          Platform.OS === 'ios'
                            ? 'ios-return-left'
                            : 'md-return-left'
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
                      navigation.navigate('WipsTabs', { screen: 'Ltp' })
                    }
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <Text style={baseStyles.textHomeGridCell}>
                        Loan Tools
                      </Text>
                    </View>
                  </Touchable>
                </View>
                <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                  {Constants.manifest.name &&
                  Constants.manifest.name === 'Pocket Infoweb Extra' ? (
                    <Touchable
                      style={baseStyles.viewHomeGridCell}
                      onPress={() =>
                        navigation.navigate('NewsTabs', { screen: 'Products' })
                      }
                    >
                      <View>
                        <Icon
                          name={
                            Platform.OS === 'ios'
                              ? 'ios-speedometer'
                              : 'md-speedometer'
                          }
                          type='ionicon'
                          color={buttonTextColor}
                          size={iconSize}
                        />
                        <BadgedText
                          showBadge={
                            ageOfProducts < notificationLimit ? true : false
                          }
                          focused={false}
                          text={'Key Products'}
                          value={'+'}
                        />
                      </View>
                    </Touchable>
                  ) : null}
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('NewsTabs', { screen: 'Catalogue' })
                    }
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={false}
                        focused={false}
                        text={'Catalogue'}
                        value={'+'}
                      />
                    </View>
                  </Touchable>
                </View>
                <View style={baseStyles.viewRowFlexCentreJustifiedAligned}>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('NewsTabs', {
                        screen: 'News',
                      })
                    }
                  >
                    <View>
                      <Icon
                        name={
                          Platform.OS === 'ios'
                            ? 'ios-document'
                            : 'md-information-circle'
                        }
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={false}
                        focused={false}
                        text={'News'}
                        value={'+'}
                      />
                    </View>
                  </Touchable>
                  <Touchable
                    style={baseStyles.viewHomeGridCell}
                    onPress={() =>
                      navigation.navigate('RemindersTabs', {
                        screen: 'Alerts',
                      })
                    }
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={false}
                        focused={false}
                        text={'Notifications'}
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
                  userBrand={userBrand}
                  itemsObj={odisObj}
                  viewCount={odisViewCount}
                  viewMax={5}
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
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                    type='ionicon'
                    size={20}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text
                    style={baseStyles.textLargeColouredCentred}
                  >{` Sign out`}</Text>
                </View>
              </Touchable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
    tabBarVisible: false,
    tabBarLabel: ({ focused }) => <Text>Home</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      />
    ),
  };
};
