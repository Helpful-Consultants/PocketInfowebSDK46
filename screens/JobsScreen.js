import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
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
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [currentJob, setCurrentJob] = useState({});
  const [currentTool, setCurrentTool] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLyndonAlertVisible, setIsLyndonAlertVisible] = useState(false);
  const [listView, setListView] = useState({});
  if (!userIsSignedIn) {
    props.navigation.navigate('SignIn');
  }
  //   console.log('@@@@@@@@@@@@@', userDataObj);

  const getWipsDataObj = userDataObj && {
    dealerId: userDataObj.dealerId,
    intId: userDataObj.intId
  };
  //   console.log('before getWips', getWipsDataObj);

  const getItems = useCallback(getWipsDataObj => {
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
    // console.log('in jobs use effect');
    const getItemsAsync = async () => {
      getItems(getWipsDataObj);
    };
    getItemsAsync();
  }, [dispatch]);

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getWipsDataObj);
    dealerId && userDataObj.intId && getItems(getWipsDataObj);
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
    (userDataObj.intId &&
      dealerWipsItems &&
      dealerWipsItems.length > 0 &&
      dealerWipsItems.filter(
        item => item.userIntId.toString() == userDataObj.intId.toString()
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

  const didFocusSubscription = props.navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
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

  console.log('RENDERING jobs screen !!!!!!!!!!!!!!!!!!!');

  return (
    <View>
      {/* <NewJobButton setIsAlertVisible={setIsAlertVisible} /> */}
      <SearchBarWithRefresh
        dataName={'jobs'}
        someDataExpected={false}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={userWipsItems.length}
      />
      <ScrollView>
        <JobsList
          isLoading={isLoading}
          items={filteredItems}
          dataCount={dataCount}
          deleteDealerWipRequest={deleteDealerWip}
          userIntId={userDataObj.intId}
          baseImageUrl={Urls.toolImage}
          returnToolHandler={returnToolHandler}
          returnAllToolsHandler={returnAllToolsHandler}
        />
      </ScrollView>
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
        />
      ) : null}
      {isLyndonAlertVisible ? (
        <AwesomeAlert
          show={isLyndonAlertVisible}
          showProgress={false}
          title='Hello Lyndon'
          message={`We are enhancing the feed to and from the web server to remove one tool at a time from a job. Till that's done, you can only return all the tools for a job in one go.`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText='Close'
          cancelButtonColor={Colors.vwgDeepBlue}
          onCancelPressed={() => {
            setIsLyndonAlertVisible(false);
          }}
        />
      ) : null}
    </View>
  );
};

JobsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='My jobs' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
          navigation.navigate('HomeScreen');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
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
    paddingTop: 15,
    backgroundColor: '#fff'
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
  }
});
