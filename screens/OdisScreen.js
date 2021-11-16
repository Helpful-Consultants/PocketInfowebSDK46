import React, { useCallback, useEffect } from 'react';
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
// import odisDummyData from '../dummyData/odisDummyData.js';

export default OdisScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();

  const userBrand = useSelector((state) => state.user.userBrand);
  const odisObj = useSelector((state) => state.odis.odisData);
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

  const getItems = useCallback(
    async () => dispatch(getOdisRequest({ userBrand: userBrand })),
    [odisObj]
  );
  const storeDisplayTimestampAsync = async () => {
    displayTime = Date.now();
    // console.log('in storeDisplayTimestampAsync: displayTime', displayTime);
    dispatch(setOdisDisplayTimestamp({ displayTime }));
  };

  //   console.log('OdisScreen,userBrand:', userBrand, odisObj);
  //   const incrementViewCount = async () => dispatch(incrementOdisViewCount());

  //   const { navigation } = props;

  //   useEffect(() => {
  //     // runs only once
  //     const getItemsAsync = async () => {
  //       //   console.log('in odis use effect');
  //       setIsRefreshNeeded(false);
  //       getItems();
  //       incrementViewCount();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler');
    getItems();
  };

  //   if (!userIsValidated) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     // incrementViewCount();
  //     setIsRefreshNeeded(true);
  //   });

  useFocusEffect(
    useCallback(() => {
      const getItemsAsync = async () => {
        getItems();
      };
      //   console.log('in odis screen useFocusEffect');
      //   dispatch(revalidateUserCredentials({ calledBy: 'OdisScreen' }));
      getItemsAsync();
      //   incrementViewCount();

      //   storeDisplayTimestampAsync();
    }, [])
  );

  useEffect(() => {
    // console.log('in odis screen useEffect odisFetchTime', odisFetchTime);
    storeDisplayTimestampAsync();
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
