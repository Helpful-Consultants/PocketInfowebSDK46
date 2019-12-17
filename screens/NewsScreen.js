import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
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
  const dispatch = useDispatch();
  const newsItems = useSelector(state => state.news.newsItems);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector(state => state.news.isLoading);
  const dataError = useSelector(state => state.news.error);
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

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      //   console.log('in news use effect');
      getItems();
    };
    getItemsAsync();
  }, [dispatch]);

  const pressOpenHandler = async url => {
    // console.log('in pressOpenHandler', url);
    let checkedUrl = checkUrl(url);
    // console.log(checkedUrl);

    if (Platform.OS === 'ios') {
      //   let result = await WebBrowser.openAuthSessionAsync(checkedUrl);
      WebBrowser.dismissBrowser();
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
      console.log(result);
      setBrowserResult(result);
    } else {
      WebBrowser.dismissBrowser();
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
    <View>
      <SearchBarWithRefresh
        dataName={'news'}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={newsItems.length}
      />
      <ScrollView>
        {filteredItems && filteredItems.length > 0 ? (
          <View style={styles.lookupPrompt}>
            <Text style={styles.lookupPromptText}>
              Touch a news item to open up the story on Tools Infoweb.
            </Text>
          </View>
        ) : null}
        <NewsLinks
          items={filteredItems}
          pressOpenHandler={pressOpenHandler}
          baseImageUrl={Urls.newsHeadlineImage}
        />
      </ScrollView>
    </View>
  );
};

NewsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='News' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
          navigation.navigate('HomeScreen');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          {
            /*  console.log('pressed menu icon'); */
          }
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  lookupPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  lookupPromptText: {
    textAlign: 'center',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9)
  }
});
