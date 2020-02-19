import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import { createFilter } from 'react-native-search-filter';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import BadgedTabBarText from '../components/BadgedTabBarText';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import HeaderButton from '../components/HeaderButton';
import ErrorDetails from '../components/ErrorDetails';
// import NewJobButton from '../components/NewJobButton';
// import BookToJobModal from '../components/BookToJobModal';
// import Alert from '../components/Alert';
import {
  //   createDealerWipRequest,
  deleteDealerWipRequest,
  deleteDealerWipToolRequest,
  getDealerWipsRequest
} from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import JobsList from './JobsList';

import searchItems from '../components/searchItems';
// import JobsList from './JobsList';

// import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

// const KEYS_TO_FILTERS = [
//   'tools.partNumber',
//   'tools.toolNumber',
//   'tools.partDescription',
//   'wipNumber'
// ];

const minSearchLength = 1;

export default JobsScreen = props => {
  const dispatch = useDispatch();
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;

  const isLoading = useSelector(state => state.dealerWips.isLoading);
  const dataError = useSelector(state => state.dealerWips.error);
  const dataErrorUrl = useSelector(state => state.dealerWips.dataErrorUrl);
  const dataStatusCode = useSelector(state => state.dealerWips.statusCode);
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [currentJob, setCurrentJob] = useState({});
  const [currentTool, setCurrentTool] = useState({});
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  let apiFetchParamsObj = {};

  const getItems = useCallback(async apiFetchParamsObj => {
    // console.log('in getItems', apiFetchParamsObj);
    // console.log('in jobs getItems', apiFetchParamsObj && apiFetchParamsObj);
    dispatch(getDealerWipsRequest(apiFetchParamsObj)), [dealerWipsItems];
  });

  const getItemsAsync = async () => {
    getItems(apiFetchParamsObj);
  };

  const deleteDealerWip = useCallback(
    payload => dispatch(deleteDealerWipRequest(payload)),
    [dealerWipsItems]
  );

  const deleteDealerWipTool = useCallback(
    payload => dispatch(deleteDealerWipToolRequest(payload)),
    [dealerWipsItems]
  );
  //   const createDealerWip = useCallback(
  //     wipData => dispatch(createDealerWipRequest(wipData)),
  //     [dealerWipsItems]
  //   );

  //   console.log('in jobs screen, wipsItems', JSON.parse(dealerWipsItems));

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in jobs use effect', isRefreshNeeded);

  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems(apiFetchParamsObj);
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
  //     // refreshRequestHandler();
  //   });

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

  useEffect(() => {
    // runs only once
    // console.log('in jobs useEffect', userDataObj && userDataObj.dealerId);
    if (userDataObj && userDataObj.dealerId && userDataObj.intId) {
      apiFetchParamsObj = {
        dealerId:
          (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
        intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
      };
      //   setGetWipsDataObj(apiFetchParamsObj);
      getItemsAsync();
    }
  }, [userDataObj]);

  useFocusEffect(
    useCallback(() => {
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      //   console.log('job - useFocusEffect');
      setSearchInput('');
      if (
        apiFetchParamsObj &&
        apiFetchParamsObj.intId &&
        apiFetchParamsObj.dealerId
      ) {
        getItemsAsync();
      }
    }, [])
  );

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', apiFetchParamsObj);
    dealerId && userDataObj && userDataObj.intId && getItems(apiFetchParamsObj);
  };

  //   if (dealerWipsItems && dealerWipsItems.length > 0) {
  //     console.log('in jobs screen, wipsItems', dealerWipsItems.length, userIntId);
  //   } else {
  //     console.log('in jobs screen, no wipsItems');
  //   }

  const userWipsItems =
    (userDataObj &&
      userDataObj.intId &&
      dealerWipsItems &&
      dealerWipsItems.length > 0 &&
      dealerWipsItems.filter(
        item =>
          item.userIntId &&
          item.userIntId.toString() == userDataObj.intId.toString()
      )) ||
    [];

  const dataCount = (userWipsItems && userWipsItems.length) || 0;
  //   console.log('£££££unsortedUserWipsItems start');
  //   console.log(unsortedUserWipsItems);
  //   console.log('£££££unsortedUserWipsItems end');

  //   const userWipsItems = [].concat(unsortedUserWipsItems);

  //   userWipsItems.sort((a, b) =>
  //     moment(a.createdDate, 'DD/MM/YYYY HH:MM:SS').isAfter(
  //       moment(b.createdDate, 'DD/MM/YYYY HH:MM:SS')
  //     )
  //   );
  //   console.log('£££££userWipsItems start');
  //   console.log(userWipsItems);
  //   console.log('£££££userWipsItems end');
  //   console.log('userWipsItems ', userWipsItems);
  // const { dealerWipsItems } = this.props;
  // console.log('in DealerWipsScreen, dealerWips ', this.props);
  // console.log('in DealerWipsScreen, dealerWips end');
  // console.log('Find DealerWips screen');
  // console.log(dealerWipsItems);
  // console.log('Find DealerWips screen end');

  const searchInputHandler = searchInput => {
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
        dealerId: dealerId,
        wipObj: currentJob,
        apiFetchParamsObj: apiFetchParamsObj
      };

      //   console.log('delete wip ' + currentJob.id);
      //   console.log('delete wip ', payload);
      deleteDealerWip(payload);
    } else {
      let payload = {
        dealerId: dealerId,
        wipObj: currentJob,
        wipToolLineId: currentTool.id,
        apiFetchParamsObj: apiFetchParamsObj
      };
      //   console.log('remove ' + currentTool.tools_id + 'from ' + currentJob.id);
      //   console.log('for wip wip ', payload);
      deleteDealerWipTool(payload);
    }
  };

  const returnAllToolsHandler = job => {
    // console.log('in returnToolHandler', job);
    setCurrentJob(job);
    setIsAlertVisible(true);
  };

  //   const confirmReturnAllToolsHandler = () => {
  //     console.log('in confirmreturnToolHandler', currentJob);
  //     setIsAlertVisible(false);

  //     let payload = {
  //       dealerId: dealerId,
  //       wipObj: currentJob,
  //       apiFetchParamsObj: apiFetchParamsObj
  //     };
  //     console.log('delete wip ' + currentJob.id);
  //     console.log('delete wip ', payload);
  //     deleteDealerWip(payload);
  //   };

  const items = (!isLoading && !dataError && userWipsItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);

  //   const filteredItems =
  //     (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
  //     [];

  let itemsToShow =
    searchInput && searchInput.length > minSearchLength ? filteredItems : items;
  //   const items = dealerWipsItems;
  // const items = dealerWipsDummyData;
  // const { search } = this.state;
  // console.log('items');
  // console.log(items);
  // console.log('items end');
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips.items);
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips);
  // console.log('in DealerWipsScreen, dealerWips', dealerWips && dealerWips);
  //   console.log('userIntId ', userIntId);
  //   console.log('userWipsItems sent to JobsList', userWipsItems);

  //   console.log('RENDERING jobs screen !!!!!!!!!!!!!!!!!!!');
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
    <View style={styles.container}>
      {/* <NewJobButton setIsAlertVisible={setIsAlertVisible} /> */}
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
      {dataError ? null : searchInput.length >= minSearchLength &&
        itemsToShow.length === 0 ? (
        <View style={styles.noneFoundPrompt}>
          <Text style={styles.noneFoundPromptText}>
            Your search found no results.
          </Text>
        </View>
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
              (userDataObj && userDataObj.intId && userDataObj.intId) || ''
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
            elevation: Platform.OS === 'ios' ? 0 : 5
          }}
          titleStyle={{
            fontFamily: 'the-sans',
            textAlign: 'center',
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
          }}
          messageStyle={{ fontFamily: 'the-sans', textAlign: 'center' }}
          confirmButtonTextStyle={{
            fontFamily: 'the-sans',
            textAlign: 'center',
            elevation: Platform.OS === 'ios' ? 0 : 5,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
          }}
          cancelButtonTextStyle={{
            fontFamily: 'the-sans',
            textAlign: 'center',
            elevation: Platform.OS === 'ios' ? 0 : 5,
            textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
          }}
          confirmButtonStyle={{
            width: 100,
            borderRadius: Platform.OS === 'ios' ? 3 : 2,
            elevation: Platform.OS === 'ios' ? 0 : 5
          }}
          cancelButtonStyle={{
            width: 100,
            borderRadius: Platform.OS === 'ios' ? 3 : 2
          }}
        />
      ) : null}
    </View>
  );
};
const titleString = 'My Jobs';
const tabBarLabelFunction = ({ focused }) => (
  <BadgedTabBarText
    showBadge={false}
    text={titleString}
    focused={focused}
    value={0}
  />
);
export const screenOptions = navData => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,

    headerStyle: {
      backgroundColor: Colors.vwgHeader
    },
    tabBarColor: Colors.vwgWhite,
    tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'}
      />
    )
  };
};

// LocatorScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='DealerWip Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    paddingBottom: 10
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 100
  },
  text: {
    fontFamily: 'the-sans',
    color: '#3f2949',
    marginTop: 10
  },
  noneFoundPrompt: {
    fontFamily: 'the-sans',
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    color: Colors.vwgWhite
  }
});
