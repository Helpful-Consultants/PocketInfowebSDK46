import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Modal from 'react-native-modal';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import MenuDrawer from '../components/MenuDrawer';
import { getLtpRequest } from '../actions/ltp';
import Urls from '../constants/Urls';
import LtpList from './LtpList';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import ltpDummyData from '../dummyData/ltpDummyData.js';

const KEYS_TO_FILTERS = [
  'loanToolNo',
  'orderPartNo',
  'supplierPartNo',
  'toolDescription'
];

export default LtpScreen = props => {
  const dispatch = useDispatch();
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const isLoading = useSelector(state => state.ltp.isLoading);
  const dataError = useSelector(state => state.ltp.error);
  const dataStatusCode = useSelector(state => state.ltp.statusCode);
  const dataErrorUrl = useSelector(state => state.ltp.dataErrorUrl);
  const [searchInput, setSearchInput] = useState('');
  const [uniqueLtpItems, setUniqueLtpItems] = useState([]);
  const getItems = useCallback(async () => dispatch(getLtpRequest()), [
    ltpItems
  ]);

  const [isDrawerVisible, setIsDrawerVisible] = useState(true);

  useEffect(() => {
    // runs only once
    // setSearchInput('test ');
    console.log('in ltp use effect');
    const getItemsAsync = async () => {
      getItems();
    };
    getItemsAsync();
  }, []);

  useEffect(() => {
    console.log('getting unique LTP items', ltpItems && ltpItems.length);
    let uniqueLtpItemsSorted =
      (ltpItems &&
        ltpItems.length > 0 &&
        ltpItems.sort((a, b) => a.loanToolNo > b.loanToolNo)) ||
      [];

    let uniqueLtpItemsTemp =
      uniqueLtpItemsSorted.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.orderPartNo === item.orderPartNo)
      ) || [];
    setUniqueLtpItems(uniqueLtpItemsTemp);
    // console.log('filtered items', uniqueLtpItemsTemp);
  }, [ltpItems]);

  const didFocusSubscription = props.navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    console.log('did focus ltp');
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
  });

  const searchInputHandler = searchInput => {
    let searchStringStart = searchInput.toLowerCase();
    let adjustedSearchInput = '';
    // console.log('searchInput is "' + searchInput + '"');
    if (
      searchStringStart.substring(0, 4) === 'ase ' ||
      searchStringStart.substring(0, 4) === 'vas ' ||
      searchStringStart.substring(0, 4) === 'vag '
    ) {
      //   console.log('@@@@@4 "' + searchInput.substring(0, 4) + '"');
      adjustedSearchInput = searchInput.substr(4);
      //   console.log('@@@@@4cut "' + adjustedSearchInput + '"');
      setSearchInput(adjustedSearchInput);
      //   setAdjustedSearchString(adjustedSearchInput);
    } else if (
      searchStringStart.substring(0, 3) === 'ase' ||
      searchStringStart.substring(0, 3) === 'vas' ||
      searchStringStart.substring(0, 3) === 'vag'
    ) {
      //   console.log('@@@@@ "' + searchInput.substring(0, 3) + '"');
      adjustedSearchInput = searchInput.substr(3);
      //   console.log('@@@@@cut "' + adjustedSearchInput + '"');
      setSearchInput(adjustedSearchInput);
      //   setAdjustedSearchString(adjustedSearchInput);
    } else {
      //   console.log('searchInput no change applied');
      setSearchInput(searchInput);
      //   setAdjustedSearchString(searchInput);
    }
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItems();
  };

  const backdropPressHandler = () => {
    setIsDrawerVisible(false);
  };

  //   const items = (!isLoading && !dataError && ltpItems) || [];

  //   console.log(
  //     'LTP isLoading ',
  //     isLoading,
  //     'dataError ',
  //     dataError,
  //     'statusCode ',
  //     dataStatusCode,
  //     ' items ',
  //     items.length,
  //     ' unique items ',
  //     uniqueLtpItems.length
  //   );

  const filteredItems =
    (!isLoading &&
      uniqueLtpItems.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];
  //   console.log('RENDERING ltp screen !!!!!!!!!!!!!!!!!!!');

  return (
    <View>
      <SearchBarWithRefresh
        dataName={'LTP items'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={ltpItems.length}
      />
      {dataError ? null : searchInput.length > 0 &&
        filteredItems.length === 0 ? (
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

      {/* <MenuDrawer
        isVisible={isDrawerVisible}
        backdropPressHandler={backdropPressHandler}
      /> */}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing LTP'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <LtpList items={filteredItems} baseImageUrl={Urls.ltpHeadlineImage} />
      )}
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
    justifyContent: 'center'
  },
  errorMessage: {
    padding: 10
  },
  errorMessageText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'left',
    color: Colors.vwgDarkSkyBlue
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
