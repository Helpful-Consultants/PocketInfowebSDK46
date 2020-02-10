import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import { getOdisRequest, incrementOdisViewCount } from '../actions/odis';

import OdisVersions from './OdisVersions';
import odisDummyData from '../dummyData/odisDummyData.js';

export default OdisScreen = props => {
  const dispatch = useDispatch();
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userBrand = useSelector(state => state.user.userBrand);
  const odisObj = useSelector(state => state.odis.odisData);
  const isLoading = useSelector(state => state.odis.isLoading);
  const dataError = useSelector(state => state.odis.error);
  const viewCount = useSelector(state => state.odis.viewCount);
  const allOdis = useSelector(state => state.odis);
  const dataStatusCode = useSelector(state => state.odis.statusCode);
  const dataErrorUrl = useSelector(state => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  const getItems = useCallback(async () => dispatch(getOdisRequest()), [
    odisObj
  ]);

  const incrementViewCount = async () => dispatch(incrementOdisViewCount());

  const { navigation } = props;

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      //   console.log('in odis use effect');
      setIsRefreshNeeded(false);
      getItems();
      incrementViewCount();
    };
    if (isRefreshNeeded === true) {
      getItemsAsync();
    }
  }, [isRefreshNeeded]);

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler');
    getItems();
  };

  //   if (!userIsSignedIn) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }

  const didFocusSubscription = navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    // incrementViewCount();
    setIsRefreshNeeded(true);
  });

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
    <View>
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

OdisScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='ODIS versions' />,
  headerStyle: {
    backgroundColor: Colors.vwgHeader
  },
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='ODIS versions'
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
          navigation.openDrawer();
        }}
      />
    </HeaderButtons>
  )
});
