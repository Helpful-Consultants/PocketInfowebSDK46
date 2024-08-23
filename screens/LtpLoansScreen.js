import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { selectFetchParamsObj } from '../reducers/user';
// import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';

const minSearchLength = 1;

export default LtpLoansScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);
  const ltpLoansFetchTime = useSelector((state) => state.ltpLoans.fetchTime);
  const [searchInput, setSearchInput] = useState('');
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const isLoading = useSelector((state) => state.ltpLoans.isLoading);
  const dataError = useSelector((state) => state.ltpLoans.error);
  const dataStatusCode = useSelector((state) => state.ltpLoans.statusCode);
  const dataErrorUrl = useSelector((state) => state.ltpLoans.dataErrorUrl);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);

  //   console.log('in ltpLoans screen - userDataObj is set to ', userDataObj);

  //   console.log('in ltpLoans screen - point 1');
  //   console.log(
  //     'in ltpLoans screen - fetchParamsObj is set to ',
  //     fetchParamsObj,
  //     'ltpLoansItems ',
  //     ltpLoansItems
  //   );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     fetchParamsObj
  //   ]);

  //   console.log('getLtpLoansData', getLtpLoansData);

  //   const { navigation } = props;
  //   const fetchParamsObj = useMemo(() => {
  //     console.log('in ltpLoans memoising fetchParamsObj', fetchParamsObj);
  //     return fetchParamsObj;
  //   }, [
  //     fetchParamsObj.dealerId,
  //     fetchParamsObj.userIntId,
  //     fetchParamsObj.userBrand,
  //   ]);

  useEffect(() => {
    // console.log(
    //   '&&&&&&&&&&&&&&&& fetchParamsObj changed for LTP loans',
    //   fetchParamsObj
    // );
    getItems();
  }, [fetchParamsObj]);

  const getItems = useCallback(() => {
    // console.log('in ltpLoans in getItems fetchParamsObj is', fetchParamsObj);
    dispatch(getLtpLoansRequest(fetchParamsObj));
  }, [dispatch, fetchParamsObj]);

  //   console.log('in ltpLoans screen - point 2');

  const storeDisplayTimestamp = useCallback(
    (displayTime) => {
      // const displayTime = Date.now();
      //   console.log(
      //     '+++++++++++++++=in New storeDisplayTimestampAsync:',
      //     displayTime,
      //     typeof displayTime
      //   );
      dispatch(setLtpLoansDisplayTimestamp(displayTime));
    },
    [dispatch]
  );

  const refreshRequestHandler = useCallback(() => {
    // console.log('in ltpLoans refreshRequestHandler');
    getItems();
  }, [getItems]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('in ltpLoans usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'LtpLoans Screen',
      //     })
      //   );
      //   console.log('in ltpLoans focusffect calling getItems');
      getItems();
      storeDisplayTimestamp();
      setSearchInput('');
      return () => {
        // Do something when the screen is unfocused
        // console.log('ltpLoans Screen was unfocused');
      };
    }, [dispatch, getItems])
  );

  useEffect(() => {
    const displayTime = Date.now();
    // console.log(
    //   'in ltpLoans useeffect calling storeDisplayTimestamp',
    //   'ltpLoansFetchTime',
    //   ltpLoansFetchTime,
    //   'displayTime',
    //   displayTime
    // );
    storeDisplayTimestamp(displayTime);
  }, [ltpLoansFetchTime]);

  //   console.log('in ltpLoans screen - point 5');

  //   console.log('in ltpLoans screen - point 6');

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
          <Ionicons name="arrow-up" size={20} color={Colors.vwgWhite} />
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
