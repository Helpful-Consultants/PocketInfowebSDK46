import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getOdisRequest, incrementOdisViewCount } from '../actions/odis';
import Colors from '../constants/Colors';
import OdisVersions from './OdisVersions';
// import odisDummyData from '../dummyData/odisDummyData.js';

export default OdisScreen = props => {
  const dispatch = useDispatch();
  const userIsValidated = useSelector(state => state.user.userIsValidated);
  const userBrand = useSelector(state => state.user.userBrand);
  const odisObj = useSelector(state => state.odis.odisData);
  const isLoading = useSelector(state => state.odis.isLoading);
  const dataError = useSelector(state => state.odis.error);
  const viewCount = useSelector(state => state.odis.viewCount);
  const allOdis = useSelector(state => state.odis);
  const dataStatusCode = useSelector(state => state.odis.statusCode);
  const dataErrorUrl = useSelector(state => state.odis.dataErrorUrl);
  //   const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  const getItems = useCallback(async () => dispatch(getOdisRequest()), [
    odisObj
  ]);

  const incrementViewCount = async () => dispatch(incrementOdisViewCount());

  const { navigation } = props;

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
      dispatch(revalidateUserCredentials({ calledBy: 'OdisScreen' }));
      getItemsAsync();
    }, [])
  );

  //   if (odisObj) {
  //     console.log('in odis screen,odisObj');
  //   } else {
  //     console.log('in odis screen, no odisObj');
  //   }
  const itemsObj = (!isLoading && !dataError && odisObj) || {};
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log('isLoading ', isLoading, 'dataError ', dataError);

  //   console.log(allOdis && allOdis);

  return (
    <View style={styles.container}>
      <DataAlertBarWithRefresh
        dataName={'ODIS version data'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={1}
      />
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
          viewCount={viewCount}
        />
      ) : null}
    </View>
  );
};

const titleString = 'ODIS';
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
        name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
      />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center'
  }
});
