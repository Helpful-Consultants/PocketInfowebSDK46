import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import {
  getLtpLoansRequest,
  setLtpLoansDisplayTimestamp,
} from '../actions/ltpLoans';
import LtpLoansList from './LtpLoansList';
import searchItems from '../helpers/searchItems';
import { sortObjListByDate } from '../helpers/dates';
// import { getOpenLtpLoansItems } from '../helpers/ltpLoanStatus';

// import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';

const minSearchLength = 1;

export default LtpLoansScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);
  const [searchInput, setSearchInput] = useState('');
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const isLoading = useSelector((state) => state.ltpLoans.isLoading);
  const dataError = useSelector((state) => state.ltpLoans.error);
  const dataStatusCode = useSelector((state) => state.ltpLoans.statusCode);
  const dataErrorUrl = useSelector((state) => state.ltpLoans.dataErrorUrl);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);

  //   console.log('in ltpLoans screen - userDataObj is set to ', userDataObj);

  const userApiFetchParamsObj = {
    dealerId: (userDataObj && userDataObj.dealerId) || null,
    intId: (userDataObj && userDataObj.intId.toString()) || null,
  };
  //   console.log('in ltpLoans screen - point 1');
  //   console.log(
  //     'in ltpLoans screen - userApiFetchParamsObj is set to ',
  //     userApiFetchParamsObj,
  //     'ltpLoansItems ',
  //     ltpLoansItems
  //   );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getLtpLoansData', getLtpLoansData);

  //   const { navigation } = props;

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    // console.log(
    //   'in ltpLoans getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
    dispatch(getLtpLoansRequest(userApiFetchParamsObj)), [ltpLoansItems];
  });

  //   console.log('in ltpLoans screen - point 2');

  const getItemsAsync = async () => {
    // console.log(
    //   'rendering LtpLoans screen, userApiFetchParamsObj:',
    //   userApiFetchParamsObj
    // );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };
  const storeDisplayTimestampAsync = async () => {
    // console.log('istoreDisplayTimestampAsync:');
    dispatch(setLtpLoansDisplayTimestamp());
  };

  //   console.log('in ltpLoans screen - point 3');
  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in ltpLoans use effect');
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
  //     setIsRefreshNeeded(true);
  //   });

  //   useEffect(() => {
  //     // runs only once
  //     console.log('in ltpLoans useEffect', userApiFetchParamsObj);
  //     //   setGetWipsDataObj(userApiFetchParamsObj);
  //     getItemsAsync();
  //   }, [userApiFetchParamsObj]);
  //   console.log('in ltpLoans screen - point 4');
  useFocusEffect(
    useCallback(() => {
      dispatch(
        revalidateUserCredentials({
          calledBy: 'LtpLoans Screen',
        })
      );
      //   console.log('in ltpLoans focusffect ');
      setSearchInput('');
      getItemsAsync();
      storeDisplayTimestampAsync();
    }, [])
  );
  //   console.log('in ltpLoans screen - point 5');
  useEffect(() => {
    // runs only once
    // console.log('in booked useEffect', userApiFetchParamsObj && userApiFetchParamsObj.dealerId);
    // console.log(
    //   'in ltpLoans getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
  }, []);

  //   console.log('in ltpLoans screen - point 6');
  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler');
    getItemsAsync();
  };

  const items = !isLoading && !dataError ? ltpLoansItems : [];
  let ltpLoansSorted = sortObjListByDate(items, 'endDateDue', 'asc');

  //   if (!userIsValidated) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   const userDataPresent =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  //   if (userDataPresent === true) {
  //     // console.log('in ltpLoans screen,userDataObj OK', userDataPresent);
  //   } else {
  //     // console.log('in ltpLoans screen, no userDataObj');
  //     getItems();
  //   }

  //   console.log('in ltpLoans screen - point 7');

  //   console.log('ltpLoansItems', items && items.length);

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(ltpLoansSorted, searchInput);
      //   console.log(
      //     'LtpLoans Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'LtpLoans: ',
      //     ltpLoansItems && ltpLoansItems.length,
      //     'itemsToShow: ',
      //     itemsToShow && itemsToShow.length,
      //     'uniqueLitpLoansItems: ',
      //     'newFilteredItems:',
      //     newFilteredItems && newFilteredItems.length,
      //     newFilteredItems
      //   );
      setFilteredItems(newFilteredItems);
    }
  };

  //   let itemsToShow = !isLoading
  //     ? searchInput && searchInput.length > minSearchLength
  //       ? filteredItems
  //       : uniqueLitpLoansItems
  //     : [];

  //   console.log('in ltpLoans screen - point 8');

  //   let itemsToShow =
  //     searchInput && searchInput.length > minSearchLength ? filteredItems : items;
  //   console.log('in ltpLoans screen - point 9');
  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : ltpLoansSorted
    : [];
  //   console.log('itemsToShow', itemsToShow && itemsToShow);
  //   console.log(
  //     'rendering LtpLoans screen, dataError:',
  //     dataError,
  //     'filteredItems',
  //     filteredItems && filteredItems.length,
  //     ' itemsToShow length',
  //     (itemsToShow && itemsToShow.length) || '0'
  //   );
  //   console.log('in ltpLoans screen - point 10', itemsToShow);
  return (
    <View style={baseStyles.containerFlex}>
      <SearchBarWithRefresh
        dataName={'LTP Loans'}
        someDataExpected={false}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={ltpLoansItems.length}
      />
      {showingDemoData ? (
        <View style={baseStyles.viewDummyDataRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
        </View>
      ) : null}
      {dataError ? null : itemsToShow && itemsToShow.length === 0 ? (
        searchInput.length >= minSearchLength ? (
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              Your search found no results.
            </Text>
          </View>
        ) : isLoading ? null : (
          <View style={baseStyles.viewPromptRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              No live LTP loans to show.
            </Text>
            {/* <Text style={baseStyles.textPromptRibbon}>
              Showing sample data - change in menu.
            </Text> */}
          </View>
        )
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing Service Measures'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          <LtpLoansList items={itemsToShow} showFullDetails={true} />
        </ScrollView>
      )}
    </View>
  );
};
