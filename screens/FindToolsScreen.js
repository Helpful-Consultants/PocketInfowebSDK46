import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Overlay, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';

import DealerToolsList from './DealerToolsList';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const FindToolsScreen = ({ ...props }) => {
  //   constructor(props) {
  //     super(props);
  //     console.log('in DealerToolsScreen constructor');
  //     // console.log(this.props);
  //     // this.props.getDealerToolsRequest();

  //     // console.log(this.props.getDealerToolsRequest);
  //   }

  //   state = {
  //     search: ''
  //   };
  //   updateSearch = search => {
  //     this.setState({ search });
  //   };
  const [searchInput, setSearchInput] = useState('search text');
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
  const { dealerToolsItems } = props;
  // const { dealerToolsItems } = this.props;
  //   const items = dealerToolsItems;
  const items = dealerToolsDummyData;

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
        placeholder='Type Here...'
        onChangeText={searchInputHandler}
        value={searchInput}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
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
          navigation.navigate('Home');
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

const mapStateToProps = state => {
  //   const { friends } = state;
  console.log('in mapStateToProps');
  //   console.log(
  //     state.dealerTools.dealerToolsItems && state.dealerTools.dealerToolsItems
  //   );
  const dealerToolsItems = (state.dealerTools && state.dealerTools) || {};
  //   console.log('end mapStateToProps');
  return dealerToolsItems;
};

const mapDispatchToProps = dispatch => {
  return {
    getDealerToolsRequest: () => dispatch(getDealerToolsRequest())
  };
};

// export default connect(mapStateToProps)(DealerToolsScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   ({ news }) => ({ news }),
  //   {
  //     getDealerToolsRequest,
  //     createUserRequest,
  //     deleteUserRequest,
  //     newsError
  //   }
)(FindToolsScreen);
