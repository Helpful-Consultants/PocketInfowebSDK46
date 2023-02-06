import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
import AwesomeAlert from 'react-native-awesome-alerts';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import {
  deleteDealerWipRequest,
  deleteDealerWipToolRequest,
  getDealerWipsRequest,
} from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import JobsList from './JobsList';
import searchItems from '../helpers/searchItems';
import { selectFetchParamsObj } from '../reducers/user';
import { selectDealerWipsForUser } from '../reducers/dealerWips';

const minSearchLength = 1;

export default JobsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const userWipsItems = useSelector(selectDealerWipsForUser);
  const isLoading = useSelector((state) => state.dealerWips.isLoading);
  const dataError = useSelector((state) => state.dealerWips.error);
  const dataErrorUrl = useSelector((state) => state.dealerWips.dataErrorUrl);
  const dataStatusCode = useSelector((state) => state.dealerWips.statusCode);
  const [searchInput, setSearchInput] = useState('');
  const [currentJob, setCurrentJob] = useState({});
  const [currentTool, setCurrentTool] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const getItems = useCallback(() => {
    // console.log(
    //   'JOBS *****  in jobs in getItems fetchParamsObj is',
    //   fetchParamsObj
    // );
    dispatch(getDealerWipsRequest(fetchParamsObj));
  }, [dispatch, fetchParamsObj]);
  //   console.log('JOBS *****  in userWipsItems', userWipsItems);

  const deleteDealerWip = useCallback(
    (payload) => {
      dispatch(deleteDealerWipRequest(payload));
    },
    [dispatch, fetchParamsObj]
  );

  const deleteDealerWipTool = useCallback(
    (payload) => {
      dispatch(deleteDealerWipToolRequest(payload));
    },
    [dispatch, fetchParamsObj]
  );

  const refreshRequestHandler = useCallback(() => {
    // console.log('JOBS *****  in Jobs refreshRequestHandler');
    getItems();
  }, [getItems]);

  const searchInputHandler = (searchInput) => {
    // console.log(searchInput);
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = userWipsItems
        ? searchItems(userWipsItems, searchInput)
        : [];
      setFilteredItems(newFilteredItems);
    }
  };

  const returnToolHandler = (job, tool) => {
    // console.log('JOBS *****  in returnToolHandler', job, tool);
    setCurrentJob(job);
    setCurrentTool(tool);
    setIsAlertVisible(true);
  };

  const confirmReturnToolHandler = () => {
    // console.log('JOBS *****  in confirmreturnToolHandler', currentJob);
    // console.log('JOBS *****  in confirmreturnToolHandler', currentTool);
    setIsAlertVisible(false);
    if (currentJob && currentJob.tools && currentJob.tools.length === 1) {
      let payload = {
        wipObj: currentJob,
        fetchParamsObj: fetchParamsObj,
      };
      //   console.log('JOBS *****  delete wip ' + currentJob.id);
      //   console.log('JOBS *****  delete wip ', payload);
      setTimeout(() => deleteDealerWip(payload), 300);
    } else {
      let payload = {
        wipObj: currentJob,
        wipToolLineId: currentTool.id,
        fetchParamsObj: fetchParamsObj,
      };
      //   console.log('JOBS *****  remove ' + currentTool.tools_id + 'from ' + currentJob.id);
      //   console.log('JOBS *****  for wip wip ', payload);

      setTimeout(() => deleteDealerWipTool(payload), 300);
    }
  };

  const returnAllToolsHandler = (job) => {
    // console.log('JOBS *****  in returnToolHandler', job);
    setCurrentJob(job);
    setIsAlertVisible(true);
  };

  //   useEffect(() => {
  //     // console.log(
  //     //   '&&&&&&&&&&&&&&&& fetchParamsObj changed for Jobs',
  //     //   fetchParamsObj
  //     // );
  //     fetchParamsObj &&
  //       fetchParamsObj.dealerId &&
  //       fetchParamsObj.userIntId &&
  //       getItems();
  //   }, [fetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('JOBS *****  in Jobs usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'Jobs Screen',
      //     })
      //   );
      //   console.log('JOBS *****  in Jobs focusffect calling getItems');
      //   dispatch(revalidateUserCredentials({ calledBy: 'JobsScreen' }));

      setSearchInput('');
      getItems();
      //   return () => {
      //     // Do something when the screen is unfocused
      //     // console.log('JOBS *****  Jobs Screen was unfocused');
      //   };
    }, [getItems])
  );

  const dataCount = (userWipsItems && userWipsItems.length) || 0;
  //   console.log(userWipsItems);
  //   const items = (!isLoading && !dataError && userWipsItems) || [];
  //   console.log(items);
  let itemsToShow =
    searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : userWipsItems;
  //   console.log(itemsToShow);
  //   console.log(
  //     'JOBS *****  Rendering Jobs screen ',
  //     items && items.length,
  //     'items ',
  //     fetchParamsObj
  //   );

  return (
    <View style={baseStyles.containerFlexPaddedBtm}>
      <SearchBarWithRefresh
        dataName={'jobs'}
        someDataExpected={false}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataErrorUrl={dataErrorUrl}
        dataCount={
          userWipsItems && userWipsItems.length ? userWipsItems.length : 0
        }
      />
      {dataError ? null : searchInput &&
        searchInput.length &&
        searchInput.length >= minSearchLength ? (
        itemsToShow &&
        itemsToShow.length &&
        itemsToShow.length > 0 ? null : userWipsItems &&
          userWipsItems.length &&
          userWipsItems > 0 ? (
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              Your search found no results.
            </Text>
          </View>
        ) : (
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              You have no jobs yet to search.
            </Text>
          </View>
        )
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing jobs'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          <JobsList
            isLoading={isLoading}
            items={itemsToShow}
            dataCount={dataCount}
            deleteDealerWipRequest={deleteDealerWip}
            userIntId={
              (fetchParamsObj &&
                fetchParamsObj.userIntId &&
                fetchParamsObj.userIntId) ||
              ''
            }
            baseImageUrl={Urls.toolImage}
            returnToolHandler={returnToolHandler}
            returnAllToolsHandler={returnAllToolsHandler}
            searchInput={searchInput}
          />
        </ScrollView>
      )}

      {isAlertVisible ? (
        <AwesomeAlert
          show={isAlertVisible}
          showProgress={false}
          title='Return tool'
          message={`Have you returned ${currentTool.partNumber} (${currentTool.toolNumber}) to its correct location?`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText='Not yet'
          confirmText='Yes'
          confirmButtonColor={Colors.vwgMintGreen}
          cancelButtonColor={Colors.vwgWarmRed}
          onCancelPressed={() => {
            setIsAlertVisible(false);
          }}
          onConfirmPressed={() => {
            confirmReturnToolHandler();
          }}
          contentContainerStyle={{
            borderRadius: Platform.OS === 'ios' ? 6 : 3,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            borderColor: Colors.vwgLightGray,
            borderWidth: 1,
          }}
          overlayStyle={{ height: '100%' }}
          titleStyle={{
            ...baseStyles.textLargeColouredCentred,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          }}
          messageStyle={{ fontFamily: 'the-sans', textAlign: 'center' }}
          confirmButtonTextStyle={{
            ...baseStyles.buttonTitle,
            textAlign: 'center',
            elevation: Platform.OS === 'ios' ? 0 : 5,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          }}
          cancelButtonTextStyle={{
            ...baseStyles.buttonTitle,
            textAlign: 'center',
            elevation: Platform.OS === 'ios' ? 0 : 5,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          }}
          confirmButtonStyle={{
            width: 100,
            borderRadius: Platform.OS === 'ios' ? 3 : 2,
            elevation: Platform.OS === 'ios' ? 0 : 5,
          }}
          cancelButtonStyle={{
            width: 100,
            borderRadius: Platform.OS === 'ios' ? 3 : 2,
          }}
        />
      ) : null}
    </View>
  );
};
