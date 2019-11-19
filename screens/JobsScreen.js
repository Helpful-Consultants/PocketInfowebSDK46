import React, { Component } from 'react';
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
  createUserWipRequest,
  deleteUserWipRequest,
  getUserWipsRequest
} from '../actions/userWips';

import JobsList from './JobsList';
import userWipsDummyData from '../dummyData/userWipsDummyData.js';

class JobsScreen extends Component {
  constructor(props) {
    super(props);
    console.log('in UserWipsScreen constructor');
    // console.log(this.props);
    // this.props.getUserWipsRequest();

    // console.log(this.props.getUserWipsRequest);
  }
  state = {
    modalVisible: false
  };
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  //   state = {
  //     search: ''
  //   };
  //   updateSearch = search => {
  //     this.setState({ search });
  //   };

  render() {
    const { userWipsItems } = this.props;
    // console.log('in UserWipsScreen, userWips ', this.props);
    // console.log('in UserWipsScreen, userWips end');
    // console.log('Find Tools screen');
    // console.log(userWipsItems);
    // console.log('Find Tools screen end');
    const items = userWipsItems && userWipsItems;
    // const items = userWipsDummyData;
    // const { search } = this.state;
    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in UserWipsScreen, userWips ', userWips && userWips.items);
    // console.log('in UserWipsScreen, userWips ', userWips && userWips);
    // console.log('in UserWipsScreen, userWips', userWips && userWips);

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
            this.toggleModal(true);
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
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.text}>Create job</Text>

            <TouchableHighlight
              onPress={() => {
                this.toggleModal(!this.state.modalVisible);
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableHighlight>
            <Button
              title='Save job'
              onPress={() => {
                this.props.createUserWipRequest('3333');
                this.toggleModal(false);
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
                  name={
                    Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'
                  }
                  type='ionicon'
                  size={30}
                  color='white'
                />
              }
            />
          </View>
        </Modal>
        <ScrollView>
          <JobsList
            items={items}
            deleteUserWipRequest={this.props.deleteUserWipRequest}
          />
        </ScrollView>
      </View>
    );
  }
}

JobsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='My jobs' />,
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

const mapStateToProps = state => {
  console.log(state);
  //   const { friends } = state;
  console.log('in JobScrre mapStateToProps');
  console.log(state.userWips && state.userWips.length);
  console.log('in JobScrre mapStateToProps - end');
  const userWipsItems = state.userWips && state.userWips;
  //   console.log('end mapStateToProps');
  return userWipsItems;
};

const mapDispatchToProps = dispatch => {
  return {
    getUserWipsRequest: () => dispatch(getUserWipsRequest()),
    deleteUserWipRequest: wipData => dispatch(deleteUserWipRequest(wipData)),
    createUserWipRequest: wipData => dispatch(createUserWipRequest(wipData))
  };
};

// export default connect(mapStateToProps)(UserWipsScreen);
export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen);
