import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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
import BookedOutToolsList from './BookedOutToolsList';
// import JobsList from './JobsList';

// import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

const KEYS_TO_FILTERS = [
  'partNumber',
  'toolNumber',
  'partDescription',
  'wipNumber'
];
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
  const [userWipsItems, setUserWipsItems] = useState([]);
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

  const getItems = useCallback(
    async getWipsDataObj => {
      // console.log('in getItems', getWipsDataObj);
      dispatch(getDealerWipsRequest(getWipsDataObj));
    },
    [getWipsDataObj]
  );

  const deleteDealerWip = useCallback(
    payload => dispatch(deleteDealerWipRequest(payload)),
    [getWipsDataObj]
  );

  const deleteDealerWipTool = useCallback(
    payload => dispatch(deleteDealerWipToolRequest(payload)),
    [getWipsDataObj]
  );

  useEffect(() => {
    // runs only once
    // console.log('in jobs use effect');
    const getItemsAsync = async () => {
      getItems(getWipsDataObj);
    };
    getItemsAsync();
  }, []);

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

    let bookedOutToolItems = buildBookedOutToolsArr(userWipsItems);
    setBookedOutItems(bookedOutToolItems);
  }, [userDataObj, dealerWipsItems]);

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
      let wipToolsArr = buildBookedOutToolsArrForJob(wip);
      allToolsArr.push(...wipToolsArr);
    });
    allToolsArr.sort((a, b) => a.partNumber > b.partNumber);

    return allToolsArr;
  };

  const dataCount = (bookedOutItems && bookedOutItems.length) || 0;

  const didFocusSubscription = props.navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
  });

  const searchInputHandler = searchInput => {
    // console.log(searchInput);
    setSearchInput(searchInput);
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

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getWipsDataObj);
    dealerId && userDataObj.intId && getItems(getWipsDataObj);
  };
  //   console.log('bookedOutItems', bookedOutItems);
  const filteredItems =
    (!isLoading &&
      bookedOutItems.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  console.log(
    'RENDERING booked out tools screen !!!!!!!!!!!!!!!!!!!'
    // userWipsItems
  );

  return (
    <View>
      {/* <NewJobButton setIsAlertVisible={setIsAlertVisible} /> */}
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
          errorSummary={'Error getting jobs'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          <BookedOutToolsList
            items={filteredItems}
            someDataExpected={false}
            dataCount={dataCount}
            isLoading={isLoading}
            deleteDealerWipRequest={deleteDealerWip}
            userIntId={(userDataObj && userDataObj.intId) || null}
            baseImageUrl={Urls.toolImage}
            returnToolHandler={returnToolHandler}
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
          titleStyle={{ fontFamily: 'the-sans', textAlign: 'center' }}
          messageStyle={{ fontFamily: 'the-sans', textAlign: 'center' }}
          confirmButtonTextStyle={{
            fontFamily: 'the-sans',
            textAlign: 'center'
          }}
          cancelButtonTextStyle={{
            fontFamily: 'the-sans',
            textAlign: 'center'
          }}
          confirmButtonStyle={{ width: 100 }}
          cancelButtonStyle={{ width: 100 }}
        />
      ) : null}
    </View>
  );
};

BookedOutToolsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Booked Tools' />,
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
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
    paddingTop: 15
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
