import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
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

export default LtpScreen = props => {
  const dispatch = useDispatch();
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const isLoading = useSelector(state => state.ltp.isLoading);
  const dataError = useSelector(state => state.ltp.error);
  const [searchInput, setSearchInput] = useState('');
  const getItems = useCallback(async () => dispatch(getLtpRequest()), [
    ltpItems
  ]);

  useEffect(() => {
    // runs only once
    // setSearchInput('test ');
    console.log('in ltp use effect');
    const getItemsAsync = async () => {
      getItems();
    };
    getItemsAsync();
  }, []);

  const didFocusSubscription = props.navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    console.log('did focus ltp');
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
  });

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItems();
  };

  const items = (!isLoading && !dataError && ltpItems) || [];

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

  console.log('RENDERING ltp screen !!!!!!!!!!!!!!!!!!!');

  return (
    <View>
      <SearchBarWithRefresh
        dataName={'LTP items'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        isLoading={isLoading}
        dataCount={ltpItems.length}
      />
      {searchInput.length > 0 && filteredItems.length === 0 ? (
        <View style={styles.noneFoundPrompt}>
          <Text style={styles.noneFoundPromptText}>
            Your search found no results.
          </Text>
        </View>
      ) : (
        <View style={styles.ltpPrompt}>
          <Text style={styles.ltpPromptText}>
            Book these on the LTP website.
          </Text>
        </View>
      )}

      <ScrollView>
        <LtpList items={filteredItems} baseImageUrl={Urls.ltpHeadlineImage} />
      </ScrollView>
    </View>
  );
};

LtpScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='LTP' />,
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
          navigation.navigate('Home');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
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
  noneFoundPrompt: {
    fontFamily: 'the-sans',
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    color: Colors.vwgWhite
  },
  ltpPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgDarkSkyBlue
  },
  ltpPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWhite
  },
  lookupPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  lookupPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9)
  }
});
