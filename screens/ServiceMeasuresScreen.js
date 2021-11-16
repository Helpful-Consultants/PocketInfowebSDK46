import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import { selectFetchParamsObj } from '../reducers/user';
import {
  getServiceMeasuresRequest,
  setServiceMeasuresDisplayTimestamp,
} from '../actions/serviceMeasures';
// import { getDealerWipsRequest } from '../actions/serviceMeasures';
// import { getDealerToolsRequest } from '../actions/dealerTools';
import ServiceMeasuresList from './ServiceMeasuresList';
import { sortObjListByDate } from '../helpers/dates';

import searchItems from '../helpers/searchItems';
// import userDummyData from '../dummyData/userDummyData.js';
// import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

const minSearchLength = 1;

export default ServiceMeasuresScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const serviceMeasuresItems = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresItems
  );
  const serviceMeasuresFetchTime = useSelector(
    (state) => state.serviceMeasures.fetchTime
  );
  const displayTimestamp = useSelector(
    (state) => state.serviceMeasures.displayTimestamp
  );
  const isLoading = useSelector((state) => state.serviceMeasures.isLoading);
  const dataError = useSelector((state) => state.serviceMeasures.error);
  const dataStatusCode = useSelector(
    (state) => state.serviceMeasures.statusCode
  );
  const dataErrorUrl = useSelector(
    (state) => state.serviceMeasures.dataErrorUrl
  );
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const [searchInput, setSearchInput] = useState('');
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);

  //   console.log(
  //     'in serviceMeasures screen - userApiFetchParamsObj is set to ',
  //     userApiFetchParamsObj,
  //     'serviceMeasuresItems ',
  //     serviceMeasuresItems
  //   );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getServiceMeasuresData', getServiceMeasuresData);

  //   const { navigation } = props;

  useEffect(() => {
    console.log(
      '&&&&&&&&&&&&&&&& fetchParamsObj changed for SM',
      fetchParamsObj
    );
  }, [fetchParamsObj]);

  //   const fetchParamsObj = useMemo(() => {
  //     console.log(
  //       'in serviceMeasures memoising fetchParamsObj',
  //       userApiFetchParamsObj
  //     );
  //     return userApiFetchParamsObj;
  //   }, [
  //     userApiFetchParamsObj.dealerId,
  //     userApiFetchParamsObj.intId,
  //     userApiFetchParamsObj.userBrand,
  //   ]);

  const getItems = useCallback(() => {
    console.log(
      'in serviceMeasures in getItems userApiFetchParamsObj',
      fetchParamsObj
    );
    dispatch(getServiceMeasuresRequest(fetchParamsObj));
  }, [dispatch, fetchParamsObj]);

  //   console.log('in serviceMeasures screen - point 2');

  const storeDisplayTimestamp = () => {
    console.log('+++++++++++++++=in SM storeDisplayTimestampAsync:');
    const displayTime = Date.now();
    dispatch(setServiceMeasuresDisplayTimestamp(displayTime));
  };

  const refreshRequestHandler = useCallback(() => {
    console.log('in serviceMeasures refreshRequestHandler');
    getItems();
  }, [getItems]);

  useFocusEffect(
    useCallback(() => {
      console.log('in serviceMeasures usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'ServiceMeasures Screen',
      //     })
      //   );
      console.log('in serviceMeasures focusffect calling getItems');
      getItems();
      storeDisplayTimestamp();
      setSearchInput('');
      return () => {
        // Do something when the screen is unfocused
        console.log('serviceMeasures Screen was unfocused');
      };
    }, [dispatch, getItems])
  );

  useEffect(() => {
    // console.log('in odis screen useEffect SM FetchTime', serviceMeasuresFetchTime);
    storeDisplayTimestamp();
  }, [serviceMeasuresFetchTime]);

  let serviceMeasuresSorted = sortObjListByDate(
    serviceMeasuresItems,
    'expiryDate',
    'asc'
  );

  //   console.log(
  //     'serviceMeasuresSorted',
  //     serviceMeasuresItems && serviceMeasuresItems,
  //     serviceMeasuresSorted && serviceMeasuresSorted
  //   );

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(serviceMeasuresSorted, searchInput);
      //   console.log(
      //     'ServiceMeasures Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'ServiceMeasures: ',
      //     serviceMeasuresItems && serviceMeasuresItems.length,
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

  let itemsToShow =
    !isLoading && !dataError
      ? searchInput && searchInput.length > minSearchLength
        ? filteredItems
        : serviceMeasuresSorted
      : [];

  //   console.log(
  //     'rendering ServiceMeasures screen, dataError:',
  //     dataError,
  //     'filteredItems',
  //     filteredItems && filteredItems.length,
  //     ' itemsToShow length',
  //     (itemsToShow && itemsToShow.length) || '0'
  //   );

  return (
    <View style={baseStyles.containerFlex}>
      <SearchBarWithRefresh
        dataName={'Service Measures'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={serviceMeasuresItems.length}
      />
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
              No Service Measures to show.
            </Text>
            <Text style={baseStyles.textPromptRibbon}>
              You can view your expired Service Measures at Tools Infoweb.
            </Text>
          </View>
        )
      ) : (
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Visit Tools Infoweb to complete these, or view ended measures.
          </Text>
        </View>
      )}
      {showingDemoData ? (
        <View style={baseStyles.viewDummyDataRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
        </View>
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
          <ServiceMeasuresList
            items={itemsToShow}
            showFullDetails={true}
            displayTimestamp={displayTimestamp}
          />
        </ScrollView>
      )}
    </View>
  );
};
