import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import { getStatsRequest } from '../actions/stats';
import { getDealerToolsRequest } from '../actions/dealerTools';
import StatsSummary from './StatsSummary';
import { selectFetchParamsObj } from '../reducers/user';
import { useDimensions } from '../helpers/dimensions';
import getBaseStyles from '../helpers/getBaseStyles';

export default StatsScreen = (props) => {
  const dispatch = useDispatch();
  const windowDim = useDimensions();
  const baseStyles = useMemo(
    () => windowDim && getBaseStyles(windowDim),
    [windowDim]
  );
  const statsObj = useSelector((state) => state.stats.statsItems[0]);
  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const dealerToolsItems = useSelector(
    (state) => state.dealerTools.dealerToolsItems
  );
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);

  const getItems = useCallback(async () => {
    // console.log('in stats getItems');
    dispatch(getStatsRequest(fetchParamsObj));
    if (!dealerToolsItems || dealerToolsItems.length === 0) {
      //   console.log('CALLING GET DEALER TOOLS');
      dispatch(getDealerToolsRequest(fetchParamsObj)), [dealerToolsItems];
    }
  }, [dealerToolsItems.length]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('in stats usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'stats Screen',
      //     })
      //   );
      //   console.log('in stats focusffect calling getItems');
      getItems();

      return () => {
        // Do something when the screen is unfocused
        // console.log('stats Screen was unfocused');
      };
    }, [dispatch, getItems])
  );

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getStatsData);
    getItems();
  };

  const userDataPresent =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  const statsDataCount = (statsObj && Object.keys(statsObj).length > 0) || 0;

  if (!userDataPresent) {
    // console.log('in stats screen, no userDataObj');
    getItems();
  }

  const userWipsItems =
    (userDataObj &&
      userDataObj.intId &&
      dealerWipsItems &&
      dealerWipsItems.length > 0 &&
      dealerWipsItems.filter(
        (item) =>
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

  //   console.log('rendering Stats screen');

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
          <StatsSummary
            statsObj={statsObj}
            userDataObj={userDataObj ? userDataObj : null}
            activeJobsCount={activeJobsCount}
            dealerToolsCount={dealerToolsCount}
            effectiveness={effectiveness}
          />
        </View>
      )}
    </View>
  );
};
// );
