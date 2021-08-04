import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import LtpLoansList from './LtpLoansList';
import searchItems from '../helpers/searchItems';
import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';

const minSearchLength = 1;
const now = moment();

export default LtpLoansScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);
  const [searchInput, setSearchInput] = useState('');
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemo = useSelector((state) => state.user.requestedDemo);
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

  const getItemStatus = (item) => {
    // console.log(
    //   'tool',
    //   item.toolNr,
    //   'now',
    //   now,
    //   'startDate',
    //   item.startDate,
    //   'expiryDate',
    //   item.endDateDue
    // );
    let theFromDate = null;
    let theToDate = null;
    let ageOfExpiry = 0;
    let ageOfStart = 0;

    if (item.collectedDate && item.collectionNumber) {
      return false;
    }

    if (item.endDateDue && item.endDateDue.length > 0) {
      theToDate = moment(item.endDateDue, 'DD/MM/YYYY HH:mm:ss');
      ageOfExpiry = (now && now.diff(moment(theToDate), 'days')) || 0;
    }
    // console.log('ageOfExpiry', ageOfExpiry);

    if (ageOfExpiry >= -2) {
      return false;
    } else {
      if (item.startDate && item.startDate.length > 0) {
        theFromDate = moment(item.startDate, 'DD/MM/YYYY HH:mm:ss');
        ageOfStart = (now && now.diff(moment(theFromDate), 'days')) || 0;
        // console.log('ageOfStart', ageOfStart, moment(theFromDate));
      }

      if (ageOfStart >= -3) {
        return true;
      }
    }
    return false;
  };

  const filterLtpLoansItems = (ltpLoansItems) => {
    let ltpLoansItemsFiltered = [];
    if (ltpLoansItems && ltpLoansItems.length > 0) {
      ltpLoansItemsFiltered = ltpLoansItems.filter(
        (item) => item.startDate && item.endDateDue && getItemStatus(item)
      );
    }
    // console.log('LtpLoansItemsFiltered', ltpLoansItemsFiltered);
    return ltpLoansItemsFiltered;
  };

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

  //   let uniqueLtpLoansSorted = sortObjectList(
  //     unsortedUniqueLtpLoans,
  //     'loanToolNo',
  //     'asc'
  //   );

  //   setUniqueserviceMeasureItems(ltpLoansItems);

  const ltpLoansItemsDataCount = 0;

  //   console.log('in ltpLoans screen - point 7');

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(ltpLoansItems, searchInput);
      //   console.log(
      //     'LtpLoans Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'LtpLoans: ',
      //     ltpLoansItems && ltpLoansItems.length,
      //     'itemsToShow: ',
      //     itemsToShow && itemsToShow.length,
      //     'uniqueserviceMeasureItems: ',
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
  //       : uniqueserviceMeasureItems
  //     : [];

  //   console.log('in ltpLoans screen - point 8');
  const items =
    !isLoading && !dataError
      ? userRequestedDemo
        ? ltpLoansDummyData
        : ltpLoansItems
      : [];

  //   let itemsToShow =
  //     searchInput && searchInput.length > minSearchLength ? filteredItems : items;
  //   console.log('in ltpLoans screen - point 9');
  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : items
    : [];

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
        dataName={'LtpLoans items'}
        someDataExpected={false}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={ltpLoansItems.length}
      />
      {userRequestedDemo ? (
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
