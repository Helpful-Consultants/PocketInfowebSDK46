import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Card, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';

import DealerToolsList from './DealerToolsList';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

class FindToolsScreen extends Component {
  constructor(props) {
    super(props);
    console.log('in DealerToolsScreen constructor');
    // console.log(this.props);
    // this.props.getDealerToolsRequest();

    // console.log(this.props.getDealerToolsRequest);
  }

  state = {
    search: ''
  };
  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    // const { dealerToolsItems } = this.props;
    // console.log('in DealerToolsScreen, dealerTools ', this.props.dealerToolsItems);
    // console.log('Find Tools screen');
    // console.log(dealerToolsItems);
    // console.log('Find Tools screen end');
    // const items = dealerToolsItems || [];
    const items = dealerToolsDummyData;
    const { search } = this.state;
    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools.items);
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools);
    // console.log('in DealerToolsScreen, dealerTools', dealerTools && dealerTools);
    return (
      <View>
        <SearchBar
          placeholder='Type Here...'
          onChangeText={this.updateSearch}
          value={search}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        />
        <ScrollView>
          <DealerToolsList items={items} />
        </ScrollView>
      </View>
    );
  }
}

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
