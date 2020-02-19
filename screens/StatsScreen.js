import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { getStatsRequest } from '../actions/stats';
import { getDealerWipsRequest } from '../actions/dealerWips';
import { getDealerToolsRequest } from '../actions/dealerTools';
import StatsSummary from './StatsSummary';
import Colors from '../constants/Colors';
// import userDummyData from '../dummyData/userDummyData.js';
// import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

export default StatsScreen = props => {
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
  const dataStatusCode = useSelector(state => state.odis.statusCode);
  const dataErrorUrl = useSelector(state => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  const apiFetchParamsObj = {
    dealerId: dealerId,
    intId: userIntId
  };
  //   console.log('apiFetchParamsObj is set to ', apiFetchParamsObj);

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     apiFetchParamsObj
  //   ]);

  //   console.log('getStatsData', getStatsData);

  const { navigation } = props;

  const getItems = useCallback(async () => {
    // console.log('in stats getItems');
    dispatch(getStatsRequest(apiFetchParamsObj)), [statsObj];
    // dispatch(getDealerWipsRequest(apiFetchParamsObj)), [dealerWipsItems];
    // dispatch(getDealerToolsRequest(apiFetchParamsObj)), [dealerToolsItems];
    // dispatch(getLtpRequest()), [ltpItems];
  });

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

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     setIsRefreshNeeded(true);
  //   });

  useFocusEffect(
    useCallback(() => {
      const getItemsAsync = async () => {
        getItems();
      };

      getItemsAsync();
    }, [])
  );

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getStatsData);
    getItems();
  };

  //   if (!userIsSignedIn) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  const userDataPresent =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;
  const statsDataCount = (statsObj && Object.keys(statsObj).length > 0) || 0;

  if (userDataPresent === true) {
    // console.log('in stats screen,userDataObj OK', userDataPresent);
  } else {
    // console.log('in stats screen, no userDataObj');
    getItems();
  }

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

  //   console.log('dealerWipsItems ', userWipsItems);

  const activeJobsCount = (userWipsItems && userWipsItems.length) || 0;
  const dealerToolsCount = (dealerToolsItems && dealerToolsItems.length) || 0;

  //   console.log('dealerToolsItems count ', dealerToolsItems.length);
  //   console.log('userWipsItems count ', userWipsItems.length);

  //   console.log('statsobj', statsObj && statsObj);

  const effectiveness =
    statsObj &&
    statsObj.loggedTools &&
    dealerToolsItems &&
    dealerToolsItems.length
      ? ((100 * statsObj.loggedTools) / dealerToolsItems.length)
          .toFixed(0)
          .toString() + '%'
      : 'N/A';

  return (
    <View style={styles.container}>
      <DataAlertBarWithRefresh
        dataName={'stats'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={statsDataCount}
      />
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing the stats data'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <View style={styles.statsContainer}>
          <StatsSummary
            statsObj={statsObj}
            userDataObj={userDataObj}
            activeJobsCount={activeJobsCount}
            dealerToolsCount={dealerToolsCount}
            effectiveness={effectiveness}
          />
        </View>
      )}
    </View>
  );
};
const titleString = 'Stats';
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
        name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
      />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'blue'
  }
});
