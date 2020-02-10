import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
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
// import JobsList from './JobsList';

// import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

const KEYS_TO_FILTERS = [
  'tools.partNumber',
  'tools.toolNumber',
  'tools.partDescription',
  'wipNumber'
];

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
  const [isLyndonAlertVisible, setIsLyndonAlertVisible] = useState(false);
  const [listView, setListView] = useState({});

  const { navigation } = props;

  //   if (!userIsSignedIn) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   console.log('@@@@@@@@@@@@@', userDataObj);

  const getWipsDataObj = {
    dealerId:
      (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
    intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
  };
  //   console.log('before getWips', getWipsDataObj);

  //   const getItems = useCallback(getWipsDataObj => {
  //     // console.log('in getItems', getWipsDataObj);
  //     dispatch(getDealerWipsRequest(getWipsDataObj)), [dealerWipsItems];
  //   });

  const getItems = useCallback(async getWipsDataObj => {
    // console.log('in getItems', getWipsDataObj);
    dispatch(getDealerWipsRequest(getWipsDataObj)), [dealerWipsItems];
  });

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

  useEffect(() => {
    // runs only once
    // console.log('in jobs use effect', isRefreshNeeded);

    const getItemsAsync = async () => {
      setIsRefreshNeeded(false);
      getItems(getWipsDataObj);
    };
    if (isRefreshNeeded === true) {
      getItemsAsync();
    }
  }, [isRefreshNeeded]);

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getWipsDataObj);
    dealerId && userDataObj && userDataObj.intId && getItems(getWipsDataObj);
  };

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in jobs use effect');
  //     setIsLyndonAlertVisible(true);
  //   }, [items]);

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

  const didFocusSubscription = navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
    setIsRefreshNeeded(true);
    // refreshRequestHandler();
  });

  const searchInputHandler = searchInput => {
    // console.log(searchInput);
    setSearchInput(searchInput);
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
        getWipsDataObj: getWipsDataObj
      };

      //   console.log('delete wip ' + currentJob.id);
      //   console.log('delete wip ', payload);
      deleteDealerWip(payload);
    } else {
      let payload = {
        dealerId: dealerId,
        wipObj: currentJob,
        wipToolLineId: currentTool.id,
        getWipsDataObj: getWipsDataObj
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
  //       getWipsDataObj: getWipsDataObj
  //     };
  //     console.log('delete wip ' + currentJob.id);
  //     console.log('delete wip ', payload);
  //     deleteDealerWip(payload);
  //   };

  const items = (!isLoading && !dataError && userWipsItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);

  const filteredItems =
    (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  //   console.log(filteredItems);
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
      {dataError ? null : searchInput.length > 0 &&
        filteredItems.length === 0 ? (
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
            items={filteredItems}
            dataCount={dataCount}
            deleteDealerWipRequest={deleteDealerWip}
            userIntId={
              (userDataObj && userDataObj.intId && userDataObj.intId) || ''
            }
            baseImageUrl={Urls.toolImage}
            returnToolHandler={returnToolHandler}
            returnAllToolsHandler={returnAllToolsHandler}
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

JobsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='My jobs' />,
  headerStyle: {
    backgroundColor: Colors.vwgHeader
  },
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          {
            /*  console.log('pressed menu icon'); */
          }
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

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
