import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Button, Card, Icon, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import {
  createDealerWipRequest,
  deleteDealerWipRequest,
  getDealerWipsRequest
} from '../actions/dealerWips';

import JobsList from './JobsList';
import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

export default JobsScreen = ({ ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;
  const intId = userData && userData.intId;
  //   state = {
  //     search: ''
  //   };
  //   updateSearch = search => {
  //     this.setState({ search });
  //   };
  //   if (!userIsSignedIn) {
  //     props.navigation.navigate('SignIn');
  //   }
  const getWips = useCallback(getWipsData => {
    console.log('getWips', getWipsData);
    dispatch(getDealerWipsRequest(getWipsData)), [dealerWipsItems];
  });
  const deleteDealerWip = useCallback(
    wipData => dispatch(deleteDealerWipRequest(wipData)),
    [dealerWipsItems]
  );
  const createDealerWip = useCallback(
    wipData => dispatch(createDealerWipRequest(wipData)),
    [dealerWipsItems]
  );

  if (dealerWipsItems && dealerWipsItems.length > 0) {
    // console.log('in tools screen,toolsItems', dealerWipsItems);
  } else {
    console.log('in jobs screen, no wipsItems');
  }
  // const { dealerWipsItems } = this.props;
  // console.log('in DealerWipsScreen, dealerWips ', this.props);
  // console.log('in DealerWipsScreen, dealerWips end');
  // console.log('Find DealerWips screen');
  // console.log(dealerWipsItems);
  // console.log('Find DealerWips screen end');

  const refreshRequestHandler = () => {
    const getWipsData = {
      dealerId: dealerId,
      intId: intId
    };
    console.log('in refreshRequestHandler', getWipsData);
    dealerId && intId && getWips(getWipsData);
  };
  //   const items = dealerWipsItems;
  // const items = dealerWipsDummyData;
  // const { search } = this.state;
  // console.log('items');
  // console.log(items);
  // console.log('items end');
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips.items);
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips);
  // console.log('in DealerWipsScreen, dealerWips', dealerWips && dealerWips);

  return (
    <View>
      {/* <SearchBar
          placeholder='Type Here...'
          onChangeText={this.updateSearch}
          value={search}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        /> */}
      <Button
        title='New job'
        onPress={() => {
          setIsModalVisible(true);
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

      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.text}>Create job</Text>

          <TouchableHighlight
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableHighlight>
          <Button
            title='Save job'
            onPress={() => {
              createDealerWip('3333');
              setIsModalVisible(false);
            }}
            buttonStyle={{
              marginBottom: 10,
              marginTop: 50,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 10
            }}
            icon={
              <Icon
                name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
                type='ionicon'
                size={30}
                color='white'
              />
            }
          />
        </View>
      </Modal>
      <Button
        title=' Refresh list'
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
            name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
            type='ionicon'
            size={20}
            color='white'
          />
        }
      />
      <ScrollView>
        <JobsList
          items={dealerWipsItems}
          deleteDealerWipRequest={deleteDealerWip}
        />
      </ScrollView>
    </View>
  );
};

JobsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='My jobs' />,
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
//   headerTitle: <TitleWithAppLogo title='DealerWip Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 100
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  }
});
