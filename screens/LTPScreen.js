import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
// import { createFilter } from 'react-native-search-filter';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import Modal from 'react-native-modal';
import { revalidateUserCredentials } from '../actions/user';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import BadgedTabBarText from '../components/BadgedTabBarText';
import sortObjectList from '../components/sortObjectList';
// import HeaderButton from '../components/HeaderButton';
// import MenuDrawer from '../components/MenuDrawer';
import { getLtpRequest } from '../actions/ltp';
import Urls from '../constants/Urls';
import LtpList from './LtpList';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import searchItems from '../components/searchItems';
// import stringCleaner from '../components/stringCleaner';
// import ltpDummyData from '../dummyData/ltpDummyData.js';
const minSearchLength = 1;

const screenHeight = Math.round(Dimensions.get('window').height);
const bottomTabHeight = screenHeight && screenHeight > 1333 ? 100 : 80;

export default LtpScreen = props => {
  const dispatch = useDispatch();
  const userBrand = useSelector(state => state.user.userBrand);
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const isLoading = useSelector(state => state.ltp.isLoading);
  const dataError = useSelector(state => state.ltp.error);
  const dataStatusCode = useSelector(state => state.ltp.statusCode);
  const dataErrorUrl = useSelector(state => state.ltp.dataErrorUrl);
  const [searchInput, setSearchInput] = useState('');
  const [uniqueLtpItems, setUniqueLtpItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getItems = useCallback(async () => dispatch(getLtpRequest()), [
    ltpItems
  ]);

  //   const [isDrawerVisible, setIsDrawerVisible] = useState(true);
  //   console.log('in ltp screen');

  const getItemsAsync = async () => {
    // console.log('ltp - getItemsAsync');
    getItems();
  };

  useEffect(() => {
    // runs only once
    // console.log('in ltp useEffect getItemsAsync');
    getItemsAsync();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('ltp - useFocusEffect');
      // don't refresh the every time user visits the page LTP - they don't change too much
      dispatch(revalidateUserCredentials({ calledBy: 'LtpScreen' }));
      setSearchInput('');
    }, [])
  );

  useEffect(() => {
    // console.log('getting unique LTP items', ltpItems && ltpItems.length);
    // console.log('userBrand is ', userBrand);
    let ltpItemsAll = (ltpItems && ltpItems.length > 0 && ltpItems) || [];
    let ltpItemsFiltered = [];
    if (userBrand) {
      //   console.log('userBrand is ', userBrand);
      ltpItemsFiltered = ltpItemsAll.filter(
        item => item[userBrand] === 'Y' || 'y'
      );
    } else {
      //   console.log('userBrand isnt : ', userBrand);
      ltpItemsFiltered = ltpItemsAll.filter(
        item =>
          item.au === ('Y' || 'y') ||
          item.cv === ('Y' || 'y') ||
          item.se === ('Y' || 'y') ||
          item.sk === ('Y' || 'y') ||
          item.vw === ('Y' || 'y')
      );
    }

    let ltpItemsSorted = sortObjectList(ltpItemsFiltered, 'loanToolNo', 'asc');
    // console.log(ltpItemsSorted);

    setUniqueLtpItems(ltpItemsSorted);
    // setUniqueLtpItems([]);
    // console.log('filtered items', uniqueLtpItemsTemp);
  }, [ltpItems, userBrand]);

  const searchInputHandler = searchInput => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(uniqueLtpItems, searchInput);
      setFilteredItems(newFilteredItems);
    }
  };

  const refreshRequestHandler = () => {
    // console.log('ltp - in refreshRequestHandler');
    getItemsAsync();
  };

  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : uniqueLtpItems
    : [];
  //   console.log(
  //     'RENDERING ltp screen 1147 !!!!!!!!!!!!!!!!!!!, dataError ',
  //     dataError
  //   );
  console.log('rendering LTP Screen');

  return (
    <View style={styles.container}>
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
      {dataError ? null : itemsToShow.length === 0 ? (
        searchInput.length >= minSearchLength ? (
          <View style={styles.noneFoundPrompt}>
            <Text style={styles.noneFoundPromptText}>
              Your search found no results.
            </Text>
          </View>
        ) : isLoading ? null : (
          <View style={styles.ltpPrompt}>
            <Text style={styles.ltpPromptText}>
              No LTP items to show. Try the refresh button.
            </Text>
          </View>
        )
      ) : (
        <View style={styles.ltpPrompt}>
          <Text style={styles.ltpPromptText}>
            Book these on the LTP website.
          </Text>
        </View>
      )}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing LTP'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <View>
          <LtpList items={itemsToShow} baseImageUrl={Urls.ltpHeadlineImage} />
        </View>
      )}
    </View>
  );
};

const titleString = 'Loan Tools';
const tabBarLabelFunction = ({ focused }) => (
  <BadgedTabBarText
    showBadge={false}
    text={titleString}
    focused={focused}
    value={0}
  />
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
        name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
      />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: bottomTabHeight
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
