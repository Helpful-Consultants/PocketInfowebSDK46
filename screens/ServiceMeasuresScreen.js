import React, { useCallback, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
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
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);
  const [searchInput, setSearchInput] = useState('');
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);
  const userApiFetchParamsObj = {
    dealerId: (userDataObj && userDataObj.dealerId) || null,
    intId: (userDataObj && userDataObj.intId.toString()) || null,
  };

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

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    // console.log(
    //   'in serviceMeasures getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
    dispatch(getServiceMeasuresRequest(userApiFetchParamsObj)),
      [serviceMeasuresItems];
  });

  const getItemsAsync = async () => {
    // console.log(
    //   'ServiceMeasures screen getItemsAsync, userApiFetchParamsObj:',
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
    // console.log('+++++++++++++++=in storeDisplayTimestampAsync:');
    displayTime = Date.now();
    dispatch(setServiceMeasuresDisplayTimestamp({ displayTime }));
  };
  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in stats use effect');
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
  //     console.log('in serviceMeasures useEffect', userApiFetchParamsObj);
  //     //   setGetWipsDataObj(userApiFetchParamsObj);
  //     getItemsAsync();
  //   }, [userApiFetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        revalidateUserCredentials({
          calledBy: 'ServiceMeasures Screen',
        })
      );
      //   console.log('in serviceMeasures focusffect ');
      setSearchInput('');
      getItemsAsync();
      storeDisplayTimestampAsync();
    }, [])
  );

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItemsAsync();
  };

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
