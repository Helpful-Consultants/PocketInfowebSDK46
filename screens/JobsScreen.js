import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
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
import searchItems from '../components/searchItems';

const minSearchLength = 1;

const identifyUserWipsItems = (userApiFetchParamsObj, dealerWipsItems) =>
  (userApiFetchParamsObj &&
    userApiFetchParamsObj.intId &&
    dealerWipsItems &&
    dealerWipsItems.length > 0 &&
    dealerWipsItems.filter(
      (item) =>
        item.userIntId &&
        item.userIntId.toString() == userApiFetchParamsObj.intId.toString() &&
        item.tools &&
        item.tools.length > 0
    )) ||
  [];

export default JobsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  const userApiFetchParamsObj = useSelector(
    (state) => state.user.userApiFetchParamsObj
  );
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
  const [filteredItems, setFilteredItems] = useState([]);

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    dispatch(getDealerWipsRequest(userApiFetchParamsObj)), [dealerWipsItems];
  });

  const getItemsAsync = async () => {
    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };

  const deleteDealerWip = useCallback(
    (payload) => dispatch(deleteDealerWipRequest(payload)),
    [dealerWipsItems]
  );

  const deleteDealerWipTool = useCallback(
    (payload) => dispatch(deleteDealerWipToolRequest(payload)),
    [dealerWipsItems]
  );

  useEffect(() => {
    // runs only once
    console.log('in jobs useEffect', userApiFetchParamsObj);
    //   setGetWipsDataObj(userApiFetchParamsObj);
    getItemsAsync();
  }, [userApiFetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('job - useFocusEffect');
      dispatch(revalidateUserCredentials({ calledBy: 'JobsScreen' }));
      setSearchInput('');
      getItemsAsync();
    }, [userApiFetchParamsObj])
  );

  const userWipsItems = identifyUserWipsItems(
    userApiFetchParamsObj,
    dealerWipsItems
  );
  const dataCount = (userWipsItems && userWipsItems.length) || 0;

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', userApiFetchParamsObj);
    getItemsAsync();
  };

  const searchInputHandler = (searchInput) => {
    // console.log(searchInput);
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(userWipsItems, searchInput);
      setFilteredItems(newFilteredItems);
    }
  };

  const returnToolHandler = (job, tool) => {
    // console.log('in returnToolHandler', job, tool);
    setCurrentJob(job);
    setCurrentTool(tool);
    setIsAlertVisible(true);
  };

  const confirmReturnToolHandler = () => {
    // console.log('in confirmreturnToolHandler', currentJob);
    // console.log('in confirmreturnToolHandler', currentTool);
    setIsAlertVisible(false);
    if (currentJob && currentJob.tools && currentJob.tools.length === 1) {
      let payload = {
        dealerId: userApiFetchParamsObj.dealerId,
        wipObj: currentJob,
        userApiFetchParamsObj: userApiFetchParamsObj,
      };
      //   console.log('delete wip ' + currentJob.id);
      //   console.log('delete wip ', payload);
      deleteDealerWip(payload);
    } else {
      let payload = {
        dealerId: userApiFetchParamsObj.dealerId,
        wipObj: currentJob,
        wipToolLineId: currentTool.id,
        userApiFetchParamsObj: userApiFetchParamsObj,
      };
      //   console.log('remove ' + currentTool.tools_id + 'from ' + currentJob.id);
      //   console.log('for wip wip ', payload);
      deleteDealerWipTool(payload);
    }
  };

  const returnAllToolsHandler = (job) => {
    // console.log('in returnToolHandler', job);
    setCurrentJob(job);
    setIsAlertVisible(true);
  };

  const items = (!isLoading && !dataError && userWipsItems) || [];

  let itemsToShow =
    searchInput && searchInput.length > minSearchLength ? filteredItems : items;

  //   console.log(
  //     'Rendering Jobs screen ',
  //     items.length,
  //     'items ',
  //     userApiFetchParamsObj
  //   );
  //   console.log(
  //     'isLoading ',
  //     isLoading,
  //     'dataError ',
  //     dataError,
  //     'statusCode ',
  //     dataStatusCode,
  //     ' items ',
  //     items.length
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
        dataCount={userWipsItems.length}
      />
      {dataError ? null : searchInput &&
        searchInput.length &&
        searchInput.length >= minSearchLength ? (
        items && items.length && items.length === 0 ? (
          <View style={baseStyles.noneFoundPromptRibbon}>
            <Text style={baseStyles.promptRibbonText}>
              Your search found no results.
            </Text>
          </View>
        ) : (
          <View style={baseStyles.noneFoundPromptRibbon}>
            <Text style={baseStyles.promptRibbonText}>
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
              (userApiFetchParamsObj &&
                userApiFetchParamsObj.intId &&
                userApiFetchParamsObj.intId) ||
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
          }}
          titleStyle={{
            ...baseStyles.textColoured,
            textAlign: 'center',
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          }}
          messageStyle={{ fontFamily: 'the-sans', textAlign: 'center' }}
          confirmButtonTextStyle={{
            ...baseStyles.text,
            color: Colors.vwgWhite,
            textAlign: 'center',
            elevation: Platform.OS === 'ios' ? 0 : 5,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          }}
          cancelButtonTextStyle={{
            ...baseStyles.text,
            color: Colors.vwgWhite,
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

const titleString = 'My Jobs';
// const tabBarLabelFunction = ({ focused }) => (
//   <BadgedTabBarText
//     showBadge={false}
//     text={titleString}
//     focused={focused}
//     value={0}
//   />
// );
export const screenOptions = (navData) => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,

    headerStyle: {
      backgroundColor: Colors.vwgHeader,
    },
    tabBarColor: Colors.vwgWhite,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'}
        size={size}
      />
    ),
  };
};
