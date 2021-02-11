import React, { useCallback, useEffect, useState } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getStatsRequest } from '../actions/stats';
import { getDealerWipsRequest } from '../actions/dealerWips';
import { getDealerToolsRequest } from '../actions/dealerTools';
import StatsSummary from './StatsSummary';
import Colors from '../constants/Colors';
// import userDummyData from '../dummyData/userDummyData.js';
// import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

export default StatsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const statsObj = useSelector((state) => state.stats.statsItems[0]);
  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const dealerToolsItems = useSelector(
    (state) => state.dealerTools.dealerToolsItems
  );
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const userApiFetchParamsObj = {
    dealerId: dealerId,
    intId: userIntId,
  };
  //   console.log('userApiFetchParamsObj is set to ', userApiFetchParamsObj);

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getStatsData', getStatsData);

  //   const { navigation } = props;

  const getItems = useCallback(async () => {
    // console.log('in stats getItems');
    //  dispatch(getStatsRequest(userApiFetchParamsObj)), [statsObj];
    // dispatch(getDealerWipsRequest(userApiFetchParamsObj)), [dealerWipsItems];
    // dispatch(getDealerToolsRequest(userApiFetchParamsObj)), [dealerToolsItems];
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
      dispatch(revalidateUserCredentials({ calledBy: 'AlertsScreen' }));
      getItemsAsync();
    }, [])
  );

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getStatsData);
    getItems();
  };

  //   if (!userIsValidated) {
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

  console.log('rendering Alerts screen');

  return (
    <View>
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
        <View>
          <p>Alerts Screen</p>
        </View>
      )}
    </View>
  );
};
const titleString = 'Alerts';
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
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
        size={size}
      />
    ),
  };
};