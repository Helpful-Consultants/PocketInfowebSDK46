import React, { Component } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import TitleWithAppLogo from './TitleWithAppLogo';
import HeaderButton from './HeaderButton';

const headerWithHomeAndMenu = props => {
  return {
    headerTitle: <TitleWithAppLogo title={props.title} />,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='home'
          iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          onPress={() => {
            console.log('pressed homescreen icon');
            props.navigation.navigate('Home');
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
            console.log('pressed menu icon');
            props.navigation.navigate.openDrawer;
          }}
        />
      </HeaderButtons>
    )
  };
};

export default headerWithHomeAndMenu;
