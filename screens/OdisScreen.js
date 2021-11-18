import React, { useCallback, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Text, useWindowDimensions, View } from 'react-native';
import Colors from '../constants/Colors';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { revalidateUserCredentials } from '../actions/user';
import {
  getOdisRequest,
  //   incrementOdisViewCount,
  setOdisDisplayTimestamp,
} from '../actions/odis';
import OdisVersions from './OdisVersions';
import { selectFetchParamsObj } from '../reducers/user';
// import odisDummyData from '../dummyData/odisDummyData.js';

export default OdisScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();

  const userBrand = useSelector((state) => state.user.userBrand);
  const odisObj = useSelector((state) => state.odis.odisData);
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const isLoading = useSelector((state) => state.odis.isLoading);
  const dataError = useSelector((state) => state.odis.error);
  const odisViewCount = useSelector((state) => state.odis.viewCount);
  const odisFetchTime = useSelector((state) => state.odis.fetchTime);
  const latestChangeDate = useSelector((state) => state.odis.latestChangeDate);
  //   const allOdis = useSelector((state) => state.odis);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  //   const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const showingDemoData = useSelector((state) => state.user.requestedDemoData);

  //   const fetchParamsObj = useMemo(() => {
  //     console.log(
  //       'in serviceMeasures memoising fetchParamsObj',
  //       fetchParamsObj
  //     );
  //     return fetchParamsObj;
  //   }, [
  //     fetchParamsObj.dealerId,
  //     fetchParamsObj.userIntId,
  //     fetchParamsObj.userBrand,
  //   ]);

  useEffect(() => {
    // console.log(
    //   '&&&&&&&&&&&&&&&& fetchParamsObj changed for ODIS',
    //   fetchParamsObj
    // );
    getItems();
  }, [fetchParamsObj]);

  const getItems = useCallback(() => {
    // console.log('in ODIS in getItems fetchParamsObj', fetchParamsObj);
    dispatch(getOdisRequest(fetchParamsObj));
  }, [dispatch, fetchParamsObj]);

  const storeDisplayTimestamp = useCallback(
    (displayTime) => {
      // const displayTime = Date.now();
      //   console.log(
      //     '+++++++++++++++=in New storeDisplayTimestampAsync:',
      //     displayTime,
      //     typeof displayTime
      //   );
      dispatch(setOdisDisplayTimestamp(displayTime));
    },
    [dispatch]
  );

  const refreshRequestHandler = useCallback(() => {
    console.log('in odis refreshRequestHandler');
    getItems();
  }, [getItems]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('in serviceMeasures usefocusffect, usecallback ');
      //   dispatch(
      //     revalidateUserCredentials({
      //       calledBy: 'ServiceMeasures Screen',
      //     })
      //   );
      //   console.log('in serviceMeasures focusffect calling getItems');
      getItems();
      storeDisplayTimestamp();
      return () => {
        // Do something when the screen is unfocused
        // console.log('ODIS Screen was unfocused');
      };
    }, [dispatch, getItems])
  );

  useEffect(() => {
    const displayTime = Date.now();
    // console.log(
    //   'in odis useeffect calling storeDisplayTimestamp',
    //   'odisFetchTime',
    //   odisFetchTime,
    //   'displayTime',
    //   displayTime
    // );
    storeDisplayTimestamp(displayTime);
  }, [odisFetchTime]);

  //   if (odisObj) {
  //     console.log('in odis screen,odisObj', odisObj);
  //   } else {
  //     console.log('in odis screen, no odisObj');
  //   }
  const itemsObj = (!isLoading && !dataError && odisObj) || {};
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);

  //   console.log(allOdis && allOdis);

  //   console.log('rendering Odis screen, odisFetchTime', odisFetchTime);

  return (
    <View style={baseStyles.containerFlexCentred}>
      <DataAlertBarWithRefresh
        dataName={'ODIS version data'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={1}
      />
      {showingDemoData ? (
        <View
          style={{
            ...baseStyles.viewDummyDataRibbon,
            backgroundColor: Colors.vwgWhite,
            color: Colors.vwgWarmOrange,
          }}
        >
          <Text
            style={{
              ...baseStyles.textPromptRibbon,
              backgroundColor: Colors.vwgWhite,
              color: Colors.vwgWarmOrange,
            }}
          >
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWarmOrange} />
        </View>
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing the ODIS data'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : !isLoading &&
        !dataError &&
        odisObj &&
        Object.keys(odisObj).length > 0 ? (
        <OdisVersions
          itemsObj={odisObj}
          userBrand={userBrand}
          viewCount={odisViewCount}
          fetchTime={odisFetchTime}
        />
      ) : null}
    </View>
  );
};
