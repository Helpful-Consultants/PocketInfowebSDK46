import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from 'expo-web-browser';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import BadgedTabBarText from '../components/BadgedTabBarText';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import { getNewsRequest } from '../actions/news';
import Urls from '../constants/Urls';
import NewsLinks from './NewsLinks';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import newsDummyData from '../dummyData/newsDummyData.js';

const KEYS_TO_FILTERS = ['headline', 'newstext'];

const checkUrl = rawUrl => {
  if (rawUrl.substring(0, 4) == 'http') {
    return encodeURI(rawUrl);
  } else {
    return Urls.toolsInfoweb + '/' + encodeURI(rawUrl);
  }
};

export default NewsScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newsItems = useSelector(state => state.news.newsItems);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector(state => state.news.isLoading);
  const dataError = useSelector(state => state.news.error);
  const dataStatusCode = useSelector(state => state.news.statusCode);
  const dataErrorUrl = useSelector(state => state.news.dataErrorUrl);
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

  const getItems = useCallback(async () => dispatch(getNewsRequest()), [
    newsItems
  ]);

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
      const getItemsAsync = async () => {
        getItems();
      };
      setSearchInput('');
      getItemsAsync();
    }, [])
  );

  const pressOpenHandler = async url => {
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

  const searchInputHandler = searchInput => {
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
    <View style={styles.container}>
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
            <View style={styles.lookupPrompt}>
              <Text style={styles.lookupPromptText}>
                Touch a news item to see more on Tools Infoweb.
              </Text>
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

const titleString = 'News';
const tabBarLabelFunction = () => (
  <BadgedTabBarText showBadge={false} text={titleString} value={0} />
);
export const screenOptions = navData => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,

    headerStyle: {
      backgroundColor: Colors.vwgHeader
    },
    tabBarColor: Colors.vwgWhite,
    tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: -5
  },
  lookupPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgInfoBar
  },
  lookupPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9)
  }
});
