import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
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
  //   getDealerWipsRequest,
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
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [wipsCount, setWipsCount] = useState(0);
  const [bookedOutToolsCount, setBookedOutToolsCount] = useState(0);
  const [ageOfNews, setAgeOfNews] = useState(0);
  const [ageOfProducts, setAgeOfProducts] = useState(0);

  //   const getItems = useCallback(async () => dispatch(getOdisRequest()), [
  //     odisObj
  //   ]);
  //   console.log('userDataObj', userDataObj && userDataObj);
  //   const getWipsDataObj = {
  //     dealerId:
  //       (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
  //     intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
  //   };
  //   console.log('getWipsDataObj', getWipsDataObj && getWipsDataObj);

  const getAllItems = useCallback(async getWipsDataObj => {
    // dispatch(getDealerWipsRequest(getWipsDataObj));
    dispatch(getOdisRequest());
    dispatch(getNewsRequest());
    dispatch(getProductsRequest());
  });

  //   console.log('IN HOME !!!!! brand', userBrand);
  const notificationLimit = 168;
  //   const notificationLimit = 5000000;
  //   const notificationLimit = 8;

  const now = moment();
  //   console.log('date for now', now);

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      //   console.log('in odis use effect');
      setIsRefreshNeeded(false);
      getAllItems();
    };
    if (isRefreshNeeded === true) {
      //   console.log('getWipsDataObj', getWipsDataObj);
      //   userDataObj &&
      //     userDataObj.dealerId &&
      //     userDataObj.intId &&
      getItemsAsync();
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <AppNameWithLogo />
        <View style={styles.contentContainer}>
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
                    name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <BadgedText
                    showBadge={
                      wipsCount &&
                      typeof wipsCount === 'number' &&
                      wipsCount > 0
                    }
                    focused={false}
                    text={'Jobs'}
                    value={wipsCount}
                  />
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

                  <BadgedText
                    showBadge={
                      bookedOutToolsCount &&
                      typeof bookedOutToolsCount === 'number' &&
                      bookedOutToolsCount > 0
                    }
                    focused={false}
                    text={'Booked tools'}
                    value={bookedOutToolsCount}
                  />

                  {/* <Text style={styles.gridCellTextDisabledSmall}>
                    Coming soon..
                  </Text> */}
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

          <OdisLinkWithStatus
            navigation={navigation}
            userBrand={userBrand}
            itemsObj={odisObj}
            viewCount={odisViewCount}
            viewMax={5}
          />

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
              <Text style={styles.signOutCellText}>Sign out</Text>
            </View>
          </Touchable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
  tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-evenly',

    backgroundColor: 'white',
    marginTop: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
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
    borderRadius: 5,
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
