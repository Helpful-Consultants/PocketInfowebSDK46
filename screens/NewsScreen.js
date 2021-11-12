import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { createFilter } from 'react-native-search-filter';
import { Ionicons } from '@expo/vector-icons';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import { getNewsRequest, setNewsDisplayTimestamp } from '../actions/news';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import NewsLinks from './NewsLinks';
// import newsDummyData from '../dummyData/newsDummyData.js';

const KEYS_TO_FILTERS = ['headline', 'newstext'];

const checkUrl = (rawUrl) => {
  if (rawUrl.substring(0, 4) == 'http') {
    return encodeURI(rawUrl);
  } else {
    return Urls.toolsInfoweb + '/' + encodeURI(rawUrl);
  }
};

export default NewsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newsItems = useSelector((state) => state.news.newsItems);
  const newsFetchTime = useSelector((state) => state.news.fetchTime);
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userData = useSelector((state) => state.user.userData[0]);
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector((state) => state.news.isLoading);
  const dataError = useSelector((state) => state.news.error);
  const dataStatusCode = useSelector((state) => state.news.statusCode);
  const dataErrorUrl = useSelector((state) => state.news.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [browserResult, setBrowserResult] = useState(null);

  if (newsItems && newsItems.length > 0) {
    // console.log('in news screen,newsItems', newsItems.length);
  } else {
    // console.log('in news screen, no newsItems');
  }
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  const getItems = useCallback(
    async () => dispatch(getNewsRequest()),
    [newsItems]
  );
  const getItemsAsync = async () => {
    getItems();
  };
  const storeDisplayTimestampAsync = async () => {
    // console.log('+++++++++++++++=in storeDisplayTimestampAsync:');
    displayTime = Date.now();
    dispatch(setNewsDisplayTimestamp({ displayTime }));
  };

  //   const { navigation } = props;

  //   useEffect(() => {
  //     // runs only once
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     if (searchInput && searchInput.length > 0) {
  //       setSearchInput('');
  //     }
  //     setIsRefreshNeeded(true);
  //   });

  useFocusEffect(
    useCallback(() => {
      storeDisplayTimestampAsync();
      dispatch(
        revalidateUserCredentials({
          calledBy: 'NewsScreen',
        })
      );
      setSearchInput('');
      getItemsAsync();
    }, [])
  );

  const pressOpenHandler = async (url) => {
    // console.log('in pressOpenHandler', url);
    let checkedUrl = checkUrl(url);
    // console.log(checkedUrl);

    if (Platform.OS === 'ios') {
      //   let result = await WebBrowser.openAuthSessionAsync(checkedUrl);
      WebBrowser.dismissBrowser();
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
      //   console.log(result);
      setBrowserResult(result);
    } else {
      //   WebBrowser.dismissBrowser();
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
      setBrowserResult(result);
    }
  };

  const searchInputHandler = (searchInput) => {
    // console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler');
    getItems();
  };
  //   console.log('newsItems AREEEEEEEEEE', newsItems);
  const items = (!isLoading && !dataError && newsItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);
  //   console.log(items);

  const filteredItems =
    (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  return (
    <View style={baseStyles.container}>
      <SearchBarWithRefresh
        dataName={'news'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={newsItems.length}
      />
      {showingDemoData ? (
        <View style={baseStyles.viewDummyDataRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
        </View>
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing news items'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          {filteredItems && filteredItems.length > 0 ? (
            <View style={baseStyles.viewPromptRibbon}>
              <Text style={baseStyles.textPromptRibbon}>
                Touch an item to see it on Tools Infoweb.
              </Text>
            </View>
          ) : null}
          <NewsLinks
            items={filteredItems}
            pressOpenHandler={pressOpenHandler}
            baseImageUrl={Urls.newsHeadlineImage}
            userIntId={userData && userData.intId}
            showingDemoApp={showingDemoApp}
          />
        </ScrollView>
      )}
    </View>
  );
};
