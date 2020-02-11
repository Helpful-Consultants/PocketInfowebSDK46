import React, { useCallback, useEffect, useState } from 'react';
import { Updates } from 'expo';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { Icon, Text } from 'react-native-elements';
// import AppNavigator from '../navigation/AppNavigator';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import AppNameWithLogo from '../components/AppNameWithLogo';
import OdisLinkWithStatus from '../components/OdisLinkWithStatus';
import BadgedText from '../components/BadgedText';
import Colors from '../constants/Colors';

import { signOutUserRequest } from '../actions/user';
import { getOdisRequest } from '../actions/odis';
import { emptyDealerToolsRequest } from '../actions/dealerTools';
import {
  getDealerWipsRequest,
  emptyDealerWipsRequest
} from '../actions/dealerWips';
import { getNewsRequest } from '../actions/news';
import { getProductsRequest } from '../actions/products';

const buttonColor = Colors.vwgDeepBlue;
const buttonTextColor = Colors.vwgWhite;
const disabledButtonTextColor = Colors.vwgDarkGay;
const actionTextColor = Colors.vwgDeepBlue;
const disabledButtonColor = Colors.vwgMidGray;

// var gridCellHeight = PixelRatio.getPixelSizeForLayoutSize(200);
// var gridCellWidth = PixelRatio.getPixelSizeForLayoutSize(200);

var { screenHeight, screenWidth } = Dimensions.get('window');
var gridHeight = screenHeight * 0.18;
var gridWidth = screenWidth * 0.3;
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);
var iconSizeSmall = RFPercentage(3.5);

export default HomeScreen = props => {
  // console.log(props)
  //   console.log('IN HOME !!!!!');
  const dispatch = useDispatch();

  const { navigation } = props;
  const insets = useSafeArea();

  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userError = useSelector(state => state.user.error);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const userBrand = useSelector(state => state.user.userBrand);
  const odisObj = useSelector(state => state.odis.odisData);
  const lastUpdateNews = useSelector(state => state.news.lastUpdate);
  const lastUpdateProducts = useSelector(state => state.products.lastUpdate);
  const newsObj = useSelector(state => state.news);
  const previousUpdateNews = useSelector(state => state.news.previousUpdate);
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const odisViewCount = useSelector(state => state.odis.viewCount);

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
  const isLoadingWips = useSelector(state => state.dealerWips.isLoading);
  const isLoadingOdis = useSelector(state => state.odis.isLoading);
  const isLoadingNews = useSelector(state => state.news.isLoading);
  const isLoadingProducts = useSelector(state => state.products.isLoading);

  //   const getItems = useCallback(async () => dispatch(getOdisRequest()), [
  //     odisObj
  //   ]);
  //   console.log('userDataObj', userDataObj && userDataObj);
  const getWipsDataObj = {
    dealerId:
      (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
    intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
  };
  //   console.log('getWipsDataObj', getWipsDataObj && getWipsDataObj);

  const getAllItems = useCallback(async getWipsDataObj => {
    dispatch(getDealerWipsRequest(getWipsDataObj));
    dispatch(getOdisRequest());
    dispatch(getNewsRequest());
    dispatch(getProductsRequest());
  });

  //   console.log('IN HOME !!!!! brand', userBrand);
  const notificationLimit = 168;
  //   const notificationLimit = 5000000;
  //   const notificationLimit = 8;

  const now = moment();

  useEffect(() => {
    // runs only once
    // console.log('in tools use effect');
    if (isLoadingOdis || isLoadingNews || isLoadingWips || isLoadingProducts) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [isLoadingOdis, isLoadingNews, isLoadingWips, isLoadingProducts]);

  useEffect(() => {
    const getItemsAsync = async () => {
      //   console.log('in home screen getItemsAsync,', __DEV__);

      getAllItems(getWipsDataObj);
      //   console.log('in home screen getItemsAsync called getAllItems');
      setIsRefreshNeeded(false);
    };
    // const listener = event => {
    //   if (event.type === Updates.EventType.DOWNLOAD_FINISHED) {
    //     setShowReloadDialogue(true);

    //     Updates.reloadFromCache();
    //   }
    // };
    const getUpdatesAsync = async () => {
      console.log('in home screen getUpdatesAsync');
      try {
        // const update = await Updates.checkForUpdateAsync(listener(event));
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          console.log('updateAvailable', update && update);
          setIsCheckingAppVersion(false);
          setIsUpdatingAppVersion(true);
          setShowReloadDialogue(true);
          await Updates.fetchUpdateAsync();
          Updates.reloadFromCache();
        } else {
          getItemsAsync();
          setIsCheckingAppVersion(false);
          setShowReloadDialogue(false);
        }
      } catch (e) {
        setIsCheckingAppVersion(false);
        setIsUpdatingAppVersion(false);
        console.log('updateAvailable error');
      }
    };

    if (isRefreshNeeded === true) {
      if (__DEV__) {
        // console.log('no update check because DEV');
        setShouldCheckAppVersion(false);
        getItemsAsync();
      } else {
        setShouldCheckAppVersion(true);
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
            getItemsAsync();
          }
        } else {
          console.log('no timeCheckedAppVersion', timeCheckedAppVersion);
          console.log('timeCheckedAppVersion now', now);
          setTimeCheckedAppVersion(now);
          console.log('timeCheckedAppVersion', timeCheckedAppVersion);
          setIsCheckingAppVersion(true);

          console.log('isCheckingAppVersion', isCheckingAppVersion);
          console.log('calling getUpdatesAsync');
          getUpdatesAsync();
        }
      }
    }
  }, [isRefreshNeeded]);

  const requestSignOutHandler = useCallback(() => {
    console.log('in homesscreen requestSignOutHandler');
    console.log('signingOut');
    dispatch(emptyDealerWipsRequest());
    dispatch(emptyDealerToolsRequest());
    // dispatch(signOutUserRequest()), [userIsSignedIn];
    dispatch(signOutUserRequest());
    navigation.navigate('AuthLoading');
  });

  const didFocusSubscription = navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    setIsRefreshNeeded(true);
  });

  //   useEffect(() => {
  //     if (!userIsSignedIn || userError) {
  //       console.log('home screen userIs not SignedIn so navigating to auth');
  //       navigation && navigation.navigate && navigation.navigate('Auth');
  //     }
  //   }, [userIsSignedIn, userError]);

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

  //   console.log('news', newsObj);

  //   console.log('ageOfProducts', ageOfProducts);

  useEffect(() => {
    const userWipsItems =
      (userDataObj &&
        userDataObj.intId &&
        dealerWipsItems &&
        dealerWipsItems.length > 0 &&
        dealerWipsItems.filter(
          item =>
            item.userIntId &&
            item.userIntId.toString() == userDataObj.intId.toString()
        )) ||
      [];

    setWipsCount((userWipsItems && userWipsItems.length) || 0);

    const buildBookedOutToolsArrForJob = wip => {
      const thisWipsToolsArr = wip.tools.map(tool => ({
        ...tool,
        wipNumber: wip.wipNumber,
        wipId: wip.id.toString(),
        wipCreatedDate: wip.createdDate
      }));
      return thisWipsToolsArr;
    };
    const buildBookedOutToolsArr = wips => {
      let allToolsArr = [];

      wips.forEach(wip => {
        let wipToolsArr = buildBookedOutToolsArrForJob(wip);
        allToolsArr.push(...wipToolsArr);
      });
      allToolsArr.sort((a, b) => a.partNumber > b.partNumber);

      return allToolsArr;
    };

    const bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
    const bookedOutToolsCount =
      (bookedOutToolItems && bookedOutToolItems.length) || 0;

    setBookedOutToolsCount(
      (bookedOutToolItems && bookedOutToolItems.length) || 0
    );
  }, [dealerWipsItems]);

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <AppNameWithLogo />

        <View style={styles.contentContainer}>
          {showReloadDialogue === true ? (
            <View>
              <Text style={styles.loadingText}>
                There is a new version of this app.
              </Text>
              <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />

              <Text style={styles.loadingText}>Updating...</Text>
            </View>
          ) : (
            <View>
              <View>
                <View style={styles.gridRow}>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('FindTools')}
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <Text style={styles.gridCellText}>Find tools</Text>
                    </View>
                  </Touchable>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('Jobs')}
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

                      <Text style={styles.gridCellText}>
                        {`Jobs`}
                        {wipsCount && wipsCount > 0 ? (
                          <Text style={styles.gridCellCountText}>
                            {` (${wipsCount})`}
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                <View style={styles.gridRow}>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('BookedOutTools')}
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
                      <Text style={styles.gridCellText}>
                        {`Booked tools`}
                        {bookedOutToolsCount && bookedOutToolsCount > 0 ? (
                          <Text style={styles.gridCellCountText}>
                            {` (${bookedOutToolsCount})`}
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </Touchable>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('Ltp')}
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <Text style={styles.gridCellText}>LTP</Text>
                    </View>
                  </Touchable>
                </View>
                <View style={styles.gridRow}>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('Products')}
                  >
                    <View>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />
                      <BadgedText
                        showBadge={
                          ageOfProducts && ageOfProducts < notificationLimit
                        }
                        focused={false}
                        text={'Products'}
                        value={'+'}
                      />
                    </View>
                  </Touchable>
                  <Touchable
                    style={styles.gridCell}
                    onPress={() => navigation.navigate('News')}
                  >
                    <View>
                      <Icon
                        name={
                          Platform.OS === 'ios'
                            ? 'ios-information-circle-outline'
                            : 'md-information-circle'
                        }
                        type='ionicon'
                        color={buttonTextColor}
                        size={iconSize}
                      />

                      <BadgedText
                        showBadge={ageOfNews && ageOfNews < notificationLimit}
                        focused={false}
                        text={'News'}
                        value={'+'}
                      />
                    </View>
                  </Touchable>
                </View>
              </View>
              <View style={styles.odisRow}>
                <OdisLinkWithStatus
                  navigation={navigation}
                  userBrand={userBrand}
                  itemsObj={odisObj}
                  viewCount={odisViewCount}
                  viewMax={5}
                />
              </View>
              <View style={styles.loadingMessage}>
                {shouldCheckAppVersion ? (
                  //prod mode
                  isCheckingAppVersion ? (
                    <Text style={styles.checkingText}>
                      Checking you have the latest app version...
                    </Text>
                  ) : isLoadingAny ? (
                    <Text style={styles.checkingText}>
                      Syncing your data...
                    </Text>
                  ) : (
                    // dummy to keep layout
                    <Text style={styles.dummyCheckingText}>
                      This should be white (i.e. invisible)...
                    </Text>
                  )
                ) : isLoadingAny ? (
                  //dev mode - no OTA app refressh
                  <Text style={styles.checkingText}>Syncing your data...</Text>
                ) : (
                  // dummy to keep layout
                  <Text style={styles.dummyCheckingText}>
                    This should be white (i.e. invisible)...
                  </Text>
                )}
              </View>
              <View
                style={{
                  marginTop: 15,
                  marginHorizontal: 30
                }}
              >
                <Text style={styles.instructionsText}>
                  {userIsSignedIn
                    ? `Signed in as ${userDataObj.userName}`
                    : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
                </Text>
                <Text style={styles.instructionsTextSmall}>
                  {userIsSignedIn ? `${userDataObj.dealerName}` : null}
                </Text>
              </View>
              <Touchable
                style={{ marginTop: 0 }}
                onPress={() => requestSignOutHandler()}
              >
                <View style={styles.signOutRow}>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                    type='ionicon'
                    size={20}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text style={styles.signOutCellText}>{` Sign out`}</Text>
                </View>
              </Touchable>
            </View>
          )}

          {/* <View>
            <Text style={styles.checkingText}>
              Time:{' '}
              {timeCheckedAppVersion
                ? moment(timeCheckedAppVersion).format('MMMM Do, h:mm:ss')
                : null}
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
  tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // marginTop: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
  },
  loadingMessage: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  checkingText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.6),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  dummyCheckingText: {
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.6),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  loadingText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

    // backgroundColor: 'red'
  },
  odisRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10

    // backgroundColor: 'red'
  },
  gridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: PixelRatio.getPixelSizeForLayoutSize(50),
    height: RFPercentage(14),
    borderColor: Colors.vwgDeepBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.vwgDeepBlue,
    backgroundColor: Colors.vwgDeepBlue,
    margin: 5,
    shadowColor: 'black',
    // shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // elevation: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.26,
    //   shadowOffset: { width: 0, height: 2 },
    shadowRadius: Platform.OS === 'ios' ? 0 : 10,
    elevation: Platform.OS === 'ios' ? 0 : 5,
    borderRadius: Platform.OS === 'ios' ? 5 : 4,
    // height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: RFPercentage(23.5)
    // padding: 5
  },
  gridCellDisabled: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor: Colors.vwgLightGray,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.vwgLightGray,
    backgroundColor: Colors.vwgLightGray,
    margin: 5,
    borderRadius: 10,
    height: 70
    // padding: 5
  },
  doubleGridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '93%',
    height: 40,
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#333',

    backgroundColor: '#eee',
    margin: 5,
    padding: 5,
    borderRadius: 5
  },

  gridCellText: {
    color: Colors.vwgWhite,
    // fontSize: 14,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.5),

    textAlign: 'center'
  },
  gridCellCountText: { fontSize: RFPercentage(2.2) },
  gridCellTextDisabledSmall: {
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: 10,

    textAlign: 'center'
  },
  gridCellTextDisabled: {
    color: Colors.disabledButtonTextColor,
    fontSize: 14,

    textAlign: 'center'
  },
  odisCellText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  signOutCellText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 3
  },

  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  instructionsText: {
    fontSize: RFPercentage(2.25),
    marginTop: 5,
    textAlign: 'center'
  },
  instructionsTextSmall: {
    fontSize: RFPercentage(2),
    marginTop: 5,
    textAlign: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
