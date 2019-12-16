import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import HeaderButton from '../components/HeaderButton';
import { getStatsRequest } from '../actions/stats';
import { getDealerWipsRequest } from '../actions/dealerWips';
import { getDealerToolsRequest } from '../actions/dealerTools';
import StatsSummary from './StatsSummary';
// import userDummyData from '../dummyData/userDummyData.js';
// import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/content/stats.jpg';

export default StatsScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const statsObj = useSelector(state => state.stats.statsItems[0]);
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const dealerToolsItems = useSelector(
    state => state.dealerTools.dealerToolsItems
  );
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const isLoading = useSelector(state => state.stats.isLoading);
  const dataError = useSelector(state => state.stats.error);

  const getDealerItemsDataObj = {
    dealerId: dealerId,
    intId: userIntId
  };
  console.log('getDealerItemsDataObj is ', getDealerItemsDataObj);

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     getDealerItemsDataObj
  //   ]);

  //   console.log('getStatsData', getStatsData);

  const getItems = useCallback(() => {
    console.log('in getItems', getDealerItemsDataObj);
    dispatch(getStatsRequest(getDealerItemsDataObj)), [statsObj];
    dispatch(getDealerWipsRequest(getDealerItemsDataObj)), [dealerWipsItems];
    dispatch(getDealerToolsRequest(getDealerItemsDataObj)), [dealerToolsItems];
    // dispatch(getLtpRequest()), [ltpItems];
  });

  useEffect(() => {
    // runs only once
    console.log('in stats use effect');
    const getItemsAsync = async () => {
      getItems(getItems);
    };
    getItemsAsync();
  }, [dispatch]);

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getStatsData);
    getItems();
  };

  if (!userIsSignedIn) {
    props.navigation.navigate('SignIn');
  }
  const userDataPresent =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;
  const statsDataCount = (statsObj && Object.keys(statsObj).length > 0) || 0;

  if (userDataPresent === true) {
    // console.log('in stats screen,userDataObj OK', userDataPresent);
  } else {
    // console.log('in stats screen, no userDataObj');
    getUserData();
  }

  const userWipsItems =
    (userIntId &&
      dealerWipsItems &&
      dealerWipsItems.length > 0 &&
      dealerWipsItems.filter(
        item => item.userIntId.toString() == userIntId.toString()
      )) ||
    [];

  //   console.log('dealerWipsItems ', userWipsItems);

  const activeJobsCount = (userWipsItems && userWipsItems.length) || 0;
  const dealerToolsCount = (dealerToolsItems && dealerToolsItems.length) || 0;

  //   console.log('dealerToolsItems count ', dealerToolsItems.length);
  //   console.log('userWipsItems count ', userWipsItems.length);

  //   console.log('statsobj', statsObj);

  const effectiveness =
    statsObj.loggedTools && dealerToolsItems && dealerToolsItems.length
      ? ((100 * statsObj.loggedTools) / dealerToolsItems.length)
          .toFixed(2)
          .toString() + '%'
      : 'N/A';

  return (
    <View style={styles.container}>
      <DataAlertBarWithRefresh
        dataName={'stats'}
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={statsDataCount}
      />
      <ScrollView>
        <StatsSummary
          statsObj={statsObj}
          userDataObj={userDataObj}
          activeJobsCount={activeJobsCount}
          dealerToolsCount={dealerToolsCount}
          effectiveness={effectiveness}
        />
      </ScrollView>
    </View>
  );
};

StatsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Stats' />,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
