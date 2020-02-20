import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { createFilter } from 'react-native-search-filter';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import BadgedTabBarText from '../components/BadgedTabBarText';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import TabBarIcon from '../components/TabBarIcon';
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
import BookedOutToolsList from './BookedOutToolsList';
// import JobsList from './JobsList';

// import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

// const KEYS_TO_FILTERS = [
//   'partNumber',
//   'toolNumber',
//   'partDescription',
//   'wipNumber'
// ];
const minSearchLength = 1;

export default BookedOutToolsScreen = props => {
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
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bookedOutItems, setBookedOutItems] = useState([]);
  const [bookedOutToolsCount, setBookedOutToolsCount] = useState(0);
  const [userWipsItems, setUserWipsItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [listView, setListView] = useState({});
  //   if (!userIsSignedIn) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   console.log('@@@@@@@@@@@@@', userDataObj);

  const { navigation } = props;
  const insets = useSafeArea();

  let apiFetchParamsObj = {};
  //   console.log('before getWips', apiFetchParamsObj);

  const getItems = useCallback(async apiFetchParamsObj => {
    // console.log('in getItems', apiFetchParamsObj);
    // console.log(
    //   'in booked tools getItems',
    //   apiFetchParamsObj && apiFetchParamsObj
    // );
    dispatch(getDealerWipsRequest(apiFetchParamsObj)), [dealerWipsItems];
  });

  const getItemsAsync = async () => {
    getItems(apiFetchParamsObj);
  };

  const deleteDealerWip = useCallback(
    payload => dispatch(deleteDealerWipRequest(payload)),
    [apiFetchParamsObj]
  );

  const deleteDealerWipTool = useCallback(
    payload => dispatch(deleteDealerWipToolRequest(payload)),
    [apiFetchParamsObj]
  );

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in jobs use effect');
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
  //   });

  //   useFocusEffect(
  //     useCallback(() => {
  //       const getItemsAsync = async () => {
  //         getItems(apiFetchParamsObj);
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
    // console.log('in booked useEffect', userDataObj && userDataObj.dealerId);
    if (userDataObj && userDataObj.dealerId && userDataObj.intId) {
      apiFetchParamsObj = {
        dealerId:
          (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
        intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
      };

      getItemsAsync();
    }
  }, [userDataObj]);

  useFocusEffect(
    useCallback(() => {
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      //   console.log('booked tools - useFocusEffect');
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

  useEffect(() => {
    // console.log('in booked out useEffect userDataObj is:  ', userDataObj);
    let userWipsItems =
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
    setUserWipsItems(userWipsItems);

    const buildBookedOutToolsArrForJob = wip => {
      const thisWipsToolsArr = wip.tools.map(tool => ({
        ...tool,
        wipNumber: wip.wipNumber,
        wipId: wip.id.toString(),
        wipCreatedDate: wip.createdDate
      }));
      return thisWipsToolsArr;
    };

    const buildBookedOutToolsArr = wips => {
      let allToolsArr = [];

      wips.forEach(wip => {
        if (wip.tools && wip.tools.length > 0) {
          let wipToolsArr = buildBookedOutToolsArrForJob(wip);
          allToolsArr.push(...wipToolsArr);
        }
      });
      allToolsArr.sort((a, b) => a.partNumber > b.partNumber);

      return allToolsArr;
    };

    let bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
    setBookedOutItems(bookedOutToolItems);
  }, [userDataObj, dealerWipsItems]);

  const dataCount = (bookedOutItems && bookedOutItems.length) || 0;

  const searchInputHandler = searchInput => {
    // console.log(searchInput, bookedOutItems);
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(bookedOutItems, searchInput);
      setFilteredItems(newFilteredItems);
    }
  };

  const returnToolHandler = item => {
    // console.log('in returnToolHandler', item);
    // console.log('userWipsItems', userWipsItems.length);
    const jobId = item.wipId;
    // console.log('in returnToolHandler jobId is ', jobId);
    const jobObj = userWipsItems.find(item => item.id.toString() === jobId);
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

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', apiFetchParamsObj);
    dealerId && userDataObj && userDataObj.intId && getItems(apiFetchParamsObj);
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

  return (
    <View style={{ flex: 1, paddingBottom: 3, backgroundColor: 'white' }}>
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
          <BookedOutToolsList
            items={itemsToShow}
            someDataExpected={false}
            dataCount={dataCount}
            isLoading={isLoading}
            deleteDealerWipRequest={deleteDealerWip}
            userIntId={(userDataObj && userDataObj.intId) || null}
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

const titleString = 'Booked Tools';
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
        name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
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
    marginBottom: 10
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 100
  },
  text: {
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
