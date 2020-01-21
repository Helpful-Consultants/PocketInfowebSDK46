import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import HeaderButton from '../components/HeaderButton';
import { getOdisRequest } from '../actions/odis';

import OdisVersions from './OdisVersions';
import odisDummyData from '../dummyData/odisDummyData.js';

export default OdisScreen = props => {
  const dispatch = useDispatch();
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const odisItems = useSelector(state => state.odis.odisItems);
  const isLoading = useSelector(state => state.odis.isLoading);
  const dataError = useSelector(state => state.odis.error);
  const getItems = useCallback(async () => dispatch(getOdisRequest()), [
    odisItems
  ]);

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      console.log('in odis use effect');
      getItems();
    };
    getItemsAsync();
  }, [dispatch]);

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItems();
  };

  if (!userIsSignedIn) {
    props.navigation.navigate('SignIn');
  }

  if (odisItems && odisItems.length > 0) {
    console.log('in odis screen,odisItems', odisItems.length);
  } else {
    console.log('in odis screen, no odisItems');
  }
  const items = (!isLoading && !dataError && odisItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  console.log('isLoading ', isLoading, 'dataError ', dataError);

  return (
    <View>
      <DataAlertBarWithRefresh
        dataName={'odis versions'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={items.length}
      />
      <OdisVersions items={items} />
    </View>
  );
};

OdisScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='ODIS versions' />,
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
