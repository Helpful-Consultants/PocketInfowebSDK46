import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getNewsRequest } from '../actions/news';
import { Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
// import UserList from '../components/UserList';

// import { NewsLinksView } from '@expo/samples';
import NewsLinks from './NewsLinks';

import newsDummyData from '../dummyData/newsDummyData.js';

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in NewsScreen constructor', this.props);
    // this.props.getNewsRequest();

    // console.log(this.props.getNewsRequest);
  }
  render() {
    // const { news } = this.props;
    // console.log('in NewsScreen, news ', this.props.newsItems);
    // const newsItems = this.props.newsItems;
    const newsItems = newsDummyData;
    // console.log('in NewsScreen, news ', news && news.items);
    // console.log('in NewsScreen, news ', news && news);
    // console.log('in NewsScreen,news', news && news);
    return (
      <View>
        <ScrollView>
          {/* <Text>News, count is {newsItems && newsItems.length}</Text> */}
          <NewsLinks items={newsItems} />
        </ScrollView>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text>News Screen...</Text>
    //   </View>
    // );
  }
}

NewsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='News' />,
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
          navigation.navigate.openDrawer;
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  //   console.log(state);
  //   console.log('end mapStateToProps');
  return state.news;
};

const mapDispatchToProps = dispatch => {
  return {
    getNewsRequest: () => dispatch(getNewsRequest())
  };
};

// export default connect(mapStateToProps)(NewsScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   ({ news }) => ({ news }),
  //   {
  //     getNewsRequest,
  //     createUserRequest,
  //     deleteUserRequest,
  //     newsError
  //   }
)(NewsScreen);
