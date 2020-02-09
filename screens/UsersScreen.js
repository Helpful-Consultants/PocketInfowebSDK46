import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';
import UserList from '../components/UserList';

// import { NewsLinksView } from '@expo/samples';
import NewsLinks from './NewsLinks';
import TitleWithAppLogo from '../components/TitleWithAppLogo';

class UsersScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in UsersScreen constructor', this.props);
    this.props.getUsersRequest();

    // console.log(this.props.getUsersRequest);
  }
  render() {
    // const { users } = this.props;
    // console.log('in UsersScreen, users ', this.props);
    const users = this.props.users;
    console.log('in UsersScreen, users ', users && users.items);
    // console.log('in UsersScreen, users ', users && users);
    // console.log('in UsersScreen,users', users && users);
    return (
      <View>
        <ScrollView>
          <Text>Users, count is {users && users.items.length}</Text>
        </ScrollView>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text>Users Screen...</Text>
    //   </View>
    // );
  }
}

UsersScreen.navigationOptions = {
  title: 'News',
  headerStyle: {
    backgroundColor: '#efefef'
  },
  headerTintColor: '#333',
  headerTitleStyle: {
    fontFamily: 'the-sans-bold'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  console.log('in mapStateToProps');
  console.log(state.users);
  console.log('end mapStateToProps');
  return state.users;
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersRequest: () => dispatch(getUsersRequest())
  };
};

// export default connect(mapStateToProps)(UsersScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   ({ users }) => ({ users }),
  //   {
  //     getUsersRequest,
  //     createUserRequest,
  //     deleteUserRequest,
  //     usersError
  //   }
)(UsersScreen);
