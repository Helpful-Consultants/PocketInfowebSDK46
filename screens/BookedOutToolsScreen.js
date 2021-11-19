import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import sortObjectList from '../helpers/sortObjectList';
import { revalidateUserCredentials } from '../actions/user';
import {
  deleteDealerWipRequest,
  deleteDealerWipToolRequest,
  getDealerWipsRequest,
} from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import BookedOutToolsList from './BookedOutToolsList';
import { selectFetchParamsObj } from '../reducers/user';

const minSearchLength = 1;

export default BookedOutToolsScreen = (props) => {
  //   console.log('BookedOutToolsScreen props', props);
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const isLoading = useSelector((state) => state.dealerWips.isLoading);
  const dataError = useSelector((state) => state.dealerWips.error);
  const dataErrorUrl = useSelector((state) => state.dealerWips.dataErrorUrl);
  const dataStatusCode = useSelector((state) => state.dealerWips.statusCode);
  const [searchInput, setSearchInput] = useState('');
  const [currentJob, setCurrentJob] = useState({});
  const [currentTool, setCurrentTool] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bookedOutItems, setBookedOutItems] = useState([]);
  const [userWipsItems, setUserWipsItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const baseStyles = windowDim && getBaseStyles(windowDim);

  const getItems = useCallback(async (fetchParamsObj) => {
    // console.log('in getItems', fetchParamsObj);
    // console.log(
    //   'in booked tools getItems',
    //   fetchParamsObj && fetchParamsObj
    // );
    dispatch(getDealerWipsRequest(fetchParamsObj)), [dealerWipsItems];
  });

  const getItemsAsync = async () => {
    if (fetchParamsObj && fetchParamsObj.userIntId && fetchParamsObj.dealerId) {
      getItems(fetchParamsObj);
    }
  };

  const deleteDealerWip = useCallback(
    (payload) => dispatch(deleteDealerWipRequest(payload)),
    [fetchParamsObj]
  );

  const deleteDealerWipTool = useCallback(
    (payload) => dispatch(deleteDealerWipToolRequest(payload)),
    [fetchParamsObj]
  );

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in jobs use effect');
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems(fetchParamsObj);
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     if (searchInput && searchInput.length > 0) {
  //       setSearchInput('');
  //     }
  //     setIsRefreshNeeded(true);
  //   });

  //   useFocusEffect(
  //     useCallback(() => {
  //       const getItemsAsync = async () => {
  //         getItems(fetchParamsObj);
  //       };
  //       //   if (searchInput && searchInput.length > 0) {
  //       //     setSearchInput('');
  //       //   }
  //       setSearchInput('');
  //       getItemsAsync();
  //     }, [])
  //   );

  useEffect(() => {
    // runs only once
    // console.log('in booked useEffect', fetchParamsObj && fetchParamsObj.dealerId);
    getItemsAsync();
  }, [fetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      //   console.log('booked tools - useFocusEffect');
      dispatch(revalidateUserCredentials({ calledBy: 'BookedOutToolScreen' }));
      setSearchInput('');
      getItemsAsync();
    }, [])
  );

  useEffect(() => {
    console.log(
      'in booked out useEffect fetchParamsObj is:  ',
      fetchParamsObj && fetchParamsObj
    );
    let userWipsItems =
      (fetchParamsObj &&
        fetchParamsObj.userIntId &&
        dealerWipsItems &&
        dealerWipsItems.length > 0 &&
        dealerWipsItems.filter(
          (item) =>
            item.tools &&
            item.tools.length > 0 &&
            item.userIntId &&
            item.userIntId.toString() == fetchParamsObj.userIntId.toString()
        )) ||
      [];
    setUserWipsItems(userWipsItems);

    const buildBookedOutToolsArrForJob = (wip) => {
      const thisWipsToolsArr = wip.tools.map((tool) => ({
        ...tool,
        wipNumber: wip.wipNumber,
        wipId: wip.id.toString(),
        wipCreatedDate: wip.createdDate,
      }));
      return thisWipsToolsArr;
    };

    const buildBookedOutToolsArr = (wips) => {
      let allToolsArr = [];

      wips.forEach((wip) => {
        if (wip.tools && wip.tools.length > 0) {
          let wipToolsArr = buildBookedOutToolsArrForJob(wip);
          allToolsArr.push(...wipToolsArr);
        }
      });
      //   allToolsArr.sort((a, b) => a.partNumber > b.partNumber);
      return sortObjectList(allToolsArr, 'partNumber', 'asc');
    };

    let bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
    setBookedOutItems(bookedOutToolItems);
  }, [fetchParamsObj, dealerWipsItems]);

  const dataCount = (bookedOutItems && bookedOutItems.length) || 0;
  console.log(
    '&&&&&&&&&&&&&&&& in booked out  dealerWipsItems ',
    dealerWipsItems && dealerWipsItems.length
  );
  console.log('&&&&&&&&&&&&&&&& in booked out userWipsItems ', dataCount);

  const searchInputHandler = (searchInput) => {
    // console.log(searchInput, bookedOutItems);
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(bookedOutItems, searchInput);
      setFilteredItems(newFilteredItems);
    }
  };

  const returnToolHandler = (item) => {
    // console.log('in returnToolHandler', item);
    // console.log('userWipsItems', userWipsItems.length);
    const jobId = item.wipId;
    // console.log('in returnToolHandler jobId is ', jobId);
    const jobObj = userWipsItems.find((item) => item.id.toString() === jobId);
    // const jobObj = jobArr[0];
    // console.log('jobArr', jobArr);
    // console.log('in returnToolHandler jobObj is ', jobObj);
    setCurrentJob(jobObj);
    setCurrentTool(item);
    setIsAlertVisible(true);
  };

  const confirmReturnToolHandler = () => {
    // console.log('in confirmreturnToolHandler', currentJob);
    // console.log('in confirmreturnToolHandler', currentTool);
    setIsAlertVisible(false);
    if (currentJob && currentJob.tools && currentJob.tools.length === 1) {
      let payload = {
        dealerId: fetchParamsObj.dealerId,
        wipObj: currentJob,
        fetchParamsObj: fetchParamsObj,
      };

      //   console.log('delete wip ' + currentJob.id);
      //   console.log('delete wip ', payload);
      deleteDealerWip(payload);
    } else {
      let payload = {
        dealerId: fetchParamsObj.dealerId,
        wipObj: currentJob,
        wipToolLineId: currentTool.id,
        fetchParamsObj: fetchParamsObj,
      };
      //   console.log('remove ' + currentTool.tools_id + 'from ' + currentJob.id);
      //   console.log('for wip wip ', payload);
      deleteDealerWipTool(payload);
    }
  };

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', fetchParamsObj);
    getItemsAsync();
  };
  //   console.log('bookedOutItems', bookedOutItems);
  //   const filteredItems =
  //     (!isLoading &&
  //       bookedOutItems.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
  //     [];

  let itemsToShow =
    searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : bookedOutItems;

  //   console.log(
  //     'RENDERING booked out tools screen !!!!!!!!!!!!!!!!!!!'
  //   );

  //   console.log('rendering Booked Tools screen');
  //   console.log('searchInput.length', searchInput && searchInput.length);
  //   console.log('itemsToShow.length', itemsToShow && itemsToShow.length);

  return (
    <View style={baseStyles.containerFlexPaddedBtm}>
      <SearchBarWithRefresh
        dataName={'booked out tools'}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={userWipsItems.length}
      />
      {dataError ? null : searchInput &&
        searchInput.length &&
        searchInput.length >= minSearchLength ? (
        itemsToShow &&
        itemsToShow.length &&
        itemsToShow.length > 0 ? null : bookedOutItems &&
          bookedOutItems.length &&
          bookedOutItems.length > 0 ? (
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
          <BookedOutToolsList
            items={itemsToShow}
            someDataExpected={false}
            dataCount={dataCount}
            isLoading={isLoading}
            deleteDealerWipRequest={deleteDealerWip}
            userIntId={(fetchParamsObj && fetchParamsObj.userIntId) || null}
            baseImageUrl={Urls.toolImage}
            returnToolHandler={returnToolHandler}
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
