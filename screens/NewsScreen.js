import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { createFilter } from 'react-native-search-filter';
import { useDispatch, useSelector } from 'react-redux';

import NewsLinks from './NewsLinks';
import { getNewsRequest, setNewsDisplayTimestamp } from '../actions/news';
import { revalidateUserCredentials } from '../actions/user';
import ErrorDetails from '../components/ErrorDetails';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
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
  //   const navigation = useNavigation();
  const dispatch = useDispatch();
  const newsItems = useSelector((state) => state.news.newsItems);
  const newsFetchTime = useSelector((state) => state.news.fetchTime);
  //   const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userData = useSelector((state) => state.user.userData[0]);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  //   const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector((state) => state.news.isLoading);
  const dataError = useSelector((state) => state.news.error);
  const dataStatusCode = useSelector((state) => state.news.statusCode);
  const dataErrorUrl = useSelector((state) => state.news.dataErrorUrl);
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

  const getItems = useCallback(() => {
    // console.log('in news in getItems - no fetchParamsObj needed');
    dispatch(getNewsRequest());
  }, [dispatch]);

  const storeDisplayTimestamp = useCallback(
    (displayTime) => {
      // const displayTime = Date.now();
      //   console.log(
      //     '+++++++++++++++=in New storeDisplayTimestampAsync:',
      //     displayTime,
      //     typeof displayTime
      //   );
      dispatch(setNewsDisplayTimestamp(displayTime));
    },
    [dispatch]
  );
  const pressOpenHandler = async (url) => {
    // console.log('in pressOpenHandler', url);
    const checkedUrl = checkUrl(url);
    // console.log(checkedUrl);

    if (Platform.OS === 'ios') {
      //   let result = await WebBrowser.openAuthSessionAsync(checkedUrl);
      WebBrowser.dismissBrowser();
      const result = await WebBrowser.openBrowserAsync(checkedUrl);
      //   console.log(result);
      setBrowserResult(result);
    } else {
      //   WebBrowser.dismissBrowser();
      const result = await WebBrowser.openBrowserAsync(checkedUrl);
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

  useFocusEffect(
    useCallback(() => {
      //   console.log('in news focusffect calling getItems');
      getItems();
      //   console.log('in news focusffect calling storeDisplayTimestamp');
      //   storeDisplayTimestamp();
      setSearchInput('');
      return () => {
        // Do something when the screen is unfocused
        // console.log('news Screen was unfocused');
      };
    }, [getItems])
  );

  useEffect(() => {
    const displayTime = Date.now();
    // console.log(
    //   'in news useeffect calling storeDisplayTimestamp',
    //   'newsFetchTime',
    //   newsFetchTime,
    //   'displayTime',
    //   displayTime
    // );
    storeDisplayTimestamp(displayTime);
  }, [newsFetchTime]);

  //   console.log('newsItems AREEEEEEEEEE', newsItems);
  const items = (!isLoading && !dataError && newsItems) || [];
  //   const items = (!isLoading && !dataError && newsDummyData) || [];
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);
  //   console.log(items);

  const filteredItems = (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) || [];

  return (
    <View style={baseStyles.container}>
      <SearchBarWithRefresh
        dataName="news"
        someDataExpected
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
          <Text style={baseStyles.textPromptRibbon}>Showing sample data - change in menu.</Text>
          <Ionicons name="arrow-up" size={20} color={Colors.vwgWhite} />
        </View>
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary="Error syncing news items"
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          {filteredItems && filteredItems.length > 0 ? (
            <View style={baseStyles.viewPromptRibbon}>
              <Text style={baseStyles.textPromptRibbon}>Touch an item to see it on Tools Infoweb.</Text>
            </View>
          ) : null}
          <NewsLinks
            items={filteredItems}
            pressOpenHandler={pressOpenHandler}
            baseImageUrl={Urls.newsHeadlineImage}
            userIntId={userData && userData.intId}
          />
        </ScrollView>
      )}
    </View>
  );
};
