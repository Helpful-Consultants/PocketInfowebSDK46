import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Platform, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';

import { revalidateUserCredentials } from '../actions/user';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { sortObjectList } from '../helpers/objects';
import getBaseStyles from '../helpers/getBaseStyles';
import { getLtpRequest } from '../actions/ltp';
import Urls from '../constants/Urls';
import LtpList from './LtpList';
import searchItems from '../helpers/searchItems';
import { selectFetchParamsObj } from '../reducers/user';
// import stringCleaner from '../helpers/stringCleaner';
// import ltpDummyData from '../dummyData/ltpDummyData.js';
const minSearchLength = 1;

const screenHeight = Math.round(Dimensions.get('window').height);
const bottomTabHeight = screenHeight && screenHeight > 1333 ? 100 : 80;

export default LtpListScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const ltpItems = useSelector((state) => state.ltp.ltpItems);
  const isLoading = useSelector((state) => state.ltp.isLoading);
  const dataError = useSelector((state) => state.ltp.error);
  const dataStatusCode = useSelector((state) => state.ltp.statusCode);
  const dataErrorUrl = useSelector((state) => state.ltp.dataErrorUrl);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const getItems = useCallback(() => {
    // console.log('in LTP in getItems - no fetchParamsObj needed');
    dispatch(getLtpRequest(fetchParamsObj));
  }, [dispatch]);

  const refreshRequestHandler = useCallback(() => {
    // console.log('in ltp refreshRequestHandler');
    getItems();
  }, [getItems]);

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(ltpItems, searchInput);
      //   console.log(
      //     'LTP Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'ltpItems: ',
      //     ltpItems && ltpItems.length,
      //     'itemsToShow: ',
      //     itemsToShow && itemsToShow.length,
      //     'newFilteredItems:',
      //     newFilteredItems && newFilteredItems.length,
      //     newFilteredItems
      //   );
      setFilteredItems(newFilteredItems);
    }
  };

  useFocusEffect(
    useCallback(() => {
      //   console.log('in ltp list screen usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'ltp list screen Screen',
      //     })
      //   );
      //   console.log('in LTP Screen focusffect calling getItems');
      getItems();
      setSearchInput('');

      return () => {
        // Do something when the screen is unfocused
        // console.log('LTP Screen was unfocused');
      };
    }, [getItems])
  );

  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : ltpItems
    : [];
  //   console.log(
  //     'RENDERING ltp screen 1147 !!!!!!!!!!!!!!!!!!!, dataError ',
  //     dataError
  //   );
  //   console.log(
  //     'rendering LTP Screen',
  //     ltpItems && ltpItems.length,
  //     itemsToShow && itemsToShow.length
  //   );

  return (
    <View style={baseStyles.containerFlexAndMargin}>
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
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              Your search found no results.
            </Text>
          </View>
        ) : isLoading ? null : (
          <View style={baseStyles.viewPromptRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              No LTP items to show. Try the refresh button.
            </Text>
          </View>
        )
      ) : (
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
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
