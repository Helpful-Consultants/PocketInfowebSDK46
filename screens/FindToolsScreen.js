import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Overlay, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';

import DealerToolsList from './DealerToolsList';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

export default FindToolsScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const dealerToolsItems = useSelector(
    state => state.dealerTools.dealerToolsItems
  );
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );

  const getTools = useCallback(
    getToolsData => dispatch(getDealerToolsRequest(getToolsData)),
    [dealerToolsItems]
  );

  if (dealerToolsItems && dealerToolsItems.length > 0) {
    // console.log('in tools screen,toolsItems', dealerToolsItems);
  } else {
    console.log('in tools screen, no toolsItems');
  }

  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectItemHandler = item => {
    setSelectedItem(item.partDescription);
    setIsModalVisible(true);
    // return alert(
    //   `the user selected tool ${item.partDescription} for job 999? ; OK; change job; cancel`
    // );
  };

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    const getToolsData = {
      dealerId: dealerId
    };
    console.log('in refreshRequestHandler');
    dealerId && getTools(getToolsData);
  };
  // Search function - end

  //   const { dealerToolsItems } = props;
  // const { dealerToolsItems } = this.props;
  const items = dealerToolsItems;
  //   const items = dealerToolsDummyData;

  // const { search } = this.state;
  return (
    // const { dealerToolsItems } = this.props;
    // console.log('in DealerToolsScreen, dealerTools ', this.props.dealerToolsItems);
    // console.log('Find Tools screen');
    // console.log(dealerToolsItems);
    // console.log('Find Tools screen end');
    // const items = dealerToolsItems || [];

    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools.items);
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools);
    // console.log('in DealerToolsScreen, dealerTools', dealerTools && dealerTools);

    <View>
      <Overlay isVisible={isModalVisible} animationType={'fade'}>
        <View>
          <Text>Book tool to job</Text>
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
      <DealerToolsList items={items} onSelectItem={selectItemHandler} />
    </View>
  );
};

FindToolsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Find tools' />,
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

// const mapStateToProps = state => {
//   //   const { friends } = state;
//   console.log('in mapStateToProps');
//   //   console.log(
//   //     state.dealerTools.dealerToolsItems && state.dealerTools.dealerToolsItems
//   //   );
//   const dealerToolsItems = (state.dealerTools && state.dealerTools) || {};
//   //   console.log('end mapStateToProps');
//   return dealerToolsItems;
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getDealerToolsRequest: () => dispatch(getDealerToolsRequest())
//   };
// };

// // export default connect(mapStateToProps)(DealerToolsScreen);
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
//   //   ({ news }) => ({ news }),
//   //   {
//   //     getDealerToolsRequest,
//   //     createUserRequest,
//   //     deleteUserRequest,
//   //     newsError
//   //   }
// )(FindToolsScreen);
