import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Overlay, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getLtpRequest } from '../actions/ltp';

import LtpList from './LtpList';
import ltpDummyData from '../dummyData/ltpDummyData.js';

export default LtpScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );

  const getTools = useCallback(() => dispatch(getLtpRequest()), [ltpItems]);

  if (ltpItems && ltpItems.length > 0) {
    // console.log('in ltp screen,ltpItems', ltpItems);
  } else {
    console.log('in ltp screen, no ltpItems');
  }

  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectItemHandler = item => {
    setSelectedItem(item.partDescription);
    setIsModalVisible(true);
    // return alert(
    //   `the user selected  ${item.partDescription} for job 999? ; OK; change job; cancel`
    // );
  };

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    dealerId && getTools();
  };
  // Search function - end

  //   const { ltpItems } = props;
  // const { ltpItems } = this.props;
  const items = ltpItems;
  //   const items = ltpDummyData;

  // const { search } = this.state;
  return (
    // const { ltpItems } = this.props;
    // console.log('in LtpScreen, ltp ', this.props.ltpItems);
    // console.log('Find Tools screen');
    // console.log(ltpItems);
    // console.log('Find Tools screen end');
    // const items = ltpItems || [];

    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in LtpScreen, ltp ', ltp && ltp.items);
    // console.log('in LtpScreen, ltp ', ltp && ltp);
    // console.log('in LtpScreen, ltp', ltp && ltp);

    <View>
      <Overlay isVisible={isModalVisible} animationType={'fade'}>
        <View>
          <Text>Add tool to LTP basket</Text>
          <Text>{selectedItem}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <Button
                title='Confirm'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                buttonStyle={{
                  borderRadius: 10
                }}
                icon={
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-checkmark-circle-outline'
                        : 'md-checkmark-circle-outline'
                    }
                    type='ionicon'
                    size={30}
                    color='white'
                  />
                }
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title='Close'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                buttonStyle={{
                  borderRadius: 10
                }}
                icon={
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    type='ionicon'
                    size={30}
                    color='white'
                  />
                }
              />
            </View>
          </View>
        </View>
      </Overlay>
      <SearchBar
        onChangeText={searchInputHandler}
        value={searchInput}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
      />

      <Button
        title='Refresh list'
        onPress={() => {
          refreshRequestHandler();
        }}
        buttonStyle={{
          marginBottom: 10,
          marginTop: 10,
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 20
        }}
        icon={
          <Icon
            name={
              Platform.OS === 'ios'
                ? 'add-circle-outline'
                : 'add-circle-outline'
            }
            size={20}
            color='white'
          />
        }
      />
      <LtpList items={items} onSelectItem={selectItemHandler} />
    </View>
  );
};

LtpScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='LTP' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          console.log('pressed homescreen icon');
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
          console.log('pressed menu icon');
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

// LocatorScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='Tool Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,

    backgroundColor: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '60%'
  },
  buttonView: {
    // width: 200,
    fontSize: 12
  }
});
