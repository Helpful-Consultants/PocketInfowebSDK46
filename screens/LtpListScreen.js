import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { revalidateUserCredentials } from '../actions/user';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { sortObjectList } from '../helpers/objects';
import { getLtpRequest } from '../actions/ltp';
import Urls from '../constants/Urls';
import LtpList from './LtpList';
import searchItems from '../helpers/searchItems';
import { useDimensions } from '../helpers/dimensions';
import getBaseStyles from '../helpers/getBaseStyles';
import { selectFetchParamsObj } from '../reducers/user';
// import stringCleaner from '../helpers/stringCleaner';
// import ltpDummyData from '../dummyData/ltpDummyData.js';
const minSearchLength = 1;

export default LtpListScreen = (props) => {
  const dispatch = useDispatch();
  const windowDim = useDimensions();
  const baseStyles = useMemo(
    () => windowDim && getBaseStyles(windowDim),
    [windowDim]
  );

  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const ltpItems = useSelector((state) => state.ltp.ltpItems);
  const isLoading = useSelector((state) => state.ltp.isLoading);
  const dataError = useSelector((state) => state.ltp.error);
  const dataStatusCode = useSelector((state) => state.ltp.statusCode);
  const dataErrorUrl = useSelector((state) => state.ltp.dataErrorUrl);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState([]);
  //   useEffect(() => {
  //     console.log('windowDim changed:', windowDim);
  //   }, [windowDim]);
  const bottomTabHeight =
    windowDim.height && windowDim.height > 1333 ? 100 : 80;

  const getItems = useCallback(() => {
    // console.log(
    //   'LLLLTP in LTP in getItems -fetchParamsObj',
    //   fetchParamsObj && fetchParamsObj
    // );
    dispatch(getLtpRequest(fetchParamsObj));
  }, [dispatch, fetchParamsObj]);

  const refreshRequestHandler = useCallback(() => {
    // console.log('LLLLTP in ltp refreshRequestHandler');
    getItems();
  }, [getItems]);

  const searchInputHandler = (searchInput) => {
    // console.log(
    //   'LLLLTP in ltp list screen searchInputHandler, searchInput',
    //   searchInput
    // );
    setSearchInput(searchInput);
  };

  const selectItemsToShow = useCallback(() => {
    // console.log('LLLLTP in ltp selectItemsToShow');
    if (searchInput && searchInput.length > minSearchLength) {
      setItemsToShow(searchItems(ltpItems, searchInput));
    } else {
      setItemsToShow(ltpItems);
    }
  }, [searchInput, ltpItems]);

  useEffect(() => {
    // console.log(
    //   'LLLLTP in ltp list screen useEffect, setting items to show ',
    //   'isLoading',
    //   isLoading,
    //   'searchInput',
    //   searchInput
    // );

    if (isLoading) {
      //   console.log('still loading');
    } else {
      selectItemsToShow();
    }
  }, [isLoading, selectItemsToShow]);

  //   console.log(
  //     'RENDERING ltp screen 1147 !!!!!!!!!!!!!!!!!!!, dataError ',
  //     dataError
  //   );
  //   console.log(
  //     'rendering LTP Screen',
  //     ltpItems && ltpItems.length,
  //     itemsToShow && itemsToShow.length
  //   );

  useFocusEffect(
    useCallback(() => {
      //   console.log('LLLLTP in ltp list screen usefocusffect, usecallback ');
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
    }, [getItems, setSearchInput])
  );

  //   console.log(
  //     'LTTTTTP RENDERING ltp screen !!!!!!!!!!!!!!!!!!!, isLoading',
  //     isLoading,
  //     'itemsToShow',
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
