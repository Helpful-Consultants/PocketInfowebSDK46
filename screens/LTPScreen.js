import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Text } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import HeaderButton from '../components/HeaderButton';
import { getLtpRequest } from '../actions/ltp';
import Urls from '../constants/Urls';
import LtpList from './LtpList';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import ltpDummyData from '../dummyData/ltpDummyData.js';

const KEYS_TO_FILTERS = ['loanToolNo', 'orderPartNo', 'toolDescription'];

const checkUrl = rawUrl => {
  if (rawUrl.substring(0, 4) == 'http') {
    return rawUrl;
  } else {
    return Urls.toolsInfoweb + '/' + rawUrl;
  }
};

export default LtpScreen = props => {
  const dispatch = useDispatch();
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector(state => state.ltp.isLoading);
  const dataError = useSelector(state => state.ltp.error);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (ltpItems && ltpItems.length > 0) {
    console.log('in ltp screen,ltpItems', ltpItems.length);
  } else {
    console.log('in ltp screen, no ltpItems');
  }
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  const getItems = useCallback(async () => dispatch(getLtpRequest()), [
    ltpItems
  ]);

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      console.log('in ltp use effect');
      getItems();
    };
    getItemsAsync();
  }, [dispatch]);

  const pressOpenHandler = async url => {
    // console.log('in pressOpenHandler', url);
    let checkedUrl = checkUrl(url);

    if (Platform.OS === 'ios') {
      let result = await WebBrowser.openAuthSessionAsync(checkedUrl);
    } else {
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
    }
  };

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItems();
  };
  //   console.log('ltpItems AREEEEEEEEEE', ltpItems);
  //   const items = ltpItems || [];
  const items = (!isLoading && !dataError && ltpItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  console.log(
    'isLoading ',
    isLoading,
    'dataError ',
    dataError,
    ' items ',
    items.length
  );

  const filteredItems =
    (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  return (
    <View>
      <SearchBarWithRefresh
        dataName={'LTP items'}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        isLoading={isLoading}
        dataCount={ltpItems.length}
      />
      <ScrollView>
        {searchInput && filteredItems && filteredItems.length > 0 ? (
          <View style={styles.lookupPrompt}>
            <Text style={styles.searchFoundPromptText}>
              Please visit the LTP website to make your booking.
            </Text>
          </View>
        ) : null}
        <LtpList
          items={filteredItems}
          pressOpenHandler={pressOpenHandler}
          baseImageUrl={Urls.ltpHeadlineImage}
        />
      </ScrollView>
    </View>
  );
};

LtpScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Ltp' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
         {/* console.log('pressed homescreen icon'); */}
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
          {/*  console.log('pressed menu icon'); */}
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
  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  searchFoundPromptText: {
    textAlign: 'center',

    color: Colors.vwgWhite
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
